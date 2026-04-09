import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, FlaskConical, GraduationCap, Brain, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Leaf,
    title: "ESG 컨설팅",
    description:
      "기업의 지속가능경영을 위한 ESG 전략 수립 및 실행을 지원합니다. 환경, 사회, 지배구조 전반에 걸친 맞춤형 솔루션을 제공합니다.",
  },
  {
    icon: FlaskConical,
    title: "리빙랩",
    description:
      "지역 주민과 함께 생활 속 문제를 발굴하고 해결책을 실험합니다. 실제 환경에서의 혁신적인 사회실험을 진행합니다.",
  },
  {
    icon: GraduationCap,
    title: "청년정책",
    description:
      "청년의 목소리를 정책에 반영하고, 청년 주도의 지역 활성화 프로젝트를 기획·운영합니다.",
  },
  {
    icon: Brain,
    title: "인지건강디자인",
    description:
      "고령화 사회에 대비한 인지건강 증진 프로그램과 공간 디자인 솔루션을 개발합니다.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-primary">주요 사업</span> 분야
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            소이랩은 다양한 분야에서 사회혁신을 실천하며 
            지역사회의 지속가능한 발전을 이끌어갑니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-card-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">
              사업 자세히 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
