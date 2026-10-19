import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { serviceCases } from "@/lib/services"

export function ServiceCases() {
  return (
    <section id="cases" aria-labelledby="cases-title" className="scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary">SELECTED WORK</p>
        <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 id="cases-title" className="font-serif text-3xl font-bold sm:text-4xl">사례로 확인하는 실행력</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              어떤 문제를 맡았고, 어떻게 운영했는지. 사업에 필요한 역량을 실제 수행 사례에서 확인하세요.
            </p>
          </div>
          <Link href="/impact" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
            전체 실적 보기<ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {serviceCases.map((project, index) => (
            <article key={project.title} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
              <div className="border-b border-border bg-secondary/60 p-6 lg:p-7">
                <div className="flex items-center justify-between gap-3 text-xs font-medium text-primary">
                  <span>{project.category}</span><span className="text-accent">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold leading-8">{project.title}</h3>
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <p className="text-sm font-medium leading-7 text-foreground">{project.question}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.role}</p>
                <p className="mb-6 mt-5 border-l-2 border-accent pl-3 text-xs leading-6 text-primary">{project.output}</p>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 self-start text-sm font-semibold text-primary underline-offset-4 hover:underline">
                  수행 과정 자세히 보기<ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (새 창)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
