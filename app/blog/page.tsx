import { SITE } from "@/lib/site"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
// 워커에는 content/blog 가 없다 — 목록은 prebuild 의 scripts/blog-list-index.mjs 가 만든 색인에서 읽는다.
import blogList from "@/lib/blog-list.generated.json"
import { BlogPagedList, PAGE_SIZE, blogPageHref, type BlogListItem } from "@/components/blog-paged-list"
import { notFound } from "next/navigation"
import { withOgDefaults } from "@/lib/og"

export const revalidate = 60

const ALL = blogList as BlogListItem[]

type Props = { searchParams: Promise<{ page?: string | string[] }> }

/** ?page 값 → 쪽 번호. 없으면 1, 숫자가 아니거나(“2a”·“01”) 범위 밖이면 null(=404). */
async function resolvePage(searchParams: Props["searchParams"]): Promise<{ page: number; totalPages: number } | null> {
  const raw = (await searchParams).page
  const totalPages = Math.max(1, Math.ceil(ALL.length / PAGE_SIZE))
  if (raw === undefined) return { page: 1, totalPages }
  if (typeof raw !== "string" || !/^[1-9]\d*$/.test(raw)) return null
  const page = Number(raw)
  return page <= totalPages ? { page, totalPages } : null
}

const baseMetadata: Metadata = withOgDefaults({
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
})

// F4-QA1102-FIX 2: 각 쪽의 canonical 은 자기 주소(1쪽=/blog, N쪽=/blog?page=N), 2쪽부터는 제목에 쪽 번호.
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const r = await resolvePage(searchParams)
  if (!r || r.page === 1) return baseMetadata
  const url = `${SITE.url}${blogPageHref(r.page)}`
  return {
    ...baseMetadata,
    title: `블로그 ${r.page}쪽 — F-4 비자·거소증·국적 실무 가이드`,
    alternates: { canonical: url },
    openGraph: { ...baseMetadata.openGraph, url },
  }
}

export default async function BlogPage({ searchParams }: Props) {
  const r = await resolvePage(searchParams)
  if (!r) notFound()
  const posts = ALL.slice((r.page - 1) * PAGE_SIZE, r.page * PAGE_SIZE)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "블로그", path: "/blog" }]} />
        <PageHero
          title="블로그"
          subtitle="재외동포 행정 업무에 대한 최신 정보와 유용한 가이드를 확인하세요." ctaLabel="상담 신청"
        />

        <section className="section">
          <div className="container-x">
            <BlogPagedList posts={posts} page={r.page} totalPages={r.totalPages} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
