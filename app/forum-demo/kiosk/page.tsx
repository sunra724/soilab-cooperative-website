import fs from "node:fs";
   import path from "node:path";

   export const dynamic = "force-static";

   export default function KioskPage() {
     const html = fs.readFileSync(
       path.join(process.cwd(), "public/forum-demo/kiosk.html"),
       "utf-8"
     );
     return <div dangerouslySetInnerHTML={{ __html: html }} />;
   }
