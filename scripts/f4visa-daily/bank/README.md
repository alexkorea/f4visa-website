# 원고 은행 (bank/)

`../run.mjs` 가 매일 19:00(daily-blog-4am.mjs) 이 폴더에서 **미발행 원고 1건**을 골라 발행한다. 본문은 생성하지 않는다 — 원고는 사람이 쓴다.

## 넣는 법
`bank/<slug>/` 폴더 하나 = 글 하나.
- `<locale>.md` — 사이트 로캘 전부 필요(f6visa ko·en·zh·ja·vi·th·ru / f4visa ko / investkorea ko·en·zh·ja). 하나라도 없으면 발행 안 함.
  frontmatter: `slug`(=폴더명) · `title` · `description` · `locale` · `keywords`. **date 는 쓰지 않는다**(발행일에 엔진이 넣는다).
  본문: `# 제목` → 본문 → `## 자주 묻는 질문`(로캘별 FAQ 제목) 아래 `### 질문` + 답 → 관련 안내 → 상담 안내.
- `meta.json` — `{ "order": 발행순서, "batch": "출처", "category": { "<locale>": "목록 배지" }, "visa": "F-6" }`
- `evidence.md` — 근거 대조표(발행하지 않음, 검수용).

## 규칙(엔진이 막는다 → rc=3, 그날 미발행)
slug 소문자·숫자·하이픈, 날짜 금지 / 사이트에 이미 있는 slug 는 거부(덮어쓰기·날짜 재발행 금지) /
C6 금지어(변호사·lawyer·律师·弁護士·luật sư·ทนาย 부분일치·адвокат·юрист 등, 예외 power of attorney) /
자사 요금(대행료·상담료·착수금 + 숫자) / 100%·최고·무조건·보장 / 등록 외 전화번호 / 비ko title·description 의 한글.

## 점검
`node ../run.mjs --list` 현황 · `node ../run.mjs --check-all` 미발행 전부 검사(무변경) · `node ../run.mjs --date=YYYY-MM-DD` dry-run.
최초 투입: 2026-10-03 맥3 W1·W2 각 10편(맥7 PASS). th 'บริษัทนายหน้า'→'ธุรกิจนายหน้า' 치환(C6 선례) 외 원문 무변경.
