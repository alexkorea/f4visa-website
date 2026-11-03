export type FaqItem = { question: string; answer: string }

/**
 * FAQ (DESIGN.md v1.2 / DESIGN_GUIDE) — 세로 Q/A 목록. 표 없음.
 * 다른 섹션과 같은 왼쪽 선·같은 폭(container 100%). 섹션 헤더(eyebrow→h2→설명) 동일.
 * columns=2: 홈·서비스 데스크톱 2열 / columns=1: 정보 페이지 1열.
 * FAQPage JSON-LD는 목록과 1:1 (+ 같은 페이지에 보이는 상황별 질문 extraSchemaItems).
 */
export function Faq({
  items,
  title = "자주 묻는 질문",
  subtitle = "궁금한 점을 미리 확인하세요.",
  withSchema = true,
  columns = 2,
  extraSchemaItems = [],
}: {
  items: FaqItem[]
  title?: string
  subtitle?: string
  withSchema?: boolean
  columns?: 1 | 2
  /** AI-RECO-1103: 같은 페이지에 보이는 상황별 질문을 FAQPage 하나로 합친다(목록은 화면 그대로). */
  extraSchemaItems?: FaqItem[]
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...items, ...extraSchemaItems].map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }

  return (
    <section className="section section-alt">
      <div className="container-x">
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <dl className={`faq-items${columns === 2 ? " faq-items--2col" : ""}`}>
          {items.map((f) => (
            <div className="faq-item" key={f.question}>
              <dt className="faq-q">{f.question}</dt>
              <dd className="faq-a">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
      {withSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
    </section>
  )
}
