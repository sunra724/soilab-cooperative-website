import { ArrowUpRight, FlaskConical, Users } from "lucide-react"
import { primaryServices } from "@/lib/services"

const icons = { livinglab: FlaskConical, youth: Users }

export function ServiceDetailCards() {
  return (
    <div>
      {primaryServices.map((service) => {
        const Icon = icons[service.id]

        return (
          <section key={service.id} id={service.id} aria-labelledby={`${service.id}-title`} className="scroll-mt-24 border-b border-border py-16 even:bg-secondary/40 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                <div>
                  <p className="mb-5 text-xs font-semibold tracking-[0.15em] text-primary">
                    CORE BUSINESS {service.number} <span className="mx-2 text-border">/</span> {service.english}
                  </p>
                  <div className="flex items-center gap-3">
                    <Icon className="h-7 w-7 shrink-0 text-primary" aria-hidden="true" />
                    <h2 id={`${service.id}-title`} className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">{service.title}</h2>
                  </div>
                  <p className="mt-5 max-w-md text-xl font-medium leading-9 text-primary">{service.headline}</p>
                </div>
                <div className="lg:pt-8">
                  <p className="text-base leading-8 text-muted-foreground">{service.description}</p>
                  <p className="mt-5 text-sm leading-6">
                    <span className="mr-3 font-semibold text-foreground">함께하는 기관</span>
                    <span className="text-muted-foreground">{service.audience}</span>
                  </p>
                </div>
              </div>
              <div className="mt-9 grid gap-4 md:grid-cols-3 lg:mt-12">
                {service.modules.map((module, index) => (
                  <article key={module.title} className="flex flex-col rounded-xl border border-border bg-card p-6 lg:p-7">
                    <span className="text-xs font-semibold text-accent">{service.number} — 0{index + 1}</span>
                    <h3 className="mt-5 text-lg font-bold">{module.title}</h3>
                    <p className="mb-6 mt-3 text-sm leading-7 text-muted-foreground">{module.description}</p>
                    <p className="mt-auto border-t border-border pt-4 text-xs font-medium leading-6 text-primary">{module.scope}</p>
                  </article>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-5 rounded-xl bg-primary/[0.05] p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-primary">사업에 남기는 결과물</h3>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {service.outputs.map((output) => <li key={output} className="text-sm text-muted-foreground">{output}</li>)}
                  </ul>
                </div>
                <a href={service.href} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary lg:self-center">
                  {service.linkLabel}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (새 창)</span>
                </a>
              </div>
              {service.id === "youth" && (
                <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm text-primary">
                  <a href="https://soilab-youth.kr/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
                    고립·은둔청년 지원 정보<ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (새 창)</span>
                  </a>
                  <a href="https://nest.soilabcoop.kr/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
                    남구 청년 둥지(N.E.S.T)<ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (새 창)</span>
                  </a>
                </div>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
