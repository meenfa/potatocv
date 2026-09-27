import Link from "next/link";

export default function NotFound() {
  return <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center text-[#44260a]">
    <p className="text-6xl font-bold">404</p><h1 className="mt-4 text-3xl font-bold">This page got mashed.</h1>
    <p className="mt-3">We couldn’t find the page you were looking for.</p>
    <Link href="/" className="mt-6 rounded-lg bg-[#f2b055] px-5 py-3 font-bold">Back to PotatoCV</Link>
  </main>;
}
