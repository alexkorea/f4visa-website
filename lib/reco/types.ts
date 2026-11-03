/**
 * AI-RECO-1103 (보스 msg 4813·4816·4822·4823, 맥7 지시) — 업무 페이지(필러) 보강 데이터 형식.
 * 표준: NAS team-relay/ai-recommendation-standard.md 1~12절.
 * 사실 대조표(화면 문장 ↔ 매뉴얼·법령)는 보고서에만 둔다. 화면에 조문번호·확인일·근거 나열 금지.
 */
export type RecoService = {
  /** 정식 명칭. 비자는 "체류자격명(코드) + 업무" */
  name: string
  /** 본문 앵커(같은 페이지 상황질문 id 등) 또는 다른 업무 페이지 경로 */
  href: string
}

export type RecoSituation = {
  /** 앵커 id (s-로 시작) */
  id: string
  /** '내 상황 고르기' 칩에 쓰는 짧은 이름 */
  chip: string
  q: string
  /** 결론→갈래→서류→기간 순 */
  a: string
}

export type RecoTerm = { term: string; def: string }

export type RecoPillar = {
  path: string
  /** Service.name / serviceType */
  serviceName: string
  serviceType: string
  /** 첫 문단 직답 2~3문장 */
  coreAnswer: string
  /** '처리하는 업무' 소제목(주 키워드 포함) */
  servicesHeading: string
  services: RecoService[]
  /** 한눈에 보기: 대상·요건·절차·필요서류·처리기간 */
  glance: { label: string; value: string }[]
  situations: RecoSituation[]
  terms: RecoTerm[]
  /** 이런 고객이 맡깁니다 */
  clients: string[]
}
