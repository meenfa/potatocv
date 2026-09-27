import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Learn how PotatoCV processes resume text, uploaded files, and analytics data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-[#44260a]">
    <Link href="/" className="text-sm underline">← PotatoCV home</Link>
    <h1 className="mt-8 text-4xl font-bold">Privacy Policy</h1>
    <p className="mt-3 text-sm">Last updated: September 27, 2026</p>
    <div className="mt-8 space-y-6 leading-7">
      <section><h2 className="text-xl font-bold">Information you provide</h2><p>When you use PotatoCV, you may paste resume text or upload a PDF or DOCX file. Uploaded files are processed to extract text; the analysis endpoint sends the text you submit to Google’s Gemini API to generate feedback. The app code does not save submitted resumes to a persistent database.</p></section>
      <section><h2 className="text-xl font-bold">Service providers and analytics</h2><p>PotatoCV uses Google Gemini to generate results and Vercel Analytics to understand site usage. These providers may process technical or request data as needed to provide their services. Please review their privacy terms for details about their handling and retention practices.</p></section>
      <section><h2 className="text-xl font-bold">Your choices</h2><p>Do not submit information you are not comfortable sharing with the service providers involved in generating your result. You can use the site without creating an account.</p></section>
      <section><h2 className="text-xl font-bold">Changes and contact</h2><p>This policy may be updated as the service changes. For privacy questions, visit the <Link className="underline" href="/contact">contact page</Link>.</p></section>
    </div>
  </main>;
}
