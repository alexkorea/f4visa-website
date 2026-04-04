import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog"
import { Calendar, Tag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const BASE_URL = "https://f4visa.net"
  return {
    title: `${post.title} - 비전행정사사무소`,
    description: post.excerpt,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      title: `${post.title} - 비전행정사사무소`,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      siteName: "비전행정사사무소",
      type: "article",
      images: [{ url: post.image.startsWith("http") ? post.image : `${BASE_URL}${post.image}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - 비전행정사사무소`,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[320px] flex items-end py-10">
          <div className="absolute inset-0">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 w-full lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-white/70">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white md:text-4xl leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-background py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
              {/* Main content */}
              <div>
                <Button variant="ghost" size="sm" asChild className="mb-8">
                  <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    블로그 목록으로
                  </Link>
                </Button>
                <article
                  style={{ fontSize: '17px', lineHeight: '1.9' }}
                  className="prose prose-lg prose-gray max-w-none
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b-2 prose-h2:border-blue-500 prose-h2:pb-3 prose-h2:text-blue-900
                    prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-blue-800
                    prose-p:text-gray-700 prose-p:leading-loose prose-p:mb-6
                    prose-li:text-gray-700 prose-li:leading-loose prose-li:mb-2
                    prose-strong:text-gray-900
                    prose-a:text-blue-600 prose-a:underline prose-a:underline-offset-2 prose-a:font-semibold hover:prose-a:text-blue-800
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-700 prose-blockquote:my-8
                    prose-table:border prose-table:border-border prose-table:rounded-xl prose-table:overflow-hidden prose-table:my-8
                    prose-th:bg-blue-50 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:text-blue-900 prose-th:font-semibold prose-th:text-sm
                    prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-border prose-td:text-sm
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                    prose-ol:my-6 prose-ul:my-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-20 lg:self-start space-y-6">
                {/* QR Codes */}
                <div className="rounded-2xl border border-border/50 bg-card p-5">
                  <h3 className="mb-3 font-semibold text-foreground text-center text-sm">메신저 상담</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Kakao Talk", qr: "/qr/kakao.jpg" },
                      { name: "WeChat", qr: "/qr/wechat.jpg" },
                      { name: "LINE", qr: "/qr/line.jpg" },
                      { name: "WhatsApp", qr: "/qr/whatsapp.jpg" },
                    ].map((m) => (
                      <div key={m.name} className="text-center">
                        <div className="w-full aspect-square rounded-lg overflow-hidden border border-border mb-1">
                          <img src={m.qr} alt={m.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs text-muted-foreground">{m.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-2xl border border-border/50 bg-card p-5">
                    <h3 className="mb-4 font-semibold text-foreground">관련 글</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((rp) => (
                        <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {rp.title}
                          </h4>
                          <p className="mt-1 text-xs text-muted-foreground">{rp.date}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Card */}
                <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                  <h3 className="font-semibold mb-2">전문 상담이 필요하신가요?</h3>
                  <p className="text-sm text-primary-foreground/80 mb-4">
                    비전행정사사무소의 전문가가 맞춤 상담을 제공합니다.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full bg-white text-primary font-medium text-sm h-10 rounded-lg hover:bg-white/90 transition-colors"
                  >
                    무료 상담 신청
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
