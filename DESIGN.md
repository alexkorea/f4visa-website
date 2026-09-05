---
version: alpha
name: EROOM Administrative Office
description: 행정사사무소 이룸(f4visa.net) 디자인 시스템 v1.2 — 정체성만 이룸, 토큰은 VISION 표준
colors:
  primary: "#235099"
  primary-light: "#f0f4ff"
  accent: "#dc2626"
  accent-hover: "#b91c1c"
  background: "#ffffff"
  surface: "#f8fafc"
  surface-alt: "#fafbfc"
  text: "#1a1a1a"
  text-secondary: "#374151"
  text-muted: "#6b7280"
  border: "#e5e7eb"
  border-light: "#f1f5f9"
  warning: "#f59e0b"
  warning-bg: "#fffbeb"
  warning-text: "#92400e"
typography:
  display:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.02em
  h1:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.02em
  h2:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 19px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: -0.02em
  h3:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 17px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: -0.02em
  body:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 16.5px
    fontWeight: 400
    lineHeight: 1.9
  body-en:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 16.5px
    fontWeight: 400
    lineHeight: 1.7
  body-zh:
    fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 16.5px
    fontWeight: 400
    lineHeight: 1.9
  body-ja:
    fontFamily: "'Pretendard JP Variable', 'Pretendard JP', 'Noto Sans JP', 'Hiragino Sans', sans-serif"
    fontSize: 16.5px
    fontWeight: 400
    lineHeight: 1.9
  caption:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 13.5px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.02em
  button:
    fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1
rounded:
  sm: 6px
  md: 8px
  lg: 12px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 44px
  xl: 48px
  2xl: 64px
components:
  h2-bar:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.h2}"
    padding: 14px 24px
    rounded: "{rounded.sm}"
  h3-sub:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    typography: "{typography.h3}"
    padding: 6px 0 6px 14px
  table-header:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.caption}"
    padding: 11px 16px
  table-cell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    padding: 11px 16px
  table-row-even:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.text}"
  table-row-hover:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.text}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    typography: "{typography.button}"
    padding: 14px 32px
    rounded: "{rounded.md}"
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "#ffffff"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    padding: 13px 31px
    rounded: "{rounded.md}"
    height: 48px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    padding: "{spacing.md}"
    rounded: "{rounded.lg}"
  callout:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning-text}"
    padding: 16px 22px
    rounded: 0 8px 8px 0
  link:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
  text-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-secondary}"
  text-muted:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-muted}"
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  mobile-cta-bar:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    padding: "{spacing.xs} {spacing.sm}"
    height: 64px
  table-border:
    backgroundColor: "{colors.border-light}"
    height: 1px
  callout-bar:
    backgroundColor: "{colors.warning}"
    width: 4px
---

# 행정사사무소 이룸 Design System v1.2

## Overview

행정사사무소 이룸(EROOM Administrative Office, f4visa.net)의 디자인 시스템입니다. 색·서체·간격·컴포넌트는 VISION 표준을 따르고 회사 정체성만 이룸 고유값을 씁니다.
한국 비자·인허가 전문 서비스를 제공하는 6개 사이트에 일관된 브랜드 경험을 제공합니다.
전문적이고 신뢰감 있는 톤을 유지하면서, 한국어·영어·중국어·일본어 다국어 콘텐츠에 최적화되어 있습니다.

v1.2 변경: FAQ를 표에서 세로 Q/A 목록 단일 컴포넌트로 변경(f4visa 파일럿에서 표+목록 중복·폭 미충족 문제 확인).
v1.1 변경: v1.0은 블로그 포스트(본문) 규격만 정의했습니다. v1.1은 v1.0의 색·서체·컴포넌트 결정을 그대로 유지하고, 웹사이트 페이지 제작에 필요한 레이아웃·버튼·카드·모바일 토큰과 다국어 서체 슬롯을 추가했으며, `npx @google/design.md lint` 오류 0건이 되도록 토큰 구조를 스펙에 맞췄습니다. (v1.1 추가)로 표시된 항목은 새로 정한 값이므로 필요하면 조정합니다.

적용 범위: 이 파일이 색·서체·간격·컴포넌트의 최상위 기준입니다. 여기에 없는 항목(브레이크포인트 동작, 모션, SEO 구조, 검수)은 WEBSITE_STANDARD v2.0이 정합니다.

## Colors

- **Primary (#235099):** 진한 남색. 제목 배경 바, 테이블 헤더, 링크, 보조 버튼 텍스트·테두리. 보스 확정 색상.
- **Accent (#dc2626):** 빨간색. 기본 CTA 버튼 전용. 링크·아이콘·배경·강조 텍스트에 재사용 금지. 흰 텍스트 대비 4.83:1.
- **Background (#ffffff):** 순백. 본문 배경.
- **Surface (#f8fafc):** 연한 회색. 카드, TOC, 보조 영역 배경.
- **Text (#1a1a1a) / Text-secondary (#374151) / Text-muted (#6b7280):** 본문·보조·캡션. text-muted는 흰 배경 4.83:1, surface 배경 4.62:1로 AA 통과하지만 13.5px 캡션에는 text-secondary를 우선 사용.
- **Warning (#f59e0b / #fffbeb / #92400e):** 주의 안내 콜아웃 전용.
- **로고 주황 (#f36c24):** 로고 이미지 원본 색. 흰 배경 대비 3.01:1로 AA 미달이므로 UI 토큰에서 제외 — 텍스트·버튼·아이콘·배경에 사용 금지. (v1.1: v1.0의 brand.orange 토큰 제거)

### 금지 색상·표현
- 그라데이션 사용 금지 (단색만 사용). 구분선(divider)도 단색 #e5e7eb 1px로 통일 — v1.0의 hr 그라데이션은 이 규칙과 충돌하므로 제거. (v1.1)
- #3b82f6 (밝은 파란) 사용 금지
- #1a3d8f (너무 진한 남색) 사용 금지
- 다크모드 없음. 검정 배경 섹션 금지.

## Typography

**Pretendard Variable** — 한국어 + 영문 통합 폰트. 한국어·영어 사이트 전체에 사용.
본문 16.5px, line-height 1.9 — 한국어 가독성에 최적화된 설정.
`word-break: keep-all` — 한국어 단어가 중간에서 끊기지 않도록 필수 적용.
제목에는 `text-wrap: balance`, 숫자 열에는 `font-variant-numeric: tabular-nums`. (v1.1 추가)

### 언어별 서체 슬롯 (v1.1 추가)
Pretendard는 한자(중국어)를 포함하지 않으므로 언어별 body 토큰을 사용합니다.
- 한국어: `typography.body` (Pretendard, line-height 1.9)
- 영어: `typography.body-en` (Pretendard, line-height 1.7 — 라틴 문자에 1.9는 과다)
- 중국어: `typography.body-zh` (Noto Sans SC, `word-break: normal`)
- 일본어: `typography.body-ja` (Pretendard JP 우선, 없으면 Noto Sans JP)
- 러시아어·베트남어: `typography.body-en` 설정을 따르되 Pretendard 미지원 글리프는 Noto Sans 폴백
- 서브셋 폰트 self-host, `font-display: swap`. 한 페이지에 서체 2종 초과 금지.

### 크기 스케일
display 40 / h1 32 / h2 19 / h3 17 / body 16.5 / caption 13.5 / button 16 (px). 이 외 크기 사용 금지. 모바일에서 display는 28px, h1은 26px로 축소. 최소 텍스트 크기 13.5px — 그 이하 금지. (v1.1 추가)

### 회사명 다국어 표기
- 한국어: 행정사사무소 이룸
- 영어: EROOM Administrative Office
- 대표: 이시정 대표행정사(leesj.jpg) / 이원중 행정사 · 이메일 teamone163@gmail.com · f4visa.net

## Layout

**본문(article) 폭 780px** — 블로그 포스트·정보 페이지 본문. v1.0 유지.
**페이지 컨테이너 폭 1200px** — 홈·서비스 소개·목록 등 웹사이트 페이지의 바깥 컨테이너. 본문 텍스트 블록은 그 안에서 780px을 넘지 않는다. (v1.1 추가)
섹션 간격 44px (`spacing.lg`) — 본문 H2 섹션 사이 총 거리.
웹사이트 페이지의 큰 섹션 사이 **총 거리**(위 섹션 마지막 요소 하단 → 아래 섹션 첫 요소 상단): 데스크톱 64px, 모바일 48px. 구현은 각 섹션 padding-top/bottom 32px(모바일 24px)로 하고, 섹션 안 제목 블록의 margin은 이 거리에 더하지 않는다(h2 margin-top 0). 배경색이 바뀌는 섹션도 같은 값. (v1.2: 96/64 → 64/48, 총 거리 기준으로 정의)
H2 제목 위 여백 44px, 아래 여백 20px.
테이블은 전체 폭 사용.
간격은 spacing 스케일(8·16·24·44·64·96)만 사용. (v1.1 추가)

### 브레이크포인트 (v1.1 추가)
375 / 390 / 768 / 1024 / 1440px. 모바일(768 미만)은 1열, 좌우 패딩 16px. 12컬럼 그리드, 카드 열은 모바일 1 / 태블릿 2 / 데스크톱 3.

## Elevation & Depth

CTA 버튼: `box-shadow: 0 4px 14px rgba(220, 38, 38, 0.25)`
호버 시: `box-shadow: 0 8px 20px rgba(220, 38, 38, 0.35)` + `translateY(-2px)`, `transition: transform 0.2s ease, box-shadow 0.2s ease` (`transition: all` 금지).
테이블 행 호버: `transition: background-color 0.2s ease`.
카드: 그림자 없음, 테두리 `1px solid {colors.border}`. 그림자는 CTA 버튼에만 허용. (v1.1 추가)
`prefers-reduced-motion: reduce`에서 모든 transform 애니메이션 해제. (v1.1 추가)

## Shapes

sm 6px — H2 바, 태그. md 8px — 버튼, 입력폼, 이미지. lg 12px — 카드. 이 세 값 외 radius 금지. 알약형(rounded-full) 버튼 금지.

## Components

### H2 Section Heading (`h2-bar`)
파란 배경 바 (#235099) + 흰색 텍스트. 둥근 모서리 6px.
블로그 포스트·정보 페이지 본문의 주요 섹션 구분에 사용.
홈·서비스 소개 등 웹사이트 페이지에서는 배경 바 없이 `typography.h1`/`display` 크기의 일반 제목을 사용한다 — 페이지 전체에 파란 바가 반복되면 블로그 템플릿처럼 보이기 때문. (v1.1 추가)

### H3 Sub Heading (`h3-sub`)
왼쪽 파란 바 (4px solid #235099) + 투명 배경.
H2 하위의 세부 항목 구분에 사용.

### FAQ (`faq-item`) (v1.2 변경)
FAQ는 표가 아니라 **세로 Q/A 목록 하나**로만 만든다. 데스크톱·모바일 동일 구조, DOM에 한 번만 존재.
- 질문: `typography.h3` 크기, 700, `colors.primary`. 앞에 "Q." 접두 없이 질문문 그대로.
- 답변: `typography.body`, `colors.text`. 질문 아래 8px, 항목 사이 24px, 항목 구분은 `1px solid {colors.border}` 하단선.
- 컨테이너 폭을 100% 채운다 (홈은 1200px 안에서 최대 900px 중앙, 정보 페이지는 본문 780px).
- 항목이 8개를 넘을 때만 `<details>` 아코디언 허용. 그 외엔 펼친 상태.
- 파란 헤더 바, 2열 표, 짝수 행 배경, 호버 색 — FAQ에는 사용 금지. 두 버전(표+목록)을 DOM에 함께 넣고 CSS로 숨기는 방식 금지.
- FAQPage JSON-LD의 Q/A는 이 목록과 1:1 일치.

### Data Table (`table-header`, `table-cell`, `table-row-even`, `table-row-hover`)
비교·수치 데이터 전용 (예: F-4 vs F-5 비교, 필요서류 목록). 헤더 파란 배경 + 흰색 텍스트, 짝수 행 #fafbfc, 호버 #f0f4ff, 폭 100%.
모바일(768 미만): 가로 스크롤 래퍼 적용. FAQ에는 쓰지 않는다.

### CTA Button (`button-primary`)
빨간 배경 (#dc2626) + 흰색 텍스트. 패딩 14px 32px, 둥근 모서리 8px, 높이 48px.
호버 시 어두운 빨강 (#b91c1c) + 위로 2px 이동 + 그림자 강화. focus-visible 링 2px primary.
히어로에 1개, 각 섹션 끝 최대 1개.

### Secondary Button (`button-secondary`) (v1.1 추가)
흰 배경 + primary 텍스트 + `1px solid {colors.primary}` 테두리. 호버 시 배경 primary-light. "자세히 보기" 등 보조 행동에 사용.

### Card (`card`) (v1.1 추가)
surface 배경, 24px 패딩, 12px 라운드, `1px solid {colors.border}`. 서비스 목록·사례 등 병렬 항목에만 사용. 절차·설명·FAQ는 카드로 감싸지 않는다.

### Callout (`callout`)
왼쪽 4px 주황 바 (#f59e0b) + #fffbeb 배경 + #92400e 텍스트. 주의사항·법령 변경 안내 전용.

### Link (`link`)
primary 색, 밑줄. 방문 후 색 변화 없음. 외부 정부·공식 출처 링크는 새 창.

### Mobile CTA Bar (`mobile-cta-bar`) (v1.1 추가)
모바일 하단 고정 바, 높이 64px, 흰 배경 + 상단 1px border. 전화·메신저(언어별 1개)·문의폼 3개 버튼. `env(safe-area-inset-bottom)` 반영. 폼 입력 중에는 숨김.

### QR Code Block (WordPress)
4개 QR 코드 (카카오톡, 웨이신, LINE, 왓츠앱) 가로 배치. 모바일은 2×2.
각 QR 코드 140x140px, 둥근 모서리 8px.
한국어 + 영문 라벨.

### Navigation (v1.1 추가)
상단 고정 헤더, 흰 배경, 하단 1px border. 로고 왼쪽, 메뉴 5~7개, 언어 전환 우측 끝. 모바일은 풀스크린 드로어. 유리효과·떠 있는 알약형 내비 금지.

## Do's and Don'ts

### Do's
- 단일 액센트 색상 (#dc2626 빨강) 사용
- Pretendard 폰트 통일 (중국어 페이지는 Noto Sans SC)
- word-break: keep-all 적용 (한국어·일본어)
- 한 줄에 한 문장 (마침표/물음표 후 줄바꿈)
- 정부/공식 출처 외부링크 포함
- FAQ는 세로 Q/A 목록 하나로 (표 금지, DOM 중복 금지)
- 모든 이미지에 width·height·alt 지정

### Don'ts
- 그라데이션 사용 금지
- 가격/수수료 금액 명시 금지
- HTML 코드를 마크다운에 혼합 금지
- 같은 사진 재사용 금지
- 회사명은 행정사사무소 이룸 / EROOM Administrative Office로 통일
- 일본어에서 行政士 사용 금지 (行政書士만 사용)
- 지어낸 고객명·후기·별점·처리건수·긴급성 문구 금지 (v1.1 추가)
- 다크 배경 섹션, 유리효과, 노이즈 오버레이, 무한 애니메이션 금지 (v1.1 추가)
- 이모지를 아이콘으로 사용 금지, 아이콘 세트는 1종 선형 (v1.1 추가)
- 대문자 tracking 아이브로우 배지, 13.5px 미만 텍스트 금지 (v1.1 추가)
