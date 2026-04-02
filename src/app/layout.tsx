import type { Metadata } from "next";
import { Outfit, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "🥔 PotatoCV – Roast Your Resume!",
  description:
    "Drop your resume, get brutally honest feedback, and laugh along the way! AI-powered resume roaster.",
  keywords: ["PotatoCV", "Resume Roast", "Funny CV Feedback", "AI Resume"],
  authors: [{ name: "Shristi Poudel" }],
  creator: "PotatoCV AI",
  openGraph: {
    title: "🥔 PotatoCV – Roast Your Resume!",
    description:
      "Paste your CV and watch our AI roast it like a potato! Fun, honest, and spicy.",
    url: "https://yourdomain.com",
    siteName: "PotatoCV",
    images: [
      {
        url: "/asset/potato-og.png",
        width: 800,
        height: 600,
        alt: "PotatoCV Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${playfair.variable} ${outfit.variable} font-poppins antialiased bg-[#FFFDF5]`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}