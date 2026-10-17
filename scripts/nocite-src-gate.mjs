#!/usr/bin/env node
// NOCITE-ALL-4(2026-10-17, 보스 msg 3373·3377 영구): 블로그 원고(content/blog/*.md)를 lib/blog.ts 와 같은 remark 파이프라인으로
// HTML 화한 뒤 scripts/nocite-gate.mjs(패턴 단일 원천, 수정 금지)로 검사한다. 1건이라도 있으면 rc=1 → prebuild 실패.
// 산출물 검사는 package.json build 의 `node scripts/nocite-gate.mjs .next/server/app` 가 따로 한다.
// 오탐 면제: scripts/nocite-allow.txt (한 줄 = 면제 문구, 최소한으로)
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { scanHtml } from './nocite-gate.mjs'

const root = process.cwd()
const dir = path.join(root, 'content', 'blog')
const allowFile = path.join(root, 'scripts', 'nocite-allow.txt')
const allow = fs.existsSync(allowFile) ? fs.readFileSync(allowFile, 'utf8').split('\n').map((s) => s.trim()).filter(Boolean) : []
let hits = 0, files = 0
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
  const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'))
  const html = String(await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content))
  const h = scanHtml(`<h1>${data.title || ''}</h1><p>${data.excerpt || ''}</p><p>${data.description || ''}</p>${html}`)
    .filter((x) => !allow.some((a) => x.ctx.includes(a)))
  files++
  if (h.length) { hits += h.length; for (const x of h.slice(0, 3)) console.error(`  ✗ [${x.rule}] content/blog/${f}\n      …${x.ctx}…`) }
}
console.log(`[nocite-src-gate] files=${files} hits=${hits}`)
if (hits) { console.error('[nocite-src-gate] FAIL — 근거·확인일·국가법령정보센터 류 표시는 원고에서 빼야 한다(보스 msg 3373·3377).'); process.exit(1) }
