import Link from "next/link"
import { ArrowRight, FileSearch, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const resources = [
  {
    title: "거소증 서류확인",
    description: "거소증 신청에 필요한 서류 목록과 준비 방법을 확인하세요. 자주 묻는 질문과 체크리스트를 제공합니다.",
    icon: FileSearch,
    href: "/resources/document-check",
    tag: "서류 가이드",
  },
  {
    title: "블로그",
    description: "F-4 비자, 국적상실, 영주권 등 재외동포 업무에 관한 최신 정보와 유용한 팁을 공유합니다.",
    icon: BookOpen,
    href: "/resources/blog",
    tag: "최신 소식",
  },
]

export function ResourcesSection() {
  return (
    <section className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Resources
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">
            자료실
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            재외동포 업무에 필요한 정보와 자료를 확인하세요.
            <br className="hidden sm:inline" />
            서류 준비부터 최신 정책까지 유용한 콘텐츠를 제공합니다.
          </p>
        </div>
        
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {resources.map((resource) => (
            <Card key={resource.title} className="group relative overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 inline-flex">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                    {resource.tag}
                  </span>
                </div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="group-hover:bg-primary group-hover:text-primary-foreground">
                  <Link href={resource.href} className="flex items-center gap-2">
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
