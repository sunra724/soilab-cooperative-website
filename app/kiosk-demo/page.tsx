import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '한일 리빙랩 포럼 키오스크 데모',
  description: '한일 리빙랩 포럼 준비자료 키오스크 데모',
}

export default function KioskDemoPage() {
  return (
    <main
      style={{
        width: '100dvw',
        height: '100dvh',
        overflow: 'hidden',
        background: '#0E1F18',
      }}
    >
      <iframe
        src="/kiosk-demo.html"
        title="한일 리빙랩 포럼 키오스크 데모"
        allowFullScreen
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          border: 0,
        }}
      />
    </main>
  )
}
