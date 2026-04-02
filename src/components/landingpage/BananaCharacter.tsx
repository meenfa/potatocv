"use client";

import React from "react";
import Image from "next/image";

const BananaCharacter = () => {
  return (
    <div className="flex justify-center mb-10">
      <div className="relative animate-bounce-slow">
        <Image
          src="/asset/banana1.png"
          alt="Banana"
          width={140}
          height={140}
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
          priority
        />
      </div>
    </div>
  );
};

export default BananaCharacter;