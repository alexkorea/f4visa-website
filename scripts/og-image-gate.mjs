#!/usr/bin/env node
/**
 * og:image 게이트 (F4-OGIMG 2026-10-22) — 빌드 산출물 HTML 전부에 og:image·twitter:image 가 있어야 한다.
 * 페이지 metadata 가 openGraph/twitter 를 images 없이 쓰면 레이아웃 기본값이 사라진다(얕은 병합).
 * 고치는 법: 페이지 metadata 를 lib/og.ts 의 withOgDefaults() 로 감싼다.
 * 사용: node scripts/og-image-gate.mjs [.next/server/app]
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = process.argv[2] || '.next/server/app'
if (!existsSync(root)) { console.error(`[OG GATE] ${root} 없음`); process.exit(1) }
const files = []
const walk = (d) => { for (const e of readdirSync(d)) { const p = join(d, e); statSync(p).isDirectory() ? walk(p) : e.endsWith('.html') && files.push(p) } }
walk(root)
const bad = []
for (const f of files) {
  const rel = relative(root, f)
  if (/^_(not-found|global-error)/.test(rel) || rel === '404.html' || rel === '500.html') continue
  const h = readFileSync(f, 'utf8')
  const og = /<meta[^>]+property="og:image"[^>]+content="[^"]+"/.test(h)
  const tw = /<meta[^>]+name="twitter:image"[^>]+content="[^"]+"/.test(h)
  if (!og || !tw) bad.push(`${rel} og=${og ? 'Y' : 'N'} tw=${tw ? 'Y' : 'N'}`)
}
if (bad.length) {
  console.error(`[OG GATE] FAIL ${bad.length}/${files.length} — og:image/twitter:image 결락 (lib/og.ts withOgDefaults 로 감쌀 것)`)
  for (const b of bad) console.error('  ' + b)
  process.exit(1)
}
console.log(`[OG GATE] PASS ${files.length} html`)
