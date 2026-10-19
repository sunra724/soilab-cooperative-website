import { Button } from "@/components/ui/button"
import { ExternalLink, Mail } from "lucide-react"

export function ServicesCTA() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
            지역의 다음 변화를 함께 설계합니다.
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
            해결하고 싶은 현장의 문제와 사업 대상, 일정을 알려주세요.
            리빙랩 설계, 청년지원사업 운영, 협력체계 구축과 AI 활용까지
            기관의 여건에 맞는 수행 범위를 함께 구체화합니다.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              asChild
            >
              <a href="mailto:soilabcoop@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                사업·협업 문의하기
              </a>
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
