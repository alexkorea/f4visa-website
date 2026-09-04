/**
 * 사이트 단일 진실원천 (Single Source of Truth)
 * 회사명·연락처·주소는 반드시 여기서만 참조한다. (WEBSITE STANDARD v2.0 §2 엔티티 일관성)
 */
export const SITE = {
  name: "행정사사무소 이룸",
  nameEn: "EROOM Administrative Office",
  shortName: "이룸",
  url: "https://www.f4visa.net",
  domain: "f4visa.net",

  /** 대표 유선 (사무소) */
  phoneOffice: "02-363-2251",
  phoneOfficeHref: "tel:02-363-2251",
  phoneOfficeIntl: "+82-2-363-2251",
  /** 상담 휴대폰 (카카오톡 상담 동일 번호) */
  phoneMobile: "010-2081-3408",
  phoneMobileHref: "tel:010-2081-3408",

  email: "teamone163@gmail.com",
  emailHref: "mailto:teamone163@gmail.com",
  kakaoId: "alexkorea",

  address: {
    full: "서울특별시 중구 퇴계로 324, 3층 (성우빌딩)",
    street: "퇴계로 324, 3층 (성우빌딩)",
    locality: "중구",
    region: "서울특별시",
    postalCode: "04620",
    country: "KR",
  },

  businessNumber: "405-05-54079",
  representative: "이원중",
  privacyOfficer: "김영주",
  openingHours: "평일 09:30 ~ 18:30",

  /** 히어로 신뢰 요소 (실제 사실만 기재) */
  trustLine: "재외동포 행정 전문 · 해외 거주자 원격 진행 · 서류 해외 송달",
} as const

export const SERVICE_NAV = [
  { title: "F-4 비자·거소증", href: "/f4-visa-resident-card" },
  { title: "비자 연장", href: "/f4-visa-renewal" },
  { title: "국적상실·이탈", href: "/nationality-loss-report" },
  { title: "국적회복", href: "/nationality-recovery" },
  { title: "영주권(F-5)", href: "/permanent-residency" },
] as const
