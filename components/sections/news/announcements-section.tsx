"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink } from "lucide-react"
import type { NotionAnnouncement } from "@/lib/notion"

interface AnnouncementsSectionProps {
  announcements: NotionAnnouncement[]
}

export function AnnouncementsSection({ announcements }: AnnouncementsSectionProps) {
  if (announcements.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        등록된 언론보도·소식이 없습니다.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {announcements.map((item) => {
        const inner = (
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {item.source && (
                <Badge variant="secondary" className="w-fit shrink-0 bg-primary/10 text-primary">
                  {item.source}
                </Badge>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
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
  )
}
