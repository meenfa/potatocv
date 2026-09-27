"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body className="bg-[#FFFDF5] text-[#44260a]"><main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
    <h1 className="text-3xl font-bold">PotatoCV needs a moment.</h1><p className="mt-3">An unexpected error occurred.</p>
    <button onClick={() => reset()} className="mt-6 rounded-lg bg-[#f2b055] px-5 py-3 font-bold">Try again</button>
  </main></body></html>;
}
