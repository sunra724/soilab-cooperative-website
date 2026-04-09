import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImpactHero } from "@/components/sections/impact/impact-hero"
import { ImpactStats } from "@/components/sections/impact/impact-stats"
import { ProjectList } from "@/components/sections/impact/project-list"
import { PartnerLogos } from "@/components/sections/impact/partner-logos"

export const metadata: Metadata = {
  title: "실적·성과 | 협동조합 소이랩",
  description: "소이랩이 지역사회와 함께 만들어온 변화의 기록입니다. 설립 이후 150건 이상의 프로젝트와 50,000명 이상의 수혜자.",
}

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ImpactHero />
        <ImpactStats />
        <ProjectList />
        <PartnerLogos />
      </main>
      <Footer />
    </div>
  )
}
