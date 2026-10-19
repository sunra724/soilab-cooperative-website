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
  verification: {
    other: {
      'naver-site-verification': 'eb92e86c4286c316303ae2e46da559ff3c6a419f',
    },
  },
  title: {
    default: '협동조합 소이랩 | AI와 현장을 연결하는 사회혁신',
    template: '%s | 협동조합 소이랩',
  },
  description: '대구 기반 협동조합·사회적기업 소이랩. AI와 리빙랩으로 청년·돌봄·지역문제의 해결 가능성을 검증하고 지식·도구·성과를 사회적 자산으로 축적합니다.',
  applicationName: '협동조합 소이랩',
  keywords: ['협동조합 소이랩', '사회혁신', 'AI 사회혁신', 'SOILAB 2030', '필란트로피', 'ESG 컨설팅', '리빙랩', '청년정책', '인지건강디자인', '대구'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: '협동조합 소이랩',
    title: '협동조합 소이랩 | AI와 현장을 연결하는 사회혁신',
    description: 'AI와 현장 실험으로 지역문제를 발견·검증하고, 해결 경험을 함께 활용하는 사회적 자산으로 축적합니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '협동조합 소이랩 | AI와 현장을 연결하는 사회혁신',
    description: 'SOILAB 2030: AI와 리빙랩으로 사회문제의 해결모델을 검증하고 확산합니다.',
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
