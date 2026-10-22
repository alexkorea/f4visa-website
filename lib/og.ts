import type { Metadata } from "next"
import { SITE } from "@/lib/site"

/**
 * 기본 공유 이미지 (1200×630). 루트 레이아웃과 하위 페이지가 같이 쓴다.
 * Next metadata 의 openGraph·twitter 는 얕게 덮어써진다 — 페이지가 openGraph 를 쓰면
 * 레이아웃의 images 가 사라진다(F4-OGIMG 2026-10-22, 12쪽 결락). 그래서 페이지 metadata 는
 * withOgDefaults() 로 감싸 images 가 빠졌을 때만 기본값을 채운다. 페이지 전용 이미지는 그대로 둔다.
 */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE.url}/og-image.png`,
  width: 1200,
  height: 630,
  alt: `${SITE.name} — F-4 비자·거소증 전문`,
}

export function withOgDefaults<T extends Metadata>(meta: T): T {
  const out: Metadata = { ...meta }
  if (out.openGraph && !out.openGraph.images) {
    out.openGraph = { ...out.openGraph, images: [DEFAULT_OG_IMAGE] }
  }
  if (out.twitter && !out.twitter.images) {
    out.twitter = { ...out.twitter, images: [DEFAULT_OG_IMAGE.url] }
  }
  return out as T
}
