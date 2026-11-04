import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-sm font-semibold tracking-wide text-primary">AI × Philanthropy × Social Innovation</p>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            AI와 현장을 연결해
            <br />
            <span className="text-primary">사회혁신을 만듭니다</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            리빙랩 운영과 청년정책·청년지원사업을 기획하고 실행합니다.
            시민·행정·기업의 협력에 AI와 데이터를 더해
            현장의 문제 해결과 성과 기록을 연결합니다.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/contact#inquiry">
                사업·협업 문의
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#cases">수행 사례 보기</Link>
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
