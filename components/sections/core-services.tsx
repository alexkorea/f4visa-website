import Link from "next/link"
import { ArrowRight, FileX, CreditCard, Home, RefreshCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "국적상실",
    description: "외국 국적 취득 후 한국 국적을 상실하는 절차를 안내합니다. 국적선택, 이중국적 포기 등 복잡한 과정을 체계적으로 지원해 드립니다.",
    icon: FileX,
    href: "/nationality-loss",
    features: ["국적선택 신고", "이중국적 포기", "국적상실 증명"],
  },
  {
    title: "F-4비자 거소증",
    description: "재외동포(F-4) 비자 발급 및 거소증 신청 업무를 전문적으로 처리합니다. 서류 준비부터 접수까지 원스톱 서비스를 제공합니다.",
    icon: CreditCard,
    href: "/f4-visa",
    features: ["F-4 비자 신청", "거소증 발급", "비자 연장"],
  },
  {
    title: "영주권",
    description: "한국 영주권(F-5) 취득을 위한 자격 검토부터 신청까지 전 과정을 안내합니다. 장기 체류 계획에 맞는 최적의 솔루션을 제안합니다.",
    icon: Home,
    href: "/permanent-residency",
    features: ["자격 요건 검토", "서류 준비 대행", "신청 및 접수"],
  },
  {
    title: "국적회복",
    description: "과거 대한민국 국민이었던 분들의 국적 회복 절차를 지원합니다. 복잡한 심사 과정을 전문적으로 대응해 드립니다.",
    icon: RefreshCcw,
    href: "/nationality-recovery",
    features: ["국적회복 허가", "서류 대행", "심사 대응"],
  },
]

export function CoreServicesSection() {
  return (
    <section id="services" className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Our Services
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            핵심 서비스
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            재외동포를 위한 4가지 핵심 행정 서비스를 제공합니다.
            <br className="hidden sm:inline" />
            각 서비스에 대한 전문적인 상담과 체계적인 지원을 받아보세요.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} className="group relative overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground">
                  <Link href={service.href} className="flex items-center gap-2">
                    자세히 보기
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
