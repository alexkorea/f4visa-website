import Link from "next/link"
import { Phone } from "lucide-react"
import { SITE } from "@/lib/site"

/** 섹션 끝 CTA (STANDARD v2.0 §6-10) */
export function CtaSection({
  title = "내 상황에 맞는 절차를 확인하세요",
  description = "F-4 비자·거소증·국적·영주권 업무를 행정사가 직접 검토해 안내합니다. 해외 거주자도 원격으로 진행할 수 있습니다.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="section" style={{ background: "var(--c-brand)", color: "var(--c-ink-invert)" }}>
      <div className="container-x">
        <div className="measure">
          <h2>{title}</h2>
          <p className="mt-4 text-lg" style={{ color: "rgba(246,247,245,0.82)" }}>
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="btn btn-primary">
              무료 상담 신청
            </Link>
            <a href={SITE.phoneOfficeHref} className="btn btn-on-dark">
              <Phone className="h-4 w-4" aria-hidden />
              {SITE.phoneOffice}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
