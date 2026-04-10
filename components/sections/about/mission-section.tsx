import { Target, MapPin, Calendar, Building2 } from "lucide-react"

export function MissionSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Mission & Vision */}
          <div className="space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-6">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">미션</span>
              </div>
              <blockquote className="font-serif text-xl sm:text-2xl font-bold text-foreground leading-tight">
                사회문제를 겪는 시민-조직 간<br />
                연결과 협력을 통해{" "}
                <span className="text-primary">사회적 가치를 창출하고 확산한다.</span>
              </blockquote>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 mb-4">
                <span className="text-sm font-medium text-accent">비전</span>
              </div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-foreground leading-tight">
                사회문제 해결 과정의 실효성을 증명하고<br />
                <span className="text-accent">혁신 방법론을 선도하는 조직이 된다.</span>
              </p>
            </div>
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
                  <p className="text-muted-foreground">협동조합 · 사회적기업</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">설립연도</h4>
                  <p className="text-muted-foreground">2012년</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">소재지</h4>
                  <p className="text-muted-foreground">대구광역시 북구 대현로 3, 2층</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
