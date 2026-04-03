import type { Metadata } from "next";
import { Poppins,Fredoka } from "next/font/google";
import "./globals.css";

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
  title: "PotatoCV – Roast Your CV!",
  description:
    "Drop your CV, get brutally honest feedback, and laugh along the way! AI-powered CV roaster.",
  keywords: ["PotatoCV", "CV Roast", "Funny CV Feedback", "AI CV"],
  authors: [{ name: "Ankit Karki" }],
  creator: "PotatoCV",
  openGraph: {
    title: "PotatoCV – Roast Your CV!",
    description:
      "Paste your CV and watch our AI roast it like a potato! Fun, honest, and spicy.",
    url: "https://potatocv.conneqtly.me/",
    siteName: "PotatoCV",
    images: [
      {
        url: "/asset/og.png",
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
        className={`${fredoka.variable} font-fredoka antialiased bg-[#FFFDF5]`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}