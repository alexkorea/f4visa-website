# WEBSITE STANDARD v2.0 — 사이트 제작·수정 영구 기본 규칙

적용 범위: 전 봇, 전 사이트, 신규 제작·재구축·부분 수정 전부.
이 문서와 `DESIGN.md` v1.1, `DESIGN_GUIDE.md` v1.0, ATOMIC FULL DEPLOY v1.0은 모든 웹사이트 작업의 전제 조건이며, 별도 지시가 없어도 항상 적용한다.

---

## 0. 대원칙 (하나라도 위반 시 작업 무효)

1. SEO 우선 설계: 디자인·코드 작성 전에 키워드·페이지 구조(IA)를 먼저 확정한다. SEO 없는 페이지는 만들지 않는다.
2. 모바일 우선: 모든 화면은 375px·390px에서 먼저 만들고 확인한 뒤 데스크톱으로 확장한다. 모바일 실브라우저 스크린샷 없이 완료 보고 금지.
3. 디자인 게이트: `DESIGN_GUIDE.md` 9장 채점 80점 미만이면 SEO 점수와 무관하게 미완료.
4. 원자적 전체 배포(ATOMIC FULL DEPLOY v1.0) 준수. 롤백 금지, forward 재빌드.
5. 스키마·메타·본문은 실제 내용과 일치. 없는 사례·수치·평가 생성 금지. 가격 비공개, CTA는 상담문의로 연결.
6. 사이트 우선순위: visaskorea.com → inhega.co.kr → 나머지. 디자인 기준 사이트는 visaskorea.com.

---

## 1. 문서 우선순위와 역할

| 순위 | 문서 | 담당 |
|---|---|---|
| 1 | `DESIGN.md` v1.1 | 색·서체·간격·라운드·컴포넌트 값. 작업 전 `npx @google/design.md lint DESIGN.md` 오류·경고 0 확인 |
| 2 | 이 문서 | SEO 구조·모바일 게이트·기술·CTA·측정·배포·보고 |
| 3 | `DESIGN_GUIDE.md` v1.0 | 레이아웃·타이포·컴포넌트 사용법·페이지 템플릿·금지목록·QA 채점표 |
| 4 | frontend-design 스킬 | 위 셋이 정하지 않은 축에서 템플릿 티 제거. 값·구조·문구 변경 권한 없음 |
| 5 | web-design-guidelines 스킬(Vercel) | 구현 완료 후 코드 검수 전용. file:line 결과 0건이어야 완료 |
| — | supanova-design-skill | 로드 금지 |

텍스트 소유권: title / description / H1 / H2 / 첫 문단 / FAQ / 본문은 SEO 소유. 디자인 단계에서 문구 변경 금지. 디자인이 쓰는 글은 히어로 보조문장·버튼 라벨·마이크로카피뿐.

---

## 2. 신규 사이트·재구축 시 작업 순서 (순서 변경 금지)

```
STEP 1  키워드·IA 설계: 타겟 언어별 핵심 키워드, Pillar/Cluster 구조, URL 체계, 페이지 목록
STEP 2  페이지 템플릿 정의: 페이지 유형별 SEO 구조(H1~H3, FAQ, CTA 위치) 문서화 — DESIGN_GUIDE 6장과 대응
STEP 3  DESIGN.md lint → 오류·경고 0
STEP 4  모바일(375) 화면 설계 → 데스크톱 확장
STEP 5  구현 (DESIGN.md 토큰·DESIGN_GUIDE 컴포넌트 외 스타일 금지)
STEP 6  QA: 5장 모바일 체크 + DESIGN_GUIDE 8·9장 + Vercel 검수 + 4장 기술 검증
STEP 7  ATOMIC FULL DEPLOY → 9장 형식으로 보고
```

---

## 3. 검색·AI 노출 (SEO + AEO + GEO + Entity/Schema)

- 페이지별 title(한글 60자·영문 70자 이내)·description(한글 80자·영문 160자 이내, CTA 동사 포함)·H1 유일. H1은 페이지당 1개. (inhega-blog-writer 스킬과 동일 기준)
- 도입부 3문장 룰: ① 결론/핵심 답변 ② 대상자/조건 ③ 다룰 범위. 이후 요건·절차·서류 순으로 전개. (inhega-blog-writer 스킬과 동일)
- FAQ 4~6개 + FAQPage JSON-LD. 질문은 실제 검색어 형태로. 블로그 글은 inhega-blog-writer 스킬의 구조(H1 → 도입부 → H2 5~7개 → FAQ → CTA → 관련 글)를 그대로 따른다.
- AI 인용 대응: 정의·요건·절차를 명확한 소제목+리스트로, 출처·최종수정일 표기.
- 스키마: Organization / Person(대표 행정사) / Service / Article / BreadcrumbList / FAQPage. 페이지 성격에 맞는 것만.
- 엔티티 일관성: 회사명·대표명·주소·전화·서비스명이 전 페이지·전 사이트 동일.
- 네이버 서치어드바이저 등록·사이트맵 제출·수집 확인 (구글과 별도).
- Local SEO: 구글 비즈니스 프로필·네이버 플레이스와 NAP 일치.
- 내부링크: 모든 글은 상위 Pillar 1개 + 관련 Cluster 2개 이상. 고아 페이지 0.
- 저자(행정사) 프로필·자격 표기, 실제 처리사례 서술, 최종 업데이트일 표기.

---

## 4. 기술 (Technical SEO + Indexing + WPO + Security)

- robots.txt / sitemap.xml / canonical / hreflang / redirect / 404 / noindex 점검.
- www↔apex 리다이렉트는 Cloudflare Redirect Rule로만 (Next.js has:host 조건 금지).
- Cache-Control: HTML `public,max-age=0,must-revalidate` / 정적자산 `immutable`.
- Core Web Vitals 모바일 기준: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.
- 이미지: WebP/AVIF, width·height 명시, lazy loading, srcset. 히어로 이미지만 `fetchpriority="high"`.
- 폰트: 페이지당 최대 2종, self-host 서브셋, `font-display: swap`, 히어로 서체 preload.
- JS 청크 404·유령 URL·고착 캐시 curl 확인.
- 단일 HTML 출력·Tailwind CDN·런타임 아이콘 스크립트·외부 플레이스홀더 이미지 금지.
- 보안: HTTPS·HSTS·보안 헤더, 폼 스팸 방지, 개인정보처리방침.

---

## 5. 모바일 필수 체크 (전부 통과해야 함)

- [ ] 브레이크포인트 375 / 390 / 768 / 1024 / 1440 전부 확인
- [ ] 가로 스크롤 없음 (html·body overflow-x 확인)
- [ ] 본문 16.5px 이상, 확대 없이 읽힘
- [ ] 터치 타겟 44×44px 이상, 간격 8px 이상
- [ ] 표는 세로 스택(FAQ) 또는 가로 스크롤 래퍼(데이터 표)
- [ ] 고정 헤더·하단 CTA 바가 본문·CTA·포커스 요소를 가리지 않음
- [ ] 폼: 입력 중 하단 CTA 바 숨김, 키보드가 제출 버튼을 가리지 않음, input type/inputmode/autocomplete 지정
- [ ] 이미지·영상·코드블록이 화면 폭을 넘지 않음
- [ ] 다국어 전환 메뉴 모바일 접근 가능
- [ ] 긴 URL·이메일 `overflow-wrap: anywhere`
- [ ] 히어로 제목 모바일 3줄 이내
- [ ] `env(safe-area-inset-bottom)` 반영
- [ ] 접근성: 대비 4.5:1, alt, 키보드 탐색, 폼 라벨, lang 속성 (WCAG 2.2)

---

## 6. 디자인 표준

→ `DESIGN.md` v1.1(값) + `DESIGN_GUIDE.md` v1.0(사용법·금지·채점표)로 대체. 이 문서에서는 정의하지 않는다.

---

## 7. 매출·측정·운영 (CRO + Analytics + i18n + Governance)

- 서비스 페이지 구조: 개요 → 요건 → 절차 → 기간 → 필요서류 → 사례 → FAQ → 전문가 → 상담 CTA
- 모바일 CTA: 하단 고정 바(전화 · 메신저 · 문의폼). 메신저는 언어별 1개 — 한국어 카카오톡, 중국어 WeChat, 일본어 LINE, 영어·러·베 WhatsApp
- 상담폼: 3~5개 필드, 모바일에서 1분 내 제출 가능
- 신뢰 요소를 CTA 근처 배치(자격·처리건수·사무소 정보) — 실제 자료가 있는 것만
- GA4 + 구글 서치콘솔 + 네이버 서치어드바이저 연결. 전환 이벤트: 전화 탭·메신저 탭·폼 제출·이메일 클릭, 디바이스별 분리 집계
- 다국어: 언어별 title·키워드·질문 방식·CTA 채널 개별 최적화, hreflang·canonical 정확. 번역문이 레이아웃을 깨지 않는지 언어별 스크린샷 확인(독·러·베트남어는 길이 30~40% 증가 고려)
- 주간 모니터링: 카나리아 → 실브라우저 렌더링(모바일+데스크톱) → 스캔 diff
- 분기별: 오래된 글 갱신, 중복 제거, 깨진 링크 점검, 법령·지침 변경 반영

---

## 8. 완료 인정 조건 (전부 충족)

- 5장 모바일 체크 전부 통과
- `DESIGN_GUIDE.md` 8장 금지목록 0건
- `DESIGN_GUIDE.md` 9장 80점 이상 (항목별 점수·근거 기재)
- web-design-guidelines 검수 0건
- `DESIGN.md` lint 오류·경고 0

---

## 9. 완료 보고 형식 (전부 첨부해야 완료 인정)

1. 변경 파일 목록과 변경 이유
2. 실브라우저 스크린샷: 모바일 375px·390px + 데스크톱 1440px (전체 페이지)
3. `DESIGN.md` lint 결과
4. web-design-guidelines 검수 결과
5. curl 6항목 production 200 검증 결과
6. Lighthouse 모바일 점수 4항목 (변경 전 → 후)
7. 스키마 검증 결과 (Rich Results Test)
8. `DESIGN_GUIDE.md` 9장 채점표 + 근거
9. 남은 문제·미해결 항목

---

## 10. 작업 우선순위

모바일 결함 → 디자인 QA 불합격 항목 → CRO → WPO → Entity/Schema → Trust → Analytics → Technical Indexing → Content Governance
