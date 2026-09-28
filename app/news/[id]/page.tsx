/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { NotionContent } from "@/components/sections/news/notion-content"
import { getNewsDetail } from "@/lib/notion"
import { getNewsDetailHref } from "@/lib/news"

interface NewsDetailPageProps {
  params: Promise<{ id: string }>
}

export const revalidate = 60

// Opt dynamic IDs into ISR; revalidate alone does not cache unknown paths.
export async function generateStaticParams() {
  return []
}

function toPlainText(markdown: string): string {
  return markdown
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~`|=-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function getDescription(description: string, markdown: string): string {
  const value = description || toPlainText(markdown)
  return value.slice(0, 160)
}

function toIsoDate(date: string): string | undefined {
  if (!/^\d{4}\.\d{2}\.\d{2}$/.test(date)) return undefined
  return date.replaceAll(".", "-")
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const detail = await getNewsDetail(id)

  if (!detail) {
    return {
      title: "소식을 찾을 수 없습니다",
      robots: { index: false, follow: false },
    }
  }

  const description = getDescription(detail.description, detail.markdown)
  const canonical = getNewsDetailHref(detail.id)
  const images = detail.coverImage ? [{ url: detail.coverImage }] : undefined

  return {
    title: detail.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: canonical,
      title: detail.title,
      description,
      publishedTime: toIsoDate(detail.date),
      modifiedTime: detail.lastEditedTime,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: detail.title,
      description,
      images: detail.coverImage ? [detail.coverImage] : undefined,
    },
  }
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { id } = await params
  const detail = await getNewsDetail(id)

  if (!detail || !detail.title) notFound()

  const kindLabel =
    detail.kind === "event" ? "행사 · 프로그램" : "언론보도 · 소식"
  const externalLabel =
    detail.kind === "event" ? "신청 페이지로 이동" : "원문 기사 보기"
  const isoDate = toIsoDate(detail.date)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <article>
        <header className="relative overflow-hidden bg-primary py-14 text-primary-foreground lg:py-20">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="relative mx-auto max-w-4xl px-4 lg:px-8">
            <Link
              href="/news"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/75 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              행사·소식 목록
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge className="border-primary-foreground/20 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20">
                {detail.category || kindLabel}
              </Badge>
              {detail.status && (
                <Badge
                  variant="outline"
                  className="border-primary-foreground/35 text-primary-foreground"
                >
                  {detail.status}
                </Badge>
              )}
            </div>

            <p className="mb-3 text-sm font-medium text-primary-foreground/65">
              {kindLabel}
            </p>
            <h1 className="max-w-3xl break-keep font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {detail.title}
            </h1>

            {(detail.date || detail.location) && (
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary-foreground/75">
                {detail.date && (
                  <time
                    dateTime={isoDate}
                    className="inline-flex items-center gap-2"
                  >
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    {detail.date}
                  </time>
                )}
                {detail.location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {detail.location}
                  </span>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8 lg:py-16">
          {detail.coverImage && (
            <figure className="mb-10 overflow-hidden rounded-2xl border border-border bg-secondary/30 shadow-sm">
              <img
                src={detail.coverImage}
                alt={`${detail.title} 대표 이미지`}
                className="max-h-[680px] w-full object-contain"
              />
            </figure>
          )}

          {detail.description && (
            <p className="mb-10 border-l-4 border-primary bg-primary/5 px-5 py-4 text-lg leading-8 text-foreground/80">
              {detail.description}
            </p>
          )}

          {detail.markdown ? (
            <NotionContent markdown={detail.markdown} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/30 px-6 py-10 text-center">
              <p className="text-muted-foreground">
                자세한 내용은 연결된 원문에서 확인해 주세요.
              </p>
            </div>
          )}

          {detail.result && (
            <section className="mt-12 rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h2 className="font-serif text-xl font-bold text-primary">
                결과 · 성과
              </h2>
              <p className="mt-3 whitespace-pre-wrap leading-7 text-foreground/80">
                {detail.result}
              </p>
            </section>
          )}

          {detail.externalUrl && (
            <div className="mt-12 rounded-2xl bg-secondary p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">
                  {detail.kind === "event"
                    ? "프로그램에 참여하고 싶으신가요?"
                    : "전체 기사를 확인해 보세요."}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  외부 페이지가 새 창으로 열립니다.
                </p>
              </div>
              <Button asChild className="mt-5 sm:mt-0">
                <a
                  href={detail.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {externalLabel}
                  <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          )}

          <div className="mt-12 border-t border-border pt-8">
            <Button variant="outline" asChild>
              <Link href="/news">
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                목록으로 돌아가기
              </Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
