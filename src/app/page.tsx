import type { Metadata } from "next";
import Hero from "@/components/landingpage/Hero";
import { createPageMetadata } from "@/lib/seo";

const homeDescription =
  "Get a funny, specific AI resume roast and practical improvement ideas. Upload a PDF or DOCX, or paste your CV. No account required.";

export const metadata: Metadata = createPageMetadata({
  title: "AI Resume Roaster",
  description: homeDescription,
  path: "/",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PotatoCV",
  url: "https://potatocv.lol/",
  image: "https://potatocv.lol/asset/og.jpg",
  description: homeDescription,
  softwareVersion: "2.0.0",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  author: {
    "@type": "Person",
    name: "Ankit Karki",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "AI-powered resume feedback",
    "Resume roast and improvement suggestions",
    "PDF and DOCX text extraction",
    "No account required",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="w-full overflow-x-clip bg-white">
        <Hero />
      </div>
    </>
  );
}
