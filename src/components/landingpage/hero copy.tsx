"use client";

import React, { useState } from "react";
import Image from "next/image";

const Hero = () => {
  const [resume, setResume] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoast = async () => {
    if (!resume.trim()) return;

    setLoading(true);
    setRoast("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, mode: "roast" }),
      });

      const data = await res.json();
      setRoast(data.result || "Got nothing back! Try again? 🍌");
    } catch (err) {
      console.error(err);
      setRoast("Oops! Something went wrong. Try again? 🍌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Section */}
          <div className="mb-12">
            <div className="relative inline-block mb-8">
              <span className="absolute left-[-4px] bottom-[-12px] w-full h-full bg-[#3B2A1A] rounded-xl z-0" />
              <div
                className="relative z-10 inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-[#C68642] transition-all duration-100 active:translate-y-[8px] cursor-pointer"
                style={{
                  boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #8B5A2B"
                }}
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black">
                  POTATOCV
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3">
              Let&apos;s roast that CV, buddy! 
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              No mercy, just laughs. AI-powered honesty guaranteed.
            </p>
          </div>

          {/* Banana Character */}
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

          {/* Roast Section */}
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
                👆 Paste something first, then click the button!
              </p>
            )}
          </div>

          {/* Roast Result */}
          {roast && (
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
                    onClick={() => setRoast("")}
                    className="text-gray-400 hover:text-[#C68642] text-sm transition-colors"
                  >
                    Roast another CV →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-400">
              ⚡ 100% AI-powered • 0% filter • We keep it real
            </p>
            <p className="text-xs text-gray-300 mt-1">
              🥔 No potatoes were harmed in the making of this roaster
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0px); }
        }
        .animate-bounce-slow { 
          animation: bounce-slow 2s ease-in-out infinite; 
        }
        .animate-fade-in { 
          animation: fade-in 0.5s ease-out; 
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Hero;