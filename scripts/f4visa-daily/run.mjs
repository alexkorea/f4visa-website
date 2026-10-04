#!/usr/bin/env node
const SITE = 'f4visa'
/**
 * 원고 은행 일일 발행 엔진 — scripts/<site>-daily/run.mjs
 * (2026-10-03 맥7 지시 0940 W1-bank / 0941 W2-add. 원칙은 vk-daily·inhega-daily 와 같다.)
 *
 * f6visa·f4visa·investkorea 세 레포에 **같은 파일**을 둔다. 다른 줄은 맨 위 SITE 상수 하나뿐이다.
 * 고칠 때는 세 사본을 함께 고칠 것(diff 로 SITE 줄만 달라야 정상).
 *
 *   bank/<slug>/<locale>.md   사람이 쓴 원고(맥3 형식: frontmatter slug·title·description·locale·keywords, date 없음)
 *   bank/<slug>/meta.json     { order, batch, category:{<locale>:…}, visa } — 발행 순서·카테고리
 *   bank/<slug>/evidence.md   근거 대조표(발행하지 않는다, 검수용)
 *   state.json                발행 이력(published[])·거부 이력(rejected[])
 *
 * 규칙
 *   - 하루 1건: state 에 없는 slug 중 order 가 가장 작은 것 하나만 발행한다.
 *   - 기존 slug 거부: 사이트에 같은 slug 가 이미 있으면 절대 쓰지 않는다(날짜만 바꾸는 재발행·덮어쓰기 금지).
 *     거부한 slug 는 state.rejected 에 남기고 다음 원고로 넘어간다.
 *   - 은행이 비면 rc=1(조용히 통과하지 않는다). 본문을 생성하지 않는다 — 원고는 사람이 쓴다.
 *   - 같은 날 재실행은 아무것도 쓰지 않는다(멱등).
 *
 * 사용
 *   node run.mjs [--date=YYYY-MM-DD]            dry-run: 고를 원고·쓸 파일·검사 결과만 출력(무변경)
 *   node run.mjs --date=YYYY-MM-DD --write      발행
 *   node run.mjs --list                         은행·이력 현황
 *
 * 종료코드  0 발행(또는 dry-run 통과·오늘 이미 발행) / 1 은행 고갈 / 3 원고 검사 FAIL / 4 쓰기·OG·DB 실패(되돌림)
 * 출력      "✅ published <slug> (<n> locales)" + "ARCHIVE <json>" (daily-blog-4am.mjs 가 읽는다)
 */
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '..', '..')
const BANK = path.join(HERE, 'bank')
const STATE_FILE = path.join(HERE, 'state.json')
const NODE = '/Users/mac4/.local/node/bin/node'
const OG_TOOL = '/Users/mac4/tools/og-pipeline'

const SITES = {
  f6visa: {
    locales: ['ko', 'en', 'zh', 'ja', 'vi', 'th', 'ru'],
    phone: '02-363-2251', domain: 'f6visa.com',
    og: { site: 'f6visa', siteName: 'f6visa.com', key: (l, s) => `${l}/${s}` },
    git: true,
    exists: (slug) => ['ko', 'en', 'zh', 'ja', 'vi', 'th', 'ru']
      .filter((l) => fs.existsSync(path.join(REPO, 'content', l, 'blog', `${slug}.mdx`)) || fs.existsSync(path.join(REPO, 'content', l, 'blog', `${slug}.md`)))
      .map((l) => `content/${l}/blog/${slug}.mdx`),
  },
  f4visa: {
    locales: ['ko'],
    phone: '02-363-2251', domain: 'f4visa.net',
    og: { site: 'f4visa', siteName: '행정사사무소 이룸', key: (l, s) => s },
    git: true,
    exists: (slug) => {
      const hit = fs.readdirSync(path.join(REPO, 'content', 'blog')).filter((f) => f === `${slug}.md` || f.startsWith(`${slug}.`))
      const redir = fs.readFileSync(path.join(REPO, 'lib', 'blog-redirects.mjs'), 'utf8').includes(`'/blog/${slug}'`)
      return [...hit.map((f) => `content/blog/${f}`), ...(redir ? ['lib/blog-redirects.mjs (redirect source)'] : [])]
    },
  },
  investkorea: {
    locales: ['ko', 'en', 'zh', 'ja'],
    phone: '02-309-3107', domain: 'investkorea.co.kr',
    og: null, git: false,
    // 2026-10-04 맥7 0950: 브랜드 B(에이원) 전용 게이트 — registry B 외 상호·전화·이메일·주소가 원고에 있으면 발행 중단(rc=3).
    // 브랜드 A(비전)·C·D·E 공유 표기는 NAS team-relay/content-guard/brand_registry.json 에서 옮겼다(NAS 멈춤에 발행이 걸리지 않게 내장).
    brand: {
      forbidden: /VISION|Vision (?:Admin|Immigration|Visa|행정)|비전\s*행정|(?:ビジョン|愿景|远景)\s*行政|飞展|维森|행정사사무소 이룸|유선행정|선샤인행정|5000meter|7000meter|9000meter|teamone1?163|teamhelp888|lwj95|VisionAdmin|퇴계로|Toegye|退溪|退渓|성우빌딩|Seongwoo|圣宇|ソンウ|04614|363-?2251|405-05-54079/gu,  // 대소문자 구분: 영어 낱말 vision 오탐 방지
      emails: ['help@investkorea.co.kr'],
    },
  },
}
const CFG = SITES[SITE]
if (!CFG) { console.error(`✗ 알 수 없는 SITE: ${SITE}`); process.exit(4) }

// ── 검사 규칙 ────────────────────────────────────────────────────────────────
// C6 금지어 — f6visa scripts/i18n-source-gate.mjs 의 C6_RE 와 같다(맥3 C6 정규식). 예외는 'power of attorney' 뿐.
const C6_RE = /변호사|법무법인|로펌|(?<![Oo]f )(?<![Oo]f-)\b(?:lawyers?|attorneys?|law firms?|law office)\b|luật sư|律师|(?<!調)律師|弁護士|адвокат[\p{L}]*|юрист[\p{L}]*|ทนาย|محام[\p{L}]*/giu
// 자사 요금 표기 금지(정부 수수료·법정 금액은 허용) — 대행료류 낱말 바로 뒤의 숫자만 잡는다.
const OUR_PRICE_RE = /(대행료|수임료|착수금|상담료|견적가|보수액|service fee|agency fee|consultation fee)[^\n]{0,30}\d/i
const HYPE_RE = /100%|최고의?|업계 1위|무조건|합격 보장|승인 보장|허가 보장|guarantee[ds]? (?:approval|success)/i
const FAQ_H2 = /FAQ|자주\s*묻는\s*질문|Frequently\s+Asked|常见问题|常見問題|よくある(?:ご)?質問|Câu hỏi thường gặp|Часто задаваемые|Частые вопросы|คำถามที่พบบ่อย/i
const DATE_IN_SLUG = /(?:^|-)20\d\d-?\d\d-?\d\d(?:-|$)/
const PHONE_RE = /0\d{1,2}-\d{3,4}-\d{4}/g

// ── 유틸 ─────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, ...v] = a.replace(/^--/, '').split('='); return [k, v.length ? v.join('=') : true] }))
const kstToday = () => new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10)
const DATE = typeof args.date === 'string' ? args.date : kstToday()
if (!/^\d{4}-\d{2}-\d{2}$/.test(DATE)) { console.error(`✗ --date 형식 오류: ${DATE}`); process.exit(4) }
const WRITE = args.write === true

function readState() {
  if (!fs.existsSync(STATE_FILE)) return { published: [], rejected: [] }
  const s = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'))
  s.published ||= []; s.rejected ||= []
  return s
}
const writeState = (s) => fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2) + '\n', 'utf8')

/** 맥3 원고 frontmatter: `key: "값"` + `keywords:` 아래 `  - 항목`. */
function parseManuscript(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!m) throw new Error('frontmatter 없음')
  const fm = {}
  let last = null
  for (const line of m[1].split(/\r?\n/)) {
    const li = /^\s+-\s+(.*)$/.exec(line)
    if (li && last) { (Array.isArray(fm[last]) ? fm[last] : (fm[last] = [])).push(li[1].trim().replace(/^"(.*)"$/, '$1')); continue }
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line)
    if (!kv) continue
    last = kv[1]
    let v = kv[2].trim()
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1)
    fm[kv[1]] = v
  }
  return { fm, body: raw.slice(m[0].length) }
}

function loadBank() {
  if (!fs.existsSync(BANK)) return []
  const out = []
  for (const slug of fs.readdirSync(BANK).sort()) {
    const dir = path.join(BANK, slug)
    if (!fs.statSync(dir).isDirectory()) continue
    const metaP = path.join(dir, 'meta.json')
    const meta = fs.existsSync(metaP) ? JSON.parse(fs.readFileSync(metaP, 'utf8')) : {}
    out.push({ slug, dir, meta, order: Number.isFinite(meta.order) ? meta.order : 1e9 })
  }
  return out.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug))
}

/** 원고 1건(전 로캘) 검사. 반환: { fails[], warns[], docs{locale:{fm,body}} } */
function checkEntry(e) {
  const fails = [], warns = [], docs = {}
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.slug)) fails.push(`slug 형식(소문자·숫자·하이픈만): ${e.slug}`)
  if (DATE_IN_SLUG.test(e.slug)) fails.push(`slug 에 날짜(BLOG_STANDARD 날짜 접미사 금지): ${e.slug}`)
  else if (/(?:^|-)20\d\d(?:-|$)/.test(e.slug)) warns.push(`slug 에 연도 포함: ${e.slug}`)
  for (const loc of CFG.locales) {
    if (!e.meta.category?.[loc]) fails.push(`[${loc}] meta.json category 없음`)
    const p = path.join(e.dir, `${loc}.md`)
    if (!fs.existsSync(p)) { fails.push(`[${loc}] 원고 파일 없음 (${loc}.md) — 로캘이 다 갖춰져야 발행한다`); continue }
    const raw = fs.readFileSync(p, 'utf8')
    let doc
    try { doc = parseManuscript(raw) } catch (err) { fails.push(`[${loc}] ${err.message}`); continue }
    const { fm, body } = doc
    if (fm.slug !== e.slug) fails.push(`[${loc}] frontmatter slug(${fm.slug}) ≠ 폴더명(${e.slug})`)
    if (fm.locale && fm.locale !== loc) fails.push(`[${loc}] frontmatter locale=${fm.locale}`)
    if (!fm.title) fails.push(`[${loc}] title 없음`)
    if (!fm.description) fails.push(`[${loc}] description 없음`)
    if (/"/.test(fm.title || '') || /"/.test(fm.description || '')) fails.push(`[${loc}] title/description 안 큰따옴표(평면 frontmatter 파서가 깨진다)`)
    if (loc !== 'ko' && /[가-힣]/.test(`${fm.title}${fm.description}`)) fails.push(`[${loc}] title/description 에 한글`)
    if (!/^#\s+\S/m.test(body)) warns.push(`[${loc}] 본문 H1 없음`)
    for (const m of raw.matchAll(C6_RE)) fails.push(`[${loc}] C6 금지어 "${m[0]}" …${raw.slice(Math.max(0, m.index - 12), m.index + 16).replace(/\n/g, ' ')}…`)
    if (OUR_PRICE_RE.test(raw)) fails.push(`[${loc}] 자사 요금 표기: ${OUR_PRICE_RE.exec(raw)[0]}`)
    if (HYPE_RE.test(raw)) fails.push(`[${loc}] 과장·보장 표현: ${HYPE_RE.exec(raw)[0]}`)
    for (const ph of new Set(raw.match(PHONE_RE) || [])) if (ph !== CFG.phone) fails.push(`[${loc}] 등록 외 전화번호 ${ph} (정답 ${CFG.phone})`)
    if (CFG.brand) {
      for (const m of raw.matchAll(CFG.brand.forbidden)) fails.push(`[${loc}] 브랜드 레지스트리 B 외 표기 "${m[0]}" …${raw.slice(Math.max(0, m.index - 12), m.index + 20).replace(/\n/g, ' ')}…`)
      for (const em of new Set(raw.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g) || [])) if (!CFG.brand.emails.includes(em.toLowerCase())) fails.push(`[${loc}] 등록 외 이메일 ${em} (정답 ${CFG.brand.emails.join(',')})`)
    }
    const h2 = [...body.matchAll(/^##\s+(.+)$/gm)]
    const faqIdx = h2.findIndex((h) => FAQ_H2.test(h[1]) && !/^\d+\./.test(h[1].trim()))
    if (faqIdx < 0) warns.push(`[${loc}] FAQ 제목(H2) 없음 — FAQPage 없이 발행된다`)
    for (const m of body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
      if (!new URL(m[1]).hostname.endsWith(CFG.domain)) warns.push(`[${loc}] 외부 링크 ${m[1]}`)
    }
    docs[loc] = doc
  }
  return { fails, warns, docs }
}

/** `~` 를 이스케이프한다 — remark-gfm·marked 는 한 문단의 `~` 두 개를 취소선으로 바꾼다("E-1·E-3~E-5·E-7 … E-3 ~ E-5").
 *  `~` 가 2개 이상인 문단만 고친다(1개뿐인 문단은 취소선이 안 되고, FAQ 평문에 `\~` 가 남지 않게). */
const escapeTilde = (md) => md.split(/(\n\s*\n)/).map((blk) => ((blk.match(/(?<!\\)~/g) || []).length >= 2 ? blk.replace(/(?<!\\)~/g, '\\~') : blk)).join('')
const q = (s) => JSON.stringify(String(s))

/** f6visa: FAQ H2 구간을 <!-- faq --> … <!-- /faq --> 로 감싼다(build-posts.mjs 가 FAQPage 를 화면과 같은 원천에서 뽑는다). */
function wrapFaq(body) {
  const lines = body.split('\n')
  const start = lines.findIndex((l) => /^##\s+/.test(l) && FAQ_H2.test(l) && !/^##\s+\d+\./.test(l))
  if (start < 0) return body
  let end = lines.findIndex((l, i) => i > start && /^##\s+/.test(l))
  if (end < 0) end = lines.length
  while (end - 1 > start && lines[end - 1].trim() === '') end--
  return [...lines.slice(0, start), '<!-- faq -->', ...lines.slice(start, end), '<!-- /faq -->', ...lines.slice(end)].join('\n')
}

const stripH1 = (body) => body.replace(/^﻿?\s*#(?!#)\s+.*(?:\r?\n)+/, '')

function pickTopicImage(slug, category) {
  // daily-blog-4am.mjs(2026-10-03 이전)의 investkorea 규칙을 옮겼다 — /blog-topics/<주제>.jpg
  const s = `${slug || ''} ${category || ''}`.toLowerCase()
  const rules = [
    [/d8|d-8|투자비자|investment-visa|corporate-invest/, 'd8-visa'], [/d7|d-7|intracompany|transferee|주재|dispatch|파견/, 'd7-visa'],
    [/f5|f-5|permanent|영주/, 'permanent-residency'], [/e7|e-7|work-visa|취업|employment|고용/, 'work-visa'],
    [/incorporation|company-setup|corporation-setup|법인설립|corp-setup|stockco/, 'company-setup'],
    [/foreign-invest|외국인투자|fdi-regist/, 'foreign-investment'], [/startup|창업/, 'startup'], [/visa/, 'visa-general'],
  ]
  for (const [re, img] of rules) if (re.test(s)) return `/blog-topics/${img}.jpg`
  return '/blog-topics/investment.jpg'
}

/** 사이트 형식으로 변환. 반환: [{ rel(레포 상대경로), content, remote(GitHub 아카이브 경로) }] 또는 investkorea 는 rows */
function render(e, docs) {
  if (SITE === 'f6visa') {
    return CFG.locales.map((loc) => {
      const { fm, body } = docs[loc]
      const content = `---\ntitle: ${q(fm.title)}\ndate: ${q(DATE)}\ncategory: ${q(e.meta.category[loc])}\nexcerpt: ${q(fm.description)}\nslug: ${q(e.slug)}\n---\n\n${wrapFaq(escapeTilde(body.replace(/^\s+/, '')))}`
      const rel = `content/${loc}/blog/${e.slug}.mdx`
      return { rel, content, remote: rel }
    })
  }
  if (SITE === 'f4visa') {
    const { fm, body } = docs.ko
    const content = `---\ntitle: ${q(fm.title)}\ndate: ${q(DATE)}\ncategory: ${q(e.meta.category.ko)}\nexcerpt: ${q(fm.description)}\nimage: ${q(`/og/${e.slug}.png`)}\nslug: ${q(e.slug)}\n---\n${escapeTilde(body.replace(/^\s+/, ''))}`
    const rel = `content/blog/${e.slug}.md`
    return [{ rel, content, remote: rel }]
  }
  // investkorea — Supabase 행 + 아카이브 사본
  return CFG.locales.map((loc) => {
    const { fm, body } = docs[loc]
    const row = {
      slug: e.slug, locale: loc, title: fm.title, category: e.meta.category[loc], excerpt: fm.description,
      image: pickTopicImage(e.slug, e.meta.category.ko), content: escapeTilde(stripH1(body.replace(/^\s+/, ''))).trimEnd() + '\n',
      post_date: DATE, published: true,
    }
    const rel = `scripts/investkorea-daily/archive/${e.slug}.${loc}.md`
    const content = `---\ntitle: ${q(fm.title)}\ndate: ${q(DATE)}\ncategory: ${q(row.category)}\nexcerpt: ${q(fm.description)}\nslug: ${q(e.slug)}\nlocale: ${q(loc)}\n---\n\n${row.content}`
    return { rel, content, remote: `content/blog/${e.slug}.${loc}.md`, row }
  })
}

// ── investkorea: Supabase ───────────────────────────────────────────────────
function sbCreds() {
  const src = fs.readFileSync('/Users/mac4/sites/daily-blog-4am.mjs', 'utf8')
  const key = /const SB_KEY = '([^']+)'/.exec(src)?.[1]
  if (!key) throw new Error('SB_KEY 를 찾지 못함')
  return { url: 'https://vjkjavgmqxdrwtezryzd.supabase.co/rest/v1/investkorea_blog_posts', key }
}
async function sbFetch(qs, init = {}) {
  const { url, key } = sbCreds()
  const r = await fetch(`${url}${qs}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(init.headers || {}) }, signal: AbortSignal.timeout(30000) })
  const text = await r.text()
  let body = null
  try { body = text ? JSON.parse(text) : null } catch { body = text }
  return { status: r.status, body }
}
async function ikExisting(slug) {
  const r = await sbFetch(`?select=slug,locale&slug=eq.${encodeURIComponent(slug)}`)
  if (r.status !== 200 || !Array.isArray(r.body)) throw new Error(`Supabase 조회 실패 ${r.status} — 모르면 쓰지 않는다`)
  return r.body.map((x) => `supabase ${x.slug}|${x.locale}`)
}

// ── OG 썸네일(f6visa·f4visa) ────────────────────────────────────────────────
function makeOg(e, docs) {
  const items = CFG.locales.map((loc) => ({ key: CFG.og.key(loc, e.slug), slug: e.slug, lang: loc, title: docs[loc].fm.title, category: e.meta.category[loc], visa: e.meta.visa || null }))
  const mf = path.join(os.tmpdir(), `og-${SITE}-${e.slug}-${process.pid}.json`)
  fs.writeFileSync(mf, JSON.stringify({ site: CFG.og.site, siteName: CFG.og.siteName, map: null, items }, null, 1))
  const outdir = path.join(REPO, 'public', 'og')
  const r = spawnSync(NODE, ['generate.mjs', '--manifest', mf, '--outdir', outdir, '--index', path.join(outdir, 'index.json')], { cwd: OG_TOOL, encoding: 'utf8', timeout: 900000 })
  fs.rmSync(mf, { force: true })
  const idx = JSON.parse(fs.readFileSync(path.join(outdir, 'index.json'), 'utf8')).items || {}
  const missing = items.filter((it) => !idx[it.key] || !fs.existsSync(path.join(outdir, `${it.key}.png`)) || !fs.existsSync(path.join(outdir, `${it.key}-card.png`)))
  if (r.status !== 0 || missing.length) throw new Error(`OG 생성 실패 rc=${r.status} 누락 ${missing.map((m) => m.key).join(',')} :: ${(r.stderr || r.stdout || '').slice(-200)}`)
  return items.flatMap((it) => [`public/og/${it.key}.png`, `public/og/${it.key}-card.png`])
}

const git = (...a) => spawnSync('git', a, { cwd: REPO, encoding: 'utf8' })

// ── main ─────────────────────────────────────────────────────────────────────
async function main() {
  const state = readState()
  const bank = loadBank()
  const done = new Set(state.published.map((p) => p.slug))
  const rejected = new Set(state.rejected.map((p) => p.slug))

  if (args.list) {
    for (const e of bank) {
      const p = state.published.find((x) => x.slug === e.slug)
      console.log(`${String(e.order).padStart(3)} ${p ? `발행 ${p.date}` : rejected.has(e.slug) ? '거부      ' : '대기      '} ${e.slug}`)
    }
    console.log(`\n${SITE}: 은행 ${bank.length} · 발행 ${done.size} · 거부 ${rejected.size} · 대기 ${bank.filter((e) => !done.has(e.slug) && !rejected.has(e.slug)).length}`)
    return 0
  }

  if (args['check-all']) {
    // 투입 검사: 미발행 원고 전부를 발행 때와 같은 규칙(기존 slug·원고 검사)으로 본다. 무변경.
    let bad = 0
    for (const e of bank.filter((x) => !done.has(x.slug))) {
      const exist = SITE === 'investkorea' ? await ikExisting(e.slug) : CFG.exists(e.slug)
      const { fails, warns } = checkEntry(e)
      if (exist.length) fails.unshift(`기존 slug: ${exist.slice(0, 2).join(', ')}`)
      if (fails.length) bad++
      console.log(`${fails.length ? '✗' : '✓'} ${String(e.order).padStart(2)} ${e.slug}${warns.length ? `  ⚠${warns.length}` : ''}`)
      for (const f of fails) console.log(`     ✗ ${f}`)
      for (const w of warns) console.log(`     ⚠ ${w}`)
    }
    console.log(`\n${SITE}: 검사 ${bank.length - done.size}편 FAIL ${bad}`)
    return bad ? 3 : 0
  }

  console.log(`[${SITE}-daily] date=${DATE} mode=${WRITE ? 'WRITE' : 'dry-run'} repo=${REPO}`)
  const today = state.published.find((p) => p.date === DATE)
  if (today) { console.log(`= 오늘(${DATE}) 이미 발행: ${today.slug} — 아무것도 쓰지 않는다`); return 0 }

  const queue = bank.filter((e) => !done.has(e.slug) && !rejected.has(e.slug))
  for (const e of queue) {
    // 1) 기존 slug 거부
    const exist = SITE === 'investkorea' ? await ikExisting(e.slug) : CFG.exists(e.slug)
    if (exist.length) {
      console.log(`✗ 기존 slug 거부 — ${e.slug} 이미 있음: ${exist.slice(0, 3).join(', ')} (덮어쓰지 않는다, 다음 원고로)`)
      if (WRITE) { state.rejected.push({ slug: e.slug, date: DATE, reason: `exists: ${exist.slice(0, 3).join(', ')}` }); writeState(state) }
      continue
    }
    // 2) 원고 검사 — FAIL 이면 그날 미발행(rc=3). 건너뛰지 않는다: 사람이 고쳐야 한다.
    const { fails, warns, docs } = checkEntry(e)
    for (const w of warns) console.log(`  ⚠ ${w}`)
    if (fails.length) {
      for (const f of fails) console.log(`  ✗ ${f}`)
      console.log(`✗ 원고 검사 FAIL ${fails.length}건 — ${e.slug} (bank/${e.slug}/ 수정 필요)`)
      return 3
    }
    const files = render(e, docs)
    console.log(`→ 선택: ${e.slug} (order ${e.order}, ${e.meta.batch || '-'}) × ${CFG.locales.length} locales`)
    for (const f of files) console.log(`  · ${f.row ? `supabase insert ${f.row.slug}|${f.row.locale} + ` : ''}${f.rel} (${Buffer.byteLength(f.content)}B)`)

    if (!WRITE) {
      if (SITE === 'f6visa') {
        // build-posts.mjs 의 FAQ 파서와 같은 규칙으로 문답 수를 미리 센다.
        for (const f of files) {
          const m = /<!--\s*faq\s*-->([\s\S]*?)<!--\s*\/faq\s*-->/.exec(f.content)
          console.log(`    ${f.rel.split('/')[1]} FAQ ${m ? m[1].split(/^###\s+/m).length - 1 : 0}문항`)
        }
      }
      console.log(`✓ dry-run 통과 — ${e.slug} (--write 로 발행)`)
      return 0
    }

    // 3) 쓰기 — 실패하면 만든 파일을 지우고 바뀐 파일을 되돌린다.
    const created = [], restore = new Map()
    const snap = (rel) => { const p = path.join(REPO, rel); if (!restore.has(rel)) restore.set(rel, fs.existsSync(p) ? fs.readFileSync(p) : null) }
    try {
      if (SITE === 'investkorea') {
        for (const f of files) { fs.mkdirSync(path.dirname(path.join(REPO, f.rel)), { recursive: true }); fs.writeFileSync(path.join(REPO, f.rel), f.content); created.push(f.rel) }
        const r = await sbFetch('', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(files.map((f) => f.row)) })
        if (r.status !== 201) throw new Error(`Supabase insert ${r.status}: ${JSON.stringify(r.body).slice(0, 200)}`)
        const back = await ikExisting(e.slug)
        if (back.length !== CFG.locales.length) throw new Error(`insert 후 재조회 ${back.length}/${CFG.locales.length}행`)
      } else {
        for (const f of files) {
          const p = path.join(REPO, f.rel)
          fs.mkdirSync(path.dirname(p), { recursive: true })
          fs.writeFileSync(p, f.content, 'utf8'); created.push(f.rel)
        }
        snap('public/og/index.json')
        const ogFiles = makeOg(e, docs)
        created.push(...ogFiles)
        if (SITE === 'f6visa') {
          snap('data/blog-posts.generated.ts')
          const b = spawnSync(NODE, ['scripts/build-posts.mjs'], { cwd: REPO, encoding: 'utf8', timeout: 120000 })
          if (b.status !== 0) throw new Error(`build-posts 실패: ${(b.stderr || b.stdout).slice(-200)}`)
        }
      }
    } catch (err) {
      for (const rel of created) fs.rmSync(path.join(REPO, rel), { force: true })
      for (const [rel, buf] of restore) { const p = path.join(REPO, rel); if (buf === null) fs.rmSync(p, { force: true }); else fs.writeFileSync(p, buf) }
      console.log(`✗ 쓰기 실패 — 되돌림 완료: ${err.message}`)
      return 4
    }

    state.published.push({ slug: e.slug, date: DATE, locales: CFG.locales, at: new Date().toISOString(), batch: e.meta.batch || null })
    writeState(state)

    if (CFG.git) {
      const paths = [...files.map((f) => f.rel), ...created.filter((c) => c.startsWith('public/og/')), 'public/og/index.json',
        path.relative(REPO, STATE_FILE), ...(SITE === 'f6visa' ? ['data/blog-posts.generated.ts'] : [])]
      git('add', '--', ...new Set(paths))
      const c = git('commit', '-q', '-m', `feat(${SITE}): 일일 블로그 ${DATE} — ${e.slug} × ${CFG.locales.length}로캘 (원고 은행 ${e.meta.batch || ''}, scripts/${SITE}-daily/run.mjs)`, '--', ...new Set(paths))
      console.log(c.status === 0 ? `  · git commit ${git('rev-parse', '--short', 'HEAD').stdout.trim()}` : `  ⚠ git commit 실패(발행은 유지): ${(c.stderr || c.stdout).slice(-160)}`)
    }
    console.log(`ARCHIVE ${JSON.stringify(files.map((f) => ({ local: path.join(REPO, f.rel), remote: f.remote })))}`)
    console.log(`✅ published ${e.slug} (${CFG.locales.length} locales)`)
    return 0
  }
  console.log(`✗ 원고 은행 비어 있음 — ${SITE}: 미발행 원고 0 (은행 ${bank.length} · 발행 ${done.size} · 거부 ${rejected.size}). scripts/${SITE}-daily/bank/<slug>/ 에 원고를 넣어야 재개된다`)
  return 1
}

main().then((code) => process.exit(code)).catch((err) => { console.error(`✗ ${err.stack || err.message}`); process.exit(4) })
