import type { Metadata } from "next"
import { Mail, MapPin, Phone, ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "문의",
  description:
    "ESG 컨설팅, 리빙랩, 청년정책, 인지건강디자인 협업과 사업 문의를 위한 협동조합 소이랩 연락처입니다.",
  alternates: { canonical: "/contact" },
}

const contactItems = [
  {
    title: "전화",
    value: "053-941-9003",
    description: "사업 및 협업 문의",
    href: "tel:053-941-9003",
    icon: Phone,
  },
  {
    title: "이메일",
    value: "soilabcoop@gmail.com",
    description: "자료를 포함한 문의에 적합합니다",
    href: "mailto:soilabcoop@gmail.com?subject=%EC%86%8C%EC%9D%B4%EB%9E%A9%20%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80%20%EB%AC%B8%EC%9D%98",
    icon: Mail,
  },
  {
    title: "오시는 길",
    value: "대구광역시 북구 대현로 3, 2층",
    description: "방문 전 연락을 부탁드립니다",
    href: "https://map.naver.com/p/search/%EB%8C%80%EA%B5%AC%EA%B4%91%EC%97%AD%EC%8B%9C%20%EB%B6%81%EA%B5%AC%20%EB%8C%80%ED%98%84%EB%A1%9C%203",
    icon: MapPin,
    external: true,
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-16 text-primary-foreground lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-primary-foreground/70">
                CONTACT SOILAB
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                함께 만들 변화를 이야기해 주세요
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
                ESG 컨설팅, 리빙랩, 청년정책, 인지건강디자인과 관련한
                사업·교육·협업 문의를 기다립니다.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {contactItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Card className="h-full border-border transition-all group-hover:border-primary/40 group-hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                      <p className="mt-1 break-words font-semibold text-foreground">{item.value}</p>
                      <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                      <span className="mt-5 inline-flex items-center text-sm font-medium text-primary">
                        확인하기
                        <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </span>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            <div className="mt-14 grid gap-8 rounded-2xl bg-secondary/40 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  빠른 상담을 위해 함께 알려주세요
                </h2>
                <ul className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                  {["기관·기업명과 담당자", "문의하려는 사업 분야", "예상 일정과 대상", "필요한 지원 또는 협업 범위"].map((text) => (
                    <li key={text} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <Button size="lg" asChild>
                <a href="mailto:soilabcoop@gmail.com?subject=%EC%86%8C%EC%9D%B4%EB%9E%A9%20%ED%98%91%EC%97%85%20%EB%AC%B8%EC%9D%98">
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  이메일 문의
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
