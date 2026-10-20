import type { MetadataRoute } from "next"
import { getAnnouncements, getEvents } from "@/lib/notion"
import { getNewsDetailHref } from "@/lib/news"
import { getInsights } from "@/lib/insights"

const siteUrl = "https://www.soilabcoop.kr"

// Refresh Notion entries on the same interval as the news listing.
export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/services", "/impact", "/insights", "/news", "/contact"]
  const [events, announcements, insights] = await Promise.all([
    getEvents(),
    getAnnouncements(),
    getInsights(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
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

  return [...staticRoutes, ...newsRoutes, ...insights.map(issue => ({
    url: `${siteUrl}/insights/${issue.id}`,
    lastModified: new Date(issue.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))]
}
