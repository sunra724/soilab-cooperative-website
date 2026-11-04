import type { Metadata } from "next"
import { SITE_NAME, SITE_URL } from "./site"

type Article = {
  path: string; title: string; description: string; image?: string
  publishedAt?: string; modifiedAt?: string; author?: string; citations?: string[]
}

export function isoPublicationDate(value?: string) {
  if (!value) return undefined
  const date = value.replace(/\./g, "-")
  const parsed = new Date(date)
  if (!Number.isFinite(parsed.getTime()) || (/^\d{4}-\d{2}-\d{2}$/.test(date) && parsed.toISOString().slice(0, 10) !== date)) return undefined
  return date
}

export function articleMetadata(article: Article): Metadata {
  const image = article.image || `${article.path}/opengraph-image`
  return {
    title: article.title, description: article.description, alternates: { canonical: article.path },
    openGraph: {
      type: "article", locale: "ko_KR", siteName: SITE_NAME, url: article.path,
      title: article.title, description: article.description,
      publishedTime: isoPublicationDate(article.publishedAt), modifiedTime: isoPublicationDate(article.modifiedAt),
      images: [{ url: image, alt: article.title }],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.description, images: [image] },
  }
}

export function articleJsonLd(article: Article, type: "Article" | "BlogPosting" = "Article") {
  const url = new URL(article.path, SITE_URL).href
  return {
    "@context": "https://schema.org", "@type": type, "@id": `${url}#article`,
    headline: article.title, description: article.description, url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url }, inLanguage: "ko-KR",
    datePublished: isoPublicationDate(article.publishedAt), dateModified: isoPublicationDate(article.modifiedAt),
    image: [new URL(article.image || `${article.path}/opengraph-image`, SITE_URL).href],
    ...(article.author ? { author: { "@type": "Organization", name: article.author, url: `${SITE_URL}/about` } } : {}),
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(article.citations?.length ? { citation: [...new Set(article.citations)] } : {}),
  }
}
