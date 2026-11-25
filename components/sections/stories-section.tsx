import Link from 'next/link'
import { getResearchStories, storySources } from '@/lib/research-stories'
import { StoryCard } from '@/components/stories/story-card'

export async function StoriesSection() {
  const stories = await getResearchStories()
  return <section className="bg-[#f6f3eb] py-20 lg:py-28" aria-labelledby="home-stories-title"><div className="mx-auto max-w-7xl px-4 lg:px-8">
    <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="mb-4 text-sm font-semibold tracking-widest text-primary">연구·현장기록</p><h2 id="home-stories-title" className="font-serif text-3xl font-bold sm:text-4xl">현장에서 묻고, 글로 쌓습니다.</h2><p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">청년·돌봄·리빙랩의 질문과 방법을 분야별 연재로 나눕니다.<br className="hidden sm:block" />각 분야 사이트에서 카드뉴스와 전체 원고를 읽을 수 있습니다.</p></div><Link href="/stories" className="shrink-0 self-start text-base font-semibold text-primary underline underline-offset-4">연구·현장기록 전체 보기</Link></div>
    <div className="grid gap-5 md:grid-cols-3">{storySources.map(source => { const story = stories.find(item => item.source === source.id); return story ? <StoryCard key={source.id} story={story} sourceName={source.name} /> : null })}</div>
  </div></section>
}
