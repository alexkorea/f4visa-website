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
          <div className="faq-table mt-8">
            <table className="faq-table-desktop">
              <thead>
                <tr>
                  <th>질문</th>
                  <th>답변</th>
                </tr>
              </thead>
              <tbody>
                {items.map((f) => (
                  <tr key={f.question}>
                    <td>{f.question}</td>
                    <td>{f.answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="faq-stack-mobile">
              {items.map((f) => (
                <div className="faq-stack-item" key={f.question}>
                  <p className="faq-q">{f.question}</p>
                  <p className="faq-a">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {withSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
    </section>
  )
}
