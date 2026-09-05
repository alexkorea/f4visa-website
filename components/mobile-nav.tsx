"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Phone } from "lucide-react"
import { SITE } from "@/lib/site"

export type MenuItem = { title: string; href: string; children?: { title: string; href: string }[] }

/** 모바일 드로어만 담당하는 최소 client 컴포넌트 (헤더 본체는 서버 렌더) */
export function MobileNav({ menuItems, Logo }: { menuItems: MenuItem[]; Logo: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [expanded, setExpanded] = React.useState<string | null>(null)

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="메뉴 열기"
        aria-expanded={isOpen}
        className="flex h-[44px] w-[44px] items-center justify-center rounded-[8px] lg:hidden"
      >
        <Menu className="h-6 w-6" aria-hidden />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden">
          <div className="container-x flex h-16 shrink-0 items-center justify-between border-b border-border">
            {Logo}
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
    </>
  )
}
