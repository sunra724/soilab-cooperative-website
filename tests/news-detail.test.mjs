import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import vm from "node:vm"
import ts from "typescript"
import { APIErrorCode, APIResponseError, isNotionClientError, RequestTimeoutError } from "@notionhq/client"

const id = "9b6489556e9840319ce41f514f9ae268"
const source = readFileSync(new URL("../lib/notion.ts", import.meta.url), "utf8")
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText

function apiError(code, status) {
  return new APIResponseError({ code, status, message: code, headers: new Headers(), rawBodyText: "{}" })
}

function load({ retrieve, blocks, databases, query, env = {} } = {}) {
  const counts = { databases: 0, markdown: 0, pages: 0 }
  const client = {
    blocks: { children: { list: blocks ?? (async () => ({ results: [], has_more: false })) } },
    databases: { retrieve: async ({ database_id }) => {
      counts.databases++
      if (databases) return databases(database_id)
      return { data_sources: [{ id: database_id + "-source" }] }
    } },
    dataSources: { query: query ?? (async () => ({ results: [], has_more: false })) },
    pages: {
      retrieve: async (args) => {
        counts.pages++
        if (retrieve) return retrieve(args)
        return {
          object: "page", id, parent: { type: "data_source_id", data_source_id: "events-source" },
          properties: { 사업명: { type: "title", title: [{ plain_text: "공개 행사" }] } },
          last_edited_time: "2026-11-16T00:00:00Z",
        }
      },
      retrieveMarkdown: async () => { counts.markdown++; return { markdown: "행사 본문" } },
    },
  }
  const exports = {}
  const modules = {
    "@notionhq/client": { Client: class { constructor() { return client } }, APIErrorCode, isNotionClientError },
    react: { cache: fn => fn },
    "next/cache": { unstable_cache: fn => {
      const values = new Map()
      return async (...args) => {
        const key = JSON.stringify(args)
        if (values.has(key)) return values.get(key)
        const result = await fn(...args)
        values.set(key, result)
        return result
      }
    } },
  }
  vm.runInNewContext(compiled, {
    exports, require: name => { assert.ok(modules[name], name); return modules[name] },
    process: { env: { NOTION_EVENTS_DB_ID: "events", NOTION_PRESS_DB_ID: "press", ...env } },
    console: { error() {}, warn() {} },
  })
  return { ...exports, counts }
}

test("timeouts, rate limits and service/auth failures reject instead of becoming a missing article", async () => {
  for (const error of [new RequestTimeoutError(), apiError(APIErrorCode.RateLimited, 429),
    apiError(APIErrorCode.ServiceUnavailable, 503), apiError(APIErrorCode.Unauthorized, 401)]) {
    const api = load({ retrieve: async () => { throw error } })
    await assert.rejects(api.getNewsDetail(id), actual => actual === error)
  }
})

test("an unavailable press index is not treated as an empty successful index and can recover", async () => {
  const error = new RequestTimeoutError()
  let attempts = 0
  const api = load({ blocks: async () => {
    if (++attempts === 1) throw error
    return { results: [], has_more: false }
  } })
  await assert.rejects(api.getNewsDetail(id), actual => actual === error)
  assert.equal((await api.getNewsDetail(id)).title, "공개 행사")
})

test("a missing database configuration or unavailable database is not an article 404", async () => {
  await assert.rejects(load({ env: { NOTION_EVENTS_DB_ID: "" } }).getNewsDetail(id))
  const error = apiError(APIErrorCode.ObjectNotFound, 404)
  await assert.rejects(load({ databases: async () => { throw error } }).getNewsDetail(id), actual => actual === error)
})

test("a confirmed missing page and an invalid ID still return null", async () => {
  const api = load({ retrieve: async () => { throw apiError(APIErrorCode.ObjectNotFound, 404) } })
  assert.equal(await api.getNewsDetail(id), null)
  assert.equal(await api.getNewsDetail("not-a-notion-id"), null)
})

test("unpublished pages stay hidden and do not fetch their body", async () => {
  const api = load({
    retrieve: async () => ({ object: "page", id, parent: { type: "data_source_id", data_source_id: "events-source" },
      properties: { 게시: { type: "checkbox", checkbox: false } } }),
    query: async () => ({ results: [{ object: "page" }], has_more: false }),
  })
  assert.equal(await api.getNewsDetail(id), null)
  assert.equal(api.counts.markdown, 0)
})

test("successful details share database identity lookups across requests", async () => {
  const api = load()
  assert.equal((await api.getNewsDetail(id)).title, "공개 행사")
  assert.equal((await api.getNewsDetail("33dd121e4e4781249da7f0b8d5644e05")).markdown, "행사 본문")
  assert.equal(api.counts.databases, 2)
  assert.equal(api.counts.pages, 2)
})
