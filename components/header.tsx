"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { SITE } from "@/lib/site"

type MenuItem = { title: string; href: string; children?: { title: string; href: string }[] }

const menuItems: MenuItem[] = [
  {
    title: "F-4 비자·거소증",
    href: "/f4-visa-resident-card",
    children: [
      { title: "F-4 비자와 거소증", href: "/f4-visa-resident-card" },
      { title: "F-4 비자 연장", href: "/f4-visa-renewal" },
      { title: "F-4 비자 종류", href: "/f4-visa-types" },
    ],
  },
  {
    title: "국적 업무",
    href: "/nationality-loss-report",
    children: [
      { title: "국적상실 신고", href: "/nationality-loss-report" },
      { title: "국적이탈 신고", href: "/nationality-renunciation-report" },
      { title: "국적선택·이중국적", href: "/nationality-selection-dual-nationality" },
      { title: "국적회복", href: "/nationality-recovery" },
    ],
  },
  { title: "영주권(F-5)", href: "/permanent-residency" },
  { title: "블로그", href: "/blog" },
  { title: "세금이야기", href: "/tax-stories" },
  { title: "사무소 소개", href: "/about" },
]

function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-[8px] text-lg font-bold"
        style={{ background: "var(--c-brand)", color: "var(--c-ink-invert)" }}
      >
        이
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`text-lg font-bold ${onDark ? "text-[var(--c-ink-invert)]" : "text-foreground"}`}>
          이룸
        </span>
        <span className="text-sm text-muted-foreground">행정사사무소</span>
      </span>
    </span>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [expanded, setExpanded] = React.useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="행정사사무소 이룸 홈" className="py-2">
          <Logo />
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden lg:flex items-center gap-2" aria-label="주요 메뉴">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.title)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex min-h-[44px] items-center gap-2 rounded-[8px] px-4 text-base font-semibold text-foreground hover:bg-secondary"
              >
                {item.title}
                {item.children && <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />}
              </Link>
              {item.children && openDropdown === item.title && (
                <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-[8px] border border-border bg-card py-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="flex min-h-[44px] items-center px-4 text-base text-foreground hover:bg-secondary"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* 데스크톱 CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href={SITE.phoneOfficeHref} className="btn btn-secondary">
            <Phone className="h-4 w-4" aria-hidden />
            {SITE.phoneOffice}
          </a>
          <Link href="/contact" className="btn btn-primary">
            상담문의
          </Link>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="메뉴 열기"
          aria-expanded={isOpen}
          className="flex h-[44px] w-[44px] items-center justify-center rounded-[8px] lg:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden />
        </button>
      </div>

      {/* 모바일 풀스크린 드로어 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="container-x flex h-16 shrink-0 items-center justify-between border-b border-border">
            <Logo />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="메뉴 닫기"
              className="flex h-[44px] w-[44px] items-center justify-center rounded-[8px]"
            >
              <X className="h-6 w-6" aria-hidden />
            </button>
          </div>

          <nav className="container-x flex-1 overflow-y-auto py-4" aria-label="모바일 메뉴">
            {menuItems.map((item) => (
              <div key={item.title} className="border-b border-border">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded(expanded === item.title ? null : item.title)}
                      aria-expanded={expanded === item.title}
                      className="flex min-h-[56px] w-full items-center justify-between text-left text-lg font-semibold"
                    >
                      {item.title}
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${expanded === item.title ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                    {expanded === item.title && (
                      <div className="pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="flex min-h-[48px] items-center pl-4 text-base text-muted-foreground"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-[56px] items-center text-lg font-semibold"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}

            <div className="mt-8 flex flex-col gap-4 pb-8">
              <Link href="/contact" onClick={() => setIsOpen(false)} className="btn btn-primary btn-block">
                상담문의
              </Link>
              <a href={SITE.phoneOfficeHref} className="btn btn-secondary btn-block">
                <Phone className="h-4 w-4" aria-hidden />
                {SITE.phoneOffice}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
