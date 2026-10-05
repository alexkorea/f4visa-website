import Link from "next/link"

// QA01-FIX2(맥7 2026-10-05) — 문의 폼 개인정보 수집·이용 동의(필수).
// 체크박스는 name 이 없고 요청 body 에도 넣지 않는다 — /api/contact-step1·step2 계약은 그대로, 브라우저 required 로만 막는다.
// 보유기간은 /privacy 3항 "상담 완료 후 1년" 과 같아야 한다.
export function PrivacyConsent({ items, compact = false }: { items: string; compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-border bg-muted/40 text-xs leading-relaxed text-muted-foreground ${compact ? "mt-4 p-3" : "p-4"}`}>
      <p className="mb-1 text-sm font-semibold text-foreground">개인정보 수집·이용 동의</p>
      <ul className="space-y-0.5">
        <li><span className="font-medium text-foreground">수집 항목</span>: {items}</li>
        <li><span className="font-medium text-foreground">수집 목적</span>: 상담 신청 접수 및 회신</li>
        <li><span className="font-medium text-foreground">보유 기간</span>: 상담 완료 후 1년 보관 후 파기</li>
      </ul>
      <p className="mt-1">
        동의를 거부할 수 있으나, 거부하시면 상담 신청을 접수할 수 없습니다.{" "}
        <Link href="/privacy" className="inline-block py-1 font-medium text-primary underline underline-offset-2">개인정보처리방침</Link>
      </p>
      <label className="mt-1 flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
        <input type="checkbox" required className="h-6 w-6 shrink-0 accent-[var(--c-brand)]" />
        <span>개인정보 수집·이용에 동의합니다. (필수)</span>
      </label>
    </div>
  )
}
