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
            className="relative z-10 inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-[#f2b055]  cursor-pointer transition-all duration-100 active:translate-y-[4px]"
            style={{
              boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5A2B",
            }}
          >
            <AiFillHeart className="text-[#66421f] mr-2 text-lg sm:text-xl" />
            <span className="text-[#66421f] font-bold">Support</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[#fffdf5] rounded-2xl border-4 border-[#673d13] p-6 sm:p-8 relative max-w-md mx-auto text-center shadow-xl">

            {/* Top-right Sorry Button */}
            <button
              className="absolute top-3 right-3"
              onClick={() => setOpen(false)}
            >
              {/* span className="absolute left-[-4px] bottom-[-6px] w-full h-full bg-[#1e1c1b] rounded-xl z-0" /> */}
              <div
                className="relative z-10 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#f2b055] cursor-pointer transition-all duration-100 active:translate-y-[2px]"
                style={{
                  boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5A2B",
                }}
              >
                <span className="text-[#66421f] font-semibold text-sm">Sorry</span>
              </div>
            </button>

            {/* Heading */}
            <h2 className="text-lg sm:text-xl font-bold pt-4 mb-4 text-[#66421f] flex items-center justify-center gap-2">
              Enjoyed the roast?
            </h2>
            <p className="text-[#66421f] mb-2 text-sm sm:text-base">
              Support us to keep it free!
            </p>
            <p className="text-[#66421f] mb-6 text-sm sm:text-base flex justify-center items-center gap-1">
              Even Rs1 makes a huge difference <AiFillHeart className="text-[#f59245]" />
            </p>

            {/* QR */}
            <Image
              src="/asset/supportqr.png"
              alt="Support QR"
              width={220}
              height={220}
              className="mx-auto mb-4"
            />

            {/* eSewa / Khalti ID */}
            <div className="inline-block border border-[#66421f] rounded-lg px-3 py-1">
              <p className="text-xs sm:text-sm text-[#66421f] font-medium">
                eSewa / Khalti ID: <span className="font-bold">9823645664</span>
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default SupportButton;