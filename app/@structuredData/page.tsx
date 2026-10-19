const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "협동조합 소이랩",
  alternateName: "Soilab Cooperative",
  url: "https://www.soilabcoop.kr",
  description:
    "리빙랩 운영과 청년정책·청년지원사업을 중심으로, 민관학 거버넌스와 AI·데이터 활용을 통해 지역의 변화를 만드는 협동조합입니다.",
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
