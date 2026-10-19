import { ArrowUpRight } from "lucide-react"
import { impactFocus, impactRoadmap, socialImpactVision } from "@/lib/social-impact"

const assets = [
  ["사회문제에 대한 전문 지식", "정책·연구자료와 당사자의 경험을 연결하고, 현장에서 얻은 지식을 다음 사업에 활용합니다."],
  ["AI 기반 해결 도구", "검색·분석·기록·보고의 반복 업무를 줄이는 도구를 만들고, 현장의 사용성과 필요성을 먼저 확인합니다."],
  ["검증 가능한 사회적 성과", "사업 실적과 실제 문제의 개선을 구분합니다. 효과가 없었던 시도와 수정·중단의 이유도 학습 자산으로 남깁니다."],
]
const roles = ["사회문제 탐색", "AI 솔루션 설계", "사회적 효과 검증", "사회혁신 확산"]

export function StrategySection() {
  return (
    <section id="soilab-2030" aria-labelledby="strategy-title" className="scroll-mt-24 bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary">{socialImpactVision.label}</p>
          <h2 id="strategy-title" className="mt-4 text-balance font-serif text-3xl font-bold leading-snug sm:text-4xl">{socialImpactVision.title}</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{socialImpactVision.description}</p>
          <p className="mt-4 leading-8 text-muted-foreground">시민과 조직의 연결을 통해 사회적 가치를 창출한다는 미션을 AI 시대의 실행으로 이어갑니다. 청년과 돌봄을 우선 실증 분야로 삼고, 리빙랩으로 문제 탐색부터 검증과 확산까지 연결하는 AI 기반 사회혁신 실행조직을 지향합니다.</p>
        </div>
        <div className="mt-10 rounded-2xl bg-primary p-7 text-primary-foreground sm:p-10">
          <p className="text-sm font-semibold text-primary-foreground/80">AI × Philanthropy × Social Innovation</p>
          <h3 className="mt-3 font-serif text-2xl font-bold">사람·기술·자원을 사회문제 해결에 연결합니다</h3>
          <p className="mt-4 max-w-4xl leading-8 text-primary-foreground/90">소이랩이 지향하는 필란트로피(Philanthropy)는 자금뿐 아니라 기술, 사람, 데이터, 네트워크를 공익적 문제 해결에 투입하고, 그 성과를 사회와 공유하는 운영 원리입니다. 공공사업에서 얻은 경험을 자체 연구·실험으로 발전시키고, 검증된 해결모델을 다음 현장과 연결합니다.</p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{roles.map((role, index) => <li key={role} className="border-t border-white/30 pt-3 text-sm">0{index + 1} · {role}</li>)}</ol>
        </div>
        <div className="mt-12">
          <h3 className="font-serif text-2xl font-bold">집중할 세 가지 영역</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">{impactFocus.map((item) => <article key={item.title} className="rounded-xl border border-border bg-card p-6"><h4 className="text-lg font-semibold text-primary">{item.title}</h4><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p></article>)}</div>
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-2xl font-bold">사업이 끝나도 남는 사회혁신 자산</h3>
            <dl className="mt-6 space-y-6">{assets.map(([title, body]) => <div key={title}><dt className="font-semibold text-primary">{title}</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">{body}</dd></div>)}</dl>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h3 className="font-serif text-2xl font-bold">지속가능한 운영을 위한 방향</h3>
            <dl className="mt-6 space-y-5 text-sm leading-7">
              <div><dt className="font-semibold">공익 실험</dt><dd className="mt-1 text-muted-foreground">공공기관·재단·기업과 현장의 미충족 문제를 탐색하고 초기 실증에 필요한 자원을 연결합니다.</dd></div>
              <div><dt className="font-semibold">검증된 모델의 기관 도입</dt><dd className="mt-1 text-muted-foreground">효용과 운영 가능성을 확인한 뒤 구축·운영·교육·컨설팅 등 현장에 맞는 제공 방식을 검토합니다.</dd></div>
              <div><dt className="font-semibold">사회적 환원과 재투자</dt><dd className="mt-1 text-muted-foreground">축적한 지식과 도구의 공유, 소규모 조직의 접근성 확대, 다음 실험으로의 재투자를 지향합니다. 구체적인 제공 조건은 과제별로 정합니다.</dd></div>
            </dl>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="font-serif text-2xl font-bold">2030을 향한 단계별 추진 방향</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">2026년 10월 기준의 중장기 방향입니다. 세부 과제·일정·협력 범위는 인력, 예산과 실증 결과에 따라 구체화합니다.</p>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">{impactRoadmap.map((item) => <li key={item.period} className="border-t-2 border-primary/30 pt-5"><p className="text-sm font-semibold text-primary">{item.period}</p><h4 className="mt-2 text-lg font-semibold">{item.title}</h4><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p></li>)}</ol>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <h3 className="text-xl font-semibold">문제의 개선을 기준으로 판단합니다</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">AI의 적용 여부는 현장의 필요와 효과를 기준으로 정합니다. 개인정보와 당사자의 선택권을 보호하고, 지원 대상의 적격성이나 위험도에 관한 최종 판단은 사람이 담당합니다. 참여인원·만족도와 실제 변화의 근거를 구분해 공개합니다.</p>
          <a className="mt-6 inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline" href={socialImpactVision.labUrl} target="_blank" rel="noopener noreferrer">실증 방법·연구·검증 근거는 소이랩 LAB에서<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  )
}
