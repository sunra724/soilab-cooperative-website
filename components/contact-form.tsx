"use client"

import { useRef, useState, type FormEvent } from "react"
import { sendGAEvent } from "@next/third-parties/google"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const fieldClass = "mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"

export function ContactForm() {
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const submissionId = useRef<string | null>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    const values = new FormData(form)
    submissionId.current ||= crypto.randomUUID()
    setPending(true)
    setError("")
    try {
      const response = await fetch("/api/contact", {
        signal: AbortSignal.timeout(20_000),
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.get("name"), email: values.get("email"), topic: values.get("topic"), message: values.get("message"), consent: values.get("consent") === "on", website: values.get("website") || "", submissionId: submissionId.current }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || result?.ok !== true) {
        setError(typeof result?.error === "string" ? result.error : "접수 결과를 확인하지 못했습니다. 잠시 후 다시 시도하거나 전화·이메일로 문의해 주세요.")
        return
      }
      form.reset()
      setSent(true)
      if (process.env.NEXT_PUBLIC_GA_ID) sendGAEvent("event", "generate_lead", { form_name: "business_inquiry" })
    } catch {
      setError("연결이 원활하지 않습니다. 잠시 후 다시 시도하거나 전화·이메일로 문의해 주세요.")
    } finally {
      setPending(false)
      requestAnimationFrame(() => statusRef.current?.focus())
    }
  }

  return (
    <section id="inquiry" aria-labelledby="inquiry-title" className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-10">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary">BUSINESS INQUIRY</p>
      <h2 id="inquiry-title" className="mt-3 font-serif text-2xl font-bold sm:text-3xl">사업·협업 문의를 남겨주세요</h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">진행하려는 사업과 필요한 지원을 알려주시면, 입력하신 이메일로 담당자가 회신드립니다.</p>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {sent && <div role="status" className="mt-8 rounded-xl bg-primary/5 p-6"><CheckCircle2 className="h-7 w-7 text-primary" aria-hidden="true" /><h3 className="mt-3 text-lg font-bold">문의가 접수되었습니다</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">담당자가 내용을 확인한 뒤 입력하신 이메일로 연락드리겠습니다.</p></div>}
        {error && <p role="alert" className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm leading-6 text-destructive">{error}</p>}
      </div>
      {!sent && <form onSubmit={submit} className="mt-8 space-y-6" aria-busy={pending}>
        <fieldset disabled={pending} className="grid gap-6 sm:grid-cols-2">
          <legend className="sr-only">문의자 정보</legend>
          <label className="text-sm font-semibold">기관·담당자명 <span className="font-normal text-muted-foreground">(필수)</span><input name="name" autoComplete="organization" required maxLength={100} className={fieldClass} placeholder="기관명 또는 담당자명" /></label>
          <label className="text-sm font-semibold">회신받을 이메일 <span className="font-normal text-muted-foreground">(필수)</span><input name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254} className={fieldClass} placeholder="이메일 주소" /></label>
          <label className="text-sm font-semibold sm:col-span-2">문의 분야 <span className="font-normal text-muted-foreground">(필수)</span><select name="topic" required defaultValue="" className={fieldClass}><option value="" disabled>문의할 분야를 선택해 주세요</option>{["리빙랩 운영", "청년정책·청년지원사업", "AI·데이터 활용", "기타 사업·교육·협업"].map(topic => <option key={topic}>{topic}</option>)}</select></label>
          <label className="text-sm font-semibold sm:col-span-2">문의 내용 <span className="font-normal text-muted-foreground">(필수)</span><textarea name="message" required minLength={10} maxLength={4000} rows={6} className={fieldClass} placeholder="사업 대상과 지역, 예상 일정, 함께 논의할 내용을 알려주세요. (10자 이상)" /></label>
          <div className="hidden" aria-hidden="true"><label>웹사이트<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="rounded-lg bg-secondary/40 p-4 text-sm leading-7 text-muted-foreground sm:col-span-2"><p>기관·담당자명, 이메일, 문의 분야·내용은 문의에 답변하기 위해 담당자에게 이메일로 전달됩니다. 주민등록번호·건강정보 등 민감한 개인정보는 적지 말아주세요.</p><label className="mt-3 flex items-start gap-3 font-medium text-foreground"><input name="consent" type="checkbox" required className="mt-1.5 h-4 w-4 shrink-0 accent-primary" />입력한 정보를 문의 답변에 사용하는 데 동의합니다. (필수)</label></div>
        </fieldset>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-6 text-muted-foreground">바로 상담이 필요하시면 <a href="tel:053-941-9003" className="font-semibold text-primary underline underline-offset-4">053-941-9003</a>으로 연락해 주세요.</p><Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">{pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />접수 중</> : <>문의 보내기<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></>}</Button></div>
        <noscript><p>온라인 문의에는 자바스크립트가 필요합니다. 전화 또는 soilabcoop@gmail.com으로 문의해 주세요.</p></noscript>
      </form>}
    </section>
  )
}
