import { getInsights } from '@/lib/insights'
import { renderFeed } from '@/lib/rss'
import { SITE_URL } from '@/lib/site'
export const revalidate = 300
export async function GET() {
  const issues = await getInsights()
  const entries = issues.map(issue => ({ title: issue.title, url: `${SITE_URL}/insights/${issue.id}`, description: issue.introduction, publishedAt: issue.publishedAt, category: '소이랩 인사이트', body: [issue.weeklyQuestion, ...issue.items.map(item => [item.title, ...item.summary, item.perspective, item.question, item.url].join('\n'))].join('\n\n') }))
  return new Response(renderFeed(entries, { title: '소이랩 인사이트', url: `${SITE_URL}/insights`, feedUrl: `${SITE_URL}/feed.xml`, description: '청년·돌봄·지역혁신의 정책과 연구를 읽는 소이랩의 주간 인사이트' }), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=0, s-maxage=300' } })
}
