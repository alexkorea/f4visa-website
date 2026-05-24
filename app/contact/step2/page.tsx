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
  hint?: string
  dependsOn?: { field: string; value: string }
}

// Q1–Q5: common to all services
const COMMON_FIELDS: FieldDef[] = [
  {
    name: "birthCountry",
    label: "Q1. 출생국가",
    type: "text",
    placeholder: "예: 한국, 미국, 중국",
    required: true,
    hint: "출생국이 한국이 아닌 경우 '국적상실'이 아닌 '국적이탈' 절차가 필요합니다",
  },
  {
    name: "nationality",
    label: "Q2. 국적 (현재 시민권 보유 국가)",
    type: "text",
    placeholder: "예: 미국, 캐나다, 일본",
    required: true,
  },
  {
    name: "koreaEntryDate",
    label: "Q3. 한국 입국 예정일",
    type: "text",
    placeholder: "한국 체류 중이면 '한국 체류 중'",
    required: false,
  },
  {
    name: "koreaDepartureDate",
    label: "Q4. 한국 출국 예정일",
    type: "text",
    placeholder: "장기 체류 예정이면 '장기'",
    required: false,
  },
  {
    name: "currentVisa",
    label: "Q5. 현재 비자/체류자격",
    type: "text",
    placeholder: "예: 시민권자, F-4, 무비자, 관광비자 등",
    required: true,
  },
]

const serviceFields: Record<string, FieldDef[]> = {
  "F-4 비자 ( 거소증 )": [
    {
      name: "nationalityLossPeriod",
      label: "Q6. 국적상실 경과 기간",
      type: "radio",
      options: [
        "국적상실 신고 후 6개월 미만",
        "국적상실 신고 후 6개월 이상",
        "국적상실 신고 미완료 (진행 필요)",
      ],
      required: true,
    },
    {
      name: "passport",
      label: "Q7. 여권을 보유하고 계십니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "citizenshipCertificate",
      label: "Q8. 시민권증서 원본을 보유하고 계십니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
      hint: "2025년 1월부터 원본 제출 의무화",
    },
    {
      name: "nationalityLossProof",
      label: "Q9. 국적상실 이메일 회신 또는 신고접수증이 있습니까?",
      type: "radio",
      options: ["있습니다", "없습니다 (신고 후 6개월 이상 경과)", "해당 없음"],
      required: true,
      hint: "신고 후 6개월 미만인 경우 필요",
    },
    {
      name: "criminalRecord",
      label: "Q10. 아포스티유 무범죄증명서를 발급받으셨습니까?",
      type: "radio",
      options: ["있습니다", "없습니다 (발급 예정)", "해당 없음 (만 60세 이상)"],
      required: true,
      hint: "60세 미만 필수. 미국은 연방정부 발급, 캐나다 RCMP 발급",
    },
    {
      name: "nameChanged",
      label: "Q11. 한국에서 사용하시던 이름과 현재 여권상 이름이 같으신가요?",
      type: "radio",
      options: [
        "같다",
        "다르다 (name change document 필요)",
        "영문 이름만 추가됨 (예: Lee Won Jung → Lee Charles Won Jung, 불필요)",
      ],
      required: true,
    },
    {
      name: "koreaAddress",
      label: "Q12. 한국에서 거주할 주소가 정해져 있나요?",
      type: "radio",
      options: ["예", "아직 미정"],
      required: true,
    },
    {
      name: "koreaAddressDetail",
      label: "거주 예정 주소 (시·구)",
      type: "text",
      placeholder: "예: 서울시 마포구",
      required: false,
      dependsOn: { field: "koreaAddress", value: "예" },
    },
    {
      name: "hostAddress",
      label: "Q13. 지인 주소지를 거소증 주소로 사용하실 예정인가요?",
      type: "radio",
      options: ["예 (지인 신분증·확인서·집계약서 추가 필요)", "아니오"],
      required: true,
    },
    {
      name: "delegation",
      label: "Q14. 당사에 한국 내 서류 발급을 위임하실 예정인가요?",
      type: "radio",
      options: ["예", "아니오 (직접 준비)"],
      required: true,
    },
    {
      name: "delegationPhone",
      label: "현재 거주국 전화번호",
      type: "text",
      placeholder: "예: +1-234-567-8900",
      required: false,
      dependsOn: { field: "delegation", value: "예" },
    },
    {
      name: "delegationAddress",
      label: "현재 거주국 주소",
      type: "text",
      placeholder: "예: 123 Main St, Los Angeles, CA 90001",
      required: false,
      dependsOn: { field: "delegation", value: "예" },
    },
  ],
  "국적상실": [
    {
      name: "citizenshipCountryDate",
      label: "Q6. 시민권 취득국 및 취득일",
      type: "text",
      placeholder: "예: 미국, 2020년 3월",
      required: true,
    },
    {
      name: "passport",
      label: "Q7. 여권 원본 및 사본이 있습니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "citizenshipCert",
      label: "Q8. 시민권증서 원본/사본이 있습니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "nameChangedDoc",
      label: "Q9. 이름변경 서류가 있습니까? (이름이 변경된 경우)",
      type: "radio",
      options: ["해당 없음", "있습니다", "없습니다"],
      required: true,
    },
    {
      name: "preparationDelegation",
      label: "Q10. 당사에 서류 작성 및 예약을 위임하실 예정인가요?",
      type: "radio",
      options: ["예", "아니오 (직접 준비)"],
      required: true,
      hint: "국적상실 신고 서류 작성 및 출입국 예약 대행",
    },
  ],
  "국적회복": [
    {
      name: "passport",
      label: "Q6. 여권 원본 및 사본이 있습니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "residenceCard",
      label: "Q7. 거소증(F-4)이 있습니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "photo",
      label: "Q8. 사진(3.5×4.5cm)이 있습니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "citizenshipCert",
      label: "Q9. 시민권증서 사본이 있습니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "basicCertificate",
      label: "Q10. 기본증명서(상세)를 발급받으셨습니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "familyCertificate",
      label: "Q11. 가족관계증명서(상세)를 발급받으셨습니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "criminalRecord",
      label: "Q12. 아포스티유 범죄경력조회서가 있습니까?",
      type: "radio",
      options: ["있습니다", "없습니다 (발급 예정)", "해당 없음 (만 65세 이상)"],
      required: true,
      hint: "만 65세 이하 필요",
    },
    {
      name: "delegation",
      label: "Q13. 당사에 한국 내 서류 발급을 위임하실 예정인가요?",
      type: "radio",
      options: ["예", "아니오 (직접 준비)"],
      required: true,
    },
    {
      name: "delegationPhone",
      label: "현재 거주국 전화번호",
      type: "text",
      placeholder: "예: +1-234-567-8900",
      required: false,
      dependsOn: { field: "delegation", value: "예" },
    },
    {
      name: "delegationAddress",
      label: "현재 거주국 주소",
      type: "text",
      placeholder: "예: 123 Main St, Los Angeles, CA 90001",
      required: false,
      dependsOn: { field: "delegation", value: "예" },
    },
  ],
  "영주권": [
    {
      name: "f4StayDuration",
      label: "Q6. 거소증(F-4)으로 한국에 체류한 총 기간은?",
      type: "select",
      options: ["1년 미만", "1~2년", "3~4년", "5년 이상"],
      required: true,
    },
    {
      name: "age",
      label: "Q7. 현재 만 나이",
      type: "text",
      placeholder: "예: 55",
      required: true,
    },
    {
      name: "income",
      label: "Q8. 전년도 연간 소득 수준",
      type: "select",
      options: ["1인당 GNI 미만", "1인당 GNI 이상", "확인 필요"],
      required: true,
      hint: "2025년 기준 1인당 GNI 약 3,500만 원",
    },
    {
      name: "topik",
      label: "Q9. 한국어능력시험(TOPIK) 또는 사회통합프로그램",
      type: "select",
      options: ["없음", "TOPIK 1~2급", "TOPIK 3급 이상", "사회통합프로그램 이수"],
      required: true,
    },
    {
      name: "criminalRecordKorea",
      label: "Q10. 한국 내 범죄 또는 과태료 이력이 있습니까?",
      type: "radio",
      options: ["없음", "있음"],
      required: true,
    },
    {
      name: "criminalRecordAbroad",
      label: "Q11. 아포스티유 국외 범죄경력조회서가 있습니까?",
      type: "radio",
      options: ["있습니다", "없습니다 (발급 예정)", "해당 없음"],
      required: true,
    },
  ],
  "F-3 동반비자": [
    {
      name: "sponsorResidenceCard",
      label: "Q6. 초청인의 거소증 또는 외국인등록증이 있습니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "applicantPassport",
      label: "Q7. 신청인 여권이 있습니까?",
      type: "radio",
      options: ["예", "아니오"],
      required: true,
    },
    {
      name: "relationship",
      label: "Q8. 초청인과의 관계는?",
      type: "select",
      options: ["배우자", "부모", "자녀"],
      required: true,
    },
    {
      name: "familyCertificate",
      label: "Q9. 가족관계증명서(상세)를 발급받으셨습니까?",
      type: "radio",
      options: ["예", "아니오", "발급 방법 모름"],
      required: true,
    },
  ],
  "기타": [
    {
      name: "inquiry",
      label: "Q6. 문의 내용",
      type: "textarea",
      placeholder: "궁금하신 내용을 자유롭게 작성해주세요.",
      required: true,
    },
  ],
}

const NATIONALITY_LOSS_INFO = `국적이탈은 재외공관(미국 주재 한국대사관 등)에서 직접 신청하셔야 합니다. 저희 행정사사무소 업무 범위가 아닙니다.

미국의 경우 주요 절차:
• 대상: 외국 국적 취득 시 자동으로 한국 국적을 상실하지 않은 분
• 신청처: 가까운 주미 한국대사관 또는 총영사관
• 주요 서류: 여권, 시민권증서, 기본증명서(상세), 가족관계증명서(상세)
• 처리기간: 약 3개월 이상 (대사관마다 다름)

자세한 내용은 가까운 한국 재외공관에 직접 문의하시기 바랍니다.`

function getFieldsForService(service: string): FieldDef[] {
  return serviceFields[service] || serviceFields["기타"]
}

function isVisible(field: FieldDef, formData: Record<string, string>): boolean {
  if (!field.dependsOn) return true
  return formData[field.dependsOn.field] === field.dependsOn.value
}

function Step2Form() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get("service") || ""
  const inquiryId = searchParams.get("inquiryId") || ""
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [formData, setFormData] = useState<Record<string, string>>({})

  const serviceList = serviceParam
    .split(",")
    .map((s) => decodeURIComponent(s).trim())
    .filter(Boolean)

  const primaryService = serviceList[0] || "기타"
  const isNationalityRenunciation = primaryService === "국적이탈"
  const fields = isNationalityRenunciation ? [] : getFieldsForService(primaryService)

  function updateField(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    const form = e.currentTarget
    const additionalMessage =
      (form.elements.namedItem("additionalMessage") as HTMLTextAreaElement)?.value || ""
    try {
      const res = await fetch("/api/contact-step2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryId,
          service: primaryService,
          details: { ...formData },
          additionalMessage,
        }),
      })
      if (res.ok) setStatus("sent")
      else setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <PageBreadcrumb
          items={[
            { label: "상담문의", path: "/contact" },
            { label: "상담 완료", path: "/contact/step2" },
          ]}
        />
        <section className="py-8 flex-1">
          <div className="max-w-xl mx-auto px-6 text-center">
            <div className="rounded-xl border border-border bg-card p-10 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                상담 신청이 완료되었습니다
              </h2>
              <p className="text-muted-foreground mb-6">영업일 기준 1일 이내 연락드리겠습니다.</p>
              <div className="bg-muted rounded-lg p-5 mb-6 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-muted-foreground">전화:</span>
                  <span className="font-medium text-foreground">02-363-2251</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-muted-foreground">카카오톡:</span>
                  <span className="font-medium text-foreground">alexkorea</span>
                </div>
              </div>
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-11 rounded-lg font-semibold transition-colors"
              >
                홈으로 돌아가기
              </Link>
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
      <PageBreadcrumb
        items={[
          { label: "상담문의", path: "/contact" },
          { label: "상세 정보", path: "/contact/step2" },
        ]}
      />
      <section className="py-16 flex-1">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span className="text-sm font-medium text-foreground">기본 정보</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="text-sm font-medium text-foreground">자격 및 서류 확인</span>
            </div>
          </div>

          {isNationalityRenunciation ? (
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {primaryService}
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-4">국적이탈 안내</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
                <p className="text-sm font-semibold text-amber-800 mb-3">
                  국적이탈은 재외공관에서 직접 신청하셔야 합니다
                </p>
                <p className="text-sm text-amber-700 whitespace-pre-line">{NATIONALITY_LOSS_INFO}</p>
              </div>
              <div className="bg-muted rounded-lg p-5 space-y-2">
                <p className="text-sm font-medium text-foreground mb-2">
                  다른 업무로 상담이 필요하시면:
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">전화:</span>
                  <span className="font-medium text-foreground">02-363-2251</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">카카오톡:</span>
                  <span className="font-medium text-foreground">alexkorea</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  ← 상담 신청으로 돌아가기
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {serviceList.map((svc) => (
                  <span
                    key={svc}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  >
                    {svc}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold text-foreground mb-1">자격 및 서류 준비 확인</h2>
              <p className="text-sm text-muted-foreground mb-6">
                정확한 상담을 위해 아래 내용을 확인해주세요.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Q1–Q4 common */}
                <div className="pb-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-primary mb-4">현재 상황</h3>
                  {COMMON_FIELDS.filter((f) => isVisible(f, formData)).map((field) => (
                    <FieldRenderer
                      key={field.name}
                      field={field}
                      value={formData[field.name] || ""}
                      onChange={(v) => updateField(field.name, v)}
                    />
                  ))}
                </div>

                {/* Q5+ service-specific */}
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-4">
                    {primaryService} — 서류 및 자격 확인
                  </h3>
                  {fields.filter((f) => isVisible(f, formData)).map((field) => (
                    <FieldRenderer
                      key={field.name}
                      field={field}
                      value={formData[field.name] || ""}
                      onChange={(v) => updateField(field.name, v)}
                    />
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    추가 메시지{" "}
                    <span className="text-muted-foreground font-normal">(선택사항)</span>
                  </label>
                  <textarea
                    name="additionalMessage"
                    rows={3}
                    placeholder="추가로 전달하실 내용을 자유롭게 적어주세요."
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={status === "sending"}>
                  {status === "sending" ? "전송 중..." : "상담 신청 완료"}
                </Button>

                {status === "error" && (
                  <p className="text-red-500 text-sm text-center">
                    전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 문의해주세요.
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  제출하신 정보는 상담 목적으로만 사용됩니다.
                </p>
              </form>
            </div>
          )}

          <div className="mt-4 text-center">
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← 이전 단계로 돌아가기
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldDef
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-foreground mb-1">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      {field.hint && <p className="text-xs text-muted-foreground mb-2">{field.hint}</p>}

      {field.type === "text" && (
        <input
          type="text"
          required={field.required}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      )}

      {field.type === "select" && (
        <select
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">선택해주세요</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {field.type === "radio" && (
        <div className="flex flex-wrap gap-2 mt-1">
          {field.options?.map((opt) => (
            <label
              key={opt}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                value === opt
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-muted-foreground/30 text-foreground"
              }`}
            >
              <input
                type="radio"
                name={field.name}
                value={opt}
                checked={value === opt}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
                required={field.required}
              />
              {opt}
            </label>
          ))}
        </div>
      )}

      {field.type === "textarea" && (
        <textarea
          required={field.required}
          placeholder={field.placeholder}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      )}
    </div>
  )
}

export default function Step2Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen">
          <Header />
          <section className="py-8">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4" />
                <div className="h-4 bg-gray-200 rounded w-64 mx-auto" />
              </div>
            </div>
          </section>
          <Footer />
        </main>
      }
    >
      <Step2Form />
    </Suspense>
  )
}
