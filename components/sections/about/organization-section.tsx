import { User, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const executives = [
  {
    role: "이사장",
    name: "강아름",
    description: "조합의 대표로서 전체 운영을 총괄하며, 대외적으로 조합을 대표합니다.",
  },
  {
    role: "상임이사",
    name: "장종욱",
    description: "사업 전반을 기획·운영하며, 파트너 퍼실리테이터 네트워크를 총괄합니다.",
  },
]

const committees = [
  {
    name: "운영위원회",
    description: "조합의 주요 사업 및 운영 방향을 심의하고 결정합니다.",
    members: "5명",
  },
  {
    name: "감사",
    description: "조합의 재무 및 운영 전반을 감사합니다.",
    members: "2명",
  },
  {
    name: "사업팀",
    description: "ESG 컨설팅, 리빙랩, 청년정책 등 핵심 사업을 기획하고 수행합니다.",
    members: "다수",
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
            소이랩은 조합원의 참여와 민주적 의사결정을 바탕으로 운영됩니다
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Leadership */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              대표
            </h3>
            {executives.map((exec) => (
              <Card key={exec.role} className="border border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-xl font-bold">
                      {exec.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-accent font-medium">{exec.role}</p>
                      <h4 className="font-serif text-xl font-semibold text-foreground">
                        {exec.name}
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {exec.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Committees */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              조직 구성
            </h3>
            <div className="space-y-4">
              {committees.map((committee) => (
                <Card key={committee.name} className="border border-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {committee.name}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {committee.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                        {committee.members}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
