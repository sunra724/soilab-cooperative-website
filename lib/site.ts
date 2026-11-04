import type { Metadata } from "next"

export const SITE_URL = "https://www.soilabcoop.kr"
export const SITE_NAME = "협동조합 소이랩"
export const CONTACT_EMAIL = "soilabcoop@gmail.com"

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`
  return {
    title, description, alternates: { canonical: path },
    openGraph: {
      type: "website", locale: "ko_KR", siteName: SITE_NAME,
      url: new URL(path, SITE_URL).href, title: fullTitle, description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/opengraph-image"] },
  }
}

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME, alternateName: "Soilab Cooperative", url: `${SITE_URL}/`,
      description: "리빙랩 운영과 청년정책·청년지원사업을 중심으로, 민관학 거버넌스와 AI·데이터 활용을 통해 지역의 변화를 만드는 협동조합입니다.",
      address: { "@type": "PostalAddress", addressCountry: "KR", addressRegion: "대구광역시", addressLocality: "북구", streetAddress: "대현로 3, 2층" },
      email: CONTACT_EMAIL, telephone: "+82-53-941-9003",
      contactPoint: { "@type": "ContactPoint", contactType: "사업·협업 문의", email: CONTACT_EMAIL, telephone: "+82-53-941-9003", availableLanguage: "Korean", url: `${SITE_URL}/contact` },
      sameAs: ["https://www.instagram.com/coopsoilab/", "https://www.facebook.com/coopsoilab/", "https://www.youtube.com/channel/UChU2340j49VE-15WmMTqjWw", "https://blog.naver.com/ggoom1room"],
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE_NAME, url: `${SITE_URL}/`, inLanguage: "ko-KR", publisher: { "@id": `${SITE_URL}/#organization` } },
  ],
}
