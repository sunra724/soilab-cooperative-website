import { cache } from "react"
import bundledArchive from "@/data/insights.json"
import { insightArchiveSchema, type InsightIssue } from "@/lib/insights-schema"

const archiveUrl = "https://raw.githubusercontent.com/sunra724/soilab-cooperative-website/main/data/insights.json"

export const getInsights = cache(async (): Promise<InsightIssue[]> => {
  try {
    const response = await fetch(archiveUrl, { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) })
    if (!response.ok) throw new Error("archive_http")
    const parsed = insightArchiveSchema.parse(await response.json())
    // The build includes the first verified issue if the upstream archive is temporarily empty.
    if (parsed.length) return parsed.sort((a, b) => b.id.localeCompare(a.id))
  } catch {
    console.warn("Insights archive unavailable; using bundled issues")
  }
  return insightArchiveSchema.parse(bundledArchive).sort((a, b) => b.id.localeCompare(a.id))
})

export const getInsight = async (id: string) => (await getInsights()).find(issue => issue.id === id)
export const issueNumber = (number: number) => String(number).padStart(3, "0")
export const shortDate = (value: string) => value.slice(0, 10).replaceAll("-", ".")
