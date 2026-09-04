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
import { AlertTriangle, ShieldCheck, Gavel, Clock } from "lucide-react"

export const metadata: Metadata = {
  title:
    "국적선택과 이중국적 / 복수국적자 종합가이드",
  description:
    "복수국적자의 법적 지위와 국적선택 기한, 외국국적불행사 서약의 의미와 위반 사례를 정리했습니다. 국적이탈·국적상실과의 차이를 사례로 비교해 행정사가 안내합니다.",
  alternates: {
    canonical:
      "https://www.f4visa.net/nationality-selection-dual-nationality",
  },
  openGraph: {
    title: "국적선택과 이중국적 / 복수국적자 종합가이드",
    description:
      "복수국적자의 법적 처우, 직무상 제한, 국적선택 기한, 불행사서약 위반 시 국적선택 명령 안내.",
    url: `${SITE.url}/nationality-selection-dual-nationality`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "국적선택과 이중국적 / 복수국적자 종합가이드",
    description:
      "복수국적자의 법적 처우, 직무상 제한, 국적선택 기한, 불행사서약 위반 시 국적선택 명령 안내.",
  },
}

const faqs: FaqItem[] = [
  {
                  question: "복수국적자의 법적 지위는?",
                  answer: "국적법 제11조의2 제1항 요건을 충족하는 복수국적자는 대한민국 법령 적용에서 대한민국 국민으로만 처우됩니다. 다만 직무상 제한이 있는 분야는 외국 국적 포기가 요구될 수 있습니다.",
                },
                {
                  question: "외국국적 불행사 서약 위반 시?",
                  answer: "시행령 제18조의4 제4항의 행위에 해당하면 법무부장관이 6개월 내 국적선택을 명할 수 있습니다.",
                },
]

export default function NationalitySelectionDualNationalityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ServiceJsonLd
        name="국적선택·복수국적 안내"
        description="복수국적자의 법적 처우, 직무상 제한, 국적선택 기한, 불행사서약 위반 시 국적선택 명령 안내. 행정사사무소 이룸 전문 상담."
        url={`${SITE.url}/nationality-selection-dual-nationality`}
      />
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "국적선택과 이중국적", path: "/nationality-selection-dual-nationality" }]} />
        <PageHero
          title="국적선택과 이중국적 / 복수국적자 종합가이드"
          subtitle="복수국적자의 법적 지위, 국적선택 기한, 불행사 서약 위반 사례까지 한눈에 정리"
        />

        {/* 복수국적자의 법적 처우 */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              복수국적자의 법적 처우
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              &ldquo;복수국적자&rdquo;란 출생이나 그밖에 국적법에 따라 대한민국
              국적과 외국 국적을 함께 가지게 된 사람으로서, 아래 어느 하나에
              해당하는 사람을 말합니다. 이들은 대한민국의 법령 적용에서{" "}
              <strong className="text-foreground">
                대한민국 국민으로만 처우
              </strong>
              받습니다.
              <span className="text-sm">
                (국적법 제11조의2 제1항, 국적법 시행령 제16조 제1항)
              </span>
            </p>
            <ul className="mt-6 space-y-4">
              {[
                "대한민국 국적 취득 후 외국국적불행사서약을 한 사람",
                "대한민국의 국민으로서 외국 국적을 취득한 후 6개월 내 법무부장관에게 대한민국 국적 보유 의사 신고를 한 사람",
                "국적법 부칙 제2조 제1항에 따라 법무부장관에게 외국국적불행사서약을 하고 대한민국 국적을 재취득한 후 외국국적불행사서약을 한 사람",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <ShieldCheck className="mt-2 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 직무상 제한 */}
        <section className="border-t border-border bg-secondary/20 py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">직무상 제한</h2>
            <div className="mt-6 rounded-xl border border-border bg-background p-6">
              <p className="leading-relaxed text-muted-foreground">
                복수국적자가 관계 법령에 따라 외국 국적 보유 상태에서 직무 수행이
                불가한 분야에 종사하려는 경우에는{" "}
                <strong className="text-foreground">
                  외국 국적을 포기해야 합니다.
                </strong>
                <span className="text-sm">(국적법 제11조의2 제2항)</span>
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                ※ 외국 국적 포기 및 불행사 서약에 관한 자세한 상담은
                외국인종합안내센터 1345로 문의하세요.
              </p>
            </div>
          </div>
        </section>

        {/* 국적선택 기한 */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              국적선택 기한
            </h2>
            <div className="mt-6 flex items-start gap-4 rounded-xl border border-border bg-background p-6">
              <Clock className="mt-2 h-6 w-6 shrink-0 text-primary" />
              <p className="leading-relaxed text-muted-foreground">
                복수국적자는 법에서 정한 기한 내에 하나의 국적을 선택해야 합니다.
                <span className="text-sm">(국적법 제12조 제1항)</span>
                <br />
                병역준비역에 해당하는 경우에는 추가 기한 규정이 적용됩니다.
                <span className="text-sm">(국적법 제12조 제2, 3항)</span>
              </p>
            </div>
          </div>
        </section>

        {/* 국적선택 명령 */}
        <section className="border-t border-border bg-secondary/20 py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              국적선택 명령
            </h2>

            <div className="mt-8 space-y-8">
              {/* 기한 경과 시 */}
              <div className="rounded-xl border border-border bg-background p-6">
                <div className="flex items-center gap-4">
                  <Gavel className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    기한 경과 시 명령
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  복수국적자가 선택 기한 내 국적을 선택하지 않으면,
                  법무부장관은{" "}
                  <strong className="text-foreground">1년 내</strong> 하나의
                  국적을 선택할 것을 명해야 합니다.
                  <span className="text-sm">
                    (국적법 제14조의3 제1항)
                  </span>
                </p>
              </div>

              {/* 불행사서약 위반 시 */}
              <div className="rounded-xl border border-border bg-background p-6">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h3 className="text-xl font-semibold text-foreground">
                    불행사서약 위반 시 명령
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  대한민국에서 외국 국적을 행사하지 않겠다는 서약을 한 사람이
                  현저히 반하는 행위를 한 경우,{" "}
                  <strong className="text-foreground">6개월 내</strong> 하나의
                  국적을 선택할 것을 명할 수 있습니다.
                  <span className="text-sm">
                    (국적법 제14조의3 제2항)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* "현저히 반하는 행위" 예시 */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              &ldquo;현저히 반하는 행위&rdquo; 예시
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              국적법 시행령 제18조의4 제4항
            </p>
            <div className="mt-8 space-y-4">
              {[
                "반복하여 외국 여권으로 대한민국에 출국/입국하는 경우",
                "외국 국적을 행사할 목적으로 외국인등록 또는 거소신고를 한 경우",
                "정당한 사유 없이 대한민국에서 외국 여권 등을 이용하여 공공기관/교육기관 등에 대해 외국인으로서의 권리를 행사 또는 행사하려고 한 경우",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4"
                >
                  <AlertTriangle className="mt-2 h-5 w-5 shrink-0 text-destructive" />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* 국적선택 명령 절차 */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-foreground">
                국적선택 명령 절차
              </h3>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-border bg-background p-6">
                  <h4 className="font-semibold text-foreground">
                    1. 교부/송부
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    국적선택명령서는 본인에게 직접 교부하거나 등기우편으로
                    송부합니다. 어려울 경우 가족이나 사실상 부양자에게
                    교부/송부할 수 있습니다.
                    <span className="text-xs">
                      (국적법 시행령 제18조의4 제1항, 국적법 시행규칙
                      제12조의3)
                    </span>
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background p-6">
                  <h4 className="font-semibold text-foreground">2. 공고</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    소재불명 등으로 교부/송부가 어려운 경우 관보에 공고하며,
                    공고일부터 14일이 지난 때에 그 효력이 발생합니다.
                    <span className="text-xs">
                      (국적법 시행령 제18조의4 제2항)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* 국적 상실 결과 */}
            <div className="mt-8 rounded-xl border-2 border-destructive/30 bg-destructive/5 p-6">
              <h3 className="font-semibold text-foreground">
                대한민국의 국적상실
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                국적선택의 명령을 받고도 따르지 않은 사람은, 그 기간이 지난 때에
                대한민국 국적을 상실합니다.
                <span className="text-sm">(국적법 제14조의3 제4항)</span>
              </p>
            </div>
          </div>
        </section>

        <Faq items={faqs} />

        <CtaSection
          title="전문 상담이 필요하신가요?"
          description="행정사사무소 이룸이 전 과정을 대행합니다."
        />
      </main>
      <Footer />
    </div>
  )
}
