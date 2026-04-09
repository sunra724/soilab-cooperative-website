"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Building2, Users, Brain, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "esg",
    icon: Leaf,
    title: "ESG 경영컨설팅",
    shortDescription: "중소기업 ESG 자가진단 및 컨설팅, K-ESG 지표 기반",
    fullDescription: "소이랩은 중소기업의 지속가능경영 역량 강화를 위해 K-ESG 지표 기반의 체계적인 컨설팅을 제공합니다. 환경(E), 사회(S), 지배구조(G) 전 영역에 걸쳐 기업 맞춤형 진단과 개선 방안을 제시합니다.",
    features: [
      "K-ESG 지표 기반 자가진단 도구 제공",
      "중소기업 맞춤형 ESG 전략 수립",
      "ESG 경영 실행 로드맵 설계",
      "지속가능경영 보고서 작성 지원",
      "ESG 교육 및 워크숍 운영",
    ],
    achievements: [
      { label: "컨설팅 기업", value: "50+" },
      { label: "교육 이수자", value: "500+" },
    ],
    color: "bg-emerald-500",
  },
  {
    id: "livinglab",
    icon: Building2,
    title: "리빙랩 운영",
    shortDescription: "시민 참여형 도시문제 해결, 대구 남구 리빙랩 운영",
    fullDescription: "리빙랩은 실제 생활환경에서 시민과 함께 지역문제를 발굴하고 해결책을 실험하는 혁신적인 방법론입니다. 소이랩은 대구 남구를 중심으로 시민 주도형 도시혁신 프로젝트를 운영하고 있습니다.",
    features: [
      "시민 참여형 문제 발굴 워크숍",
      "지역 현안 기반 솔루션 개발",
      "프로토타입 실증 및 피드백",
      "시민-행정-전문가 협력 네트워크",
      "리빙랩 방법론 교육 및 확산",
    ],
    achievements: [
      { label: "리빙랩 프로젝트", value: "30+" },
      { label: "참여 시민", value: "2,000+" },
    ],
    color: "bg-blue-500",
  },
  {
    id: "youth",
    icon: Users,
    title: "청년정책 프로그램",
    shortDescription: "대구 남구청년센터 운영, 청년 N.E.S.T. 2026 프로그램 (380명+)",
    fullDescription: "소이랩은 대구 남구청년센터를 위탁 운영하며, 청년들의 성장과 지역 정착을 지원하는 다양한 프로그램을 운영합니다. 청년 N.E.S.T. 2026은 네트워킹, 교육, 지원, 훈련을 통해 청년의 역량을 강화합니다.",
    features: [
      "대구 남구청년센터 위탁운영",
      "청년 N.E.S.T. 2026 프로그램 운영",
      "청년 정책 제안 및 모니터링",
      "청년 커뮤니티 활성화 지원",
      "창업 및 취업 연계 프로그램",
    ],
    achievements: [
      { label: "프로그램 참여자", value: "380+" },
      { label: "청년 네트워크", value: "15개" },
    ],
    color: "bg-amber-500",
  },
  {
    id: "cognitive",
    icon: Brain,
    title: "인지건강디자인",
    shortDescription: "치매예방 및 인지건강 서비스 디자인, 복지관 연계 프로그램",
    fullDescription: "고령화 사회에 대응하여 인지건강 증진과 치매예방을 위한 서비스 디자인을 개발합니다. 지역 복지관과 연계하여 어르신들의 인지기능 유지와 향상을 위한 프로그램을 운영합니다.",
    features: [
      "인지건강 프로그램 개발 및 운영",
      "치매예방 서비스 디자인",
      "복지관 연계 교육 프로그램",
      "인지건강 공간 디자인 컨설팅",
      "돌봄 종사자 역량강화 교육",
    ],
    achievements: [
      { label: "연계 복지관", value: "12개" },
      { label: "프로그램 이용자", value: "1,500+" },
    ],
    color: "bg-rose-500",
  },
]

export function ServiceDetailCards() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-8">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className={cn(
                "border-none shadow-lg overflow-hidden transition-all duration-300",
                expandedId === service.id && "ring-2 ring-primary/20"
              )}
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
                        service.color
                      )}
                    >
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          0{index + 1}
                        </span>
                      </div>
                      <CardTitle className="font-serif text-xl sm:text-2xl text-foreground">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(service.id)}
                    className="self-start lg:self-center"
                  >
                    {expandedId === service.id ? (
                      <>
                        접기 <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        자세히 보기 <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <CardDescription className="mt-3 text-base leading-relaxed">
                  {service.shortDescription}
                </CardDescription>
              </CardHeader>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  expandedId === service.id
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <CardContent className="pt-0 pb-6">
                    <div className="border-t pt-6">
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.fullDescription}
                      </p>

                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Features */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-4">
                            주요 서비스
                          </h4>
                          <ul className="space-y-3">
                            {service.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Achievements */}
                        <div className="lg:border-l lg:pl-8">
                          <h4 className="font-semibold text-foreground mb-4">
                            주요 성과
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {service.achievements.map((achievement) => (
                              <div
                                key={achievement.label}
                                className="bg-secondary/50 rounded-lg p-4 text-center"
                              >
                                <div className="text-2xl font-bold text-primary">
                                  {achievement.value}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {achievement.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
