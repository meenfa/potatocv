import type { Metadata } from "next";

const siteName = "PotatoCV";
const siteUrl = "https://potatocv.lol";
const socialImage = "/asset/og.jpg";

type PageSeo = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageSeo): Metadata {
  const fullTitle = title + " | " + siteName;
  const pageUrl = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "PotatoCV AI resume roaster" }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
      creator: "@ankitkarki27",
    },
  };
}
