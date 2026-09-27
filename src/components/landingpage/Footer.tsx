import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { version } from "../../../package.json";

const socialLinks = [
  { href: "https://github.com/meenfa", label: "GitHub", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/meenfa", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://x.com/meenfax", label: "X", Icon: FaXTwitter },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#44260a]/15 px-4 pb-8 pt-10 text-[#66421f] sm:mt-20 sm:pt-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <div>
          <p className="text-lg font-bold text-[#44260a]">A little honesty. A lot less CV stress.</p>
          <p className="mt-2 text-sm sm:text-base">Useful feedback, served with a side of potato.</p>
        </div>

        <a
          href="https://www.producthunt.com/products/potatocv?launch=potatocv"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Find PotatoCV on Product Hunt"
          className="rounded-md transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c68642]/40"
        >
          <Image src="/asset/ph.png" alt="Product Hunt" width={160} height={36} className="h-auto w-36 object-contain" />
        </a>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <p className="text-sm">
            Made by <a href="https://www.meenfa.tech/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#44260a] underline-offset-4 hover:underline">Ankit Karki</a>
          </p>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit PotatoCV on ${label}`}
                className="rounded-full p-2.5 text-[#66421f] transition-colors hover:bg-[#f2b055]/25 hover:text-[#211403] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c68642]/40"
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-[#44260a]/10 pt-5 text-xs sm:w-full sm:flex-row sm:justify-between sm:text-sm">
          <nav aria-label="Footer" className="flex gap-5">
            <Link href="/about" className="hover:text-[#211403] hover:underline">About</Link>
            <Link href="/privacy" className="hover:text-[#211403] hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:text-[#211403] hover:underline">Terms</Link>
            <Link href="/contact" className="hover:text-[#211403] hover:underline">Contact</Link>
          </nav>
          <p className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} PotatoCV. All rights reserved.</span>
            <span className="rounded border border-[#44260a]/20 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide">
              v{version}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
