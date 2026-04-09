import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/sections/services/services-hero"
import { ServicesOverview } from "@/components/sections/services/services-overview"
import { ServiceDetailCards } from "@/components/sections/services/service-detail-cards"
import { ServicesCTA } from "@/components/sections/services/services-cta"

export const metadata: Metadata = {
  title: "사업소개 | 협동조합 소이랩",
  description:
    "소이랩의 4대 핵심 사업: ESG 경영컨설팅, 리빙랩 운영, 청년정책 프로그램, 인지건강디자인. 대구 기반 사회혁신 협동조합.",
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ServicesHero />
        <ServicesOverview />
        <ServiceDetailCards />
        <ServicesCTA />
      </main>
      <Footer />
    </div>
  )
}
