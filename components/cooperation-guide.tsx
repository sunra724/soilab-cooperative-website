import { cooperationFaqs, cooperationSteps } from "@/lib/cooperation"

export function CooperationGuide() {
  return <div className="space-y-14">
    <section aria-labelledby="cooperation-title">
      <h2 id="cooperation-title" className="font-serif text-2xl font-bold sm:text-3xl">협업은 이렇게 논의합니다</h2>
      <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cooperationSteps.map((step, index) => <li key={step.title} className="rounded-xl border border-border bg-card p-5"><p className="text-xs font-semibold text-accent">0{index + 1}</p><h3 className="mt-3 font-bold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p></li>)}</ol>
    </section>
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24">
      <h2 id="faq-title" className="font-serif text-2xl font-bold sm:text-3xl">사업 문의 전에 자주 묻는 질문</h2>
      <div className="mt-7 divide-y divide-border rounded-xl border border-border bg-card px-5 sm:px-7">{cooperationFaqs.map(item => <details key={item.question} className="group py-5"><summary className="cursor-pointer text-base font-semibold leading-7 marker:text-primary focus-visible:outline-2 focus-visible:outline-primary">{item.question}</summary><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.answer}</p>{"href" in item && <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">{item.linkLabel} (새 창)</a>}</details>)}</div>
    </section>
  </div>
}
