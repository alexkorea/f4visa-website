"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const menuItems = [
  { title: "홈", href: "/" },
  {
    title: "국적상실",
    href: "/nationality-loss-report",
    children: [
      { title: "국적상실 신고", href: "/nationality-loss-report" },
      { title: "국적선택과 이중국적", href: "/nationality-selection-dual-nationality" },
    ],
  },
  {
    title: "F-4비자 거소증",
    href: "/f4-visa-resident-card",
    children: [
      { title: "F-4 비자 거소증", href: "/f4-visa-resident-card" },
      { title: "F-4 비자연장 절차", href: "/f4-visa-renewal" },
      { title: "국적이탈신고", href: "/nationality-renunciation-report" },
      { title: "F-4 비자 종류", href: "/f4-visa-types" },
    ],
  },
  { title: "영주권", href: "/permanent-residency" },
  { title: "국적회복", href: "/nationality-recovery" },
  {
    title: "자료실",
    href: "/blog",
    children: [
      { title: "거소증 서류확인", href: "/f4-residence-card-documents-checklist" },
      { title: "블로그", href: "/blog" },
    ],
  },
  { title: "상담문의", href: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const dropdownTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const handleMouseEnter = (title: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setOpenDropdown(title)
  }

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">V</span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold text-foreground">VISION</span>
            <span className="text-[10px] text-muted-foreground -mt-1">행정사사무소</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => item.children && handleMouseEnter(item.title)}
              onMouseLeave={() => item.children && handleMouseLeave()}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted"
              >
                {item.title}
                {item.children && <ChevronDown className="h-3 w-3" />}
              </Link>

              {item.children && openDropdown === item.title && (
                <div className="absolute left-0 top-full pt-1 z-50">
                  <div className="bg-background rounded-lg shadow-lg border border-border py-2 min-w-[220px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="tel:010-2081-3408" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>010-2081-3408</span>
            </a>
          </Button>
          <Button size="sm" asChild>
            <Link href="/contact">상담문의</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">메뉴</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {menuItems.map((item) => (
                <div key={item.title}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.title)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {item.title}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems.includes(item.title) && "rotate-180"
                          )}
                        />
                      </button>
                      {expandedItems.includes(item.title) && (
                        <div className="ml-4 flex flex-col gap-1 border-l border-border pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  상담문의
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <a href="tel:010-2081-3408" className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>010-2081-3408</span>
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
