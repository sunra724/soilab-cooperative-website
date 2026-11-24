import test from "node:test"
import assert from "node:assert/strict"
import { defaultInsightsModel, parseEditorialResponse, requestEditorialJson } from "../scripts/insights/openai.mjs"
import { pendingPeriods } from "../scripts/insights/core.mjs"

const completed = text => ({ status: "completed", output: [
  { type: "reasoning", summary: [] },
  { type: "message", role: "assistant", content: [{ type: "output_text", text }] },
] })
const schema = { type: "object", properties: { approved: { type: "boolean" } }, required: ["approved"], additionalProperties: false }
const props = { instructions: "Review only the supplied evidence.", payload: { evidence: "Example source" }, maxTokens: 2000, schema, name: "test_review", apiKey: "fixture-key", model: defaultInsightsModel }

test("OpenAI request sends structured evidence and reads Responses output without storing it", async () => {
  const result = await requestEditorialJson({ ...props, fetcher: async (url, options) => {
    assert.equal(url, "https://api.openai.com/v1/responses")
    assert.equal(options.headers.Authorization, "Bearer fixture-key")
    const body = JSON.parse(options.body)
    assert.equal(body.store, false)
    assert.equal(body.model, defaultInsightsModel)
    assert.equal(body.reasoning.effort, "low")
    assert.deepEqual(body.input, [{ role: "developer", content: props.instructions }, { role: "user", content: JSON.stringify(props.payload) }])
    assert.equal(body.max_output_tokens, 2000)
    assert.deepEqual(body.text.format, { type: "json_schema", name: "test_review", strict: true, schema })
    return Response.json(completed('{"approved":true}'))
  } })
  assert.deepEqual(result, { approved: true })
})

test("missing OpenAI credentials stop before sending any evidence", async () => {
  await assert.rejects(requestEditorialJson({ ...props, apiKey: " ", fetcher: () => { throw new Error("must_not_call") } }), /OPENAI_API_KEY_required/)
})

test("authentication and quota failures retain useful codes without provider response text", async () => {
  for (const [status, code, expected] of [[401, "invalid_api_key", "openai_http_401"], [429, "insufficient_quota", "openai_insufficient_quota"]]) {
    let calls = 0
    await assert.rejects(requestEditorialJson({ ...props, fetcher: async () => {
      calls++
      return Response.json({ error: { code, message: "private-provider-response" } }, { status })
    } }), error => error.message === expected && !error.message.includes("private"))
    assert.equal(calls, 1)
  }
})

test("transient provider failures retry with a bounded delay", async () => {
  let calls = 0
  const delays = []
  const result = await requestEditorialJson({ ...props, pause: async ms => { delays.push(ms) }, fetcher: async () => {
    calls++
    return calls < 3 ? Response.json({ error: {} }, { status: 503 }) : Response.json(completed('{"approved":true}'))
  } })
  assert.deepEqual(result, { approved: true })
  assert.equal(calls, 3)
  assert.deepEqual(delays, [1000, 2000])
})

test("refusal, incomplete, empty and malformed output cannot become a publication", () => {
  assert.throws(() => parseEditorialResponse({ status: "incomplete", output: [] }), /openai_incomplete/)
  assert.throws(() => parseEditorialResponse({ status: "completed", output: [] }), /openai_empty_output/)
  assert.throws(() => parseEditorialResponse(completed("unfinished JSON")), /openai_invalid_json/)
  assert.throws(() => parseEditorialResponse({ status: "completed", output: [{ type: "message", role: "assistant", content: [{ type: "refusal", refusal: "example" }] }] }), /openai_refusal/)
})

test("missing weeks are recovered oldest first without regenerating published issues", () => {
  const archive = ["2026-10-18", "2026-10-25", "2026-11-01", "2026-11-08"].map(id => ({ id }))
  assert.deepEqual(pendingPeriods(archive, "2026-11-24"), [
    { start: "2026-11-09", end: "2026-11-15" },
    { start: "2026-11-16", end: "2026-11-22" },
  ])
  // An internal gap is still recoverable when a newer issue already exists.
  assert.deepEqual(pendingPeriods([...archive, { id: "2026-11-22" }], "2026-11-24"), [{ start: "2026-11-09", end: "2026-11-15" }])
  assert.deepEqual(pendingPeriods([...archive, { id: "2026-11-15" }, { id: "2026-11-22" }], "2026-11-24"), [])
})

test("catch-up includes only completed weeks and caps a run at four issues", () => {
  assert.deepEqual(pendingPeriods([], "2026-11-24"), [{ start: "2026-11-16", end: "2026-11-22" }])
  assert.deepEqual(pendingPeriods([{ id: "2026-11-15" }], "2026-11-22"), [])
  const backlog = pendingPeriods([{ id: "2026-09-27" }], "2026-11-24")
  assert.equal(backlog.length, 4)
  assert.equal(backlog[0].end, "2026-10-04")
  assert.equal(backlog.at(-1).end, "2026-10-25")
  assert.throws(() => pendingPeriods([], "2026-02-30"), /invalid_run_date/)
})
