import { Heart, Users, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const values = [
  {
    icon: Heart,
    title: "사회적 가치 실현",
    description:
      "지역사회의 문제를 함께 발굴하고 해결하며, 모두가 행복한 공동체를 만들어갑니다.",
  },
  {
    icon: Users,
    title: "협력과 연대",
    description:
      "다양한 이해관계자와의 협력을 통해 더 큰 사회적 임팩트를 창출합니다.",
  },
  {
    icon: Lightbulb,
    title: "혁신적 접근",
    description:
      "기존의 틀을 넘어 창의적이고 지속가능한 해결책을 제시합니다.",
  },
]

export function ValuesSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            소이랩이 추구하는 <span className="text-primary">가치</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            협동조합 소이랩은 사회적 가치 실현, 협력과 연대, 혁신적 접근을 
            핵심 가치로 삼아 지역사회 발전에 기여합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((value) => (
            <Card
              key={value.title}
              className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card"
            >
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-card-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
