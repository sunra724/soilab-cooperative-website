const partners = [
  { name: "대구광역시", abbr: "대구" },
  { name: "대구 남구청", abbr: "남구" },
  { name: "한국사회적기업진흥원", abbr: "사진원" },
  { name: "대구테크노파크", abbr: "TP" },
  { name: "대구사회혁신센터", abbr: "혁신" },
  { name: "국토교통부", abbr: "국토부" },
  { name: "대구경북중소기업청", abbr: "중기청" },
  { name: "대구광역시사회서비스원", abbr: "사서원" },
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

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              {/* Placeholder logo */}
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-secondary group-hover:bg-primary/10 transition-colors mb-3">
                <span className="font-serif text-lg font-bold text-primary">
                  {partner.abbr}
                </span>
              </div>
              <span className="text-xs text-center text-muted-foreground leading-tight">
                {partner.name}
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
