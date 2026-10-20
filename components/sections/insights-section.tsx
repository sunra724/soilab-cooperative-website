import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getInsights } from "@/lib/insights"
import { IssueCard } from "@/components/insights/issue-card"

export async function InsightsSection() {
  const issues = (await getInsights()).slice(0, 3)
  return <section className="border-y border-primary/10 bg-[#edf2ed] py-20 lg:py-28" aria-labelledby="home-insights-title">
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div><p className="mb-4 text-xs font-semibold tracking-[0.2em] text-primary">SOILAB INSIGHTS</p><h2 id="home-insights-title" className="font-serif text-3xl font-bold sm:text-4xl">읽고, 질문하고,<br className="sm:hidden" /> 현장으로 연결합니다.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">지역의 변화를 만드는 정책과 연구.<br />소이랩의 시선과 다음 실천의 질문을 매주 나눕니다.</p></div>
        <Link href="/insights" className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-primary sm:self-auto">소이랩 인사이트 전체 보기 <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
      {issues.length ? <div className={`grid gap-5 ${issues.length > 1 ? "md:grid-cols-2 xl:grid-cols-3" : "max-w-3xl"}`}>{issues.map(issue => <IssueCard key={issue.id} issue={issue} featured />)}</div> : <div className="rounded-2xl border border-primary/15 bg-white p-8"><p className="font-serif text-xl font-semibold">첫 번째 인사이트를 준비하고 있습니다.</p><p className="mt-3 text-sm leading-7 text-muted-foreground">청년·돌봄, 지역·사회연대경제, 리빙랩, AI 분야의 공식 자료를 읽고 이곳에 쌓아갑니다.</p></div>}
    </div>
  </section>
}
