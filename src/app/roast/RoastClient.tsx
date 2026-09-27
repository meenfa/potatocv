"use client";

import { useState } from "react";
import Link from "next/link";

export default function RoastClient() {
  const [resume, setResume] = useState("");
  const [roast, setRoast] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoast = async () => {
    if (resume.trim().length < 100) {
      setError("Add at least 100 characters so the feedback can be specific.");
      return;
    }
    setLoading(true);
    setRoast("");
    setError("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, mode: "roast" }),
      });
      const data = await response.json();
      if (!response.ok || typeof data.result !== "string" || !data.result.trim()) {
        throw new Error(data.result || "Could not analyze the resume. Please try again.");
      }
      setRoast(data.result);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fffdf5] px-4 py-8 text-[#211403] sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <h1 className="text-center text-3xl font-black sm:text-4xl">Roast my resume</h1>
        <Link href="/" className="mb-6 mt-3 text-sm text-[#66421f] underline underline-offset-4">← Back to PotatoCV</Link>
        <div className="w-full rounded-2xl border-2 border-[#44260a] bg-white p-4 shadow-[5px_5px_0_#44260a] sm:p-7">
          <label htmlFor="roast-resume" className="block text-sm font-bold text-[#44260a]">Resume text</label>
          <p className="mb-2 mt-1 text-xs text-[#66421f]">Paste at least 100 characters for a specific roast.</p>
          <textarea
            id="roast-resume"
            className="h-48 w-full resize-y rounded-xl border border-[#44260a]/20 bg-[#fffdf5] p-4 text-sm focus:border-[#c68642] focus:outline-none focus:ring-4 focus:ring-[#c68642]/20 sm:text-base"
            value={resume}
            onChange={(event) => setResume(event.target.value)}
          />
          <button
            type="button"
            onClick={handleRoast}
            disabled={loading}
            className="mt-4 w-full rounded-xl border-2 border-[#211403] bg-[#f2b055] px-6 py-3 font-bold shadow-[0_3px_0_#211403] transition hover:bg-[#ffc66e] active:translate-y-0.5 active:shadow-none disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "Reading your resume…" : "Roast my resume"}
          </button>
        </div>
        {error && <p role="alert" className="mt-5 w-full rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">{error}</p>}
        {roast ? (
          <section aria-live="polite" className="mt-6 w-full rounded-2xl border-2 border-[#44260a] bg-white p-5 shadow-[5px_5px_0_#44260a] sm:p-7">
            <h2 className="text-xl font-black">The honest review</h2>
            <p className="mt-4 whitespace-pre-line break-words leading-7">{roast}</p>
          </section>
        ) : !error && (
          <p className="mt-6 w-full rounded-xl border border-[#44260a]/15 bg-white/80 p-5 text-center text-sm text-[#66421f]" aria-live="polite">
            Your roast will appear here after you submit your resume.
          </p>
        )}
      </div>
    </main>
  );
}
