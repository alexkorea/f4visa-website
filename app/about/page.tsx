import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { TeamSection } from "@/components/sections/team"
import { WhyUsSection } from "@/components/sections/why-us"
import { Button } from "@/components/ui/button"
import { Shield, Award, Users, Clock } from "lucide-react"

export const metadata = {
  title: "회사소개",
  description:
    "F-4 비자, 거소증, 국적상실, 국적회복 전문 행정사사무소를 소개합니다.",
  alternates: { canonical: "https://f4visa.net/about" },
  openGraph: {
    title: "회사소개 | 비전행정사사무소",
    description:
      "F-4 비자, 거소증, 국적상실, 국적회복 전문 행정사사무소를 소개합니다.",
    url: "https://f4visa.net/about",
    siteName: "비전행정사사무소",
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "회사소개 | 비전행정사사무소",
    description:
      "F-4 비자, 거소증, 국적상실, 국적회복 전문 행정사사무소를 소개합니다.",
  },
}

const stats = [
  { icon: Shield, label: "설립", value: "2010년" },
  { icon: Award, label: "처리 건수", value: "5,000+" },
  { icon: Users, label: "전문 인력", value: "4명" },
  { icon: Clock, label: "평균 처리 기간", value: "30일" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageBreadcrumb items={[{ label: "회사소개", path: "/about" }]} />
        {/* Hero */}
        <section className="relative min-h-[300px] flex items-center py-16">
          <div className="absolute inset-0">
            <img src="/slides/meeting.jpg" alt="재외동포를 위한 전문 행정서비스" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              재외동포를 위한 전문 행정서비스
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              비전행정사사무소는 해외 거주 재외동포의 F-4 비자, 거소증, 국적 관련
              업무를 전문적으로 지원합니다.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-background py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-2xl border border-border/50 bg-card p-6 text-center"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Firm Intro */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-accent">
                  Our Story
                </p>
                <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
                  신뢰와 전문성으로 함께합니다
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    비전행정사사무소는 2010년 설립 이래 재외동포 행정 업무를 전문으로
                    해온 행정사사무소입니다. F-4 비자 신청, 거소증 발급, 국적상실 신고,
                    국적회복, 영주권 취득 등 재외동포가 필요로 하는 모든 행정 서비스를
                    제공합니다.
                  </p>
                  <p>
                    해외에 거주하시는 동포분들이 한국의 복잡한 행정 절차를 쉽고 편리하게
                    처리할 수 있도록 서류 준비부터 접수, 심사 대응까지 전 과정을
                    대행합니다. 완성된 서류는 전 세계 어디로든 안전하게 송달해 드립니다.
                  </p>
                  <p>
                    15년 이상의 전문 경험과 5,000건 이상의 성공 사례를 바탕으로
                    고객님의 소중한 업무를 정확하고 신속하게 처리해 드리겠습니다.
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
                    비전
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    재외동포 행정 서비스 분야에서 가장 신뢰받는 전문 기관이
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

        {/* CTA */}
        <section className="bg-primary py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              전문가와 상담하세요
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              F-4 비자, 거소증, 국적 관련 업무에 대해 궁금하신 점이 있으시면
              언제든지 문의해 주세요.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
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
                <a href="tel:010-2081-3408">010-2081-3408</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
