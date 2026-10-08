// BEYE-1007-FIX #7: 모바일에서는 화면의 QR 을 같은 폰으로 스캔할 수 없다 — QR 이미지를 그 QR 이 가리키는 주소로 감싼다.
// 이미지 파일·크기·위치는 그대로(scripts/qr-hash-gate.mjs). 주소는 2026-10-08 public/qr/* 를 직접 디코드한 값 그대로다.
// WhatsApp 은 QR 이 아니라 번호 그림(010-2081-3408)이라 디코드가 안 되는 게 정상 — 그림의 번호로 wa.me 를 건다.
export const QR_LINKS = {
  kakao: "http://qr.kakao.com/talk/CWF_29N7_JX5HWDsv1B5JmMcoXE-",
  line: "https://line.me/ti/p/sCj883thak",
  wechat: "https://u.wechat.com/IAiTg5y9w0856GlBt3zMfqw",
  whatsapp: "https://wa.me/821020813408",
} as const

/** '/qr/kakao-20260927-224.webp' → QR_LINKS 주소 */
export function qrHref(src: string): string {
  const k = src.replace(/^.*\/qr\//, "").replace(/[-.].*$/, "") as keyof typeof QR_LINKS
  const href = QR_LINKS[k]
  if (!href) throw new Error(`QR 링크 없음: ${src}`)
  return href
}
