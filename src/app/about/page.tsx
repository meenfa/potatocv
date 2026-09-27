import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description: "Meet PotatoCV, an AI resume reviewer that pairs playful roasts with practical feedback.",
  path: "/about",
});

export default function AboutPage() {
  return <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-[#44260a]">
    <Link href="/" className="text-sm underline">← PotatoCV home</Link>
    <h1 className="mt-8 text-4xl font-bold">About PotatoCV</h1>
    <p className="mt-6 text-lg leading-8">PotatoCV gives your resume a playful roast and practical improvement suggestions, powered by AI. It is made by Ankit Karki to make resume feedback a little less intimidating.</p>
    <Link href="/roast" className="mt-8 inline-block rounded-lg bg-[#f2b055] px-5 py-3 font-bold">Try the resume roaster</Link>
  </main>;
}
