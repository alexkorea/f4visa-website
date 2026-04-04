import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const footerLinks = {
  services: [
    { title: "국적상실", href: "/nationality-loss" },
    { title: "F-4비자 거소증", href: "/f4-visa-resident-card" },
    { title: "영주권", href: "/permanent-residency" },
    { title: "국적회복", href: "/nationality-recovery" },
  ],
  resources: [
    { title: "거소증 서류확인", href: "/f4-residence-card-documents-checklist" },
    { title: "블로그", href: "/blog" },
    { title: "자주 묻는 질문", href: "/faq" },
  ],
  company: [
    { title: "회사 소개", href: "/about" },
    { title: "전문가 소개", href: "/team" },
    { title: "Contact", href: "/contact" },
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
                <span className="text-lg font-bold text-primary-foreground">F4</span>
              </div>
              <span className="text-lg font-semibold text-foreground">
                재외동포 행정서비스
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              F-4 비자, 거소증 발급, 국적상실, 국적회복, 영주권 업무를 전문적으로 지원하는 행정사무소입니다.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>서울특별시 중구 퇴계로 324, 3층</span>
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
        
        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 재외동포 행정서비스. All rights reserved.
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
