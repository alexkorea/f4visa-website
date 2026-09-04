import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { SITE } from "@/lib/site"
import { Faq, type FaqItem } from "@/components/faq"
import { CtaSection } from "@/components/cta-section"
import { ServiceJsonLd } from "@/components/structured-data"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "재외동포 영주권(F-5) — 자격·절차·필요서류",
  description:
    "F-4 비자에서 F-5 영주권으로 전환할 때의 체류 요건, 생계유지 능력, 기본소양 요건과 필요 서류, 신청 절차를 비교표로 정리했습니다. 신청 시점 판단을 행정사가 검토해 드립니다.",
  alternates: { canonical: `${SITE.url}/permanent-residency` },
  openGraph: {
    title: "재외동포 영주권(F-5) — 자격·절차·필요서류 | 행정사사무소 이룸",
    description:
      "F-4 비자에서 F-5 영주권으로 전환할 때의 체류 요건, 생계유지 능력, 기본소양 요건과 필요 서류, 신청 절차를 비교표로 정리했습니다. 신청 시점 판단을 행정사가 검토해 드립니다.",
    url: `${SITE.url}/permanent-residency`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "재외동포 영주권(F-5) — 자격·절차·필요서류 | 행정사사무소 이룸",
    description:
      "F-4 비자에서 F-5 영주권으로 전환할 때의 체류 요건, 생계유지 능력, 기본소양 요건과 필요 서류, 신청 절차를 비교표로 정리했습니다. 신청 시점 판단을 행정사가 검토해 드립니다.",
  },
}

const faqs: FaqItem[] = [
  {
                  question: "F-4 비자 없이도 영주권 신청이 가능한가요?",
                  answer: "예, 그렇습니다. 결혼이민(F-6), 전문취업(E-7) 등 다른 체류 자격으로도 일정 요건을 충족하면 F-5 영주권 신청이 가능합니다.",
                },
                {
                  question: "처리 기간은?",
                  answer: "약 1년 소요. 관할 출입국사무소마다 처리기간이 다릅니다.",
                },
                {
                  question: "가족도 함께 신청할 수 있나요?",
                  answer: "가능합니다. 다만, 가족별로 각각의 신청 절차와 요건(체류 기간, 소득 등)을 충족해야 합니다. 배우자와 미성년 자녀는 상대적으로 수월하게 동반 영주권을 받을 수 있습니다.",
                },
                {
                  question: "내국인과 동일한 권리인가요?",
                  answer: "대부분 동일하지만, 선거권, 공직 임용권 등 일부 권리는 제한됩니다. 그 외 취업, 사업, 부동산 소유 등은 내국인과 동일하게 가능합니다.",
                },
                {
                  question: "영주권도 연장해야 하나요?",
                  answer: "아닙니다. 영주권은 무기한 체류 자격이므로 별도의 연장이 필요하지 않습니다. 다만, 신분증 역할을 하는 외국인등록증(또는 영주증)은 10년마다 갱신해야 합니다.",
                },
]

export default function PermanentResidencyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ServiceJsonLd
        name="F-5 영주권 신청 대행"
        description="F-4 비자에서 F-5 영주권으로 전환하는 방법. 신청 자격, 체류 요건, 생계능력, 기본소양 요건 및 비교표 안내. 행정사사무소 이룸 전문 상담."
        url={`${SITE.url}/permanent-residency`}
      />
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "영주권", path: "/permanent-residency" }]} />
        <PageHero
          title="재외동포 영주권 신청 / 신청 자격, 절차, 필요서류"
          subtitle="F-4 비자에서 F-5 영주권으로 -- 안정적인 한국 체류를 위한 종합 가이드"
        />

        {/* 영주권이란? */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              영주권(F-5 비자)이란?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              영주권(F-5)은 국내에서 무기한 체류할 수 있는 권리를 부여하는
              비자입니다. 재외동포 비자(F-4)에서 한 단계 업그레이드된
              체류자격으로, 취업 제한 없이 자유롭게 경제활동을 할 수 있으며
              지방선거 투표권, 국민연금, 건강보험 등 사회보험 혜택도 누릴 수
              있습니다.
            </p>
          </div>
        </section>

        {/* F-4 vs F-5 비교 table */}
        <section className="border-t border-border bg-secondary/20 py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              재외동포 비자(F-4)와 영주권(F-5) 비교
            </h2>
            <p className="mt-4 text-muted-foreground">
              재외동포 비자와 영주권은 비슷해 보이지만, 자격 요건과 혜택에서 큰
              차이가 있습니다.
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-4 py-4 text-left font-semibold text-foreground">
                      구분
                    </th>
                    <th className="px-4 py-4 text-left font-semibold text-foreground">
                      재외동포 비자 (F-4)
                    </th>
                    <th className="px-4 py-4 text-left font-semibold text-primary">
                      영주권 (F-5)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      label: "정의",
                      f4: "외국 국적 동포에게 부여되는 국내 체류 자격",
                      f5: "국내에서 무기한 체류할 수 있는 권리",
                    },
                    {
                      label: "신청 자격",
                      f4: "과거 대한민국 국민이었던 자 또는 그 직계 비속",
                      f5: "F-4 비자 소지자로 국내 2년 이상 체류 등 까다로운 요건 충족",
                    },
                    {
                      label: "등록증 유효기간",
                      f4: "최대 3년 (만료 전 갱신 필요)",
                      f5: "10년 (만료 전 갱신 필요), 사실상 무기한 체류 가능",
                    },
                    {
                      label: "주요 혜택",
                      f4: "자유로운 취업 활동 (단순노무직 제외), 건강보험 혜택",
                      f5: "무기한 체류 보장, 취업 제한 없음, 지방선거 투표권, 국민연금, 건강보험 등 사회보험 혜택",
                    },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      className="transition-colors hover:bg-secondary/30"
                    >
                      <td className="px-4 py-4 font-medium text-foreground">
                        {row.label}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {row.f4}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {row.f5}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 신청 요건 */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              재외동포 비자(F-4) 취득 후 영주권(F-5) 신청 요건
            </h2>
            <div className="mt-6 space-y-8">
              {/* 1. 체류 요건 */}
              <div className="rounded-xl border border-border bg-background p-6 lg:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    체류 요건
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  F-4 비자 소지자로 국내에서{" "}
                  <strong className="text-foreground">
                    2년 이상 계속 체류
                  </strong>
                  해야 합니다. 체류 기간은 출입국 기록을 기준으로 산정되며,
                  장기간 출국 시 체류 기간이 중단될 수 있습니다.
                </p>
              </div>

              {/* 2. 생계능력 요건 */}
              <div className="rounded-xl border border-border bg-background p-6 lg:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    생계 능력 요건
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  본인 또는 생계를 같이하는 가족의 소득, 재산 등을 통해 생계를
                  유지할 수 있는 능력이 있어야 합니다. 소득 증빙서류, 재산세
                  납부 증명 등으로 확인합니다.
                </p>
              </div>

              {/* 3. 기본소양 요건 */}
              <div className="rounded-xl border border-border bg-background p-6 lg:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    기본 소양 요건
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  한국어 능력, 한국 사회 이해 등 기본소양을 갖추어야 합니다.
                  사회통합프로그램 이수 또는 한국어능력시험(TOPIK) 등으로
                  증빙합니다.
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                  ※ 일정 조건에 해당하는 경우 기본소양 요건이 면제될 수
                  있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Faq items={faqs} />

        <CtaSection
          title="전문 상담이 필요하신가요?"
          description="행정사사무소 이룸이 영주권 신청 전 과정을 대행합니다."
        />
      </main>
      <Footer />
    </div>
  )
}
