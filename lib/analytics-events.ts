export function linkInteraction(href: string, base: string, placement: string) {
  const context = { placement: ["header", "main", "footer"].includes(placement) ? placement : "other" }
  if (href.startsWith("tel:")) return { name: "contact_click", params: { ...context, contact_method: "phone" } }
  if (href.startsWith("mailto:")) return { name: "contact_click", params: { ...context, contact_method: "email" } }
  let url: URL
  try { url = new URL(href, base) } catch { return null }
  if (url.origin === new URL(base).origin && url.pathname === "/contact") return { name: "contact_open", params: context }
  if (url.origin === new URL(base).origin && url.pathname === "/downloads/soilab-profile.pdf") return { name: "profile_download", params: { ...context, file_name: "soilab-profile.pdf", file_extension: "pdf" } }
  if (url.protocol === "https:" && url.hostname === "lab.soilabcoop.kr" && /^\/cases\/[a-z0-9-]+$/.test(url.pathname)) {
    return { name: "select_content", params: { ...context, content_type: "case_study", item_id: url.pathname.split("/").pop()! } }
  }
  const storyHosts: Record<string, string> = { 'www.soilab-youth.kr': 'youth', 'care.soilabcoop.kr': 'care', 'lab.soilabcoop.kr': 'lab' }
  const source = storyHosts[url.hostname]
  if (url.protocol === 'https:' && source && /^\/(series|research\/notes|press|stream)(\/|$)/.test(url.pathname) && /^\/[a-z0-9/-]+$/.test(url.pathname)) {
    return { name: 'select_content', params: { ...context, content_type: 'research_story', source, item_id: url.pathname } }
  }
  return null
}
