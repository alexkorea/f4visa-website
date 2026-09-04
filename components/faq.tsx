export type FaqItem = { question: string; answer: string }

/** FAQ 아코디언 + FAQPage 스키마 (본문과 스키마 내용 일치) */
export function Faq({
  items,
  title = "자주 묻는 질문",
  withSchema = true,
}: {
  items: FaqItem[]
  title?: string
  withSchema?: boolean
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
        <div className="measure">
          <h2>{title}</h2>
          <div className="mt-8">
            {items.map((f) => (
              <details key={f.question} className="faq-item">
                <summary>{f.question}</summary>
                <div>{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
      {withSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
    </section>
  )
}
