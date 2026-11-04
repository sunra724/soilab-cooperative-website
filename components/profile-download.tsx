import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProfileDownload() {
  return <Button variant="outline" asChild><a href="/downloads/soilab-profile.pdf" download><Download className="mr-2 h-4 w-4" aria-hidden="true" />기관소개서 PDF 내려받기<span className="sr-only"> (2쪽)</span></a></Button>
}
