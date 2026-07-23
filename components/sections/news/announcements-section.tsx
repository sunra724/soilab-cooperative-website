"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, ChevronDown } from "lucide-react"
import type { NotionAnnouncement } from "@/lib/notion"
import { getNewsDetailHref } from "@/lib/news"

interface AnnouncementsSectionProps {
  announcements: NotionAnnouncement[]
}

export function AnnouncementsSection({ announcements }: AnnouncementsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(12)

  if (announcements.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        등록된 언론보도·소식이 없습니다.
      </p>
    )
  }

  const visibleAnnouncements = announcements.slice(0, visibleCount)

  return (
    <>
      <div className="space-y-3">
      {visibleAnnouncements.map((item) => {
        const inner = (
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {item.source && (
                <Badge variant="secondary" className="w-fit shrink-0 bg-primary/10 text-primary">
                  {item.source}
                </Badge>
              )}
              <div className="flex-1 min-w-0">
                <p className="line-clamp-2 font-medium text-card-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                {item.date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                )}
                <ArrowRight className="h-3 w-3 text-primary" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        )

        return (
          <Link
            key={item.id}
            href={getNewsDetailHref(item.id)}
            className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`${item.title} 자세히 보기`}
          >
            <Card className="border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
              {inner}
            </Card>
          </Link>
        )
      })}
      </div>

      {visibleCount < announcements.length && (
        <div className="mt-8 text-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setVisibleCount((count) => count + 12)}
          >
            소식 더 보기
            <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </>
  )
}
