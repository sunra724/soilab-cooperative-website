import { ArrowRight, ArrowUpRight, Cpu, FolderCheck, Network } from "lucide-react"

const capabilities = [
  {
    icon: Network,
    title: "거버넌스를 실행 구조로",
    description: "참여 주체의 역할과 의사결정 경로를 설계합니다. 현장의 제안이 누구에게 검토되고 어떻게 반영되는지 기록해 협의가 다음 행동으로 이어지게 합니다.",
    evidence: "시민 의견 · 검토 사유 · 반영 결과",
    label: "고양 스마트시티 운영 사례",
    href: "https://lab.soilabcoop.kr/cases/goyang-smartcity",
  },
  {
    icon: Cpu,
    title: "AI·AX를 현장 업무에",
    description: "AI 회의록, 워크시트 OCR, 교육 운영 시스템 등 직접 구축한 도구를 업무에 적용합니다. 기록 정리와 반복 업무를 줄이고, 담당자가 결과를 검토해 확정합니다.",
    evidence: "회의 기록 · 현장 자료 정리 · 운영 자동화",
    label: "운영 사례·공개 데모 보기",
    href: "https://lab.soilabcoop.kr/ax",
  },
  {
    icon: FolderCheck,
    title: "운영 기록을 성과 근거로",
    description: "사업 목표에 맞는 지표와 수집할 자료를 함께 정합니다. 참여·설문·현장 기록을 결과보고와 연결하고 다음 사업의 개선 근거로 축적합니다.",
    evidence: "성과지표 · 근거자료 · 개선 과제",
    label: "성과 기록 방법론 보기",
    href: "https://lab.soilabcoop.kr/methodology/evidence-loop",
  },
]

const steps = ["문제 발견", "의견 구조화", "기술·행정 검토", "설계 반영", "현장 실증", "시민 피드백"]

export function ServiceCapabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-24 bg-[#193f32] py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.16em] text-[#d4e7cc]">HOW WE WORK</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-2 lg:gap-16">
          <h2 id="capabilities-title" className="font-serif text-3xl font-semibold leading-normal sm:text-4xl">
            사람의 협력에<br />기술과 근거를 더합니다.
          </h2>
          <p className="text-base leading-8 text-white/75 lg:self-end">
            현장을 이해하는 기획력, 다양한 주체를 연결하는 조정력,
            디지털 도구를 직접 만들고 적용하는 실행력으로 사업을 운영합니다.
          </p>
        </div>
        <div className="mt-10 grid gap-7 md:grid-cols-3 lg:mt-12 lg:gap-10">
          {capabilities.map((capability) => (
            <article key={capability.title} className="flex flex-col border-t border-white/20 pt-7">
              <capability.icon className="h-7 w-7 text-[#d4e7cc]" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold">{capability.title}</h3>
              <p className="mb-6 mt-4 text-sm leading-7 text-white/75">{capability.description}</p>
              <div className="mt-auto">
                <p className="text-xs leading-6 text-[#d4e7cc]">{capability.evidence}</p>
                <a href={capability.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline">
                  {capability.label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (새 창)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-xl border border-white/20 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h3 className="text-base font-semibold">소이랩의 실증·환류 과정</h3>
            <p className="text-xs text-white/65">의견을 모으는 단계부터 결과를 돌려주는 단계까지</p>
          </div>
          <ol className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <li key={step} className="flex items-center gap-3">
                <div className="flex-1">
                  <span className="text-xs text-[#d4e7cc]">0{index + 1}</span>
                  <p className="mt-2 text-sm font-medium">{step}</p>
                </div>
                {index < steps.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-white/30" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
