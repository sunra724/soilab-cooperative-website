import test from "node:test"
import assert from "node:assert/strict"
import { assembleIssue, fetchOfficial, parseArchive, parseKoreaList, parseMohwRss, previousWeek, validateEvidence } from "../scripts/insights/core.mjs"

const period = { start: "2026-10-12", end: "2026-10-18" }
const excerpt = "지역 주민과 청년이 함께 문제를 발굴하고 작은 생활 실험을 진행하도록 지원하는 사업입니다. 다음 달부터 참여 기관을 모집할 계획이며 실제 운영 방식은 지역별 협의를 거쳐 결정합니다."
const sources = [0, 1, 2, 3].map(index => ({ id: `source-${index}`, category: index % 2 ? "youth" : "livinglab", title: `지역 주민과 청년의 생활 실험 지원 ${index}`, publisher: "공식 발행기관", publishedAt: "2026-10-15", publicationYear: "2026", kind: "정책·공식 발표", evidenceType: "공식 게시 본문", url: `https://www.korea.kr/briefing/pressReleaseView.do?newsId=${index}`, checkedAt: "2026-10-20T00:00:00.000Z", excerpt, evidenceSegments: [excerpt] }))
const draft = () => ({ title: "지역의 생활 실험을 함께 설계하려면", introduction: "지역의 문제를 함께 발견하고 실험하는 과정을 살펴봅니다. 이번 주에는 참여 주체의 역할과 모집 단계에서 먼저 확인할 질문을 함께 나눕니다.", weeklyQuestion: "지역의 생활 실험에서 청년과 주민의 선택을 어떻게 함께 반영할 수 있을까요?", items: sources.map((source, index) => ({ id: source.id, category: index % 2 ? "youth" : "livinglab", summary: ["지역 주민과 청년이 생활 문제를 함께 찾고 실험하는 사업을 지원합니다.", "참여 기관 모집은 다음 달 추진할 계획이며 운영 방식은 지역 협의로 정합니다."], evidenceIndices: [[0], [0]], perspective: "참여자가 자기 생활에서 겪는 문제를 먼저 이야기하도록 초기 만남을 설계해볼 수 있겠습니다.", question: "주민과 청년이 부담 없이 의견을 나누려면 첫 만남을 어떻게 구성할까요?" })) })
const makeIssue = () => assembleIssue(draft(), sources, [], period, "2026-10-20T00:00:00.000Z", sources.map(source => source.id))

test("previous complete week uses Korean calendar date, including Sunday and year boundaries", () => {
  assert.deepEqual(previousWeek("2026-10-20"), period)
  assert.deepEqual(previousWeek("2026-10-19"), period)
  assert.deepEqual(previousWeek("2026-10-18"), { start: "2026-10-05", end: "2026-10-11" })
  assert.deepEqual(previousWeek("2026-01-01"), { start: "2025-12-22", end: "2025-12-28" })
  assert.throws(() => previousWeek("2026-02-30"))
})

test("publication copies source metadata instead of trusting AI titles and dates", () => {
  const issue = makeIssue()
  assert.equal(issue.id, period.end)
  assert.equal(issue.number, 1)
  assert.equal(issue.items[0].title, sources[0].title)
  assert.equal(issue.items[0].url, sources[0].url)
  assert.equal(issue.items[0].publishedAt, sources[0].publishedAt)
})

test("every summary sentence must reference a real extract from its own source", () => {
  const wrong = draft()
  wrong.items[0].evidenceIndices[0] = [999]
  assert.throws(() => validateEvidence(wrong, sources), /evidence_not_in_source/)
  wrong.items[0].id = "invented-id"
  assert.throws(() => validateEvidence(wrong, sources), /unknown_or_duplicate/)
})

test("a review that leaves fewer than four articles cannot publish", () => {
  assert.throws(() => assembleIssue(draft(), sources, [], period, "2026-10-20T00:00:00.000Z", [sources[0].id]))
})

test("future and out-of-week releases are rejected while background reading is labelled", () => {
  const issue = makeIssue()
  issue.items[0].publishedAt = "2026-10-19"
  assert.throws(() => parseArchive([issue]))
  issue.items[0].publishedAt = null
  assert.throws(() => parseArchive([issue]))
  issue.items[0].kind = "함께 읽기"
  assert.equal(parseArchive([issue])[0].items[0].publishedAt, null)
})

test("duplicate issues, duplicate sources, invalid dates and non-official links fail closed", () => {
  const issue = makeIssue()
  assert.throws(() => parseArchive([issue, issue]))
  issue.items[1].url = issue.items[0].url
  assert.throws(() => parseArchive([issue]))
  const cleanIssue = makeIssue()
  cleanIssue.items[0].url = "https://korea.kr.evil.example/data"
  assert.throws(() => parseArchive([cleanIssue]))
  cleanIssue.items[0].url = sources[0].url
  cleanIssue.items[0].publishedAt = "2026-02-30"
  assert.throws(() => parseArchive([cleanIssue]))
})

test("source requests reject off-domain redirects before fetching the target", async () => {
  let calls = 0
  await assert.rejects(fetchOfficial("https://www.korea.kr/test", async () => {
    calls++
    return new Response(null, { status: 302, headers: { location: "http://127.0.0.1/private" } })
  }), /untrusted_redirect/)
  assert.equal(calls, 1)
})

test("Korea parser takes real publication dates and canonical original links", () => {
  const html = `<a href="/briefing/pressReleaseView.do?newsId=123&amp;srchWord=test"><strong>청년과 주민이 함께 만드는 리빙랩</strong><span class="lead">${excerpt.repeat(5)}</span><span class="source"><span>2026.10.15</span><span>행정안전부</span></span></a>`
  const rows = parseKoreaList(html, period)
  assert.equal(rows.length, 1)
  assert.equal(rows[0].publishedAt, "2026-10-15")
  assert.equal(rows[0].publisher, "행정안전부")
  assert.equal(rows[0].url, "https://www.korea.kr/briefing/pressReleaseView.do?newsId=123")
  assert.equal(parseKoreaList(html, { start: "2026-10-19", end: "2026-10-25" }).length, 0)
})

test("RSS publication date is converted to Korea time before weekly filtering", () => {
  const xml = `<rss><channel><item><title>청년 돌봄 지원 안내</title><link>https://www.mohw.go.kr/board.es?list_no=123</link><pubDate>Sun, 18 Oct 2026 16:00:00 GMT</pubDate><description><![CDATA[${excerpt.repeat(5)}]]></description></item></channel></rss>`
  assert.equal(parseMohwRss(xml, period).length, 0)
})
