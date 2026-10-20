import { createHash } from "node:crypto"
import { load } from "cheerio"
import { XMLParser } from "fast-xml-parser"
import { insightArchiveSchema, insightIssueSchema, officialSourceUrl } from "../../lib/insights-schema.ts"

export const clean = value => load(`<body>${String(value ?? "")}</body>`)("body").text().replace(/\s+/g, " ").trim()
export const normalized = value => clean(value).normalize("NFKC").replace(/\s+/g, "")
const isoDay = date => date.toISOString().slice(0, 10)
export function previousWeek(today) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) throw new Error("invalid_run_date")
  const current = new Date(`${today}T00:00:00Z`)
  if (!Number.isFinite(current.getTime()) || isoDay(current) !== today) throw new Error("invalid_run_date")
  const monday = new Date(current)
  monday.setUTCDate(monday.getUTCDate() - (monday.getUTCDay() + 6) % 7)
  return { start: isoDay(new Date(monday.getTime() - 7 * 86400000)), end: isoDay(new Date(monday.getTime() - 86400000)) }
}

export const koreaDay = now => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Seoul" }).format(now)
const matchers = [
  ["youth", /고립|은둔|청년|청소년|돌봄|치매|인지건강|외로움/gi],
  ["local", /사회연대경제|사회적경제|협동조합|사회적기업|마을기업|지역경제|지역순환|지역소멸|균형발전|도시재생|지역공동체|사회적가치/gi],
  ["livinglab", /리빙랩|시민참여|주민참여|거버넌스|민관협력|민관 협력|사회혁신|생활실험|공동체/gi],
  ["ai", /인공지능|생성형|디지털|데이터|AI\b/gi],
]
export function relevance(title, excerpt = "") {
  const scores = matchers.map(([category, pattern]) => ({ category, score: [...title.matchAll(pattern)].length * 5 + [...excerpt.matchAll(pattern)].length }))
  return scores.sort((a, b) => b.score - a.score)[0]
}

export async function fetchOfficial(url, fetcher = fetch) {
  if (!officialSourceUrl(url)) throw new Error("untrusted_source_url")
  let target = url
  for (let redirects = 0; redirects <= 3; redirects++) {
    const response = await fetcher(target, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0 (compatible; SOILABInsights/1.0; +https://www.soilabcoop.kr/insights)" }, signal: AbortSignal.timeout(25000) })
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      target = new URL(response.headers.get("location"), target).href
      if (!officialSourceUrl(target)) throw new Error("untrusted_redirect")
      continue
    }
    if (!response.ok) throw new Error(`source_http_${response.status}`)
    if (Number(response.headers.get("content-length")) > 2_000_000) throw new Error("source_too_large")
    const buffer = await response.arrayBuffer()
    if (buffer.byteLength > 2_000_000) throw new Error("source_too_large")
    const contentType = response.headers.get("content-type") || ""
    const head = new TextDecoder().decode(buffer.slice(0, 180))
    return new TextDecoder(/euc-kr/i.test(contentType + head) ? "euc-kr" : "utf-8").decode(buffer)
  }
  throw new Error("source_redirect_limit")
}

const hash = url => createHash("sha256").update(url).digest("hex").slice(0, 16)
function candidate(data) {
  const rank = relevance(data.title, data.excerpt)
  if (!rank.score || data.excerpt.length < 350 || !officialSourceUrl(data.url)) return null
  return { ...data, id: hash(data.url), category: rank.category, score: rank.score }
}

export function parseKoreaList(html, period) {
  const $ = load(html)
  return $("a[href*='pressReleaseView.do']").toArray().flatMap(node => {
    const a = $(node)
    const title = clean(a.find("strong").text())
    const info = a.find(".source span").toArray().map(span => clean($(span).text()))
    const date = info.find(value => /^\d{4}[.-]\d{2}[.-]\d{2}$/.test(value))?.replaceAll(".", "-")
    const newsId = new URL(a.attr("href"), "https://www.korea.kr").searchParams.get("newsId")
    if (!date || date < period.start || date > period.end || !/^\d+$/.test(newsId || "")) return []
    const row = candidate({ title, publisher: info.find(value => value !== date && !/^\d{4}[.-]/.test(value)) || "대한민국 정책브리핑", publishedAt: date, publicationYear: date.slice(0, 4), kind: "정책·공식 발표", evidenceType: "공식 게시 요약", url: `https://www.korea.kr/briefing/pressReleaseView.do?newsId=${newsId}`, excerpt: clean(a.find(".lead").text()).slice(0, 10000) })
    return row ? [row] : []
  })
}

export function parseMohwRss(xml, period) {
  const parsed = new XMLParser({ parseTagValue: false }).parse(xml)
  if (!parsed.rss?.channel) throw new Error("rss_format")
  const list = parsed.rss.channel.item || []
  return (Array.isArray(list) ? list : [list]).flatMap(row => {
    const parsedDate = new Date(row.pubDate)
    if (!Number.isFinite(parsedDate.getTime())) return []
    const date = koreaDay(parsedDate)
    if (date < period.start || date > period.end) return []
    const item = candidate({ title: clean(row.title), publisher: "보건복지부", publishedAt: date, publicationYear: date.slice(0, 4), kind: "정책·공식 발표", evidenceType: "공식 RSS 본문", url: clean(row.link), excerpt: clean(row.description).slice(0, 10000) })
    return item ? [item] : []
  })
}

export async function collectSources(period, seenUrls, { fetcher = fetch, nkisKey = "" } = {}) {
  const failures = []
  const collected = []
  // Unfiltered lists carry substantive official summaries. Search results only
  // contain short keyword snippets, which are too thin for a research briefing.
  // Twenty pages cover up to 400 releases across the week, rather than just Friday.
  const jobs = Array.from({ length: 20 }, (_, index) => ({ query: "", page: index + 1 }))
  // Limit concurrency to avoid hammering official publication servers.
  for (let offset = 0; offset < jobs.length; offset += 3) {
    const results = await Promise.allSettled(jobs.slice(offset, offset + 3).map(async ({ query, page }) => {
      const params = new URLSearchParams({ startDate: period.start, endDate: period.end, srchWord: query, pageIndex: String(page) })
      return parseKoreaList(await fetchOfficial(`https://www.korea.kr/briefing/pressReleaseList.do?${params}`, fetcher), period)
    }))
    for (const result of results) {
      if (result.status === "fulfilled") collected.push(...result.value)
      else failures.push("정책브리핑 목록 일부")
    }
  }
  try { collected.push(...parseMohwRss(await fetchOfficial("https://www.mohw.go.kr/rss/board.es?mid=a10503000000&bid=0027&info", fetcher), period)) }
  catch { failures.push("보건복지부 RSS") }

  // NKIS provides a publication year, not a confirmed publication day. These
  // are explicitly labelled background reading and never called this week's releases.
  if (nkisKey) {
    try {
      const parser = new XMLParser({ parseTagValue: false })
      const params = new URLSearchParams({ serviceKey: nkisKey, pageNo: "1", rowCnt: "100", pblYyBegin: period.start.slice(0, 4), pblYyEnd: period.end.slice(0, 4) })
      const parsed = parser.parse(await fetchOfficial(`https://nkis.re.kr/nkisApi/search/ReportList.do?${params}`, fetcher))
      if (!/^\d+$/.test(String(parsed.root?.TOTAL_COUNT))) throw new Error("nkis_format")
      const results = parsed.root?.results?.result || []
      const rows = (Array.isArray(results) ? results : [results]).filter(row => relevance(clean(row.OTP_HAN_NM)).score)
        .sort((a, b) => relevance(clean(b.OTP_HAN_NM)).score - relevance(clean(a.OTP_HAN_NM)).score)
      let added = 0
      for (const row of rows.slice(0, 10)) {
        const url = `https://www.nkis.re.kr/subject_view1.do?otpId=${encodeURIComponent(row.OTP_ID)}&otpSeq=${encodeURIComponent(row.OTP_SEQ || "0")}`
        if (seenUrls.has(url)) continue
        try {
          const args = new URLSearchParams({ serviceKey: nkisKey, otpId: row.OTP_ID, otpSeq: row.OTP_SEQ || "0" })
          const detail = parser.parse(await fetchOfficial(`https://nkis.re.kr/nkisApi/search/ReportDetail.do?${args}`, fetcher))
          const entries = detail.root?.result || detail.root?.results?.result || []
          const values = (Array.isArray(entries) ? entries : [entries])
          const found = values.find(item => item.OTP_ID === row.OTP_ID)
          const item = candidate({ title: clean(row.OTP_HAN_NM), publisher: clean(row.PUBAGC), publishedAt: null, publicationYear: clean(row.PBL_YY), kind: "함께 읽기", evidenceType: "연구 초록", url, excerpt: clean(found?.HAN_ABS).slice(0, 10000) })
          if (item) { collected.push(item); added++ }
          if (added >= 3) break
        } catch { failures.push("NKIS 초록 일부") }
      }
    } catch { failures.push("NKIS 목록") }
  }

  const unique = new Map()
  for (const item of collected) {
    if (seenUrls.has(item.url)) continue
    const previous = unique.get(item.url)
    if (!previous || previous.excerpt.length < item.excerpt.length) unique.set(item.url, item)
  }
  const ranked = [...unique.values()].sort((a, b) => b.score - a.score)
  // Keep an editorial choice across topics instead of filling the pool with one theme.
  const selected = []
  for (const category of matchers.map(([id]) => id)) selected.push(...ranked.filter(item => item.category === category).slice(0, 4))
  const checkedAt = new Date().toISOString()
  return { sources: selected.map(item => ({ ...item, checkedAt, evidenceSegments: Array.from({ length: Math.ceil(item.excerpt.length / 160) }, (_, index) => item.excerpt.slice(index * 160, index * 160 + 240)) })), failures: [...new Set(failures)] }
}

export function validateEvidence(draft, sources) {
  if (!draft || !Array.isArray(draft.items)) throw new Error("invalid_ai_items")
  const byId = new Map(sources.map(source => [source.id, source]))
  const seen = new Set()
  for (const item of draft.items) {
    const source = byId.get(item.id)
    if (!source || seen.has(item.id)) throw new Error("unknown_or_duplicate_ai_source")
    seen.add(item.id)
    if (!Array.isArray(item.evidenceIndices) || item.evidenceIndices.length !== item.summary?.length) throw new Error("missing_evidence_indices")
    for (const indices of item.evidenceIndices) {
      if (!Array.isArray(indices) || !indices.length || indices.length > 4) throw new Error("invalid_evidence_indices")
      for (const index of indices) {
        const quote = source.evidenceSegments?.[index]
        if (!Number.isInteger(index) || index < 0 || typeof quote !== "string" || normalized(quote).length < 15 || !normalized(source.excerpt).includes(normalized(quote))) throw new Error("evidence_not_in_source")
      }
    }
  }
}

export function assembleIssue(draft, sources, archive, period, publishedAt, approvedIds) {
  validateEvidence(draft, sources)
  const approved = new Set(approvedIds)
  const byId = new Map(sources.map(source => [source.id, source]))
  const items = draft.items.filter(item => approved.has(item.id)).map(item => {
    const source = byId.get(item.id)
    return { id: source.id, category: source.category, title: source.title, publisher: source.publisher, publishedAt: source.publishedAt, publicationYear: source.publicationYear, kind: source.kind, evidenceType: source.evidenceType, url: source.url, checkedAt: source.checkedAt, summary: item.summary, perspective: item.perspective, question: item.question }
  })
  if (items.filter(item => item.kind === "함께 읽기").length > 2) throw new Error("too_many_background_readings")
  return insightIssueSchema.parse({ id: period.end, number: Math.max(0, ...archive.map(issue => issue.number)) + 1, publishedAt, periodStart: period.start, periodEnd: period.end, title: draft.title, introduction: draft.introduction, weeklyQuestion: draft.weeklyQuestion, items })
}

export const parseArchive = value => insightArchiveSchema.parse(value)
