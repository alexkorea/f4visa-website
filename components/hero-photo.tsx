import { PHOTOS, photoSrcSet } from "@/lib/photos"

/**
 * BEYE-1007-FIX 주제 사진 — 사전 WebP(16:10) + width/height(CLS 0).
 * 히어로만 eager·fetchpriority=high, 카드는 lazy. next/image 는 이 사이트에서 unoptimized 라 직접 srcset 을 쓴다.
 */
export function SitePhoto({
  slot,
  sizes,
  hero = false,
  className = "",
}: {
  slot: keyof typeof PHOTOS | string
  sizes: string
  hero?: boolean
  className?: string
}) {
  const p = PHOTOS[slot]
  if (!p) throw new Error(`사진 없음: ${slot}`)
  const w = p.widths[p.widths.length - 1]
  if (hero) {
    // 좁은 화면은 144px 썸네일 한 장(-320, 2배 밀도)만, 넓은 화면은 srcset. ReactDOM.preload 는 쓰지 않는다 —
    // 홈 RSC 를 링크 프리페치할 때 미리받기 힌트까지 실려 모든 페이지가 홈 사진을 High 로 받았다(BEYE-1007 실측).
    return (
      <picture>
        <source media="(max-width: 1023px)" srcSet={`${p.base}-320.webp`} />
        <source media="(min-width: 1024px)" srcSet={photoSrcSet(p)} sizes={sizes} />
        <img
          src={`${p.base}-320.webp`}
          width={w}
          height={Math.round(w / 1.6)}
          alt={p.alt}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={`block h-auto w-full object-cover ${className}`}
        />
      </picture>
    )
  }
  return (
    <img
      src={`${p.base}-${p.widths[Math.min(1, p.widths.length - 1)]}.webp`}
      srcSet={photoSrcSet(p)}
      sizes={sizes}
      width={w}
      height={Math.round(w / 1.6)}
      alt={p.alt}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      className={`block h-auto w-full object-cover ${className}`}
    />
  )
}
