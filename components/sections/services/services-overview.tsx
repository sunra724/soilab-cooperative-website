import { Leaf, Building2, Users, Brain } from "lucide-react"

const services = [
  {
    icon: Leaf,
    title: "ESG 경영컨설팅",
    description: "K-ESG 지표 기반",
  },
  {
    icon: Building2,
    title: "리빙랩 운영",
    description: "시민 참여형 혁신",
  },
  {
    icon: Users,
    title: "청년정책 프로그램",
    description: "청년 역량 강화",
  },
  {
    icon: Brain,
    title: "인지건강디자인",
    description: "치매예방 서비스",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-12 bg-secondary/30 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="flex items-center gap-4 group"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm lg:text-base">
                  {service.title}
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
