import assert from 'node:assert/strict'
import test from 'node:test'
import { linkInteraction } from '../lib/analytics-events.ts'

const base='https://www.soilabcoop.kr'
test('contact metrics distinguish intent without copying phone, email or private query data',()=>{
  assert.deepEqual(linkInteraction('tel:053-941-9003',base,'footer'),{name:'contact_click',params:{placement:'footer',contact_method:'phone'}})
  const event=linkInteraction('mailto:person@example.com?body=private-message',base,'main')
  assert.equal(event.params.contact_method,'email')
  assert.ok(!JSON.stringify(event).includes('person@example.com'))
  assert.ok(!JSON.stringify(event).includes('private-message'))
  assert.equal(linkInteraction('/contact?email=private@example.com',base,'main').name,'contact_open')
})
test('case clicks are restricted to the official domain and a public slug',()=>{
  const event=linkInteraction('https://lab.soilabcoop.kr/cases/goyang-smartcity?email=private@example.com',base,'main')
  assert.equal(event.params.item_id,'goyang-smartcity')
  assert.ok(!JSON.stringify(event).includes('private@example.com'))
  assert.equal(linkInteraction('https://lab.soilabcoop.kr.unrelated.example/cases/goyang-smartcity',base,'main'),null)
  assert.equal(linkInteraction('javascript:alert(1)',base,'main'),null)
  assert.equal(linkInteraction('https://unrelated.example/contact',base,'main'),null)
  assert.equal(linkInteraction('https://lab.soilabcoop.kr/cases/private@example.com',base,'main'),null)
})
