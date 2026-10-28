#!/usr/bin/env node
// NOFREE 게이트 (WQA1028-FIX-2, 맥7 2026-10-28 승인 — vk·f6 와 같은 원칙) — "무료" 표현 영구 금지. 화면·meta·og·JSON-LD·RSC 어디에도 남지 않게 막는다.
//   node scripts/nofree-gate.mjs            원고: content/blog/*.md · app/ · components/ · lib/ · public/llms.txt (prebuild)
//   node scripts/nofree-gate.mjs <dir>...   빌드 산출물: .html · .rsc · .meta · .body · .json · .xml · .txt 전부(예: .next/server/app)
// 원고 은행(scripts/f4visa-daily/bank) 은 발행 엔진 run.mjs 가 같은 NOFREE_RE 로 막는다(import).
// 패턴은 f6visa scripts/nofree-gate.mjs 와 같다. 상담 CTA 는 "상담 신청", 비용 문의는 "케이스 검토 후 절차와 비용을 안내드리며…" 꼴로 쓴다.
// 제3자 사실(공공 강좌·수수료 없음 등)은 '무료' 대신 "수강료 없이"·"수수료가 없습니다" 처럼 사실 그대로 쓴다.
// lib/blog-posts-data.ts 는 참조 0인 옛 생성물이라 원고 검사에서 뺀다(누가 import 하면 빌드 산출물 검사가 잡는다).
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';

export const NOFREE_RE = /무료|무상\s*(?:상담|검토)|(?<![A-Za-z])free(?:ly)?(?![A-Za-z])|miễn phí|không mất phí|ฟรี|ไม่มีค่าใช้จ่าย(?!แอบแฝง)|бесплатн|免费|免費|無料/giu;

export function scanText(text) {
  const out = [];
  for (const m of text.matchAll(NOFREE_RE)) out.push({ word: m[0], ctx: text.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30).replace(/\s+/g, ' ') });
  return out;
}

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['lib/blog-posts-data.ts']);
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const hits = [];
  const add = (where, text) => { for (const h of scanText(text)) hits.push({ where, ...h }); };
  const walk = (d, re, cb) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p, re, cb); else if (re.test(e.name)) cb(p); } };
  const dirs = process.argv.slice(2);
  if (dirs.length) {
    for (const d of dirs) walk(path.resolve(d), /\.(html|rsc|meta|body|json|xml|txt)$/, (p) => add(path.relative(ROOT, p), fs.readFileSync(p, 'utf8')));
  } else {
    const files = ['public/llms.txt'];
    for (const f of fs.readdirSync(path.join(ROOT, 'content', 'blog'))) if (f.endsWith('.md')) files.push(`content/blog/${f}`);
    for (const d of ['app', 'components', 'lib']) walk(path.join(ROOT, d), /\.(tsx?|mjs|js|json|md)$/, (p) => files.push(path.relative(ROOT, p)));
    for (const f of files) if (!SKIP.has(f) && fs.existsSync(path.join(ROOT, f))) add(f, fs.readFileSync(path.join(ROOT, f), 'utf8'));
  }
  for (const h of hits.slice(0, 40)) console.log(`  ✗ [NOFREE "${h.word}"] ${h.where}\n      …${h.ctx}…`);
  console.log(`[nofree] ${dirs.length ? 'build ' + dirs.join(',') : 'source'} hits=${hits.length}`);
  process.exit(hits.length ? 1 : 0);
}
