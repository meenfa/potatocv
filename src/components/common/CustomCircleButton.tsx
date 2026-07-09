"use client";

import React, { ReactNode } from "react";

type CustomCircleButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const CustomCircleButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: CustomCircleButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 ${
        disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <span className="absolute left-[-4px] bottom-[-6px] w-full h-full bg-[#1e1c1b] rounded-full z-0" />

      <div
        className="relative z-10 w-full h-full flex items-center justify-center rounded-full bg-[#f2b055] transition-all duration-100 active:translate-y-[4px]"
        style={{
          boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5E3C",
        }}
      >
        {children}
      </div>
    </button>
  );
};

export default CustomCircleButton;
