import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

const news = [
  {
    id: 1,
    title: "2024 대구 청년정책 포럼 성황리에 마무리",
    date: "2024.03.15",
    category: "행사",
    excerpt:
      "대구 청년들의 목소리를 담은 정책 제안 포럼이 200여 명의 참가자와 함께 성공적으로 개최되었습니다.",
  },
  {
    id: 2,
    title: "ESG 경영 컨설팅 우수사례 선정",
    date: "2024.02.28",
    category: "소식",
    excerpt:
      "소이랩이 진행한 지역 중소기업 ESG 컨설팅 프로젝트가 한국사회적기업진흥원 우수사례로 선정되었습니다.",
  },
  {
    id: 3,
    title: "고령친화도시 인지건강 프로그램 론칭",
    date: "2024.02.10",
    category: "소식",
    excerpt:
      "대구시와 협력하여 개발한 어르신 인지건강 증진 프로그램이 5개 구에서 시범 운영을 시작합니다.",
  },
]

export function NewsSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              최신 <span className="text-primary">소식</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              소이랩의 활동과 소식을 확인하세요.
            </p>
          </div>
          <Button variant="ghost" asChild className="mt-4 sm:mt-0">
            <Link href="/news">
              전체 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {news.map((item) => (
            <Card
              key={item.id}
              className="group border border-border hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 bg-card"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {item.category}
                  </span>
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    {item.date}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
                <Link
                  href={`/news/${item.id}`}
                  className="inline-flex items-center mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  자세히 보기
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
