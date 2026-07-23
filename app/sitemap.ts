import type { MetadataRoute } from "next"

const siteUrl = "https://www.soilabcoop.kr"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/impact", "/news", "/contact"]

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/news" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))
}
