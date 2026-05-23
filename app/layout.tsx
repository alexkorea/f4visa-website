import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "비전행정사사무소 (Vision Administrative Office)",
  url: "https://www.f4visa.net",
  logo: "https://www.f4visa.net/logo.png",
  description: "재외동포 F-4 비자, 거소증, 국적상실·회복, F-5 영주권 전문 행정사사무소.",
  telephone: "+82-2-363-2251",
  address: { "@type": "PostalAddress", addressCountry: "KR", addressLocality: "Seoul" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:30",
    closes: "17:30",
  },
  areaServed: "KR",
  serviceType: ["F-4 visa", "거소증", "국적상실", "국적회복", "이중국적", "국적이탈", "거소증 필요서류", "F-4 비자 필요서류", "F-4 비자 건강보험", "재미동포 거소증"],
}

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
})

const notoSerifKR = Noto_Serif_KR({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.f4visa.net'),
  verification: {
    google: '3uKewla1bSzyVlVNz1xP2GbGx-4NHiQJ4nKXl_FOk-4',
  },
  title: {
    default: 'F-4 비자 · 거소증 · 국적이탈 · 이중국적 · 재미동포 거소증 | 비전행정사사무소',
    template: '%s | 비전행정사사무소',
  },
  description: 'F-4 비자, 거소증 신청·갱신, 국적상실·국적회복·이중국적·국적이탈 신고, F-4 비자 건강보험 특례, 재미동포 거소증 등 재외동포 행정 업무를 전담합니다.',
  keywords: ['F-4 visa', '거소증', '국적상실', '국적회복', '이중국적', '국적이탈', '거소증 필요서류', 'F-4 비자 필요서류', 'F-4 비자 건강보험', '재미동포 거소증', '재외동포', '해외동포'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.f4visa.net' },
  openGraph: {
    title: 'F-4 비자 · 거소증 · 국적상실 · 국적회복 · 영주권 | 비전행정사사무소',
    description: '해외 거주 재외동포를 위한 F-4 비자, 거소증 발급, 국적상실, 국적회복, 영주권 업무를 전문적으로 지원합니다.',
    url: 'https://www.f4visa.net',
    siteName: '비전행정사사무소',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: 'https://www.f4visa.net/slides/consultation.jpg', width: 1200, height: 630, alt: 'F-4 비자 전문 비전행정사사무소' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'F-4 비자 · 거소증 · 국적상실 · 국적회복 · 영주권 | 비전행정사사무소',
    description: '해외 거주 재외동포를 위한 F-4 비자, 거소증 발급, 국적상실, 국적회복, 영주권 업무를 전문적으로 지원합니다.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f36c24',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body className={`${notoSansKR.variable} ${notoSerifKR.variable} font-sans antialiased`}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-TNDB1XVX2R" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TNDB1XVX2R');
          `}
        </Script>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
