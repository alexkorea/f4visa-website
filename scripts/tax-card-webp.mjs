#!/usr/bin/env node
// EYE-FIX-1116: /tax-stories 카드 썸네일은 1200×630 PNG(장당 150~280KB)를 361px 칸에 그대로 받았다.
// TAX_SLUGS(app/tax-stories/page.tsx) 글의 og PNG 에서 같은 그림의 WebP 480·800·1200w 를 만든다(그림 내용 불변, 크기만).
// PNG 가 WebP 보다 새로우면(썸네일 재생성) 다시 만든다. 만들지 못하면 rc=1 → prebuild 중단.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const page = fs.readFileSync(path.join(ROOT, 'app/tax-stories/page.tsx'), 'utf8')
const m = page.match(/TAX_SLUGS = new Set\(\[([\s\S]*?)\]\)/)
if (!m) { console.error('[tax-card-webp] TAX_SLUGS 를 못 찾음'); process.exit(1) }
const slugs = [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1])
const WIDTHS = [480, 800, 1200]
let made = 0, ok = 0
for (const slug of slugs) {
  const md = path.join(ROOT, 'content/blog', `${slug}.md`)
  if (!fs.existsSync(md)) { console.error(`[tax-card-webp] 원고 없음 ${slug}`); process.exit(1) }
  const img = (fs.readFileSync(md, 'utf8').match(/^image:\s*["']?([^"'\n]+)["']?/m) || [])[1]
  if (!img || !/^\/og\/.+\.png$/.test(img)) { console.error(`[tax-card-webp] ${slug} image 가 /og/*.png 아님: ${img}`); process.exit(1) }
  const src = path.join(ROOT, 'public', img)
  if (!fs.existsSync(src)) { console.error(`[tax-card-webp] PNG 없음 ${img}`); process.exit(1) }
  const st = fs.statSync(src).mtimeMs
  for (const w of WIDTHS) {
    const out = src.replace(/\.png$/, `-${w}w.webp`)
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= st) { ok++; continue }
    await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out)
    made++
  }
}
console.log(`[tax-card-webp] ${slugs.length}글 × ${WIDTHS.length} — 새로 ${made}, 유지 ${ok}`)
