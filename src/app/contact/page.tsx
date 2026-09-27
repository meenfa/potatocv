import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Contact | PotatoCV", description: "Get in touch with the PotatoCV creator." };

export default function ContactPage() {
  return <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-[#44260a]">
    <Link href="/" className="text-sm underline">← PotatoCV home</Link>
    <h1 className="mt-8 text-4xl font-bold">Contact</h1>
    <p className="mt-6 text-lg leading-8">For questions or feedback about PotatoCV, contact its creator through <a className="underline" href="https://www.meenfa.tech/" target="_blank" rel="noopener noreferrer">meenfa.tech</a>.</p>
  </main>;
}
