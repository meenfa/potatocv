"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center text-[#44260a]">
    <h1 className="text-3xl font-bold">The kitchen hit a snag.</h1><p className="mt-3">Please try loading this page again.</p>
    <button onClick={() => reset()} className="mt-6 rounded-lg bg-[#f2b055] px-5 py-3 font-bold">Try again</button>
  </main>;
}
