import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "./contact-form"
import { Phone, Smartphone, Mail, MapPin } from "lucide-react"

export const metadata = {
  title: "상담 문의 | 재외동포 행정서비스",
  description:
    "F-4 비자, 거소증, 국적 관련 업무에 대해 전문가에게 문의하세요.",
}

const contactInfo = [
  {
    icon: Phone,
    label: "전화",
    value: "02-363-2251",
    href: "tel:02-363-2251",
  },
  {
    icon: Smartphone,
    label: "모바일",
    value: "010-2081-3408",
    href: "tel:010-2081-3408",
  },
  {
    icon: Mail,
    label: "이메일",
    value: "5000meter@gmail.com",
    href: "mailto:5000meter@gmail.com",
  },
  {
    icon: MapPin,
    label: "주소",
    value: "서울특별시 중구 퇴계로 324, 3층 (성우빌딩)",
    href: "https://map.naver.com/v5/search/서울특별시 중구 퇴계로 324",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('/slides/consultation.jpg')] bg-cover bg-center opacity-10" />
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
              Contact Us
            </p>
            <h1 className="mt-3 text-3xl font-bold text-primary-foreground md:text-5xl">
              상담 문의
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              F-4 비자, 거소증, 국적 관련 업무에 대해 궁금하신 점이 있으시면
              언제든지 문의해 주세요.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="bg-background py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target={info.icon === MapPin ? "_blank" : undefined}
                  rel={info.icon === MapPin ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {info.label}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {info.value}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Form + Info */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
              {/* Form */}
              <div>
                <h2 className="mb-2 text-2xl font-bold text-foreground">
                  문의하기
                </h2>
                <p className="mb-8 text-muted-foreground">
                  아래 양식을 작성해 주시면 빠른 시일 내에 답변 드리겠습니다.
                </p>
                <ContactForm />
              </div>

              {/* Side Info */}
              <div className="space-y-8">
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    상담 시간
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>월 ~ 금</span>
                      <span className="font-medium text-foreground">
                        09:00 - 18:00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>토요일</span>
                      <span className="font-medium text-foreground">
                        10:00 - 14:00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>일요일 / 공휴일</span>
                      <span className="font-medium text-foreground">휴무</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    빠른 상담
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    급하신 문의는 전화 또는 카카오톡으로 연락해 주세요.
                    해외에서도 카카오톡 또는 위챗으로 상담이 가능합니다.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-32 w-32 items-center justify-center rounded-xl bg-muted">
                        <span className="text-xs text-muted-foreground">
                          카카오톡 QR
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        카카오톡 상담
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    오시는 길
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    서울특별시 중구 퇴계로 324, 3층
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    지하철 3호선 충무로역 3번 출구에서 도보 5분
                  </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    카카오톡 상담
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    카카오톡 ID:{" "}
                    <span className="font-medium text-foreground">
                      alexkorea
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    해외에서도 카카오톡으로 편하게 상담받으세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
