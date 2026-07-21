"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, ExternalLink } from "lucide-react"
import type { NotionAnnouncement } from "@/lib/notion"

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
                {item.url && (
                  <ExternalLink className="h-3 w-3 text-primary" />
                )}
              </div>
            </div>
          </CardContent>
        )

        return item.url ? (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            aria-label={`${item.title} 원문 보기 (새 창)`}
          >
            <Card className="group border border-border hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 bg-card cursor-pointer">
              {inner}
            </Card>
          </a>
        ) : (
          <Card
            key={item.id}
            className="border border-border shadow-sm bg-card"
          >
            {inner}
          </Card>
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
