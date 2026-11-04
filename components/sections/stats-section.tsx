import Link from "next/link"
import { publicStats, publicStatsBasis } from "@/lib/public-stats"

export function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-balance break-keep font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
            공개자료로 보는 <span className="whitespace-nowrap text-accent-soft">소이랩</span>
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
            지역사회와 함께 만들어온 변화의 기록입니다.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {publicStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="whitespace-nowrap font-serif text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl">
                {stat.value}<span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-lg text-primary-foreground/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-primary-foreground/85">{publicStatsBasis} <Link href="/impact#public-records" className="underline underline-offset-4">공개 실적 기준 보기</Link></p>
      </div>
    </section>
  )
}
