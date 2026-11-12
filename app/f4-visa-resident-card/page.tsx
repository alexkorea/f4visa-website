import Link from "next/link"
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
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, ClipboardList, UserCheck } from "lucide-react"
import { withOgDefaults } from "@/lib/og"

export const metadata = withOgDefaults({
  title: "F-4 비자·거소증 발급 대행",
  description:
    "재외동포 체류자격(F-4)과 국내거소신고증(거소증)의 발급 대상과 효과, 신청 절차를 정리했습니다. 체류기간, 병역 관련 제한, 사업자등록·부동산 취득 가능 여부까지 행정사가 안내합니다.",
  alternates: { canonical: `${SITE.url}/f4-visa-resident-card` },
  openGraph: {
    title: "F-4 비자·거소증 발급 대행 | 행정사사무소 이룸",
    description: "재외동포 체류자격(F-4)과 국내거소신고증(거소증)의 발급 대상과 효과, 신청 절차를 정리했습니다. 체류기간, 병역 관련 제한, 사업자등록·부동산 취득 가능 여부까지 행정사가 안내합니다.",
    url: `${SITE.url}/f4-visa-resident-card`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "F-4 비자·거소증 발급 대행 | 행정사사무소 이룸",
    description: "재외동포 체류자격(F-4)과 국내거소신고증(거소증)의 발급 대상과 효과, 신청 절차를 정리했습니다. 체류기간, 병역 관련 제한, 사업자등록·부동산 취득 가능 여부까지 행정사가 안내합니다.",
  },
})

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "상담/전략 수립",
    description: "개인 상황 검토 및 필요한 서류 체크리스트 정리",
  },
  {
    icon: FileText,
    step: "02",
    title: "국내 서류 발급 대행",
    description:
      "기본증명서 등 국내 발급 서류를 사전에 준비(대행 가능)",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "신청서 제출",
    description: "출입국/외국인청에 접수 후 심사 진행",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "거소증 발급/수령",
    description: "승인 후 거소증 발급 및 수령 안내",
  },
]

const faqs = [
  {
    question: "체류기간은 얼마나 되나요?",
    answer:
      "재외공관에서 사증을 받을 때는 한국어능력 입증서류를 내면(면제 대상 포함) 2년, 내지 않으면 1년입니다. 국내에서 체류자격 변경·체류기간 연장을 받을 때는 한국어능력 입증서류를 내면 최대 3년, 내지 않으면 1년(사회통합프로그램을 등록·수강하면 2년)입니다. 연장은 만료 전에 다시 신청해야 하며 자동으로 늘어나지 않습니다.",
  },
  {
    question: "사업자 등록이 가능한가요?",
    answer:
      "가능합니다. 일반 내국인과 동일하게 개인사업자 및 법인사업자 등록이 가능하며, 세무 신고 및 부가가치세 납부 의무도 동일하게 적용됩니다.",
  },
  {
    question: "부동산 취득이 가능한가요?",
    answer:
      "가능합니다. 내국인과 동일하게 아파트, 토지, 상가 등 부동산을 취득할 수 있으며, 취득세 등 세금은 동일하게 부과됩니다.",
  },
  {
    question: "거소지 증명이 필요한가요?",
    answer:
      "네, 실제로 거주하는 주거지 주소(전세계약서, 숙소 확인서 등)를 제출해야 하며, 이를 통해 관할 출입국 사무소에서 거소증이 발급됩니다.",
  },
  {
    question: "거소증 재발급은 어떤 경우에, 어떻게 신청하나요?",
    answer:
      "거소증을 잃어버렸거나 헐어서 못 쓰게 된 경우, 적는 난이 부족한 경우, 성명·성별·생년월일·국적이 바뀐 경우에 재발급을 받을 수 있습니다. 국내거소신고증 재발급신청서에 사유를 보여주는 서류와 사진 1장을 붙여 출입국·외국인청(사무소·출장소)에 냅니다. 분실이 아닌 사유로 신청할 때는 원래 거소증을 함께 반납해야 합니다.",
  },
]

// F4-QA1102-FIX 3: 거소신고 필요서류·처리 흐름·관할 안내(체류민원 매뉴얼 재외동포 체류관리 절차 원문 대조 — 대조표는 보고서에만).
const residenceDocsBase = [
  { name: "재외동포 통합신청서", note: "출입국·외국인관서 비치 서식" },
  { name: "여권 원본과 사본", note: "인적사항 면과 F-4 사증(입국인) 면" },
  { name: "표준규격 사진 1매", note: "여권 사진 규격" },
  { name: "체류지 입증서류", note: "임대차계약서, 숙소제공 확인서, 공공요금 납부영수증 등 실제 거주지를 보여주는 서류" },
  { name: "조기적응프로그램 이수증", note: "이수 면제 대상이면 제출하지 않습니다" },
  { name: "수수료", note: "접수할 때 납부" },
]

const residenceDocsExtra = [
  { name: "해외 범죄경력증명서", note: "국적국 발급분. 최근 5년 안에 1년 이상 계속 산 제3국이 있으면 그 나라 것도 필요하며, 면제 대상인지 먼저 확인합니다." },
  { name: "한국어능력 입증서류", note: "사회통합프로그램 사전평가·교육확인서, TOPIK, 세종학당 수료증 등. 내지 않으면 체류기간이 1년(사회통합프로그램을 등록·수강 중이면 2년)으로 짧게 나옵니다." },
]

const earlyProgramExempt = [
  "국내 초·중·고교에 재학 중이거나 졸업한 사람",
  "만 6세 이하 또는 만 65세 이상",
  "장기체류 자격으로 국내에서 3년 이상 체류한 사람",
  "이전에 조기적응프로그램을 이수한 사람",
  "사회통합프로그램 1단계 이상을 이수 중이거나 이수한 사람",
  "중증장애인",
]

const residenceFlow = [
  { title: "입국", description: "F-4 사증으로 입국합니다. 90일 이상 머물 계획이면 입국일부터 90일 안에 거소신고를 해야 합니다." },
  { title: "체류지 정하기·서류 준비", description: "실제로 살 곳을 먼저 정하고 임대차계약서 등 체류지 입증서류를 갖춥니다. 해외 발급 서류는 입국 전에 받아 오는 편이 빠릅니다." },
  { title: "관할 관서 방문 예약", description: "체류지를 관할하는 출입국·외국인청(사무소·출장소)을 하이코리아에서 날짜·시간대로 예약합니다. 예약 없이 가면 접수가 안 되거나 오래 기다릴 수 있습니다." },
  { title: "방문 접수", description: "신청서와 서류를 내고 수수료를 납부합니다. 서류가 빠지면 보완 요청을 받아 일정이 늘어납니다." },
  { title: "심사·발급", description: "심사를 거쳐 국내거소신고증이 나옵니다. 걸리는 기간은 관서와 시기에 따라 다르므로 접수 때 수령 일정과 방법을 확인합니다." },
]

const RECO = RECO_PILLARS.f4Resident

export default function F4VisaResidentCardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <RecoJsonLd p={RECO} modified={PAGE_LASTMOD[RECO.path]} description={"재외동포 체류자격(F-4) 비자와 거소증(외국국적동포 국내거소신고증)에 대한 안내. 발급 대상, 효과, 신청 절차를 확인하세요."} />
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "F-4 비자 거소증", path: "/f4-visa-resident-card" }]} />
        <PageHero
          title="F-4 비자·거소증 발급 대행"
          subtitle="재외동포 국내거소신고증(거소증) 발급 안내"
          photo="d-resident"
        />

        <RecoTop p={RECO} modified={PAGE_LASTMOD[RECO.path]} />

        {/* F-4 비자란? */}
        <section className="section">
          <div className="container-x">
            <div className="measure">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                F-4 비자란?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                재외동포 체류자격(F-4)은 외국 국적을 가진 재외동포에게 부여되는
                자격으로, 한국에서 자유롭게 체류하며 취업 등 경제활동을 할 수 있는
                권리를 부여합니다.
              </p>
              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  F-4 비자 발급대상
                </h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="mt-2 h-5 w-5 shrink-0 text-primary" />
                    <span>
                      출생에 의하여 대한민국 국적을 보유하였던 자로서 외국 국적을
                      취득한 사람
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="mt-2 h-5 w-5 shrink-0 text-primary" />
                    <span>
                      위 대상자의 직계비속으로서 외국 국적을 취득한 사람
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 거소증 */}
        <section className="section section-alt">
          <div className="container-x">
            <div className="measure">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                거소증 (외국국적동포 국내거소신고증)
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                거소증은 한국에서 생활하기 위해 반드시 필요한 외국국적동포용
                신분증입니다.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {/* 대상자 */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    대상자
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    F-4 비자 등 장기체류 자격을 가진 재외동포
                  </p>
                </div>

                {/* 효과 */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    효과
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>- 은행 계좌 개설</li>
                    <li>- 휴대폰 개통</li>
                    <li>- 부동산/자동차 등록</li>
                    <li>- 공공기관 업무 처리</li>
                  </ul>
                </div>

                {/* 발급 절차 */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    발급 절차
                  </h3>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li>1. 한국에 입국하여 F-4비자와 거소증을 동시에 신청</li>
                    <li>2. 또는 재외공관에서 F-4 비자를 받은 후 입국하여 거소증만 신청</li>
                  </ol>
                  <p className="mt-4 text-sm font-medium text-foreground">
                    거소증은 반드시 국내에서 신청해야 합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 거소신고 필요서류 체크리스트 */}
        <section className="section" id="residence-documents">
          <div className="container-x">
            <div className="measure">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                거소신고 필요서류 체크리스트
              </h2>
              <p className="mt-4 text-muted-foreground">
                F-4 사증으로 입국한 뒤 국내에서 거소신고를 할 때 기본으로 내는 서류와, 사람에 따라 더 필요한 서류입니다.
                국적·체류 이력에 따라 관서가 서류를 더 요구할 수 있습니다.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground">모든 신청인</h3>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {residenceDocsBase.map((d) => (
                      <li key={d.name} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span><strong className="font-semibold text-foreground">{d.name}</strong> — {d.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-lg font-semibold text-foreground">해당하는 경우</h3>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    {residenceDocsExtra.map((d) => (
                      <li key={d.name} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span><strong className="font-semibold text-foreground">{d.name}</strong> — {d.note}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-6 text-base font-semibold text-foreground">조기적응프로그램 이수 면제</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {earlyProgramExempt.map((x) => (
                      <li key={x}>- {x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 거소신고 처리 흐름 */}
        <section className="section section-alt" id="residence-flow">
          <div className="container-x">
            <div className="measure">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                거소신고 처리 흐름
              </h2>
              <ol className="mt-8 space-y-4">
                {residenceFlow.map((s, i) => (
                  <li key={s.title} className="flex gap-4 rounded-2xl border border-border bg-card p-6">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 관할 출입국 안내 */}
        <section className="section" id="residence-office">
          <div className="container-x">
            <div className="measure">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                어느 출입국에 신고하나요 — 관할 안내
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                거소신고는 체류지, 즉 실제로 사는 곳을 관할하는 출입국·외국인청(사무소·출장소)에 합니다.
                아무 관서에서나 받는 것이 아니라 주소로 관할이 정해지므로, 숙소를 먼저 정한 뒤 관할 관서를 확인하세요.
              </p>
              <ul className="mt-6 space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>같은 시 안에서도 구·군에 따라 관할이 나뉩니다. 서울만 해도 서울출입국·외국인청과 서울남부출입국·외국인사무소 등으로 나뉩니다.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>관할이 헷갈리면 외국인종합안내센터(국번 없이 1345)에 체류지 주소를 알려 확인한 뒤, 그 관서로 하이코리아 방문 예약을 합니다.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>잠시 머무는 곳과 실제로 살 곳이 다르면, 체류지 입증서류에 적힌 실제 거주지를 기준으로 준비합니다.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 신청 절차 */}
        <section className="section">
          <div className="container-x">
            <div className="measure">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                F-4 비자 &amp; 거소증 신청 절차
              </h2>
              <p className="mt-4 text-muted-foreground">
                행정사사무소 이룸이 단계별로 안내해 드립니다.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-border bg-card p-6 text-center"
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

        <RecoBottom p={RECO} />

        <RelatedBlogLinks
          links={[
            { slug: "f4-residence-card-issuance-period-by-immigration-office", label: "F-4 거소증 발급 기간과 출입국사무소별 차이", note: "접수 기관·서류 보완이 일정에 미치는 영향" },
            { slug: "goso-jeung-remote-application-from-abroad", label: "해외에서 거소증 신청을 준비하는 방법", note: "해외에서 할 수 있는 준비와 본인 출석 단계" },
            { slug: "geosojeung-agency-checklist", label: "거소증·F-4 업무를 행정사에게 맡길 때 확인할 점", note: "업무신고확인증·대행기관 등록·업무 범위" },
          ]}
        />

        <Faq items={faqs} extraSchemaItems={recoFaqItems(RECO)} />

        <CtaSection
          title="F-4 비자 및 거소증 신청, 지금 상담하세요"
          description="행정사사무소 이룸이 복잡한 절차를 대행해 드립니다."
        />
      </main>
      <Footer />
    </div>
  )
}
