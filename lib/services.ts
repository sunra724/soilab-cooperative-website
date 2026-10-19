// Summaries of the public SOILAB portfolio, reviewed 2026-10-19.
// Sources: lab.soilabcoop.kr/{cases,youth,ax,methodology/evidence-loop}.
// Draft sales-kit metrics and mock efficiency estimates are excluded.
export const primaryServices = [
  {
    id: "livinglab", number: "01", title: "리빙랩 운영", english: "Living Lab",
    headline: "지역의 문제를 발견하고, 현장에서 해법을 검증합니다.",
    description: "시민의 생활 경험에서 출발해 행정·기업·대학·전문가와 해결책을 설계합니다. 참여자 모집과 워크숍부터 현장 실증, 개선 협의, 성과 정리까지 사업의 전 과정을 운영합니다.",
    audience: "지자체 · 공공기관 · 대학 · 기술·서비스 기업",
    modules: [
      { title: "시민참여·지역문제 해결", description: "현장 관찰과 인터뷰, 공동 워크숍으로 지역의 필요를 파악하고 시민이 직접 실행할 과제를 구체화합니다.", scope: "문제 발굴 · 참여단 운영 · 공동 설계" },
      { title: "스마트시티·서비스 실증", description: "도시서비스와 제품을 실제 이용 환경에서 시험하고, 사용자의 경험과 피드백을 개선 과제로 연결합니다.", scope: "사용자 조사 · 프로토타입 · 사용성 평가" },
      { title: "민·관·산·학 거버넌스", description: "시민, 행정, 전문가와 수행기업의 역할을 설계하고 의견 검토, 의사결정, 반영 결과를 연결해 관리합니다.", scope: "협의체 설계 · 이해관계 조정 · 반영 추적" },
    ],
    outputs: ["문제정의서", "이해관계자 지도", "실증 운영계획", "의견·반영 기록", "성과보고서"],
    href: "https://lab.soilabcoop.kr/living-lab", linkLabel: "리빙랩 수행 방식 보기",
  },
  {
    id: "youth", number: "02", title: "청년정책·청년지원사업", english: "Youth Policy & Support",
    headline: "청년의 일상 회복부터 성장과 지역 정착까지 함께합니다.",
    description: "청년의 상황과 지역의 여건을 함께 살펴 지원사업을 기획·운영합니다. 청년을 만나는 접점부터 상담, 프로그램 참여, 지역자원 연계와 변화 기록까지 지속적인 지원 흐름을 만듭니다.",
    audience: "지자체 청년정책 부서 · 청년지원기관 · 지역 협력기관",
    modules: [
      { title: "고립·은둔청년 지원", description: "도움이 필요한 청년과 가족의 초기 연결을 돕고, 개인별 상황에 맞춰 일상·관계 회복과 지역자원 연계를 설계합니다.", scope: "발굴·초기 연결 · 맞춤 지원 · 사회적 연결" },
      { title: "남구 청년지원사업", description: "남구청년지원센터 운영을 기반으로 청년도전지원사업과 청년 둥지(N.E.S.T) 등 지역 청년의 참여와 성장을 지원합니다.", scope: "센터 운영 · 청년도전지원 · N.E.S.T 프로젝트" },
      { title: "맞춤형 자립·일경험 지원", description: "청년다다름과 탄탄대로 등 청년의 필요와 단계에 맞는 상담·성장 활동·일경험을 연결하고 참여 과정을 기록합니다.", scope: "개별 참여계획 · 진로 탐색 · 일경험 연계" },
    ],
    outputs: ["대상별 지원계획", "프로그램 운영안", "참여·상담 기록", "자원 연계 현황", "변화·성과보고"],
    href: "https://lab.soilabcoop.kr/youth", linkLabel: "청년사업 운영 포트폴리오 보기",
  },
] as const

export const specialistServices = [
  { id: "esg", title: "ESG 경영컨설팅", description: "기업·조직의 지속가능경영 과제를 진단하고, 실행계획과 교육을 통해 현장에서 실천할 수 있는 개선 방향을 제안합니다.", scope: "현황 진단 · 실행계획 · 교육·워크숍", href: "https://lab.soilabcoop.kr/esg", linkLabel: "ESG 사업 살펴보기" },
  { id: "cognitive", title: "인지건강디자인", description: "고령자의 일상과 이용 경험을 살펴 인지건강을 돕는 프로그램과 서비스를 설계하고, 지역기관과 함께 현장 적용을 지원합니다.", scope: "사용자 조사 · 프로그램 설계 · 현장 적용", href: "https://lab.soilabcoop.kr/proposals/cognitive-health", linkLabel: "인지건강 사업 제안 살펴보기" },
] as const

export const serviceCases = [
  { category: "스마트시티 · 거버넌스", title: "고양특례시 스마트시티 거버넌스", question: "여러 서비스와 기관 사이에서 시민의 의견은 어떻게 반영될까?", role: "전문가 자문, 시민 리빙랩과 기업 검토를 연결하는 협력 구조를 설계·운영했습니다.", output: "시민 의견 → 실무 검토 → 기업 회신 → 반영 기록", href: "https://lab.soilabcoop.kr/cases/goyang-smartcity" },
  { category: "대학·기업 협력 · 사용자 실증", title: "커뮤니티 리빙랩 프로젝트", question: "지역문제 해결 솔루션을 실제 사용자의 경험으로 검증하려면?", role: "사회적경제기업과 학생연구원을 연결해 사용자 조사, 실증과 사업모델 개선을 지원했습니다.", output: "기업 과제 → 팀 구성 → 사용자 실증 → 개선안", href: "https://lab.soilabcoop.kr/cases/community-livinglab" },
  { category: "청년 참여 · 지역문제 해결", title: "동성로 소셜 리빙랩 YOUNG구소", question: "청년의 아이디어가 실제 상권에서 쓰이는 결과물이 되려면?", role: "청년의 현장 탐색과 워크숍을 운영하고, 상권의 문제를 재정의해 프로토타입 제작으로 연결했습니다.", output: "현장 탐색 → 문제 재정의 → 제작 → 현장 적용", href: "https://lab.soilabcoop.kr/cases/dongseongro-younggu" },
] as const
