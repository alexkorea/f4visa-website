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
  title: "세금 이야기 — 재외동포·F-4 비자 세금 가이드",
  description: "재외동포와 F-4 비자 소지자의 부동산 취득세, 등기, 종합소득세 신고 등 세금 실무를 협력 세무사(박동국 세무사·택스가이드 세무사사무소)와 함께 정리한 가이드 모음입니다.",
  alternates: { canonical: `${SITE.url}/tax-stories` },
  openGraph: {
    title: "세금 이야기 — 재외동포·F-4 비자 세금 가이드 | 행정사사무소 이룸",
    description: "재외동포와 F-4 비자 소지자의 부동산 취득세, 등기, 종합소득세 신고 등 세금 실무를 협력 세무사(박동국 세무사·택스가이드 세무사사무소)와 함께 정리한 가이드 모음입니다.",
    url: `${SITE.url}/tax-stories`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "세금 이야기 — 재외동포·F-4 비자 세금 가이드 | 행정사사무소 이룸",
    description: "재외동포와 F-4 비자 소지자의 부동산 취득세, 등기, 종합소득세 신고 등 세금 실무를 협력 세무사(박동국 세무사·택스가이드 세무사사무소)와 함께 정리한 가이드 모음입니다.",
  },
}

export default async function TaxStoriesPage() {
  const TAX_SLUGS = new Set([
    "f4-visa-tax-obligations-comprehensive-income",
    "f4-real-estate-acquisition-tax-guide",
    "dongpo-property-purchase-tax-process-guide",
    "overseas-korean-housing-purchase-registration-tax-guide",
    "overseas-korean-korea-home-purchase-tax-steps",
    "overseas-korean-real-estate-purchase-procedure-tax-2026",
    "overseas-korean-property-acquisition-procedure-tax-guide",
    "overseas-korean-property-acquisition-process-tax-guide",
    "overseas-korean-real-estate-acquisition-tax-procedure",
  ])
  const posts = (await getAllPosts()).filter((p) => TAX_SLUGS.has(p.slug))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "세금 이야기", path: "/tax-stories" }]} />
        <PageHero
          title="세금 이야기"
          subtitle="재외동포·F-4 비자 소지자를 위한 세금(부동산 취득세·종합소득세 등) 실무 가이드를 확인하세요." ctaLabel="무료 상담 신청"
        />

        {/* Partner: 박동국 세무사 */}
        <section className="section">
          <div className="container-x">
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6">
              <img src="/partners/park-dongguk.jpg" alt="박동국 세무사" className="w-28 h-28 rounded-full object-cover border shrink-0" />
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs text-muted-foreground mb-2">협력 세무사</p>
                <h2 className="text-xl font-bold text-foreground">박동국 세무사 <span className="text-sm font-normal text-muted-foreground">| 택스가이드 세무사사무소</span></h2>
                <p className="text-sm text-muted-foreground mt-2">Korean Certified Tax Accountant · U.S. Enrolled Agent. 국내·해외 세무를 통합적으로 해결하는 글로벌 세무 전문성으로 외국인·외국법인·재외국민 세무를 직접 상담합니다.</p>
                <p className="text-sm text-foreground mt-4">전화 <a href="tel:0284633398" className="inline-flex min-h-[44px] items-center font-semibold text-primary">02-846-3398</a> · 카카오톡 <span className="font-semibold">dgtax21</span> · dgtax21@naver.com</p>
              </div>
              <img src="/partners/park-dongguk-card.jpg" alt="박동국 세무사 명함 - 택스가이드 세무사사무소" className="w-full max-w-xs rounded-xl border shrink-0" />
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section">
          <div className="container-x">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground">아직 세금 관련 게시글이 없습니다.</p>
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
