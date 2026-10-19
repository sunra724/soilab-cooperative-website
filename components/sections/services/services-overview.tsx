import { ArrowDownRight } from "lucide-react"

const navigation = [
  { id: "livinglab", label: "리빙랩 운영" },
  { id: "youth", label: "청년정책·청년지원" },
  { id: "capabilities", label: "일하는 방식과 역량" },
  { id: "cases", label: "대표 수행 사례" },
  { id: "specialties", label: "전문 협업 분야" },
]

export function ServicesOverview() {
  return (
    <nav aria-label="사업소개 바로가기" className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 lg:grid-cols-5 lg:px-8">
        {navigation.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} className="group flex min-h-20 items-center gap-3 border-b border-border px-3 py-5 text-sm transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary lg:border-b-0 lg:px-4">
            <span className="text-xs text-accent">0{index + 1}</span>
            <span className="font-medium">{item.label}</span>
            <ArrowDownRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  )
}
