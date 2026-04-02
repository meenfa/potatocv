"use client";

import React from "react";

const Logo = () => {
  return (
    <div className="mb-12">
      <div className="relative inline-block mb-8">
        <span className="absolute left-[-4px] bottom-[-12px] w-full h-full bg-[#3B2A1A] rounded-xl z-0" />
        <div
          className="relative z-10 inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-[#C68642] transition-all duration-100 active:translate-y-[8px] cursor-pointer"
          style={{
            boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5A2B"
          }}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black">
            🥔 POTATOCV
          </span>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3">
        Let&apos;s roast that CV, buddy! 🔥
      </h1>
      <p className="text-base sm:text-lg text-gray-600">
        No mercy, just laughs. AI-powered honesty guaranteed. 😎
      </p>
    </div>
  );
};

export default Logo;