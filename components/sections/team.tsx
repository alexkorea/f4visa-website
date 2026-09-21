import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const admins = [
  { name: "이시정", role: "대표행정사", photo: "/team/leesj.jpg" },
  { name: "이원중", role: "행정사", photo: "/team/leewj.jpg" },
  { name: "정유선", role: "행정사", photo: "/team/jungyus.jpg" },
]

const staff = [
  { name: "백승수", role: "사무장", photo: "/team/baekss.jpg" },
  { name: "김영주", role: "실장", photo: "/team/kimyj.jpg" },
]

function MemberCard({ member }: { member: { name: string; role: string; photo: string } }) {
  return (
    <Card className="w-40 sm:w-44 border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="px-2 py-3 text-center">
        <div className="mx-auto mb-2 w-[134px] h-[134px] rounded-full overflow-hidden border-2 border-border">
          <Image src={member.photo} alt={member.name} width={160} height={160} className="w-full h-full object-cover" />
        </div>
        <h4 className="font-semibold text-foreground text-base">{member.name}</h4>
        <p className="text-sm text-primary">{member.role}</p>
      </CardContent>
    </Card>
  )
}

export function TeamSection() {
  return (
    <section className="section section-alt">
      <div className="container-x">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">전문가 소개</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            풍부한 경험과 전문 지식을 갖춘 행정 전문가들이 함께합니다.
          </p>
        </div>

        {/* 한 줄: 왼쪽 행정사 3명 / 오른쪽 사무장·실장 2명 */}
        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-foreground mb-3">행정사</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {admins.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-foreground mb-3">사무장 · 실장</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {staff.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
