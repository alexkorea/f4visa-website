import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { MobileCtaBar } from '@/components/mobile-cta-bar'
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
  themeColor: '#0f4c4a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <a href="#main" className="skip-link">본문 바로가기</a>
        {children}
        <MobileCtaBar />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-TNDB1XVX2R" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TNDB1XVX2R');
          `}
        </Script>
      </body>
    </html>
  )
}
