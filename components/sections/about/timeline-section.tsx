import { CheckCircle2 } from "lucide-react"

const milestones = [
  {
    year: "2018",
    title: "협동조합 소이랩 설립",
    events: [
      "사회적협동조합 설립 인가",
      "대구광역시 남구 사무실 개소",
      "첫 번째 리빙랩 프로젝트 착수",
    ],
  },
  {
    year: "2019",
    title: "사업 영역 확장",
    events: [
      "청년정책 연구 사업 시작",
      "대구시 도시재생 컨설팅 참여",
      "지역 사회적경제 네트워크 가입",
    ],
  },
  {
    year: "2020",
    title: "코로나19 대응 및 디지털 전환",
    events: [
      "비대면 리빙랩 방법론 개발",
      "온라인 교육 프로그램 론칭",
      "지역 소상공인 디지털 전환 지원",
    ],
  },
  {
    year: "2021",
    title: "ESG 컨설팅 사업 본격화",
    events: [
      "ESG 컨설팅 서비스 론칭",
      "지역 중소기업 ESG 경영 지원 시작",
      "사회적 가치 측정 연구 수행",
    ],
  },
  {
    year: "2022",
    title: "인지건강디자인 분야 진출",
    events: [
      "고령친화 서비스 디자인 프로젝트",
      "인지건강 프로그램 개발",
      "시니어 디지털 리터러시 교육",
    ],
  },
  {
    year: "2023",
    title: "사회적 임팩트 확대",
    events: [
      "누적 프로젝트 50건 달성",
      "대구 청년정책 자문기관 선정",
      "지역 사회혁신 생태계 구축 참여",
    ],
  },
  {
    year: "2024",
    title: "지속적인 성장",
    events: [
      "ESG 컨설팅 실적 확대",
      "신규 리빙랩 프로젝트 다수 수행",
      "조합원 및 파트너십 확대",
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
            2018년 설립 이후 지역사회와 함께 성장해온 발자취
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
