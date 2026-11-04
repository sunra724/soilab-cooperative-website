import { ImageResponse } from "next/og"

export function shareImage(title: string, category: string) {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "65px 76px", background: "linear-gradient(130deg,#163b2e,#367b5b)", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 29 }}><span style={{ width: 10, height: 36, background: "#f4d0ac", borderRadius: 6 }} />협동조합 소이랩<span style={{ marginLeft: "auto", fontSize: 25, color: "#d9ecdf" }}>{category}</span></div>
      <div style={{ display: "flex", fontSize: title.length > 65 ? 44 : title.length > 40 ? 52 : 62, fontWeight: 700, lineHeight: 1.4, wordBreak: "keep-all" }}>{title.slice(0, 160)}</div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#d9ecdf" }}><span>현장과 사람을 잇는 사회혁신</span><span>www.soilabcoop.kr</span></div>
    </div>, { width: 1200, height: 630 },
  )
}
