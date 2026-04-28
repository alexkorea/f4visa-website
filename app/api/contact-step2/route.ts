import { NextResponse } from "next/server"

const NOTION_KEY = process.env.NOTION_CRM_KEY || "' + (process.env.NOTION_CRM_KEY || '') + '"
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ""
const TELEGRAM_CHAT_ID = "5533847195"

async function notionReq(endpoint: string, method: string, body?: any) {
  const res = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    method,
    headers: { "Authorization": `Bearer ${NOTION_KEY}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.json()
}

function formatDetailsForDisplay(service: string, details: Record<string, string>, additionalMessage?: string): string {
  const fieldLabels: Record<string, string> = {
    residenceCountry: "현재 거주국", citizenshipCountry: "시민권 국가",
    militaryStatus: "병역 상태", nationalityLossComplete: "국적상실 완료 여부",
    visitDate: "한국 방문 예정일", koreaAddress: "한국 내 주소 확보",
    hostProvider: "숙소 제공자 유무", residenceCardType: "거소증 신규/갱신",
    citizenshipAcquiredCountry: "시민권 취득국", citizenshipDate: "시민권 취득일",
    nameChanged: "이름 변경 여부", currentCitizenship: "현재 시민권 국가",
    hasResidenceCard: "거소증 유무", koreanAbility: "한국어 능력",
    currentNationality: "현재 국적", age: "만 나이",
    inquiry: "문의 내용",
  }

  let text = `[F4Visa] 상세 상담 정보\n\n서비스: ${service}\n────────────\n`
  for (const [key, value] of Object.entries(details)) {
    if (value) { text += `${fieldLabels[key] || key}: ${value}\n` }
  }
  if (additionalMessage) text += `\n추가 메시지:\n${additionalMessage}`
  return text
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { inquiryId, service, details, additionalMessage } = body

    if (!service || !details) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 })
    }

    const detailsSummary = Object.entries(details as Record<string, string>)
      .filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(" | ")
    const fullSummary = additionalMessage ? `${detailsSummary} | 추가메시지: ${additionalMessage}` : detailsSummary

    const updatePromise = (async () => {
      if (inquiryId && NOTION_KEY) {
        try {
          await notionReq(`pages/${inquiryId}`, "PATCH", {
            properties: {
              "Form Type": { select: { name: "consultation_complete" } },
              "Quote Answers Summary": { rich_text: [{ text: { content: fullSummary.substring(0, 2000) } }] },
              "Message": { rich_text: [{ text: { content: (additionalMessage || "").substring(0, 2000) } }] },
            },
          })
        } catch (err) { console.error("Notion update error:", err) }
      }
    })()

    const telegramText = formatDetailsForDisplay(service, details, additionalMessage)
    const telegramPromise = fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: telegramText }) }
    ).catch((err) => console.error("Telegram error:", err))

    await Promise.all([updatePromise, telegramPromise])
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact step2 error:", error)
    return NextResponse.json({ ok: false, error: "Failed to process inquiry" }, { status: 500 })
  }
}
