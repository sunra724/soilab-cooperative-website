const stats = [
  {
    value: "8+",
    label: "활동 연수",
    suffix: "년",
  },
  {
    value: "150+",
    label: "완료 프로젝트",
    suffix: "건",
  },
  {
    value: "50,000+",
    label: "수혜자 수",
    suffix: "명",
  },
  {
    value: "30+",
    label: "협력 기관",
    suffix: "곳",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
            소이랩의 <span className="text-accent">성과</span>
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
            지역사회와 함께 만들어온 변화의 기록입니다.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl">
                {stat.value}
              </div>
              <div className="mt-2 text-lg text-primary-foreground/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
