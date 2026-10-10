/**
 * QA1010-F6(2026-10-10, 보스 msg 2220): 고객 화면에서 내부 근거 표기를 뺀다.
 *   1) 본문 "## 공식 근거"(로캘별 제목) 인용 박스 — 다음 H2 또는 <!-- faq --> 직전까지 통째로
 *   2) description(=카드 요약·메타 설명)의 "2026년 9월 매뉴얼 기준으로" 류 문구
 * 원문은 bank/<slug>/<locale>.md 에 그대로 남는다(내부 보관). 발행 사본만 고친다.
 * run.mjs(발행)와 scripts/f6visa-daily/qa1010-strip-published.mjs(기발행분 1회 정리)가 함께 쓴다.
 * VN-APO(2026-10-10 맥7): f4·ik 엔진에도 같은 파일을 둔다(scripts/<site>-daily/customer-strip.mjs, 세 사본 동일).
 *   f4·ik 원고의 변형 문구('based on the … manual', 'のマニュアルに基づき', '依据…手册')를 함께 잡는다.
 */

export const OFFICIAL_H2 = /^##\s+(공식 근거|Official Basis|官方依据|公式の根拠|Căn cứ chính thức|หลักฐานอ้างอิงทางการ|Официальная основа)\s*$/

// 로캘별 "N년 N월 매뉴얼 기준" 문구. 연·월은 숫자 무관하게 잡는다(다음 판 매뉴얼에도 같은 규칙).
const MANUAL_DATE = {
  ko: [[/\s*\d{4}년\s*\d{1,2}월\s*매뉴얼\s*기준으로(?=\s)/g, '']],
  en: [[/,?\s*(?:per|based on) the [A-Z][a-z]+ \d{4} manual(?=\.)/g, '']],
  zh: [[/按\d{4}年\d{1,2}月法务部指南[，,]\s*/g, ''], [/[，,]\s*依据\d{4}年\d{1,2}月手册(?=。)/g, '']],
  ja: [[/を\d{4}年\d{1,2}月の?マニュアルに基づき/g, 'を']],
  vi: [[/,?\s*theo sổ tay tháng \d{1,2}\/\d{4}(?=\.)/g, '']],
  th: [[/\s*ตามคู่มือเดือน\S+ \d{4}/g, '']],
  ru: [[/\s*—\s*по руководству на \S+ \d{4} г\.?$/g, '.']],
}

/** 고객 화면에 남으면 안 되는 문구(발행 게이트). */
export const CUSTOMER_FORBIDDEN = [
  /^##\s+(공식 근거|Official Basis|官方依据|公式の根拠|Căn cứ chính thức|หลักฐานอ้างอิงทางการ|Официальная основа)\s*$/m,
  /\d{4}년\s*\d{1,2}월\s*매뉴얼\s*기준/, /(?:per|based on) the [A-Z][a-z]+ \d{4} manual/, /\d{4}年\d{1,2}月法务部指南/, /依据\d{4}年\d{1,2}月手册/, /\d{4}年\d{1,2}月の?マニュアルに基づき/,
  /theo sổ tay tháng \d/, /ตามคู่มือเดือน/, /по руководству на \S+ \d{4}/,
]

export function stripDescription(desc, loc) {
  let s = String(desc)
  for (const [re, to] of MANUAL_DATE[loc] || []) s = s.replace(re, to)
  return s
}

/** 반환: { body, removed } — removed 는 뺀 구간 원문(없으면 '') */
export function stripOfficialBasis(body) {
  const lines = body.split('\n')
  const start = lines.findIndex((l) => OFFICIAL_H2.test(l))
  if (start < 0) return { body, removed: '' }
  let end = lines.findIndex((l, i) => i > start && (/^##\s+/.test(l) || /^<!--\s*faq\s*-->/.test(l)))
  if (end < 0) end = lines.length
  const removed = lines.slice(start, end).join('\n').trim()
  const before = lines.slice(0, start)
  while (before.length && before[before.length - 1].trim() === '') before.pop()
  return { body: [...before, '', ...lines.slice(end)].join('\n'), removed }
}

export function customerViolations(text) {
  return CUSTOMER_FORBIDDEN.filter((re) => re.test(text)).map((re) => re.exec(text)[0])
}
