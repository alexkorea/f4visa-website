import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"
import { PAGE_LASTMOD } from "@/lib/page-lastmod.generated"

export const revalidate = 60

// lastmod 는 실제 날짜만 쓴다(SITEMAP-LASTMOD-3, 2026-10-17). new Date() 는 빌드·요청 시각이라 매번 바뀐다.
// 글 = 원고 마지막 커밋일(frontmatter date 이상), /blog 목록 = 최신 글 date,
// 고정 페이지 = (NAVER-SEO-FIX-1031) 쪽 파일·데이터 파일 마지막 커밋일(prebuild page-lastmod.mjs).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.f4visa.net"
  const posts = await getAllPosts()
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : undefined

  const lm = (p: string) => (PAGE_LASTMOD[p] ? new Date(PAGE_LASTMOD[p]) : undefined)
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: lm(""), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: lm("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/f4-visa-resident-card`, lastModified: lm("/f4-visa-resident-card"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/f4-visa-renewal`, lastModified: lm("/f4-visa-renewal"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/f4-visa-types`, lastModified: lm("/f4-visa-types"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/nationality-loss-report`, lastModified: lm("/nationality-loss-report"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/nationality-renunciation-report`, lastModified: lm("/nationality-renunciation-report"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/nationality-selection-dual-nationality`, lastModified: lm("/nationality-selection-dual-nationality"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/nationality-recovery`, lastModified: lm("/nationality-recovery"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/permanent-residency`, lastModified: lm("/permanent-residency"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/h2-visa`, lastModified: lm("/h2-visa"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: lm("/services"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tax-stories`, lastModified: lm("/tax-stories"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: lm("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: lm("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/blog`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: lm("/contact"), changeFrequency: "monthly", priority: 0.8 },
  ]

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPosts]
}
