import Link from "next/link"

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
      item: item.path === "/" ? "https://f4visa.net" : `https://f4visa.net${item.path}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <nav aria-label="breadcrumb" className="max-w-7xl mx-auto px-6 pt-24 pb-2">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          {allItems.map((item, idx) => (
            <li key={item.path} className="inline-flex items-center gap-1.5">
              {idx > 0 && <span className="text-gray-300" aria-hidden="true">/</span>}
              {idx < allItems.length - 1 ? (
                <Link href={item.path} className="hover:text-blue-600 transition-colors">{item.label}</Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
