"use client";

import React from "react";

interface RoastResultProps {
  roast: string;
  onClear: () => void;
}

const RoastResult = ({ roast, onClear }: RoastResultProps) => {
  if (!roast) return null;

  // Split roast into sections using emojis as heading markers
  const sections = roast.split(/\n(?=[💥📬🎯🎓💼🧠😱🔍])/);

  return (
    <div className="mt-8 rounded-2xl border-4 border-dashed border-[#C68642] overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-[#f2b055] px-6 py-3">
        <h2 className="text-[#643707] font-bold text-lg sm:text-xl text-center flex items-center justify-center gap-2">
          ARE YOU READYYYYYYYY??? <span>🔥</span>
        </h2>
      </div>

      {/* Roast content */}
      <div className="p-6 sm:p-8 space-y-6">
        {sections.map((section, idx) => {
          // Split heading from content
          const lines = section.trim().split("\n");
          const heading = lines[0];
          const content = lines.slice(1).join("\n");

          return (
            <div key={idx} className="text-left">
              {/* Heading */}
              <p className="text-left text-[#66421f] text-xl sm:text-2xl font-bold mb-2">
                {heading}
              </p>

              {/* Roast Text */}
              <p className="text-[#C68642] text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                {content}
              </p>
            </div>
          );
        })}

        {/* Clear button */}
        <div className="mt-6 pt-4 border-t border-[#7a4206] text-center">
          <button
            onClick={onClear}
            className="text-gray-800 hover:text-[#C68642] text-xl transition-colors cursor-pointer"
          >
            Roast another CV →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoastResult;