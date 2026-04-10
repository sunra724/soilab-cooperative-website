import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/sections/about/about-hero"
import { MissionSection } from "@/components/sections/about/mission-section"
import { CoreValuesSection } from "@/components/sections/about/core-values-section"
import { OrganizationSection } from "@/components/sections/about/organization-section"
import { TimelineSection } from "@/components/sections/about/timeline-section"

export const metadata = {
  title: "소이랩 소개 | 협동조합 소이랩",
  description:
    "협동조합 소이랩은 대구 북구 소재 협동조합·사회적기업입니다. 협동, 혁신, 지속가능성을 핵심 가치로 사회문제를 함께 해결합니다.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutHero />
        <MissionSection />
        <CoreValuesSection />
        <OrganizationSection />
        <TimelineSection />
      </main>
      <Footer />
    </div>
  )
}
