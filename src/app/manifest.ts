import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "PotatoCV – Roast Your CV", short_name: "PotatoCV", description: "Get playful, AI-powered feedback on your resume.", start_url: "/", display: "standalone", background_color: "#FFFDF5", theme_color: "#f2b055" };
}
