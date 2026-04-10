import { CheckCircle2 } from "lucide-react"

const milestones = [
  {
    year: "2012",
    title: "협동조합 소이랩 설립",
    events: [
      "협동조합 설립",
    ],
  },
  {
    year: "2013",
    title: "법인 설립",
    events: [
      "법인 설립",
      "사회문제 해결 사업 시작",
    ],
  },
  {
    year: "2018",
    title: "사회적기업 인증 및 사업 확장",
    events: [
      "사회적기업 인증 (고용노동부)",
      "국민해결 산격1동 기억보듬길 리빙랩 사업 진행 (행정안전부)",
      "대구 북구도시재생지원센터 위탁 운영기관 선정 (대구 북구청)",
    ],
  },
  {
    year: "2022",
    title: "리빙랩·사회혁신 성과 확대",
    events: [
      "성내2동 도시재생연계리빙랩 운영용역 (대구테크노파크)",
      "주민참여 리빙랩 프로젝트 운영용역 (대구환경공단)",
      "SW융합클러스터 2.0 도시서비스 개발 및 상용화",
      "소셜벤처기업 판별 (중소벤처기업부 장관)",
      "우수 사회적기업 표창 (대구광역시장 제 1637호)",
    ],
  },
]

export function TimelineSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            소이랩이 <span className="text-primary">걸어온 길</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            2012년 설립 이후 지역사회와 함께 성장해온 발자취
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-primary/20 lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex flex-col lg:flex-row ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-16`}
              >
                {/* Year marker */}
                <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold z-10">
                  <span className="sr-only">{milestone.year}</span>
                </div>

                {/* Content */}
                <div
                  className={`ml-16 lg:ml-0 lg:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "lg:text-right lg:pr-8" : "lg:text-left lg:pl-8"
                  }`}
                >
                  <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-bold text-accent mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                      {milestone.title}
                    </h3>
                    <ul className={`space-y-2 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                      {milestone.events.map((event) => (
                        <li
                          key={event}
                          className={`flex items-start gap-2 text-sm text-muted-foreground ${
                            index % 2 === 0 ? "lg:flex-row-reverse lg:text-right" : ""
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
