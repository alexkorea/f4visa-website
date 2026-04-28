import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import {
  FileText,
  Building2,
  Scale,
  Bell,
  AlertTriangle,
  ArrowRightLeft,
} from "lucide-react"

export const metadata: Metadata = {
  title: "국적이탈신고 / 신고 절차 및 필수 서류",
  description:
    "복수국적자의 국적이탈 신고 절차, 병역의무 기한, 국적상실과의 차이점 안내. 비전행정사사무소가 전 과정을 대행합니다.",
  alternates: {
    canonical: "https://f4visa.net/nationality-renunciation-report",
  },
  openGraph: {
    title: "국적이탈신고 / 신고 절차 및 필수 서류",
    description:
      "복수국적자의 국적이탈 신고 절차, 병역의무 기한, 국적상실과의 차이점 안내.",
    url: "https://f4visa.net/nationality-renunciation-report",
    siteName: "비전행정사사무소",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "국적이탈신고 / 신고 절차 및 필수 서류",
    description:
      "복수국적자의 국적이탈 신고 절차, 병역의무 기한, 국적상실과의 차이점 안내.",
  },
}

export default function NationalityRenunciationReportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageBreadcrumb items={[{ label: "국적이탈 신고", path: "/nationality-renunciation-report" }]} />
        {/* Hero */}
        <section className="relative min-h-[300px] flex items-center py-16">
          <div className="absolute inset-0">
            <img src="/slides/passport.jpg" alt="국적이탈신고 / 신고 절차 및 필수 서류" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              국적이탈신고 / 신고 절차 및 필수 서류
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              복수국적자의 고민, 국적이탈 신고 절차 및 필수 서류 종합 안내
            </p>
          </div>
        </section>

        {/* 국적이탈 신고란? */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              국적이탈 신고란?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              국적이탈 신고는{" "}
              <strong className="text-foreground">
                &lsquo;출생과 동시에&rsquo;
              </strong>{" "}
              한국 국적과 외국 국적을 모두 취득한 복수국적자가 대한민국 국적을
              포기하고 외국 국적만을 선택하는 행위를 의미합니다. 이는 후천적으로
              외국 국적을 취득하게 되어 한국 국적이 자동으로 상실되는 국적상실과는
              명확히 구분되는 개념입니다.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              국적이탈은 본인의 의사에 따라 한국 국적을 정리하는 절차이므로,
              법무부 장관에게 신고함으로써 이루어집니다.
            </p>
          </div>
        </section>

        {/* 국적상실과의 차이점 */}
        <section className="border-t border-border bg-secondary/20 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              국적상실과의 차이점
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  국적이탈
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  선천적 복수국적자가 본인 의사에 따라 한국 국적을 포기하는 것
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <ArrowRightLeft className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  국적상실
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  한국인이 자발적으로 외국 국적을 취득하여 한국 국적이 자동으로
                  상실되는 것
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 남성 복수국적자 병역의무 - Warning */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              누가, 언제 국적이탈 신고를 해야 하나요?
            </h2>

            <div className="mt-8 space-y-8">
              {/* 일반적인 경우 */}
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  일반적인 경우
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  국적이탈 신고는 외국에 주소를 두고 거주하는 사람에 한해 해당
                  주소지 관할 재외공관(영사관)을 통해 신청해야 합니다. 만 15세
                  이상인 경우에는 본인이 직접 신청해야 하며, 15세 미만인 경우에는
                  법정대리인이 대신 신고할 수 있습니다.
                </p>
              </div>

              {/* 병역의무 경고 */}
              <div className="rounded-xl border-2 border-destructive/30 bg-destructive/5 p-6 lg:p-8">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 shrink-0 text-destructive" />
                  <h3 className="text-xl font-semibold text-destructive">
                    남성 복수국적자의 특별한 시기: 병역의무
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  남성 복수국적자에게 국적이탈 신고 기한은{" "}
                  <strong className="text-foreground">
                    절대 놓쳐서는 안 될 가장 중요한 사항
                  </strong>
                  입니다. 대한민국 국적법상, 병역의무가 부과되는 남성은{" "}
                  <strong className="text-foreground">
                    만 18세가 되는 해의 3월 31일 이전
                  </strong>
                  까지 국적이탈 신고를 마쳐야만 병역의무를 면제받을 수 있습니다.
                </p>
                <div className="mt-4 rounded-lg bg-destructive/10 p-4">
                  <p className="text-sm font-medium text-foreground">
                    기한 경과 시
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    만약 이 기한을 넘겨 4월 1일 이후에 신고를 하는 경우에는
                    병역을 필했거나 면제받았음을 증명하는 서류를 제출해야만
                    국적이탈이 가능합니다. 이 시기를 놓치게 되면 사실상 국적이탈이
                    매우 어려워지므로 반드시 기한 내에 신고하여야 합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 절차 (4 steps) */}
        <section className="border-t border-border bg-secondary/20 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              국적이탈 신고 절차
            </h2>
            <p className="mt-3 text-muted-foreground">
              전체 소요 기간은 약 1년 정도이므로, 미리미리 준비하는 것이
              좋습니다.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                {
                  step: 1,
                  icon: FileText,
                  title: "서류 준비 및 관할 영사관 확인",
                  desc: "제출해야 할 서류를 꼼꼼히 확인하고, 본인이 거주하는 지역의 관할 영사관이 어디인지 파악합니다.",
                },
                {
                  step: 2,
                  icon: Building2,
                  title: "영사관 방문 및 신고서 제출",
                  desc: "준비된 서류를 가지고 직접 영사관에 방문하여 국적이탈 신고를 접수합니다.",
                },
                {
                  step: 3,
                  icon: Scale,
                  title: "법무부 심사",
                  desc: "영사관을 통해 접수된 서류는 법무부로 이관되어 심사를 받게 됩니다. 심사 과정에서 서류 보완 요청이 있을 수 있습니다.",
                },
                {
                  step: 4,
                  icon: Bell,
                  title: "국적이탈 허가 및 통보",
                  desc: "심사가 완료되어 국적이탈이 허가되면, 해당 결과가 영사관을 통해 본인에게 통보됩니다. 이후 외국 여권만으로 생활할 수 있게 됩니다.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
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

        {/* FAQ */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              자주 묻는 질문 (FAQ)
            </h2>
            <div className="mt-8 space-y-6">
              {[
                {
                  q: "국적이탈 신고를 하지 않으면?",
                  a: "신고하지 않으면 대한민국 국적자가 유지된 상태로 간주되며, 병역의무 발생, 출입국 제한, 외국 국적 활용에 제약 등의 불이익이 따를 수 있습니다.",
                },
                {
                  q: "어디서 신고하나요?",
                  a: "반드시 재외공관에서 신청해야 합니다. 해외에 주소를 두고 거주하는 사람에 한해 해당 주소지 관할 재외공관(대사관/영사관)을 통해 신고할 수 있습니다.",
                },
                {
                  q: "처리 기간은?",
                  a: "국적이탈 처리 후 가족관계부에 등록될 때까지 약 3개월 이상 소요됩니다. 서류 미비나 심사 상황에 따라 더 길어질 수 있습니다.",
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
              비전행정사사무소가 국적이탈 신고 전 과정을 대행합니다.
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
