"use client"
import { useEffect, useState } from "react"

const SLIDES = [
  { src: "/slides/family.jpg",       alt: "재외동포 가족" },
  { src: "/slides/passport.jpg",     alt: "여권 및 비자" },
  { src: "/slides/consultation.jpg", alt: "전문가 상담" },
  { src: "/slides/korea-flag.jpg",   alt: "대한민국 국적" },
  { src: "/slides/documents.jpg",    alt: "비자 서류" },
]
const INTERVAL = 5000

export function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    const t = setInterval(() => {
      setCur((c) => {
        setPrev(c)
        return (c + 1) % SLIDES.length
      })
    }, INTERVAL)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${s.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === cur ? 1 : 0,
          }}
          aria-hidden={i !== cur}
        />
      ))}
      <div className="hero-overlay absolute inset-0" />
      {/* dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(cur); setCur(i) }}
            aria-label={`슬라이드 ${i + 1}`}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{ background: i === cur ? "#f36c24" : "rgba(255,255,255,0.5)", transform: i === cur ? "scale(1.4)" : "scale(1)" }}
          />
        ))}
      </div>
    </div>
  )
}
