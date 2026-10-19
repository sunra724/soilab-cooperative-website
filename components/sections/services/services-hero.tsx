import { ArrowDown, ArrowRight, Check, Network } from "lucide-react"
import { Button } from "@/components/ui/button"

const approach = [
  { number: "01", title: "현장을 이해합니다", detail: "관찰 · 인터뷰 · 문제 정의" },
  { number: "02", title: "함께 해법을 만듭니다", detail: "시민 · 행정 · 기업 · 대학의 협력" },
  { number: "03", title: "실증하고 개선합니다", detail: "사용자 검증 · 피드백 · 성과 기록" },
]

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-[#193f32] text-white">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" aria-hidden="true" />
      <div className="absolute -bottom-48 right-32 h-96 w-96 rounded-full border border-white/10" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20 lg:px-8 lg:py-24">
        <div>
          <p className="mb-6 flex items-center gap-3 text-sm font-medium text-[#d4e7cc]">
            <span className="h-px w-8 bg-[#d4e7cc]" aria-hidden="true" />
            사업소개 <span className="text-white/50">/</span> WHAT WE DO
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.4] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            현장에서 발견하고,<br />
            <span className="text-[#d4e7cc]">함께 실증합니다.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
            리빙랩 운영과 청년정책·청년지원사업을 중심으로
            지역의 변화를 만듭니다. 사람을 연결하는 거버넌스와
            AI·데이터 활용으로 기획부터 실행, 성과까지 이어갑니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="h-12 bg-[#d4e7cc] text-[#193f32] hover:bg-[#e3efdd]" asChild>
              <a href="#livinglab">주력사업 살펴보기 <ArrowDown aria-hidden="true" /></a>
            </Button>
            <Button size="lg" variant="outline" className="h-12 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
              <a href="#cases">대표 사례 보기 <ArrowRight aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/[0.05] p-6 sm:p-8">
          <div className="mb-7 flex items-center justify-between border-b border-white/15 pb-5">
            <p className="text-xs font-medium tracking-[0.16em] text-white/70">SOILAB WORKING MODEL</p>
            <Network className="h-5 w-5 text-[#d4e7cc]" aria-hidden="true" />
          </div>
          <ol className="space-y-6">
            {approach.map((step) => (
              <li key={step.number} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4e7cc]/40 text-xs text-[#d4e7cc]">{step.number}</span>
                <div>
                  <p className="text-lg font-medium">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/65">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex items-center gap-2 rounded-lg bg-[#d4e7cc]/10 px-4 py-3 text-sm leading-6 text-[#d4e7cc]">
            <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
            현장의 경험을 다음 실행의 근거로
          </div>
        </div>
      </div>
    </section>
  )
}
