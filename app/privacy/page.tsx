import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { inquiryPrivacy } from "@/lib/inquiry-privacy.mjs"
import { CONTACT_EMAIL, pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("/privacy", "문의메일 개인정보 안내", "소이랩의 사업·협업 문의메일 처리 목적과 항목, 답변 완료 후 30일 보관·삭제 기준, 경영지원실 문의 창구를 안내합니다.")

const services = [
  { name: "Vercel", role: "홈페이지 문의 전송 서버 운영", policy: "https://vercel.com/legal/privacy-notice" },
  { name: "Resend", role: "문의 이메일 발송", policy: "https://resend.com/legal/privacy-policy" },
  { name: "Google Gmail", role: "대표 메일함에서 문의 수신·답변·보관", policy: "https://policies.google.com/privacy?hl=ko" },
]

export default function InquiryPrivacyPage() {
  return <div className="flex min-h-screen flex-col bg-background">
    <Header />
    <main className="flex-1">
      <section className="bg-primary px-4 py-14 text-primary-foreground sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary-foreground/85">INQUIRY EMAIL</p>
          <h1 className="mt-4 break-keep font-serif text-3xl font-bold sm:text-4xl">문의메일 개인정보 안내</h1>
          <p className="mt-5 max-w-2xl break-keep text-sm leading-7 text-primary-foreground/85">이 안내는 홈페이지 문의폼과 대표 이메일로 접수하는 사업·교육·협업 문의에 적용됩니다. 현재 홈페이지는 회원가입이나 회원명부를 운영하지 않습니다.</p>
          <p className="mt-5 text-xs text-primary-foreground/85">시행일: <time dateTime="2026-11-04">2026년 11월 4일</time></p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-12 text-sm leading-7 text-muted-foreground sm:py-16 lg:px-8">
        <section aria-labelledby="inquiry-use">
          <h2 id="inquiry-use" className="font-serif text-xl font-bold text-foreground">1. 문의에 사용하는 정보</h2>
          <dl className="mt-5 space-y-4 rounded-xl border border-border bg-card p-5 sm:p-7">
            {[
              ["처리 기관", "협동조합 소이랩"],
              ["이용 목적", inquiryPrivacy.purpose],
              ["문의폼 항목", inquiryPrivacy.items],
              ["접수 확인", "접수번호와 수집·이용 동의 여부·안내 버전"],
              ["보유·이용 기간", inquiryPrivacy.retention],
            ].map(([label, value]) => <div key={label} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-5"><dt className="font-semibold text-foreground">{label}</dt><dd className="break-words">{value}</dd></div>)}
          </dl>
          <p className="mt-4">대표 이메일로 직접 문의하면 발신자 이메일과 메일에 직접 적거나 첨부한 정보를 문의 답변에 사용합니다. 주민등록번호·건강정보 등 문의에 필요하지 않은 민감한 정보는 보내지 말아주세요.</p>
        </section>

        <section aria-labelledby="inquiry-retention">
          <h2 id="inquiry-retention" className="font-serif text-xl font-bold text-foreground">2. 보관과 삭제</h2>
          <p className="mt-4">문의 접수부터 답변 완료까지 내용을 확인하고 회신하는 데 정보를 이용합니다. 답변이 완료되면 30일간 보관한 뒤 {inquiryPrivacy.department}에서 해당 문의메일과 업무용 사본을 삭제합니다.</p>
          <p className="mt-3">수신 메일뿐 아니라 관련 회신·전달 메일, 내려받은 첨부파일과 휴지통도 함께 확인합니다. 홈페이지가 메일함의 자료를 자동으로 삭제하는 방식은 아닙니다.</p>
          <p className="mt-3">문의가 계약이나 별도 사업 진행으로 이어져 자료를 계속 이용해야 하는 경우에는 해당 업무의 목적과 보관 기준을 별도로 안내합니다.</p>
        </section>

        <section aria-labelledby="inquiry-delivery">
          <h2 id="inquiry-delivery" className="font-serif text-xl font-bold text-foreground">3. 메일 전달과 관리</h2>
          <p className="mt-4">홈페이지 문의는 메일 발송 서비스를 거쳐 소이랩 대표 메일함으로 전달됩니다. 문의 내용을 별도 회원·문의 데이터베이스에 저장하지 않고 수신된 메일로 관리합니다.</p>
          <ul className="mt-5 space-y-3">
            {services.map(service => <li key={service.name} className="rounded-lg border border-border px-4 py-3"><p><span className="font-semibold text-foreground">{service.name}</span> · {service.role}</p><a href={service.policy} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-primary underline underline-offset-4">{service.name} 개인정보 안내<span className="sr-only"> (새 창)</span></a></li>)}
          </ul>
          <p className="mt-4">소이랩의 보관·삭제 기준은 소이랩이 관리하는 문의메일과 사본에 적용됩니다. 서비스 자체의 전송·보안 운영기록은 각 서비스 정책에 따라 처리됩니다. 홈페이지의 문의 처리 로그에는 이름·이메일·문의 본문을 기록하지 않습니다.</p>
        </section>

        <section aria-labelledby="inquiry-rights">
          <h2 id="inquiry-rights" className="font-serif text-xl font-bold text-foreground">4. 동의 거부와 정보 확인·삭제 요청</h2>
          <p className="mt-4">문의폼의 정보 수집·이용 동의를 거부할 수 있습니다. 동의하지 않으면 온라인 문의는 접수할 수 없으며, 일반 사업 안내는 대표 전화로 문의할 수 있습니다.</p>
          <p className="mt-3">본인의 문의정보에 대한 열람·정정·삭제 또는 이용 중단을 요청하려면 아래 창구로 연락해 주세요. 접수번호나 문의한 날짜를 알려주시면 확인에 도움이 됩니다. 본인 확인에 필요한 최소한의 정보를 확인한 뒤 처리 결과를 안내합니다.</p>
          <div className="mt-5 rounded-xl bg-secondary/50 p-5 sm:p-7">
            <p className="font-semibold text-foreground">문의메일 개인정보 요청 창구: {inquiryPrivacy.department}</p>
            <p className="mt-2"><a href={`mailto:${CONTACT_EMAIL}`} className="break-all font-medium text-primary underline underline-offset-4">{CONTACT_EMAIL}</a></p>
            <p className="mt-1"><a href="tel:053-941-9003" className="font-medium text-primary underline underline-offset-4">053-941-9003</a></p>
          </div>
        </section>
        <Link href="/contact#inquiry" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">사업·협업 문의로 돌아가기</Link>
      </div>
    </main>
    <Footer />
  </div>
}
