import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { impactJourney, socialImpactVision } from "@/lib/social-impact"

export function SocialImpactSection() {
  return (
    <section aria-labelledby="impact-direction-title" className="border-y border-border bg-primary/5 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="text-sm font-semibold tracking-wide text-primary">{socialImpactVision.label}</p>
        <h2 id="impact-direction-title" className="mt-4 max-w-3xl text-balance font-serif text-3xl font-bold leading-snug sm:text-4xl">{socialImpactVision.title}</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{socialImpactVision.description}</p>
        <ol className="mt-9 grid gap-6 md:grid-cols-3">
          {impactJourney.map((step, index) => (
            <li key={step.name} className="border-t-2 border-primary/25 pt-5">
              <p className="text-xs font-semibold text-primary">0{index + 1} · {step.name}</p>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild><Link href="/about#soilab-2030">SOILAB 2030 방향 읽기<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></Button>
          <Button variant="outline" asChild><a href={socialImpactVision.labUrl} target="_blank" rel="noopener noreferrer">LAB에서 실증 방법 보기<ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" /></a></Button>
        </div>
      </div>
    </section>
  )
}
