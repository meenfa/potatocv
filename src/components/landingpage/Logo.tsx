"use client";

import React from "react";

const Logo = () => {
  return (
    <div className="mb-12">
      <div className="relative inline-block mb-8">
        <span className="absolute left-[-4px] bottom-[-6px] w-full h-full bg-[#1e1c1b] rounded-xl z-0" />
        <div
          className="relative z-10 inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-[#f2b055] transition-all duration-100 active:translate-y-[8px] cursor-pointer"
          style={{
            boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5A2B"
          }}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-normal text-[#66421f] uppercase">
            Potatocv
          </span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-[#66421f] mb-3">
        Let&apos;s roast your CV, buddy!
      </h1>
      <p className="text-base sm:text-lg text-[#88633e]">
        Your cv won’t survive this.
      </p>
    </div>
  );
};

export default Logo;