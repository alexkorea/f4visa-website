import { NextResponse } from "next/server"

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

    await fetch(
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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    )
  }
}
