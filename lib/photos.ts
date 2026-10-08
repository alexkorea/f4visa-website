// BEYE-1007-FIX #2·#3(맥7, 보스눈 QA 10-07): 홈 히어로·서비스 카드 6개·상세 5쪽 히어로 주제 사진.
// Pexels 실사진(AI 아님), 사이트 안 재사용 0(기존 public 이미지와 dHash 거리 ≥14), 원본 ≥3000px 에서 줄이기만 했다(업스케일 0).
// 인물 사진은 한국 작가가 한국에서 찍은 한국인만(d-types 안치흥·d-recovery 김대정) — 보스 msg 2836.
// 파일은 public/photos/<base>-<w>.webp (16:10). 출처: docs/IMAGE-CREDITS-photos.md
export type Photo = { base: string; widths: number[]; alt: string; pexelsId: number; credit: string }

export const PHOTOS: Record<string, Photo> = {
  "home-hero": { base: "/photos/f4-home-hero", widths: [640, 960, 1280, 1920], alt: "맑은 하늘 아래 서 있는 한국 전통 목조 누각과 돌 기단", pexelsId: 35396662, credit: "CK Seng" },
  "card-resident": { base: "/photos/f4-card-resident", widths: [400, 800], alt: "손에 든 신분증 크기의 카드와 책상 위 수첩·펜 — 거소증 발급 준비", pexelsId: 7318941, credit: "Angela Roma" },
  "card-renewal": { base: "/photos/f4-card-renewal", widths: [400, 800], alt: "달력의 30일에 펜으로 동그라미를 치는 손 — 체류기간 만료일 확인", pexelsId: 11773871, credit: "Towfiqu barbhuiya" },
  "card-nat-loss": { base: "/photos/f4-card-nat-loss-v2", widths: [400, 800], alt: "빈 서류를 갈색 서류 봉투에 넣는 두 손 — 국적상실 신고 서류 제출", pexelsId: 7318931, credit: "Angela Roma" },
  "card-nat-recovery": { base: "/photos/f4-card-nat-recovery", widths: [400, 800], alt: "태극 문양이 그려진 한국 전통 궁궐 대문", pexelsId: 34225794, credit: "FranKai Silva" },
  "card-permanent": { base: "/photos/f4-card-permanent", widths: [400, 800], alt: "서울 한강 변에 늘어선 아파트 단지", pexelsId: 27976252, credit: "fine studio" },
  "card-tax": { base: "/photos/f4-card-tax-v2", widths: [400, 800], alt: "공학용 계산기와 스프링 노트, 샤프펜슬 — 세금 계산 준비", pexelsId: 8250947, credit: "PNW Production" },
  "d-resident": { base: "/photos/f4-d-resident", widths: [640, 960, 1280, 1920], alt: "세계 지도 위에 놓인 미국 여권과 여행용품 — 해외 거주 동포의 입국 준비", pexelsId: 7662165, credit: "GeoJango Maps" },
  "d-renewal": { base: "/photos/f4-d-renewal", widths: [640, 960, 1280, 1920], alt: "신청서에 펜으로 서명하는 손 — 체류기간 연장 신청서 작성", pexelsId: 7567551, credit: "Tima Miroshnichenko" },
  "d-types": { base: "/photos/f4-d-types", widths: [640, 960, 1280, 1920], alt: "한복을 입고 웃는 한국 아기 — 재외동포의 직계비속", pexelsId: 28447574, credit: "An chi heung 안치흥" },
  "d-recovery": { base: "/photos/f4-d-recovery", widths: [640, 960, 1280, 1920], alt: "단풍 든 숲길을 함께 걷는 한국인 노부부", pexelsId: 18149636, credit: "대정 김" },
  "d-permanent": { base: "/photos/f4-d-permanent", widths: [640, 960, 1280, 1920], alt: "기와지붕 한옥이 늘어선 서울 골목길", pexelsId: 37394218, credit: "CK Seng" },
}

export function photoSrcSet(p: Photo): string {
  return p.widths.map((w) => `${p.base}-${w}.webp ${w}w`).join(", ")
}
