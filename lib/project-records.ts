import { serviceCases } from "./services"

export type Category = "all" | "esg" | "livinglab" | "youth" | "cognitive"

export interface Project {
  id: string
  title: string
  client: string
  year: number
  category: Category
  description: string
  href?: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "아동·청소년 문해력 증진 실증 리빙랩 ‘도담도담’",
    client: "경북대학교 사회과학대학",
    year: 2026,
    category: "livinglab",
    description: "아동·청소년 문해력 증진 프로그램을 현장에서 실증하는 참여형 리빙랩 운영",
  },
  {
    id: "2",
    title: "커뮤니티 리빙랩 프로젝트",
    client: "경북대학교 산학협력단",
    year: 2026,
    category: "livinglab",
    description: "지역문제 발굴부터 실증까지 이어지는 커뮤니티 리빙랩 프로젝트 운영",
    href: serviceCases[1].href,
  },
  {
    id: "3",
    title: "스마트시티 특화단지 도시문제발굴단 리빙랩",
    client: "대구테크노파크",
    year: 2025,
    category: "livinglab",
    description: "스마트시티 특화단지의 도시문제를 시민과 함께 발굴하는 리빙랩 운영",
  },
  {
    id: "4",
    title: "동성로 소셜 리빙랩 ‘YOUNG구소’",
    client: "경북대학교 산학협력단",
    year: 2025,
    category: "youth",
    description: "동성로를 무대로 지역문제를 발굴하고 해결안을 실험하는 소셜 리빙랩",
    href: serviceCases[2].href,
  },
  {
    id: "5",
    title: "경도인지장애 ‘알로하하하’ 프로그램 효과성 연구",
    client: "한국에자이",
    year: 2024,
    category: "cognitive",
    description: "경도인지장애 대상 프로그램의 효과성을 연구하고 현장 보급·확산을 지원",
  },
  {
    id: "6",
    title: "서대문구 돌봄·재활기기 실증 리빙랩",
    client: "서대문희망누리 사회적협동조합",
    year: 2024,
    category: "cognitive",
    description: "돌봄 시스템과 손떨림 방지 재활기기의 현장 적용 가능성을 검증하는 실증 리빙랩",
  },
  {
    id: "7",
    title: "KB ESG 임팩트 뇌전증 인식개선 툴킷",
    client: "별을 만드는 사람들",
    year: 2023,
    category: "esg",
    description: "뇌전증 인식개선을 위한 교육 커리큘럼과 참여형 툴킷 개발",
  },
  {
    id: "8",
    title: "청년 인재유입·정착지원 프로그램",
    client: "대구창조경제혁신센터",
    year: 2023,
    category: "youth",
    description: "지역 유입 청년의 정착을 지원하는 프로그램과 워크숍 운영",
  },
  {
    id: "9",
    title: "SW융합클러스터 도시서비스 사용성평가 리빙랩",
    client: "대구테크노파크",
    year: 2022,
    category: "livinglab",
    description: "도시서비스 실증 과정에서 사용자 경험과 활용성을 점검하는 사용성평가 리빙랩",
  },
  {
    id: "10",
    title: "대구공공시설관리공단 주민참여 리빙랩",
    client: "대구공공시설관리공단",
    year: 2022,
    category: "livinglab",
    description: "주민이 직접 지역문제를 발굴하고 해결안을 실험하는 참여형 리빙랩",
  },
]
