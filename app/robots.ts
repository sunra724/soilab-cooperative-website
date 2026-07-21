import type { MetadataRoute } from "next"

const siteUrl = "https://www.soilabcoop.kr"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/kiosk-demo", "/forum-demo/kiosk"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
