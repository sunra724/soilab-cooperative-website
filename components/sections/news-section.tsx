import Link from "next/link"
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAnnouncements, getEvents } from "@/lib/notion"

interface HomeNewsItem {
  id: string
  title: string
  date: string
  category: string
  excerpt: string
  href: string
  external: boolean
}

export async function NewsSection() {
  const [events, announcements] = await Promise.all([
    getEvents(),
    getAnnouncements(),
  ])

  const items: HomeNewsItem[] = [
    ...events.map((event) => ({
      id: `event-${event.id}`,
      title: event.title,
      date: event.date,
      category: event.tag || "행사",
      excerpt: event.description || "소이랩의 행사·프로그램 소식을 확인하세요.",
      href: event.url || "/news",
      external: Boolean(event.url),
    })),
    ...announcements.map((item) => ({
      id: `announcement-${item.id}`,
      title: item.title,
      date: item.date,
      category: item.source || "소식",
      excerpt: item.source
        ? `${item.source}에 소개된 소이랩의 활동 소식입니다.`
        : "소이랩의 새로운 활동 소식을 확인하세요.",
      href: item.url || "/news",
      external: Boolean(item.url),
    })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              최신 <span className="text-primary">소식</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              소이랩의 활동과 새로운 소식을 확인하세요.
            </p>
          </div>
          <Button variant="ghost" asChild className="mt-4 sm:mt-0">
            <Link href="/news">
              전체 보기
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {items.map((item) => {
              const card = (
                <Card className="h-full border border-border bg-card shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {item.category}
                      </span>
                      {item.date && (
                        <span className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" aria-hidden="true" />
                          {item.date}
                        </span>
                      )}
                    </div>
                    <h3 className="line-clamp-2 font-serif text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {item.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center pt-5 text-sm font-medium text-primary">
                      자세히 보기
                      {item.external ? (
                        <ArrowUpRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                      )}
                    </span>
                  </CardContent>
                </Card>
              )

              return item.external ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={`${item.title} 자세히 보기 (새 창)`}
                >
                  {card}
                </a>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {card}
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/20 px-6 py-12 text-center">
            <p className="text-muted-foreground">새로운 소식을 준비하고 있습니다.</p>
            <Button variant="outline" asChild className="mt-5">
              <Link href="/news">행사·소식 페이지 보기</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
