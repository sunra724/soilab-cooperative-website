export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
            Our Services
          </span>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            사업 <span className="text-primary">소개</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            소이랩은 ESG 컨설팅, 리빙랩, 청년정책, 인지건강디자인 분야에서 
            지역사회와 함께 사회혁신을 실천하고 있습니다.
          </p>
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
