"use client";

import React from "react";
import CustomButton from "../common/CustomButton";
const Header = () => {
  return (
    <div className="mb-4">
      <div className="relative inline-block mb-4">
        <CustomButton
          uppercase
          textClassName="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl"
        >
          Potatocv
        </CustomButton>
      </div>

      
    </div>
  );
};

export default Header;