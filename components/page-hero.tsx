import Link from "next/link"
import { SITE } from "@/lib/site"
import { SitePhoto } from "@/components/hero-photo"

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
  photo,
}: {
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
  trust?: string
  /** BEYE-1007-FIX #3: 상세 히어로 주제 사진(lib/photos.ts 자리 이름). 넓은 화면은 글 오른쪽, 좁은 화면은 글 아래. */
  photo?: string
}) {
  return (
    <section style={{ background: "var(--c-brand)", color: "var(--c-ink-invert)" }}>
      <div className={`container-x py-16 lg:py-24 ${photo ? "flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12" : ""}`}>
        <div className="measure">
          <h1 className="text-3xl lg:text-4xl">{title}</h1>
          <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.82)" }}>
            {subtitle}
          </p>
          <div className="mt-8">
            <Link href={ctaHref} className="btn btn-primary">
              {ctaLabel}
            </Link>
          </div>
          <p className="mt-8 text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
            {trust}
          </p>
        </div>
        {photo && (
          // 좁은 화면: 제목 위 작은 썸네일(144px) — 사진이 모바일 LCP 가 되면 랩 LCP 가 2.2→2.9s(BEYE-1007 실측). 넓은 화면: 글 오른쪽 큰 사진.
          <div className="order-first mb-6 w-36 overflow-hidden rounded-xl lg:order-last lg:mb-0 lg:w-auto lg:rounded-2xl">
            <SitePhoto slot={photo} hero sizes="(min-width: 1024px) 560px, 144px" />
          </div>
        )}
      </div>
    </section>
  )
}
