import { getAllPosts } from '@/lib/blog'
import { SITE } from '@/lib/site'
import { buildRss, RSS_HEADERS } from '@/lib/rss'
import { RSS_FEED } from '@/lib/rss-meta'

// NAVER-RSS(10-23): 블로그 RSS 2.0 — 원천 content/blog/*.md(getAllPosts, 사이트맵과 같은 301 제외). 빌드 때 정적 생성.
export const dynamic = 'force-static'

export async function GET() {
  const posts = await getAllPosts()
  const xml = buildRss(
    { title: RSS_FEED.title, link: `${SITE.url}/blog`, description: RSS_FEED.desc, language: 'ko', self: `${SITE.url}${RSS_FEED.path}` },
    posts.map((p) => ({ title: p.title, link: `${SITE.url}/blog/${p.slug}`, description: p.excerpt, date: p.date }))
  )
  return new Response(xml, { headers: RSS_HEADERS })
}
