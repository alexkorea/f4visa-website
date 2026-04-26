import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "거소증 서류확인",
  description:
    "재외동포(F-4) 비자, 국적상실, 거소증, 국적회복에 필요한 서류를 확인하세요. 입력 내용에 따라 접수표와 필요서류가 안내됩니다.",
  alternates: { canonical: "https://f4visa.net/f4-residence-card-documents-checklist" },
  openGraph: {
    title: "거소증 서류확인 | 비전행정사사무소",
    description:
      "재외동포(F-4) 비자, 국적상실, 거소증, 국적회복에 필요한 서류를 확인하세요.",
    url: "https://f4visa.net/f4-residence-card-documents-checklist",
    siteName: "비전행정사사무소",
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "거소증 서류확인 | 비전행정사사무소",
    description:
      "재외동포(F-4) 비자, 국적상실, 거소증, 국적회복에 필요한 서류를 확인하세요.",
  },
}

export default function DocumentChecklistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
