import { NextResponse } from "next/server"
import * as nodemailer from "nodemailer"

const SITE_NAME = "F4Visa"
const SITE_NAME_KR = "F4비자"

function buildRows(fields: Record<string, string>): string {
  return Object.entries(fields)
    .map(([label, value]) => `<tr><td style="padding:8px 12px;font-weight:bold;border:1px solid #ddd;background:#f9f9f9;">${label}</td><td style="padding:8px 12px;border:1px solid #ddd;">${value || "-"}</td></tr>`)
    .join("\n")
}

async function sendEmail(fields: Record<string, string>, senderName: string, senderEmail: string): Promise<boolean> {
  const appPassword = process.env.GMAIL_APP_PASSWORD
  if (!appPassword) {
    console.error("[f4visa contact] GMAIL_APP_PASSWORD 미설정 — Gmail 알림 건너뜀")
    return false
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "teamone163@gmail.com",
      pass: appPassword,
    },
  })

  const rows = Object.entries(fields)
    .map(([label, value]) => `<tr><td style="padding:8px 12px;font-weight:bold;border:1px solid #ddd;background:#f9f9f9;">${label}</td><td style="padding:8px 12px;border:1px solid #ddd;">${value || "-"}</td></tr>`)
    .join("\n")

  const html = `
    <div style="font-family:'Apple SD Gothic Neo',sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1a56db;">[${SITE_NAME_KR}] 새 상담 신청</h2>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        ${rows}
      </table>
      <p style="color:#666;font-size:13px;">이 메일은 ${SITE_NAME} 웹사이트 상담 폼에서 자동 발송되었습니다.</p>
    </div>
  `

  await transporter.sendMail({
    from: { name: senderName + " via " + SITE_NAME, address: "teamone163@gmail.com" },
    to: "teamone163@gmail.com",
    replyTo: senderEmail || undefined,
    subject: `[${SITE_NAME_KR}] 새 상담 신청 - ${fields["이름"] || "고객"}`,
    html,
  })
  return true
}

// Gmail 앱 비밀번호가 없어 관리자 알림이 한 통도 안 나가고 있었다(2026-09-22 실측:
// f4visa-pages 의 env_vars 0개). 검증된 ko-visas.com 발신의 Resend 를 병행 경로로 둔다.
const RESEND_API_KEY = process.env.RESEND_API_KEY || ""
const NOTIFY_EMAIL = "5000meter@gmail.com"

async function sendResendAdmin(rows: string, name: string, email: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.error("[f4visa contact] RESEND_API_KEY 미설정 — Resend 알림 건너뜀")
    return false
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "행정사사무소 이룸 <noreply@ko-visas.com>",
        to: [NOTIFY_EMAIL],
        // 관리자가 '회신' 을 누르면 곧바로 고객에게 가도록 (이메일 없으면 생략)
        ...(email ? { reply_to: email } : {}),
        subject: `[${SITE_NAME_KR}] 새 상담 신청 - ${name || "고객"}`,
        html: `<div style="font-family:'Apple SD Gothic Neo',sans-serif;max-width:600px;margin:0 auto;">`
          + `<h2 style="color:#1a56db;">[${SITE_NAME_KR}] 새 상담 신청</h2>`
          + `<table style="width:100%;border-collapse:collapse;margin:16px 0;">${rows}</table></div>`,
      }),
    })
    if (!res.ok) { console.error("[f4visa contact] Resend", res.status, await res.text()); return false }
    return true
  } catch (e) {
    console.error("[f4visa contact] Resend error:", e)
    return false
  }
}


const NOTION_KEY = process.env.NOTION_API_KEY || ""
const NOTION_DB = "34c5bd7c-ac5a-81c2-8cf3-d43c63b67ed9"

async function saveToNotion(data: Record<string, string>): Promise<boolean> {
  if (!NOTION_KEY) {
    console.error("[f4visa contact] NOTION_API_KEY 미설정 — CRM 저장 건너뜀")
    return false
  }
  const today = new Date().toISOString().slice(0, 10)
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + NOTION_KEY,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DB },
      properties: {
        "이름": { title: [{ text: { content: data.name || "" } }] },
        "이메일": { email: data.email || null },
        "연락처": { phone_number: data.phone || null },
        "서비스": { rich_text: [{ text: { content: data.service || data.type || "" } }] },
        "메시지": { rich_text: [{ text: { content: data.message || "" } }] },
        "접수일": { date: { start: today } },
        "상태": { select: { name: "신규" } },
      },
    }),
  })
  if (!res.ok) { console.error("[f4visa contact] Notion", res.status, await res.text()); return false }
  return true
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: "invalid_json" }, { status: 400 })
  }
  if (body.website) return NextResponse.json({ success: true })

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")
  const name = str(body.name)
  const email = str(body.email)
  const phone = str(body.phone)
  const type = str(body.type)
  const message = str(body.message)

  // 빈 본문에도 200 {"success":true} 를 돌려주던 문제 — 맥7 E 지적(2026-09-22).
  // 연락 수단이 하나도 없으면 접수해도 회신할 방법이 없으므로 email|phone 중 하나는 필수.
  const missing: string[] = []
  if (!name) missing.push("name")
  if (!email && !phone) missing.push("email|phone")
  if (!message) missing.push("message")
  if (missing.length > 0) {
    return NextResponse.json(
      { success: false, error: "missing_required_fields", missing },
      { status: 400 }
    )
  }

  const text = `[F4Visa] 새 상담 문의

이름: ${name}
이메일: ${email || "-"}
전화번호: ${phone || "-"}
문의유형: ${type || "-"}
메시지: ${message}`

  const fields = {
    "이름": name,
    "이메일": email,
    "전화번호": phone,
    "문의유형": type,
    "메시지": message,
  }
  const rows = buildRows(fields)

  // 모든 경로의 응답을 확인한다. 예전 코드는 .catch() 만 걸어 두고 결과를 보지 않아
  // 세 경로가 전부 실패해도 고객에게는 "접수됐습니다" 가 떴다. (맥7 승인 정책 2026-09-22)
  const ok = async (label: string, p: Promise<Response>): Promise<boolean> => {
    try {
      const r = await p
      if (!r.ok) { console.error(`[f4visa contact] ${label}`, r.status, await r.text()); return false }
      return true
    } catch (e) { console.error(`[f4visa contact] ${label} error:`, e); return false }
  }

  const telegramP = ok("telegram", fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN || ""}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_GROUP_CHAT_ID || "-5295922532",
        text,
      }),
    }
  ))

  const gmailP = sendEmail(fields, name, email).catch((err) => {
    console.error("[f4visa contact] Gmail send error:", err)
    return false
  })

  const resendP = sendResendAdmin(rows, name, email)

  const notionP = saveToNotion({ name, email, phone, type, message, service: type }).catch((err) => {
    console.error("[f4visa contact] Notion error:", err)
    return false
  })

  const { saveToCRM } = await import("@/lib/notion-crm")
  const crmP = saveToCRM({
    brand: "f4visa", formType: "contact",
    siteUrl: "https://www.f4visa.net/contact",
    name, email, phone,
    serviceRaw: type, message,
    rawPayload: body,
  }).then(() => true).catch((err) => {
    console.error("[f4visa contact] CRM error:", err)
    return false
  })

  const intakeP = ok("intake", fetch("https://formconnection-crm.vercel.app/api/intake", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.INTAKE_API_KEY ? { "x-api-key": process.env.INTAKE_API_KEY } : {}),
    },
    body: JSON.stringify({
      site: "f4visa.net", language: "ko",
      name, email, phone,
      service_interest: type, message, raw_payload: body,
    }),
  }))

  const [telegramOk, gmailOk, resendOk, notionOk, crmOk, intakeOk] =
    await Promise.all([telegramP, gmailP, resendP, notionP, crmP, intakeP])

  const delivered = telegramOk || gmailOk || resendOk
  const stored = notionOk || crmOk || intakeOk

  if (!delivered && !stored) {
    console.error("[f4visa contact] 전 경로 실패 — 문의 유실 위험", { name, email, phone })
    return NextResponse.json(
      { success: false, error: "delivery_failed", message: "접수에 실패했습니다. 02-363-2251 로 연락 주세요." },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true, crm: stored, notified: delivered })
}
