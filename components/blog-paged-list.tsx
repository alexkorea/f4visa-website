import Link from "next/link"
import Image from "next/image"
import { Calendar, Tag } from "lucide-react"

export type BlogListItem = {
  slug: string
  title: string
  category: string
  image: string
  date: string
  excerpt: string
}

// F4-QA1102-FIX 2: 쪽 나누기를 서버에서 한다(?page=N 을 app/blog/page.tsx 가 읽어 그 쪽 글만 넘긴다).
// 예전엔 클라이언트가 첫 쪽을 그린 뒤 ?page 를 읽어 바꿔서, 크롤러·첫 화면에는 늘 1쪽만 보였고 canonical 도 모두 /blog 였다.
export const PAGE_SIZE = 16

export const blogPageHref = (n: number) => (n <= 1 ? "/blog" : `/blog?page=${n}`)

function buildPageList(current: number, total: number): (number | "...")[] {
  const want = new Set<number>([1, total, current, current - 1, current + 1])
  const arr = [...want].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const res: (number | "...")[] = []
  let prev = 0
  for (const n of arr) {
    if (n - prev > 1) res.push("...")
    res.push(n)
    prev = n
  }
  return res
}

export function BlogPagedList({ posts, page, totalPages }: { posts: BlogListItem[]; page: number; totalPages: number }) {
  const pageItems = posts
  const pageList = buildPageList(page, totalPages)

  const pageLinkBase =
    "inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"

  if (pageItems.length === 0) {
    return <p className="text-center text-muted-foreground">아직 게시글이 없습니다.</p>
  }

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {pageItems.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              {/* 목록 카드 썸네일 = og:image 의 800×450 카드판(THUMBNAIL_STANDARD 1장) */}
              <Image src={post.image.replace(/^(\/og\/.+)\.png$/, "$1-card.png")} alt={post.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
                {/* BEYE-1007-FIX #12: 분류 칩은 썸네일 위(제목 글자를 덮었다)가 아니라 카드 글 영역에 */}
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="블로그 페이지 목록">
          {page > 1 ? (
            <Link href={blogPageHref(page - 1)} rel="prev" className={pageLinkBase}>이전</Link>
          ) : (
            <span aria-disabled="true" className={`${pageLinkBase} opacity-40`}>이전</span>
          )}
          {pageList.map((n, i) =>
            n === "..." ? (
              <span key={`e${i}`} className="px-2 text-muted-foreground">
                …
              </span>
            ) : n === page ? (
              <span key={n} aria-current="page" className="inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-lg border border-primary bg-primary px-3 text-sm font-semibold text-primary-foreground">
                {n}
              </span>
            ) : (
              <Link key={n} href={blogPageHref(n)} className={pageLinkBase}>
                {n}
              </Link>
            )
          )}
          {page < totalPages ? (
            <Link href={blogPageHref(page + 1)} rel="next" className={pageLinkBase}>다음</Link>
          ) : (
            <span aria-disabled="true" className={`${pageLinkBase} opacity-40`}>다음</span>
          )}
        </nav>
      )}
    </>
  )
}
