"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDsXfOx-PEhpm9M-SVuUxl5QQIgGsSrsilxBvIlERdFurv7T96CCR6iARCZQA9IKLe/exec";

const FeedbackButton = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [feedback, setFeedback] = useState("");
  const [improvement, setImprovement] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!feedback.trim() || !improvement.trim()) {
      setMessage("Please fill feedback and improvement.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          username,
          feedback,
          improvement,
        }),
      });

      setUsername("");
      setFeedback("");
      setImprovement("");
      setMessage("Thanks for your feedback 🥔");

      setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 1200);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        {/* <div className="fixed bottom-6 right-44 z-50"> */}
        <div className="relative inline-block" onClick={() => setOpen(true)}>
          <span className="absolute left-[-4px] bottom-[-6px] w-full h-full bg-[#1e1c1b] rounded-xl z-0" />

          <div
            className="relative z-10 inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white cursor-pointer transition-all duration-100 active:translate-y-[4px]"
            style={{
              boxShadow: "inset 0 1px 0 #ffffff, inset 0 -4px 0 #d1d5db",
            }}
          >
            <MessageSquare className="text-black mr-2 text-lg sm:text-xl" />
            <span className="text-black font-bold text-sm sm:text-base">
              Give Feedback
            </span>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-[#fffdf5] rounded-2xl border-4 border-[#673d13] p-6 sm:p-8 relative w-full max-w-md text-center shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-[#66421f] font-bold text-2xl cursor-pointer"
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-[#66421f]">
              Give your feedback 🥔
            </h2>

            <p className="mt-2 text-sm text-[#66421f]">
              Tell me what felt good, bad, or confusing.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3 text-left">
              <label htmlFor="feedback-name" className="block text-sm font-semibold text-[#44260a]">Name or username (optional)</label>
              <input
                id="feedback-name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border-2 border-[#e8c99a] bg-white px-4 py-3 text-sm outline-none focus:border-[#f2b055]"
              />

              <label htmlFor="feedback-comments" className="block text-sm font-semibold text-[#44260a]">Your feedback</label>
              <textarea
                id="feedback-comments"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border-2 border-[#e8c99a] bg-white px-4 py-3 text-sm outline-none focus:border-[#f2b055]"
              />

              <label htmlFor="feedback-improvement" className="block text-sm font-semibold text-[#44260a]">What should improve?</label>
              <textarea
                id="feedback-improvement"
                value={improvement}
                onChange={(e) => setImprovement(e.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border-2 border-[#e8c99a] bg-white px-4 py-3 text-sm outline-none focus:border-[#f2b055]"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full relative font-black text-black inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl  bg-[#f2b055] transition-all duration-100 active:translate-y-[4px] ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                  }`}
                style={{
                  boxShadow: "inset 0 1px 0 #EED5B7, inset 0 -4px 0 #000000",
                }}
              >
                {loading ? "Sending..." : "Submit Feedback"}
              </button>
            </form>

            {message && (
              <p className="mt-3 text-center text-sm font-medium text-[#66421f]">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
