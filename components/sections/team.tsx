import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "김민수",
    role: "대표 행정사",
    specialty: "F-4 비자, 영주권 전문",
    description: "15년 이상의 재외동포 업무 경험으로 복잡한 케이스도 정확하게 처리합니다.",
    initials: "김",
  },
  {
    name: "이서연",
    role: "선임 행정사",
    specialty: "국적상실, 국적회복 전문",
    description: "국적 관련 업무의 전문가로 세밀한 서류 검토와 심사 대응을 담당합니다.",
    initials: "이",
  },
  {
    name: "박지훈",
    role: "행정사",
    specialty: "거소증, 서류대행 전문",
    description: "신속하고 정확한 서류 처리로 고객의 소중한 시간을 절약해 드립니다.",
    initials: "박",
  },
  {
    name: "최은지",
    role: "고객 상담팀장",
    specialty: "해외 고객 상담 전문",
    description: "영어, 중국어, 일본어 상담이 가능하며 해외 고객 응대를 전담합니다.",
    initials: "최",
  },
]

export function TeamSection() {
  return (
    <section className="bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-14 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Our Team
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            전문가 소개
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            풍부한 경험과 전문 지식을 갖춘 행정 전문가들이
            <br className="hidden sm:inline" />
            고객님의 성공적인 업무 처리를 위해 함께합니다.
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-6 text-center">
                {/* Avatar placeholder */}
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-semibold text-primary">
                    {member.initials}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {member.role}
                </p>
                <p className="mt-1 text-xs text-accent">
                  {member.specialty}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
