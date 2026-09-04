import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { SITE } from "@/lib/site"

const footerLinks = {
  services: [
    { title: "F-4 비자와 거소증", href: "/f4-visa-resident-card" },
    { title: "F-4 비자 연장", href: "/f4-visa-renewal" },
    { title: "F-4 비자 종류", href: "/f4-visa-types" },
    { title: "영주권(F-5)", href: "/permanent-residency" },
  ],
  nationality: [
    { title: "국적상실 신고", href: "/nationality-loss-report" },
    { title: "국적이탈 신고", href: "/nationality-renunciation-report" },
    { title: "국적선택·이중국적", href: "/nationality-selection-dual-nationality" },
    { title: "국적회복", href: "/nationality-recovery" },
  ],
  company: [
    { title: "사무소 소개", href: "/about" },
    { title: "블로그", href: "/blog" },
    { title: "세금이야기", href: "/tax-stories" },
    { title: "상담문의", href: "/contact" },
  ],
}

export function Footer() {
  return (
    <footer
      className="border-t border-border"
      style={{ background: "var(--c-brand)", color: "var(--c-ink-invert)" }}
    >
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <p className="text-xl font-bold">{SITE.name}</p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(246,247,245,0.78)" }}>
              F-4 재외동포 비자, 거소증, 국적상실·회복, F-5 영주권 업무를 대행하는 행정사사무소입니다.
            </p>
            <ul className="mt-8 flex flex-col gap-4 text-base" style={{ color: "rgba(246,247,245,0.78)" }}>
              <li className="flex items-start gap-4">
                <MapPin className="mt-2 h-4 w-4 shrink-0" aria-hidden />
                <span>{SITE.address.full}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                <a href={SITE.phoneOfficeHref} className="min-h-[44px] inline-flex items-center hover:underline">
                  {SITE.phoneOffice}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <a href={SITE.emailHref} className="min-h-[44px] inline-flex items-center break-all hover:underline">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-3">
            <FooterColumn title="F-4 비자 업무" links={footerLinks.services} />
            <FooterColumn title="국적 업무" links={footerLinks.nationality} />
            <FooterColumn title="사무소" links={footerLinks.company} />
          </div>
        </div>

        <div
          className="mt-16 flex flex-col gap-4 border-t pt-8 text-base sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(246,247,245,0.2)", color: "rgba(246,247,245,0.7)" }}
        >
          <div>
            <p>
              {SITE.name} | 대표: {SITE.representative} | 사업자등록번호: {SITE.businessNumber}
            </p>
            <p className="mt-2">개인정보관리책임자: {SITE.privacyOfficer} | 상담시간: {SITE.openingHours}</p>
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="min-h-[44px] inline-flex items-center hover:underline">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="min-h-[44px] inline-flex items-center hover:underline">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { title: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-base font-semibold">{title}</h2>
      <ul className="mt-4 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-[44px] items-center text-base hover:underline"
              style={{ color: "rgba(246,247,245,0.78)" }}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
