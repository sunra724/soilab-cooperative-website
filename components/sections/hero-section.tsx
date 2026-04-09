import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            사회혁신을
            <br />
            <span className="text-primary">함께 만듭니다</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            협동조합 소이랩은 대구를 기반으로 ESG 컨설팅, 리빙랩, 청년정책,
            도시재생, 인지건강디자인 분야에서 지역사회와 함께 
            더 나은 미래를 만들어가는 사회적협동조합입니다.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/about">
                소이랩 알아보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">문의하기</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5" />
      </div>
    </section>
  )
}
