import RoastClient from "./RoastClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Roast My Resume",
  description: "Paste your resume to get a short, funny AI roast and candid feedback from PotatoCV.",
  path: "/roast",
});

export default function RoastPage() {
  return <RoastClient />;
}
