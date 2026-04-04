import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const messengers = [
  { name: "Kakao Talk", qr: "/qr/kakao.jpg" },
  { name: "WeChat", qr: "/qr/wechat.jpg" },
  { name: "LINE", qr: "/qr/line.jpg" },
  { name: "WhatsApp", qr: "/qr/whatsapp.jpg" },
]

export function MessengerContactSection() {
  return (
    <section className="bg-secondary py-6 lg:py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            편리한 상담 채널
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            전 세계 어디서나 익숙한 메신저로 상담받으세요
          </p>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 max-w-3xl mx-auto">
          {messengers.map((m) => (
            <Card key={m.name} className="border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center p-3 text-center">
                <div className="w-24 h-24 mb-1.5 rounded-lg overflow-hidden border border-border">
                  <Image
                    src={m.qr}
                    alt={`${m.name} QR Code`}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {m.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
