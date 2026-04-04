import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, ClipboardList, UserCheck } from "lucide-react"

export const metadata = {
  title: "F-4 비자와 거소증 | 재외동포 행정서비스",
  description:
    "재외동포 체류자격(F-4) 비자와 거소증(외국국적동포 국내거소신고증)에 대한 안내. 발급 대상, 효과, 신청 절차를 확인하세요.",
}

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
      "최초 발급 시 최대 3년 체류 자격이 주어지며, 이후 동일 기간 단위로 연장이 가능합니다.",
  },
  {
    question: "병역 관련 제한이 있나요?",
    answer:
      "남성 신청자가 만 38세 이전에 국적이탈을 한 경우, 병역 문제와 관련된 심사가 필요합니다. 병역의무가 해소되지 않은 상태라면 발급에 제한이 있을 수 있습니다.",
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
]

export default function F4VisaResidentCardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('/slides/documents.jpg')] bg-cover bg-center opacity-10" />
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
              F-4 Visa &amp; Residence Card
            </p>
            <h1 className="mt-3 text-3xl font-bold text-primary-foreground md:text-5xl">
              F-4 비자와 거소증
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              재외동포 체류자격과 외국인등록증
            </p>
          </div>
        </section>

        {/* F-4 비자란? */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                F-4 비자란?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                재외동포 체류자격(F-4)은 외국 국적을 가진 재외동포에게 부여되는
                자격으로, 한국에서 자유롭게 체류하며 취업 등 경제활동을 할 수 있는
                권리를 부여합니다.
              </p>
              <div className="mt-8 rounded-2xl border border-border/50 bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  F-4 비자 발급대상
                </h3>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>
                      출생에 의하여 대한민국 국적을 보유하였던 자로서 외국 국적을
                      취득한 사람
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
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
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                거소증 (외국국적동포 국내거소신고증)
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                거소증은 한국에서 생활하기 위해 반드시 필요한 외국국적동포용
                신분증입니다.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {/* 대상자 */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    대상자
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    F-4 비자 등 장기체류 자격을 가진 재외동포
                  </p>
                </div>

                {/* 효과 */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    효과
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>- 은행 계좌 개설</li>
                    <li>- 휴대폰 개통</li>
                    <li>- 부동산/자동차 등록</li>
                    <li>- 공공기관 업무 처리</li>
                  </ul>
                </div>

                {/* 발급 절차 */}
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    발급 절차
                  </h3>
                  <ol className="space-y-1 text-sm text-muted-foreground">
                    <li>1. F-4 비자 발급 후 한국 입국</li>
                    <li>2. 90일 이내 관할 출입국청 신청</li>
                    <li>3. 신원확인 후 발급</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 신청 절차 */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                F-4 비자 &amp; 거소증 신청 절차
              </h2>
              <p className="mt-4 text-muted-foreground">
                비전행정사사무소가 단계별로 안내해 드립니다.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-border/50 bg-card p-6 text-center"
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

        {/* FAQ */}
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-10 text-center text-2xl font-bold text-foreground md:text-3xl">
                자주 묻는 질문
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border/50 bg-card p-6"
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      Q: {faq.question}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              F-4 비자 및 거소증 신청, 지금 상담하세요
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              비전행정사사무소가 복잡한 절차를 대행해 드립니다.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                asChild
              >
                <Link href="/contact">상담 문의하기</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <a href="tel:010-2081-3408">전화 상담</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
