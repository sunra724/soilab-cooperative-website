import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { insightCategories, type InsightIssue } from "@/lib/insights-schema"
import { issueNumber, shortDate } from "@/lib/insights"

export function IssueCard({ issue, featured = false }: { issue: InsightIssue; featured?: boolean }) {
  return <Link href={`/insights/${issue.id}`} prefetch={false} className={`group flex h-full flex-col rounded-2xl border p-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-8 ${featured ? "border-primary/20 bg-white" : "border-border bg-background hover:border-primary/40"}`}>
    <div className="flex items-center justify-between text-xs font-medium tracking-wider text-primary">
      <span>WEEKLY INSIGHT / {issueNumber(issue.number)}</span>
      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
    </div>
    <p className="mt-6 text-xs text-muted-foreground">{shortDate(issue.periodStart)} — {shortDate(issue.periodEnd)}</p>
    <h3 className="mt-3 font-serif text-xl font-semibold leading-relaxed text-foreground group-hover:text-primary sm:text-2xl">{issue.title}</h3>
    <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">{issue.introduction}</p>
    <div className="mt-auto flex flex-wrap gap-2 pt-6">{insightCategories.filter(category => issue.items.some(item => item.category === category.id)).map(category => <span key={category.id} className="rounded-full bg-primary/5 px-3 py-1 text-[11px] text-primary">{category.label}</span>)}</div>
    <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">자료 {issue.items.length}건 · {shortDate(new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" }).format(new Date(issue.publishedAt)))} 발행</div>
  </Link>
}
