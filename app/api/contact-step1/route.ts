import { NextResponse } from "next/server"
import { saveToCRM } from "@/lib/notion-crm"

const RESEND_API_KEY = process.env.RESEND_API_KEY || ""
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ""
const TELEGRAM_CHAT_ID = "5533847195"

function buildEmailHtml(name: string, services: string[], inquiryId: string): string {
  const serviceParam = encodeURIComponent(services.join(","))
  const step2Url = `https://f4visa.net/contact/step2?service=${serviceParam}&inquiryId=${inquiryId}`

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background-color:#1e3a5f;padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:1px;">VISION</h1>
            <p style="margin:6px 0 0;color:#94b8d6;font-size:13px;">행정사사무소</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 8px;color:#1e3a5f;font-size:22px;font-weight:700;">${name}님, 비전행정사사무소에 상담요청해 주셔서 감사합니다.</h2>
            <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">
              상담 신청이 접수되었습니다.<br/>맞춤 상담을 위해 아래 추가 정보를 입력해주세요.
            </p>
            <div style="margin-bottom:24px;">
              <p style="margin:0 0 8px;color:#888;font-size:13px;">신청 서비스:</p>
              <p style="margin:0;color:#1e3a5f;font-size:14px;font-weight:600;">${services.join(" / ")}</p>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td align="center" style="padding:8px 0 24px;">
                <a href="${step2Url}" style="display:inline-block;background-color:#1e3a5f;color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-size:16px;font-weight:700;">상세 정보 입력하기 &rarr;</a>
              </td></tr>
            </table>
            <p style="margin:0;text-align:center;color:#999;font-size:13px;">약 1분 소요</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#f8f9fb;padding:24px 40px;border-top:1px solid #eee;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="color:#888;font-size:13px;line-height:1.8;">
                <strong style="color:#1e3a5f;">VISION 행정사사무소</strong><br/>전화: 02-363-2251<br/>카카오톡: alexkorea<br/>서울특별시 중구 퇴계로 324, 3층
              </td></tr>
            </table>
          </td>
        </tr>
      </table>
      <p style="margin:24px 0 0;color:#bbb;font-size:11px;text-align:center;">본 메일은 f4visa.net 상담 신청에 의해 자동 발송되었습니다.</p>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, contact, snsType, snsId, nationality, services } = body

    if (!name || !email || !services || services.length === 0) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    const serviceRaw = Array.isArray(services) ? services.join(", ") : services
    const messageParts: string[] = []
    if (snsType && snsId) messageParts.push(`SNS: ${snsType} - ${snsId}`)
    if (nationality) messageParts.push(`국적: ${nationality}`)
    const message = messageParts.length > 0 ? messageParts.join(" | ") : undefined

    const crmResult = await saveToCRM({
      brand: "f4visa",
      formType: "consultation_step1",
      siteUrl: "https://f4visa.net/contact",
      name, email, phone: contact || undefined,
      nationality: nationality || undefined,
      serviceRaw, message,
      rawPayload: { name, email, contact, snsType, snsId, nationality, services },
    })

    const inquiryId = crmResult.inboxId || `f4v-${Date.now()}`

    const emailPromise = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "비전행정사사무소 <noreply@ko-visas.com>",
        to: [email],
        subject: "[비전행정사사무소] 비전행정사사무소에 상담요청해 주셔서 감사합니다.",
        html: buildEmailHtml(name, Array.isArray(services) ? services : [services], inquiryId),
      }),
    }).catch((err) => console.error("Resend email error:", err))

    const svcList = Array.isArray(services) ? services.join(", ") : services
    let telegramText = `[F4Visa] 새 상담 신청\n\n`
    telegramText += `이름: ${name}\n이메일: ${email}\n`
    if (contact) telegramText += `연락처: ${contact}\n`
    if (snsType && snsId) telegramText += `SNS: ${snsType} - ${snsId}\n`
    if (nationality) telegramText += `국적: ${nationality}\n`
    telegramText += `희망 업무: ${svcList}\n`

    const telegramPromise = fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramText }) }
    ).catch((err) => console.error("Telegram error:", err))

    await Promise.all([emailPromise, telegramPromise])
    return NextResponse.json({ ok: true, inquiryId })
  } catch (error) {
    console.error("Contact step1 error:", error)
    return NextResponse.json({ ok: false, error: "Failed to save inquiry" }, { status: 500 })
  }
}
