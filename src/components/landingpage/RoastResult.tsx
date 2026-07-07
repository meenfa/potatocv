"use client";

import React from "react";

interface RoastResultProps {
  roast: string;
  onClear: () => void;
}

const RoastResult = ({ roast, onClear }: RoastResultProps) => {
  if (!roast) return null;

  // Split into lines instead of sections
  const lines = roast
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="mt-4 rounded-2xl max-w-4xl mx-auto border-4 border-dashed border-[#C68642] overflow-hidden animate-fade-in">
      <div className="bg-[#f2b055] px-6 py-4">
        <h2 className="text-[#643707] font-bold text-lg sm:text-xl text-center flex items-center justify-center gap-2">
          ARE YOU READYYYYYYYY??? <span>🔥</span>
        </h2>
      </div>

      <div className="p-6 sm:p-8 space-y-4">
        {lines.map((line, idx) => (
          <p
            key={idx}
            className="text-[#C68642] text-left text-base sm:text-xl leading-relaxed font-medium tracking-tight"
          >
            {line}
          </p>
        ))}

        <div className="mt-6 pt-4 border-t border-[#7a4206] text-center">
          <button
            onClick={onClear}
            className="text-gray-800 hover:text-[#C68642] text-xl transition-colors cursor-pointer"
          >
            Roast another CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoastResult;
