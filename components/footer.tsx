import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const footerLinks = {
  services: [
    { title: "국적상실", href: "/nationality-loss-report" },
    { title: "F-4비자 거소증", href: "/f4-visa-resident-card" },
    { title: "영주권", href: "/permanent-residency" },
    { title: "국적회복", href: "/nationality-recovery" },
    { title: "국적이탈신고", href: "/nationality-renunciation-report" },
    { title: "국적선택(이중국적)", href: "/nationality-selection-dual-nationality" },
  ],
  resources: [
    { title: "F-4 비자 종류", href: "/f4-visa-types" },
    { title: "F-4 비자 연장", href: "/f4-visa-renewal" },
    { title: "블로그", href: "/blog" },
  ],
  company: [
    { title: "회사 소개", href: "/about" },
    { title: "상담문의", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">V</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-lg font-semibold text-foreground">VISION</span>
                <span className="text-[10px] text-muted-foreground -mt-1">행정사사무소</span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              F-4 비자, 거소증 발급, 국적상실, 국적회복, 영주권 업무를 전문적으로 지원하는 행정사무소입니다.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>서울특별시 중구 퇴계로 324, 3층 (성우빌딩)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:010-2081-3408" className="hover:text-foreground">
                  010-2081-3408
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:5000meter@gmail.com" className="hover:text-foreground">
                  5000meter@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">서비스</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">자료실</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">회사</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Business Registration */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © 2018 비전행정사사무소 | 사업자등록번호: 405-05-54079 | 대표: 이원중 | 개인정보관리자: 김영주
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2018 비전행정사사무소. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
