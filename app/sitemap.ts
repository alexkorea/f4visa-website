import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"

export const revalidate = 60

// lastmod 는 실제 날짜만 쓴다(SITEMAP-LASTMOD-3, 2026-10-17). new Date() 는 빌드·요청 시각이라 매번 바뀐다.
// 글 = frontmatter date, /blog 목록 = 최신 글 date, 고정 페이지 = 생략.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.f4visa.net"
  const posts = await getAllPosts()
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : undefined

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/f4-visa-resident-card`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/f4-visa-renewal`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/f4-visa-types`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/nationality-loss-report`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/nationality-renunciation-report`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/nationality-selection-dual-nationality`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/nationality-recovery`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/permanent-residency`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tax-stories`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/blog`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
  ]

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPosts]
}
