import { Briefcase, Users, Building, Calendar } from "lucide-react"
import { publicStats, publicStatsBasis } from "@/lib/public-stats"

export function ImpactStats() {
  const icons = [Calendar, Briefcase, Users, Building]
  const stats = publicStats.map((stat, index) => ({ ...stat, icon: icons[index] }))

  return (
    <section id="public-records" className="scroll-mt-24 py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-balance break-keep font-serif text-3xl font-bold text-foreground sm:text-4xl">
            공개자료로 보는 <span className="whitespace-nowrap text-primary">소이랩</span>
          </h2>
          <p className="mt-4 break-keep text-muted-foreground max-w-2xl mx-auto">
            공개 수행 사업과 사례, 전문 분야를 확인하세요.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
                className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-border text-center group hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div className="whitespace-nowrap font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                {stat.value}
                <span className="text-xl sm:text-2xl lg:text-3xl">{stat.suffix}</span>
              </div>
              <div className="mt-2 break-keep text-base sm:text-lg font-medium text-foreground">
                {stat.label}
              </div>
              <div className="mt-1 break-keep text-sm text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-muted-foreground">{publicStatsBasis}</p>
      </div>
    </section>
  )
}
