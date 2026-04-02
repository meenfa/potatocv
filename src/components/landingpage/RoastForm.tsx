"use client";

import React from "react";

interface RoastFormProps {
  resume: string;
  setResume: (value: string) => void;
  handleRoast: () => void;
  loading: boolean;
}

const RoastForm = ({ resume, setResume, handleRoast, loading }: RoastFormProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
      {/* Textarea */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3 text-base sm:text-lg">
          Paste your resume here 👇
        </label>
        <textarea
          placeholder="Copy-paste your resume content... Don't be shy, we've seen worse 😉"
          className="w-full h-40 p-4 rounded-xl border-2 border-dashed border-[#C68642] focus:outline-none focus:ring-0 focus:border-[#C68642] resize-none text-gray-800 placeholder:text-gray-400 text-sm sm:text-base bg-white"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      </div>

      {/* Potato Roast Button */}
      <div className="relative inline-block w-full sm:w-auto">
        <span className="absolute left-[-4px] bottom-[-8px] w-full h-full bg-[#3B2A1A] rounded-xl z-0" />
        <button
          onClick={handleRoast}
          disabled={!resume.trim() || loading}
          className="relative z-10 w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#C68642] text-black rounded-xl font-bold text-base sm:text-lg transition-all duration-100 active:translate-y-[8px] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0"
          style={{
            boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5A2B"
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Roasting...
            </span>
          ) : (
            <span>🥔 Roast My Resume 😈</span>
          )}
        </button>
      </div>

      {/* Hint */}
      {!resume.trim() && (
        <p className="text-xs sm:text-sm text-gray-400 mt-3 text-center">
          Paste something first, then click the button!
        </p>
      )}
    </div>
  );
};

export default RoastForm;