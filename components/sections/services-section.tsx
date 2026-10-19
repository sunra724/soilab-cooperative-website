import Link from "next/link"
import { ArrowRight, ArrowUpRight, Brain, FlaskConical, Leaf, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { primaryServices, specialistServices } from "@/lib/services"

const primaryIcons = { livinglab: FlaskConical, youth: Users }
const specialistIcons = { esg: Leaf, cognitive: Brain }

export function ServicesSection() {
  return (
    <section aria-labelledby="home-services-title" className="bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-primary">OUR CORE BUSINESS</p>
            <h2 id="home-services-title" className="font-serif text-3xl font-bold sm:text-4xl">
              현장과 사람을 잇는 <span className="text-primary">두 가지 중심</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              리빙랩과 청년지원 현장에서 쌓은 경험에 거버넌스, AI·데이터 활용 역량을 더합니다.
            </p>
          </div>
          <Button variant="outline" asChild><Link href="/services">사업소개 자세히 보기<ArrowRight aria-hidden="true" /></Link></Button>
        </div>
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {primaryServices.map((service) => {
            const Icon = primaryIcons[service.id]
            return (
              <Link key={service.id} href={`/services#${service.id}`} className="group rounded-xl border border-border bg-card p-7 transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary lg:p-9">
                <div className="flex items-center justify-between gap-3">
                  <Icon className="h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-xs font-semibold tracking-widest text-accent">{service.number} / {service.english}</span>
                </div>
                <h3 className="mt-7 font-serif text-2xl font-bold">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.headline}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.modules.map((module) => <li key={module.title} className="rounded-md bg-secondary px-3 py-2 text-xs leading-5 text-primary">{module.title}</li>)}
                </ul>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  수행 분야 살펴보기<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-border px-6 py-5 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-sm text-muted-foreground">전문 협업 분야</p>
            {specialistServices.map((service) => {
              const Icon = specialistIcons[service.id]
              return (
                <Link key={service.id} href={`/services#${service.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline">
                  <Icon className="h-4 w-4" aria-hidden="true" />{service.title}
                </Link>
              )
            })}
          </div>
          <a href="https://lab.soilabcoop.kr/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
            수행 사례·AI 활용 포트폴리오<ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (새 창)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
