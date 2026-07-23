import { Client } from "@notionhq/client"
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2025-09-03",
})

type PageProperty = PageObjectResponse["properties"][string]

function richTextToString(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join("")
}

function findProperty(page: PageObjectResponse, names: string[]): PageProperty | undefined {
  for (const name of names) {
    if (page.properties[name]) return page.properties[name]
  }
}

function getTitle(page: PageObjectResponse, names: string[]): string {
  const property = findProperty(page, names)
  return property?.type === "title" ? richTextToString(property.title) : ""
}

function getRichText(page: PageObjectResponse, names: string[]): string {
  const property = findProperty(page, names)
  return property?.type === "rich_text" ? richTextToString(property.rich_text) : ""
}

function getDate(page: PageObjectResponse, names: string[]): string {
  const property = findProperty(page, names)
  const value = property?.type === "date" ? property.date?.start ?? "" : ""
  return value.slice(0, 10).replace(/-/g, ".")
}

function getOptionName(page: PageObjectResponse, names: string[]): string {
  const property = findProperty(page, names)
  if (property?.type === "select") return property.select?.name ?? ""
  if (property?.type === "multi_select") return property.multi_select[0]?.name ?? ""
  return ""
}

function getUrl(page: PageObjectResponse, names: string[]): string | null {
  const property = findProperty(page, names)
  return property?.type === "url" ? property.url : null
}

function cleanEventTitle(title: string): string {
  return title
    .replace(/^\[\d{4}[./-]\d{1,2}(?:[./-]\d{1,2})?\]\s*/, "")
    .trim()
}

async function getPrimaryDataSourceId(databaseId: string): Promise<string> {
  const database = await notion.databases.retrieve({ database_id: databaseId })

  if (!("data_sources" in database) || database.data_sources.length === 0) {
    throw new Error(`Notion 데이터베이스(${databaseId})의 데이터 소스를 찾을 수 없습니다.`)
  }

  return database.data_sources[0].id
}

// ─── 행사 타입 ────────────────────────────────────────────────────────────────
//
// Notion 데이터베이스 프로퍼티 (행사 DB):
//   사업명 — title  : 행사명
//   발행일 — date   : 날짜 (start)
//   태그   — select : 홍보모집 등

export interface NotionEvent {
  id: string
  title: string
  date: string
  tag: string
  status: string
  location: string
  description: string
  url: string | null
}

// ─── 언론보도·소식 타입 ──────────────────────────────────────────────────────

export interface NotionAnnouncement {
  id: string
  title: string
  date: string        // "YYYY.MM.DD"
  source: string      // 언론사
  year: string        // 연도
  url: string | null  // 원문 링크
}

// ─── 행사 fetch ───────────────────────────────────────────────────────────────
//
// Notion 데이터베이스 프로퍼티 (행사 DB):
//   Name        — title      : 행사명
//   Date        — date       : 날짜 (start)
//   Time        — rich_text  : 시간 (예: "14:00 - 18:00")
//   Location    — rich_text  : 장소
//   Description — rich_text  : 설명
//   Status      — select     : 모집중 | 마감임박 | 예정 | 종료
//   Category    — select     : ESG | 리빙랩 | 청년 | 인지건강 등
//   ApplyUrl    — url        : 신청 링크 (선택)

export async function getEvents(): Promise<NotionEvent[]> {
  const dbId = process.env.NOTION_EVENTS_DB_ID
  if (!dbId) {
    console.warn("[notion] NOTION_EVENTS_DB_ID가 설정되지 않아 빈 목록을 반환합니다.")
    return []
  }

  try {
    const dataSourceId = await getPrimaryDataSourceId(dbId)
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      sorts: [{ property: "발행일", direction: "descending" }],
    })

    return response.results
      .filter((page): page is PageObjectResponse => page.object === "page")
      .map((page) => {
        return {
          id: page.id,
          title: cleanEventTitle(getTitle(page, ["사업명", "Name", "제목"])),
          date: getDate(page, ["발행일", "Date", "날짜"]),
          tag: getOptionName(page, ["태그", "Category", "카테고리"]),
          status: getOptionName(page, ["상태", "Status"]),
          location: getRichText(page, ["장소", "Location"]),
          description: getRichText(page, ["설명", "Description", "요약"]),
          url: getUrl(page, ["신청링크", "신청 링크", "ApplyUrl", "URL"]),
        }
      })
      .filter((event) => event.title)
  } catch (err) {
    console.error("[notion] getEvents 실패:", err)
    return []
  }
}

// ─── 공지·소식 fetch ──────────────────────────────────────────────────────────
//
// Notion 데이터베이스 프로퍼티 (공지·소식 DB):
//   Name        — title      : 제목
//   Date        — date       : 작성일 (start)
//   Category    — select     : 공지 | 소식
//   IsPinned    — checkbox   : 상단 고정 여부
//   Excerpt     — rich_text  : 요약 (1~2문장)

export async function getAnnouncements(): Promise<NotionAnnouncement[]> {
  const dbId = process.env.NOTION_PRESS_DB_ID
  if (!dbId) {
    console.warn("[notion] NOTION_PRESS_DB_ID가 설정되지 않아 빈 목록을 반환합니다.")
    return []
  }

  try {
    const dataSourceId = await getPrimaryDataSourceId(dbId)
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    })

    return response.results
      .filter((page): page is PageObjectResponse => page.object === "page")
      .map((page) => ({
          id: page.id,
          title: getTitle(page, ["제목", "Name"]),
          date: getDate(page, ["날짜", "Date", "발행일"]),
          source: getOptionName(page, ["언론사", "Source"]),
          year: getOptionName(page, ["연도", "Year"]),
          url: getUrl(page, ["URL", "원문", "Link"]),
        }))
      .filter((item) => item.title)
  } catch (err) {
    console.error("[notion] getAnnouncements 실패:", err)
    return []
  }
}
