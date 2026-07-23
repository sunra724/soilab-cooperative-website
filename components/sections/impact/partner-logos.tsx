import { Building2 } from "lucide-react"

const partners = [
  "대구테크노파크",
  "경북대학교 산학협력단",
  "경북대학교 지역사회공헌센터",
  "대구창조경제혁신센터",
  "대구공공시설관리공단",
  "한국에자이",
  "과학기술정책연구원",
  "한국산업단지공단",
]

export function PartnerLogos() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
            함께하는 <span className="text-primary">파트너</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            최근 수행사업을 함께한 대표 협력기관입니다.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium leading-snug text-foreground">
                {partner}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            공공기관, 대학, 기업, 비영리조직과 함께 현장의 변화를 만들고 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
}
