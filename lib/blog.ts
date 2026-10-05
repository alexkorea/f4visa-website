import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import { redirectSourceSlugs } from './blog-redirects.mjs'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

/**
 * 옛/중복 slug 는 next.config.mjs 에서 canonical 로 301 되므로
 * sitemap·블로그 목록·정적 경로 생성에서 제외한다. (GSC "Page with redirect" 방지)
 */
function isCanonicalSlug(slug: string): boolean {
  return !redirectSourceSlugs.has(slug)
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
  partner: string
  content: string
}

async function markdownToHtml(markdown: string): Promise<string> {
  // 본문 맨 앞의 `# 제목` 은 레이아웃 히어로의 H1 과 같은 문장이다.
  // 그대로 두면 한 페이지에 H1 이 2개가 된다(실측 158/184) — BLOG_STANDARD 4장 위반.
  const stripped = markdown.replace(/^\uFEFF?\s*#(?!#)\s+.*(?:\r?\n)+/, '')
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(stripped)
  return pexelsSrcset(result.toString()
    // 본문 중간에 남은 H1 은 H2 로 낮춘다(H1 은 문서당 1개).
    .replace(/<h1(\s[^>]*)?>/g, '<h2$1>')
    .replace(/<\/h1>/g, '</h2>'))
}

// 본문의 Pexels 핫링크 사진은 원고마다 `w=940`(일부 w=800) 한 장뿐이라 1440 화면(본문 780px, DPR2 → 필요 1404px)에서 흐렸다
// (2026-10-06 SHARP-FIX). 원고는 그대로 두고 렌더 단계에서 같은 사진의 폭별 URL 을 srcset 으로 붙인다.
// Pexels CDN 은 원본보다 큰 w 를 요청해도 원본 크기로 멈추므로 업스케일은 생기지 않는다. 1880 = Pexels large2x.
// sizes 는 본문 폭 실측: 1024 미만 100vw-32px, 이상 min(780px, 100vw-416px). 본문 사진은 첫 화면 밖이라 lazy.
const PEXELS_WIDTHS = [640, 940, 1280, 1880]
const PEXELS_SIZES = '(min-width: 1024px) min(780px, calc(100vw - 416px)), calc(100vw - 32px)'
const PEXELS_SIZES_HALF = '(min-width: 1024px) min(390px, calc(50vw - 208px)), calc(50vw - 16px)'
function pexelsSrcset(html: string): string {
  return html.replace(
    /<img src="(https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.(?:jpe?g|png))\?[^"]*"([^>]*)>/g,
    (_m, base: string, rest: string) => {
      const u = (w: number) => `${base}?auto=compress&amp;cs=tinysrgb&amp;w=${w}`
      const srcset = PEXELS_WIDTHS.map((w) => `${u(w)} ${w}w`).join(', ')
      // 원고 raw HTML 중 style="width:50%" 로 두 장을 나란히 놓은 사진은 본문 폭의 절반이다.
      const sizes = /width:\s*50%/.test(rest) ? PEXELS_SIZES_HALF : PEXELS_SIZES
      return `<img loading="lazy" decoding="async" src="${u(940)}" srcset="${srcset}" sizes="${sizes}"${rest}>`
    },
  )
}

function readPost(filePath: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    const slug = path.basename(filePath).replace(/\.md$/, '')
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      category: data.category || '',
      excerpt: data.excerpt || data.description || '',
      image: data.image || '/slides/documents.jpg',
      partner: data.partner || '',
      content,
    }
  } catch {
    return null
  }
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    return fs.readdirSync(CONTENT_DIR)
      .filter(f => f.endsWith('.md') && !f.includes('.en.') && !f.includes('.zh.') && !f.includes('.ja.'))
      .map(f => f.replace(/\.md$/, ''))
      .filter(isCanonicalSlug)
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  const post = readPost(filePath)
  if (!post) return null
  post.content = await markdownToHtml(post.content)
  return post
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const files = fs.readdirSync(CONTENT_DIR)
      .filter(f => f.endsWith('.md') && !f.includes('.en.') && !f.includes('.zh.') && !f.includes('.ja.'))
    const posts = files
      .map(f => readPost(path.join(CONTENT_DIR, f)))
      .filter((p): p is BlogPost => p !== null)
      .filter(p => isCanonicalSlug(p.slug))
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    return posts
  } catch {
    return []
  }
}
