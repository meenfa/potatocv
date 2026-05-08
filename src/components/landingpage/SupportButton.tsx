"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import CustomButton from "../common/CustomButton";

const SupportButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <div className="relative inline-block" onClick={() => setOpen(true)}>

          <CustomButton
            textClassName="text-base sm:text-lg text-[#66421f]"
            icon={<AiFillHeart className="text-[#211403] text-lg sm:text-xl" />}
          >
            Support
          </CustomButton>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-[#fffdf5] rounded-2xl border-4 border-[#673d13] p-6 sm:p-8 relative w-full max-w-lg sm:max-w-xs text-center shadow-xl">

            <button
              className="absolute top-3 right-3"
              onClick={() => setOpen(false)}
            >
              <div
                className="relative z-10 inline-flex items-center justify-center px-3 sm:px-4 py-1 sm:py-2 cursor-pointer transition-all duration-100 active:translate-y-[2px]"
              >
                <AiOutlineClose className="text-[#66421f] text-base" />
              </div>
            </button>

            <h2 className="text-base sm:text-xl font-bold pt-4 mb-1 text-[#1f1102]">
              Enjoyed the roast?
            </h2>

            <p className="text-[#1f1102] text-sm sm:text-xs font-medium">
              Support to keep it free!
            </p>

            <div className="flex flex-col items-center gap-2 mt-2">
              <div className="text-center">
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
                      onClick={() => navigator.clipboard?.writeText("9823645664")}
                    >
                      9823645664
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-[#2d1802] font-semibold mb-2 mt-4">
                  Support me with momo
                </p>

                <CustomButton
                  href="https://buymemomo.com/meenfax"
                  textClassName="text-base sm:text-lg text-[#1F1F1F]"
                >
                  BuyMeMomo
                </CustomButton>

                <p className="text-[11px] text-[#66421f] mt-2">
                  (digitally, sadly… no achar included)
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportButton;