import Link from "next/link"
import { Phone, ChevronDown } from "lucide-react"
import { SITE } from "@/lib/site"
import { MobileNav, type MenuItem } from "./mobile-nav"

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

function Logo() {
  return (
    <span className="flex items-center gap-2">
      {/* 40x40 으로 그려지는데 512px PNG(112KB) 를 받고 있었다. React 19 가 이 img 에
          High 우선순위 preload 를 붙여 임계경로 맨 앞을 차지했다(2026-09-26 실측 110KB/232ms).
          96px WebP(3.8KB) 로 교체. schema.org logo 는 /logo.png 그대로 둔다. */}
      <img src="/logo-eroom-20260926-96.webp" alt="행정사사무소 이룸" width={96} height={96}
           className="h-10 w-10 object-contain" />
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-bold text-foreground">이룸</span>
        <span className="text-sm text-muted-foreground">행정사사무소</span>
      </span>
    </span>
  )
}

/** 서버 컴포넌트 헤더. 데스크톱 드롭다운=CSS hover/focus-within(무JS), 모바일 드로어만 client(MobileNav). */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="행정사사무소 이룸 홈" className="py-2">
          <Logo />
        </Link>

        {/* 데스크톱 내비게이션 (CSS hover/focus-within 드롭다운) */}
        <nav className="hidden lg:flex items-center gap-2" aria-label="주요 메뉴">
          {menuItems.map((item) => (
            <div key={item.title} className="group relative">
              <Link
                href={item.href}
                className="flex min-h-[44px] items-center gap-2 rounded-[8px] px-4 text-base font-semibold text-foreground hover:bg-secondary"
              >
                {item.title}
                {item.children && <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />}
              </Link>
              {item.children && (
                <div className="absolute left-0 top-full z-50 hidden min-w-[240px] rounded-[8px] border border-border bg-card py-2 shadow-lg group-hover:block group-focus-within:block">
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

        {/* 모바일 드로어 (client) */}
        <MobileNav menuItems={menuItems} Logo={<Logo />} />
      </div>
    </header>
  )
}
