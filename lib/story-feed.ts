import { load } from 'cheerio'

export type StorySource = 'youth' | 'care' | 'lab'
export type Story = { source: StorySource; title: string; description: string; url: string; publishedAt: string; category: string }
export const storySources = [
  { id: 'youth' as const, name: '청년', siteName: '소이랩 청년지원센터', origin: 'https://www.soilab-youth.kr', feed: 'https://www.soilab-youth.kr/feed.xml', href: 'https://www.soilab-youth.kr/series', description: '고립·은둔, 일과 회복, 지역에서 관계를 잇는 청년지원의 질문을 기록합니다.' },
  { id: 'care' as const, name: '돌봄', siteName: '돌봄리빙랩 아카이브', origin: 'https://care.soilabcoop.kr', feed: 'https://care.soilabcoop.kr/series/feed.xml', href: 'https://care.soilabcoop.kr/series', description: '돌봄노동과 지역의 돌봄 현장을 살피고, 정책·연구 근거와 연결합니다.' },
  { id: 'lab' as const, name: '리빙랩·지역혁신', siteName: '소이랩 LAB', origin: 'https://lab.soilabcoop.kr', feed: 'https://lab.soilabcoop.kr/feed.xml', href: 'https://lab.soilabcoop.kr/series', description: '리빙랩의 방법, 지역사업의 설계와 운영, 현장에서 얻은 질문을 나눕니다.' },
]

const plainText = (html: string) => load(html).text().replace(/\s+/g, ' ').trim()
export function parseStoryFeed(xml: string, source: typeof storySources[number]): Story[] {
  if (xml.length > 5_000_000) throw new Error('feed_too_large')
  const $ = load(xml, { xml: true })
  if (!$('rss > channel').length) throw new Error('feed_format')
  const stories: Story[] = []
  $('channel > item').each((_, item) => {
    const node = $(item)
    const title = plainText(node.children('title').text())
    let url: URL
    try { url = new URL(node.children('link').text()) } catch { return }
    const date = node.children('pubDate').text()
    // Only public articles on the source's own host can appear in the hub.
    if (url.origin !== source.origin || url.username || url.password || !/^\/(series|research\/notes|press|stream)(\/|$)/.test(url.pathname) || !title || !Number.isFinite(Date.parse(date))) return
    url.search = ''; url.hash = ''
    const description = plainText(node.children('description').text())
    stories.push({ source: source.id, title: title.slice(0, 250), url: url.href, description: description.length > 220 ? `${description.slice(0, 217)}…` : description, category: plainText(node.children('category').first().text()).slice(0, 100), publishedAt: new Date(date).toISOString() })
  })
  return [...new Map(stories.map(story => [story.url, story])).values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
}
