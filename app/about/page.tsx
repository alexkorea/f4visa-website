import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Faq, type FaqItem } from "@/components/faq"
import { CtaSection } from "@/components/cta-section"
import { SITE } from "@/lib/site"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { RelatedBlogLinks } from "@/components/related-blog-links"
import { TeamSection } from "@/components/sections/team"
import { WhyUsSection } from "@/components/sections/why-us"
import { Button } from "@/components/ui/button"
import { Shield, Award, Users, Clock } from "lucide-react"

export const metadata = {
  title: "사무소 소개 — 재외동포 행정 전문 행정사사무소 이룸",
  description:
    "행정사사무소 이룸은 F-4 재외동포 비자와 거소증, 국적상실·국적이탈·국적회복, F-5 영주권 업무를 지원하는 행정사사무소입니다. 처리하는 업무와 처리하지 않는 업무, 상담 언어, 사무소 정보를 안내합니다.",
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: "사무소 소개 — 재외동포 행정 전문 행정사사무소 이룸 | 행정사사무소 이룸",
    description: "행정사사무소 이룸은 F-4 재외동포 비자와 거소증, 국적상실·국적이탈·국적회복, F-5 영주권 업무를 지원하는 행정사사무소입니다. 처리하는 업무와 처리하지 않는 업무, 상담 언어, 사무소 정보를 안내합니다.",
    url: `${SITE.url}/about`,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "사무소 소개 — 재외동포 행정 전문 행정사사무소 이룸 | 행정사사무소 이룸",
    description: "행정사사무소 이룸은 F-4 재외동포 비자와 거소증, 국적상실·국적이탈·국적회복, F-5 영주권 업무를 지원하는 행정사사무소입니다. 처리하는 업무와 처리하지 않는 업무, 상담 언어, 사무소 정보를 안내합니다.",
  },
}

const officeFacts = [
  { icon: Shield, label: "업무 범위", value: "재외동포 행정" },
  { icon: Award, label: "자격", value: "행정사사무소" },
  { icon: Users, label: "상담 언어", value: "한·영·중·일" },
  { icon: Clock, label: "상담 시간", value: SITE.openingHours },
]

// FAQ 단일 원천 — 화면 목록과 FAQPage JSON-LD 가 이 배열 하나에서 나온다(1:1).
const faqs: FaqItem[] = [
  { question: "F-4 비자와 거소증의 차이는 무엇인가요?", answer: "F-4(재외동포)는 외국국적동포가 한국에서 활동할 수 있도록 부여되는 체류자격입니다(재외동포법 제5조). 거소증(국내거소신고증)은 F-4로 입국한 동포가 국내거소신고를 하면 발급되는 증입니다. 법무부 체류민원 매뉴얼(2026.9.)은 90일 이상 체류하려는 경우 입국일부터 90일 이내에 거소신고를 하도록 안내합니다." },
  { question: "행정사사무소 이룸은 어떤 업무를 하나요?", answer: "F-4 사증·체류자격 변경·체류기간 연장 신청, 국내거소신고 준비, 국적상실·국적이탈 신고, 국적선택, 국적회복 허가 신청, F-5 영주자격 변경 신청에 필요한 서류의 작성과 제출 대행, 신청 대리, 관련 법령 상담을 합니다(행정사법 제2조제1항)." },
  { question: "행정사사무소 이룸은 법무법인인가요?", answer: "아닙니다. 행정사사무소 이룸은 행정사법에 따른 행정사사무소입니다. 행정서류 작성과 관계 행정기관 제출 대행, 신청 대리를 하며, 소송·재판·형사 변호 등 변호사 업무는 하지 않습니다." },
  { question: "행정사사무소 이룸이 맡지 않는 업무는 무엇인가요?", answer: "행정소송·민사소송 대리와 형사사건 변호 등 변호사 업무는 하지 않습니다. 노무 대리는 공인노무사, 세무 신고 대리는 세무사 업무라 맡지 않습니다. 행정심판은 청구서 작성과 제출 지원까지 합니다. 세무 상담이 필요하면 협력 세무사를 안내해 드립니다." },
  { question: "F-4가 불허되면 어떻게 하나요?", answer: "불허 사유를 확인해 보완 서류를 갖추고 다시 신청하는 준비는 행정사 업무 범위에서 도와드립니다. 불허 처분을 다투는 행정소송 대리는 행정사 업무 범위 밖이고, 행정심판은 청구서 작성과 제출 지원까지 할 수 있습니다." },
  { question: "상담은 무료인가요?", answer: "네, 초기 상담은 무료입니다. 한국어, 영어, 중국어, 일본어로 상담이 가능합니다. 해외 거주 재외동포도 온라인·메신저 상담이 가능합니다." },
  { question: "해외에 거주해도 F-4 신청 업무를 맡길 수 있나요?", answer: "서류 작성과 제출 대행, 신청 대리는 해외에 계셔도 맡기실 수 있습니다. 체류자격 변경·연장, 재입국허가 신청처럼 출입국관리법 제79조의2와 같은 법 시행규칙 제68조의3에 열거된 신청은 대행기관이 대신할 수 있습니다. 재외공관 사증 신청과 국내거소신고는 이 목록에 명시되어 있지 않으므로 본인이 출석해야 하는 단계를 상담 때 함께 확인합니다." },
  { question: "F-4 비자 처리 기간은 얼마나 걸리나요?", answer: "법무부 체류민원·사증민원 자격별 안내 매뉴얼(2026.9.)에는 F-4 사증이나 거소증의 처리 일수가 정해져 있지 않습니다. 실제 기간은 접수 기관과 서류 보완 여부에 따라 달라지므로 상담 때 일정과 함께 확인해 드립니다." },
  { question: "어떤 언어로 상담이 가능한가요?", answer: "한국어, 영어, 중국어(보통화), 일본어로 상담이 가능합니다. KakaoTalk, WeChat, LINE, WhatsApp을 통한 메신저 상담도 제공합니다. 전화: 02-363-2251 (평일 09:30~17:30)." },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      alternateName: SITE.nameEn,
      url: SITE.url,
      telephone: SITE.phoneOfficeIntl,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
      knowsLanguage: ["ko", "en", "zh", "ja"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE.url}/#service`,
      name: `${SITE.name} F-4 재외동포 비자 서비스`,
      url: SITE.url,
      telephone: SITE.phoneOfficeIntl,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: "Jung-gu",
        addressRegion: "Seoul",
        postalCode: SITE.address.postalCode,
        addressCountry: "KR",
      },
      openingHours: "Mo-Fr 09:30-17:30",
      areaServed: { "@type": "Country", name: "South Korea" },
      availableLanguage: ["Korean", "English", "Chinese", "Japanese"],
      serviceType: ["F-4 재외동포 비자", "거소증 발급", "국적상실 신고", "국적회복", "F-5 영주권"],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "홈", item: "https://www.f4visa.net" },
        { "@type": "ListItem", position: 2, name: "회사소개", item: "https://www.f4visa.net/about" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
}


export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "회사소개", path: "/about" }]} />
        <PageHero
          title="재외동포를 위한 전문 행정서비스"
          subtitle="행정사사무소 이룸은 해외 거주 재외동포의 F-4 비자, 거소증, 국적 관련 업무를 전문적으로 지원합니다."
        />

        {/* Stats */}
        <section className="section">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {officeFacts.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Firm Intro */}
        <section className="section section-alt">
          <div className="container-x">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow">
                  Our Story
                </p>
                <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                  신뢰와 전문성으로 함께합니다
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {SITE.name}은 재외동포 행정 업무를 전문으로 하는 행정사사무소입니다.
                    F-4 비자 신청, 거소증 발급, 국적상실·국적이탈 신고, 국적회복, F-5 영주권
                    전환 등 재외동포에게 필요한 행정 절차를 대행합니다.
                  </p>
                  <p>
                    해외에 거주하시는 동포분들이 한국의 복잡한 행정 절차를 쉽고 편리하게
                    처리할 수 있도록 서류 준비부터 접수, 심사 대응까지 전 과정을
                    대행합니다. 완성된 서류는 전 세계 어디로든 안전하게 송달해 드립니다.
                  </p>
                  <p>
                    행정사법에 따른 행정사사무소로서 행정서류 작성과 관계 행정기관
                    제출 대행, 신청 대리를 하며, 소송·재판 등 변호사 업무는 하지 않습니다.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-primary/5 p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    미션
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    해외 거주 재외동포가 한국 행정 서비스를 쉽고 편리하게 이용할 수
                    있도록 전문적인 대행 서비스를 제공합니다.
                  </p>
                </div>
                <div className="rounded-2xl bg-primary/5 p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    지향점
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    재외동포가 믿고 맡길 수 있는 행정사사무소가
                    되겠습니다.
                  </p>
                </div>
                <div className="rounded-2xl bg-primary/5 p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    핵심가치
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    정확성, 신속성, 투명성을 바탕으로 고객 만족을 최우선으로
                    생각합니다.
                  </p>
                </div>
                <div className="rounded-2xl bg-primary/5 p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    차별점
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    한국 내 서류 발급 대행과 해외 송달까지 원스톱 서비스를
                    제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reuse existing sections */}
        <WhyUsSection />
        <TeamSection />

        <section className="section section-alt">
          <div className="container-x">
            <div className="section-head">
              <span className="eyebrow">Scope</span>
              <h2>처리하는 업무와 처리하지 않는 업무</h2>
              <p>행정사법 제2조가 정한 행정사 업무 범위 안에서 일합니다. 범위 밖의 일은 해당 전문가에게 맡기셔야 합니다.</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">처리하는 업무</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li><Link href="/f4-visa-types" className="underline hover:text-primary">F-4 사증</Link>·체류자격 변경·<Link href="/f4-visa-renewal" className="underline hover:text-primary">체류기간 연장</Link> 신청서류 작성과 제출 대행, 신청 대리</li>
                  <li><Link href="/f4-visa-resident-card" className="underline hover:text-primary">국내거소신고(거소증)</Link> 준비와 진행 안내</li>
                  <li><Link href="/nationality-loss-report" className="underline hover:text-primary">국적상실 신고</Link>·<Link href="/nationality-renunciation-report" className="underline hover:text-primary">국적이탈 신고</Link>·<Link href="/nationality-selection-dual-nationality" className="underline hover:text-primary">국적선택</Link> 서류</li>
                  <li><Link href="/nationality-recovery" className="underline hover:text-primary">국적회복 허가</Link> 신청 서류</li>
                  <li><Link href="/permanent-residency" className="underline hover:text-primary">F-5 영주자격</Link> 변경 신청 서류</li>
                  <li>관련 법령과 절차 상담</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">처리하지 않는 업무</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>행정소송·민사소송 대리, 형사사건 변호 — 변호사 업무는 하지 않습니다</li>
                  <li>행정심판 대리 — 청구서 작성과 제출 지원까지만 합니다</li>
                  <li>노무 대리 — 공인노무사 업무</li>
                  <li>세무 신고 대리 — 세무사 업무(<Link href="/tax-stories" className="underline hover:text-primary">협력 세무사 안내</Link>)</li>
                  <li>허가 결과의 약속 — 허가 여부는 법무부가 심사해 결정합니다</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">상담 언어와 방법</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>상담 언어: 한국어, 영어, 중국어(보통화), 일본어</li>
                  <li>메신저: KakaoTalk, WeChat, LINE, WhatsApp</li>
                  <li>전화: {SITE.phoneOffice} ({SITE.openingHours})</li>
                  <li>해외 거주자도 온라인·메신저로 상담할 수 있습니다</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <RelatedBlogLinks
          title="업무 범위와 절차를 더 알아보기"
          links={[
            { slug: "geosojeung-agency-checklist", label: "거소증·F-4 업무를 행정사에게 맡길 때 확인할 점", note: "업무신고확인증·대행기관 등록·업무 범위" },
            { slug: "f4-visa-us-citizens", label: "미국 시민권자 F-4 비자 신청 절차", note: "국적상실 정리부터 서류 준비까지" },
            { slug: "f4-fbi-background-check-apostille", label: "F-4 FBI 범죄경력증명서와 아포스티유", note: "법무부 매뉴얼 제출기준 정리" },
            { slug: "goso-jeung-remote-application-from-abroad", label: "해외에서 거소증 신청을 준비하는 방법", note: "해외에서 할 수 있는 준비와 본인 출석 단계" },
          ]}
        />

        <Faq items={faqs} withSchema={false} />

        <CtaSection
          title="전문가와 상담하세요"
          description="F-4 비자·거소증·국적·영주권 업무에 대해 궁금한 점이 있으면 언제든지 문의해 주세요."
        />
      </main>
      <Footer />
    </div>
  )
}
