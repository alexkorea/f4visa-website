const STEPS = [
  { num: 1, title: "사전 상담 / 케이스 진단", desc: "고객님의 상황을 파악하고 최적의 진행 방안을 제안합니다." },
  { num: 2, title: "한국 내 서류 발급 대행", desc: "기본증명서, 가족관계증명서 등 필요한 모든 서류를 준비합니다." },
  { num: 3, title: "신청서 작성 / 서류 검토", desc: "전문가가 신청서를 작성하고 모든 서류를 꼼꼼히 검토합니다." },
  { num: 4, title: "접수 / 심사 대응", desc: "관할 기관에 서류를 접수하고 추가 요청에 신속히 대응합니다." },
  { num: 5, title: "수령 / 사후 관리", desc: "완료된 서류를 안전하게 전달하고 사후 관리를 제공합니다." },
]

export function ProcessSection() {
  return (
    <section className="bg-primary py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-6 text-center">
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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {STEPS.map((s) => (
            <div key={s.num} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-wv-orangeSoft flex items-center justify-center">
                <span className="text-xl font-black text-wv-orange">{s.num}</span>
              </div>
              <h3 className="mt-3 text-base font-black text-primary-foreground">{s.title}</h3>
              <p className="mt-1 text-xs text-primary-foreground/70 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
