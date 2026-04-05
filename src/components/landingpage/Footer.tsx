"use client";

import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-12 pt-10 pb-10 border-t text-center">
      {/* Main Text */}
      <div className="space-y-2 max-w-xl mx-auto">
        <p className="text-sm sm:text-base text-[#66421f] font-semibold">
          Fun, friendly, and slightly ridiculous.
        </p>
        <p className="text-sm sm:text-base text-[#66421f]">
          Your CV is in good hands… your smile is optional.
        </p>
      </div>

      {/* Product Hunt Logo Button */}
      <div className="mt-6 flex justify-center">
        <a
          href="https://www.producthunt.com/products/potatocv?launch=potatocv"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-lg p-2 hover:bg-[#f2b055]/20 transition"
        >
          <Image
            src="/asset/ph.png"
            alt="Product Hunt"
            width={180}
            height={40}
            className="object-contain w-40 h-auto"
          />
        </a>
      </div>

      {/* Made By */}
      <div className="mt-8">
        <p className="text-md text-[#44260a] mb-3">
          Made by{" "}
          <span className="font-semibold">
            <a
              href="https://www.karkiankit.com.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @ankitkarki27
            </a>
          </span>
        </p>

        {/* Social Icons with Brand Colors */}
        <div className="flex justify-center gap-4 mt-3">
          <a
            href="https://github.com/ankitkarki27"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-max px-4 py-2 border border-black rounded-lg hover:bg-gray-100 transition"
          >
            <FaGithub className="text-black text-lg" />
            <span className="text-black font-medium">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/ankitkarki27"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-max px-4 py-2 border border-black rounded-lg hover:bg-blue-100 hover:text-blue-800 transition"
          >
            <FaLinkedin className="text-blue-700 text-lg" />
            <span className="text-blue-700 font-medium">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Footer Bottom Note */}
      <div className="mt-24 text-sm text-[#66421f]">
        &copy; {new Date().getFullYear()} PotatoCV. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;