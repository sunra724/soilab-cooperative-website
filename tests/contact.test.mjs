import assert from 'node:assert/strict'
import test from 'node:test'
import { randomUUID } from 'node:crypto'
import { handleContact } from '../lib/contact.ts'
import { inquiryPrivacy } from '../lib/inquiry-privacy.mjs'

const env = { CONTACT_RESEND_API_KEY: 'test-private-key', CONTACT_FROM_EMAIL: 'Website <contact@soilabcoop.kr>', CONTACT_TO_EMAIL: 'soilabcoop@gmail.com' }
const valid = () => ({ name: '테스트 기관 담당자', email: 'reply@example.com', topic: '리빙랩 운영', message: '테스트용 문의 내용입니다. 외부로 발송하지 않습니다.', consent: true, consentVersion: inquiryPrivacy.version, website: '', submissionId: randomUUID() })
function request(body, extra = {}) {
  return new Request('https://www.soilabcoop.kr/api/contact', { method: 'POST', headers: { origin: 'https://www.soilabcoop.kr', 'content-type': 'application/json', ...extra }, body: typeof body === 'string' ? body : JSON.stringify(body) })
}
const neverSend = async () => { throw new Error('Unexpected outbound email request') }

test('valid contact is accepted only after the mail provider returns a receipt; recipient is fixed', async () => {
  const input = valid(); const sent = []
  const fetcher = async (url, options) => {
    sent.push({ url, ...options, payload: JSON.parse(options.body) })
    return Response.json({ id: 'mock-mail-receipt' })
  }
  const response = await handleContact(request(input), { env, fetcher })
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { ok: true, reference: input.submissionId })
  assert.equal(sent[0].url, 'https://api.resend.com/emails')
  assert.deepEqual(sent[0].payload.to, ['soilabcoop@gmail.com'])
  assert.equal(sent[0].payload.reply_to, input.email)
  assert.equal(sent[0].payload.html, undefined)
  assert.ok(sent[0].payload.text.includes(input.message))
  assert.ok(sent[0].payload.text.includes(inquiryPrivacy.version))
  assert.ok(sent[0].payload.text.includes(inquiryPrivacy.retention))
  assert.equal(response.headers.get('cache-control'), 'no-store')
  assert.ok(response.headers.get('x-robots-tag').includes('noindex'))
})

test('missing or stale consent wording never sends an inquiry under a different notice', async () => {
  for (const version of [undefined, 'outdated-notice']) {
    const input = valid()
    if (version === undefined) delete input.consentVersion
    else input.consentVersion = version
    const response = await handleContact(request(input), { env, fetcher: neverSend })
    assert.equal(response.status, 400)
    assert.match((await response.json()).error, /새로고침/)
  }
})

test('a repeated submission keeps the provider idempotency key; changed content gets a new key', async () => {
  const input = valid(); const keys = []
  const fetcher = async (_, options) => { keys.push(options.headers['Idempotency-Key']); return Response.json({ id: 'mock' }) }
  for (const body of [input, input, { ...input, message: input.message + ' 추가 내용' }]) {
    assert.equal((await handleContact(request(body), { env, fetcher })).status, 200)
  }
  assert.equal(keys[0], keys[1]); assert.notEqual(keys[1], keys[2])
})

test('invalid email, missing consent, spam field, header injection and extra recipient fields never send', async () => {
  for (const patch of [{ email: 'invalid' }, { consent: false }, { website: 'bot.example' }, { topic: 'topic\r\nBcc: victim@example.com' }, { to: 'victim@example.com' }, { message: '짧음' }]) {
    assert.equal((await handleContact(request({ ...valid(), ...patch }), { env, fetcher: neverSend })).status, 400)
  }
})

test('foreign origin, malformed JSON, oversized requests and missing configuration do not report success', async () => {
  assert.equal((await handleContact(request(valid(), { origin: 'https://attacker.example' }), { env, fetcher: neverSend })).status, 403)
  assert.equal((await handleContact(request('{'), { env, fetcher: neverSend })).status, 400)
  assert.equal((await handleContact(request('x'.repeat(25_000)), { env, fetcher: neverSend })).status, 413)
  assert.equal((await handleContact(request(valid()), { env: {}, fetcher: neverSend })).status, 503)
})

test('provider rejection or network ambiguity never produces a successful receipt', async () => {
  for (const fetcher of [async () => Response.json({ message: 'failed' }, { status: 503 }), async () => { throw new Error('timeout') }, async () => Response.json({})]) {
    assert.equal((await handleContact(request(valid()), { env, fetcher })).status, 502)
  }
})

test('a burst from one client is rejected before calling the provider again', async () => {
  let count = 0
  const fetcher = async () => { count++; return Response.json({ id: 'mock' }) }
  for (let index = 0; index < 6; index++) {
    const response = await handleContact(request(valid(), { 'x-real-ip': '192.0.2.100' }), { env, fetcher, now: () => 100_000 })
    assert.equal(response.status, index < 5 ? 200 : 429)
  }
  assert.equal(count, 5)
})

test('delivery logs identify a receipt without leaking inquiry content or provider error details', async () => {
  const input = valid(); const logs = []
  const logger = { info: (...args) => logs.push(args), warn: (...args) => logs.push(args) }
  for (const [status, receipt] of [[200, { id: 'receipt-123' }], [422, { message: input.email }], [200, { id: '' }]]) {
    const response = await handleContact(request(input), { env, logger, fetcher: async () => Response.json(receipt, { status }) })
    assert.equal(response.status, receipt.id ? 200 : 502)
  }
  const serialized = JSON.stringify(logs)
  assert.ok(serialized.includes(input.submissionId))
  assert.ok(serialized.includes('receipt-123'))
  for (const value of [input.name, input.email, input.message, env.CONTACT_RESEND_API_KEY]) assert.ok(!serialized.includes(value))
})
