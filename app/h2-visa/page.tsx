import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { SITE } from "@/lib/site"
import { RecoTop, RecoBottom, RecoJsonLd, recoFaqItems } from "@/components/reco-block"
import { RECO_PILLARS } from "@/lib/reco/pillars"
import { PAGE_LASTMOD } from "@/lib/page-lastmod.generated"
import { Faq, type FaqItem } from "@/components/faq"
import { CtaSection } from "@/components/cta-section"
import { RelatedBlogLinks } from "@/components/related-blog-links"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { withOgDefaults } from "@/lib/og"

// AI-RECO-1103 12절(비자별 단위) — 방문취업(H-2) 단위 페이지 신설(사이트에 H-2 페이지가 없어 코드당 1쪽).
// 사실 원천: 출입국 체류민원 자격별 안내 매뉴얼 261030판 외국국적동포 절(방문취업제 체류관리 절차·F-4 체류자격외 활동·F-5-14).
// 대조표는 bot-chat 보고서에만 둔다. 화면에 조문번호·확인일·가격 금지.
const PAGE_TITLE = "방문취업(H-2) 비자 — 연장·F-4 전환·영주(F-5-14) 대행"
const PAGE_DESC =
  "방문취업(H-2) 사증은 2026년 2월 12일부터 신규 발급이 중단되고 재외동포(F-4)로 통합되었습니다. 기존 H-2 동포의 외국인등록·취업개시 신고·체류기간 연장, F-4 전환, 같은 업체 4년 근속 영주(F-5-14)까지 서류와 절차를 정리했습니다."

export const metadata = withOgDefaults({
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: `${SITE.url}/h2-visa` },
  openGraph: {
    title: `${PAGE_TITLE} | 행정사사무소 이룸`,
    description: PAGE_DESC,
    url: `${SITE.url}/h2-visa`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: `${PAGE_TITLE} | 행정사사무소 이룸`,
    description: PAGE_DESC,
  },
})

// 2026-02-12 이후 기존 H-2 동포에게 남은 길 — 매뉴얼 261030판 '방문취업제 체류관리 절차'
const paths = [
  { title: "계속 H-2로 머문다", body: "외국인등록(입국 후 90일 안), 허용업종 취업과 취업개시·근무처변경 신고(15일 안), 고용노동부 확인서를 받은 경우 4년 10개월 안에서 체류기간 연장." },
  { title: "재외동포(F-4)로 바꾼다", body: "F-4 요건과 서류(동포 입증서류·해외 범죄경력증명서·한국어능력 입증서류)를 갖추면 국내 체류자격 변경. 옛 H-2 사업장에서 계속 일하려면 체류자격외 활동허가." },
  { title: "영주(F-5-14)를 신청한다", body: "제조업·농축산업·어업·간병인·가사보조인으로 같은 업체에서 4년 이상 계속 근무하고, 기술·기능 자격 또는 본인 소득 GNI 70% 이상 요건을 갖춘 경우." },
]

const faqs: FaqItem[] = [
  {
    question: "H-2와 F-4는 지금 무엇이 다른가요?",
    answer:
      "2026년 2월 12일부터 새로 오는 동포는 국가와 관계없이 재외동포(F-4)를 받고, 방문취업(H-2)은 그 전에 사증을 받은 동포에게만 남아 있습니다. H-2는 허용업종 안에서만 취업할 수 있고, F-4는 단순노무 등 제한 업종을 뺀 나머지 취업이 자유롭습니다. 그래서 기존 H-2 동포는 연장을 계속할지 F-4로 바꿀지를 먼저 정합니다.",
  },
]

const RECO = RECO_PILLARS.h2

export default function H2VisaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <RecoJsonLd p={RECO} modified={PAGE_LASTMOD[RECO.path]} description={PAGE_DESC} />
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "방문취업(H-2)", path: "/h2-visa" }]} />
        <PageHero
          title={PAGE_TITLE}
          subtitle="H-2 신규 발급 중단 이후 기존 H-2 동포가 고를 수 있는 길 — 연장, F-4 전환, 영주(F-5-14)."
        />
        <RecoTop p={RECO} modified={PAGE_LASTMOD[RECO.path]} />

        <section className="section section-alt">
          <div className="container-x">
            <div className="measure">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">기존 방문취업(H-2) 동포의 세 가지 길</h2>
              <p className="mt-3 text-muted-foreground">
                방문취업(H-2) 사증의 신규 발급은 2026년 2월 12일부터 중단되었고, 다른 체류자격에서 H-2로 바꾸는 것도 되지 않습니다. 그 전에 H-2를 받은 동포는 아래 세 갈래 중 하나로 체류를 이어 갑니다.
              </p>
              <ol className="mt-6 space-y-4">
                {paths.map((p, i) => (
                  <li key={p.title} className="rounded-2xl border border-border bg-card p-5">
                    <p className="font-semibold text-foreground">
                      {i + 1}. {p.title}
                    </p>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{p.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <RecoBottom p={RECO} />
        <RelatedBlogLinks
          links={[
            { slug: "f4-h2-existing-holders-registration-stay-period-extension-limits", label: "기존 H-2 동포의 외국인등록과 체류기간", note: "3년 부여 조건과 연장 한도" },
            { slug: "f4-visa-h2-former-workplace-outside-status-activity-permit", label: "F-4로 바꾼 뒤 예전 사업장에서 계속 일하기", note: "체류자격외 활동허가 서류" },
            { slug: "f5-14-h2-same-employer-four-years-permanent-residency", label: "H-2 동포의 영주(F-5-14)", note: "같은 업체 4년 근속·기술자격·소득 요건" },
          ]}
        />
        <Faq items={faqs} extraSchemaItems={recoFaqItems(RECO)} columns={1} />
        <CtaSection
          title="H-2 연장과 F-4 전환, 어느 쪽이 맞을까요?"
          description="행정사사무소 이룸에서 체류 이력과 서류를 보고 맞는 길을 정해 드립니다."
        />
      </main>
      <Footer />
    </div>
  )
}
