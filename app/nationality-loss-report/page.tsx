import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { FileText, Building2, ClipboardCheck, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "국적상실 신고 절차와 준비서류 총정리",
  description:
    "외국 국적 취득 시 한국 국적 상실 신고 절차, 필수 서류, 국적법 제15조 안내. 비전행정사사무소가 국적상실 신고를 대행합니다.",
  alternates: { canonical: "https://f4visa.net/nationality-loss-report" },
  openGraph: {
    title: "국적상실 신고 절차와 준비서류 총정리",
    description:
      "외국 국적 취득 시 한국 국적 상실 신고 절차, 필수 서류, 국적법 제15조 안내.",
    url: "https://f4visa.net/nationality-loss-report",
    siteName: "비전행정사사무소",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "국적상실 신고 절차와 준비서류 총정리",
    description:
      "외국 국적 취득 시 한국 국적 상실 신고 절차, 필수 서류, 국적법 제15조 안내.",
  },
}

export default function NationalityLossReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageBreadcrumb items={[{ label: "국적상실 신고", path: "/nationality-loss-report" }]} />
        {/* Hero */}
        <section className="relative min-h-[300px] flex items-center py-16">
          <div className="absolute inset-0">
            <img src="/slides/passport.jpg" alt="국적상실 신고 절차와 준비서류 총정리" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              국적상실 신고 절차와 준비서류 총정리
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              재외동포 필독 가이드 -- 외국 국적 취득 후 반드시 필요한 국적상실
              신고의 모든 것
            </p>
          </div>
        </section>

        {/* 국적상실이란? */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              국적상실이란?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              국적법 제15조에 따라 외국 국적 취득과 동시에 한국 국적은 자동
              상실됩니다. 신고는 가족관계 및 출입국 기록의 정합성 확보를 위한
              필수 절차입니다.
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
        <section className="border-t border-border bg-secondary/20 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              관련 법령 (국적법 제15조)
            </h2>
            <div className="mt-8 space-y-8">
              <h3 className="text-xl font-semibold text-foreground">
                제15조 (외국 국적 취득에 따른 국적 상실)
              </h3>

              <article className="space-y-6 rounded-xl border border-border bg-background p-6 text-[15px] leading-relaxed text-muted-foreground lg:p-8">
                <div>
                  <p className="font-medium text-foreground">제1항</p>
                  <p className="mt-1">
                    대한민국의 국민으로서 자진하여 외국 국적을 취득한 자는 그 외국
                    국적을 취득한 때에 대한민국 국적을 상실한다.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">제2항</p>
                  <p className="mt-1">
                    대한민국의 국민으로서 다음 각 호의 어느 하나에 해당하는 자는 그
                    외국 국적을 취득한 때부터 6개월 내에 법무부장관에게 대한민국
                    국적을 보유할 의사가 있다는 뜻을 신고하지 아니하면 그 외국
                    국적을 취득한 때로 소급하여 대한민국 국적을 상실한 것으로 본다.
                  </p>
                  <ol className="mt-3 list-inside list-decimal space-y-2 pl-4">
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
                  <p className="mt-1">
                    외국 국적을 취득함으로써 대한민국 국적을 상실하게 된 자에
                    대하여 그 외국 국적의 취득일을 알 수 없으면 그가 사용하는 외국
                    여권의 최초 발급일에 그 외국 국적을 취득한 것으로 추정한다.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground">제4항</p>
                  <p className="mt-1">
                    제2항에 따른 신고 절차와 그 밖에 필요한 사항은 대통령령으로
                    정한다.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 업무 처리 절차 */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              업무 처리 절차
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
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
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
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
        <section className="border-t border-border bg-secondary/20 py-16 lg:py-20">
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
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
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

        {/* FAQ */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              자주 묻는 질문 (FAQ)
            </h2>
            <div className="mt-8 space-y-6">
              {[
                {
                  q: "서류 유효기간이 있나요?",
                  a: "일반적으로 3개월 이내 발급 원본을 권장합니다. 기관 안내 기준을 우선합니다.",
                },
                {
                  q: "국적상실 신고를 하지 않으면?",
                  a: "국내 행정, 금융 등에서 기록 불일치로 불이익이 발생할 수 있습니다. 가급적 조속히 신고하세요.",
                },
                {
                  q: "병역의무 대상자는 어떻게 되나요?",
                  a: "병역의무 대상자는 국적상실 전후 제한 요건을 별도로 검토해야 합니다. 전문가 상담을 권장합니다.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    Q. {item.q}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 text-center text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-2xl font-bold">전문 상담이 필요하신가요?</h2>
            <p className="mt-4 text-primary-foreground/80">
              비전행정사사무소가 국적상실 신고 전 과정을 대행합니다.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-lg bg-white px-8 py-3 font-semibold text-primary transition-colors hover:bg-white/90"
            >
              상담 문의하기
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
