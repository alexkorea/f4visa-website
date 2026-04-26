"use client"

import React, { useState, useCallback, useMemo, useRef } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FileCheck,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Purpose =
  | "f4_visa"
  | "residence_card"
  | "nationality_loss"
  | "nationality_renunciation"
  | "nationality_recovery"
  | "dual" // F-4 + 거소증 동시

type MilitaryStatus = "completed" | "exempt" | "not_completed" | ""
type NationalityLossStatus = "lost" | "not_lost" | "unknown" | ""

interface FormData {
  name: string
  gender: "male" | "female" | ""
  birthDate: string
  nationality: string
  residenceCountry: string
  purposes: Purpose[]
  militaryStatus: MilitaryStatus
  militaryExemptReason: string
  nationalityRenunciationBefore38: "yes" | "no" | ""
  nationalityLossStatus: NationalityLossStatus
  previousKoreaStay: "yes" | "no" | ""
}

interface DocumentItem {
  id: string
  label: string
  note?: string
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const NATIONALITIES = [
  { value: "us", label: "미국" },
  { value: "ca", label: "캐나다" },
  { value: "jp", label: "일본" },
  { value: "cn", label: "중국" },
  { value: "au", label: "호주" },
  { value: "other", label: "기타" },
]

const PURPOSE_OPTIONS: { value: Purpose; label: string; description?: string }[] = [
  { value: "f4_visa", label: "F-4 비자 신청" },
  { value: "residence_card", label: "거소증(거소신고) 신청" },
  { value: "nationality_loss", label: "국적상실 신고" },
  { value: "nationality_renunciation", label: "국적이탈 신고" },
  { value: "nationality_recovery", label: "국적회복" },
  { value: "dual", label: "복수국적 (F-4 + 거소증 동시)" },
]

const STEP_LABELS = [
  "신청자 기본 정보",
  "자격 진단",
  "필요서류 확인",
  "서비스 안내",
]

/* ------------------------------------------------------------------ */
/*  Document definitions by purpose                                    */
/* ------------------------------------------------------------------ */

const F4_VISA_DOCS: DocumentItem[] = [
  { id: "f4_passport", label: "여권 원본 및 사본" },
  { id: "f4_photo", label: "여권용 사진 1매", note: "3.5x4.5cm, 6개월 이내 촬영" },
  { id: "f4_visa_app", label: "사증발급신청서" },
  { id: "f4_f4_app", label: "재외동포 체류자격(F-4) 신청서" },
  { id: "f4_citizenship", label: "외국 국적 취득 경위 서류", note: "시민권 증서 등" },
  {
    id: "f4_family",
    label: "가족관계 입증서류",
    note: "기본증명서, 가족관계증명서, 제적등본",
  },
  {
    id: "f4_kr_nationality",
    label: "한국 국적 보유 이력 입증",
    note: "구 여권, 호적등본 등",
  },
  { id: "f4_criminal", label: "범죄경력증명서", note: "해당국 발급" },
  { id: "f4_fee", label: "수수료" },
]

const RESIDENCE_CARD_DOCS: DocumentItem[] = [
  { id: "rc_passport", label: "여권 원본" },
  { id: "rc_photo", label: "여권용 사진 1매" },
  { id: "rc_app", label: "거소신고서" },
  {
    id: "rc_address",
    label: "체류지 입증서류",
    note: "임대차계약서, 숙박 확인서 등",
  },
  { id: "rc_fee", label: "거소신고 수수료" },
]

const NATIONALITY_LOSS_DOCS: DocumentItem[] = [
  { id: "nl_app", label: "국적상실신고서" },
  {
    id: "nl_citizenship",
    label: "외국 국적 취득 증빙",
    note: "시민권 증서 원본 + 사본",
  },
  { id: "nl_basic_cert", label: "가족관계등록부 기본증명서" },
  { id: "nl_passport", label: "여권 사본" },
  { id: "nl_id", label: "신분증 사본" },
]

const NATIONALITY_RENUNCIATION_DOCS: DocumentItem[] = [
  { id: "nr_app", label: "국적이탈신고서" },
  { id: "nr_citizenship", label: "외국 국적 증빙" },
  {
    id: "nr_family",
    label: "가족관계증명서, 기본증명서",
  },
  { id: "nr_military", label: "병적증명서", note: "남성" },
  { id: "nr_passport", label: "여권 사본" },
]

const NATIONALITY_RECOVERY_DOCS: DocumentItem[] = [
  { id: "nrec_app", label: "국적회복 허가 신청서" },
  { id: "nrec_renounce", label: "외국 국적 포기 각서" },
  { id: "nrec_family", label: "가족관계등록부 증명서" },
  { id: "nrec_statement", label: "신원진술서" },
  { id: "nrec_criminal", label: "범죄경력증명서" },
  { id: "nrec_korean", label: "한국어 능력 증빙", note: "해당 시" },
]

/* ------------------------------------------------------------------ */
/*  Helper: get docs for active purposes                               */
/* ------------------------------------------------------------------ */

function getDocSections(
  purposes: Purpose[],
  gender: string,
): { title: string; docs: DocumentItem[] }[] {
  const sections: { title: string; docs: DocumentItem[] }[] = []

  const effectivePurposes = new Set(purposes)
  if (effectivePurposes.has("dual")) {
    effectivePurposes.add("f4_visa")
    effectivePurposes.add("residence_card")
  }

  if (effectivePurposes.has("f4_visa")) {
    sections.push({ title: "F-4 비자 신청 서류", docs: F4_VISA_DOCS })
  }
  if (effectivePurposes.has("residence_card")) {
    sections.push({ title: "거소증(거소신고) 서류", docs: RESIDENCE_CARD_DOCS })
  }
  if (effectivePurposes.has("nationality_loss")) {
    sections.push({ title: "국적상실 신고 서류", docs: NATIONALITY_LOSS_DOCS })
  }
  if (effectivePurposes.has("nationality_renunciation")) {
    const docs =
      gender === "female"
        ? NATIONALITY_RENUNCIATION_DOCS.filter((d) => d.id !== "nr_military")
        : NATIONALITY_RENUNCIATION_DOCS
    sections.push({ title: "국적이탈 신고 서류", docs })
  }
  if (effectivePurposes.has("nationality_recovery")) {
    sections.push({ title: "국적회복 서류", docs: NATIONALITY_RECOVERY_DOCS })
  }
  return sections
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DocumentChecklistPage() {
  const [step, setStep] = useState(0)
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({})
  const printRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<FormData>({
    name: "",
    gender: "",
    birthDate: "",
    nationality: "",
    residenceCountry: "",
    purposes: [],
    militaryStatus: "",
    militaryExemptReason: "",
    nationalityRenunciationBefore38: "",
    nationalityLossStatus: "",
    previousKoreaStay: "",
  })

  /* Updaters */
  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const togglePurpose = useCallback((p: Purpose) => {
    setForm((prev) => {
      const has = prev.purposes.includes(p)
      return {
        ...prev,
        purposes: has ? prev.purposes.filter((x) => x !== p) : [...prev.purposes, p],
      }
    })
  }, [])

  const toggleDoc = useCallback((id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  /* Show military questions only for males */
  const showMilitary = form.gender === "male"

  /* Step validation */
  const step1Valid =
    form.name.trim() !== "" &&
    form.gender !== "" &&
    form.birthDate !== "" &&
    form.nationality !== "" &&
    form.residenceCountry.trim() !== "" &&
    form.purposes.length > 0

  const step2Valid = (() => {
    if (showMilitary && form.militaryStatus === "") return false
    if (
      showMilitary &&
      form.militaryStatus === "exempt" &&
      form.militaryExemptReason.trim() === ""
    )
      return false
    if (form.nationalityLossStatus === "") return false
    return true
  })()

  const canProceed = step === 0 ? step1Valid : step === 1 ? step2Valid : true

  /* Derived doc sections */
  const docSections = useMemo(
    () => getDocSections(form.purposes, form.gender),
    [form.purposes, form.gender],
  )

  /* Warnings */
  const warnings = useMemo(() => {
    const w: string[] = []
    if (
      showMilitary &&
      form.militaryStatus === "not_completed" &&
      form.nationalityRenunciationBefore38 !== "yes"
    ) {
      w.push(
        "군미필 남성으로 만 38세 이전 국적이탈이 확인되지 않았습니다. F-4 비자 발급에 제한이 있을 수 있습니다.",
      )
    }
    if (form.nationalityLossStatus === "not_lost") {
      w.push(
        "국적상실(또는 국적이탈) 절차가 완료되지 않은 경우, 일반적으로 먼저 해당 절차를 진행해야 합니다.",
      )
    }
    return w
  }, [showMilitary, form.militaryStatus, form.nationalityRenunciationBefore38, form.nationalityLossStatus])

  const progressValue = ((step + 1) / STEP_LABELS.length) * 100

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  /* ---------------------------------------------------------------- */
  /*  Render helpers                                                   */
  /* ---------------------------------------------------------------- */

  const renderStep0 = () => (
    <div className="space-y-6">
      {/* 이름 */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          이름 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="홍길동"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </div>

      {/* 성별 */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          성별 <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={form.gender}
          onValueChange={(v) => updateField("gender", v as "male" | "female")}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="cursor-pointer">남</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="cursor-pointer">여</Label>
          </div>
        </RadioGroup>
      </div>

      {/* 생년월일 */}
      <div className="space-y-2">
        <Label htmlFor="birthDate" className="text-sm font-medium">
          생년월일 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="birthDate"
          type="date"
          value={form.birthDate}
          onChange={(e) => updateField("birthDate", e.target.value)}
        />
      </div>

      {/* 현재 국적 */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          현재 국적 <span className="text-destructive">*</span>
        </Label>
        <Select
          value={form.nationality}
          onValueChange={(v) => updateField("nationality", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="국적을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {NATIONALITIES.map((n) => (
              <SelectItem key={n.value} value={n.value}>
                {n.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 현재 거주국 */}
      <div className="space-y-2">
        <Label htmlFor="residenceCountry" className="text-sm font-medium">
          현재 거주국 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="residenceCountry"
          placeholder="예: 미국"
          value={form.residenceCountry}
          onChange={(e) => updateField("residenceCountry", e.target.value)}
        />
      </div>

      {/* 한국 방문 목적 */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          한국 방문 목적 <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">복수 선택 가능합니다.</p>
        <div className="space-y-3">
          {PURPOSE_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-start gap-3">
              <Checkbox
                id={`purpose-${opt.value}`}
                checked={form.purposes.includes(opt.value)}
                onCheckedChange={() => togglePurpose(opt.value)}
                className="mt-0.5"
              />
              <Label htmlFor={`purpose-${opt.value}`} className="cursor-pointer text-sm leading-snug">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-8">
      {/* 병역 관련 (남성만) */}
      {showMilitary && (
        <div className="space-y-4 rounded-xl border border-border/50 bg-secondary/30 p-5">
          <h4 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Info className="h-4 w-4 text-primary" />
            병역 관련 (남성)
          </h4>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              병역 이행 여부 <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={form.militaryStatus}
              onValueChange={(v) => updateField("militaryStatus", v as MilitaryStatus)}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="completed" id="mil_completed" />
                <Label htmlFor="mil_completed" className="cursor-pointer text-sm">
                  병역 이행 완료 (군필)
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="exempt" id="mil_exempt" />
                <Label htmlFor="mil_exempt" className="cursor-pointer text-sm">
                  병역 면제
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="not_completed" id="mil_not" />
                <Label htmlFor="mil_not" className="cursor-pointer text-sm">
                  미이행 (군미필)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {form.militaryStatus === "exempt" && (
            <div className="space-y-2">
              <Label htmlFor="exemptReason" className="text-sm font-medium">
                병역면제 사유 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="exemptReason"
                placeholder="예: 영주권자 면제, 신체 등급 등"
                value={form.militaryExemptReason}
                onChange={(e) =>
                  updateField("militaryExemptReason", e.target.value)
                }
              />
            </div>
          )}

          {form.militaryStatus === "not_completed" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                만 38세 이전 국적이탈 여부
              </Label>
              <RadioGroup
                value={form.nationalityRenunciationBefore38}
                onValueChange={(v) =>
                  updateField("nationalityRenunciationBefore38", v as "yes" | "no")
                }
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="before38_yes" />
                  <Label htmlFor="before38_yes" className="cursor-pointer text-sm">예</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="before38_no" />
                  <Label htmlFor="before38_no" className="cursor-pointer text-sm">아니오</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      )}

      {/* 국적상실 여부 */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          국적상실 여부 <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={form.nationalityLossStatus}
          onValueChange={(v) =>
            updateField("nationalityLossStatus", v as NationalityLossStatus)
          }
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="lost" id="loss_done" />
            <Label htmlFor="loss_done" className="cursor-pointer text-sm">
              상실 완료
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="not_lost" id="loss_not" />
            <Label htmlFor="loss_not" className="cursor-pointer text-sm">
              미상실
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="unknown" id="loss_unknown" />
            <Label htmlFor="loss_unknown" className="cursor-pointer text-sm">
              모름
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* 이전 한국 체류 이력 */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">이전 한국 체류 이력</Label>
        <RadioGroup
          value={form.previousKoreaStay}
          onValueChange={(v) => updateField("previousKoreaStay", v as "yes" | "no")}
          className="flex gap-6"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="yes" id="stay_yes" />
            <Label htmlFor="stay_yes" className="cursor-pointer text-sm">있음</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="no" id="stay_no" />
            <Label htmlFor="stay_no" className="cursor-pointer text-sm">없음</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="space-y-3">
          {warnings.map((w, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-yellow-300/50 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-500/30 dark:bg-yellow-950/30 dark:text-yellow-200"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderStep2 = () => {
    if (docSections.length === 0) {
      return (
        <div className="py-12 text-center text-muted-foreground">
          <FileCheck className="mx-auto mb-4 h-12 w-12 opacity-40" />
          <p>방문 목적을 선택하면 필요서류가 표시됩니다.</p>
          <Button variant="outline" className="mt-4" onClick={() => setStep(0)}>
            Step 1로 돌아가기
          </Button>
        </div>
      )
    }

    const allDocIds = docSections.flatMap((s) => s.docs.map((d) => d.id))
    const checkedCount = allDocIds.filter((id) => checkedDocs[id]).length

    return (
      <div className="space-y-8" ref={printRef}>
        {/* Summary bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-secondary/50 p-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{form.name}</span>님의
            필요서류 ({checkedCount}/{allDocIds.length} 준비 완료)
          </div>
          <Button variant="outline" size="sm" onClick={handlePrint} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" />
            인쇄하기
          </Button>
        </div>

        {docSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h4 className="text-base font-semibold text-foreground">{section.title}</h4>
            <div className="divide-y divide-border/50 rounded-xl border border-border/50 bg-card">
              {section.docs.map((doc) => {
                const checked = !!checkedDocs[doc.id]
                return (
                  <label
                    key={doc.id}
                    htmlFor={`doc-${doc.id}`}
                    className={`flex cursor-pointer items-start gap-3 p-4 transition-colors hover:bg-secondary/30 ${
                      checked ? "bg-primary/5" : ""
                    }`}
                  >
                    <Checkbox
                      id={`doc-${doc.id}`}
                      checked={checked}
                      onCheckedChange={() => toggleDoc(doc.id)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <span
                        className={`text-sm ${
                          checked
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        }`}
                      >
                        {doc.label}
                      </span>
                      {doc.note && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({doc.note})
                        </span>
                      )}
                    </div>
                    {checked && (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    )}
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 lg:p-8">
        <h3 className="text-xl font-bold text-foreground">
          비전행정사사무소 F-4 서비스 안내
        </h3>
        <div className="mt-4 space-y-2">
          <p className="font-medium text-foreground">
            가장 신속히 허가되는 출입국사무소를 찾아서 진행해 드립니다.
          </p>
          <p className="font-medium text-foreground">
            한국내 최소체류기간으로 처리 가능합니다.
          </p>
        </div>
        <ol className="mt-6 space-y-3">
          {[
            "거소증 신청대행",
            "거소증 수령대행",
            "거소증 본국발급",
            "각종 서류 발급대행 (기본증명서, 가족관계증명서, 제적등본 등)",
            "숙박관련 숙박제공자와의 연락",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted-foreground">
          비용은 사례별로 상이하므로 무료 상담 시 정확히 안내드립니다.
        </p>
      </div>

      {/* Contact info */}
      <div className="rounded-2xl border border-border/50 bg-card p-6 text-center">
        <h4 className="text-lg font-bold text-foreground">추가 무료상담 안내</h4>
        <p className="mt-2 text-sm text-muted-foreground">
          비전행정사사무소 추가 무료상담은 이메일이나 카톡으로 가능합니다. 복잡한
          국내서류 사전준비, 가장 빠른 출입국사무소 확인 후 가장 빠른 절차로
          진행합니다.
        </p>
        <div className="mt-5 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-6">
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            010-2081-3408
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            카카오톡 ID: alexkorea
          </span>
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            5000meter@gmail.com
          </span>
        </div>
        <div className="mt-6">
          <Button size="lg" asChild>
            <Link href="/contact">상담 문의하기</Link>
          </Button>
        </div>
      </div>
    </div>
  )

  /* ---------------------------------------------------------------- */
  /*  Main render                                                      */
  /* ---------------------------------------------------------------- */

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageBreadcrumb
          items={[
            { label: "거소증 서류확인", path: "/f4-residence-card-documents-checklist" },
          ]}
        />

        {/* Hero */}
        <section className="relative min-h-[300px] flex items-center py-16 print:hidden">
          <div className="absolute inset-0">
            <img
              src="/slides/documents.jpg"
              alt="거소증 서류확인"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              거소증 서류확인
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              재외동포(F-4) / 국적상실 / 거소증 / 국적회복 접수표
            </p>
          </div>
        </section>

        {/* Wizard */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            {/* Progress indicator */}
            <div className="mb-10 print:hidden">
              <div className="flex items-center justify-between text-sm">
                {STEP_LABELS.map((label, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (i <= step) setStep(i)
                    }}
                    className={`flex flex-col items-center gap-1.5 ${
                      i <= step ? "cursor-pointer" : "cursor-default"
                    }`}
                    disabled={i > step}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        i < step
                          ? "bg-primary text-primary-foreground"
                          : i === step
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                            : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {i < step ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span
                      className={`hidden text-xs sm:block ${
                        i === step
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
              <Progress value={progressValue} className="mt-4" />
            </div>

            {/* Step content card */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm lg:p-10">
              {/* Step title */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground lg:text-2xl">
                  {step + 1}. {STEP_LABELS[step]}
                </h2>
                {step === 0 && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    F-4 사증 + 거소증(거소신고) 동시 진행 시, 원본을 요구하는 경우가
                    많습니다.
                  </p>
                )}
                {step === 1 && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    군미필 남성은 출생일/국적상실(이탈) 시점에 따라 F-4 제한이 있을 수
                    있습니다.
                  </p>
                )}
                {step === 2 && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    선택한 업무에 따른 필요서류 목록입니다. 준비된 서류를 체크하세요.
                  </p>
                )}
              </div>

              {/* Step body */}
              {step === 0 && renderStep0()}
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              {/* Navigation */}
              <div className="mt-10 flex items-center justify-between print:hidden">
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  이전
                </Button>
                {step < STEP_LABELS.length - 1 ? (
                  <Button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canProceed}
                  >
                    다음
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/contact">상담 문의하기</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
