import Link from "next/link"
import { SITE } from "@/lib/site"

type BreadcrumbEntry = { label: string; path: string }

export function PageBreadcrumb({ items }: { items: BreadcrumbEntry[] }) {
  const allItems = [{ label: "홈", path: "/" }, ...items]

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.path === "/" ? SITE.url : `${SITE.url}${item.path}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <nav aria-label="현재 위치" className="container-x pt-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {allItems.map((item, idx) => (
            <li key={item.path} className="inline-flex items-center gap-2">
              {idx > 0 && <span aria-hidden="true">/</span>}
              {idx < allItems.length - 1 ? (
                <Link href={item.path} className="inline-flex min-h-[44px] items-center hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="inline-flex min-h-[44px] items-center font-semibold text-foreground" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
