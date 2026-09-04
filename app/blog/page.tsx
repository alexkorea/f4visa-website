import { SITE } from "@/lib/site"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { getAllPosts } from "@/lib/blog"
import { Calendar, Tag } from "lucide-react"

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
  const posts = await getAllPosts()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "블로그", path: "/blog" }]} />
        <PageHero
          title="블로그"
          subtitle="재외동포 행정 업무에 대한 최신 정보와 유용한 가이드를 확인하세요." ctaLabel="무료 상담 신청"
        />

        {/* Blog Grid */}
        <section className="section">
          <div className="container-x">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground">아직 게시글이 없습니다.</p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          <Tag className="h-3 w-3" />
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                      </div>
                      <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
