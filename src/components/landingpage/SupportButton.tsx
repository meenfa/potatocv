"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";

const SupportButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <div className="relative">
        <div className="relative inline-block" onClick={() => setOpen(true)}>
          <span className="absolute left-[-4px] bottom-[-6px] w-full h-full bg-[#1e1c1b] rounded-xl z-0" />
          <div
            className="relative z-10 inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-[#f2b055] cursor-pointer transition-all duration-100 active:translate-y-[4px]"
            style={{
              boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5A2B",
            }}
          >
            <AiFillHeart className="text-[#66421f] mr-2 text-lg sm:text-xl" />
            <span className="text-[#66421f] font-bold text-sm sm:text-base">
              Support
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-[#fffdf5] rounded-2xl border-4 border-[#673d13] p-6 sm:p-8 relative w-full max-w-md sm:max-w-lg text-center shadow-xl">

            {/* Close Button */}
            <button
              className="absolute top-3 right-3"
              onClick={() => setOpen(false)}
            >
              <div
                className="relative z-10 inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#f2b055] cursor-pointer transition-all duration-100 active:translate-y-[2px]"
                style={{
                  boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5A2B",
                }}
              >
                <span className="text-[#66421f] font-semibold text-xs sm:text-sm">
                  Sorry, I can't
                </span>
              </div>
            </button>

            {/* Header */}
            <h2 className="text-base sm:text-xl font-bold pt-4 mb-2 text-[#66421f]">
              Enjoyed the roast?
            </h2>

            <p className="text-[#66421f] text-sm sm:text-base font-medium">
              Support to keep it free!
            </p>

            {/* 2 COLUMN LAYOUT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center mt-6">

              {/* LEFT: MOMO */}
              <div className="text-center sm:text-left">
                <p className="text-sm text-[#66421f] font-semibold mb-2">
                  Support me with momo
                </p>

                <a
                  href="https://buymemomo.com/meenfax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f2b055] text-[#66421f] font-bold transition hover:scale-105 active:translate-y-[2px]"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5A2B",
                  }}
                >
                  <Image
                    src="/asset/momo-logo.png"
                    alt="Momo Logo"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  Buy Me Momo
                </a>

                <p className="text-[11px] text-[#66421f]/70 mt-2">
                  (digitally, sadly… no achar included)
                </p>
              </div>

              {/* RIGHT: QR */}
              <div className="text-center sm:border-l sm:border-[#66421f]/20 sm:pl-6">
                <p className="text-xs sm:text-sm text-[#66421f] mb-2 font-medium">
                  Scan to support
                </p>

                <Image
                  src="/asset/supportqrimg.png"
                  alt="Support QR"
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg w-36 sm:w-44"
                />

                <div className="mt-3 inline-block border-2 border-[#66421f] rounded-lg px-3 py-1.5">
                  <p className="text-xs sm:text-sm text-[#66421f] font-medium">
                    eSewa / Khalti:{" "}
                    <span
                      className="font-bold cursor-pointer select-all"
                      onClick={() =>
                        navigator.clipboard?.writeText("9823645664")
                      }
                    >
                      9823645664
                    </span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportButton;