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
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '..')
const BLOG = path.join(REPO, 'content', 'blog')
const BASELINE = path.join(HERE, 'data', 'blog-dup-baseline.json')

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

async function cli() {
  const argv = process.argv.slice(2)
  const opt = (k) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : undefined }
  if (argv.includes('--title')) {
    const hits = await similarExisting(opt('--title'), opt('--slug') || '')
    for (const h of hits) console.log(`  ✗ ${h.score.toFixed(2)} ${h.slug} 「${h.title}」`)
    console.log(hits.length ? `✗ blog-dup-gate: 기존 글 ${hits.length}편과 같은 주제` : '✓ blog-dup-gate: 겹치는 기존 글 없음')
    return hits.length ? 1 : 0
  }
  const posts = await livePosts()
  const ps = pairs(posts)
  if (argv.includes('--write-baseline')) {
    const slugs = [...new Set(ps.flatMap(([a, b]) => [a.slug, b.slug]))].sort()
    fs.mkdirSync(path.dirname(BASELINE), { recursive: true })
    fs.writeFileSync(BASELINE, JSON.stringify({
      note: 'BOSSEYE-FIX-1014 #13 — 이미 라이브에 있던 유사 제목 글. 통합·대표 URL 은 보스 결정 대기(그 전엔 지우거나 리다이렉트하지 말 것). 새 글을 여기에 추가하지 말 것.',
      threshold: TH, slugs,
    }, null, 1) + '\n')
    console.log(`blog-dup-gate: 기준선 ${slugs.length}편 기록 → ${path.relative(REPO, BASELINE)}`)
    return 0
  }
  const base = new Set(fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')).slugs : [])
  const fresh = ps.filter(([a, b]) => !(base.has(a.slug) && base.has(b.slug)))
  for (const [a, b, s] of fresh) console.log(`  ✗ ${s.toFixed(2)} ${a.slug} 「${a.title}」 ↔ ${b.slug} 「${b.title}」`)
  console.log(fresh.length
    ? `✗ blog-dup-gate: 새 유사 제목 ${fresh.length}쌍 — 같은 주제 글을 또 만들지 말 것(기준선 ${base.size}편 밖)`
    : `✓ blog-dup-gate: 글 ${posts.length}편, 유사 쌍 ${ps.length}개 모두 기준선 안(새 중복 0)`)
  return fresh.length ? 1 : 0
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  cli().then((c) => process.exit(c)).catch((e) => { console.error(`✗ blog-dup-gate: ${e.stack || e.message}`); process.exit(2) })
}
