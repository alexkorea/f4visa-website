"use client"

import dynamic from "next/dynamic"

/** 하단 CTA 바를 초기 번들에서 분리(code-split)해 지연 로드 — LCP 이후 하이드레이션 */
const MobileCtaBar = dynamic(() => import("./mobile-cta-bar").then((m) => m.MobileCtaBar), {
  ssr: false,
})

export function DeferredCtaBar() {
  return <MobileCtaBar />
}
