import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AlertTriangle, ShieldCheck, Gavel, Clock } from "lucide-react"

export const metadata: Metadata = {
  title:
    "국적선택과 이중국적 / 복수국적자 종합가이드 | 재외동포 행정서비스",
  description:
    "복수국적자의 법적 처우, 직무상 제한, 국적선택 기한, 불행사서약 위반 시 국적선택 명령 안내. 비전행정사사무소 전문 상담.",
  alternates: {
    canonical:
      "https://f4visa.net/nationality-selection-dual-nationality",
  },
  openGraph: {
    title: "국적선택과 이중국적 / 복수국적자 종합가이드",
    description:
      "복수국적자의 법적 처우, 직무상 제한, 국적선택 기한, 불행사서약 위반 시 국적선택 명령 안내.",
    url: "https://f4visa.net/nationality-selection-dual-nationality",
    siteName: "재외동포 행정서비스 | f4visa.net",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "국적선택과 이중국적 / 복수국적자 종합가이드",
    description:
      "복수국적자의 법적 처우, 직무상 제한, 국적선택 기한, 불행사서약 위반 시 국적선택 명령 안내.",
  },
}

export default function NationalitySelectionDualNationalityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[300px] flex items-center py-16">
          <div className="absolute inset-0">
            <img src="/slides/legal-docs.jpg" alt="국적선택과 이중국적 / 복수국적자 종합가이드" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              국적선택과 이중국적 / 복수국적자 종합가이드
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              복수국적자의 법적 지위, 국적선택 기한, 불행사 서약 위반 사례까지
              한눈에 정리
            </p>
          </div>
        </section>

        {/* 복수국적자의 법적 처우 */}
        <section className="py-16 lg:py-20">
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
            <ul className="mt-6 space-y-3">
              {[
                "대한민국 국적 취득 후 외국국적불행사서약을 한 사람",
                "대한민국의 국민으로서 외국 국적을 취득한 후 6개월 내 법무부장관에게 대한민국 국적 보유 의사 신고를 한 사람",
                "국적법 부칙 제2조 제1항에 따라 법무부장관에게 외국국적불행사서약을 하고 대한민국 국적을 재취득한 후 외국국적불행사서약을 한 사람",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 직무상 제한 */}
        <section className="border-t border-border bg-secondary/20 py-16 lg:py-20">
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
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              국적선택 기한
            </h2>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-background p-6">
              <Clock className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
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
        <section className="border-t border-border bg-secondary/20 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              국적선택 명령
            </h2>

            <div className="mt-8 space-y-8">
              {/* 기한 경과 시 */}
              <div className="rounded-xl border border-border bg-background p-6">
                <div className="flex items-center gap-3">
                  <Gavel className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    기한 경과 시 명령
                  </h3>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">
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
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <h3 className="text-xl font-semibold text-foreground">
                    불행사서약 위반 시 명령
                  </h3>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">
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
        <section className="py-16 lg:py-20">
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
                  className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
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

        {/* FAQ */}
        <section className="border-t border-border bg-secondary/20 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              자주 묻는 질문 (FAQ)
            </h2>
            <div className="mt-8 space-y-6">
              {[
                {
                  q: "복수국적자의 법적 지위는?",
                  a: "국적법 제11조의2 제1항 요건을 충족하는 복수국적자는 대한민국 법령 적용에서 대한민국 국민으로만 처우됩니다. 다만 직무상 제한이 있는 분야는 외국 국적 포기가 요구될 수 있습니다.",
                },
                {
                  q: "외국국적 불행사 서약 위반 시?",
                  a: "시행령 제18조의4 제4항의 행위에 해당하면 법무부장관이 6개월 내 국적선택을 명할 수 있습니다.",
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
              비전행정사사무소가 전 과정을 대행합니다.
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
