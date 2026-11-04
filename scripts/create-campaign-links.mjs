import { writeFileSync } from 'node:fs'

const [start = '2026-11-04', destination] = process.argv.slice(2)
if (!destination || !/^\d{4}-\d{2}-\d{2}$/.test(start)) throw new Error('Usage: node scripts/create-campaign-links.mjs YYYY-MM-DD output.csv')
const date = new Date(`${start}T00:00:00Z`)
if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0,10) !== start) throw new Error('Invalid start date')
const campaign = `soilab_month_${start.replaceAll('-','')}`
const rows = [['날짜','채널','게시물 순번','도착 페이지','사용 위치','추적 링크']]
for (let i = 0; i < 30; i++) {
  const day = new Date(date.getTime()+i*86400000).toISOString().slice(0,10)
  for (const channel of ['facebook','instagram']) for (const [index,path] of ['/services','/insights'].entries()) {
    const url = new URL(path,'https://www.soilabcoop.kr')
    url.search = new URLSearchParams({ utm_source:channel,utm_medium:'social',utm_campaign:campaign,utm_content:`${day.replaceAll('-','')}_${index+1}` }).toString()
    rows.push([day,channel,String(index+1),path,channel==='facebook'?'게시물 링크':'스토리 링크 또는 프로필',url.href])
  }
}
writeFileSync(destination,'\uFEFF'+rows.map(row=>row.map(value=>'"'+value.replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n','utf8')
console.log(`Created ${rows.length-1} campaign links`)
