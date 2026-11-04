import { getNewsDetail } from "@/lib/notion"
import { shareImage } from "@/components/share-image"

export const alt = "소이랩 소식"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const revalidate = 60

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const detail = await getNewsDetail(id)
  return shareImage(detail?.title || "소이랩의 활동과 소식", detail?.kind === "event" ? "행사 · 프로그램" : "소식")
}
