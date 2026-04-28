"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ITEMS = [
  {
    q: "F-4 비자 신청 자격은 어떻게 되나요?",
    a: "대한민국 국적을 보유했던 자 또는 그 직계비속으로서 외국 국적을 취득한 재외동포가 대상입니다. 구체적인 자격 요건은 출생 시기, 국적 변동 사유 등에 따라 달라지므로 상담을 통해 확인하시는 것이 좋습니다.",
  },
  {
    q: "거소증 발급까지 얼마나 걸리나요?",
    a: "일반적으로 F-4 비자 발급 후 거소증 신청 시 2~4주 정도 소요됩니다. 서류 준비 상태와 출입국관리사무소 심사 상황에 따라 다를 수 있습니다.",
  },
  {
    q: "해외에서도 상담 및 의뢰가 가능한가요?",
    a: "네, 가능합니다. 카카오톡, 위챗, LINE, WhatsApp 등 다양한 메신저를 통해 원격 상담을 진행하며, 서류 해외 송달 서비스도 제공합니다.",
  },
  {
    q: "국적상실 신고와 F-4 비자를 동시에 진행할 수 있나요?",
    a: "국적상실 신고 후 F-4 비자 신청이 가능합니다. 두 절차를 연계하여 효율적으로 진행할 수 있도록 전문적으로 안내합니다.",
  },
  {
    q: "F-4 비자에서 영주권(F-5)으로 전환할 수 있나요?",
    a: "네, F-4 비자 소지자는 일정 요건을 충족하면 F-5 영주권으로 전환이 가능합니다. 체류 기간, 소득 요건 등을 사전에 검토해 드립니다.",
  },
  {
    q: "상담 비용은 얼마인가요?",
    a: "초기 상담은 무료입니다. 케이스 검토 후 예상 비용과 절차를 안내 드립니다. 비용은 업무 유형과 복잡도에 따라 다르며, 상담 시 투명하게 안내합니다.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container-x max-w-3xl">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-wv-orange font-bold">FAQ</div>
          <h2 className="mt-4 text-display-lg font-black text-wv-ink leading-tight">자주 묻는 질문</h2>
        </div>
        <div className="space-y-3">
          {ITEMS.map((item, i) => (
            <div key={i} className="border border-wv-line rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span className="font-bold text-wv-ink text-sm md:text-base pr-4">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-wv-gray shrink-0 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIdx === i ? "max-h-96 pb-5 md:pb-6" : "max-h-0"}`}>
                <p className="px-5 md:px-6 text-sm text-wv-gray leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
