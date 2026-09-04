import Link from "next/link"
import { Phone, MessageCircle, FileText } from "lucide-react"
import { SITE } from "@/lib/site"

/** 모바일 하단 고정 CTA 바 (STANDARD v2.0 §7 / §6-10) */
export function MobileCtaBar() {
  return (
    <nav className="mobile-cta" aria-label="빠른 상담">
      <a href={SITE.phoneOfficeHref} aria-label={`전화 상담 ${SITE.phoneOffice}`}>
        <Phone className="h-5 w-5" aria-hidden />
        전화상담
      </a>
      <Link href="/contact#messenger" aria-label="메신저(카카오톡·위챗·LINE·WhatsApp) 상담 안내">
        <MessageCircle className="h-5 w-5" aria-hidden />
        메신저
      </Link>
      <Link href="/contact" className="is-primary" aria-label="상담 신청 폼으로 이동">
        <FileText className="h-5 w-5" aria-hidden />
        상담신청
      </Link>
    </nav>
  )
}
