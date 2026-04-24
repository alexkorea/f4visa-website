import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { ArticleJsonLd } from "@/components/structured-data"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { Calendar, Tag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Not Found" }
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
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = await getAllPosts()
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`https://f4visa.net/blog/${slug}`}
        image={post.image.startsWith("http") ? post.image : `https://f4visa.net${post.image}`}
        datePublished={post.date}
      />
      <Header />
      <main className="flex-1">
        <PageBreadcrumb items={[{ label: "블로그", path: "/blog" }, { label: post.title, path: `/blog/${slug}` }]} />
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
                  style={{ fontSize: '16px', lineHeight: '1.85' }}
                  className="prose prose-gray max-w-none
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-h2:text-xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:border-b-2 prose-h2:border-blue-500 prose-h2:pb-3 prose-h2:text-blue-900
                    prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-blue-800
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
                    prose-li:text-gray-700 prose-li:leading-relaxed prose-li:mb-1
                    prose-strong:text-gray-900
                    prose-a:text-blue-600 prose-a:underline prose-a:underline-offset-2 prose-a:font-semibold
                    prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-800 prose-blockquote:my-6 prose-blockquote:text-sm prose-blockquote:font-medium
                    prose-table:border prose-table:border-border prose-table:rounded-xl prose-table:overflow-hidden prose-table:my-6
                    prose-th:bg-blue-50 prose-th:px-3 prose-th:py-2.5 prose-th:text-left prose-th:text-blue-900 prose-th:font-semibold prose-th:text-sm
                    prose-td:px-3 prose-td:py-2.5 prose-td:border-t prose-td:border-border prose-td:text-sm
                    prose-img:rounded-lg prose-img:shadow-md prose-img:my-6 prose-img:max-h-[300px] prose-img:object-cover prose-img:w-full
                    prose-ol:my-4 prose-ul:my-4
                    [&>nav]:bg-blue-50 [&>nav]:rounded-xl [&>nav]:p-5 [&>nav]:mb-8 [&>nav]:border [&>nav]:border-blue-200
                    [&>nav_a]:text-blue-600 [&>nav_a]:font-medium [&>nav_a]:no-underline
                    [&>nav_ul]:list-none [&>nav_ul]:pl-0"
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
