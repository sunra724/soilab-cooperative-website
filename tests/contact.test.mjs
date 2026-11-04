import assert from 'node:assert/strict'
import test from 'node:test'
import { randomUUID } from 'node:crypto'
import { handleContact } from '../lib/contact.ts'

const env = { CONTACT_RESEND_API_KEY: 'test-private-key', CONTACT_FROM_EMAIL: 'Website <contact@soilabcoop.kr>', CONTACT_TO_EMAIL: 'soilabcoop@gmail.com' }
const valid = () => ({ name: '테스트 기관 담당자', email: 'reply@example.com', topic: '리빙랩 운영', message: '테스트용 문의 내용입니다. 외부로 발송하지 않습니다.', consent: true, website: '', submissionId: randomUUID() })
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
  assert.deepEqual(await response.json(), { ok: true })
  assert.equal(sent[0].url, 'https://api.resend.com/emails')
  assert.deepEqual(sent[0].payload.to, ['soilabcoop@gmail.com'])
  assert.equal(sent[0].payload.reply_to, input.email)
  assert.equal(sent[0].payload.html, undefined)
  assert.ok(sent[0].payload.text.includes(input.message))
  assert.equal(response.headers.get('cache-control'), 'no-store')
  assert.ok(response.headers.get('x-robots-tag').includes('noindex'))
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
