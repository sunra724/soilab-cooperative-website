import { ArrowUpRight, Brain, Leaf } from "lucide-react"
import { specialistServices } from "@/lib/services"

const icons = { esg: Leaf, cognitive: Brain }

export function SpecialistServices() {
  return (
    <section id="specialties" aria-labelledby="specialties-title" className="scroll-mt-24 border-t border-border bg-secondary/40 py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-primary">SPECIALIST COLLABORATION</p>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-baseline lg:gap-8">
          <h2 id="specialties-title" className="font-serif text-2xl font-bold sm:text-3xl">전문성을 더하는 협업 분야</h2>
          <p className="text-sm leading-7 text-muted-foreground">사업의 목적과 현장의 필요에 맞춰 전문 역량을 연결합니다.</p>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {specialistServices.map((service) => {
            const Icon = icons[service.id]
            return (
              <article key={service.id} id={service.id} className="scroll-mt-24 rounded-xl border border-border bg-card p-6 lg:p-7">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" /><h3 className="text-lg font-semibold">{service.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.description}</p>
                <p className="mt-4 text-xs font-medium leading-6 text-primary">{service.scope}</p>
                <a href={service.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline">
                  {service.linkLabel}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (새 창)</span>
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
