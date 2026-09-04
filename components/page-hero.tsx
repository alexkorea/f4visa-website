import Link from "next/link"
import { SITE } from "@/lib/site"

/**
 * 표준 히어로 (STANDARD v2.0 §5-2)
 * 한 줄 가치 제안 + 보조 1줄 + CTA 1개 + 신뢰 요소 1줄. 배경은 단색.
 */
export function PageHero({
  title,
  subtitle,
  ctaLabel = "무료 상담 신청",
  ctaHref = "/contact",
  trust = SITE.trustLine,
}: {
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
  trust?: string
}) {
  return (
    <section style={{ background: "var(--c-brand)", color: "var(--c-ink-invert)" }}>
      <div className="container-x py-16 lg:py-24">
        <div className="measure">
          <h1 className="text-3xl lg:text-4xl">{title}</h1>
          <p className="mt-4 text-lg" style={{ color: "rgba(246,247,245,0.82)" }}>
            {subtitle}
          </p>
          <div className="mt-8">
            <Link href={ctaHref} className="btn btn-primary">
              {ctaLabel}
            </Link>
          </div>
          <p className="mt-8 text-base" style={{ color: "rgba(246,247,245,0.7)" }}>
            {trust}
          </p>
        </div>
      </div>
    </section>
  )
}
