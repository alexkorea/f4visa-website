// QA01-FIX3(맥7 2026-10-05) — /api/contact-step1 필수값 규칙.
// 블로그 인라인 폼은 이메일이 선택 칸이라, 예전처럼 email 을 필수로 막으면 이메일 없이 낸 상담이 400 으로 사라졌다.
// 이제 "email 또는 연락처(contact 전화/메신저 · snsType+snsId) 중 하나"만 있으면 받는다. 값이 있으면 형식은 그대로 본다.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// 전화번호·메신저 ID 공통: 줄바꿈 없이 2~60자, 글자나 숫자가 하나는 있어야 한다.
const CONTACT_RE = /^[^\r\n]{2,60}$/

export type Step1Check = { ok: true; email: string; contact: string } | { ok: false; error: string }

export function checkStep1(body: Record<string, unknown>): Step1Check {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")
  const name = str(body.name)
  const email = str(body.email)
  const contact = str(body.contact)
  const sns = str(body.snsType) && str(body.snsId)
  const services = body.services
  if (!name || !services || (Array.isArray(services) && services.length === 0)) {
    return { ok: false, error: "Missing required fields" }
  }
  if (!email && !contact && !sns) return { ok: false, error: "Email or contact required" }
  if (email && !EMAIL_RE.test(email)) return { ok: false, error: "Invalid email" }
  if (contact && (!CONTACT_RE.test(contact) || !/[\p{L}\p{N}]/u.test(contact))) {
    return { ok: false, error: "Invalid contact" }
  }
  return { ok: true, email, contact }
}
