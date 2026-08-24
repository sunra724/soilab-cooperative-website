const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "협동조합 소이랩",
  alternateName: "Soilab Cooperative",
  url: "https://www.soilabcoop.kr",
  description:
    "대구를 기반으로 ESG 컨설팅, 리빙랩, 청년정책, 인지건강디자인을 수행하는 사회혁신 협동조합입니다.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KR",
    addressRegion: "대구광역시",
    addressLocality: "북구",
    streetAddress: "대현로 3, 2층",
  },
  email: "soilabcoop@gmail.com",
  telephone: "+82-53-941-9003",
  sameAs: [
    "https://www.instagram.com/coopsoilab/",
    "https://www.facebook.com/coopsoilab/",
    "https://www.youtube.com/channel/UChU2340j49VE-15WmMTqjWw",
    "https://blog.naver.com/ggoom1room",
  ],
}

export default function OrganizationStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
      }}
    />
  )
}
