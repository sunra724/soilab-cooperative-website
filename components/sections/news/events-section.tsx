"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { NotionEvent } from "@/lib/notion"

interface EventsSectionProps {
  events: NotionEvent[]
}

export function EventsSection({ events }: EventsSectionProps) {
  if (events.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        현재 등록된 행사가 없습니다.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {events.map((event) => (
        <Card
          key={event.id}
          className="border border-border shadow-sm bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              {event.tag && (
                <Badge variant="secondary" className="bg-primary/10 text-primary shrink-0">
                  {event.tag}
                </Badge>
              )}
              {event.date && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                  <Calendar className="h-3 w-3" />
                  <span>{event.date}</span>
                </div>
              )}
            </div>
            <p className="font-medium text-card-foreground leading-snug">
              {event.title}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
