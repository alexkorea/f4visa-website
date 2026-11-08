#!/usr/bin/env node
/**
 * 블로그 썸네일 텍스트층 게이트 (QA1108-F4-LAW 1, 맥7 2026-11-08)
 * 옛 생성기(legacy-pre-1.4)가 ① 배경 프롬프트 영문을 카테고리 자리에 ② 상단 사이트명 자리에 엉뚱한 글자를 찍고
 * ③ 글 제목이 바뀐 뒤에도 옛 제목 그림을 남겼고 ④ 같은 배경을 여러 글에 썼다. 목록에 나오는 글(blog-list.generated.json) 전부를 본다.
 *   - public/og/index.json 항목이 있어야 하고, 항목의 title(그림에 그린 제목) = 현재 frontmatter 제목 (다르면 실패 → 썸네일 재생성)
 *   - site_name = 브랜드 등록부 f4visa 명칭 '행정사사무소 이룸', 자리표시 문구 금지
 *   - category 에 영문 프롬프트(소문자 영어 문구·사진 묘사 낱말)·자리표시 문구 금지
 *   - og png·-card png 존재, 최종 해시 중복 0, Pexels ID 중복 0, 배경 지문(dHash, 글자 없는 띠) 거의 같은 쌍 0
 * 사용: node scripts/thumb-text-gate.mjs   (prebuild — blog-list-index.mjs 다음)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITE_NAME = '행정사사무소 이룸'   // team-relay/brand_registry.md 브랜드 C
const PLACEHOLDER_RE = /행정사사무소\s*이름|사무소\s*이름|사이트\s*명|사이트\s*이름|site\s*name|company\s*name|your\s+(?:company|brand|site)|placeholder|lorem|ipsum|TODO|TBD|\{\{|\}\}|\$\{/i
const PROMPT_WORDS_RE = /\b(?:photographic|photo of|no text|no people|no symbols|wide view|blue sky|soft (?:natural |morning )?light|clean (?:tones|daylight)|muted tones|sleek architecture|pedestrians blurred|flat lay|skyscrapers?|high-rise|facade|greenery|tidy|aerial view|texture|minimal)\b/i
const LOWER_PHRASE_RE = /(?:^|[\s,])[a-z]{2,}(?:[\s,]+[a-z]{2,}){3,}/
const promptLike = (s) => !!s && !/[぀-ヿ㐀-鿿가-힣]/.test(s) && (PROMPT_WORDS_RE.test(s) || LOWER_PHRASE_RE.test(s))
const BG_NEAR = 12   // 배경 띠 dHash 해밍 거리 이하 = 같은 배경(11-08 실측: 같은 작가 연속 사진 21011608·21011596 = 10)

const posts = JSON.parse(fs.readFileSync(path.join(REPO, 'lib/blog-list.generated.json'), 'utf8'))
const idx = JSON.parse(fs.readFileSync(path.join(REPO, 'public/og/index.json'), 'utf8')).items || {}
const bad = []
const seenHash = new Map(), seenPx = new Map(), bg = []

async function dhash(file) {
  const full = await sharp(file).resize(1200, 630, { fit: 'fill' }).toBuffer()
  const { data } = await sharp(full).extract({ left: 0, top: 320, width: 1200, height: 150 })
    .greyscale().resize(33, 8, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true })
  let bits = 0n
  for (let y = 0; y < 8; y++) for (let x = 0; x < 32; x++) bits = (bits << 1n) | (data[y * 33 + x] > data[y * 33 + x + 1] ? 1n : 0n)
  return bits
}
const ham = (a, b) => { let v = a ^ b, n = 0; while (v) { n += Number(v & 1n); v >>= 1n } return n }

for (const p of posts) {
  const m = /^\/og\/(.+)\.png$/.exec(p.image || '')
  if (!m) { bad.push(`${p.slug}: 썸네일이 /og/*.png 가 아님(${p.image}) — 제목 없는 사진`); continue }
  const key = m[1], it = idx[key]
  const png = path.join(REPO, 'public/og', `${key}.png`), card = path.join(REPO, 'public/og', `${key}-card.png`)
  if (!fs.existsSync(png) || !fs.existsSync(card)) { bad.push(`${p.slug}: og 파일 없음(${key})`); continue }
  if (!it) { bad.push(`${p.slug}: index.json 항목 없음(${key})`); continue }
  if (it.title !== p.title) bad.push(`${p.slug}: 썸네일 제목 불일치 — 그림 '${it.title ?? '(기록 없음)'}' ≠ 글 '${p.title}'`)
  if (it.site_name !== SITE_NAME || PLACEHOLDER_RE.test(it.site_name || '')) bad.push(`${p.slug}: 사이트명 '${it.site_name ?? '(기록 없음)'}' ≠ '${SITE_NAME}'`)
  if (promptLike(it.category || '') || PLACEHOLDER_RE.test(it.category || '')) bad.push(`${p.slug}: 카테고리 자리에 프롬프트/자리표시 '${it.category}'`)
  if (seenHash.has(it.hash)) bad.push(`${p.slug}: 썸네일 해시 중복(${seenHash.get(it.hash)})`); else seenHash.set(it.hash, p.slug)
  if (it.pexels_id) { if (seenPx.has(it.pexels_id)) bad.push(`${p.slug}: Pexels ${it.pexels_id} 중복(${seenPx.get(it.pexels_id)})`); else seenPx.set(it.pexels_id, p.slug) }
  bg.push([p.slug, await dhash(png)])
}
for (let i = 0; i < bg.length; i++) for (let j = i + 1; j < bg.length; j++) {
  const d = ham(bg[i][1], bg[j][1])
  if (d <= BG_NEAR) bad.push(`배경 반복: ${bg[i][0]} ≈ ${bg[j][0]} (dHash ${d})`)
}
if (bad.length) {
  console.error(`✗ thumb-text-gate: ${bad.length}건 — 썸네일 재생성(~/tools/og-pipeline generate.mjs, 제목=현재 글 제목, 새 파일명)\n  ` + bad.join('\n  '))
  process.exit(1)
}
console.log(`✓ thumb-text-gate: ${posts.length}편 — 제목 일치·사이트명 '${SITE_NAME}'·프롬프트/자리표시 0·해시/사진/배경 중복 0`)
