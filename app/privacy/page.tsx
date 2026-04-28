import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "비전행정사사무소의 개인정보처리방침입니다.",
  alternates: {
    canonical: "https://f4visa.net/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">개인정보처리방침</h1>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">
              비전행정사사무소(이하 &quot;사무소&quot;)는 개인정보보호법에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-10 mb-4">1. 개인정보의 처리 목적</h2>
            <p className="text-muted-foreground">사무소는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
            <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
              <li>F-4 비자, 거소증, 국적 관련 상담 및 업무 대행</li>
              <li>고객 문의 접수 및 회신</li>
              <li>서비스 제공에 관한 계약 이행</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-10 mb-4">2. 수집하는 개인정보 항목</h2>
            <p className="text-muted-foreground">사무소는 상담 및 업무 대행을 위하여 다음의 개인정보를 수집합니다.</p>
            <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
              <li>필수항목: 이름, 이메일, 전화번호</li>
              <li>선택항목: 국적, 비자유형, 문의내용</li>
            </ul>
            <p className="text-muted-foreground mt-2">수집방법: 홈페이지 상담문의 양식, 전화, 이메일</p>

            <h2 className="text-xl font-semibold text-foreground mt-10 mb-4">3. 개인정보의 보유 및 이용기간</h2>
            <p className="text-muted-foreground">사무소는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만, 상담 완료 후 분쟁 대비 목적으로 <strong>1년간</strong> 보유한 후 파기합니다.</p>
            <p className="text-muted-foreground mt-2">관계법령에 의한 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.</p>

            <h2 className="text-xl font-semibold text-foreground mt-10 mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-muted-foreground">사무소는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.</p>
            <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-10 mb-4">5. 개인정보의 파기</h2>
            <p className="text-muted-foreground">사무소는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.</p>
            <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
              <li>전자적 파일 형태: 복구 및 재생이 불가능한 방법으로 영구 삭제</li>
              <li>종이 문서: 분쇄기로 분쇄하거나 소각</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground mt-10 mb-4">6. 정보주체의 권리</h2>
            <p className="text-muted-foreground">이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
            <p className="text-muted-foreground mt-2">위 권리 행사는 서면, 전화, 이메일 등을 통하여 하실 수 있으며, 사무소는 이에 대해 지체 없이 조치하겠습니다.</p>

            <h2 className="text-xl font-semibold text-foreground mt-10 mb-4">7. 개인정보 보호책임자</h2>
            <p className="text-muted-foreground">사무소는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            <div className="bg-muted/50 rounded-lg p-6 mt-4 text-muted-foreground">
              <p><strong className="text-foreground">개인정보 보호책임자</strong></p>
              <p>성명: 김영주</p>
              <p>연락처: 02-363-2251</p>
              <p>이메일: 5000meter@gmail.com</p>
            </div>

            <div className="mt-10 pt-6 border-t border-border text-sm text-muted-foreground">
              <p>상호: 비전행정사사무소</p>
              <p>사업자등록번호: 405-05-54079</p>
              <p>대표: 이원중</p>
              <p>주소: 서울특별시 중구 퇴계로 324, 3층</p>
              <p className="mt-4">본 방침은 2025년 4월 25일부터 시행됩니다.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
