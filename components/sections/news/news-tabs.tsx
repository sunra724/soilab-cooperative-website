"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventsSection } from "./events-section"
import { AnnouncementsSection } from "./announcements-section"
import { CalendarDays, Newspaper } from "lucide-react"
import type { NotionEvent, NotionAnnouncement } from "@/lib/notion"

interface NewsTabsProps {
  events: NotionEvent[]
  announcements: NotionAnnouncement[]
}

export function NewsTabs({ events, announcements }: NewsTabsProps) {
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Tabs defaultValue="events" className="w-full">
          <TabsList className="mb-8 w-full sm:w-auto h-auto p-1 bg-muted">
            <TabsTrigger
              value="events"
              className="flex-1 sm:flex-initial px-6 py-3 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <CalendarDays className="h-4 w-4" />
              행사 · 프로그램
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="flex-1 sm:flex-initial px-6 py-3 gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Newspaper className="h-4 w-4" />
              언론보도 · 소식
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-0">
            <EventsSection events={events} />
          </TabsContent>

          <TabsContent value="announcements" className="mt-0">
            <AnnouncementsSection announcements={announcements} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
