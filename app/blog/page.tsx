import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { getAllPosts } from "@/lib/blog"
import { Calendar, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "블로그 - 비전행정사사무소 | F-4 비자 전문",
  description: "F-4 비자, 거소증, 국적상실, 국적회복 등 재외동포 행정 업무에 대한 최신 정보와 실무 가이드를 제공합니다.",
  alternates: { canonical: "https://f4visa.net/blog" },
  openGraph: {
    title: "블로그 - 비전행정사사무소",
    description: "재외동포 행정 업무에 대한 최신 정보와 실무 가이드.",
    url: "https://f4visa.net/blog",
    siteName: "비전행정사사무소",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "블로그 - 비전행정사사무소",
    description: "재외동포 행정 업무에 대한 최신 정보와 실무 가이드.",
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageBreadcrumb items={[{ label: "블로그", path: "/blog" }]} />
        {/* Hero */}
        <section className="relative min-h-[300px] flex items-center py-16">
          <div className="absolute inset-0">
            <img src="/slides/cityscape.jpg" alt="블로그" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">블로그</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              재외동포 행정 업무에 대한 최신 정보와 유용한 가이드를 확인하세요.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="bg-background py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground">아직 게시글이 없습니다.</p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          <Tag className="h-3 w-3" />
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
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
