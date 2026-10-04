import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { DeferredCtaBar } from '@/components/deferred-cta-bar'
import { SITE } from '@/lib/site'

const TITLE_DEFAULT = `F-4 비자 · 거소증 · 국적상실 · 국적회복 · 영주권 | ${SITE.name}`
const DESCRIPTION =
  'F-4 재외동포 비자와 거소증 발급, 국적상실·국적이탈 신고, 국적회복, F-5 영주권 절차를 행정사가 직접 안내합니다. 해외 거주 재외동포도 원격으로 진행할 수 있습니다.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  verification: {
    google: '3uKewla1bSzyVlVNz1xP2GbGx-4NHiQJ4nKXl_FOk-4',
  },
  title: {
    default: TITLE_DEFAULT,
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  keywords: ['F-4 비자', '거소증', '국내거소신고증', '국적상실', '국적회복', '국적이탈', 'F-5 영주권', '재외동포', '이중국적', '행정사사무소 이룸'],
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE.url,
    languages: { 'ko-KR': SITE.url, 'x-default': SITE.url },
  },
  openGraph: {
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: `${SITE.url}/og-image.png`, width: 1200, height: 630, alt: `${SITE.name} — F-4 비자·거소증 전문` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [`${SITE.url}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#235099',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 임계 폰트 서브셋. font-display:optional 은 스타일시트 파싱 뒤에 발견되면
            블록 구간을 놓쳐 한 번도 적용되지 않는다 — 이 preload 한 줄이 필수다. */}
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous"
              href="/fonts/pretendard-critical-20261005.woff2" />
        {/* 0951 모바일 LCP: <head> 끝 인라인 스크립트는 스타일시트가 올 때까지 파서를 세운다.
            파서가 <body> 에 닿기 전엔 Chrome 이 Low 우선순위(Next JS 청크)를 미루므로
            CSS·임계 폰트가 대역을 먼저 쓰고 JS 는 첫 페인트 뒤에 실행된다. 빈 스크립트는
            파서를 세우지 않으니 내용을 지우지 말 것. lawinkorea 의 Webfonts 스크립트와 같은 효과. */}
        <script dangerouslySetInnerHTML={{ __html: 'void 0' }} />
      </head>
      <body>
        <a href="#main" className="skip-link">본문 바로가기</a>
        {children}
        <DeferredCtaBar />
        {/* gtag 번들은 177KB 다. next/script 의 lazyOnload 는 window load 에 붙는데,
            이 페이지는 load 가 ~0.4s 에 떨어져서 결국 LCP 구간 한복판에서 177KB 를
            받는다(2026-09-27 실측: 419ms 시작). visaskorea 홈에 이미 적용해 둔
            방식과 같이 '첫 상호작용 또는 load+2500ms 중 먼저 오는 쪽' 으로 내린다.
            페이지뷰는 늦게 쏴도 같은 세션으로 집계된다. */}
        <Script id="gtag-lazy" strategy="afterInteractive">
          {`
            (function () {
              var GA_ID = 'G-TNDB1XVX2R';
              var fired = false;
              function load() {
                if (fired) return;
                fired = true;
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
                document.head.appendChild(s);
                window.dataLayer = window.dataLayer || [];
                function gtag(){ window.dataLayer.push(arguments); }
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', GA_ID);
              }
              var evts = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
              for (var i = 0; i < evts.length; i++) {
                window.addEventListener(evts[i], load, { once: true, passive: true });
              }
              function arm() { setTimeout(load, 2500); }
              if (document.readyState === 'complete') arm();
              else window.addEventListener('load', arm, { once: true });
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
