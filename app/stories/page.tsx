import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StoryCard } from '@/components/stories/story-card'
import { getResearchStories, storySources } from '@/lib/research-stories'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata('/stories', '연구·현장기록', '청년·돌봄·리빙랩의 질문과 방법을 쌓는 소이랩의 분야별 연재. 각 분야 사이트의 카드뉴스와 전체 원고로 연결합니다.')
export const revalidate = 3600

export default async function StoriesPage() {
  const stories = await getResearchStories()
  return <div className="min-h-screen flex flex-col"><Header /><main className="flex-1">
    <section className="border-b border-primary/15 bg-[#f6f3eb] py-16 lg:py-24"><div className="mx-auto max-w-7xl px-4 lg:px-8"><p className="text-sm font-semibold tracking-widest text-primary">협동조합 소이랩</p><h1 className="mt-5 font-serif text-4xl font-bold sm:text-5xl">연구·현장기록</h1><p className="mt-6 max-w-3xl text-lg leading-9 text-muted-foreground">청년을 어떻게 연결할까. 돌봄을 어떻게 함께할까. 지역의 변화를 어떻게 만들까.<br className="hidden sm:block" />소이랩이 현장에서 만난 질문과 살펴본 근거, 실천의 방법을 연재로 쌓아갑니다.</p><nav aria-label="분야별 연재 바로가기" className="mt-8 flex flex-wrap gap-3">{storySources.map(source => <a key={source.id} href={`#${source.id}`} className="rounded-full border border-primary/30 bg-white px-5 py-3 text-base font-medium text-primary hover:bg-primary hover:text-white">{source.name}</a>)}</nav></div></section>
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20"><div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-border pb-8 text-base leading-7"><p>정책·연구의 주간 읽기는 <Link href="/insights" className="font-semibold text-primary underline underline-offset-4">소이랩 인사이트</Link>에서,</p><p>정책과 공모 동향은 <a href="https://radar.soilabcoop.kr/insights" className="font-semibold text-primary underline underline-offset-4">정책레이더</a>에서 살펴보세요.</p></div>
    {storySources.map(source => <section id={source.id} key={source.id} className="scroll-mt-28 border-b border-border py-14" aria-labelledby={`${source.id}-title`}><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-primary">{source.siteName}</p><h2 id={`${source.id}-title`} className="mt-2 font-serif text-3xl font-bold">{source.name}</h2><p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">{source.description}</p></div><a href={source.href} className="shrink-0 self-start text-base font-semibold text-primary underline underline-offset-4">{source.name} 연재 모음</a></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{stories.filter(story => story.source === source.id).map(story => <StoryCard key={story.url} story={story} />)}</div></section>)}
    <section className="mt-14 bg-primary px-7 py-10 text-primary-foreground sm:p-12"><h2 className="font-serif text-2xl font-bold">우리 지역의 사업으로 연결하고 싶다면</h2><p className="mt-4 max-w-3xl text-base leading-8 text-primary-foreground/85">청년지원, 돌봄, 리빙랩의 과제를 함께 살피고 기획·운영·성과 정리의 방법을 논의합니다.</p><div className="mt-7 flex flex-wrap gap-5 text-base font-semibold"><Link href="/services" className="underline underline-offset-4">소이랩 사업소개</Link><Link href="/impact" className="underline underline-offset-4">실적·성과 보기</Link><Link href="/contact" className="rounded-md bg-white px-5 py-3 text-primary">사업·협업 문의</Link></div></section>
    </div></main><Footer /></div>
}
