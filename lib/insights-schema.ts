import { z } from "zod"

export const insightCategories = [
  { id: "local", label: "지역·사회연대경제" },
  { id: "livinglab", label: "리빙랩·시민참여" },
  { id: "youth", label: "청년·고립·돌봄" },
  { id: "ai", label: "AI·현장 도구" },
] as const

const text = (min: number, max: number) => z.string().trim().min(min).max(max)
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const parsed = new Date(value)
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
}, "Invalid calendar date")

export function officialSourceUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "https:" && !url.username && !url.password && !url.port
      && ["korea.kr", "mohw.go.kr", "krihs.re.kr", "nkis.re.kr"].some(
        host => url.hostname === host || url.hostname.endsWith(`.${host}`),
      )
  } catch { return false }
}

export const insightItemSchema = z.object({
  id: text(4, 100),
  category: z.enum(["youth", "local", "livinglab", "ai"]),
  title: text(8, 240),
  publisher: text(2, 100),
  publishedAt: date.nullable(),
  publicationYear: text(4, 4),
  kind: z.enum(["정책·공식 발표", "연구·브리프", "함께 읽기"]),
  evidenceType: z.enum(["공식 게시 본문", "공식 RSS 본문", "공식 게시 요약", "연구 초록"]),
  url: z.string().url().refine(officialSourceUrl),
  checkedAt: z.string().datetime(),
  summary: z.array(text(20, 350)).min(2).max(3),
  perspective: text(30, 350),
  question: text(15, 220),
}).strict()

export const insightIssueSchema = z.object({
  id: date,
  number: z.number().int().positive(),
  publishedAt: z.string().datetime(),
  periodStart: date,
  periodEnd: date,
  title: text(8, 120),
  introduction: text(40, 600),
  weeklyQuestion: text(20, 250),
  items: z.array(insightItemSchema).min(4).max(8),
}).strict().superRefine((issue, ctx) => {
  const problem = (message: string) => ctx.addIssue({ code: "custom", message })
  if (issue.periodStart > issue.periodEnd || issue.id !== issue.periodEnd) problem("Invalid issue period")
  if (new Date(issue.publishedAt).getTime() <= new Date(`${issue.periodEnd}T23:59:59+09:00`).getTime()) problem("Cannot publish an unfinished week")
  if (new Set(issue.items.map(item => item.url)).size !== issue.items.length) problem("Duplicate sources")
  if (new Set(issue.items.map(item => item.id)).size !== issue.items.length) problem("Duplicate source IDs")
  if (new Set(issue.items.map(item => item.category)).size < 2) problem("At least two topics required")
  for (const item of issue.items) {
    if (item.kind !== "함께 읽기" && (!item.publishedAt || item.publishedAt < issue.periodStart || item.publishedAt > issue.periodEnd)) problem("Source outside weekly period")
    if (item.kind === "함께 읽기" && item.publishedAt && item.publishedAt > issue.periodEnd) problem("Future reading")
  }
})

export const insightArchiveSchema = z.array(insightIssueSchema).superRefine((issues, ctx) => {
  if (new Set(issues.map(issue => issue.id)).size !== issues.length || new Set(issues.map(issue => issue.number)).size !== issues.length) {
    ctx.addIssue({ code: "custom", message: "Duplicate issues" })
  }
})

export type InsightIssue = z.infer<typeof insightIssueSchema>
export type InsightItem = z.infer<typeof insightItemSchema>
