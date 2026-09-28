// Run after npm run build, with the same Notion environment as the website.
import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { readFile } from "node:fs/promises"
import { createServer } from "node:net"
import { setTimeout as delay } from "node:timers/promises"

const manifest = JSON.parse(await readFile(".next/prerender-manifest.json", "utf8"))
assert.ok(manifest.dynamicRoutes["/news/[id]"], "News details must opt into ISR")
const socket = createServer()
await new Promise((resolve) => socket.listen(0, "127.0.0.1", resolve))
const port = socket.address().port
await new Promise((resolve) => socket.close(resolve))
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  windowsHide: true,
  stdio: ["ignore", "pipe", "pipe"],
})
let logs = ""
server.stdout.on("data", (chunk) => { logs += chunk })
server.stderr.on("data", (chunk) => { logs += chunk })
server.on("error", (error) => { logs += error.message })

async function read(path, status = 200) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`, { signal: AbortSignal.timeout(60_000) })
  const text = await response.text()
  assert.equal(response.status, status, path)
  return { response, text }
}

try {
  let ready = false
  for (let attempt = 0; attempt < 100; attempt++) {
    try { await read("/services"); ready = true; break } catch {}
    if (server.exitCode !== null) break
    await delay(200)
  }
  assert.ok(ready, `Production server failed to start: ${logs}`)
  const sitemap = await read("/sitemap.xml")
  const paths = [...sitemap.text.matchAll(/<loc>https:\/\/www\.soilabcoop\.kr(\/news\/[^<]+)<\/loc>/g)].map((match) => match[1]).slice(0, 3)
  assert.ok(paths.length, "The published sitemap must contain news; check the Notion build environment")

  for (const path of paths) {
    const first = await read(path)
    const heading = first.text.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1]
    assert.ok(heading, path)
    // A preceding local run can leave a stale filesystem cache to refresh.
    let second
    for (let attempt = 0; attempt < 30; attempt++) {
      second = await read(path)
      if (second.response.headers.get("x-nextjs-cache") === "HIT") break
      await delay(200)
    }
    assert.equal(second.response.headers.get("x-nextjs-cache"), "HIT", path)
    assert.match(second.response.headers.get("cache-control"), /s-maxage=60(?:,|$)/)
    assert.equal(second.text.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1], heading)
    assert.ok(second.text.includes(`https://www.soilabcoop.kr${path}`), "Canonical URL must remain present")
  }
  await read("/news/not-a-notion-id", 404)
  console.log(`News cache checks passed: ${paths.length} published details return HIT with 60-second revalidation; headings, canonical URLs and invalid-ID 404 preserved.`)
} finally {
  server.kill()
}
