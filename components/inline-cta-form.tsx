"use client"

import { PrivacyConsent } from "@/components/privacy-consent"
import { useState, FormEvent } from "react"

export function InlineCTAForm() {
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [missing, setMissing] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    // 서버(/api/contact-step1)와 같은 규칙: 이메일 또는 연락처(전화·메신저) 중 하나는 있어야 회신할 수 있다.
    if (!contact.trim() && !email.trim()) { setMissing(true); return }
    setMissing(false)
    setStatus("loading")
    try {
      const res = await fetch("/api/contact-step1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          email: email.trim(),
          services: ["블로그 문의"],
          source: "blog-inline",
        }),
      })
      if (!res.ok) throw new Error("fail")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="my-10 rounded-xl border-2 border-border bg-secondary p-6 text-center">
        <p className="text-lg font-semibold text-foreground">신청 완료! 곧 연락드리겠습니다.</p>
      </div>
    )
  }

  return (
    <div className="my-10 rounded-xl border-2 border-border bg-secondary/60 p-6 md:p-6">
      <h3 className="mb-4 text-lg font-bold text-foreground">
        30초 빠른 상담 신청
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-3">
          <input
            type="text"
            placeholder="이름 *"
            aria-label="이름"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-lg border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="연락처 (전화·메신저 ID)"
            aria-label="연락처 (전화·메신저 ID)"
            aria-describedby="inline-cta-reach-hint"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="h-11 rounded-lg border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            placeholder="이메일"
            aria-label="이메일"
            aria-describedby="inline-cta-reach-hint"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-lg border border-border bg-white px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <p id="inline-cta-reach-hint" className={`mt-2 text-xs ${missing ? "font-semibold text-destructive" : "text-muted-foreground"}`} role={missing ? "alert" : undefined}>
          연락처(전화·메신저 ID) 또는 이메일 중 하나는 꼭 적어 주세요. 적어 주신 방법으로 회신드립니다.
        </p>
        <PrivacyConsent compact items="이름, 연락처, 이메일" />
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-4 h-11 w-full rounded-lg bg-[#f36c24] text-sm font-semibold text-white transition-colors hover:bg-[#d95b1a] disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {status === "loading" ? "전송 중..." : "상담 신청"}
        </button>
        {status === "error" && (
          <p className="mt-2 text-sm text-destructive">전송에 실패했습니다. 다시 시도해주세요.</p>
        )}
      </form>
    </div>
  )
}
