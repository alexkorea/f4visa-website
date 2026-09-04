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
import { FileText, Building2, ClipboardCheck, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "국적상실 신고 — 절차·준비서류 총정리",
  description:
    "외국 국적 취득으로 대한민국 국적을 상실한 경우의 신고 절차와 준비 서류, 신고를 미룰 때 생기는 문제를 정리했습니다. 재외공관·국내 접수 방법을 행정사가 안내합니다.",
  alternates: { canonical: `${SITE.url}/nationality-loss-report` },
  openGraph: {
    title: "국적상실 신고 — 절차·준비서류 총정리 | 행정사사무소 이룸",
    description: "외국 국적 취득으로 대한민국 국적을 상실한 경우의 신고 절차와 준비 서류, 신고를 미룰 때 생기는 문제를 정리했습니다. 재외공관·국내 접수 방법을 행정사가 안내합니다.",
    url: `${SITE.url}/nationality-loss-report`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "국적상실 신고 — 절차·준비서류 총정리 | 행정사사무소 이룸",
    description: "외국 국적 취득으로 대한민국 국적을 상실한 경우의 신고 절차와 준비 서류, 신고를 미룰 때 생기는 문제를 정리했습니다. 재외공관·국내 접수 방법을 행정사가 안내합니다.",
  },
}

const faqs: FaqItem[] = [
  {
                  question: "서류 유효기간이 있나요?",
                  answer: "일반적으로 3개월 이내 발급 원본을 권장합니다. 기관 안내 기준을 우선합니다.",
                },
                {
                  question: "국적상실 신고를 하지 않으면?",
                  answer: "국내 행정, 금융 등에서 기록 불일치로 불이익이 발생할 수 있습니다. 가급적 조속히 신고하세요.",
                },
                {
                  question: "병역의무 대상자는 어떻게 되나요?",
                  answer: "병역의무 대상자는 국적상실 전후 제한 요건을 별도로 검토해야 합니다. 전문가 상담을 권장합니다.",
                },
]

export default function NationalityLossReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ServiceJsonLd
        name="국적상실 신고 대행"
        description="외국 국적 취득 시 한국 국적 상실 신고 절차, 필수 서류, 국적법 제15조 안내. 행정사사무소 이룸이 국적상실 신고를 대행합니다."
        url={`${SITE.url}/nationality-loss-report`}
      />
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "국적상실 신고", path: "/nationality-loss-report" }]} />
        <PageHero
          title="국적상실 신고 절차와 준비서류 총정리"
          subtitle="재외동포 필독 가이드 -- 외국 국적 취득 후 반드시 필요한 국적상실 신고의 모든 것"
        />

        {/* 국적상실이란? */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              국적상실이란?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              국적법 제15조에 따라 외국 국적 취득과 동시에 한국 국적은 자동
              상실됩니다. 즉, 외국국적을 취득한 날 국적상실은 이미 되었지만,
              한국의 가족관계부에 국적상실사실을 신고해야 합니다. 신고는
              가족관계 및 출입국 기록의 정합성 확보를 위한 필수 절차입니다.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              또한, F-4 비자를 받기 전에 국적상실신고가 완료되어 있어야 합니다.
              국적상실신고가 되어 있지 않으면 F-4 비자 신청이 불가능하므로,
              반드시 사전에 신고를 완료하시기 바랍니다.
            </p>
            <div className="mt-8 rounded-xl border border-border bg-secondary/30 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                국내 행정, 금융 등에서 기록 불일치로 불이익이 발생할 수 있습니다.
                가급적 조속히 신고하세요.
              </p>
            </div>
          </div>
        </section>

        {/* 관련 법령 */}
        <section className="border-t border-border bg-secondary/20 py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              관련 법령 (국적법 제15조)
            </h2>
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-foreground">
                제15조 (외국 국적 취득에 따른 국적 상실)
              </h3>

              <article className="space-y-6 rounded-xl border border-border bg-background p-6 leading-relaxed text-muted-foreground lg:p-8">
                <div>
                  <p className="font-medium text-foreground">제1항</p>
                  <p className="mt-2">
                    대한민국의 국민으로서 자진하여 외국 국적을 취득한 자는 그 외국
                    국적을 취득한 때에 대한민국 국적을 상실한다.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">제2항</p>
                  <p className="mt-2">
                    대한민국의 국민으로서 다음 각 호의 어느 하나에 해당하는 자는 그
                    외국 국적을 취득한 때부터 6개월 내에 법무부장관에게 대한민국
                    국적을 보유할 의사가 있다는 뜻을 신고하지 아니하면 그 외국
                    국적을 취득한 때로 소급하여 대한민국 국적을 상실한 것으로 본다.
                  </p>
                  <ol className="mt-4 list-inside list-decimal space-y-2 pl-4">
                    <li>
                      외국인과의 혼인으로 그 배우자의 국적을 취득하게 된 자
                    </li>
                    <li>
                      외국인에게 입양되어 그 양부 또는 양모의 국적을 취득하게 된 자
                    </li>
                    <li>
                      외국인인 부 또는 모에게 인지되어 그 부 또는 모의 국적을
                      취득하게 된 자
                    </li>
                    <li>
                      외국 국적을 취득하여 대한민국 국적을 상실하게 된 자의
                      배우자나 미성년의 자로서 그 외국의 법률에 따라 함께 그 외국
                      국적을 취득하게 된 자
                    </li>
                  </ol>
                </div>

                <div>
                  <p className="font-medium text-foreground">제3항</p>
                  <p className="mt-2">
                    외국 국적을 취득함으로써 대한민국 국적을 상실하게 된 자에
                    대하여 그 외국 국적의 취득일을 알 수 없으면 그가 사용하는 외국
                    여권의 최초 발급일에 그 외국 국적을 취득한 것으로 추정한다.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">제4항</p>
                  <p className="mt-2">
                    제2항에 따른 신고 절차와 그 밖에 필요한 사항은 대통령령으로
                    정한다.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 업무 처리 절차 */}
        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              업무 처리 절차
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: 1,
                  icon: Building2,
                  title: "관할기관 선택",
                  desc: "국내 출입국/외국인청 또는 재외공관(영사관) 중 택",
                },
                {
                  step: 2,
                  icon: FileText,
                  title: "서류 준비 및 제출",
                  desc: "최근 발급 원본 위주 (통상 3개월 이내)",
                },
                {
                  step: 3,
                  icon: ClipboardCheck,
                  title: "수수료 납부 및 심사",
                  desc: "수수료 납부, 수개월 심사 후 수리 통보",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Step {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 필수 서류 체크리스트 */}
        <section className="border-t border-border bg-secondary/20 py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              필수 서류 체크리스트
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                {
                  name: "국적상실 신고서",
                  detail: "법무부 양식 (현장 비치)",
                },
                {
                  name: "외국 국적 취득 증명서",
                  detail: "시민권 증서 등",
                },
                {
                  name: "한국 여권 사본",
                  detail: "이전 여권",
                },
                {
                  name: "기본증명서 (상세)",
                  detail: "최근 3개월 이내 발급",
                },
                {
                  name: "가족관계증명서 (상세)",
                  detail: "최근 3개월 이내 발급",
                },
              ].map((doc) => (
                <li
                  key={doc.name}
                  className="flex items-start gap-4 rounded-lg border border-border bg-background p-4"
                >
                  <CheckCircle2 className="mt-2 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Faq items={faqs} />

        <CtaSection
          title="전문 상담이 필요하신가요?"
          description="행정사사무소 이룸이 국적상실 신고 전 과정을 대행합니다."
        />
      </main>
      <Footer />
    </div>
  )
}
