// NAVER-RSS (2026-10-23 맥7 지시, 보스 msg 3890) — RSS 2.0 공통 빌더. 원천 데이터는 각 라우트가 넘긴다(생성물 직접 수정 금지).
// 코드 속 비-ASCII 는 \u 이스케이프 — 폰트 서브셋 코퍼스(소스 글자 수집)에 새 글자가 끼지 않게.
// pubDate 는 RFC 822 KST(+0900), 요약은 1~2문장이고 근거·확인일 류 문장은 뺀다(NOCITE 보스 영구지침).
export type RssItem = { title: string; link: string; description: string; date: string | Date }
export type RssChannel = { title: string; link: string; description: string; language: string; self: string }

export const RSS_LIMIT = 50
export const RSS_HEADERS = { 'Content-Type': 'application/rss+xml; charset=utf-8' }

const esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const BAN = /\uADFC\uAC70|\uD655\uC778\uC77C|\uAE30\uC900\uC77C|\uCD9C\uCC98|\uB9E4\uB274\uC5BC|\u6839\u62E0|\u78BA\u8A8D\u65E5|\u57FA\u6E96\u65E5|\u51FA\u5178|\u4F9D\u636E|\u786E\u8BA4\u65E5|\u51FA\u5904|\u624B\u518C|as of|source:|verified on|manual/i
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function toTime(d: string | Date): number {
  if (d instanceof Date) return d.getTime()
  const s = String(d).trim()
  return Date.parse(/^\d{4}-\d{2}-\d{2}$/.test(s) ? `${s}T00:00:00+09:00` : s)
}

export function rfc822Kst(d: string | Date): string {
  const k = new Date(toTime(d) + 9 * 3600e3)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${DAYS[k.getUTCDay()]}, ${p(k.getUTCDate())} ${MONS[k.getUTCMonth()]} ${k.getUTCFullYear()} ${p(k.getUTCHours())}:${p(k.getUTCMinutes())}:${p(k.getUTCSeconds())} +0900`
}

export function rssSummary(s: string): string {
  const plain = String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const parts = plain.match(/[^.!?\u3002\uFF01\uFF1F]+[.!?\u3002\uFF01\uFF1F]?/g) || []
  return parts.map((p) => p.trim()).filter((p) => p && !BAN.test(p)).slice(0, 2).join(' ')
}

export function buildRss(ch: RssChannel, items: RssItem[]): string {
  const list = items
    .filter((i) => i.title && i.link && !Number.isNaN(toTime(i.date)))
    .sort((a, b) => toTime(b.date) - toTime(a.date) || (a.link < b.link ? -1 : 1))
    .slice(0, RSS_LIMIT)
  const body = list
    .map((i) =>
      [
        '    <item>',
        `      <title>${esc(i.title)}</title>`,
        `      <link>${esc(i.link)}</link>`,
        `      <guid isPermaLink="true">${esc(i.link)}</guid>`,
        `      <pubDate>${rfc822Kst(i.date)}</pubDate>`,
        `      <description>${esc(rssSummary(i.description))}</description>`,
        '    </item>',
      ].join('\n')
    )
    .join('\n')
  const last = list[0] ? rfc822Kst(list[0].date) : rfc822Kst(new Date())
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(ch.title)}</title>
    <link>${esc(ch.link)}</link>
    <description>${esc(ch.description)}</description>
    <language>${ch.language}</language>
    <lastBuildDate>${last}</lastBuildDate>
    <atom:link href="${esc(ch.self)}" rel="self" type="application/rss+xml"/>
${body}
  </channel>
</rss>
`
}
