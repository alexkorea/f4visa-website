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
import { withOgDefaults } from "@/lib/og"

export const revalidate = 60

export const metadata: Metadata = withOgDefaults({
  title: "세금 이야기 — 재외동포·F-4 비자 세금 가이드",
  description: "재외동포와 F-4 비자 소지자의 부동산 취득세, 등기, 종합소득세 신고 등 세금 실무를 협력 세무사(박동국 세무사·택스가이드 세무회계사무소)와 함께 정리한 가이드 모음입니다.",
  alternates: { canonical: `${SITE.url}/tax-stories` },
  openGraph: {
    title: "세금 이야기 — 재외동포·F-4 비자 세금 가이드 | 행정사사무소 이룸",
    description: "재외동포와 F-4 비자 소지자의 부동산 취득세, 등기, 종합소득세 신고 등 세금 실무를 협력 세무사(박동국 세무사·택스가이드 세무회계사무소)와 함께 정리한 가이드 모음입니다.",
    url: `${SITE.url}/tax-stories`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "세금 이야기 — 재외동포·F-4 비자 세금 가이드 | 행정사사무소 이룸",
    description: "재외동포와 F-4 비자 소지자의 부동산 취득세, 등기, 종합소득세 신고 등 세금 실무를 협력 세무사(박동국 세무사·택스가이드 세무회계사무소)와 함께 정리한 가이드 모음입니다.",
  },
})

const TAX_FAQ5 = [
  {
    q: "F-4 비자가 있으면 한국에 종합소득세를 내야 하나요?",
    a: "비자 종류가 아니라 세법상 거주자인지가 기준입니다. 한국 체류 일수와 생활 근거지로 판단하며, 거주자면 국내외 소득을 합산하고 비거주자면 국내에서 생긴 소득만 신고합니다. 신고는 매년 5월입니다.",
    slug: "f4-visa-tax-obligations-comprehensive-income",
    link: "종합소득세 신고 의무 보기",
  },
  {
    q: "한국에서 집을 사면 취득세는 언제, 어디에 내나요?",
    a: "잔금일 등 취득일부터 60일 안에 부동산이 있는 지방자치단체에 신고·납부합니다. 세율은 주택 수·지역·취득 가격에 따라 달라지고, 기한을 넘기면 가산세가 붙습니다.",
    slug: "dongpo-property-purchase-tax-process-guide",
    link: "취득세 계산 구조 보기",
  },
  {
    q: "해외에 있는 매수 자금은 어떻게 들여와야 하나요?",
    a: "외국환은행을 통해 송금하고 부동산 취득 신고를 해 두는 것이 기본입니다. 이 기록이 나중에 매각 대금을 해외로 가져갈 때 근거가 되며, 현금 휴대 반입이나 가족 간 이체는 자금 출처 소명에서 자주 막힙니다.",
    slug: "overseas-korean-korea-home-purchase-tax-steps",
    link: "자금출처·해외송금 신고 보기",
  },
  {
    q: "집을 갖고만 있어도 세금이 나오나요?",
    a: "매년 6월 1일 기준 소유자에게 재산세가 부과되고, 공시가격 합계가 일정 기준을 넘으면 종합부동산세가 더해집니다. 한국에 주소가 없다면 납세관리인 지정도 챙겨야 합니다.",
    slug: "overseas-korean-property-acquisition-process-tax-guide",
    link: "보유세 안내 보기",
  },
  {
    q: "한국 집을 팔 때 양도소득세는 어떻게 달라지나요?",
    a: "파는 시점에 세법상 거주자인지에 따라 세율과 비과세 적용이 달라집니다. 비거주자로 분류되면 1세대 1주택 비과세를 받지 못하며, 거소증이 있다고 자동으로 거주자가 되지는 않습니다.",
    slug: "overseas-korean-real-estate-acquisition-tax-procedure",
    link: "양도소득세 신고 보기",
  },
]

export default async function TaxStoriesPage() {
  const TAX_SLUGS = new Set([
    "f4-visa-tax-obligations-comprehensive-income",
    "f4-real-estate-acquisition-tax-guide",
    "dongpo-property-purchase-tax-process-guide",
    "overseas-korean-housing-purchase-registration-tax-guide",
    "overseas-korean-korea-home-purchase-tax-steps",
    "overseas-korean-real-estate-purchase-procedure-tax",
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
          subtitle="재외동포·F-4 비자 소지자를 위한 세금(부동산 취득세·종합소득세 등) 실무 가이드를 확인하세요." ctaLabel="상담 신청"
        />

        {/* EYE1111-2: 목록 위 고유 요약 — 자주 묻는 세금 5가지(금액 없이, 기존 글로 연결) */}
        <section className="section pb-0" aria-labelledby="tax-faq5">
          <div className="container-x">
            <h2 id="tax-faq5" className="text-2xl font-bold text-foreground">재외동포가 자주 묻는 세금 5가지</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              한국에 집을 사거나 소득이 생긴 재외동포·F-4 소지자가 상담에서 가장 많이 묻는 질문입니다. 자세한 내용은 각 글에서 확인하세요.
            </p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {TAX_FAQ5.map((q, i) => (
                <li key={q.slug} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-base font-semibold text-foreground">
                    <span className="mr-1 text-primary">{i + 1}.</span>
                    {q.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{q.a}</p>
                  <Link
                    href={`/blog/${q.slug}`}
                    className="mt-2 inline-flex min-h-[44px] items-center text-sm font-semibold text-primary hover:underline"
                  >
                    {q.link} →
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Partner: 박동국 세무사 */}
        <section className="section">
          <div className="container-x">
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6">
              <img src="/partners/park-dongguk.jpg" alt="박동국 세무사" className="w-28 h-28 rounded-full object-cover border shrink-0" />
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs text-muted-foreground mb-2">협력 세무사</p>
                <h2 className="text-xl font-bold text-foreground">박동국 세무사 <span className="text-sm font-normal text-muted-foreground">| 택스가이드 세무회계사무소</span></h2>
                <p className="text-sm text-muted-foreground mt-2">한국 세무사로서 외국인·외국법인·재외국민 세무를 직접 상담합니다.</p>
                <p className="text-sm text-foreground mt-4">전화 <a href="tel:0284633398" className="inline-flex min-h-[44px] items-center font-semibold text-primary">02-846-3398</a> · 카카오톡 <span className="font-semibold">dgtax21</span> · dgtax21@naver.com</p>
              </div>
              <img src="/partners/park-dongguk-card.jpg" alt="박동국 세무사 명함 - 택스가이드 세무회계사무소" className="w-full max-w-xs rounded-xl border shrink-0" />
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
                    <div className="relative aspect-[1200/630] overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {post.date}
                        {/* BEYE-1007-FIX #12: 분류 칩은 썸네일 위(제목 글자를 덮었다)가 아니라 카드 글 영역에 */}
                        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                          <Tag className="h-3 w-3" />
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
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
