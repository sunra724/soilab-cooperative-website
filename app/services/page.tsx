import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesHero } from "@/components/sections/services/services-hero"
import { ServicesOverview } from "@/components/sections/services/services-overview"
import { ServiceDetailCards } from "@/components/sections/services/service-detail-cards"
import { ServiceCapabilities } from "@/components/sections/services/service-capabilities"
import { ServiceCases } from "@/components/sections/services/service-cases"
import { SpecialistServices } from "@/components/sections/services/specialist-services"
import { ServicesCTA } from "@/components/sections/services/services-cta"

export const metadata: Metadata = {
  title: "사업소개",
  description:
    "소이랩의 주력사업인 리빙랩 운영과 청년정책·청년지원사업을 소개합니다. 고립·은둔청년 지원, 남구 청년지원사업부터 민관학 거버넌스, AI·AX 활용과 실제 수행 사례까지 확인하세요.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ServicesHero />
        <ServicesOverview />
        <ServiceDetailCards />
        <ServiceCapabilities />
        <ServiceCases />
        <SpecialistServices />
        <ServicesCTA />
      </main>
      <Footer />
    </div>
  )
}
