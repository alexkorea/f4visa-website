import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CalendarCheck, FileText, Building2, Quote } from "lucide-react"

export const metadata = {
  title: "F-4 비자 연장 절차 및 필요서류 안내 | 재외동포 행정서비스",
  description:
    "재외동포 F-4 비자 연장 절차, 필요서류, 신청 방법을 안내합니다. 체류 만료일 4개월 전부터 신청 가능합니다.",
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

const faqs = [
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
      "만료일을 넘기면 불법체류 상태가 되며 과태료가 부과됩니다. 일정 기간이 지나면 강제 출국까지 될 수 있으니 반드시 만료 전에 연장 신청을 해야 합니다.",
  },
]

export default function F4VisaRenewalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('/slides/documents.jpg')] bg-cover bg-center opacity-10" />
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
              F-4 Visa Renewal
            </p>
            <h1 className="mt-3 text-3xl font-bold text-primary-foreground md:text-5xl">
              F-4 비자 연장 절차 및 필요서류 안내
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              안정적인 체류를 위한 필수 가이드
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                재외동포 F-4 비자 연장
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                대한민국에서 재외동포(F-4) 비자로 생활하고 계신가요? 비자의 유효
                기간이 만료되기 전, 반드시 거소증 연장 신청을 해야 합니다. F-4
                비자는 갱신만 하면 지속적인 체류가 가능하므로, 복잡하게 느껴지는
                연장 절차와 필수 서류들을 미리 챙겨 두는 것이 중요합니다.
              </p>

              {/* Quote */}
              <div className="mt-10 rounded-2xl border-l-4 border-primary bg-card p-6 lg:p-8">
                <Quote className="mb-3 h-8 w-8 text-primary/40" />
                <blockquote className="text-lg italic leading-relaxed text-foreground">
                  &ldquo;F-4비자는 최초 최대 3년의 체류 기간이 부여됩니다. 만료 전
                  반드시 연장(체류기간 연장허가) 신청을 해야 하며, 연장 시에도
                  일반적으로 동일 기간이 부여됩니다. 연장을 통해 안정적으로 한국 내
                  생활을 지속할 수 있습니다&rdquo;
                </blockquote>
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  -- Alex, CEO F4visa Company
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 신청 방법 */}
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                F-4 비자 연장, 언제, 어떻게 신청하나요?
              </h2>
              <p className="mt-4 text-muted-foreground">
                F-4 비자 연장은 거소증 만료일 4개월 전부터 신청할 수 있습니다.
                신청은 온라인 예약 후 방문 신청 또는 행정대행 위임을 통해 진행할 수
                있습니다.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-border/50 bg-card p-6 text-center"
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
        <section className="bg-background py-16 lg:py-24">
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
              F-4 비자 연장, 전문가에게 맡기세요
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              비전행정사사무소가 서류 준비부터 접수까지 대행해 드립니다.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
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
