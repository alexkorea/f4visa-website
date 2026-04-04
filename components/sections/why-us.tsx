import { Users, FileCheck, Send } from "lucide-react"

const valueProps = [
  {
    title: "풍부한 경험의 행정전문가들",
    description: "15년 이상의 재외동포 업무 경험을 보유한 행정 전문가들이 복잡한 케이스도 정확하게 처리합니다. 수천 건의 성공 사례를 바탕으로 최적의 솔루션을 제안해 드립니다.",
    icon: Users,
  },
  {
    title: "한국 내 서류 발급 대행",
    description: "해외에 계신 고객님을 대신하여 한국 내 모든 서류 발급을 대행합니다. 주민센터, 구청, 법원 등 복잡한 기관 방문 없이 편리하게 서류를 준비하실 수 있습니다.",
    icon: FileCheck,
  },
  {
    title: "비용 걱정 없는 서류 해외 송달",
    description: "완성된 서류는 전 세계 어디로든 안전하게 송달해 드립니다. EMS, DHL 등 신뢰할 수 있는 배송 서비스를 통해 빠르고 안전하게 받아보실 수 있습니다.",
    icon: Send,
  },
]

export function WhyUsSection() {
  return (
    <section className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Why Choose Us
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            왜 저희를 선택해야 할까요?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            해외 거주 재외동포를 위한 맞춤형 서비스로
            <br className="hidden sm:inline" />
            복잡한 행정 업무를 간편하게 처리해 드립니다.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {valueProps.map((prop, index) => (
            <div 
              key={prop.title} 
              className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg"
            >
              {/* Number indicator */}
              <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {index + 1}
              </div>
              
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <prop.icon className="h-7 w-7 text-primary" />
              </div>
              
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {prop.title}
              </h3>
              
              <p className="leading-relaxed text-muted-foreground">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
