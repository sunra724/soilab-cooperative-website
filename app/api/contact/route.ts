import { handleContact } from "@/lib/contact"

export const runtime = "nodejs"
export const maxDuration = 15

export async function POST(request: Request) {
  return handleContact(request)
}

export async function GET() {
  return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } })
}
