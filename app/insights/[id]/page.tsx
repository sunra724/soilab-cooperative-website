import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getInsight, issueNumber, shortDate } from "@/lib/insights"
import { insightCategories } from "@/lib/insights-schema"

export const revalidate = 300
type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  if (!/^\d{4}-\d{2}-\d{2}$/.test(id)) return {}
  const issue = await getInsight(id)
  if (!issue) return {}
  return { title: `소이랩 인사이트 No.${issueNumber(issue.number)} · ${issue.title}`, description: issue.introduction, alternates: { canonical: `/insights/${id}` }, openGraph: { type: "article", title: issue.title, description: issue.introduction, url: `/insights/${id}`, publishedTime: issue.publishedAt } }
}

export default async function InsightPage({ params }: Props) {
  const { id } = await params
  if (!/^\d{4}-\d{2}-\d{2}$/.test(id)) notFound()
  const issue = await getInsight(id)
  if (!issue) notFound()
  const categories = insightCategories.filter(category => issue.items.some(item => item.category === category.id))
  const publishedDate = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" }).format(new Date(issue.publishedAt))
  return <div className="flex min-h-screen flex-col"><Header /><main className="flex-1">
    <article className="mx-auto max-w-5xl px-4 py-10 sm:py-16 lg:px-8">
      <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> 인사이트 목록</Link>
      <header className="mt-9 border-t-4 border-primary pb-10 pt-7 sm:pb-14">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">SOILAB WEEKLY INSIGHT</p>
        <div className="mt-5 flex flex-wrap items-center gap-3"><span className="font-serif text-2xl text-primary">No.{issueNumber(issue.number)}</span><span className="rounded-full border border-primary/20 px-3 py-1 text-xs text-primary">정책과 연구에서 현장으로</span></div>
        <h1 className="mt-5 max-w-3xl text-balance font-serif text-3xl font-bold leading-snug sm:text-5xl sm:leading-snug">{issue.title}</h1>
        <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-xs leading-6 text-muted-foreground"><p>발행일 <time dateTime={publishedDate} className="ml-2 text-foreground">{shortDate(publishedDate)}</time></p><p>조사기간 <span className="ml-2 text-foreground">{shortDate(issue.periodStart)} — {shortDate(issue.periodEnd)}</span></p><p>발행 <span className="ml-2 text-foreground">협동조합 소이랩</span></p></div>
        <p className="mt-8 max-w-3xl text-base leading-8 text-foreground/80">{issue.introduction}</p>
      </header>
      <aside className="rounded-2xl bg-primary px-6 py-7 text-white sm:px-8" aria-labelledby="weekly-question"><p id="weekly-question" className="text-xs font-medium tracking-[0.14em] text-white/70">이번 주, 함께 묻는 질문</p><p className="mt-3 font-serif text-xl leading-relaxed sm:text-2xl">{issue.weeklyQuestion}</p></aside>
      <nav aria-label="이번 호 목차" className="my-10 flex flex-wrap gap-2 border-b border-border pb-8">{categories.map((category, index) => <a key={category.id} href={`#${category.id}`} className="rounded-full border border-border px-4 py-2.5 text-xs hover:border-primary hover:text-primary">{String(index + 1).padStart(2, "0")} &nbsp; {category.label}</a>)}</nav>
      {categories.map((category, index) => <section key={category.id} id={category.id} className="scroll-mt-28 pb-10" aria-labelledby={`${category.id}-title`}>
        <div className="mb-6 flex items-baseline gap-4 border-b border-primary/30 pb-4"><span className="font-serif text-3xl text-primary/50">{String(index + 1).padStart(2, "0")}</span><h2 id={`${category.id}-title`} className="font-serif text-xl font-semibold sm:text-2xl">{category.label}</h2></div>
        <div className="space-y-6">{issue.items.filter(item => item.category === category.id).map(item => <section key={item.id} className="rounded-2xl border border-border bg-white p-5 sm:p-8" aria-labelledby={`item-${item.id}`}>
          <p className="text-xs leading-6 text-muted-foreground">{item.publishedAt ? shortDate(item.publishedAt) : `${item.publicationYear}년 발행 · 발행일 미확인`} <span className="mx-1">|</span> {item.publisher} <span className="mx-1">|</span> {item.kind}</p>
          <h3 id={`item-${item.id}`} className="mt-3 font-serif text-xl font-semibold leading-relaxed sm:text-2xl">{item.title}</h3>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/85 marker:text-primary/60">{item.summary.map((line, i) => <li key={i}>{line}</li>)}</ul>
          <div className="mt-6 space-y-4 border-l-2 border-primary/30 bg-[#f3f6f1] px-5 py-4"><div><h4 className="text-xs font-bold text-primary">소이랩의 시선</h4><p className="mt-2 text-sm leading-7 text-foreground/80">{item.perspective}</p></div><div><h4 className="text-xs font-bold text-primary">현장에서 해볼 질문</h4><p className="mt-2 text-sm leading-7 text-foreground/80">{item.question}</p></div></div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline">원문 · 공식자료 <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a><span className="text-[11px] leading-5 text-muted-foreground">요약 근거: {item.evidenceType}</span></div>
        </section>)}</div>
      </section>)}
      <footer className="border-t-2 border-primary pt-8">
        <h2 className="font-serif text-lg font-semibold">발행 정보</h2><dl className="mt-4 grid grid-cols-[5rem_1fr] gap-y-2 text-xs leading-6"><dt className="text-muted-foreground">간행물</dt><dd>소이랩 인사이트 No.{issueNumber(issue.number)}</dd><dt className="text-muted-foreground">발행</dt><dd>협동조합 소이랩 · {shortDate(publishedDate)}</dd><dt className="text-muted-foreground">조사기간</dt><dd>{shortDate(issue.periodStart)} — {shortDate(issue.periodEnd)} (한국시간)</dd><dt className="text-muted-foreground">문의·정정</dt><dd><a href="mailto:soilabcoop@gmail.com" className="underline underline-offset-4">soilabcoop@gmail.com</a></dd></dl>
        <div className="mt-6 rounded-xl bg-secondary p-5 text-xs leading-6 text-muted-foreground"><h3 className="font-semibold text-foreground">AI 활용과 읽을 때의 안내</h3><p className="mt-2">공개된 공식 자료의 수집, 분류, 요약과 원문 대조에 생성형 AI를 활용해 자동 게시합니다. 사람이 매호 사전 검토한 간행물은 아닙니다. 사실 요약과 소이랩의 해석·제안을 구분했으며, 시행 여부·신청 요건·수치는 공식 원문에서 확인해 주세요. 요약은 원문을 대체하지 않습니다. 원자료의 저작권은 각 권리자에게 있으며, 편집과 정정의 책임은 발행기관에 있습니다.</p></div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4"><Link href="/insights" className="text-sm font-semibold text-primary">← 모든 인사이트 보기</Link><a href="https://www.soilab-youth.kr/research" className="text-sm text-primary">청년 정책·연구 더 읽기 ↗</a></div>
      </footer>
    </article>
  </main><Footer /></div>
}
