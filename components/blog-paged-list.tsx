"use client"

import { useEffect, useState } from "react"
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

const PAGE_SIZE = 16

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

export function BlogPagedList({ posts }: { posts: BlogListItem[] }) {
  const total = posts.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const [page, setPage] = useState(1)

  // 최초 마운트 시 URL ?page= 반영 (정적 페이지 유지 + 공유 가능)
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    const raw = parseInt(sp.get("page") ?? "1", 10)
    if (!Number.isNaN(raw)) setPage(Math.min(Math.max(raw, 1), totalPages))
  }, [totalPages])

  function goTo(n: number) {
    const next = Math.min(Math.max(n, 1), totalPages)
    setPage(next)
    const url = next === 1 ? "/blog" : `/blog?page=${next}`
    window.history.replaceState(null, "", url)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const start = (page - 1) * PAGE_SIZE
  const pageItems = posts.slice(start, start + PAGE_SIZE)
  const pageList = buildPageList(page, totalPages)

  const pageLinkBase =
    "inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"

  if (total === 0) {
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
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* 목록 카드 썸네일 = og:image 의 800×450 카드판(THUMBNAIL_STANDARD 1장) */}
              <Image src={post.image.replace(/^(\/og\/.+)\.png$/, "$1-card.png")} alt={post.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
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
          <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} className={`${pageLinkBase} disabled:opacity-40 disabled:cursor-not-allowed`}>
            이전
          </button>
          {pageList.map((n, i) =>
            n === "..." ? (
              <span key={`e${i}`} className="px-2 text-muted-foreground">
                …
              </span>
            ) : n === page ? (
              <span key={n} aria-current="page" className="inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg border border-primary bg-primary px-3 text-sm font-semibold text-primary-foreground">
                {n}
              </span>
            ) : (
              <button key={n} type="button" onClick={() => goTo(n)} className={pageLinkBase}>
                {n}
              </button>
            )
          )}
          <button type="button" onClick={() => goTo(page + 1)} disabled={page === totalPages} className={`${pageLinkBase} disabled:opacity-40 disabled:cursor-not-allowed`}>
            다음
          </button>
        </nav>
      )}
    </>
  )
}
