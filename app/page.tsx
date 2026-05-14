import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/structured-data"
import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"
import FAQSection from "@/components/FAQSection"

/* ─── data ─── */
const services = [
  { title: "국적상실", desc: "외국 국적 취득 후 한국 국적을 상실하는 절차를 안내합니다. 국적선택, 이중국적 포기 등 복잡한 과정을 체계적으로 지원해 드립니다." },
  { title: "F-4비자 거소증", desc: "재외동포(F-4) 비자 발급 및 거소증 신청 업무를 전문적으로 처리합니다. 서류 준비부터 접수까지 원스톱 서비스를 제공합니다." },
  { title: "영주권", desc: "한국 영주권(F-5) 취득 자격 검토부터 신청까지 전문적으로 안내합니다." },
  { title: "국적회복", desc: "과거 대한민국 국민이었던 분들의 국적 회복 절차를 전문 행정사가 대행합니다." },
]

const STEPS = [
  { num: "01", title: "사전 상담 / 케이스 진단", desc: "고객님의 상황을 파악하고 최적의 진행 방안을 제안합니다. 필요 서류, 예상 기간, 비용 등을 상세히 안내해 드립니다." },
  { num: "02", title: "한국 내 서류 발급 대행", desc: "한국에서 발급받아야 하는 각종 서류를 고객님을 대신하여 발급받습니다." },
  { num: "03", title: "신청서 작성 / 서류 검토", desc: "전문가가 신청서를 작성하고 모든 서류를 꼼꼼히 검토합니다." },
  { num: "04", title: "접수 / 심사 대응", desc: "관할 기관에 서류를 접수하고 심사 과정에서 발생하는 추가 요청에 신속히 대응합니다." },
  { num: "05", title: "수령 / 사후 관리", desc: "완료된 서류를 고객님께 안전하게 전달하고 이후 필요한 추가 안내와 사후 관리를 제공합니다." },
]

const BADGES = [
  "8년+ 경력 거소증 전문가",
  "해외 고객 원격 상담",
  "서류 해외 송달 가능",
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
      <section className="relative w-full min-h-[50vh] flex items-center overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <Image src="/slides/family.jpg" alt="재외동포 가족" fill className="object-cover" priority />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="relative z-10 w-full px-6 md:px-12 max-w-5xl mx-auto py-12">
          <h1 className="text-display-xl font-black text-white leading-[1.08]">
            재외동포 행정 서비스 전문
          </h1>
          <p className="mt-5 text-2xl md:text-3xl font-bold text-wv-orange leading-tight">
            신속한 거소증 발급 F-4 비자 · 국적상실 · 영주권
          </p>
          <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
            복잡한 재외동포 업무를 정확하고 빠르게 안내합니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary text-lg">상담문의</Link>
            <a href="#services" className="btn-ghost text-lg">서비스 보기</a>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-8 md:py-12 bg-wv-cream">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <div className="text-xs uppercase tracking-[0.12em] text-wv-orange font-bold">서비스 안내</div>
            <h2 className="mt-4 text-display-lg font-black text-wv-ink leading-tight">핵심 서비스</h2>
            <p className="mt-4 text-wv-gray">재외동포를 위한 4가지 핵심 행정 서비스를 제공합니다.<br className="hidden sm:inline" />각 서비스에 대한 전문적인 상담과 체계적인 지원을 받아보세요.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <div key={i} className="group rounded-2xl border border-wv-line bg-white p-6 hover:border-wv-orange hover:shadow-lg transition-all duration-300">
                <h3 className="text-base font-black text-wv-ink mb-2">{s.title}</h3>
                <p className="text-sm text-wv-gray leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/contact" className="btn-primary text-lg">업무 상담 문의하기</Link>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <div className="text-xs uppercase tracking-[0.12em] text-wv-orange font-bold">진행 절차</div>
            <h2 className="mt-4 text-display-lg font-black text-wv-ink leading-tight">업무 진행 절차</h2>
            <p className="mt-4 text-wv-gray">체계적인 5단계 프로세스로 복잡한 행정 업무를<br className="hidden sm:inline" />정확하고 신속하게 처리해 드립니다.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {STEPS.map((s) => (
                <div key={s.num} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-wv-orangeSoft flex items-center justify-center">
                    <span className="text-xl font-black text-wv-orange">{s.num}</span>
                  </div>
                  <h3 className="mt-3 text-base font-black text-wv-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-wv-gray leading-relaxed">{s.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-8 md:py-12 bg-wv-ink text-white">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-4">
            {BADGES.map((b) => (
              <span key={b} className="inline-block rounded-full border border-wv-orange/40 bg-wv-orange/10 px-6 py-3 text-sm font-bold text-wv-orange">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <div className="text-xs uppercase tracking-[0.12em] text-wv-orange font-bold">전문가 팀</div>
            <h2 className="mt-4 text-display-lg font-black text-wv-ink leading-tight">전문가 소개</h2>
            <p className="mt-4 text-wv-gray">풍부한 경험과 전문 지식을 갖춘 행정 전문가들이 함께합니다.</p>
          </div>
          <h3 className="text-lg font-black text-wv-ink mb-4 text-center">행정사</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {admins.map((m) => (
              <div key={m.name} className="text-center group">
                <div className="w-36 h-36 mx-auto mb-3 rounded-full overflow-hidden border-2 border-wv-line group-hover:border-wv-orange transition-colors">
                  <Image src={m.photo} alt={m.name} width={144} height={144} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-wv-ink text-sm">{m.name}</h4>
                <p className="text-xs text-wv-gray">{m.role}</p>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-black text-wv-ink mb-4 text-center">사무장 · 실장</h3>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {staff.map((m) => (
              <div key={m.name} className="text-center group">
                <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden border-2 border-wv-line group-hover:border-wv-orange transition-colors">
                  <Image src={m.photo} alt={m.name} width={128} height={128} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-wv-ink text-sm">{m.name}</h4>
                <p className="text-xs text-wv-gray">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Messenger QR ── */}
      <section className="py-8 md:py-12 bg-wv-cream">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <div className="text-xs uppercase tracking-[0.12em] text-wv-orange font-bold">상담 채널</div>
            <h2 className="mt-4 text-display-lg font-black text-wv-ink leading-tight">편리한 상담 채널</h2>
            <p className="mt-4 text-wv-gray">전 세계 어디서나 익숙한 메신저로 상담받으세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
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
      <section className="py-8 md:py-12 bg-wv-ink text-white">
        <div className="container-x text-center">
          <h2 className="text-display-lg font-black leading-tight">전문 상담을 통해<br />내 상황에 맞는 절차를 확인하세요</h2>
          <p className="mt-5 text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
            F-4 비자, 거소증, 국적상실, 국적회복, 영주권 상담을 전문적으로 도와드립니다.
            해외에서도 편리하게 진행할 수 있는 체계적인 행정 서비스를 경험하세요.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary text-lg">상담문의</Link>
            <a href="tel:010-2081-3408" className="btn-ghost text-lg">
              <Phone size={18} />
              전화문의
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
