import { Building2 } from "lucide-react"

const partners = [
  "대구광역시",
  "대구 남구청",
  "한국사회적기업진흥원",
  "대구테크노파크",
  "대구사회혁신센터",
  "국토교통부",
  "대구경북중소기업청",
  "대구광역시사회서비스원",
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
            소이랩과 협력하여 지역사회 혁신을 만들어가는 기관들입니다.
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
            그 외 다수의 공공기관, 기업, 비영리단체와 협력하고 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
}
