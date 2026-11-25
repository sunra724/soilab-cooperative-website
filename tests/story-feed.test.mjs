import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { parseStoryFeed, storySources } from '../lib/story-feed.ts'
import { renderFeed } from '../lib/rss.ts'

const source = storySources[0]
const wrap = items => `<rss version="2.0"><channel>${items}</channel></rss>`
const item = (url, date = 'Tue, 24 Nov 2026 00:00:00 GMT') => `<item><title>청년 &amp; 지역</title><link>${url}</link><pubDate>${date}</pubDate><category>관계</category><description>&lt;p&gt;함께 &amp;amp; 살기&lt;/p&gt;</description></item>`

test('feed ingestion accepts public original articles and strips tracking data', () => {
  const stories = parseStoryFeed(wrap(item(`${source.origin}/series/recovery-and-connection/7?token=private#cards`) + item(`${source.origin}/series/recovery-and-connection/7`)), source)
  assert.equal(stories.length, 1)
  assert.equal(stories[0].url, `${source.origin}/series/recovery-and-connection/7`)
  assert.equal(stories[0].description, '함께 & 살기')
  assert.equal(stories[0].publishedAt, '2026-11-24T00:00:00.000Z')
})
test('feed ingestion rejects cross-host links, credentials, private pages, invalid dates and non-RSS', () => {
  const urls = ['https://evil.example/series/x/1', `${source.origin}.evil.example/series/x/1`, 'javascript:alert(1)', 'https://user:pass@www.soilab-youth.kr/series/x/1', `${source.origin}/api/admin`]
  assert.deepEqual(parseStoryFeed(wrap(urls.map(url => item(url)).join('') + item(`${source.origin}/series/x/1`, 'bad-date')), source), [])
  assert.throws(() => parseStoryFeed('<html>unavailable</html>', source))
})
test('RSS preserves the complete manuscript and safely encodes XML and HTML', () => {
  const xml = renderFeed([{ title: 'A & B', url: `${source.origin}/series/x/1`, description: '요약', body: '첫 문단\n\n마지막 문단 <script>alert(1)</script> ]]> 끝', publishedAt: '2026-11-24T00:00:00Z', category: '연재' }], { title: '피드', url: source.origin, feedUrl: source.feed, description: '설명' })
  assert.ok(xml.includes('<content:encoded>'))
  assert.ok(xml.includes('마지막 문단'))
  assert.ok(xml.includes('&amp;lt;script&amp;gt;'))
  assert.ok(!xml.includes('<script>'))
  assert.ok(xml.includes(']]&amp;gt;'))
})
test('outage fallback has unique public original URLs and real publication dates for every source', () => {
  const entries = JSON.parse(readFileSync(new URL('../data/research-stories.json', import.meta.url)))
  assert.equal(new Set(entries.map(entry => entry.url)).size, entries.length)
  for (const source of storySources) {
    const group = entries.filter(entry => entry.source === source.id)
    assert.ok(group.length > 0)
    for (const entry of group) {
      assert.equal(new URL(entry.url).origin, source.origin)
      assert.ok(Number.isFinite(Date.parse(entry.publishedAt)))
      assert.ok(entry.description.length > 10)
    }
  }
})
