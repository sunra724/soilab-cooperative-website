import { getInsight, issueNumber } from "@/lib/insights"
import { shareImage } from "@/components/share-image"

export const alt = "소이랩 인사이트"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const revalidate = 300

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const issue = /^\d{4}-\d{2}-\d{2}$/.test(id) ? await getInsight(id) : undefined
  return shareImage(issue?.title || "지역의 변화를 읽고, 현장으로 연결합니다.", issue ? `인사이트 No.${issueNumber(issue.number)}` : "인사이트")
}
