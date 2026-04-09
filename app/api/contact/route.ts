import { NextResponse } from "next/server"
import * as nodemailer from "nodemailer"

const SITE_NAME = "F4Visa"
const SITE_NAME_KR = "F4비자"

async function sendEmail(fields: Record<string, string>, senderName: string, senderEmail: string) {
  const appPassword = process.env.GMAIL_APP_PASSWORD
  if (!appPassword) {
    console.warn("GMAIL_APP_PASSWORD not set — skipping email notification")
    return
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "5000meter@gmail.com",
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
    from: { name: senderName + " via " + SITE_NAME, address: "5000meter@gmail.com" },
    to: "5000meter@gmail.com",
    replyTo: senderEmail,
    subject: `[${SITE_NAME_KR}] 새 상담 신청 - ${fields["이름"] || "고객"}`,
    html,
  })
}


const NOTION_KEY = process.env.NOTION_API_KEY || ""
const NOTION_DB = "33d557c9-c8f8-816f-b0e5-d58765b53a3f"

async function saveToNotion(data: Record<string, string>) {
  if (!NOTION_KEY) return
  const today = new Date().toISOString().slice(0, 10)
  await fetch("https://api.notion.com/v1/pages", {
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
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, type, message } = body

    const text = `[F4Visa] 새 상담 문의

이름: ${name || "-"}
이메일: ${email || "-"}
전화번호: ${phone || "-"}
문의유형: ${type || "-"}
메시지: ${message || "-"}`

    // Telegram notification
    const telegramPromise = fetch(
      `https://api.telegram.org/bot8748564690:AAEGsXxcfqrHmGue8lkqUaa2E0Q8CDCY-Eo/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: "5533847195",
          text,
        }),
      }
    )

    // Email notification
    const emailPromise = sendEmail({
      "이름": name,
      "이메일": email,
      "전화번호": phone,
      "문의유형": type,
      "메시지": message,
    }, name, email).catch((err) => console.error("Email send error:", err))

    // Notion save
    const notionPromise = saveToNotion(body).catch((err) => console.error("Notion error:", err))

    await Promise.all([telegramPromise, emailPromise, notionPromise])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    )
  }
}
