import { SITE } from "@/lib/site"

const ORG_ID = `${SITE.url}/#organization`

// I3b(2026-10-03 맥7 결정): 타입은 Organization+ProfessionalService(LegalService 금지), sameAs 없음(브랜드 C 단독).
// logo 는 헤더 로고(logo-eroom-*.webp)와 같은 그림의 원본 /logo.png. 값은 전부 lib/site.ts 단일 원천.
const ORG_TYPE = ["Organization", "ProfessionalService"]

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ORG_TYPE,
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.nameEn,
    legalName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    description: "F-4 재외동포 비자, 국내거소신고증, 국적상실·이탈·회복 신고를 지원하는 행정사사무소 이룸.",
    taxID: SITE.businessNumber,
    founder: { "@type": "Person", name: SITE.representative },
    telephone: SITE.phoneOfficeIntl,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: SITE.phoneOfficeIntl,
        areaServed: "KR",
        email: SITE.email,
      },
    ],
    areaServed: { "@type": "Country", name: "South Korea" },
    knowsAbout: [
      "F-4 재외동포 비자",
      "국내거소신고증(거소증)",
      "F-4 비자 연장",
      "국적상실 신고",
      "국적이탈 신고",
      "국적회복 신청",
      "F-5 영주권",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "17:30",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: SITE.url,
    publisher: { "@id": ORG_ID },
    inLanguage: "ko-KR",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url,
    provider: {
      "@type": ORG_TYPE,
      "@id": ORG_ID,
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phoneOfficeIntl,
    },
    areaServed: { "@type": "Country", name: "KR" },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    // 발행·저자 엔티티는 등록부 브랜드 C(이룸) 하나뿐이다 — 협력 세무사 글도 같다(2026-10-03).
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/og-image.png`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FaqJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[]
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
