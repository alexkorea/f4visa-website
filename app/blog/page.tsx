import { SITE } from "@/lib/site"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { getAllPosts } from "@/lib/blog"
import { BlogPagedList, type BlogListItem } from "@/components/blog-paged-list"

export const revalidate = 60

export const metadata: Metadata = {
  title: "블로그 — F-4 비자·거소증·국적 실무 가이드",
  description: "F-4 재외동포 비자 신청 자격과 서류, 거소증 발급과 갱신, 국적상실·국적회복, F-5 영주권 전환까지 재외동포 행정 실무를 사례 중심으로 정리한 가이드 모음입니다.",
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: "블로그 — F-4 비자·거소증·국적 실무 가이드 | 행정사사무소 이룸",
    description: "F-4 재외동포 비자 신청 자격과 서류, 거소증 발급과 갱신, 국적상실·국적회복, F-5 영주권 전환까지 재외동포 행정 실무를 사례 중심으로 정리한 가이드 모음입니다.",
    url: `${SITE.url}/blog`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "블로그 — F-4 비자·거소증·국적 실무 가이드 | 행정사사무소 이룸",
    description: "F-4 재외동포 비자 신청 자격과 서류, 거소증 발급과 갱신, 국적상실·국적회복, F-5 영주권 전환까지 재외동포 행정 실무를 사례 중심으로 정리한 가이드 모음입니다.",
  },
}

export default async function BlogPage() {
  const all = await getAllPosts()
  const posts: BlogListItem[] = all.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category ?? "",
    image: p.image ?? "/slides/documents.jpg",
    date: p.date ?? "",
    excerpt: p.excerpt ?? "",
  }))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "블로그", path: "/blog" }]} />
        <PageHero
          title="블로그"
          subtitle="재외동포 행정 업무에 대한 최신 정보와 유용한 가이드를 확인하세요." ctaLabel="무료 상담 신청"
        />

        <section className="section">
          <div className="container-x">
            <BlogPagedList posts={posts} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
