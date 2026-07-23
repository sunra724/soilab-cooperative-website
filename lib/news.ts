export function getNewsDetailHref(id: string): string {
  return `/news/${id.replaceAll("-", "")}`
}
