import { Button } from "@/components/ui/button"
import { ExternalLink, Mail } from "lucide-react"
import Link from "next/link"

export function ServicesCTA() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
            우리 기관의 과제로 시작해 보세요.
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
            해결하고 싶은 지역 과제나 준비 중인 사업을 알려주세요.
            참여 대상과 일정, 예산에 맞춰 리빙랩 기획·운영과 청년지원사업의
            수행 범위, 남길 결과물을 함께 정합니다.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              asChild
            >
              <Link href="/contact#inquiry">
                <Mail className="mr-2 h-5 w-5" />
                사업·협업 문의하기
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <a
                href="https://lab.soilabcoop.kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                수행 사례·운영 도구 보기
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
