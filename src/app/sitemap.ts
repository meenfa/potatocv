import type { MetadataRoute } from "next";

const siteUrl = "https://potatocv.lol";
const publicPages = [
  { path: "/", priority: 1 },
  { path: "/roast", priority: 0.8 },
  { path: "/about", priority: 0.5 },
  { path: "/contact", priority: 0.4 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map(({ path, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
