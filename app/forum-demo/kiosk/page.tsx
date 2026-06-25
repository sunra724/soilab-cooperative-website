export const metadata = { title: "협동조합 소이랩 · AI 리빙랩 데모" };

export default function KioskPage() {
  return (
    <iframe
      src="/forum-demo/kiosk.html"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
    />
  );
}
