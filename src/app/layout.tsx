import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://potatocv.lol"),
  title: {
    default: "PotatoCV | AI Resume Roaster",
    template: "%s | PotatoCV",
  },
  description:
    "Get a funny, specific AI resume roast and practical improvement ideas. Upload a PDF or DOCX, or paste your CV. No account required.",
  keywords: [
    "PotatoCV",
    "AI resume review",
    "CV roast",
    "resume feedback",
    "resume improvement",
  ],
  authors: [{ name: "Ankit Karki" }],
  creator: "PotatoCV",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "PotatoCV | AI Resume Roaster",
    description:
      "Get a funny, specific AI resume roast and practical improvement ideas. No account required.",
    siteName: "PotatoCV",
    images: [
      {
        url: "/asset/og.jpg",
        width: 1200,
        height: 630,
        alt: "PotatoCV AI resume roaster",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PotatoCV | AI Resume Roaster",
    description:
      "Get a funny, specific AI resume roast and practical improvement ideas.",
    images: ["/asset/og.jpg"],
    creator: "@ankitkarki27",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={fredoka.variable + " font-fredoka antialiased bg-[#FFFDF5]"}>
        {children}
        <Analytics />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
