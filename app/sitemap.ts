import type { MetadataRoute } from "next"
import { getAnnouncements, getEvents } from "@/lib/notion"
import { getNewsDetailHref } from "@/lib/news"

const siteUrl = "https://www.soilabcoop.kr"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/services", "/impact", "/news", "/contact"]
  const [events, announcements] = await Promise.all([
    getEvents(),
    getAnnouncements(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/news" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))

  const newsRoutes: MetadataRoute.Sitemap = [
    ...events.map((event) => ({
      url: `${siteUrl}${getNewsDetailHref(event.id)}`,
      lastModified: new Date(event.lastEditedTime),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...announcements.map((item) => ({
      url: `${siteUrl}${getNewsDetailHref(item.id)}`,
      lastModified: new Date(item.lastEditedTime),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]

  return [...staticRoutes, ...newsRoutes]
}
