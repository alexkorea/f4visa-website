"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "신속한 거소증 발급",
    subtitle: "F-4 비자 · 국적상실 · 영주권",
    description: "복잡한 재외동포 업무를 정확하고 빠르게 안내합니다.",
    image: "/slides/consultation.jpg",
  },
  {
    title: "재외동포 행정 서비스 전문",
    subtitle: "국적회복 · 국적이탈 · 복수국적",
    description: "한국 내 서류 준비부터 신청, 접수, 사후 관리까지 체계적으로 지원합니다.",
    image: "/slides/documents.jpg",
  },
  {
    title: "해외에서도 안심 상담",
    subtitle: "서류 해외 송달 · 원격 상담",
    description: "해외 거주 재외동포를 위해 국내 서류 발급 대행 및 해외 송달을 지원합니다.",
    image: "/slides/cityscape.jpg",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-20 flex min-h-[600px] items-end justify-center pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
              재외동포 행정 서비스 전문
            </div>

            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {slides[current].title}
              <span className="mt-2 block text-blue-300">{slides[current].subtitle}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/80 md:text-xl">
              {slides[current].description}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="min-w-[160px] bg-white text-slate-900 hover:bg-white/90">
                <Link href="/contact">
                  상담문의
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="min-w-[160px] border-white/40 text-white hover:bg-white/10">
                <Link href="#services">서비스 보기</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild className="text-white hover:bg-white/10">
                <a href="tel:010-2081-3408" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>010-2081-3408</span>
                </a>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/70">
              {["8년+ 경력 거소증 전문가", "해외 고객 원격 상담", "서류 해외 송달 가능"].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="mt-8 flex items-center justify-center gap-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`슬라이드 ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
