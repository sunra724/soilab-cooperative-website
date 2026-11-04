import { projects } from "./project-records"
import { primaryServices, serviceCases, specialistServices } from "./services"

const years = projects.map(project => project.year)
export const publicStats = [
  { value: "2012", suffix: "년", label: "활동 시작", description: "공개 조직 연혁 기준" },
  { value: String(projects.length), suffix: "건", label: "공개 수행사업", description: `${Math.min(...years)} - ${Math.max(...years)}년 대표사업 목록` },
  { value: String(serviceCases.length), suffix: "건", label: "심화 공개 사례", description: "수행 과정·결과·근거를 연결한 사례" },
  { value: String(primaryServices.length + specialistServices.length), suffix: "개", label: "전문 사업 분야", description: "리빙랩·청년지원·ESG·인지건강" },
] as const
export const publicStatsBasis = "공개된 대표사업 목록과 사례를 기준으로 표시합니다. 각 사업의 기간·산정 범위·근거는 상세 사례에서 확인할 수 있습니다."
