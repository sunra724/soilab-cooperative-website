import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ValuesSection } from "@/components/sections/values-section"
import { ServicesSection } from "@/components/sections/services-section"
import { StatsSection } from "@/components/sections/stats-section"
import { NewsSection } from "@/components/sections/news-section"
import { SocialImpactSection } from "@/components/sections/social-impact-section"

export const revalidate = 60

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SocialImpactSection />
        <ValuesSection />
        <ServicesSection />
        <StatsSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}
