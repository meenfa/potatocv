import type { Metadata } from "next";
import { Poppins, Fredoka } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next"
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fredoka",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://potatocv.conneqtly.me"),
  title: "PotatoCV – Roast Your CV!",
  description:
    "Drop your CV and get brutally honest, AI-powered feedback wrapped in humor. Free, no login needed. Just paste and get roasted!",
  keywords: [
    "PotatoCV",
    "CV Roast",
    "Funny CV Feedback",
    "AI CV Review",
    "Resume Roast",
    "AI Resume Feedback",
    "Free CV Checker",
    "Brutal CV Feedback",
  ],
  authors: [{ name: "Ankit Karki" }],
  creator: "PotatoCV",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "PotatoCV – Roast Your CV!",
    description:
      "Paste your CV and watch our AI roast it like a potato! Fun, honest, and spicy.",
    url: "https://potatocv.conneqtly.me/",
    siteName: "PotatoCV",
    images: [
      {
        url: "/asset/og.png",
        width: 1200,
        height: 630,
        alt: "PotatoCV – AI CV Roaster",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PotatoCV – Roast Your CV!",
    description:
      "Paste your CV and watch our AI roast it like a potato! Fun, honest, and spicy.",
    images: ["/asset/og.png"],
    creator: "@ankitkarki27",
  },
  alternates: {
    canonical: "https://potatocv.conneqtly.me/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} font-fredoka antialiased bg-[#FFFDF5]`}
      >
        <main>{children}</main>
        <Analytics />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}