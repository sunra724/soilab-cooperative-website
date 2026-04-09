import { Target, MapPin, Calendar, Building2 } from "lucide-react"

export function MissionSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Mission Statement */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">우리의 미션</span>
            </div>
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight text-balance">
              &ldquo;우리는 사회문제를 함께 발견하고,{" "}
              <span className="text-primary">협동의 방식</span>으로 해결합니다&rdquo;
            </blockquote>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              협동조합 소이랩은 지역사회가 직면한 다양한 문제들을 시민, 기업, 
              공공기관과 함께 발굴하고, 협동과 연대의 힘으로 지속가능한 해결책을 
              만들어가는 사회적협동조합입니다.
            </p>
          </div>

          {/* Organization Info */}
          <div className="bg-secondary/50 rounded-2xl p-8 lg:p-10">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-8">
              조직 개요
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">조직 형태</h4>
                  <p className="text-muted-foreground">사회적협동조합</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">설립연도</h4>
                  <p className="text-muted-foreground">2018년</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">소재지</h4>
                  <p className="text-muted-foreground">대구광역시 남구</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
