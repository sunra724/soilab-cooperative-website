import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

const navigation = [
  { name: "홈", href: "/" },
  { name: "소이랩 소개", href: "/about" },
  { name: "사업소개", href: "/services" },
  { name: "실적·성과", href: "/impact" },
  { name: "행사·소식", href: "/news" },
  { name: "문의", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo and description */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">협동조합 소이랩</h3>
            <p className="text-sm text-primary-foreground/80">
              사회혁신을 함께 만드는 대구 기반 사회적협동조합입니다.
              지역사회와 함께 더 나은 미래를 만들어갑니다.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-medium mb-4">바로가기</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">연락처</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4" />
                <a href="mailto:soilab@soilab.kr" className="hover:text-primary-foreground transition-colors">
                  soilab@soilab.kr
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>대구광역시</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} 협동조합 소이랩. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
