import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "F-4 비자 종류 | 재외동포 행정서비스",
  description:
    "F-4 비자 종류별 대상 및 제출 서류 안내. F-4-11부터 F-4-99까지 모든 세부 자격을 확인하세요.",
}

const table1Rows = [
  {
    code: "F-4-11",
    target:
      "출생에 의하여 대한민국 국적을 보유하였던 자로서 외국 국적을 취득한 사람",
    documents:
      "본인이 대한민국의 국민이었던 사실을 증명하는 서류 (가족관계기록사항에 관한 증명서, 제적등본 또는 폐쇄등록부 기타 본인이 대한민국의 국민이었던 사실을 증명하는 서류), 외국 국적을 취득한 원인 및 연월일을 증명하는 서류",
  },
  {
    code: "F-4-12",
    target:
      "위 대상의 직계비속으로서 외국 국적을 취득한 사람",
    documents:
      "직계존속이 대한민국의 국민이었던 사실을 증명하는 서류 (가족관계기록사항에 관한 증명서, 제적등본 또는 폐쇄등록부), 여권 등 본인과 직계존속의 외국 국적 취득 원인 및 연월일을 증명하는 서류, 직계존비속의 관계임을 증명하는 서류 (출생증명서 등)",
  },
]

const table2Rows = [
  {
    code: "F-4-13",
    target:
      "문화예술(D-1) 및 취재(D-5) 내지 무역경영(D-9), 교수(E-1) 내지 특정활동(E-7) 자격으로 국내에서 6개월 이상 체류한 사실이 있는 사람",
    documents: "대상 여부는 출입국정보시스템으로 확인",
  },
  {
    code: "F-4-14",
    target:
      "국내외 전문학사(2년제 이상 졸업자) 이상 학위 소지자 및 국제교육진흥원 등 정부 초청 장학생. (국외전문학사 소지자는 TOPIK 3급 이상 소지 또는 사회통합프로그램 4단계 이상 이수자에 한함)",
    documents:
      "재학증명서 또는 졸업증명서, 정부 초청 장학생은 그 사실을 입증하는 서류, 국외전문학사 소지자는 한국어능력 등 입증 자료",
  },
  {
    code: "F-4-15",
    target: "OECD 국가의 영주권 소지자",
    documents:
      "각국의 해당 기관에서 작성한 영주권자임을 확인하여 주는 문서",
  },
  {
    code: "F-4-16",
    target:
      "법인기업체 대표 및 등기 임원 및 관리직 직원. 관리직 직원의 경우 1개 기업당 전체 2명 범위 내 재외동포 자격 부여. (법인 설립 후 1년 이상 경과한 기업체에 한하며, 임원은 6개월 이상, 직원은 1년 이상 재직한 경우에 한함)",
    documents:
      "법인대표 및 등기 임원: 법인등기부등본에 상응하는 해당국의 공적 서류, 재직증명서 및 비취업서약서. 법인기업체 소속 직원: 법인대표의 국내거소신고증 사본 또는 F-4 사증발급사항 사본, 소속업체 법인등기부등본, 재직증명서, 기업대표의 신원보증서 및 비취업서약서",
  },
  {
    code: "F-4-17",
    target:
      "전년도 기준 매출액이 미화 10만불 이상의 개인기업(자영업 대표)",
    documents: "매출실적 증빙자료, 영업허가증 등 사업자등록증에 상응하는 증명서",
  },
  {
    code: "F-4-18",
    target:
      "다국적기업 임직원, 언론사 임원과 기자, 변호사, 회계사, 의사, 거주국 정부 공인 1급/2급 예술가, 산업상 기술연구개발 연구원, 중급 이상 농업기술자, 선박 또는 민간항공 분야 고급기술자",
    documents:
      "재직증명서 및 소속 단체 등의 사업자등록증 사본 기타 직업별 해당 자격증",
  },
  {
    code: "F-4-19",
    target:
      "거주국에서 공인한 동포단체 또는 문화예술단체(협회)의 대표 및 부대표. 단체당 소속 직원 또는 회원 10명, 법무부 동포체류지원센터 지정 단체 소속 직원 2명, 자원봉사자 연간 최대 4명까지 가능",
    documents:
      "소속 단체 등록증명서 및 재직증명서, 동포단체 현황표, 대표 추천서, 비취업서약서 등",
  },
  {
    code: "F-4-20",
    target: "전현직 국회의원, 5년 이상 재직 공무원 및 국영기업체 직원",
    documents: "재직증명서",
  },
  {
    code: "F-4-21",
    target:
      "대학교수(부교수, 강사 포함), 중고등학교 또는 초등학교 교사",
    documents:
      "재직증명서, 주재국 정부 임명장 또는 고등 및 중등전문학교 강사자격증, 교사자격증",
  },
  {
    code: "F-4-22",
    target:
      "국내에서 개인사업체를 경영하고자 하는 사람. 본인의 자산으로 3억 이상 투자자 또는 2억 이상(1인 이상 국민 6개월 이상 고용) 투자자",
    documents:
      "투자기업 등록신청서, 송금 및 반입자금 내역, 환전증명 및 사용명세서, 사업장 임대차 계약서 등",
  },
  {
    code: "F-4-24",
    target:
      "방문취업 자격자로서 육아도우미, 농축산업/어업/뿌리산업/지방소재 제조업의 동일사업장에서 계속하여 2년 이상 근무하고 있는 자. 지역 및 업종에 관계없이 동일사업장에서 4년 이상 근무자. 계절근로 참여 동포(G-1-19) 중 180일 이상 근무한 사람",
    documents:
      "최근 2년간 해당 업종 계속 고용관계 증명서류(근로소득원천징수영수증), 사업자등록증 사본, 뿌리기업 확인서, 교육이수증(육아도우미에 한함)",
  },
  {
    code: "F-4-25",
    target: "60세 이상 외국국적 동포 (순수관광 제외)",
    documents: "대상 여부는 동포 입증 서류로 확인",
  },
  {
    code: "F-4-26",
    target:
      "한중 수교 전 입국하여 특별체류 허가 및 사증을 받아 방문취업 자격으로 체류 중인 자 (신규 사증발급 및 자격변경 중단)",
    documents: "대상 여부는 출입국정보시스템으로 확인",
  },
  {
    code: "F-4-27",
    target:
      "국내 공인 국가기술자격증(기능사 이상) 취득자. 금속재창호 종목은 2013년 취득자까지만 인정. 60일 이상 계절근로 참여 동포 중 자격증 취득자(2022.1.3. 이전 취득자에 한함)",
    documents: "자격증 사본(원본 제시)",
  },
  {
    code: "F-4-28",
    target:
      "사회통합프로그램 4단계 이상 이수한 사람, 사전평가에서 5단계를 배정받은 사람, 귀화용 종합평가에서 합격하여 5단계를 배정받은 사람",
    documents:
      "대상 여부는 사회통합정보망(Soci-Net)에서 확인. 4단계 이상 이수는 별도의 유효기간 없음. 사전평가 및 귀화용 종합평가 합격에 따른 5단계 배정은 발표일로부터 2년간 유효",
  },
  {
    code: "F-4-29",
    target:
      "국내 고등학교 졸업자 (초중등교육법 제3호의 고등학교, 특수학교, 각종 학교, 검정고시 합격자, 교육부 인가 외국 교육기관, 제주 국제학교 고등교육 과정 졸업자 포함)",
    documents:
      "졸업증명서 또는 검정고시 합격증명서. 외국인학교/외국교육기관/제주국제학교 졸업자: 국내 학력 인정 교과목 이수 입증 서류 또는 한국어능력 입증 서류",
  },
  {
    code: "F-4-30",
    target:
      "국내 초중고교 재학 동포 자녀 (부 또는 모가 외국인 등록/거소신고를 하고 국내 체류 중인 동포의 자녀)",
    documents:
      "재학증명서 등 학교장이 발급한 재학 여부 증빙 서류, 병원급 의료기관이 발급한 진단서, 동포 증명 서류",
  },
  {
    code: "F-4-31",
    target:
      "국가 전문 자격증 취득자 (인정 분야: 노인복지법에 따른 요양보호사)",
    documents: "자격증 사본(원본 제시)",
  },
  {
    code: "F-4-99",
    target:
      "과거 재외동포(F-4) 자격 소지자로서 상기 세부 대상 자격에 해당하지 않는 사람. (과거 범법행위 등으로 자격이 상실된 자는 제외)",
    documents:
      "외국국적동포 입증 서류, 재외동포 자격 부여 입증 서류(필요시)",
  },
]

export default function F4VisaTypesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 lg:py-28">
          <div className="absolute inset-0 bg-[url('/slides/documents.jpg')] bg-cover bg-center opacity-10" />
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
              F-4 Visa Types
            </p>
            <h1 className="mt-3 text-3xl font-bold text-primary-foreground md:text-5xl">
              F-4 비자 종류
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              사증발급신청 등 첨부서류에 관한 고시
            </p>
          </div>
        </section>

        {/* Table 1 */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
              &ldquo;사증발급신청 등 첨부서류에 관한 고시&rdquo;국가 외의
              외국국적동포
            </h2>
            <p className="mb-8 text-muted-foreground">
              대한민국 국적을 보유하였던 자 및 그 직계비속 대상
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border/50">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-4 py-3 text-left font-semibold text-foreground w-24">
                      코드
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground w-[40%]">
                      대상
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      제출 서류
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {table1Rows.map((row, i) => (
                    <tr
                      key={row.code}
                      className={`border-b border-border/50 ${
                        i % 2 === 0 ? "bg-card" : "bg-background"
                      }`}
                    >
                      <td className="px-4 py-4 font-medium text-primary align-top">
                        {row.code}
                      </td>
                      <td className="px-4 py-4 text-foreground align-top">
                        {row.target}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground align-top">
                        {row.documents}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Table 2 */}
        <section className="bg-secondary/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
              &ldquo;사증발급신청 등 첨부서류에 관한 고시&rdquo;국가의
              외국국적동포
            </h2>
            <p className="mb-8 text-muted-foreground">
              F-4-13부터 F-4-99까지 세부 자격별 대상 및 제출 서류
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border/50">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-4 py-3 text-left font-semibold text-foreground w-24">
                      코드
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground w-[40%]">
                      세부 대상
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-foreground">
                      제출 서류
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {table2Rows.map((row, i) => (
                    <tr
                      key={row.code}
                      className={`border-b border-border/50 ${
                        i % 2 === 0 ? "bg-card" : "bg-background"
                      }`}
                    >
                      <td className="px-4 py-4 font-medium text-primary align-top">
                        {row.code}
                      </td>
                      <td className="px-4 py-4 text-foreground align-top">
                        {row.target}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground align-top">
                        {row.documents}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
              나에게 맞는 F-4 비자 유형이 궁금하신가요?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              비전행정사사무소에서 개인별 자격 진단과 서류 준비를 도와드립니다.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">상담 문의하기</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="tel:010-2081-3408">전화 상담</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
