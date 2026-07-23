/* eslint-disable @next/next/no-img-element */

import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import { Download, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotionContentProps {
  markdown: string
}

interface NotionElementProps {
  children?: ReactNode
  src?: string
  url?: string
  alt?: string
  color?: string
  icon?: string
  underline?: string
}

const notionSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "callout",
    "column",
    "columns",
    "database",
    "empty-block",
    "file",
    "page",
    "pdf",
    "synced-block",
    "unknown",
  ],
  attributes: {
    ...defaultSchema.attributes,
    callout: ["color", "icon"],
    database: ["url"],
    file: ["src"],
    page: ["url"],
    pdf: ["src"],
    span: [...(defaultSchema.attributes?.span ?? []), "color", "underline"],
    unknown: ["alt", "url"],
    video: [...(defaultSchema.attributes?.video ?? []), "controls", "src"],
    audio: [...(defaultSchema.attributes?.audio ?? []), "controls", "src"],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: [...(defaultSchema.protocols?.href ?? []), "http", "https", "mailto", "tel"],
    src: [...(defaultSchema.protocols?.src ?? []), "http", "https"],
    url: ["http", "https"],
  },
}

const notionColorClasses: Record<string, string> = {
  gray: "text-muted-foreground",
  brown: "text-amber-900",
  orange: "text-orange-700",
  yellow: "text-yellow-700",
  green: "text-primary",
  blue: "text-blue-700",
  purple: "text-purple-700",
  pink: "text-pink-700",
  red: "text-red-700",
  gray_background: "rounded bg-muted px-1",
  brown_background: "rounded bg-amber-100 px-1",
  orange_background: "rounded bg-orange-100 px-1",
  yellow_background: "rounded bg-yellow-100 px-1",
  green_background: "rounded bg-emerald-100 px-1",
  blue_background: "rounded bg-blue-100 px-1",
  purple_background: "rounded bg-purple-100 px-1",
  pink_background: "rounded bg-pink-100 px-1",
  red_background: "rounded bg-red-100 px-1",
}

function ExternalLink({
  href,
  children,
  title,
}: ComponentPropsWithoutRef<"a">) {
  const isExternal = href?.startsWith("http")

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      title={title}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
    >
      {children}
    </a>
  )
}

function AttachmentLink({
  href,
  children,
}: {
  href?: string
  children?: ReactNode
}) {
  if (!href) return <>{children}</>

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-5 flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-4 text-sm font-medium transition-colors hover:border-primary/30 hover:bg-secondary"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary">
        <FileText className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 break-words">
        {children || "첨부파일 열기"}
      </span>
      <Download className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
    </a>
  )
}

const notionComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h2 className="mb-4 mt-10 font-serif text-3xl font-bold leading-tight text-foreground first:mt-0">
      {children}
    </h2>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mb-4 mt-10 font-serif text-2xl font-bold leading-tight text-foreground first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mb-3 mt-8 font-serif text-xl font-semibold leading-snug text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }: { children?: ReactNode }) => (
    <h4 className="mb-3 mt-6 text-lg font-semibold text-foreground">
      {children}
    </h4>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="my-4 whitespace-pre-wrap break-words text-base leading-8 text-foreground/85">
      {children}
    </p>
  ),
  a: ExternalLink,
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-foreground/85 marker:text-primary">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-foreground/85 marker:font-medium marker:text-primary">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="pl-1 leading-7">{children}</li>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-6 border-l-4 border-primary/40 bg-secondary/40 px-5 py-2 text-foreground/80">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => (
    <thead className="bg-secondary text-foreground">{children}</thead>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="border-b border-r border-border px-4 py-3 font-semibold last:border-r-0">
      {children}
    </th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="border-b border-r border-border px-4 py-3 align-top last:border-r-0">
      {children}
    </td>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="my-6 overflow-x-auto rounded-xl bg-foreground p-5 text-sm leading-6 text-background">
      {children}
    </pre>
  ),
  code: ({ children, className }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
        className,
      )}
    >
      {children}
    </code>
  ),
  img: ({ src, alt }: ComponentPropsWithoutRef<"img">) => (
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      loading="lazy"
      className="my-8 h-auto w-full rounded-2xl border border-border bg-secondary/30 object-contain shadow-sm"
    />
  ),
  video: ({ src, ...props }: ComponentPropsWithoutRef<"video">) => (
    <video
      src={src}
      controls
      className="my-8 w-full rounded-2xl border border-border bg-black"
      {...props}
    />
  ),
  audio: ({ src, ...props }: ComponentPropsWithoutRef<"audio">) => (
    <audio src={src} controls className="my-6 w-full" {...props} />
  ),
  columns: ({ children }: NotionElementProps) => (
    <div className="my-8 grid gap-6 md:grid-cols-2">{children}</div>
  ),
  column: ({ children }: NotionElementProps) => (
    <div className="min-w-0">{children}</div>
  ),
  callout: ({ children, icon }: NotionElementProps) => (
    <aside className="my-6 flex gap-3 rounded-xl border border-primary/15 bg-primary/5 p-5">
      {icon && <span aria-hidden="true">{icon}</span>}
      <div className="min-w-0 flex-1">{children}</div>
    </aside>
  ),
  file: ({ src, children }: NotionElementProps) => (
    <AttachmentLink href={src}>{children}</AttachmentLink>
  ),
  pdf: ({ src, children }: NotionElementProps) => (
    <AttachmentLink href={src}>{children || "PDF 문서 열기"}</AttachmentLink>
  ),
  page: ({ url, children }: NotionElementProps) => (
    <AttachmentLink href={url}>{children || "연결된 페이지 열기"}</AttachmentLink>
  ),
  database: ({ url, children }: NotionElementProps) => (
    <AttachmentLink href={url}>{children || "연결된 데이터베이스 열기"}</AttachmentLink>
  ),
  unknown: ({ url, alt }: NotionElementProps) => (
    <AttachmentLink href={url}>{alt || "노션에서 콘텐츠 보기"}</AttachmentLink>
  ),
  "empty-block": () => <div className="h-3" aria-hidden="true" />,
  "synced-block": ({ children }: NotionElementProps) => <>{children}</>,
  span: ({
    children,
    color,
    underline,
  }: ComponentPropsWithoutRef<"span"> & {
    color?: string
    underline?: string
  }) => (
    <span
      className={cn(
        color ? notionColorClasses[color] : undefined,
        underline === "true" && "underline underline-offset-4",
      )}
    >
      {children}
    </span>
  ),
} as unknown as Components

function normalizeNotionMarkdown(markdown: string): string {
  return markdown
    .replace(/\*\*([^*<>\n]+?)\*\*/g, (_match, text: string) => (
      `<strong>${text.trim()}</strong>`
    ))
    .replace(
      /\*\*\s*(✅[^<>\n]+)(?=<br\s*\/?>)/gi,
      (_match, text: string) => `<strong>${text.trim()}</strong>`,
    )
    .replace(
      /\*\*\s*([①-⑳][^<>\n]+)(?=<br\s*\/?>)/gi,
      (_match, text: string) => `<strong>${text.trim()}</strong>`,
    )
    .replaceAll("**", "")
}

export function NotionContent({ markdown }: NotionContentProps) {
  return (
    <div className="notion-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, notionSchema]]}
        components={notionComponents}
      >
        {normalizeNotionMarkdown(markdown)}
      </ReactMarkdown>
    </div>
  )
}
