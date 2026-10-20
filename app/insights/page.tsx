import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IssueCard } from "@/components/insights/issue-card"
import { getInsights } from "@/lib/insights"
import { insightCategories } from "@/lib/insights-schema"

export const revalidate = 300
export const metadata: Metadata = {
  title: "소이랩 인사이트",
  description: "청년·돌봄, 지역·사회연대경제, 리빙랩·시민참여, AI의 정책과 연구를 소이랩의 현장 질문으로 연결하는 주간 브리핑입니다.",
  alternates: { canonical: "/insights" },
  openGraph: { title: "소이랩 인사이트", description: "지역의 변화를 읽고, 현장으로 연결합니다.", url: "/insights" },
}

export default async function InsightsPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const [issues, params] = await Promise.all([getInsights(), searchParams])
  const topic = insightCategories.find(category => category.id === params.topic)
  const shown = topic ? issues.filter(issue => issue.items.some(item => item.category === topic.id)) : issues
  return <div className="flex min-h-screen flex-col"><Header /><main className="flex-1">
    <section className="border-b border-primary/10 bg-[#edf2ed] px-4 py-16 sm:py-24 lg:px-8"><div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.18em] text-primary"><span>SOILAB INSIGHTS</span><span className="h-px w-8 bg-primary/30" /><span className="tracking-normal">매주 월요일</span></div>
      <h1 className="mt-7 font-serif text-4xl font-bold leading-tight text-primary sm:text-6xl">지역의 변화를 읽고,<br />현장으로 연결합니다.</h1>
      <p className="mt-7 max-w-2xl text-base leading-8 text-foreground/75">청년과 돌봄, 지역의 경제, 시민의 참여, 새로운 기술.<br className="hidden sm:block" />공식 자료에서 확인한 변화에 소이랩의 질문을 더합니다.</p>
      <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-muted-foreground"><span>01 &nbsp; 정책과 연구 읽기</span><span>02 &nbsp; 소이랩의 시선</span><span>03 &nbsp; 현장에서 해볼 질문</span></div>
    </div></section>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8" aria-labelledby="archive-title">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold tracking-[0.16em] text-primary">THE WEEKLY ARCHIVE</p><h2 id="archive-title" className="mt-3 font-serif text-2xl font-semibold">차곡차곡 쌓이는 인사이트</h2></div><p className="text-xs text-muted-foreground">총 {shown.length}호</p></div>
      <nav aria-label="인사이트 주제" className="my-8 flex flex-wrap gap-2">{[{ id: "", label: "전체" }, ...insightCategories].map(category => <Link key={category.id} href={category.id ? `/insights?topic=${category.id}` : "/insights"} aria-current={(topic?.id ?? "") === category.id ? "page" : undefined} className={`rounded-full border px-4 py-2.5 text-sm transition-colors ${(topic?.id ?? "") === category.id ? "border-primary bg-primary text-white" : "border-border hover:border-primary"}`}>{category.label}</Link>)}</nav>
      {shown.length ? <div className={shown.length === 1 ? "max-w-3xl" : "grid gap-5 md:grid-cols-2 xl:grid-cols-3"}>{shown.map(issue => <IssueCard key={issue.id} issue={issue} />)}</div> : <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center"><h3 className="font-serif text-xl">{topic ? "이 주제의 발행본을 준비하고 있습니다." : "첫 번째 인사이트를 준비하고 있습니다."}</h3><p className="mt-3 text-sm text-muted-foreground">공식 자료를 바탕으로 정리한 발행본을 이곳에 차례로 게시합니다.</p></div>}
      <p className="mt-12 max-w-3xl border-t border-border pt-6 text-xs leading-6 text-muted-foreground">소이랩 인사이트는 공개된 공식 자료를 바탕으로 AI가 수집·편집하고 원문과 요약의 일치 여부를 자동 점검하는 웹 간행물입니다. 요약은 원문을 대체하지 않으며, ‘소이랩의 시선’과 질문은 현장 적용을 위한 제안입니다.</p>
    </section>
  </main><Footer /></div>
}
