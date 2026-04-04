import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FileCheck, Phone, Mail, MessageCircle } from "lucide-react"

export const metadata = {
  title: "거소증 서류확인 | 재외동포 행정서비스",
  description:
    "재외동포(F-4) 비자, 국적상실, 거소증, 국적회복에 필요한 서류를 확인하세요. 입력 내용에 따라 접수표와 필요서류가 안내됩니다.",
}

export default function DocumentChecklistPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('/slides/documents.jpg')] bg-cover bg-center opacity-10" />
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
              Documents Checklist
            </p>
            <h1 className="mt-3 text-3xl font-bold text-primary-foreground md:text-5xl">
              거소증 서류확인
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              재외동포(F-4) / 국적상실 / 거소증 / 국적회복 접수표
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border border-border/50 bg-card p-8 lg:p-12">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <FileCheck className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-center text-2xl font-bold text-foreground">
                  재외동포(F-4) / 국적상실 / 거소증 / 국적회복 접수표
                </h2>
                <p className="mt-4 text-center text-lg text-muted-foreground">
                  입력 내용에 따라 접수표와 필요서류가 자동 생성됩니다.
                </p>

                <div className="mt-10 space-y-6">
                  <div className="rounded-xl bg-secondary/50 p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      1. 신청자 개인 정보
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      F-4 사증 + 거소증(거소신고) 동시 진행 시, 원본을 요구하는
                      경우가 많습니다.
                    </p>
                  </div>

                  <div className="rounded-xl bg-secondary/50 p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      2. 자격 진단 (단계별 선택)
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>
                        - 군미필 남성은 출생일/국적상실(이탈) 시점에 따라 F-4
                        제한이 있을 수 있습니다.
                      </li>
                      <li>
                        - &quot;미상실/미이탈&quot;이면, 일반적으로 먼저
                        국적상실(또는 국적이탈) 절차가 필요합니다.
                      </li>
                      <li>
                        - 선택 내용에 따라 &quot;접수 업무 선택&quot;이 추천
                        체크됩니다(수정 가능).
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-xl bg-secondary/50 p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      3. 접수 업무 선택
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      아래 체크는 &quot;원하시는 업무&quot;입니다. 선택 내용에 따라
                      접수표와 필요서류가 자동 생성됩니다.
                    </p>
                  </div>

                  <div className="rounded-xl bg-secondary/50 p-6">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      4. 결과 및 필요서류 안내
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      선택한 업무에 따른 필요서류 목록이 자동으로 생성됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 rounded-2xl border border-border/50 bg-card p-8 text-center">
                <h3 className="text-xl font-bold text-foreground">
                  비전행정사사무소 대행 안내
                </h3>
                <p className="mt-3 text-muted-foreground">
                  비전행정사사무소 추가 무료상담은 이메일이나 카톡으로 가능합니다.
                  복잡한 국내서류 사전준비, 가장 빠른 출입국사무소 확인 후 가장
                  빠른 절차로 진행합니다.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-6">
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    010-2081-3408
                  </span>
                  <span className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    카카오톡 ID: alexkorea
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    5000meter@gmail.com
                  </span>
                </div>
                <div className="mt-6">
                  <Button size="lg" asChild>
                    <Link href="/contact">상담 문의하기</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
