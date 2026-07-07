"use client";

import { useState } from "react";
import Link from "next/link";

export default function RoastPage() {
  const [resume, setResume] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoast = async () => {
    if (!resume.trim()) return alert("Paste your resume first 😅");

    setLoading(true);
    setRoast("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, mode: "roast" }),
      });

      const data = await res.json();
      setRoast(data.result);
    } catch (err) {
      console.error(err);
      setRoast("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Roast My Resume 😈</h1>

      <Link href="/" className="text-gray-400 mb-6 hover:underline">
        ← Back to Home
      </Link>

      <textarea
        placeholder="Paste your resume here..."
        className="w-full max-w-2xl h-40 p-4 rounded-xl bg-gray-900 border border-gray-700 focus:outline-none"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      <button
        onClick={handleRoast}
        className="mt-4 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
      >
        {loading ? "Roasting…" : "Roast My Resume 🔥"}
      </button>

      {roast && (
        <div className="mt-8 max-w-2xl bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Roast Result 😈</h2>
          <p>{roast}</p>
        </div>
      )}
    </main>
  );
}
