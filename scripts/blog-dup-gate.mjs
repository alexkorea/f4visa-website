#!/usr/bin/env node
/**
 * 블로그 중복 제목 게이트 (BOSSEYE-FIX-1014 #13, 맥6 실측 10-13: 196편 중 15묶음 43편이 거의 같은 제목·자기 canonical)
 *
 * 원인: 같은 주제를 문장만 바꿔 되풀이 생성했다(07~08월 GitHub main 자동발행 'auto-publish' 21편 + 그 이전 일괄분).
 * slug 중복만 막던 원고 은행 엔진(scripts/f4visa-daily/run.mjs)과 빌드에는 '제목이 같은 주제' 검사가 없었다.
 *
 * 규칙: 제목을 정규화(기호·연도·상투어 '완벽·가이드·총정리…' 제거, F-4→f4)한 뒤 글자 2-gram Dice 유사도가 TH 이상이면 같은 주제로 본다.
 *   - 빌드(prebuild): 라이브 대상 글(리다이렉트 source 제외) 중 유사 쌍이 있는데 두 글이 모두 기준선(이미 있던 묶음)에 있지 않으면 실패.
 *     기존 15묶음은 보스 결정(통합·리다이렉트 금지) 전까지 기준선으로 둔다 — 새 글이 끼면 막힌다.
 *   - 발행(run.mjs): 은행 원고의 ko 제목이 기존 글과 유사하면 그 원고는 발행하지 않는다(meta.json dupAllow 에 사유가 있으면 통과).
 *
 * 사용
 *   node scripts/blog-dup-gate.mjs                 검사(rc 0 통과 / 1 새 중복)
 *   node scripts/blog-dup-gate.mjs --title "제목" [--slug s]   후보 1건이 기존 글과 겹치는지(rc 0/1)
 *   node scripts/blog-dup-gate.mjs --write-baseline 현재 유사 쌍의 글을 기준선으로 기록(사람이 판단한 뒤에만)
 *
 * F4DROP-1117(보스 msg 6966): 제목만 보던 검사가 '제목만 바꿔 쓴 같은 주제'(부동산 10편 등)를 놓쳤다 → 검색 의도 검사 추가.
 *   의도 유사 = 머리 제목('— : ?' 앞) Dice ≥ HEAD_TH 또는 본문 어휘 TF-IDF 코사인 ≥ BODY_TH 또는 제목·slug TF-IDF(동의어 정규화) 코사인 ≥ TITLE_TH 또는 기존 제목 Dice ≥ TH.
 *   후보 1건 검사(--title/--slug/--file, run.mjs)는 라이브 글 + 301 로 통합된 옛 글(목적지로 환산)까지 비교한다.
 *   보정(11-17, 23묶음 114편): 재현 72/114, 묶음 밖 오탐 28쌍 — 오탐은 기준선 pairs 에 '사람이 다른 주제로 판정'으로 둔다.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '..')
const BLOG = path.join(REPO, 'content', 'blog')
const BASELINE = path.join(HERE, 'data', 'blog-dup-baseline.json')
export const BODY_TH = 0.45
export const TITLE_TH = 0.35
export const HEAD_TH = 0.85

// 0.76 = 맥6 판정(15묶음)과 가장 가깝게 묶이는 값. 0.72 아래로 내리면 '재일교포/재미교포' 처럼 대상이 다른 글까지 묶인다.
export const TH = 0.76
const STOP = ['완벽', '가이드', '총정리', '정리', '안내', '한눈에', '방법', '실무', '핵심', '포인트', '체크리스트', '알아보기',
  '2026년', '2025년', '2026', '2025', '최신', '꼭', '알아야', '할', '것', '모든', '비교', '차이']

export function normTitle(t) {
  let s = String(t || '').normalize('NFC').toLowerCase().replace(/f-?4/g, 'f4').replace(/f-?5/g, 'f5')
  s = s.replace(/[\s\p{P}\p{S}_]+/gu, ' ')
  for (const w of STOP) s = s.split(w).join(' ')
  return s.replace(/\s+/g, '')
}
const grams = (s) => { const g = new Set(); for (let i = 0; i < s.length - 1; i++) g.add(s.slice(i, i + 2)); return g }
// 두 값 중 큰 쪽: Dice(전체가 닮음) / 포함도(짧은 제목이 긴 제목 안에 거의 통째로 들어감 — "…완벽 가이드: 누가 받을 수 있고…" 처럼
// 같은 제목 뒤에 부제만 붙인 경우. 짧은 쪽이 2-gram 10개 미만이면 'F-4 비자 연장' 같은 일반어라 포함도는 보지 않는다).
const CONTAIN_MIN = 10, CONTAIN_TH = 0.9
export function similarity(a, b) {
  const ga = grams(normTitle(a)), gb = grams(normTitle(b))
  if (!ga.size || !gb.size) return 0
  let n = 0; for (const x of ga) if (gb.has(x)) n++
  const dice = (2 * n) / (ga.size + gb.size)
  const small = Math.min(ga.size, gb.size)
  const contain = small >= CONTAIN_MIN && n / small >= CONTAIN_TH ? TH + (n / small - CONTAIN_TH) : 0
  return Math.max(dice, contain)
}

/** 라이브 대상 글: content/blog/*.md 중 리다이렉트 source 가 아닌 것. */
export async function livePosts() {
  const { redirectSourceSlugs } = await import(pathToFileURL(path.join(REPO, 'lib', 'blog-redirects.mjs')).href)
  const out = []
  for (const f of fs.readdirSync(BLOG).filter((f) => f.endsWith('.md')).sort()) {
    const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fs.readFileSync(path.join(BLOG, f), 'utf8'))?.[1] || ''
    const get = (k) => (new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm').exec(fm) || [])[1] || ''
    const slug = get('slug') || f.replace(/\.md$/, '')
    if (redirectSourceSlugs.has(slug)) continue
    out.push({ slug, title: get('title'), date: get('date') })
  }
  return out
}

/** 후보 제목과 TH 이상 겹치는 기존 글(유사도 내림차순). */
export async function similarExisting(title, slug = '', th = TH) {
  return (await livePosts())
    .filter((p) => p.slug !== slug)
    .map((p) => ({ ...p, score: similarity(title, p.title) }))
    .filter((p) => p.score >= th)
    .sort((a, b) => b.score - a.score)
}

function pairs(posts, th = TH) {
  const out = []
  for (let i = 0; i < posts.length; i++) for (let j = i + 1; j < posts.length; j++) {
    const s = similarity(posts[i].title, posts[j].title)
    if (s >= th) out.push([posts[i], posts[j], s])
  }
  return out
}

// ── 검색 의도 검사 (F4DROP-1117) ─────────────────────────────────────────────
const SYN = [[/갱신/g, '연장'], [/이중\s*국적/g, '복수국적'], [/국내거소신고증|거소신고증|국내거소신고|거소신고|거소 증|거소증/g, '거소'],
  [/필요서류|구비서류|준비물|서류 목록/g, '서류'], [/직종|직업|업종|일자리/g, '업종'],
  [/재미교포|재미동포|미국 시민권자|미국 영주권자|미국·캐나다|미국/g, '미국'], [/재일교포|재일동포|일본 거주|일본/g, '일본'], [/중국동포|조선족|중국/g, '중국'],
  [/체류기간 연장|체류 기간 연장/g, '연장'], [/소요시간|소요 기간|처리 기간|발급 기간|발급기간|처리 속도/g, '기간'],
  [/신청 자격|자격 요건|신청 요건|자격요건|요건/g, '자격'], [/재외동포|동포|교포/g, ' '],
  [/F-?4|비자|사증|완벽|가이드|총정리|정리|안내|방법|완전|최신|실무|2026년?|2025년?|기준/gi, ' ']]
const STOPSLUG = new Set(['f4', 'visa', 'guide', 'complete', 'full', 'korea', 'korean', 'overseas', '2026', '2025', 'the', 'and', 'of', 'for', 'in', 'to', 'by',
  'latest', 'update', 'master', 'checklist', 'steps', 'info', 'vs', 'with', 'how', 'new', '2', 'dongpo', 'gyopo', 'compatriot'])
function titleFeats(title, slug) {
  let t = String(title || '').normalize('NFC'); for (const [re, r] of SYN) t = t.replace(re, r)
  t = t.replace(/[\s\p{P}\p{S}_]+/gu, '')
  const f = new Map(); const add = (k, w = 1) => f.set(k, (f.get(k) || 0) + w)
  for (let i = 0; i < t.length - 1; i++) add('t:' + t.slice(i, i + 2))
  for (const w of String(slug || '').toLowerCase().split('-')) if (w && !STOPSLUG.has(w) && !/^\d+$/.test(w)) add('s:' + w, 1.5)
  return f
}
function bodyFeats(md) {
  const b = String(md || '').replace(/^---\r?\n[\s\S]*?\r?\n---/, ' ').replace(/<[^>]+>|\]\([^)]*\)|https?:\S+/g, ' ').normalize('NFC')
  const f = new Map()
  for (const w of b.split(/[^\p{L}\p{N}-]+/u)) { if (w.length < 2) continue; const k = w.length > 3 ? w.slice(0, -1) : w; f.set(k, (f.get(k) || 0) + 1) }
  for (const [k, c] of f) f.set(k, 1 + Math.log(c))
  return f
}
function idfOf(docs) { const df = new Map(); for (const d of docs) for (const k of d.keys()) df.set(k, (df.get(k) || 0) + 1); const N = docs.length; return (k) => Math.log((N + 1) / ((df.get(k) || 0) + 1)) + 1 }
function vec(f, idf) { const v = new Map(); let n = 0; for (const [k, c] of f) { const w = c * idf(k); v.set(k, w); n += w * w } return { v, n: Math.sqrt(n) } }
function cos(a, b) { if (!a.n || !b.n) return 0; let s = 0; const [x, y] = a.v.size < b.v.size ? [a, b] : [b, a]; for (const [k, w] of x.v) { const u = y.v.get(k); if (u) s += w * u } return s / (a.n * b.n) }

/** 머리 제목: '핵심어 — 부제' / '핵심어: 부제' / '핵심어? 부제' 의 앞부분을 동의어 정규화. chloe 자동발행 제목이 이 꼴이다. */
export function headTitle(title) {
  let h = String(title || '').normalize('NFC').split(/\s[—–-]\s|[:?|]|,\s/)[0]
  for (const [re, r] of SYN) h = h.replace(re, r)
  return normTitle(h)
}
function headSim(a, b) {
  const x = headTitle(a), y = headTitle(b)
  if (x.length < 4 || y.length < 4) return 0
  const ga = grams(x), gb = grams(y); let n = 0; for (const g of ga) if (gb.has(g)) n++
  return (2 * n) / (ga.size + gb.size)
}
/** content/blog 전 글(301 출발지 포함). redirectTo = 통합된 글이면 최종 목적지 slug. */
export async function allPosts() {
  const { blogRedirects } = await import(pathToFileURL(path.join(REPO, 'lib', 'blog-redirects.mjs')).href)
  const dest = new Map(blogRedirects.map((r) => [r.source.replace(/^\/blog\//, ''), r.destination.replace(/^\/blog\//, '')]))
  const out = []
  for (const f of fs.readdirSync(BLOG).filter((f) => f.endsWith('.md')).sort()) {
    const raw = fs.readFileSync(path.join(BLOG, f), 'utf8')
    const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)?.[1] || ''
    const get = (k) => (new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm').exec(fm) || [])[1] || ''
    const slug = get('slug') || f.replace(/\.md$/, '')
    out.push({ slug, title: get('title'), date: get('date'), raw, redirectTo: dest.get(slug) || null })
  }
  return out
}
let MODEL = null
async function model() {
  if (MODEL) return MODEL
  const posts = await allPosts()
  const TF = posts.map((p) => titleFeats(p.title, p.slug)), BF = posts.map((p) => bodyFeats(p.raw))
  MODEL = { posts, tIdf: idfOf(TF), bIdf: idfOf(BF), TF, BF }
  MODEL.TV = TF.map((f) => vec(f, MODEL.tIdf)); MODEL.BV = BF.map((f) => vec(f, MODEL.bIdf))
  return MODEL
}
/** 두 글의 의도 점수. 걸리면 hit=true, why 에 이유. */
function intentPair(m, i, cand) {
  const p = m.posts[i]
  const d = similarity(cand.title, p.title)
  const t = cos(cand.tv, m.TV[i]), b = cand.bv ? cos(cand.bv, m.BV[i]) : 0
  const hd = headSim(cand.title, p.title)
  const why = []
  if (hd >= HEAD_TH) why.push(`머리 제목 ${hd.toFixed(2)}`)
  if (d >= TH) why.push(`제목 ${d.toFixed(2)}`)
  if (t >= TITLE_TH) why.push(`제목·slug 의도 ${t.toFixed(2)}`)
  if (b >= BODY_TH) why.push(`본문 ${b.toFixed(2)}`)
  return { hit: why.length > 0, score: Math.max(d, t, b, hd >= HEAD_TH ? hd : 0), why: why.join('·') }
}
/** 후보 1건(제목·slug·본문)과 같은 검색 의도인 기존 글. 통합된 옛 글에 걸리면 그 목적지로 환산해 보고한다. */
export async function intentHits({ title, slug = '', body = '' }) {
  const m = await model()
  const cand = { title, tv: vec(titleFeats(title, slug), m.tIdf), bv: body ? vec(bodyFeats(body), m.bIdf) : null }
  const hits = new Map()
  m.posts.forEach((p, i) => {
    if (p.slug === slug) return
    const r = intentPair(m, i, cand)
    if (!r.hit) return
    const key = p.redirectTo || p.slug
    const prev = hits.get(key)
    if (!prev || prev.score < r.score) hits.set(key, { slug: key, via: p.redirectTo ? p.slug : null, title: p.title, score: r.score, why: r.why })
  })
  return [...hits.values()].sort((a, b) => b.score - a.score)
}
/** 라이브 글끼리 의도 유사 쌍(빌드 검사용). */
async function intentPairsLive() {
  const m = await model()
  const live = m.posts.map((p, i) => [p, i]).filter(([p]) => !p.redirectTo)
  const out = []
  for (let x = 0; x < live.length; x++) for (let y = x + 1; y < live.length; y++) {
    const [a, i] = live[x], [b, j] = live[y]
    const r = intentPair(m, j, { title: a.title, tv: m.TV[i], bv: m.BV[i] })
    if (r.hit) out.push([a, b, r.score, r.why])
  }
  return out
}

async function cli() {
  const argv = process.argv.slice(2)
  const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined }
  if (argv.includes('--title') || argv.includes('--file')) {
    let title = opt('--title') || '', slug = opt('--slug') || '', body = ''
    if (opt('--file')) {
      body = fs.readFileSync(opt('--file'), 'utf8')
      const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(body)?.[1] || ''
      title ||= (/^title:\s*"?(.*?)"?\s*$/m.exec(fm) || [])[1] || ''
      slug ||= (/^slug:\s*"?(.*?)"?\s*$/m.exec(fm) || [])[1] || ''
    }
    const hits = await intentHits({ title, slug, body })
    for (const h of hits) console.log(`  ✗ ${h.score.toFixed(2)} ${h.slug}${h.via ? ` (통합된 ${h.via} 경유)` : ''} 「${h.title}」 — ${h.why}`)
    console.log(hits.length ? `✗ blog-dup-gate: 기존 글 ${hits.length}편과 같은 검색 의도` : '✓ blog-dup-gate: 같은 검색 의도의 기존 글 없음')
    return hits.length ? 1 : 0
  }
  const posts = await livePosts()
  const ps = await intentPairsLive()
  const key = (a, b) => [a, b].sort().join(' | ')
  if (argv.includes('--write-baseline')) {
    const prev = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : {}
    fs.mkdirSync(path.dirname(BASELINE), { recursive: true })
    fs.writeFileSync(BASELINE, JSON.stringify({
      note: opt('--note') || prev.note || '사람이 다른 주제로 판정해 유지한 유사 쌍. 새 글을 여기에 추가하지 말 것.',
      threshold: { title: TH, titleIntent: TITLE_TH, body: BODY_TH },
      pairs: ps.map(([a, b, s, why]) => ({ pair: key(a.slug, b.slug), score: +s.toFixed(3), why })).sort((x, y) => x.pair.localeCompare(y.pair)),
    }, null, 1) + '\n')
    console.log(`blog-dup-gate: 기준선 ${ps.length}쌍 기록 → ${path.relative(REPO, BASELINE)}`)
    return 0
  }
  const bl = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : {}
  const base = new Set((bl.pairs || []).map((p) => p.pair))
  const fresh = ps.filter(([a, b]) => !base.has(key(a.slug, b.slug)))
  for (const [a, b, s, why] of fresh) console.log(`  ✗ ${s.toFixed(2)} ${a.slug} 「${a.title}」 ↔ ${b.slug} 「${b.title}」 — ${why}`)
  console.log(fresh.length
    ? `✗ blog-dup-gate: 새 같은 의도 쌍 ${fresh.length}개 — 같은 주제 글을 또 만들지 말 것(기준선 ${base.size}쌍 밖)`
    : `✓ blog-dup-gate: 글 ${posts.length}편, 의도 유사 쌍 ${ps.length}개 모두 기준선 안(새 중복 0)`)
  return fresh.length ? 1 : 0
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  cli().then((c) => process.exit(c)).catch((e) => { console.error(`✗ blog-dup-gate: ${e.stack || e.message}`); process.exit(2) })
}
