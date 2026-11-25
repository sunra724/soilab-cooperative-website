import type { Story } from '@/lib/story-feed'

export function StoryCard({ story, sourceName }: { story: Story; sourceName?: string }) {
  return <article className="flex h-full flex-col border-t border-primary/20 bg-white px-6 py-7">
    <p className="text-sm font-medium text-primary">{sourceName ? `${sourceName} · ` : ''}{story.category}</p>
    <h3 className="mt-4 font-serif text-xl font-bold leading-relaxed"><a className="decoration-primary/40 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" href={story.url}>{story.title}</a></h3>
    <p className="mt-4 flex-1 text-base leading-8 text-muted-foreground">{story.description}</p>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm"><time className="text-muted-foreground" dateTime={story.publishedAt}>게시 {story.publishedAt.slice(0, 10).replaceAll('-', '.')}</time><a className="font-semibold text-primary underline underline-offset-4" href={story.url}>원문 읽기</a></div>
  </article>
}
