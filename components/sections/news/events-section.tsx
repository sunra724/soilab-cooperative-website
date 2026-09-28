"use client"

/* eslint-disable @next/next/no-img-element */

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, ChevronDown, MapPin } from "lucide-react"
import type { NotionEvent } from "@/lib/notion"
import { getNewsDetailHref } from "@/lib/news"

interface EventsSectionProps {
  events: NotionEvent[]
}

export function EventsSection({ events }: EventsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(12)

  if (events.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        현재 등록된 행사가 없습니다.
      </p>
    )
  }

  const visibleEvents = events.slice(0, visibleCount)

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {visibleEvents.map((event) => {
          const content = (
            <Card className="h-full gap-0 overflow-hidden border border-border bg-card py-0 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/30 group-hover:shadow-md">
              {event.coverImage && (
                <div className="aspect-[16/9] overflow-hidden border-b border-border bg-secondary/30">
                  <img
                    src={event.coverImage}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <CardContent className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {event.tag && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {event.tag}
                    </Badge>
                  )}
                  {event.status && <Badge variant="outline">{event.status}</Badge>}
                  {event.date && (
                    <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      <span>{event.date}</span>
                    </div>
                  )}
                </div>
                <p className="font-medium leading-snug text-card-foreground group-hover:text-primary">
                  {event.title}
                </p>
                {event.description && (
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                )}
                <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                  {event.location ? (
                    <span className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span className="truncate">{event.location}</span>
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary">
                    자세히 보기
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                </div>
              </CardContent>
            </Card>
          )

          return (
            <Link
              key={event.id}
              href={getNewsDetailHref(event.id)}
              prefetch={false}
              className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`${event.title} 자세히 보기`}
            >
              {content}
            </Link>
          )
        })}
      </div>

      {visibleCount < events.length && (
        <div className="mt-8 text-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setVisibleCount((count) => count + 12)}
          >
            행사 더 보기
            <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </>
  )
}
