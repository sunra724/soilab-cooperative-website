import { ImageResponse } from "next/og"

export const alt = "협동조합 소이랩 - 사회혁신을 함께 만듭니다"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 64%, #40916c 100%)",
          color: "white",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}>
          <div style={{ width: 16, height: 52, borderRadius: 8, background: "#e09f6b" }} />
          협동조합 소이랩
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.12,
            }}
          >
            <div style={{ display: "flex" }}>사회혁신을</div>
            <div style={{ display: "flex" }}>함께 만듭니다</div>
          </div>
          <div style={{ fontSize: 27, color: "rgba(255,255,255,.78)" }}>
            ESG · 리빙랩 · 청년정책 · 인지건강디자인
          </div>
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,.68)" }}>www.soilabcoop.kr</div>
      </div>
    ),
    size,
  )
}
