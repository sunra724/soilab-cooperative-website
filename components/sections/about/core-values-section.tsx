import { Users, Lightbulb, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const coreValues = [
  {
    icon: Users,
    title: "협동",
    subtitle: "Cooperation",
    description:
      "우리는 혼자가 아닌 함께의 힘을 믿습니다. 시민, 기업, 공공기관이 손을 맞잡아 더 큰 변화를 만들어냅니다. 협동조합의 정신으로 모두가 주인이 되는 조직을 운영합니다.",
    highlights: ["이해관계자 참여", "민관협력", "조합원 거버넌스"],
  },
  {
    icon: Lightbulb,
    title: "혁신",
    subtitle: "Innovation",
    description:
      "기존의 방식에 안주하지 않고 새로운 접근법을 탐색합니다. 리빙랩, 디자인씽킹 등 혁신적인 방법론을 활용하여 사회문제 해결의 새로운 가능성을 열어갑니다.",
    highlights: ["리빙랩 방법론", "디자인씽킹", "실험적 접근"],
  },
  {
    icon: Leaf,
    title: "지속가능성",
    subtitle: "Sustainability",
    description:
      "단기적 성과보다 장기적 가치를 추구합니다. 환경, 사회, 경제가 조화롭게 발전하는 지속가능한 미래를 위해 ESG 관점에서 모든 사업을 기획하고 실행합니다.",
    highlights: ["ESG 경영", "환경 친화", "사회적 가치"],
  },
]

export function CoreValuesSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            소이랩의 <span className="text-primary">핵심 가치</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            세 가지 핵심 가치가 소이랩의 모든 활동을 이끕니다
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {coreValues.map((value, index) => (
            <Card
              key={value.title}
              className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-card overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="bg-primary/5 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {value.subtitle}
                  </p>
                </div>
                <div className="p-8">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {value.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {value.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
