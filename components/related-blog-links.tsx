import Link from "next/link"

export type RelatedBlogLink = { slug: string; label: string; note?: string }

/**
 * 서비스 허브 본문(<main>) → 관련 블로그 링크 (검색노출 지침 12장: 허브마다 3개, 키워드형 앵커).
 * 카니발 묶음에서는 대표 글 1편만 고른다. slug 는 lib/blog-redirects.mjs 의 301 원본이 아니어야 한다.
 */
export function RelatedBlogLinks({
  title = "함께 보면 좋은 블로그 글",
  links,
}: {
  title?: string
  links: RelatedBlogLink[]
}) {
  return (
    <section className="section">
      <div className="container-x">
        <div className="section-head">
          <span className="eyebrow">Blog</span>
          <h2>{title}</h2>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {links.map((l) => (
            <li key={l.slug} className="rounded-2xl border border-border bg-card p-6">
              <Link href={`/blog/${l.slug}`} className="font-semibold text-foreground hover:text-primary hover:underline">
                {l.label}
              </Link>
              {l.note && <p className="mt-2 text-sm text-muted-foreground">{l.note}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
