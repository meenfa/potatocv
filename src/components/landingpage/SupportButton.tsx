"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";

const SupportButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fixed Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative inline-block" onClick={() => setOpen(true)}>
          <span className="absolute left-[-4px] bottom-[-6px] w-full h-full bg-[#1e1c1b] rounded-xl z-0" />
          <div
            className="relative z-10 inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-[#f2b055] cursor-pointer transition-all duration-100 active:translate-y-[4px]"
            style={{
              boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5A2B",
            }}
          >
            <AiFillHeart className="text-[#66421f] mr-2 text-lg sm:text-xl" />
            <span className="text-[#66421f] font-bold text-sm sm:text-base">Support</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-[#fffdf5] rounded-2xl border-4 border-[#673d13] p-6 sm:p-8 relative w-full max-w-sm text-center shadow-xl">

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
                <span className="text-[#66421f] font-semibold text-xs sm:text-sm">Sorry 😅</span>
              </div>
            </button>

            {/* Heading */}
            <h2 className="text-base sm:text-xl font-bold pt-4 mb-2 text-[#66421f] flex items-center justify-center gap-2">
              Enjoyed the roast?
            </h2>

            <p className="text-[#66421f] mb-1 text-sm sm:text-base font-medium">
              Support us to keep it free!
            </p>

            {/* Updated Rs1 part */}
            <p className="text-[#66421f] mb-5 text-xs sm:text-sm flex justify-center items-center gap-1 leading-relaxed">
              Buy us a cup of chiya? ☕
            </p>

            {/* QR */}
            <Image
              src="/asset/supportqrimg.png"
              alt="Support QR"
              width={200}
              height={200}
              className="mx-auto mb-4 rounded-lg w-40 h-auto sm:w-52"
            />

            {/* eSewa / Khalti ID */}
            <div className="inline-block border-2 border-[#66421f] rounded-lg px-3 py-1.5">
              <p className="text-xs sm:text-sm text-[#66421f] font-medium">
                eSewa / Khalti:{" "}
                <span
                  className="font-bold cursor-pointer select-all"
                  title="Tap to copy"
                  onClick={() => navigator.clipboard?.writeText("9823645664")}
                >
                  9823645664
                </span>
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default SupportButton;