import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "협동조합 소이랩 · AI 리빙랩 데모",
  robots: { index: false, follow: false },
};

export default function KioskPage() {
  return (
    <iframe
      src="/forum-demo/kiosk.html"
      title="협동조합 소이랩 AI 리빙랩 데모"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  );
}
