"use client";

import React, { useEffect, useState } from "react";

interface RoastFormProps {
  resume: string;
  setResume: (value: string) => void;
  handleRoast: () => void;
  loading: boolean;
}

const MIN_RESUME_LENGTH = 100;

const RoastForm = ({ resume, setResume, handleRoast, loading }: RoastFormProps) => {
  const [loadingMessage, setLoadingMessage] = useState("Preparing to roast...");
  const [messageIndex, setMessageIndex] = useState(0);

  const trimmedLength = resume.trim().length;
  const isValid = trimmedLength >= MIN_RESUME_LENGTH;
  const charsNeeded = MIN_RESUME_LENGTH - trimmedLength;

  const loadingMessages = [
    "Reading your CV carefully... 🧐",
    "Hmm… impressive skills detected! 🔥",
    "Scanning for danger experiences… 💥",
    "Oh wow, that’s quite something! 😎",
    "Almost there, keep calm… 🥔",
  ];

  // Cycle through messages while loading
  useEffect(() => {
    if (!loading) {
      setLoadingMessage("Preparing to roast...");
      setMessageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      setLoadingMessage(loadingMessages[(messageIndex + 1) % loadingMessages.length]);
    }, 1500); // change message every 1.5 seconds

    return () => clearInterval(interval);
  }, [loading, messageIndex]);

  return (
    <div className="bg-white p-6 sm:p-8">
      {/* Textarea */}
      <div className="mb-6">
        <label className="block text-[#66421f] font-semibold mb-3 text-base sm:text-lg">
          Paste your CV here
        </label>
        <textarea
          placeholder="Copy-paste your CV content... Don't be shy, we've seen worse 😉"
          className="w-full h-40 p-4 rounded-xl border-4 border-dashed border-[#C68642] focus:outline-none focus:ring-0 focus:border-[#C68642] resize-none text-[#5a330d] placeholder:text-[#7a6b5c] text-sm sm:text-base bg-white"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      </div>

      {/* Dynamic Hint */}
      {!isValid && (
        <p className="text-xs sm:text-sm text-gray-500 mb-4 text-center">
          Add {charsNeeded} more characters to roast your CV 🥔
        </p>
      )}

      {/* Potato Roast Button */}
      <div className="relative inline-block w-full sm:w-auto">
        <span className="absolute left-[-4px] bottom-[-8px] w-full h-full bg-[#1e1c1b] rounded-xl z-0" />
        <button
          onClick={handleRoast}
          disabled={!isValid || loading}
          className={`relative z-10 w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#f2b055] text-[#66421f] rounded-xl font-bold text-base sm:text-lg transition-all duration-100 active:translate-y-[8px] ${!isValid ? "opacity-100 cursor-not-allowed" : ""
            }`}
        >
          {loading ? (
            <span className="flex flex-col items-center gap-1 ">
              <span className="text-sm sm:text-base">{loadingMessage}</span>
              <svg className="animate-spin h-5 w-5 mt-1" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </span>
          ) : (
            <span className="cursor-pointer">🥔 Roast My CV</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default RoastForm;