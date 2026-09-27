import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact the PotatoCV creator with questions, feedback, or privacy requests.",
  path: "/contact",
});

const contactEmail = "ankitkarki8088@gmail.com";

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-12 text-[#44260a] sm:px-6 sm:py-16">
      <Link href="/" className="text-sm underline underline-offset-4">← PotatoCV home</Link>
      <h1 className="mt-8 text-4xl font-bold">Contact</h1>
      <p className="mt-6 text-lg leading-8">
        For questions, feedback, or privacy requests, email{" "}
        <a className="break-all font-semibold underline underline-offset-4" href={"mailto:" + contactEmail}>
          {contactEmail}
        </a>.
      </p>
    </main>
  );
}
