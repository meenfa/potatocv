import React, { ReactNode } from "react";

type CustomCircleButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

const CustomCircleButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
  ariaLabel,
}: CustomCircleButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={`inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#44260a] bg-[#f2b055] text-[#211403] shadow-[0_2px_0_#44260a] transition duration-150 hover:-translate-y-0.5 hover:bg-[#ffc66e] hover:shadow-[0_4px_0_#44260a] active:translate-y-0.5 active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c68642]/40 disabled:cursor-not-allowed disabled:opacity-50 sm:h-16 sm:w-16 ${className}`}
  >
    {children}
  </button>
);

export default CustomCircleButton;
