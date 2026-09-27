import Link from "next/link";

export default function RoastNotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
    <h1 className="text-3xl font-bold">Roast page not found.</h1><Link href="/" className="mt-6 underline">Back to PotatoCV</Link>
  </main>;
}
