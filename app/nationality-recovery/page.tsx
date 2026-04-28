import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { FileText, Building2, Scale, Award, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "국적회복 / 65세 이상 국적회복 특별 규정",
  description:
    "한국 국적회복 신청 자격, 65세 이상 복수국적 유지 특례, 필수 서류 및 절차 안내. 비전행정사사무소가 전 과정을 대행합니다.",
  alternates: { canonical: "https://f4visa.net/nationality-recovery" },
  openGraph: {
    title: "국적회복 / 65세 이상 국적회복 특별 규정",
    description:
      "한국 국적회복 신청 자격, 65세 이상 복수국적 유지 특례, 필수 서류 및 절차 안내.",
    url: "https://f4visa.net/nationality-recovery",
    siteName: "비전행정사사무소",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "국적회복 / 65세 이상 국적회복 특별 규정",
    description:
      "한국 국적회복 신청 자격, 65세 이상 복수국적 유지 특례, 필수 서류 및 절차 안내.",
  },
}

export default function NationalityRecoveryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageBreadcrumb items={[{ label: "국적회복", path: "/nationality-recovery" }]} />
        {/* Hero */}
        <section className="relative min-h-[300px] flex items-center py-16">
          <div className="absolute inset-0">
            <img src="/slides/korea-flag.jpg" alt="국적회복 / 65세 이상 국적회복 특별 규정" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              국적회복 / 65세 이상 국적회복 특별 규정
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              잃어버린 한국 국적을 되찾는 법 -- 복수국적 유지까지 가능한 국적회복
              종합 안내
            </p>
          </div>
        </section>

        {/* 누가 신청할 수 있나요? */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              누가 신청할 수 있나요?
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "과거 대한민국 국적을 보유했던 외국인",
                "국적상실 신고를 완료한 자",
                "대한민국 안보, 질서유지 등에 지장을 초래하지 않는 자",
                "65세 이상 재외동포는 연령 특례로 복수국적 유지가 가능합니다.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 65세 이상 특별 혜택 */}
        <section className="border-t border-border bg-secondary/20 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              65세 이상 국적회복의 특별한 혜택: 복수국적 유지
            </h2>
            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 lg:p-8">
              <Award className="mb-4 h-8 w-8 text-primary" />
              <p className="text-lg leading-relaxed text-muted-foreground">
                만 65세가 된 이후 국적회복 허가를 받은 사람은 외국 국적을 포기할
                필요 없이{" "}
                <strong className="text-foreground">
                  &lsquo;외국국적 불행사 서약&rsquo;
                </strong>
                만으로 복수국적을 유지할 수 있습니다.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                이는 한국과 해외를 오가며 생활하는 재외동포의 편의를 증진하기 위한
                정책으로, 두 나라의 국적을 모두 보유하며 양국의 혜택을 누릴 수
                있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 신청 절차 */}
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              국적회복 신청 절차
            </h2>
            <div className="mt-10 space-y-0">
              {[
                {
                  step: 1,
                  icon: FileText,
                  title: "서류 준비",
                  desc: "아래 표를 참고하여 필수 서류를 꼼꼼히 준비합니다.",
                },
                {
                  step: 2,
                  icon: Building2,
                  title: "관할 기관 방문",
                  desc: "준비된 서류를 가지고 직접 방문하여 신청합니다.",
                },
                {
                  step: 3,
                  icon: Scale,
                  title: "법무부 심사",
                  desc: "법무부에서 서류 및 요건을 심사합니다.",
                },
                {
                  step: 4,
                  icon: Award,
                  title: "국적회복 허가",
                  desc: "심사 통과 후 국적회복이 허가됩니다.",
                },
                {
                  step: 5,
                  icon: ShieldCheck,
                  title: "외국국적 불행사 서약",
                  desc: "허가일로부터 1년 이내에 외국국적 불행사 서약을 통해 복수국적을 유지합니다.",
                },
              ].map((item, idx) => (
                <div key={item.step} className="relative flex gap-4 pb-8">
                  {/* Connector line */}
                  {idx < 4 && (
                    <div className="absolute left-5 top-12 h-full w-px bg-border" />
                  )}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 서류 table */}
        <section className="border-t border-border bg-secondary/20 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground">
              65세 이상 국적회복 신청 시 필수 서류
            </h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      서류 종류
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      상세 내용
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      비고
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      doc: "신청서",
                      detail: "관할 기관 비치 양식",
                      note: "",
                    },
                    {
                      doc: "여권",
                      detail: "외국 여권 원본 및 사본",
                      note: "",
                    },
                    {
                      doc: "과거 대한민국 국민이었던 사실 증명 서류",
                      detail: "제적등본, 폐쇄등록부 등",
                      note: "",
                    },
                    {
                      doc: "외국국적취득(대한민국 국적상실) 원인 및 일자를 증명하는 서류",
                      detail: "시민권 증서, 귀화증명서 등",
                      note: "",
                    },
                    {
                      doc: "가족관계부 작성에 필요한 서류",
                      detail: "기본증명서(상세), 가족관계증명서(상세) 등",
                      note: "국내 가족에게 위임하여 발급 가능",
                    },
                  ].map((row) => (
                    <tr
                      key={row.doc}
                      className="transition-colors hover:bg-secondary/30"
                    >
                      <td className="px-4 py-3 font-medium text-foreground">
                        {row.doc}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.detail}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.note || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  q: "외국국적 불행사 서약은 필수인가요?",
                  a: "네, 복수국적 유지를 희망하는 경우 반드시 '외국국적 불행사 서약'을 해야 합니다. 이 서약을 하지 않으면 외국 국적을 포기해야 합니다.",
                },
                {
                  q: "F-4 비자는 어떻게 되나요?",
                  a: "국적회복을 통해 대한민국 국적을 취득하게 되면 F-4 비자는 소멸되며, 주민등록을 하고 대한민국 여권을 발급받아 사용하게 됩니다.",
                },
                {
                  q: "서류 준비가 어렵다면?",
                  a: "서류 준비가 어렵게 느껴진다면 출입국/외국인청의 '사전 상담'을 이용하거나, 전문가의 도움을 받는 것도 좋은 방법입니다.",
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
              비전행정사사무소가 국적회복 전 과정을 대행합니다.
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
