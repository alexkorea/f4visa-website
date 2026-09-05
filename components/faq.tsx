export type FaqItem = { question: string; answer: string }

/**
 * FAQ (DESIGN.md v1.2) — 세로 Q/A 목록 단일 컴포넌트. 표 없음.
 * width: 'home' → 900px 중앙, 'article'(기본) → 780px 중앙.
 * FAQPage JSON-LD는 목록과 1:1.
 */
export function Faq({
  items,
  title = "자주 묻는 질문",
  withSchema = true,
  width = "article",
}: {
  items: FaqItem[]
  title?: string
  withSchema?: boolean
  width?: "home" | "article"
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }

  return (
    <section className="section section-alt">
      <div className="container-x">
        <div className={`faq-list${width === "home" ? " faq-list--home" : ""}`}>
          <h2>{title}</h2>
          <dl className="faq-items">
            {items.map((f) => (
              <div className="faq-item" key={f.question}>
                <dt className="faq-q">{f.question}</dt>
                <dd className="faq-a">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {withSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
    </section>
  )
}
