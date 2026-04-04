import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog"
import { Calendar, Tag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = getPostBySlug(params.slug)
    return {
      title: `${post.title} | 재외동포 행정서비스`,
      description: post.excerpt,
    }
  } catch {
    return { title: "게시글을 찾을 수 없습니다" }
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  let post
  try {
    post = getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 lg:py-28">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover opacity-15"
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <div className="mb-4 flex items-center justify-center gap-4 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                {post.category}
              </span>
            </div>
            <h1 className="mx-auto max-w-4xl text-3xl font-bold text-primary-foreground md:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
              {/* Main content */}
              <div>
                <Button variant="ghost" size="sm" asChild className="mb-8">
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    블로그 목록으로
                  </Link>
                </Button>
                <article
                  className="prose prose-gray max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* QR Codes */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    빠른 상담
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-32 w-32 items-center justify-center rounded-xl bg-muted">
                        <span className="text-xs text-muted-foreground">
                          카카오톡 QR
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        카카오톡 상담
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-32 w-32 items-center justify-center rounded-xl bg-muted">
                        <span className="text-xs text-muted-foreground">
                          위챗 QR
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">위챗 상담</p>
                    </div>
                  </div>
                  <Button className="mt-4 w-full" asChild>
                    <Link href="/contact">상담 문의하기</Link>
                  </Button>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-2xl border border-border/50 bg-card p-6">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      관련 글
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((rp) => (
                        <Link
                          key={rp.slug}
                          href={`/blog/${rp.slug}`}
                          className="group block"
                        >
                          <div className="relative mb-2 aspect-[16/10] overflow-hidden rounded-lg">
                            <Image
                              src={rp.image}
                              alt={rp.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {rp.title}
                          </h4>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {rp.date}
                          </p>
                        </Link>
                      ))}
                    </div>
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
