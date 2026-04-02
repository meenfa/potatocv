"use client";

import React from "react";

interface RoastResultProps {
  roast: string;
  onClear: () => void;
}

const RoastResult = ({ roast, onClear }: RoastResultProps) => {
  if (!roast) return null;

  return (
    <div className="mt-8 bg-gray-900 rounded-2xl border-2 border-dashed border-[#C68642] overflow-hidden animate-fade-in">
      <div className="bg-[#C68642] px-6 py-3">
        <h2 className="text-black font-bold text-lg sm:text-xl flex items-center justify-center gap-2">
          <span>🔥</span> HERE&apos;S YOUR ROAST <span>🔥</span>
        </h2>
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-gray-200 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
          {roast}
        </p>
        <div className="mt-6 pt-4 border-t border-gray-700 text-center">
          <button
            onClick={onClear}
            className="text-gray-400 hover:text-[#C68642] text-sm transition-colors"
          >
            Roast another CV →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoastResult;