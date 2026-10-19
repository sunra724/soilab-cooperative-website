import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-sm font-semibold tracking-wide text-primary">AI × Philanthropy × Social Innovation</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            AI와 현장을 연결해
            <br />
            <span className="text-primary">사회혁신을 만듭니다</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            협동조합 소이랩은 대구를 기반으로 청년·돌봄·지역사회의 문제를 함께 발견하고,
            AI와 리빙랩으로 해결 가능성을 검증합니다. 현장에서 얻은 지식과 도구, 변화의 근거를
            함께 활용하는 사회적 자산으로 만들어갑니다.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/about#soilab-2030">
                소이랩의 2030 방향
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
