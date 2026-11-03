#!/usr/bin/env node
/**
 * 블로그 목록 색인 (F4-QA1102-FIX 2) — /blog?page=N 을 서버에서 그리려면 /blog 가 요청마다 렌더된다.
 * CF 워커에는 content/blog 폴더가 없어 lib/blog.ts 의 fs 읽기가 빈 목록이 된다(11-03 b9ec16fb 실측: 목록 0편·2쪽부터 404 → 롤백).
 * 그래서 빌드 전에 목록 카드에 필요한 값만 JSON 으로 뽑아 번들에 싣는다. 규칙은 lib/blog.ts getAllPosts 와 같다
 * (언어 변형·리다이렉트 출발지 제외, date 내림차순).
 * 사용: node scripts/blog-list-index.mjs [출력=lib/blog-list.generated.json]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import matter from 'gray-matter'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIR = path.join(REPO, 'content', 'blog')
const OUT = path.resolve(REPO, process.argv[2] || 'lib/blog-list.generated.json')
const { redirectSourceSlugs } = await import(pathToFileURL(path.join(REPO, 'lib', 'blog-redirects.mjs')).href)

const posts = fs.readdirSync(DIR)
  .filter((f) => f.endsWith('.md') && !f.includes('.en.') && !f.includes('.zh.') && !f.includes('.ja.'))
  .map((f) => {
    const { data } = matter(fs.readFileSync(path.join(DIR, f), 'utf8'))
    const slug = f.replace(/\.md$/, '')
    return { slug, title: data.title || slug, category: data.category || '', image: data.image || '/slides/documents.jpg',
      date: String(data.date || ''), excerpt: data.excerpt || data.description || '' }
  })
  .filter((p) => !redirectSourceSlugs.has(p.slug))
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
if (!posts.length) { console.error('✗ blog-list-index: 글 0편'); process.exit(1) }
fs.writeFileSync(OUT, JSON.stringify(posts) + '\n')
console.log(`✓ blog-list-index: ${posts.length}편 → ${path.relative(REPO, OUT)}`)
