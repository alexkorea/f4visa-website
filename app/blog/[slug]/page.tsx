import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { ArticleJsonLd } from "@/components/structured-data"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { SITE } from "@/lib/site"
import { Calendar, Tag, ArrowLeft } from "lucide-react"
import { InlineCTAForm } from "@/components/inline-cta-form"

export const revalidate = 3600
export const dynamicParams = false

export async function generateStaticParams() {
  const { getPostSlugs } = await import("@/lib/blog")
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: "Not Found" }
  const BASE_URL = SITE.url
  const metaIsTaxGuide = post.partner === "taxguide"
  const brand = metaIsTaxGuide ? "택스가이드 세무사사무소" : "행정사사무소 이룸"
  return {
    title: metaIsTaxGuide ? { absolute: `${post.title} | ${brand}` } : post.title,
    description: post.excerpt,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      title: `${post.title} | ${brand}`,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      siteName: brand,
      type: "article",
      images: [{ url: post.image.startsWith("http") ? post.image : `${BASE_URL}${post.image}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${brand}`,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  const isTaxGuide = post.partner === "taxguide"

  const allPosts = await getAllPosts()
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`${SITE.url}/blog/${slug}`}
        image={post.image.startsWith("http") ? post.image : `${SITE.url}${post.image}`}
        datePublished={post.date}
        partner={isTaxGuide}
      />
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "블로그", path: "/blog" }, { label: post.title, path: `/blog/${slug}` }]} />
        <section style={{ background: "var(--c-brand)", color: "var(--c-ink-invert)" }}>
          <div className="container-x py-16">
            <div className="measure">
              <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "rgba(246,247,245,0.8)" }}>
                <span className="inline-flex items-center gap-2">
                  <Tag className="h-4 w-4" aria-hidden />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" aria-hidden />
                  <time dateTime={post.date}>{post.date}</time>
                </span>
              </div>
              <h1 className="mt-4 text-3xl lg:text-4xl">{post.title}</h1>
              <p className="mt-4 text-base" style={{ color: "rgba(246,247,245,0.75)" }}>
                {isTaxGuide ? "협력 세무사 박동국 (택스가이드 세무사사무소)" : `${SITE.name} · 최종 업데이트 ${post.date}`}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section">
          <div className="container-x">
            <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
              {/* Main content */}
              <div>
                <Link href="/blog" className="btn-text mb-8 inline-flex min-h-[44px] items-center gap-2">
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  블로그 목록으로
                </Link>
                <article
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                {isTaxGuide ? (
                  <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center gap-6">
                      <img src="/partners/park-dongguk.jpg" alt="박동국 세무사" className="w-20 h-20 rounded-full object-cover border shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">협력 세무사</p>
                        <p className="font-bold text-foreground">박동국 세무사 <span className="font-normal text-sm text-muted-foreground">| 택스가이드 세무사사무소</span></p>
                        <p className="text-sm text-muted-foreground mt-2">국내·해외 세무를 통합적으로 해결하는 글로벌 세무 전문성. 외국인·외국법인·재외국민 세무 컨설팅.</p>
                      </div>
                    </div>
                    <img src="/partners/park-dongguk-card.jpg" alt="박동국 세무사 명함 - 택스가이드 세무사사무소" className="mt-6 w-full max-w-md rounded-xl border" />
                  </div>
                ) : (
                  <InlineCTAForm />
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-20 lg:self-start space-y-6">
                {/* QR Codes / Partner Contact */}
                {isTaxGuide ? (
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="mb-4 font-semibold text-foreground text-center text-sm">세무 상담</h3>
                    <div className="flex flex-col items-center text-center">
                      <img src="/partners/park-dongguk.jpg" alt="박동국 세무사" className="w-24 h-24 rounded-full object-cover border mb-2" />
                      <p className="font-semibold text-sm text-foreground">박동국 세무사</p>
                      <p className="text-xs text-muted-foreground mb-2">택스가이드 세무사사무소</p>
                      <div className="text-sm text-foreground space-y-2">
                        <p>전화 <a href="tel:0284633398" className="font-semibold text-primary">02-846-3398</a></p>
                        <p>카카오톡 <span className="font-semibold">dgtax21</span></p>
                        <p className="text-xs break-all text-muted-foreground">taxguide21@wehago.com</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="mb-4 font-semibold text-foreground text-center text-sm">메신저 상담</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Kakao Talk", qr: "/qr/kakao.jpg" },
                        { name: "WeChat", qr: "/qr/wechat.jpg" },
                        { name: "LINE", qr: "/qr/line.jpg" },
                        { name: "WhatsApp", qr: "/qr/whatsapp.jpg" },
                      ].map((m) => (
                        <div key={m.name} className="text-center">
                          <div className="w-full aspect-square rounded-lg overflow-hidden border border-border mb-2">
                            <img src={m.qr} alt={m.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs text-muted-foreground">{m.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="mb-4 font-semibold text-foreground">관련 글</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((rp) => (
                        <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {rp.title}
                          </h4>
                          <p className="mt-2 text-xs text-muted-foreground">{rp.date}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Card */}
                {isTaxGuide ? (
                  <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                    <h3 className="font-semibold mb-2">세무 상담이 필요하신가요?</h3>
                    <p className="text-sm text-primary-foreground/80 mb-4">
                      협력 세무사 박동국(택스가이드 세무사사무소)이 외국인·재외국민 세무를 직접 상담합니다.
                    </p>
                    <a
                      href="tel:0284633398"
                      className="btn btn-primary btn-block mt-4"
                    >
                      전화 상담 02-846-3398
                    </a>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                    <h3 className="font-semibold mb-2">전문 상담이 필요하신가요?</h3>
                    <p className="text-sm text-primary-foreground/80 mb-4">
                      행정사사무소 이룸의 전문가가 맞춤 상담을 제공합니다.
                    </p>
                    <Link
                      href="/contact"
                      className="btn btn-primary btn-block mt-4"
                    >
                      무료 상담 신청
                    </Link>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
