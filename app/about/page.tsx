import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/sections/about/about-hero"
import { MissionSection } from "@/components/sections/about/mission-section"
import { CoreValuesSection } from "@/components/sections/about/core-values-section"
import { OrganizationSection } from "@/components/sections/about/organization-section"
import { TimelineSection } from "@/components/sections/about/timeline-section"
import { StrategySection } from "@/components/sections/about/strategy-section"

export const metadata = {
  title: "소이랩 소개",
  description:
    "협동조합 소이랩의 미션과 SOILAB 2030 방향. AI와 리빙랩으로 청년·돌봄·지역문제의 해결모델을 검증하고 사회적 자산으로 축적합니다.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutHero />
        <MissionSection />
        <StrategySection />
        <CoreValuesSection />
        <OrganizationSection />
        <TimelineSection />
      </main>
      <Footer />
    </div>
  )
}
