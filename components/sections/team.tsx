import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

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

export function TeamSection() {
  return (
    <section className="bg-secondary py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 text-center">
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

        {/* 행정사 */}
        <h3 className="text-xl font-bold text-foreground mb-6 text-center">행정사</h3>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-6">
          {admins.map((member) => (
            <Card key={member.name} className="border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-4 text-center">
                <div className="mx-auto mb-3 w-20 h-20 rounded-full overflow-hidden border-2 border-border">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-foreground text-sm">{member.name}</h4>
                <p className="text-xs text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 사무장 · 실장 */}
        <h3 className="text-xl font-bold text-foreground mb-6 text-center">사무장 · 실장</h3>
        <div className="grid gap-6 grid-cols-3 max-w-md mx-auto">
          {staff.map((member) => (
            <Card key={member.name} className="border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="p-4 text-center">
                <div className="mx-auto mb-3 w-20 h-20 rounded-full overflow-hidden border-2 border-border">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-foreground text-sm">{member.name}</h4>
                <p className="text-xs text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
