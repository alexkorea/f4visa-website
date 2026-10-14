import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// BOSSEYE-FIX-1014 #20 — Next 기본 영문 404("This page could not be found.") 대신 사이트 헤더·푸터 안의 한글 안내.
// 응답 코드는 그대로 404 다(not-found.tsx 는 상태 코드를 바꾸지 않는다). 업무 6개는 홈 서비스 카드와 같은 주소.
export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: true },
}

const mainServices = [
  { title: "F-4 비자와 거소증", href: "/f4-visa-resident-card" },
  { title: "F-4 비자 연장", href: "/f4-visa-renewal" },
  { title: "국적상실·국적이탈 신고", href: "/nationality-loss-report" },
  { title: "국적회복", href: "/nationality-recovery" },
  { title: "영주권(F-5) 전환", href: "/permanent-residency" },
  { title: "세금 이야기", href: "/tax-stories" },
]

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <section className="section">
          <div className="container-x">
            <div className="measure">
              <p className="text-sm font-semibold text-primary">404</p>
              <h1 className="mt-2 text-3xl font-bold text-foreground lg:text-4xl">페이지를 찾을 수 없습니다</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                주소가 바뀌었거나 없어진 페이지입니다. 아래 주요 업무에서 찾으시거나 상담을 신청해 주세요.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {mainServices.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="flex min-h-[56px] items-center justify-between rounded-xl border border-border bg-card px-5 py-4 font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-muted/50"
                  >
                    {s.title}
                    <span aria-hidden className="text-primary">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">
                무료 상담 신청
              </Link>
              <Link href="/" className="btn btn-secondary">
                홈으로
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
