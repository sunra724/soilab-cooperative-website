"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Leaf, Building2, Users, Brain, FolderOpen, ExternalLink } from "lucide-react"
import { projects, type Category } from "@/lib/project-records"

const categories: { id: Category; label: string; icon: typeof Leaf }[] = [
  { id: "all", label: "전체", icon: FolderOpen },
  { id: "esg", label: "ESG", icon: Leaf },
  { id: "livinglab", label: "리빙랩", icon: Building2 },
  { id: "youth", label: "청년", icon: Users },
  { id: "cognitive", label: "인지건강", icon: Brain },
]


const categoryColors: Record<Category, string> = {
  all: "bg-muted-foreground",
  esg: "bg-emerald-700",
  livinglab: "bg-blue-700",
  youth: "bg-amber-800",
  cognitive: "bg-rose-700",
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
              aria-pressed={selectedCategory === category.id}
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
                  {project.href && <a href={project.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4">수행 과정·근거 자료<ExternalLink className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (새 창)</span></a>}
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
