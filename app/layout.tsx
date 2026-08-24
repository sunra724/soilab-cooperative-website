import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

const siteUrl = 'https://www.soilabcoop.kr'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-serif-kr',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '협동조합 소이랩 | 사회혁신을 함께 만듭니다',
    template: '%s | 협동조합 소이랩',
  },
  description: '대구 기반 사회혁신 협동조합 소이랩. ESG 컨설팅, 리빙랩, 청년정책, 도시재생, 인지건강디자인 분야에서 활동합니다.',
  applicationName: '협동조합 소이랩',
  keywords: ['협동조합 소이랩', '사회혁신', 'ESG 컨설팅', '리빙랩', '청년정책', '인지건강디자인', '대구'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: '협동조합 소이랩',
    title: '협동조합 소이랩 | 사회혁신을 함께 만듭니다',
    description: '대구를 기반으로 ESG 컨설팅, 리빙랩, 청년정책, 인지건강디자인을 수행하는 사회혁신 협동조합입니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '협동조합 소이랩 | 사회혁신을 함께 만듭니다',
    description: '대구 기반 사회혁신 협동조합 소이랩의 사업과 활동 소식을 확인하세요.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1b4332',
}

export default function RootLayout({
  children,
  structuredData,
}: Readonly<{
  children: React.ReactNode
  structuredData: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${notoSerifKR.variable}`}>
      <head>{structuredData}</head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
