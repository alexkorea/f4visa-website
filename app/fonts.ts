import localFont from "next/font/local"

/**
 * Pretendard 자체 호스팅 (WEBSITE_STANDARD §4 — self-host).
 * 인라인 @font-face로 로드해 외부 CSS 렌더 차단을 제거.
 * preload:false + display:swap → LCP(히어로 이미지) 비차단, 텍스트는 폴백 후 스왑.
 */
export const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  preload: false,
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
})
