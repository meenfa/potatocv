"use client";

export default function RoastError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
    <h1 className="text-3xl font-bold">The roast got a little burnt.</h1><p className="mt-3 text-gray-300">Try loading the page again.</p>
    <button onClick={() => reset()} className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-black">Try again</button>
  </main>;
}
