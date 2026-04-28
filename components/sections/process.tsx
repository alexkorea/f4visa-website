import { MessageSquare, FileText, ClipboardCheck, Send, CheckCircle } from "lucide-react"

const processSteps = [
  {
    step: 1,
    title: "사전 상담 / 케이스 진단",
    description: "고객님의 상황을 파악하고 최적의 진행 방안을 제안합니다. 필요 서류, 예상 기간, 비용 등을 상세히 안내해 드립니다.",
    icon: MessageSquare,
  },
  {
    step: 2,
    title: "한국 내 서류 발급 대행",
    description: "한국에서 발급받아야 하는 각종 서류를 고객님을 대신하여 발급받습니다. 기본증명서, 가족관계증명서 등 필요한 모든 서류를 준비합니다.",
    icon: FileText,
  },
  {
    step: 3,
    title: "신청서 작성 / 서류 검토",
    description: "전문가가 신청서를 작성하고 모든 서류를 꼼꼼히 검토합니다. 누락이나 오류 없이 완벽한 서류를 준비합니다.",
    icon: ClipboardCheck,
  },
  {
    step: 4,
    title: "접수 / 심사 대응",
    description: "관할 기관에 서류를 접수하고 심사 과정에서 발생하는 추가 요청에 신속히 대응합니다.",
    icon: Send,
  },
  {
    step: 5,
    title: "수령 / 사후 관리",
    description: "완료된 서류를 고객님께 안전하게 전달하고 이후 필요한 추가 안내와 사후 관리를 제공합니다.",
    icon: CheckCircle,
  },
]

export function ProcessSection() {
  return (
    <section className="bg-primary py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Our Process
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary-foreground md:text-4xl">
            업무 진행 절차
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            체계적인 5단계 프로세스로 복잡한 행정 업무를
            <br className="hidden sm:inline" />
            정확하고 신속하게 처리해 드립니다.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-primary-foreground/20 lg:block" />
          
          <div className="grid gap-8 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary-foreground/30 bg-primary">
                  <step.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                
                {/* Step number */}
                <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {step.step}
                </div>
                
                <h3 className="mt-4 text-lg font-semibold text-primary-foreground">
                  {step.title}
                </h3>
                
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                  {step.description}
                </p>
                
                {/* Mobile connection arrow */}
                {index < processSteps.length - 1 && (
                  <div className="mt-6 flex items-center justify-center lg:hidden">
                    <svg className="h-6 w-6 text-primary-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
