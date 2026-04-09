"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Leaf, Building2, Users, Brain, FolderOpen } from "lucide-react"

type Category = "all" | "esg" | "livinglab" | "youth" | "cognitive" | "other"

interface Project {
  id: string
  title: string
  client: string
  year: number
  category: Category
  description: string
}

const categories: { id: Category; label: string; icon: typeof Leaf }[] = [
  { id: "all", label: "전체", icon: FolderOpen },
  { id: "esg", label: "ESG", icon: Leaf },
  { id: "livinglab", label: "리빙랩", icon: Building2 },
  { id: "youth", label: "청년", icon: Users },
  { id: "cognitive", label: "인지건강", icon: Brain },
  { id: "other", label: "기타", icon: FolderOpen },
]

const projects: Project[] = [
  {
    id: "1",
    title: "중소기업 ESG 경영진단 컨설팅",
    client: "대구광역시",
    year: 2024,
    category: "esg",
    description: "K-ESG 지표 기반 중소기업 50개사 대상 ESG 자가진단 및 맞춤형 컨설팅 제공",
  },
  {
    id: "2",
    title: "남구 리빙랩 도시재생 프로젝트",
    client: "대구 남구청",
    year: 2024,
    category: "livinglab",
    description: "시민 참여형 골목길 환경개선 및 커뮤니티 공간 조성 프로젝트",
  },
  {
    id: "3",
    title: "청년 N.E.S.T. 2026 프로그램",
    client: "대구 남구청년센터",
    year: 2024,
    category: "youth",
    description: "청년 380명 대상 네트워킹, 교육, 지원, 훈련 통합 프로그램 운영",
  },
  {
    id: "4",
    title: "인지건강 증진 프로그램 개발",
    client: "대구광역시 남구",
    year: 2024,
    category: "cognitive",
    description: "지역 복지관 12개소 연계 어르신 인지건강 증진 프로그램 개발 및 운영",
  },
  {
    id: "5",
    title: "사회적경제 ESG 역량강화 교육",
    client: "한국사회적기업진흥원",
    year: 2023,
    category: "esg",
    description: "사회적경제 조직 대상 ESG 경영 이해 및 실천 방안 교육 프로그램",
  },
  {
    id: "6",
    title: "대구형 리빙랩 모델 개발",
    client: "대구테크노파크",
    year: 2023,
    category: "livinglab",
    description: "대구 지역 특성에 맞는 리빙랩 운영 모델 및 가이드라인 개발",
  },
  {
    id: "7",
    title: "청년정책 모니터링단 운영",
    client: "대구광역시",
    year: 2023,
    category: "youth",
    description: "청년 정책 실효성 점검 및 개선 제안을 위한 청년 모니터링단 운영",
  },
  {
    id: "8",
    title: "치매안심마을 조성 컨설팅",
    client: "대구 남구 치매안심센터",
    year: 2023,
    category: "cognitive",
    description: "지역사회 기반 치매친화환경 조성을 위한 서비스 디자인 컨설팅",
  },
  {
    id: "9",
    title: "지역사회 혁신 포럼 운영",
    client: "대구사회혁신센터",
    year: 2022,
    category: "other",
    description: "지역 혁신 주체 네트워킹 및 협력 방안 모색을 위한 연간 포럼 운영",
  },
  {
    id: "10",
    title: "남구 청년공간 기획 및 운영",
    client: "대구 남구청",
    year: 2022,
    category: "youth",
    description: "청년 커뮤니티 활성화를 위한 청년공간 기획, 설계 및 프로그램 운영",
  },
  {
    id: "11",
    title: "ESG 자가진단 도구 개발",
    client: "대구경북중소기업청",
    year: 2022,
    category: "esg",
    description: "중소기업 맞춤형 ESG 자가진단 웹 도구 기획 및 개발",
  },
  {
    id: "12",
    title: "스마트 시티 리빙랩 실증",
    client: "국토교통부",
    year: 2021,
    category: "livinglab",
    description: "IoT 기반 시민 생활환경 개선 솔루션 리빙랩 실증 프로젝트",
  },
]

const categoryColors: Record<Category, string> = {
  all: "bg-muted-foreground",
  esg: "bg-emerald-500",
  livinglab: "bg-blue-500",
  youth: "bg-amber-500",
  cognitive: "bg-rose-500",
  other: "bg-gray-500",
}

export function ProjectList() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  const getCategoryIcon = (category: Category) => {
    const cat = categories.find((c) => c.id === category)
    return cat?.icon || FolderOpen
  }

  const getCategoryLabel = (category: Category) => {
    const cat = categories.find((c) => c.id === category)
    return cat?.label || "기타"
  }

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            주요 <span className="text-primary">수행사업</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            소이랩이 수행한 주요 프로젝트를 카테고리별로 확인하세요.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "gap-2 transition-all",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-primary/10"
              )}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const Icon = getCategoryIcon(project.category)
            return (
              <Card
                key={project.id}
                className="border-none shadow-sm hover:shadow-md transition-shadow group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                        categoryColors[project.category]
                      )}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <CardTitle className="font-serif text-lg mt-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    발주처: {project.client}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-white",
                        categoryColors[project.category]
                      )}
                    >
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            해당 카테고리의 프로젝트가 없습니다.
          </div>
        )}
      </div>
    </section>
  )
}
