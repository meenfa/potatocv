"use client";

import React, { ReactNode } from "react";

type CustomButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  textClassName?: string;
  className?: string;
  icon?: ReactNode;
  uppercase?: boolean;
  href?: string;
};

const CustomButton = ({
  children,
  onClick,
  textClassName = "",
  className = "",
  icon,
  uppercase = false,
  href,
}: CustomButtonProps) => {
  const content = (
    <>
      <span className="absolute left-[-4px] bottom-[-6px] w-full h-full bg-[#1e1c1b] rounded-xl z-0" />

      <div
        className="relative z-10 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-[#f2b055] cursor-pointer transition-all duration-100 active:translate-y-[4px]"
        style={{
          boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5E3C",
        }}
      >
        {icon && <span className="flex items-center">{icon}</span>}

        <span
          className={`font-bold text-[#120901] ${
            uppercase ? "uppercase" : ""
          } ${textClassName}`}
        >
          {children}
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative inline-block ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative inline-block ${className}`}
    >
      {content}
    </div>
  );
};

export default CustomButton;