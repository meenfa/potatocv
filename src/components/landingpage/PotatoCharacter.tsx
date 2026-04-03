"use client";

import React from "react";
import Image from "next/image";

const PotatoCharacter = () => {
  const smallPotatos = [
    { src: "/asset/8.png", top: -100, left: -20, size: 100, opacity: 0.25 },
    { src: "/asset/9.png", top: -20, right: -40, size: 80, opacity: 0.3 },
    { src: "/asset/10.png", top: 140, left: 10, size: 70, opacity: 0.35 },
    { src: "/asset/11.png", top: 240, right: 60, size: 90, opacity: 0.15 },
  ];

  return (
    <div className="relative flex justify-center mb-0">
      {/* Main potato */}
      <div className="relative animate-bounce-slow z-10">
        <Image
          src="/asset/7.png"
          alt="potato"
          width={140}
          height={140}
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
          priority
        />
      </div>

      {/* Small floating potatos */}
      {smallPotatos.map((potato, index) => (
        <div
          key={index}
          className="absolute animate-bounce-slow z-0"
          style={{
            top: potato.top,
            left: potato.left,
            right: potato.right,
            width: potato.size,
            height: potato.size,
            opacity: potato.opacity,
          }}
        >
          <Image
            src={potato.src}
            alt={`potato ${index + 1}`}
            width={potato.size}
            height={potato.size}
          />
        </div>
      ))}
    </div>
  );
};

export default PotatoCharacter;