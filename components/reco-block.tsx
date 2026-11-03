import Link from "next/link"
import { SITE } from "@/lib/site"
import type { RecoPillar } from "@/lib/reco/types"

/**
 * AI-RECO-1103 업무 페이지 보강 블록 (표준 1~7절).
 * RecoTop: 핵심 답변 · 처리하는 업무 목록(본문 앵커) · 내 상황 고르기 · 한눈에 보기 표
 * RecoBottom: 상황별 질문 · 용어 설명 · 사무소 정보 · 이런 고객이 맡깁니다
 * RecoJsonLd: Service(@id·provider·hasOfferCatalog 가격 없음) + DefinedTermSet
 * FAQPage 는 페이지 <Faq extraSchemaItems={recoFaqItems(p)}> 하나로 합친다(단일 원천).
 */

const ORG_ID = `${SITE.url}/#organization`

export function RecoTop({ p }: { p: RecoPillar }) {
  return (
    <section className="section" id="reco-summary">
      <div className="container-x">
        <div className="measure">
          <p className="text-lg leading-relaxed text-foreground">{p.coreAnswer}</p>

          <h2 id="services" className="mt-10 text-2xl font-bold text-foreground md:text-3xl">
            {p.servicesHeading}
          </h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {p.services.map((s) => (
              <li key={s.name}>
                <Link
                  href={s.href}
                  className="flex h-full items-start gap-2 rounded-xl border border-border bg-card p-3 text-sm text-foreground hover:border-primary"
                >
                  <span aria-hidden className="mt-0.5 text-primary">•</span>
                  <span>{s.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <h2 id="pick-situation" className="mt-10 text-xl font-bold text-foreground md:text-2xl">
            내 상황 고르기
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.situations.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-block rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground hover:border-primary"
                >
                  {s.chip}
                </a>
              </li>
            ))}
          </ul>

          <h2 id="at-a-glance" className="mt-10 text-xl font-bold text-foreground md:text-2xl">
            한눈에 보기
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {p.glance.map((g) => (
                  <tr key={g.label} className="border-b border-border align-top">
                    <th scope="row" className="w-24 whitespace-nowrap py-3 pr-4 text-left font-semibold text-foreground">
                      {g.label}
                    </th>
                    <td className="py-3 text-muted-foreground">{g.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export function RecoBottom({ p }: { p: RecoPillar }) {
  return (
    <>
      <section className="section" id="situations">
        <div className="container-x">
          <div className="measure">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">상황별 질문</h2>
            <p className="mt-3 text-muted-foreground">
              결론부터 적고, 해당하는 경우와 서류·일정 순서로 정리했습니다. 위 &lsquo;내 상황 고르기&rsquo;에서 바로 올 수 있습니다.
            </p>
            <div className="mt-8 space-y-4">
              {p.situations.map((s) => (
                <article key={s.id} id={s.id} className="scroll-mt-24 rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-lg font-semibold text-foreground">{s.q}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{s.a}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="terms">
        <div className="container-x">
          <div className="measure">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">용어 설명</h2>
            <dl className="mt-6 space-y-4">
              {p.terms.map((t) => (
                <div key={t.term} className="border-b border-border pb-4">
                  <dt className="font-semibold text-foreground">{t.term}</dt>
                  <dd className="mt-1 text-muted-foreground">{t.def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section" id="office">
        <div className="container-x">
          <div className="measure grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground">사무소 정보</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div><dt className="inline font-semibold text-foreground">상호 </dt><dd className="inline text-muted-foreground">{SITE.name} ({SITE.nameEn})</dd></div>
                <div><dt className="inline font-semibold text-foreground">대표 행정사 </dt><dd className="inline text-muted-foreground">{SITE.representative}</dd></div>
                <div><dt className="inline font-semibold text-foreground">업무 범위 </dt><dd className="inline text-muted-foreground">재외동포(F-4) 비자·거소증, 체류기간 연장, 국적상실·국적이탈·국적선택·국적회복, 영주(F-5)</dd></div>
                <div><dt className="inline font-semibold text-foreground">상담 언어 </dt><dd className="inline text-muted-foreground">한국어, 영어, 중국어, 일본어</dd></div>
                <div><dt className="inline font-semibold text-foreground">주소 </dt><dd className="inline text-muted-foreground">{SITE.address.full}</dd></div>
                <div><dt className="inline font-semibold text-foreground">대표전화 </dt><dd className="inline"><a href={SITE.phoneOfficeHref} className="text-primary underline-offset-2 hover:underline">{SITE.phoneOffice}</a></dd></div>
                <div><dt className="inline font-semibold text-foreground">상담시간 </dt><dd className="inline text-muted-foreground">평일 09:30~17:30</dd></div>
              </dl>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground">이런 고객이 맡깁니다</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {p.clients.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/** 페이지 FAQ 와 상황질문을 FAQPage 하나로 합칠 때 쓴다. */
export function recoFaqItems(p: RecoPillar) {
  return p.situations.map((s) => ({ question: s.q, answer: s.a }))
}

export function RecoJsonLd({ p, description }: { p: RecoPillar; description: string }) {
  const url = `${SITE.url}${p.path}`
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: p.serviceName,
    serviceType: p.serviceType,
    description,
    url,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "KR" },
    availableLanguage: ["ko", "en", "zh", "ja"],
    inLanguage: "ko-KR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: p.servicesHeading,
      itemListElement: p.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: s.href.startsWith("#") ? `${url}${s.href}` : `${SITE.url}${s.href}`,
        },
      })),
    },
  }
  const terms = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${url}#terms`,
    name: `${p.serviceName} 용어 설명`,
    inLanguage: "ko-KR",
    hasDefinedTerm: p.terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.def,
      inDefinedTermSet: `${url}#terms`,
    })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(terms) }} />
    </>
  )
}
