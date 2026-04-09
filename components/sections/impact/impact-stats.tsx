import { Briefcase, Users, Building, Calendar } from "lucide-react"

const stats = [
  {
    value: "150",
    suffix: "건",
    label: "수행 사업",
    description: "설립 이후 완료한 프로젝트",
    icon: Briefcase,
  },
  {
    value: "50,000",
    suffix: "명+",
    label: "누적 수혜자",
    description: "프로그램 참여 및 서비스 이용자",
    icon: Users,
  },
  {
    value: "30",
    suffix: "개+",
    label: "협력기관",
    description: "함께하는 기관 및 단체",
    icon: Building,
  },
  {
    value: "8",
    suffix: "년",
    label: "수행연도",
    description: "2018년 설립 이후",
    icon: Calendar,
  },
]

export function ImpactStats() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            숫자로 보는 <span className="text-primary">소이랩</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            소이랩의 성장과 성과를 한눈에 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-6 lg:p-8 shadow-sm border border-border text-center group hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div className="font-serif text-4xl lg:text-5xl font-bold text-primary">
                {stat.value}
                <span className="text-2xl lg:text-3xl">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-lg font-medium text-foreground">
                {stat.label}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
