"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Leaf, Building2, Users, Brain, FolderOpen, ExternalLink } from "lucide-react"

type Category = "all" | "esg" | "livinglab" | "youth" | "cognitive"

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
]

const projects: Project[] = [
  {
    id: "1",
    title: "아동·청소년 문해력 증진 실증 리빙랩 ‘도담도담’",
    client: "경북대학교 사회과학대학",
    year: 2026,
    category: "livinglab",
    description: "아동·청소년 문해력 증진 프로그램을 현장에서 실증하는 참여형 리빙랩 운영",
  },
  {
    id: "2",
    title: "커뮤니티 리빙랩 프로젝트",
    client: "경북대학교 산학협력단",
    year: 2026,
    category: "livinglab",
    description: "지역문제 발굴부터 실증까지 이어지는 커뮤니티 리빙랩 프로젝트 운영",
  },
  {
    id: "3",
    title: "스마트시티 특화단지 도시문제발굴단 리빙랩",
    client: "대구테크노파크",
    year: 2025,
    category: "livinglab",
    description: "스마트시티 특화단지의 도시문제를 시민과 함께 발굴하는 리빙랩 운영",
  },
  {
    id: "4",
    title: "동성로 소셜 리빙랩 ‘YOUNG구소’",
    client: "경북대학교 산학협력단",
    year: 2025,
    category: "youth",
    description: "동성로를 무대로 지역문제를 발굴하고 해결안을 실험하는 소셜 리빙랩",
  },
  {
    id: "5",
    title: "경도인지장애 ‘알로하하하’ 프로그램 효과성 연구",
    client: "한국에자이",
    year: 2024,
    category: "cognitive",
    description: "경도인지장애 대상 프로그램의 효과성을 연구하고 현장 보급·확산을 지원",
  },
  {
    id: "6",
    title: "서대문구 돌봄·재활기기 실증 리빙랩",
    client: "서대문희망누리 사회적협동조합",
    year: 2024,
    category: "cognitive",
    description: "돌봄 시스템과 손떨림 방지 재활기기의 현장 적용 가능성을 검증하는 실증 리빙랩",
  },
  {
    id: "7",
    title: "KB ESG 임팩트 뇌전증 인식개선 툴킷",
    client: "별을 만드는 사람들",
    year: 2023,
    category: "esg",
    description: "뇌전증 인식개선을 위한 교육 커리큘럼과 참여형 툴킷 개발",
  },
  {
    id: "8",
    title: "청년 인재유입·정착지원 프로그램",
    client: "대구창조경제혁신센터",
    year: 2023,
    category: "youth",
    description: "지역 유입 청년의 정착을 지원하는 프로그램과 워크숍 운영",
  },
  {
    id: "9",
    title: "SW융합클러스터 도시서비스 사용성평가 리빙랩",
    client: "대구테크노파크",
    year: 2022,
    category: "livinglab",
    description: "도시서비스 실증 과정에서 사용자 경험과 활용성을 점검하는 사용성평가 리빙랩",
  },
  {
    id: "10",
    title: "대구공공시설관리공단 주민참여 리빙랩",
    client: "대구공공시설관리공단",
    year: 2022,
    category: "livinglab",
    description: "주민이 직접 지역문제를 발굴하고 해결안을 실험하는 참여형 리빙랩",
  },
]

const categoryColors: Record<Category, string> = {
  all: "bg-muted-foreground",
  esg: "bg-emerald-500",
  livinglab: "bg-blue-500",
  youth: "bg-amber-500",
  cognitive: "bg-rose-500",
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
    return cat?.label || "전체"
  }

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            대표 <span className="text-primary">수행사업</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            2022년부터 2026년까지 수행한 사업 중 대표 프로젝트를 간단히 소개합니다.
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

        <div className="mt-12 rounded-2xl border border-primary/15 bg-background p-6 text-center shadow-sm">
          <p className="text-sm leading-relaxed text-muted-foreground">
            더 많은 사례와 리빙랩 운영 도구는 소이랩 AI 리빙랩 포털에서 확인할 수 있습니다.
          </p>
          <Button className="mt-4" asChild>
            <a
              href="https://lab.soilabcoop.kr/cases"
              target="_blank"
              rel="noopener noreferrer"
            >
              상세 사례 보기
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
