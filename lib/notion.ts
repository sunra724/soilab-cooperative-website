import { Client } from "@notionhq/client"
import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// ─── 공통 헬퍼 ────────────────────────────────────────────────────────────────

function richTextToString(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join("")
}

function getProperty(page: PageObjectResponse, name: string) {
  return (page.properties as Record<string, unknown>)[name]
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
  date: string   // "YYYY.MM.DD"
  tag: string    // 태그 (홍보모집 등)
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
    const response = await notion.databases.query({
      database_id: dbId,
      sorts: [{ timestamp: "created_time", direction: "ascending" }],
    })

    return response.results
      .filter((page): page is PageObjectResponse => page.object === "page")
      .map((page) => {
        const props = page.properties as Record<string, any>

        const titleArr: RichTextItemResponse[] =
          props["사업명"]?.title ?? []

        const rawDate: string = props["발행일"]?.date?.start ?? ""
        const formattedDate = rawDate.replace(/-/g, ".")

        return {
          id: page.id,
          title: richTextToString(titleArr),
          date: formattedDate,
          tag: props["태그"]?.select?.name ?? "",
        }
      })
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
    const response = await notion.databases.query({
      database_id: dbId,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    })

    return response.results
      .filter((page): page is PageObjectResponse => page.object === "page")
      .map((page) => {
        const props = page.properties as Record<string, any>

        const titleArr: RichTextItemResponse[] =
          props["제목"]?.title ?? []

        const rawDate: string = props["날짜"]?.date?.start ?? ""
        const formattedDate = rawDate.replace(/-/g, ".")

        return {
          id: page.id,
          title: richTextToString(titleArr),
          date: formattedDate,
          source: props["언론사"]?.select?.name ?? "",
          year: props["연도"]?.select?.name ?? "",
          url: props["URL"]?.url ?? null,
        }
      })
  } catch (err) {
    console.error("[notion] getAnnouncements 실패:", err)
    return []
  }
}
