import Link from "next/link"

// QA01-FIX2(맥7 2026-10-05) — 문의 폼 개인정보 수집·이용 안내.
// CONSENT-OPT-ALL(보스 2746·2748, 2026-10-07): 동의 체크 필수 폐지 — 고객이 체크를 못 보고 제출이 막혔다.
// 체크박스를 없애고 안내문(data-privacy-notice)만 둔다. 다시 required 체크로 되돌리지 말 것.
// 보유기간은 /privacy 3항 "상담 완료 후 1년" 과 같아야 한다.
export function PrivacyConsent({ items, compact = false }: { items: string; compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-border bg-muted/40 text-xs leading-relaxed text-muted-foreground ${compact ? "mt-4 p-3" : "p-4"}`}>
      <p className="mb-1 text-sm font-semibold text-foreground">개인정보 수집·이용 안내</p>
      <ul className="space-y-0.5">
        <li><span className="font-medium text-foreground">수집 항목</span>: {items}</li>
        <li><span className="font-medium text-foreground">수집 목적</span>: 상담 신청 접수 및 회신</li>
        <li><span className="font-medium text-foreground">보유 기간</span>: 상담 완료 후 1년 보관 후 파기</li>
      </ul>
      <p data-privacy-notice className="mt-1">
        문의 답변을 위해 이름·연락처를 수집하며{" "}
        <Link href="/privacy" className="inline-block py-1 font-medium text-primary underline underline-offset-2">개인정보처리방침</Link>에 따라 처리합니다.
      </p>
    </div>
  )
}
