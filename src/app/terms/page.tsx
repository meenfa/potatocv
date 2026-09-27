import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Review the terms for using PotatoCV’s AI resume roast and feedback service.",
  path: "/terms",
});

export default function TermsPage() {
  return <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-[#44260a]">
    <Link href="/" className="text-sm underline">← PotatoCV home</Link>
    <h1 className="mt-8 text-4xl font-bold">Terms of Service</h1>
    <p className="mt-3 text-sm">Last updated: September 27, 2026</p>
    <div className="mt-8 space-y-6 leading-7">
      <section><h2 className="text-xl font-bold">Using PotatoCV</h2><p>PotatoCV provides AI-generated resume roasts and improvement suggestions for entertainment and general informational purposes. You are responsible for the content you submit and must have the right to share it.</p></section>
      <section><h2 className="text-xl font-bold">AI feedback</h2><p>Results are generated automatically and may be inaccurate, incomplete, or unsuitable for your situation. They are not professional career, hiring, or legal advice. Review suggestions and decide for yourself whether to use them.</p></section>
      <section><h2 className="text-xl font-bold">Acceptable use</h2><p>Do not misuse the service, attempt to disrupt it, or submit unlawful content. The service is provided as available and may change or become unavailable.</p></section>
      <section><h2 className="text-xl font-bold">Updates</h2><p>These terms may be updated as PotatoCV changes. Continued use after an update means you accept the revised terms. Questions can be sent through the <Link className="underline" href="/contact">contact page</Link>.</p></section>
    </div>
  </main>;
}
