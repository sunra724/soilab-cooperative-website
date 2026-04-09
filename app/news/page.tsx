import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsHero } from "@/components/sections/news/news-hero"
import { NewsTabs } from "@/components/sections/news/news-tabs"
import { getEvents, getAnnouncements } from "@/lib/notion"

export const metadata: Metadata = {
  title: "행사 · 소식 | 협동조합 소이랩",
  description:
    "소이랩의 프로그램, 행사, 그리고 최신 소식을 확인하세요. 청년정책, ESG 컨설팅, 리빙랩, 인지건강 관련 다양한 행사에 참여해보세요.",
}

// 60초마다 재검증 (ISR)
export const revalidate = 60

export default async function NewsPage() {
  const [events, announcements] = await Promise.all([
    getEvents(),
    getAnnouncements(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <NewsHero />
      <NewsTabs events={events} announcements={announcements} />
      <Footer />
    </main>
  )
}
