export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "비전행정사사무소",
    alternateName: "VISION Administrative Office",
    url: "https://f4visa.net",
    telephone: "010-2081-3408",
    email: "5000meter@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "퇴계로 324, 3층 (성우빌딩)",
      addressLocality: "중구",
      addressRegion: "서울특별시",
      postalCode: "04620",
      addressCountry: "KR",
    },
    image: "https://f4visa.net/og-image.png",
    serviceType: [
      "F-4 비자 신청",
      "거소증 발급",
      "F-4 비자 연장",
      "국적상실 신고",
      "국적회복",
      "국적이탈 신고",
      "영주권 신청",
      "재외동포 행정서비스",
    ],
    areaServed: {
      "@type": "Country",
      name: "KR",
    },
    priceRange: "$$",
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
    name: "비전행정사사무소",
    alternateName: "VISION Administrative Office",
    url: "https://f4visa.net",
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
      "@type": "ProfessionalService",
      name: "비전행정사사무소",
      url: "https://f4visa.net",
    },
    areaServed: {
      "@type": "Country",
      name: "KR",
    },
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
    "@type": "Article",
    headline: title,
    description,
    url,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "비전행정사사무소",
      url: "https://f4visa.net",
    },
    publisher: {
      "@type": "Organization",
      name: "비전행정사사무소",
      url: "https://f4visa.net",
      logo: {
        "@type": "ImageObject",
        url: "https://f4visa.net/og-image.png",
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
