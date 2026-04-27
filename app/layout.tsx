import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

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
  metadataBase: new URL('https://f4visa.net'),
  verification: {
    google: '3uKewla1bSzyVlVNz1xP2GbGx-4NHiQJ4nKXl_FOk-4',
  },
  title: {
    default: 'F-4 비자 · 거소증 · 국적상실 · 국적회복 · 영주권 | 비전행정사사무소',
    template: '%s | 비전행정사사무소',
  },
  description: '해외 거주 재외동포를 위한 F-4 비자, 거소증 발급, 국적상실, 국적회복, 영주권 업무를 전문적으로 지원합니다. 복잡한 행정 절차를 정확하고 빠르게 안내해 드립니다.',
  keywords: ['F-4 비자', '거소증', '국적상실', '국적회복', '영주권', '재외동포', '해외동포', '한국 비자'],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://f4visa.net' },
  openGraph: {
    title: 'F-4 비자 · 거소증 · 국적상실 · 국적회복 · 영주권 | 비전행정사사무소',
    description: '해외 거주 재외동포를 위한 F-4 비자, 거소증 발급, 국적상실, 국적회복, 영주권 업무를 전문적으로 지원합니다.',
    url: 'https://f4visa.net',
    siteName: '비전행정사사무소',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: 'https://f4visa.net/slides/consultation.jpg', width: 1200, height: 630, alt: 'F-4 비자 전문 비전행정사사무소' }],
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
  themeColor: '#1e3a5f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} ${notoSerifKR.variable} font-sans antialiased`}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-J6GD76FYJ8" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J6GD76FYJ8');
          `}
        </Script>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
