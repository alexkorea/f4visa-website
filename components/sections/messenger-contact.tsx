import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const messengerChannels = [
  {
    name: "카카오톡",
    description: "국내외 어디서나 편리하게 상담",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M12 3C6.48 3 2 6.58 2 11c0 2.82 1.86 5.29 4.64 6.7-.15.57-.52 2.04-.6 2.36-.1.41.15.41.31.3.13-.09 1.97-1.34 2.77-1.88.59.09 1.2.13 1.83.13 5.52 0 10-3.58 10-8C22 6.58 17.52 3 12 3z" />
      </svg>
    ),
    href: "#",
    color: "bg-[#FEE500] hover:bg-[#FEE500]/90",
    textColor: "text-[#3C1E1E]",
  },
  {
    name: "웨이신",
    description: "중국 고객 전용 상담 채널",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M8.69 14.56c-.42 0-.76-.34-.76-.76s.34-.76.76-.76.76.34.76.76-.34.76-.76.76zm6.62 0c-.42 0-.76-.34-.76-.76s.34-.76.76-.76.76.34.76.76-.34.76-.76.76zM12 2C6.48 2 2 6.03 2 11c0 2.83 1.28 5.35 3.28 7.02-.08.45-.44 2.47-.51 2.88-.08.5.19.5.38.38.15-.1 2.45-1.66 3.43-2.33.79.13 1.61.2 2.42.2 5.52 0 10-4.03 10-9S17.52 2 12 2z" />
      </svg>
    ),
    href: "#",
    color: "bg-[#07C160] hover:bg-[#07C160]/90",
    textColor: "text-white",
  },
  {
    name: "라인",
    description: "일본 및 동남아 고객 상담",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M12 2C6.48 2 2 5.82 2 10.5c0 4.18 3.69 7.68 8.68 8.36.34.07.8.22.92.51.1.26.07.66.03.93l-.15.9c-.04.26-.2 1.03.9.56 1.1-.47 5.95-3.5 8.12-5.99C21.97 13.12 22 11.81 22 10.5 22 5.82 17.52 2 12 2zm-3.5 11h-2c-.28 0-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5s.5.22.5.5v3.5h1.5c.28 0 .5.22.5.5s-.22.5-.5.5zm2.5-.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5s.5.22.5.5v4zm4.5.5h-2c-.28 0-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5s.5.22.5.5v3.5h1.5c.28 0 .5.22.5.5s-.22.5-.5.5zm3-2.5c.28 0 .5.22.5.5s-.22.5-.5.5h-1.5v1h1.5c.28 0 .5.22.5.5s-.22.5-.5.5h-2c-.28 0-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5h2c.28 0 .5.22.5.5s-.22.5-.5.5h-1.5v1h1.5z" />
      </svg>
    ),
    href: "#",
    color: "bg-[#00B900] hover:bg-[#00B900]/90",
    textColor: "text-white",
  },
  {
    name: "왓츠앱",
    description: "미주 및 유럽 고객 상담",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.16-1.34C8.57 21.51 10.24 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.46 14.12c-.23.64-.67 1.18-1.28 1.57-.61.4-1.33.55-2.03.43-.8-.14-1.55-.46-2.22-.91-.9-.61-1.7-1.36-2.37-2.22-.54-.68-.98-1.43-1.28-2.24-.22-.58-.31-1.2-.27-1.81.04-.49.19-.96.44-1.39.2-.33.46-.62.76-.85.2-.16.44-.24.68-.24.13 0 .26.01.38.04.2.05.36.17.48.33.15.2.28.41.39.64.08.17.17.35.25.52.1.21.05.45-.12.6-.08.07-.16.14-.25.2-.09.07-.19.13-.28.21-.09.08-.09.21-.03.31.24.39.52.75.84 1.07.35.35.74.65 1.16.91.1.06.22.06.31-.02.17-.15.33-.31.49-.47.16-.17.39-.22.6-.12.23.1.45.21.68.32.17.08.34.17.5.27.16.1.27.27.3.46.03.17.02.35-.04.52z" />
      </svg>
    ),
    href: "#",
    color: "bg-[#25D366] hover:bg-[#25D366]/90",
    textColor: "text-white",
  },
]

export function MessengerContactSection() {
  return (
    <section className="bg-secondary py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            편리한 상담 채널
          </h2>
          <p className="mt-3 text-muted-foreground">
            전 세계 어디서나 익숙한 메신저로 상담받으세요
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {messengerChannels.map((channel) => (
            <Card key={channel.name} className="border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${channel.color} ${channel.textColor}`}>
                  {channel.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {channel.name}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {channel.description}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-4"
                  asChild
                >
                  <a href={channel.href}>문의하기</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
