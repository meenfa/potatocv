"use client";

import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-12 pt-16 pb-12 border-t text-center">
      <div className="space-y-3 max-w-xl mx-auto px-4">
        <p className="text-lg sm:text-xl text-[#66421f] font-bold">
          Fun, friendly, and slightly ridiculous.
        </p>
        <p className="text-base sm:text-lg text-[#66421f]">
          Your CV is in good hands… your smile is optional.
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="https://www.producthunt.com/products/potatocv?launch=potatocv"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-lg p-3 hover:bg-[#f2b055]/20 transition"
        >
          <Image
            src="/asset/ph.png"
            alt="Product Hunt"
            width={200}
            height={45}
            className="object-contain w-48 h-auto"
          />
        </a>
      </div>

      <div className="mt-10">
        <p className="text-lg text-[#44260a] mb-4">
          Made by{" "}
          <span className="font-bold">
            <a
              href="https://www.meenfa.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline decoration-2 underline-offset-4"
            >
              Ankit Karki
            </a>
          </span>
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <a
            href="https://github.com/meenfa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-max px-5 py-3 border-2 border-black rounded-lg hover:bg-gray-100 transition"
          >
            <FaGithub className="text-black text-2xl" />
          </a>

          <a
            href="https://www.linkedin.com/in/ankit-karki-9128a4286"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-max px-5 py-3 border-2 border-black rounded-lg hover:bg-blue-100 hover:text-blue-800 transition"
          >
            <FaLinkedin className="text-blue-700 text-2xl" />
          </a>

          <a
            href="https://x.com/meenfax"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-max px-5 py-3 border-2 border-black rounded-lg hover:bg-gray-100 transition"
          >
            <FaXTwitter className="text-black text-2xl" />
          </a>
        </div>
      </div>

      <div className="mt-16 text-base text-[#66421f] font-medium">
        &copy; {new Date().getFullYear()} PotatoCV. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
