export const defaultInsightsModel = "gpt-6.1-terra"

export function parseEditorialResponse(result) {
  if (result?.status !== "completed" || !Array.isArray(result.output)) throw new Error("openai_incomplete")
  const texts = []
  for (const item of result.output) {
    if (item.type !== "message" || item.role !== "assistant") continue
    if (!Array.isArray(item.content)) throw new Error("openai_invalid_output")
    for (const part of item.content) {
      if (part.type === "refusal") throw new Error("openai_refusal")
      if (part.type === "output_text" && typeof part.text === "string") texts.push(part.text)
    }
  }
  if (!texts.length) throw new Error("openai_empty_output")
  try { return JSON.parse(texts.join("")) }
  catch { throw new Error("openai_invalid_json") }
}

export async function requestEditorialJson({ instructions, payload, maxTokens, schema, name,
  apiKey = process.env.OPENAI_API_KEY, model = process.env.INSIGHTS_MODEL || defaultInsightsModel,
  fetcher = fetch, pause = ms => new Promise(resolve => setTimeout(resolve, ms)) }) {
  const key = apiKey?.trim()
  if (!key) throw new Error("OPENAI_API_KEY_required")
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetcher("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, store: false,
        ...(/^gpt-[56]/.test(model) ? { reasoning: { effort: "low" } } : {}),
        input: [{ role: "developer", content: instructions }, { role: "user", content: JSON.stringify(payload) }],
        max_output_tokens: maxTokens,
        text: { format: { type: "json_schema", name, strict: true, schema } },
      }),
      signal: AbortSignal.timeout(150000),
    })
    if (response.ok) return parseEditorialResponse(await response.json())
    const error = await response.json().catch(() => null)
    if (error?.error?.code === "insufficient_quota") throw new Error("openai_insufficient_quota")
    if ([429, 500, 502, 503, 504].includes(response.status) && attempt < 2) {
      await pause(1000 * (attempt + 1))
      continue
    }
    // Provider bodies can contain private request data. Report status codes only.
    throw new Error(`openai_http_${response.status}`)
  }
}
