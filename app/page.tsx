import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaSection } from "@/components/cta-section"
import { Faq, type FaqItem } from "@/components/faq"
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/structured-data"
import { SITE } from "@/lib/site"

export const metadata = {
  alternates: { canonical: SITE.url },
}

const services = [
  {
    title: "F-4 비자와 거소증",
    href: "/f4-visa-resident-card",
    desc: "재외동포(F-4) 체류자격 신청과 국내거소신고증 발급을 서류 준비부터 접수까지 대행합니다.",
  },
  {
    title: "F-4 비자 연장",
    href: "/f4-visa-renewal",
    desc: "체류기간 연장 시점과 필요 서류를 점검하고 관할 출입국·외국인청 접수를 대행합니다.",
  },
  {
    title: "국적상실·국적이탈 신고",
    href: "/nationality-loss-report",
    desc: "외국 국적 취득에 따른 국적상실 신고, 복수국적자의 국적이탈 신고 절차를 안내합니다.",
  },
  {
    title: "국적회복",
    href: "/nationality-recovery",
    desc: "과거 대한민국 국민이었던 분의 국적회복 허가 신청을 요건 검토부터 진행합니다.",
  },
  {
    title: "영주권(F-5) 전환",
    href: "/permanent-residency",
    desc: "F-4에서 F-5로 전환할 때의 체류·소득·기본소양 요건을 검토하고 신청을 대행합니다.",
  },
  {
    title: "세금 이야기",
    href: "/tax-stories",
    desc: "재외동포의 부동산 취득세·종합소득세 등 세금 실무는 협력 세무사와 함께 안내합니다.",
  },
]

const steps = [
  { num: "01", title: "사전 상담·케이스 진단", desc: "상황을 확인하고 가능한 절차와 필요 서류, 예상 일정을 정리해 드립니다." },
  { num: "02", title: "국내 서류 발급 대행", desc: "기본증명서·가족관계증명서 등 한국에서 발급해야 하는 서류를 대신 준비합니다." },
  { num: "03", title: "신청서 작성·서류 검토", desc: "행정사가 신청서를 작성하고 제출 전 서류를 항목별로 검토합니다." },
  { num: "04", title: "접수·심사 대응", desc: "관할 기관에 접수하고 심사 중 보완 요청에 대응합니다." },
  { num: "05", title: "수령·해외 송달", desc: "발급된 서류와 카드를 수령해 국내외 주소로 안전하게 전달합니다." },
]

const reasons = [
  { title: "재외동포 업무만 다룹니다", desc: "F-4·거소증·국적·영주권 등 재외동포 행정에 범위를 좁혀 처리 절차를 축적해 왔습니다." },
  { title: "해외에서도 진행됩니다", desc: "한국 방문이 어려운 분도 서류 발급 대행과 원격 상담으로 절차를 진행할 수 있습니다." },
  { title: "행정사가 직접 검토합니다", desc: "행정사법에 따라 인가된 행정사사무소로, 서류 준비와 행정기관 제출을 대행합니다." },
]

const messengers = [
  { name: "카카오톡", qr: "/qr/kakao.jpg" },
  { name: "WeChat", qr: "/qr/wechat.jpg" },
  { name: "LINE", qr: "/qr/line.jpg" },
  { name: "WhatsApp", qr: "/qr/whatsapp.jpg" },
]

const faqs: FaqItem[] = [
  {
    question: "F-4 비자 신청 자격은 어떻게 되나요?",
    answer:
      "대한민국 국적을 보유했던 사람 또는 그 직계비속으로서 외국 국적을 취득한 재외동포가 대상입니다. 출생 시기와 국적 변동 사유에 따라 요건이 달라지므로 서류로 확인이 필요합니다.",
  },
  {
    question: "거소증 발급까지 얼마나 걸리나요?",
    answer:
      "일반적으로 신청 후 2~4주 정도 소요됩니다. 서류 준비 상태와 관할 출입국·외국인청의 심사 상황에 따라 달라질 수 있습니다.",
  },
  {
    question: "해외에 있어도 상담과 의뢰가 가능한가요?",
    answer:
      "가능합니다. 카카오톡·위챗·LINE·WhatsApp으로 원격 상담을 진행하며, 국내 서류 발급 대행과 해외 송달을 함께 지원합니다.",
  },
  {
    question: "국적상실 신고와 F-4 비자를 함께 진행할 수 있나요?",
    answer:
      "국적상실 신고가 처리된 뒤 F-4 비자를 신청하는 순서로 진행합니다. 두 절차를 연계해 일정이 끊기지 않도록 안내합니다.",
  },
  {
    question: "F-4 비자에서 영주권(F-5)으로 전환할 수 있나요?",
    answer:
      "요건을 충족하면 가능합니다. 국내 체류 기간, 생계 유지 능력, 기본소양 요건을 먼저 검토한 뒤 신청 시점을 정합니다.",
  },
  {
    question: "상담 비용은 얼마인가요?",
    answer:
      "초기 상담은 무료입니다. 케이스 검토 후 절차와 비용을 안내드리며, 업무 유형과 난이도에 따라 달라집니다.",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <Header />

      <main id="main" className="flex-1">
        {/* 히어로 */}
        <section className="relative isolate overflow-hidden" style={{ color: "var(--c-ink-invert)" }}>
          <Image
            src="/slides/family.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 -z-0" style={{ background: "var(--c-scrim)" }} aria-hidden />
          <div className="container-x relative py-16 lg:py-24">
            <div className="measure">
              <h1 className="text-3xl lg:text-5xl">재외동포 F-4 비자와 거소증, 행정사가 대행합니다</h1>
              <p className="mt-4 text-lg" style={{ color: "rgba(246,247,245,0.86)" }}>
                국적상실·국적회복·영주권까지, 해외에 있어도 서류 준비부터 발급까지 진행할 수 있습니다.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn btn-primary">
                  무료 상담 신청
                </Link>
              </div>
              <p className="mt-8 text-base" style={{ color: "rgba(246,247,245,0.75)" }}>
                {SITE.trustLine}
              </p>
            </div>
          </div>
        </section>

        {/* 핵심 서비스 */}
        <section className="section">
          <div className="container-x">
            <div className="section-head measure">
              <span className="eyebrow">서비스</span>
              <h2>어떤 업무를 대행하나요</h2>
              <p>재외동포 체류·국적 업무를 절차 단위로 나누어 지원합니다.</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <li key={s.href} className="card-x flex flex-col">
                  <h3>{s.title}</h3>
                  <p className="flex-1">{s.desc}</p>
                  <Link href={s.href} className="btn-text mt-4 inline-flex items-center gap-2">
                    자세히 보기
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 진행 절차 */}
        <section className="section section-alt">
          <div className="container-x">
            <div className="section-head measure">
              <span className="eyebrow">진행 절차</span>
              <h2>상담부터 서류 전달까지 5단계</h2>
              <p>각 단계에서 무엇을 확인하고 무엇을 대행하는지 미리 안내합니다.</p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {steps.map((s) => (
                <li key={s.num} className="card-x">
                  <span className="step-num" aria-hidden>{s.num}</span>
                  <h3 className="mt-4 text-lg">{s.title}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 신뢰 요소 */}
        <section className="section">
          <div className="container-x">
            <div className="section-head measure">
              <span className="eyebrow">사무소 안내</span>
              <h2>{SITE.name}를 선택하는 이유</h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {reasons.map((r) => (
                <li key={r.title} className="card-x">
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/about" className="btn btn-secondary">
                사무소 소개 보기
              </Link>
            </div>
          </div>
        </section>

        {/* 상담 채널 */}
        <section id="messenger" className="section section-alt">
          <div className="container-x">
            <div className="section-head measure">
              <span className="eyebrow">상담 채널</span>
              <h2>사용하시는 메신저로 상담하세요</h2>
              <p>해외 거주 중에도 익숙한 메신저로 서류와 일정을 주고받을 수 있습니다.</p>
            </div>
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {messengers.map((m) => (
                <li key={m.name} className="card-x text-center">
                  <Image
                    src={m.qr}
                    alt={`${m.name} 상담 QR 코드`}
                    width={160}
                    height={160}
                    className="mx-auto rounded-[8px]"
                  />
                  <h3 className="mt-4 text-lg">{m.name}</h3>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <Faq items={faqs} />

        {/* CTA */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  )
}
