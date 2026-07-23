import { Building2, User, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const executive = {
  role: "이사장",
  name: "강아름",
  description: "조합의 대표로서 전체 운영을 총괄하며, 대외적으로 조합을 대표합니다.",
}

const governance = [
  {
    name: "총회",
    description: "조합원이 참여하는 소이랩의 최고 의결기구입니다.",
    members: "조합원 총회",
  },
  {
    name: "운영위원회",
    description: "주요 사업의 안전성을 심의하고 이사회에 자문합니다.",
    members: "심의·자문",
  },
  {
    name: "이사회",
    description: "조합 경영 전반을 심의·의결하고 사업계획과 예산을 승인합니다.",
    members: "이사장 1명",
  },
  {
    name: "감사",
    description: "조합의 회계와 업무 전반을 감사합니다.",
    members: "1명",
  },
]

const departments = [
  {
    name: "경영지원실",
    description: "경영기획, 재무·회계, 총무·인사 등 경영관리 업무를 담당합니다.",
    members: "1명",
  },
  {
    name: "사업기획팀",
    description: "교육 기획·용역, 교육서비스, 외부 파트너 관리와 거버넌스 사업을 담당합니다.",
    members: "2명",
  },
  {
    name: "ESG연구소",
    description: "교육콘텐츠 연구·개발, 교육사업 운영, AI·AX 활용사업을 담당합니다.",
    members: "3명",
  },
  {
    name: "남구청년지원센터",
    description: "청년지원사업과 고용노동부 청년도전지원사업을 운영합니다.",
    members: "9명",
  },
  {
    name: "로컬콘텐츠사업부",
    description: "지역콘텐츠 사업과 청년귀환채널 ‘고향올래’를 운영합니다.",
    members: "2명",
  },
]

export function OrganizationSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-primary">조직</span> 소개
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            소이랩은 조합원의 참여와 민주적 의사결정을 바탕으로 운영됩니다.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">2026년 6월 기준</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center justify-center gap-2">
            <User className="h-5 w-5 text-primary" />
            대표
          </h3>
          <Card className="border border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-xl font-bold">
                  {executive.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-accent font-medium">{executive.role}</p>
                  <h4 className="font-serif text-xl font-semibold text-foreground">
                    {executive.name}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {executive.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-14">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            의사결정 구조
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {governance.map((item) => (
              <Card key={item.name} className="border border-border shadow-sm">
                <CardContent className="flex h-full flex-col p-6">
                  <div>
                    <h4 className="font-medium text-foreground">{item.name}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <span className="mt-4 w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                    {item.members}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            실행 조직
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {departments.map((department) => (
              <Card key={department.name} className="border border-border shadow-sm">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-medium text-foreground">
                      {department.name}
                    </h4>
                    <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground">
                      {department.members}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {department.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
