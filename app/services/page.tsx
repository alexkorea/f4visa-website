import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { SITE } from "@/lib/site"
import { RECO_PILLARS } from "@/lib/reco/pillars"
import { withOgDefaults } from "@/lib/og"

// AI-RECO-2 E-2(보스 msg 4831, 맥7 지시) — 처리 업무 전체 목록. 업무·분류는 기존 업무 페이지(1차 RECO_PILLARS) 그대로, 새 업무 추가 금지.
// 정식 명칭·대상·처리 업무 = lib/reco/pillars.ts(업무 페이지와 같은 원고). 관할 기관 = 각 업무 페이지 본문(한눈에 보기 '절차'·상황별 답)에 적힌 기관.
const PAGE_TITLE = "처리 업무 전체 목록 — F-4·H-2·영주(F-5)·국적 업무"
const PAGE_DESC =
  "행정사사무소 이룸이 처리하는 업무 전체 목록입니다. 재외동포(F-4) 비자·거소신고·연장, 방문취업(H-2), 영주(F-5), 국적상실·국적이탈·국적선택·국적회복 업무의 정식 명칭, 관할 기관, 대상, 관련 페이지를 한곳에 정리했습니다."

const ROWS: { key: keyof typeof RECO_PILLARS | string; agency: string }[] = [
  { key: "f4Resident", agency: "재외공관(사증), 체류지 관할 출입국·외국인관서(거소신고·국내 체류자격 변경)" },
  { key: "f4Types", agency: "재외공관(사증), 관할 출입국·외국인관서(국내 체류자격 변경)" },
  { key: "f4Renewal", agency: "관할 출입국·외국인관서" },
  { key: "h2", agency: "체류지 관할 출입국·외국인관서" },
  { key: "f5", agency: "관할 출입국·외국인관서" },
  { key: "loss", agency: "재외공관 또는 출입국·외국인관서(접수), 법무부(처리)" },
  { key: "renunciation", agency: "주소지 관할 재외공관(제출), 법무부(심사·수리)" },
  { key: "selection", agency: "법무부(외국 국적 선택은 주소지 관할 재외공관에 국적이탈 신고)" },
  { key: "recovery", agency: "법무부" },
]

const items = ROWS.map((r) => {
  const p = RECO_PILLARS[r.key]
  const target = p.glance.find((g) => g.label === "대상")?.value ?? ""
  return { p, agency: r.agency, target }
})

export const metadata = withOgDefaults({
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: `${PAGE_TITLE} | 행정사사무소 이룸`,
    description: PAGE_DESC,
    url: `${SITE.url}/services`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: `${PAGE_TITLE} | 행정사사무소 이룸`,
    description: PAGE_DESC,
  },
})

function ServicesJsonLd() {
  const url = `${SITE.url}/services`
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: PAGE_TITLE,
    description: PAGE_DESC,
    inLanguage: "ko-KR",
    about: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      name: "처리 업무 전체 목록",
      numberOfItems: items.length,
      itemListElement: items.map(({ p }, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.serviceName,
        url: `${SITE.url}${p.path}`,
        item: { "@id": `${SITE.url}${p.path}#service` },
      })),
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ServicesJsonLd />
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "처리 업무 전체 목록", path: "/services" }]} />
        <PageHero
          title="처리 업무 전체 목록"
          subtitle="행정사사무소 이룸이 맡는 업무를 정식 명칭·관할 기관·대상·관련 페이지로 정리했습니다."
        />

        <section className="section">
          <div className="container-x">
            <div className="measure">
              <p className="text-muted-foreground">
                사무소 정보는 <Link href="/about" className="text-primary underline-offset-2 hover:underline">사무소 소개</Link>, 상담 접수는{" "}
                <Link href="/contact" className="text-primary underline-offset-2 hover:underline">상담 문의</Link>에서 볼 수 있습니다.
              </p>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-border text-left">
                      <th scope="col" className="py-3 pr-4 font-semibold text-foreground">정식 명칭</th>
                      <th scope="col" className="py-3 pr-4 font-semibold text-foreground">관할 기관</th>
                      <th scope="col" className="py-3 pr-4 font-semibold text-foreground">대상</th>
                      <th scope="col" className="py-3 font-semibold text-foreground">관련 페이지</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(({ p, agency, target }) => (
                      <tr key={p.path} className="border-b border-border align-top">
                        <th scope="row" className="py-3 pr-4 text-left font-semibold text-foreground">{p.serviceName}</th>
                        <td className="py-3 pr-4 text-muted-foreground">{agency}</td>
                        <td className="py-3 pr-4 text-muted-foreground">{target}</td>
                        <td className="py-3">
                          <Link href={p.path} className="text-primary underline-offset-2 hover:underline">바로 가기</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="mt-12 text-2xl font-bold text-foreground md:text-3xl">업무별 세부 처리 항목</h2>
              <div className="mt-6 space-y-8">
                {items.map(({ p }) => (
                  <div key={p.path}>
                    <h3 className="text-lg font-semibold text-foreground">
                      <Link href={p.path} className="hover:text-primary">{p.serviceName}</Link>
                    </h3>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {p.services.map((s) => (
                        <li key={s.name}>
                          <Link href={s.href.startsWith("#") ? `${p.path}${s.href}` : s.href} className="hover:text-primary hover:underline">
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
