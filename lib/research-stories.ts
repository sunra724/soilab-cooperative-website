import { cache } from 'react'
import snapshot from '@/data/research-stories.json'
import { parseStoryFeed, storySources, type Story } from '@/lib/story-feed'
export { storySources } from '@/lib/story-feed'
export type { Story } from '@/lib/story-feed'

export const getResearchStories = cache(async (): Promise<Story[]> => {
  const groups = await Promise.all(storySources.map(async source => {
    const fallback = snapshot.filter(item => item.source === source.id) as Story[]
    try {
      const response = await fetch(source.feed, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(6000), redirect: 'error' })
      if (!response.ok) throw new Error('feed_http')
      const items = parseStoryFeed(await response.text(), source)
      if (!items.length) throw new Error('feed_empty')
      // Prefer the source's summary for already archived articles; new articles arrive from RSS.
      return items.map(item => ({ ...item, description: fallback.find(old => old.url === item.url)?.description ?? item.description }))
    } catch {
      console.warn(`Research stories feed unavailable: ${source.id}`)
      return fallback
    }
  }))
  return groups.flat().sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a.url.localeCompare(b.url))
})
