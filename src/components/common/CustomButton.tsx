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
  const buttonStyle = `group relative inline-flex items-center justify-center gap-2 rounded-md border-[3px] border-[#1e1c1b] bg-[#f2b055] px-4 py-2.5 text-[#120901] shadow-[5px_5px_0_#1e1c1b] transition-[transform,box-shadow,background-color] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#ffc66e] hover:shadow-[7px_7px_0_#1e1c1b] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0_#1e1c1b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c68642]/50 ${className}`;

  const content = (
    <>
      {icon && <span className="inline-flex items-center" aria-hidden="true">{icon}</span>}
      <span className={`font-bold ${uppercase ? "uppercase" : ""} ${textClassName}`}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonStyle}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return <button type="button" onClick={onClick} className={buttonStyle}>{content}</button>;
  }

  return <span className={buttonStyle}>{content}</span>;
};

export default CustomButton;
