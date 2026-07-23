import { Button } from "@/components/ui/button"
import { ExternalLink, Mail } from "lucide-react"

export function ServicesCTA() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
            소이랩과 함께 사회혁신을 실현하세요
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
            ESG 컨설팅, 리빙랩, 청년정책, 인지건강디자인 등 
            소이랩의 전문 역량을 통해 귀사 또는 귀 기관의 
            사회적 가치 창출을 지원합니다. 상세 사례와 운영 도구는
            영업용 포털에서 확인하세요.
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
                문의하기
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <a
                href="https://lab.soilabcoop.kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                상세 사례·운영 도구
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
