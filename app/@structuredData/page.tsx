import { primaryServices, serviceCases } from "@/lib/services"
import { SITE_URL } from "@/lib/site"

export default function HomeStructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      ...primaryServices.map(service => ({
        "@type": "Service", "@id": `${SITE_URL}/services#${service.id}`,
        name: service.title, description: service.description,
        url: `${SITE_URL}/services#${service.id}`, provider: { "@id": `${SITE_URL}/#organization` },
      })),
      {
        "@type": "ItemList", name: "소이랩 대표 수행 사례", "@id": `${SITE_URL}/#cases`,
        itemListElement: serviceCases.map((project, index) => ({
          "@type": "ListItem", position: index + 1,
          item: { "@type": "CreativeWork", name: project.title, url: project.href, description: project.role, creator: { "@id": `${SITE_URL}/#organization` } },
        })),
      },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
}
