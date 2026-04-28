import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/structured-data"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, Phone } from "lucide-react"
import FAQSection from "@/components/FAQSection"

/* ─── data ─── */
const services = [
  { title: "국적상실 신고", desc: "외국 국적 취득 후 한국 국적을 상실하는 절차를 안내하고 체계적으로 지원합니다." },
  { title: "F-4 비자 발급", desc: "재외동포(F-4) 비자 신규 발급 및 자격 검토부터 접수까지 원스톱 서비스." },
  { title: "거소증 발급·갱신", desc: "국내거소신고증 발급, 갱신, 재발급 절차를 빠르고 정확하게 대행합니다." },
  { title: "영주권(F-5) 전환", desc: "F-4 → F-5 영주권 전환 자격 검토 및 신청 절차를 전문적으로 지원합니다." },
  { title: "국적회복 허가", desc: "과거 대한민국 국민이었던 분들의 국적회복 절차를 전문 행정사가 대행합니다." },
]

const STEPS = [
  { num: "01", title: "초기 상담", desc: "전화·카카오·이메일로 자격 요건을 파악하고 맞춤 전략을 수립합니다." },
  { num: "02", title: "서류 준비", desc: "재외동포 증빙 서류 리스트를 제공하고 누락 없이 함께 준비합니다." },
  { num: "03", title: "접수 대행", desc: "출입국관리사무소에 비자·거소증 신청을 대행합니다." },
  { num: "04", title: "심사 대응", desc: "보완 서류 요청·추가 심사에 신속히 대응하여 승인 확률을 높입니다." },
  { num: "05", title: "발급 완료", desc: "비자·거소증 발급 후 사후 관리와 연장·변경까지 안내해 드립니다." },
]

const STATS = [
  { value: "8+", label: "년 경력 전문가" },
  { value: "1,000+", label: "성공적인 F-4 지원" },
  { value: "98%", label: "고객 만족도" },
  { value: "24h", label: "평균 응답 시간" },
]

const admins = [
  { name: "이원중", role: "대표행정사", photo: "/team/leewj.jpg" },
  { name: "정유선", role: "행정사", photo: "/team/jungyus.jpg" },
  { name: "한경택", role: "행정사", photo: "/team/hankt.jpg" },
  { name: "김정은", role: "행정사", photo: "/team/kimje.jpg" },
  { name: "이시정", role: "행정사", photo: "/team/leesj.jpg" },
  { name: "정희정", role: "행정사", photo: "/team/junghj.jpg" },
]

const staff = [
  { name: "백승수", role: "사무장", photo: "/team/baekss.jpg" },
  { name: "김영주", role: "실장", photo: "/team/kimyj.jpg" },
  { name: "허경", role: "실장", photo: "/team/hukyung.jpg" },
]

const messengers = [
  { name: "Kakao Talk", qr: "/qr/kakao.jpg" },
  { name: "WeChat", qr: "/qr/wechat.jpg" },
  { name: "LINE", qr: "/qr/line.jpg" },
  { name: "WhatsApp", qr: "/qr/whatsapp.jpg" },
]

/* ─── page ─── */
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <Header />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-end pb-24 md:items-center md:pb-0 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div style={{backgroundImage:"url(/slides/family.jpg)",backgroundSize:"cover",backgroundPosition:"center"}} className="absolute inset-0" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="container-x relative z-10">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.3em] text-wv-orange font-bold">
              재외동포 행정 서비스 전문
            </div>
            <h1 className="mt-5 text-display-xl font-black text-white leading-[1.08]">
              F-4 재외동포 비자,
              <br />
              전문가에게 맡기세요
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
              국적상실·F-4 비자·거소증·영주권·국적회복까지.
              <br />
              비전행정사사무소가 정확하고 빠르게 지원합니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary text-lg">상담문의</Link>
              <a href="tel:010-2081-3408" className="btn-ghost text-lg">
                <Phone size={18} />
                010-2081-3408
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <ArrowDown size={20} />
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-24 md:py-32 bg-wv-cream">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-wv-orange font-bold">Services</div>
            <h2 className="mt-4 text-display-lg font-black text-wv-ink leading-tight">주요 서비스</h2>
            <p className="mt-4 text-wv-gray">재외동포를 위한 핵심 행정 서비스를 제공합니다</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <div key={i} className="group rounded-2xl border border-wv-line bg-white p-6 hover:border-wv-orange hover:shadow-lg transition-all duration-300">
                <h3 className="text-base font-black text-wv-ink mb-2">{s.title}</h3>
                <p className="text-sm text-wv-gray leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/contact" className="btn-primary text-lg">업무 상담 문의하기</Link>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-wv-orange font-bold">Process</div>
            <h2 className="mt-4 text-display-lg font-black text-wv-ink leading-tight">진행 절차</h2>
            <p className="mt-4 text-wv-gray">상담부터 발급 완료까지, 5단계로 안내합니다.</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="hidden md:block absolute left-[39px] top-10 bottom-10 w-[2px] bg-wv-line" />
            <div className="space-y-8 md:space-y-10">
              {STEPS.map((s) => (
                <div key={s.num} className="flex gap-6 items-start relative">
                  <div className="shrink-0 w-[80px] h-[80px] rounded-full bg-wv-orangeSoft flex items-center justify-center relative z-10">
                    <span className="text-2xl font-black text-wv-orange">{s.num}</span>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-lg font-black text-wv-ink">{s.title}</h3>
                    <p className="mt-2 text-sm text-wv-gray leading-relaxed max-w-md">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 md:py-24 bg-wv-ink text-white">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-wv-orange">{s.value}</div>
                <div className="mt-2 text-sm text-white/70 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-wv-orange font-bold">Our Team</div>
            <h2 className="mt-4 text-display-lg font-black text-wv-ink leading-tight">재외동포 전문 행정사 & 실무진</h2>
            <p className="mt-4 text-wv-gray">풍부한 F-4 비자 실무 경험을 갖춘 전문가 팀이 고객의 성공을 지원합니다.</p>
          </div>
          <h3 className="text-lg font-black text-wv-ink mb-8 text-center">행정사</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-14">
            {admins.map((m) => (
              <div key={m.name} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-wv-line group-hover:border-wv-orange transition-colors">
                  <Image src={m.photo} alt={m.name} width={96} height={96} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-wv-ink text-sm">{m.name}</h4>
                <p className="text-xs text-wv-gray">{m.role}</p>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-black text-wv-ink mb-8 text-center">사무장 / 실장</h3>
          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            {staff.map((m) => (
              <div key={m.name} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-wv-line group-hover:border-wv-orange transition-colors">
                  <Image src={m.photo} alt={m.name} width={96} height={96} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-wv-ink text-sm">{m.name}</h4>
                <p className="text-xs text-wv-gray">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Messenger QR ── */}
      <section className="py-24 md:py-32 bg-wv-cream">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-wv-orange font-bold">Contact</div>
            <h2 className="mt-4 text-display-lg font-black text-wv-ink leading-tight">메신저 상담</h2>
            <p className="mt-4 text-wv-gray">편하신 메신저로 언제든 상담하세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {messengers.map((m) => (
              <div key={m.name} className="group rounded-3xl border border-wv-line bg-white p-6 text-center hover:border-wv-orange hover:shadow-lg transition-all duration-300">
                <div className="w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden border border-wv-line">
                  <Image src={m.qr} alt={`${m.name} QR Code`} width={112} height={112} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-sm font-black text-wv-ink">{m.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 bg-wv-ink text-white">
        <div className="container-x text-center">
          <h2 className="text-display-lg font-black leading-tight">F-4 비자, 혼자 고민하지 마세요</h2>
          <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            비전행정사사무소의 전문 행정사가 직접 케이스를 검토합니다.
            <br />
            지금 바로 무료 상담을 신청하세요.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary text-lg">무료 상담 신청</Link>
            <a href="tel:010-2081-3408" className="btn-ghost text-lg">
              <Phone size={18} />
              010-2081-3408
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
