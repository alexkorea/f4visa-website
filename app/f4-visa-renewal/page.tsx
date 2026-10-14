import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { SITE } from "@/lib/site"
import { Faq, type FaqItem } from "@/components/faq"
import { CtaSection } from "@/components/cta-section"
import { ServiceJsonLd } from "@/components/structured-data"
import { RelatedBlogLinks } from "@/components/related-blog-links"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Button } from "@/components/ui/button"
import { CalendarCheck, FileText, Building2, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "F-4 비자 연장 — 필요서류와 절차, 신청 시기",
  description:
    "F-4 재외동포 비자 체류기간 연장의 신청 시기와 필요 서류, 관할 출입국·외국인청 접수 절차를 정리했습니다. 연장 지연 시 불이익과 준비 순서를 행정사가 안내합니다.",
  alternates: { canonical: `${SITE.url}/f4-visa-renewal` },
  openGraph: {
    title: "F-4 비자 연장 — 필요서류와 절차, 신청 시기 | 행정사사무소 이룸",
    description: "F-4 재외동포 비자 체류기간 연장의 신청 시기와 필요 서류, 관할 출입국·외국인청 접수 절차를 정리했습니다. 연장 지연 시 불이익과 준비 순서를 행정사가 안내합니다.",
    url: `${SITE.url}/f4-visa-renewal`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "F-4 비자 연장 — 필요서류와 절차, 신청 시기 | 행정사사무소 이룸",
    description: "F-4 재외동포 비자 체류기간 연장의 신청 시기와 필요 서류, 관할 출입국·외국인청 접수 절차를 정리했습니다. 연장 지연 시 불이익과 준비 순서를 행정사가 안내합니다.",
  },
}

const steps = [
  {
    icon: CalendarCheck,
    step: "01",
    title: "온라인 예약",
    description:
      "출입국/외국인청 온라인 서비스 hikorea.go.kr을 통해 방문 날짜와 시간을 예약합니다.",
  },
  {
    icon: FileText,
    step: "02",
    title: "서류 준비",
    description:
      "아래 필수 서류 목록을 참고하여 필수 서류를 모두 준비합니다.",
  },
  {
    icon: Building2,
    step: "03",
    title: "출입국사무소 방문 또는 행정사 위임",
    description:
      "예약된 날짜에 관할 출입국/외국인청을 방문하여 연장 신청하거나, 전문 행정사무소에 대행을 위임합니다.",
  },
]

// BOSSEYE-FIX-1014 #8 — STEP 02 가 가리키는 '아래 필수 서류 목록'. 출입국 매뉴얼 원문 대조 결과는 docs/evidence/f4-renewal-documents.md
// (근거·기준일은 고객 화면에 적지 않는다). 매뉴얼에 없는 서류·금액을 여기에 더하지 말 것.
const requiredDocs = [
  { name: "신청서", note: "체류기간 연장허가 신청서(통합신청서)" },
  { name: "수수료", note: "체류기간 연장허가 심사 수수료" },
  {
    name: "한국어능력 입증서류",
    note: "사회통합프로그램 사전평가 점수표(21점 이상) 또는 교육확인서(1단계 이상 이수), 한국어능력시험(TOPIK) 성적증명서(1급 이상), 세종학당 수료증(초급 1B 과정 이상), 교육부 한국교육원 한국어강좌 수료증(2단계 이상) 중 하나. 점수표·성적증명서는 성적 발표일부터 2년 안의 것",
  },
  { name: "체류지 입증서류", note: "임대차 계약서 등 국내 체류지를 확인할 수 있는 서류" },
]

const conditionalDocs = [
  { name: "외국인 직업 신고서", note: "취업할 수 있는 체류자격(F-4 포함)으로 연장할 때 현재 직업을 신고합니다." },
  { name: "결핵진단서", note: "결핵 고위험국가 국적이면서, 신청일 전 1년 안에 결핵 고위험국가에 연속 6개월 이상 머문 경우 등" },
  { name: "재학증명서", note: "만 6세 이상 만 18세 이하 자녀가 초·중·고교에 재학 중인 경우" },
]

const koreanExempt = [
  "과거 다른 체류자격으로 한국어능력 입증서류를 제출한 적이 있는 사람",
  "과거 대한민국 국적을 가졌던 사람",
  "만 60세 이상인 사람, 만 13세 이하인 사람",
  "한국에서 초등학교 이상을 졸업한 사람",
  "2019년 9월 2일 이전에 F-4 사증을 받은 사람, 그 이전부터 F-4 자격으로 체류 중인 사람(연장 시 면제)",
]

const faqs = [
  {
    question: "F-4 비자(거소증) 연장은 언제 신청하나요?",
    answer:
      "체류기간이 만료되기 전에 체류기간 연장허가를 신청해야 합니다. 만료일이 지난 뒤에는 연장이 아니라 불법체류 상태가 되므로, 만료일을 기준으로 미리 준비하세요.",
  },
  {
    question: "언제부터 신청 가능한가요?",
    answer:
      "체류 만료일 4개월 전부터 신청 가능합니다. 너무 늦게 신청하면 과태료가 발생할 수 있으므로 최소 1~2개월 전에 준비하는 것이 안전합니다.",
  },
  {
    question: "방문 없이 온라인으로 가능한가요?",
    answer:
      "하이코리아(www.hikorea.go.kr)를 통한 온라인 신청도 가능합니다. 다만, 일부 서류 확인이 필요한 경우 직접 방문이 요구될 수 있습니다.",
  },
  {
    question: "세금 체납이 있으면 어떻게 되나요?",
    answer:
      "사업자등록이 있거나 소득이 있는 경우, 세금 체납 사실이 있으면 연장 심사에서 불이익을 받을 수 있으므로 반드시 납부를 완료해야 합니다.",
  },
  {
    question: "범죄 기록이 있으면?",
    answer:
      "경미한 경우에는 심사에 따라 연장이 가능하지만, 중대한 범죄 기록이 있으면 거절될 수 있습니다.",
  },
  {
    question: "만료일을 넘기면?",
    answer:
      "만료일을 넘기면 불법체류 상태가 되며 과태료가 부과됩니다. 일정 기간이 지나면 강제 출국까지 될 수 있으니 반드시 만료 전에 연장 신청을 해야 합니다. 만료일을 넘긴 후 F-4를 재신청할 때는 처음 F-4 신청했던 모든 서류를 다시 제출해야 합니다. 범죄경력증명서도 다시 제출해야 합니다.",
  },
]

export default function F4VisaRenewalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ServiceJsonLd
        name="F-4 비자 연장 대행"
        description="재외동포 F-4 비자 연장 절차, 필요서류, 신청 방법을 안내합니다. 체류 만료일 4개월 전부터 신청 가능합니다."
        url={`${SITE.url}/f4-visa-renewal`}
      />
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "F-4 비자 연장", path: "/f4-visa-renewal" }]} />
        <PageHero
          title="F-4 비자 연장 절차 및 필요서류 안내"
          subtitle="안정적인 체류를 위한 필수 가이드"
          photo="d-renewal"
        />

        {/* Intro */}
        <section className="section">
          <div className="container-x">
            <div className="measure">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                재외동포 F-4 비자 연장
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                대한민국에서 재외동포(F-4) 비자로 생활하고 계신가요? 비자의 유효
                기간이 만료되기 전, 반드시 거소증 연장 신청을 해야 합니다. F-4
                비자는 갱신만 하면 지속적인 체류가 가능하므로, 복잡하게 느껴지는
                연장 절차와 필수 서류들을 미리 챙겨 두는 것이 중요합니다.
              </p>

            </div>
          </div>
        </section>

        {/* 신청 방법 */}
        <section className="section section-alt">
          <div className="container-x">
            <div className="measure">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                F-4 비자 연장, 언제, 어떻게 신청하나요?
              </h2>
              <p className="mt-4 text-muted-foreground">
                F-4 비자 연장은 거소증 만료일 4개월 전부터 신청할 수 있습니다.
                신청은 온라인 예약 후 방문 신청 또는 행정대행 위임을 통해 진행할 수
                있습니다.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-border bg-card p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Step {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 필수 서류 목록 — STEP 02 '아래 필수 서류 목록' (BOSSEYE-FIX-1014 #8) */}
        <section id="required-documents" className="section">
          <div className="container-x">
            <div className="measure">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                F-4 비자 연장 필수 서류 목록
              </h2>
              <p className="mt-4 text-muted-foreground">
                체류기간 연장허가를 신청할 때 기본으로 준비하는 서류입니다. 해당하는 경우에만 내는 서류는 아래에 따로 적었습니다.
              </p>
              <ul className="mt-6 space-y-3">
                {requiredDocs.map((d) => (
                  <li key={d.name} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <div>
                      <p className="font-semibold text-foreground">{d.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{d.note}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-lg font-semibold text-foreground">해당하는 분만 추가로 내는 서류</h3>
              <ul className="mt-4 space-y-3">
                {conditionalDocs.map((d) => (
                  <li key={d.name} className="rounded-xl border border-border bg-card p-4">
                    <p className="font-semibold text-foreground">{d.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{d.note}</p>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 text-lg font-semibold text-foreground">한국어능력 입증서류를 내지 않아도 되는 경우</h3>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-muted-foreground">
                {koreanExempt.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                한국어능력 입증서류를 내면(면제 대상 포함) 최대 3년까지 체류기간을 받을 수 있습니다. 내지 않으면 1년이 부여되고, 사회통합프로그램에 등록해 수강 중이면 2년이 부여됩니다.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                관할 출입국·외국인관서는 심사에 필요하면 서류를 더 요청할 수 있습니다. 내 상황에 맞는 서류는 상담으로 확인해 드립니다.
              </p>
            </div>
          </div>
        </section>

        <RelatedBlogLinks
          links={[
            { slug: "f4-visa-domestic-renewal-guide", label: "F-4 체류기간 연장허가 신청 시기와 거부 사유 대응", note: "연장 신청 시기와 불허 사유별 준비" },
            { slug: "f4-visa-expiry-reentry-procedure", label: "F-4 체류기간 만료 후 재입국 절차", note: "거소증 만료자가 확인할 순서" },
            { slug: "f4-reentry-permit-exemption", label: "F-4 재입국허가 면제와 유효기간", note: "거소신고자의 재입국허가 면제 범위" },
          ]}
        />

        <Faq items={faqs} />

        <CtaSection
          title="F-4 비자 연장, 전문가에게 맡기세요"
          description="행정사사무소 이룸이 서류 준비부터 접수까지 대행해 드립니다."
        />
      </main>
      <Footer />
    </div>
  )
}
