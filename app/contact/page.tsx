import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { ContactForm } from "./contact-form"
import { SITE } from "@/lib/site"
import { Phone, Smartphone, Mail, MapPin } from "lucide-react"

export const metadata = {
  title: "상담 문의 — F-4 비자·거소증·국적 업무",
  description: "F-4 재외동포 비자, 거소증 발급, 국적상실·국적회복, F-5 영주권 상담을 접수합니다. 해외 거주자도 이메일·카카오톡·위챗·LINE·WhatsApp으로 상담할 수 있으며 초기 상담은 무료입니다.",
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: "상담 문의 — F-4 비자·거소증·국적 업무 | 행정사사무소 이룸",
    description: "F-4 재외동포 비자, 거소증 발급, 국적상실·국적회복, F-5 영주권 상담을 접수합니다. 해외 거주자도 이메일·카카오톡·위챗·LINE·WhatsApp으로 상담할 수 있으며 초기 상담은 무료입니다.",
    url: `${SITE.url}/contact`,
    siteName: SITE.name,
    type: "website",
  },
}

const contactInfo = [
  { icon: Phone, label: "전화", value: SITE.phoneOffice, href: SITE.phoneOfficeHref },
  { icon: Smartphone, label: "모바일", value: SITE.phoneMobile, href: SITE.phoneMobileHref },
  { icon: Mail, label: "이메일", value: SITE.email, href: SITE.emailHref },
  { icon: MapPin, label: "주소", value: SITE.address.full, href: "https://map.naver.com/v5/search/서울특별시 중구 퇴계로 324" },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageBreadcrumb items={[{ label: "상담문의", path: "/contact" }]} />
        <PageHero
          title="상담 문의"
          subtitle="F-4 비자, 거소증, 국적 관련 업무에 대해 궁금하신 점이 있으시면 언제든지 문의해 주세요." ctaLabel="상담 신청서 작성" ctaHref="#contact-form"
        />

        <section className="section">
          <div className="container-x">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <a key={info.label} href={info.href} target={info.icon === MapPin ? "_blank" : undefined} rel={info.icon === MapPin ? "noopener noreferrer" : undefined} className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{info.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{info.value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact-form" className="section">
          <div className="container-x">
            <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
              <ContactForm />
              <div className="space-y-8">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">상담 시간</h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>월 ~ 금</span><span className="font-medium text-foreground">9:30 AM - 5:30 PM</span></div>
                    <div className="flex justify-between"><span>토 / 일 / 공휴일</span><span className="font-medium text-foreground">휴무</span></div>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 id="messenger" className="mb-4 text-lg font-semibold text-foreground">메신저 상담</h3>
                  <p className="text-sm text-muted-foreground">급하신 문의는 전화 또는 카카오톡으로 연락해 주세요.</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {[{ name: "Kakao Talk", qr: "/qr/kakao.jpg" }, { name: "WeChat", qr: "/qr/wechat.jpg" }, { name: "LINE", qr: "/qr/line.jpg" }, { name: "WhatsApp", qr: "/qr/whatsapp.jpg" }].map((m) => (
                      <div key={m.name} className="text-center">
                        <div className="mx-auto mb-2 w-full aspect-square rounded-lg overflow-hidden border border-border"><img src={m.qr} alt={m.name} className="w-full h-full object-cover" /></div>
                        <span className="text-xs text-muted-foreground">{m.name}</span>
                      </div>
                    ))}
                  </div>
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
