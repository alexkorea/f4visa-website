"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Button } from "@/components/ui/button"

type FieldDef = {
  name: string
  label: string
  type: "text" | "select" | "textarea" | "radio"
  options?: string[]
  placeholder?: string
  required?: boolean
}

const serviceFields: Record<string, FieldDef[]> = {
  "F-4 비자/거소증": [
    { name: "residenceCountry", label: "현재 거주국", type: "text", placeholder: "예: 미국, 일본, 캐나다", required: true },
    { name: "citizenshipCountry", label: "시민권 국가", type: "text", placeholder: "예: 미국, 캐나다", required: true },
    { name: "militaryStatus", label: "병역 상태 (남성)", type: "select", options: ["해당 없음 (여성)", "면제", "미필", "복무 완료", "영주권자 면제"], required: true },
    { name: "nationalityLossComplete", label: "국적상실 완료 여부", type: "radio", options: ["예", "아니오", "진행 중", "모름"], required: true },
    { name: "koreaAddress", label: "한국 내 주소 확보 여부", type: "radio", options: ["예", "아니오"], required: true },
    { name: "hostProvider", label: "숙소 제공자 유무", type: "radio", options: ["예", "아니오"], required: false },
    { name: "residenceCardType", label: "거소증 신규/갱신", type: "radio", options: ["신규 발급", "갱신"], required: true },
    { name: "visitDate", label: "한국 방문 예정일", type: "text", placeholder: "예: 2026년 6월", required: false },
  ],
  "국적상실 신고": [
    { name: "citizenshipAcquiredCountry", label: "시민권 취득국", type: "text", placeholder: "예: 미국, 캐나다", required: true },
    { name: "citizenshipDate", label: "시민권 취득일", type: "text", placeholder: "예: 2020년 3월", required: true },
    { name: "nameChanged", label: "이름 변경 여부", type: "radio", options: ["예", "아니오"], required: true },
  ],
  "국적회복/복수국적": [
    { name: "currentCitizenship", label: "현재 시민권 국가", type: "text", placeholder: "예: 미국, 캐나다", required: true },
    { name: "hasResidenceCard", label: "거소증 유무", type: "radio", options: ["예", "아니오"], required: true },
    { name: "militaryStatus", label: "병역 상태 (남성)", type: "select", options: ["해당 없음 (여성)", "면제", "미필", "복무 완료"], required: true },
    { name: "age", label: "만 나이", type: "text", placeholder: "예: 32", required: true },
    { name: "koreanAbility", label: "한국어 능력", type: "select", options: ["원어민", "유창", "중급", "초급", "없음"], required: false },
  ],
  "F-5 영주권": [
    { name: "currentVisa", label: "현재 비자 종류", type: "select", options: ["F-4 (재외동포)", "F-2 (거주)", "기타"], required: true },
    { name: "stayDuration", label: "한국 체류 기간", type: "select", options: ["1년 미만", "1~3년", "3~5년", "5년 이상"], required: true },
    { name: "koreanAbility", label: "한국어 능력", type: "select", options: ["TOPIK 없음", "TOPIK 1~2급", "TOPIK 3~4급", "TOPIK 5~6급", "사회통합프로그램 이수"], required: false },
    { name: "income", label: "연간 소득 수준", type: "select", options: ["3,000만 원 미만", "3,000만 ~ 5,000만 원", "5,000만 원 이상"], required: true },
    { name: "criminalRecord", label: "한국 내 범죄/벌금 이력", type: "radio", options: ["없음", "있음"], required: true },
  ],
  "기타": [
    { name: "inquiry", label: "문의 내용", type: "textarea", placeholder: "궁금하신 내용을 자유롭게 작성해주세요.", required: true },
  ],
}

function getFieldsForServices(serviceList: string[]): { service: string; fields: FieldDef[] }[] {
  const sections: { service: string; fields: FieldDef[] }[] = []
  const usedFieldNames = new Set<string>()
  for (const svc of serviceList) {
    const allFields = serviceFields[svc] || serviceFields["기타"]
    const uniqueFields = allFields.filter((f) => {
      if (usedFieldNames.has(f.name)) return false
      usedFieldNames.add(f.name)
      return true
    })
    if (uniqueFields.length > 0) sections.push({ service: svc, fields: uniqueFields })
  }
  return sections
}

function Step2Form() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get("service") || ""
  const inquiryId = searchParams.get("inquiryId") || ""
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [formData, setFormData] = useState<Record<string, string>>({})

  const serviceList = serviceParam.split(",").map((s) => decodeURIComponent(s).trim()).filter(Boolean)
  const sections = getFieldsForServices(serviceList.length > 0 ? serviceList : ["기타"])
  const serviceLabel = serviceList.length > 0 ? serviceList.join(" / ") : "기타"

  function updateField(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const additionalMessage = (form.elements.namedItem("additionalMessage") as HTMLTextAreaElement)?.value || ""
    try {
      const res = await fetch("/api/contact-step2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiryId, service: serviceLabel, details: { ...formData }, additionalMessage }),
      })
      if (res.ok) setStatus("sent")
      else setStatus("error")
    } catch { setStatus("error") }
  }

  if (status === "sent") {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <PageBreadcrumb items={[{ label: "상담문의", path: "/contact" }, { label: "상담 완료", path: "/contact/step2" }]} />
        <section className="py-24 flex-1">
          <div className="max-w-xl mx-auto px-6 text-center">
            <div className="rounded-xl border border-border bg-card p-10 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">상담 신청이 완료되었습니다</h2>
              <p className="text-muted-foreground mb-6">영업일 기준 1일 이내 연락드리겠습니다.</p>
              <div className="bg-muted rounded-lg p-5 mb-6 space-y-2">
                <div className="flex items-center justify-center gap-2"><span className="text-sm text-muted-foreground">전화:</span><span className="font-medium text-foreground">02-363-2251</span></div>
                <div className="flex items-center justify-center gap-2"><span className="text-sm text-muted-foreground">카카오톡:</span><span className="font-medium text-foreground">alexkorea</span></div>
              </div>
              <Link href="/" className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-11 rounded-lg font-semibold transition-colors">홈으로 돌아가기</Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <PageBreadcrumb items={[{ label: "상담문의", path: "/contact" }, { label: "상세 정보", path: "/contact/step2" }]} />
      <section className="py-16 flex-1">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
              <span className="text-sm font-medium text-foreground">기본 정보</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
              <span className="text-sm font-medium text-foreground">상세 정보</span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {serviceList.map((svc) => (
                <span key={svc} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{svc}</span>
              ))}
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">상세 정보 입력</h2>
            <p className="text-sm text-muted-foreground mb-6">선택하신 서비스에 맞는 상세 정보를 입력해주세요.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {sections.map((section, sectionIdx) => (
                <div key={section.service}>
                  {sections.length > 1 && (
                    <div className={sectionIdx > 0 ? "mt-6 pt-6 border-t border-border" : ""}>
                      <h3 className="text-sm font-semibold text-primary mb-4">{section.service}</h3>
                    </div>
                  )}
                  {section.fields.map((field) => (
                    <div key={field.name} className="mb-4">
                      <label className="block text-sm font-medium text-foreground mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === "text" && (
                        <input type="text" required={field.required} placeholder={field.placeholder} value={formData[field.name] || ""} onChange={(e) => updateField(field.name, e.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                      )}
                      {field.type === "select" && (
                        <select required={field.required} value={formData[field.name] || ""} onChange={(e) => updateField(field.name, e.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                          <option value="">선택해주세요</option>
                          {field.options?.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                        </select>
                      )}
                      {field.type === "radio" && (
                        <div className="flex flex-wrap gap-3 mt-1">
                          {field.options?.map((opt) => (
                            <label key={opt} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all text-sm ${formData[field.name] === opt ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-muted-foreground/30 text-foreground"}`}>
                              <input type="radio" name={field.name} value={opt} checked={formData[field.name] === opt} onChange={(e) => updateField(field.name, e.target.value)} className="sr-only" required={field.required} />
                              {opt}
                            </label>
                          ))}
                        </div>
                      )}
                      {field.type === "textarea" && (
                        <textarea required={field.required} placeholder={field.placeholder} rows={5} value={formData[field.name] || ""} onChange={(e) => updateField(field.name, e.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
                      )}
                    </div>
                  ))}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">추가 메시지 <span className="text-muted-foreground font-normal">(선택사항)</span></label>
                <textarea name="additionalMessage" rows={3} placeholder="추가적으로 전달하고 싶은 내용이 있으시면 작성해주세요." className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={status === "sending"}>
                {status === "sending" ? "전송 중..." : "상담 신청 완료"}
              </Button>

              {status === "error" && (
                <p className="text-red-500 text-sm text-center">전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 문의해주세요.</p>
              )}
              <p className="text-xs text-muted-foreground text-center">제출하신 정보는 상담 목적으로만 사용됩니다.</p>
            </form>
          </div>

          <div className="mt-4 text-center">
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">← 이전 단계로 돌아가기</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default function Step2Page() {
  return (
    <Suspense fallback={
      <main className="min-h-screen"><Header /><section className="py-24"><div className="max-w-2xl mx-auto px-6 text-center"><div className="animate-pulse"><div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4" /><div className="h-4 bg-gray-200 rounded w-64 mx-auto" /></div></div></section><Footer /></main>
    }>
      <Step2Form />
    </Suspense>
  )
}
