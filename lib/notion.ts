import { Client } from "@notionhq/client"
import { cache } from "react"
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: "2026-03-11",
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

function getCheckbox(
  page: PageObjectResponse,
  names: string[],
  fallback = false,
): boolean {
  const property = findProperty(page, names)
  return property?.type === "checkbox" ? property.checkbox : fallback
}

function getFileUrl(page: PageObjectResponse, names: string[]): string | null {
  const property = findProperty(page, names)
  if (property?.type !== "files" || property.files.length === 0) return null

  const file = property.files[0]
  if (file.type === "external") return file.external.url
  if (file.type === "file") return file.file.url
  return null
}

function getPageCoverUrl(page: PageObjectResponse): string | null {
  if (!page.cover) return null
  return page.cover.type === "external"
    ? page.cover.external.url
    : page.cover.file.url
}

function getBlockAssetUrl(block: BlockObjectResponse): string | null {
  let asset: unknown

  if (block.type === "image") asset = block.image
  if (block.type === "file") asset = block.file
  if (block.type === "pdf") asset = block.pdf
  if (block.type === "video") asset = block.video
  if (block.type === "audio") asset = block.audio

  if (!asset || typeof asset !== "object") return null

  const value = asset as {
    type?: string
    file?: { url?: unknown }
    external?: { url?: unknown }
  }

  if (value.type === "file" && typeof value.file?.url === "string") {
    return value.file.url
  }

  if (
    value.type === "external" &&
    typeof value.external?.url === "string"
  ) {
    return value.external.url
  }

  return null
}

async function resolveNotionFileReferences(markdown: string): Promise<string> {
  const references = [
    ...new Set(
      Array.from(
        markdown.matchAll(/file:\/\/%7B[^\s"<>]*?%7D%7D/gi),
        (match) => match[0],
      ),
    ),
  ]

  if (references.length === 0) return markdown

  const resolved = new Map<string, string>()

  for (const reference of references) {
    try {
      const payload = JSON.parse(
        decodeURIComponent(reference.slice("file://".length)),
      ) as {
        permissionRecord?: { id?: unknown }
      }
      const blockId = payload.permissionRecord?.id

      if (typeof blockId !== "string") continue

      const block = await notion.blocks.retrieve({ block_id: blockId })
      if (block.object !== "block" || !("type" in block)) continue

      const url = getBlockAssetUrl(block as BlockObjectResponse)
      if (url) resolved.set(reference, url)
    } catch (error) {
      console.error("[notion] 본문 파일 URL 변환 실패:", error)
    }
  }

  let result = markdown
  for (const [reference, url] of resolved) {
    result = result.replaceAll(reference, url)
  }
  return result
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

const hasExplicitlyPublishedPages = cache(
  async (dataSourceId: string): Promise<boolean> => {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "게시",
        checkbox: { equals: true },
      },
      page_size: 1,
    })

    return response.results.length > 0
  },
)

async function queryPublishedPages(
  dataSourceId: string,
  dateProperty: string,
): Promise<PageObjectResponse[]> {
  const pages: PageObjectResponse[] = []
  const filterByPublished = await hasExplicitlyPublishedPages(dataSourceId)
  let startCursor: string | undefined

  do {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      ...(filterByPublished
        ? {
            filter: {
              property: "게시",
              checkbox: { equals: true },
            },
          }
        : {}),
      sorts: [{ property: dateProperty, direction: "descending" }],
      page_size: 100,
      start_cursor: startCursor,
    })

    pages.push(
      ...response.results.filter(
        (page): page is PageObjectResponse => page.object === "page",
      ),
    )
    startCursor = response.has_more
      ? response.next_cursor ?? undefined
      : undefined
  } while (startCursor)

  return pages
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
  coverImage: string | null
  featured: boolean
  lastEditedTime: string
}

// ─── 언론보도·소식 타입 ──────────────────────────────────────────────────────

export interface NotionAnnouncement {
  id: string
  title: string
  date: string        // "YYYY.MM.DD"
  source: string      // 언론사
  year: string        // 연도
  url: string | null  // 원문 링크
  description: string
  coverImage: string | null
  featured: boolean
  lastEditedTime: string
}

export interface NotionNewsDetail {
  id: string
  kind: "event" | "announcement"
  title: string
  date: string
  category: string
  status: string
  location: string
  description: string
  result: string
  externalUrl: string | null
  coverImage: string | null
  markdown: string
  lastEditedTime: string
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
    const pages = await queryPublishedPages(dataSourceId, "발행일")

    return pages
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
          coverImage:
            getFileUrl(page, ["대표이미지", "Cover", "Thumbnail"]) ??
            getPageCoverUrl(page),
          featured: getCheckbox(page, ["메인노출", "Featured"]),
          lastEditedTime: page.last_edited_time,
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
    const pages = await queryPublishedPages(dataSourceId, "날짜")

    return pages
      .map((page) => ({
          id: page.id,
          title: getTitle(page, ["제목", "Name"]),
          date: getDate(page, ["날짜", "Date", "발행일"]),
          source: getOptionName(page, ["언론사", "Source"]),
          year: getOptionName(page, ["연도", "Year"]),
          url: getUrl(page, ["URL", "원문", "Link"]),
          description: getRichText(page, ["요약", "Excerpt", "Description"]),
          coverImage:
            getFileUrl(page, ["대표이미지", "Cover", "Thumbnail"]) ??
            getPageCoverUrl(page),
          featured: getCheckbox(page, ["메인노출", "Featured"]),
          lastEditedTime: page.last_edited_time,
        }))
      .filter((item) => item.title)
  } catch (err) {
    console.error("[notion] getAnnouncements 실패:", err)
    return []
  }
}

function normalizePageId(value: string): string | null {
  const compact = value.replaceAll("-", "")
  if (!/^[0-9a-f]{32}$/i.test(compact)) return null

  return [
    compact.slice(0, 8),
    compact.slice(8, 12),
    compact.slice(12, 16),
    compact.slice(16, 20),
    compact.slice(20),
  ].join("-")
}

function sameId(left: string | null | undefined, right: string | null | undefined) {
  if (!left || !right) return false
  return left.replaceAll("-", "").toLowerCase() === right.replaceAll("-", "").toLowerCase()
}

function getParentId(page: PageObjectResponse): string | null {
  if (page.parent.type === "data_source_id") return page.parent.data_source_id
  if (page.parent.type === "database_id") return page.parent.database_id
  return null
}

export const getNewsDetail = cache(
  async (rawId: string): Promise<NotionNewsDetail | null> => {
    const pageId = normalizePageId(rawId)
    const eventsDatabaseId = process.env.NOTION_EVENTS_DB_ID
    const pressDatabaseId = process.env.NOTION_PRESS_DB_ID

    if (!pageId || !eventsDatabaseId || !pressDatabaseId) return null

    try {
      const [pageResponse, eventsDataSourceId, pressDataSourceId] =
        await Promise.all([
          notion.pages.retrieve({ page_id: pageId }),
          getPrimaryDataSourceId(eventsDatabaseId),
          getPrimaryDataSourceId(pressDatabaseId),
        ])

      if (pageResponse.object !== "page" || !("properties" in pageResponse)) {
        return null
      }

      const page = pageResponse as PageObjectResponse
      const parentId = getParentId(page)
      const isEvent =
        sameId(parentId, eventsDataSourceId) ||
        sameId(parentId, eventsDatabaseId)
      const isAnnouncement =
        sameId(parentId, pressDataSourceId) ||
        sameId(parentId, pressDatabaseId)

      if (!isEvent && !isAnnouncement) return null

      const filterByPublished = await hasExplicitlyPublishedPages(
        isEvent ? eventsDataSourceId : pressDataSourceId,
      )
      if (
        filterByPublished &&
        !getCheckbox(page, ["게시", "Published"], true)
      ) {
        return null
      }

      let markdown = ""
      try {
        const content = await notion.pages.retrieveMarkdown({
          page_id: page.id,
        })
        markdown = await resolveNotionFileReferences(content.markdown)
      } catch (error) {
        console.error("[notion] 뉴스 본문 조회 실패:", error)
      }

      if (isEvent) {
        return {
          id: page.id,
          kind: "event",
          title: cleanEventTitle(getTitle(page, ["사업명", "Name", "제목"])),
          date: getDate(page, ["발행일", "Date", "날짜"]),
          category: getOptionName(page, ["태그", "Category", "카테고리"]),
          status: getOptionName(page, ["상태", "Status"]),
          location: getRichText(page, ["장소", "Location"]),
          description: getRichText(page, ["요약", "Description", "설명"]),
          result: getRichText(page, ["결과·성과", "Result"]),
          externalUrl: getUrl(page, [
            "신청링크",
            "신청 링크",
            "ApplyUrl",
            "URL",
          ]),
          coverImage:
            getFileUrl(page, ["대표이미지", "Cover", "Thumbnail"]) ??
            getPageCoverUrl(page),
          markdown,
          lastEditedTime: page.last_edited_time,
        }
      }

      return {
        id: page.id,
        kind: "announcement",
        title: getTitle(page, ["제목", "Name"]),
        date: getDate(page, ["날짜", "Date", "발행일"]),
        category: getOptionName(page, ["언론사", "Source"]),
        status: "",
        location: "",
        description: getRichText(page, ["요약", "Excerpt", "Description"]),
        result: "",
        externalUrl: getUrl(page, ["URL", "원문", "Link"]),
        coverImage:
          getFileUrl(page, ["대표이미지", "Cover", "Thumbnail"]) ??
          getPageCoverUrl(page),
        markdown,
        lastEditedTime: page.last_edited_time,
      }
    } catch (error) {
      console.error("[notion] getNewsDetail 실패:", error)
      return null
    }
  },
)
