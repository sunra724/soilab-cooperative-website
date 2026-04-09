export function NewsHero() {
  return (
    <section className="relative bg-primary py-16 lg:py-20">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
          행사 · 소식
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
          소이랩의 프로그램, 행사, 그리고 최신 소식을 확인하세요.
        </p>
      </div>
    </section>
  )
}
