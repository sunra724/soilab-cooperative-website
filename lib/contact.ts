import { createHash, createHmac } from "node:crypto"
import { z } from "zod"
import { inquiryPrivacy } from "./inquiry-privacy.mjs"

const inputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  topic: z.string().trim().min(1).max(80).regex(/^[^\r\n]+$/),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true),
  consentVersion: z.literal(inquiryPrivacy.version),
  website: z.string().max(200).default(""),
  submissionId: z.string().uuid(),
}).strict()

type Options = { env?: NodeJS.ProcessEnv; fetcher?: typeof fetch; now?: () => number; logger?: Pick<Console, "info" | "warn"> }
// A bounded, best-effort burst limit. Provider idempotency also covers retries
// across function instances; this memory cache is deliberately not a database.
const requests = new Map<string, number[]>()
const WINDOW = 15 * 60 * 1000

function result(status: number, body: object) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } })
}

export async function handleContact(request: Request, { env = process.env, fetcher = fetch, now = Date.now, logger = console }: Options = {}) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return result(403, { error: "홈페이지에서 다시 문의해 주세요." })
  if (!request.headers.get("content-type")?.startsWith("application/json")) return result(415, { error: "문의 내용을 확인해 주세요." })

  let input: unknown
  try {
    const reader = request.body?.getReader()
    if (!reader) return result(400, { error: "문의 내용을 입력해 주세요." })
    const chunks: Uint8Array[] = []
    let length = 0
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > 24_000) { await reader.cancel(); return result(413, { error: "문의 내용이 너무 깁니다." }) }
      chunks.push(value)
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"))
  } catch { return result(400, { error: "문의 내용을 확인해 주세요." }) }

  if (input && typeof input === "object" && (!('consentVersion' in input) || input.consentVersion !== inquiryPrivacy.version)) return result(400, { error: "문의메일 정보 이용 안내가 업데이트되었습니다. 페이지를 새로고침한 뒤 내용을 확인하고 다시 접수해 주세요." })
  const parsed = inputSchema.safeParse(input)
  if (!parsed.success) return result(400, { error: "연락처와 문의 내용을 확인하고 개인정보 이용에 동의해 주세요." })
  const data = parsed.data
  if (data.website) return result(400, { error: "문의 내용을 확인해 주세요." })

  const apiKey = env.CONTACT_RESEND_API_KEY
  const from = env.CONTACT_FROM_EMAIL
  const to = env.CONTACT_TO_EMAIL || "soilabcoop@gmail.com"
  if (!apiKey || !from) return result(503, { error: "현재 온라인 접수가 원활하지 않습니다. 전화나 이메일로 문의해 주세요." })

  const time = now()
  for (const [key, values] of requests) if (!values.some(value => value > time - WINDOW)) requests.delete(key)
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  if (ip) {
    const key = createHmac("sha256", apiKey).update(ip).digest("hex")
    const recent = (requests.get(key) || []).filter(value => value > time - WINDOW)
    if (recent.length >= 5 || (requests.size >= 2000 && !requests.has(key))) return result(429, { error: "문의가 여러 번 접수되었습니다. 잠시 후 다시 시도하거나 전화로 문의해 주세요." })
    requests.set(key, [...recent, time])
  }

  const text = [`접수번호: ${data.submissionId}`, `문의 정보 수집·이용 동의: 확인 (${data.consentVersion})`, `보유·이용: ${inquiryPrivacy.retention}`, `기관·담당자: ${data.name}`, `회신 이메일: ${data.email}`, `문의 분야: ${data.topic}`, "", data.message].join("\n")
  const fingerprint = createHash("sha256").update(text).digest("hex").slice(0, 32)
  try {
    const response = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact/${data.submissionId}/${fingerprint}` },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `[소이랩 홈페이지] ${data.topic} 문의`, text }),
      signal: AbortSignal.timeout(12_000),
    })
    const receipt = await response.json()
    if (!response.ok || typeof receipt.id !== "string" || !receipt.id) {
      logger.warn("contact_delivery_failed", { reference: data.submissionId, providerStatus: response.status })
      return result(502, { error: "접수 결과를 확인하지 못했습니다. 잠시 후 다시 시도하거나 전화·이메일로 문의해 주세요." })
    }
    logger.info("contact_delivery_accepted", { reference: data.submissionId, receiptId: receipt.id })
    return result(200, { ok: true, reference: data.submissionId })
  } catch {
    logger.warn("contact_delivery_unconfirmed", { reference: data.submissionId })
    return result(502, { error: "접수 결과를 확인하지 못했습니다. 잠시 후 다시 시도하거나 전화·이메일로 문의해 주세요." })
  }
}
