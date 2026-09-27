"use client";

import React, { useState } from "react";
import { FileText, ShieldCheck, Sparkles } from "lucide-react";
import Header from "./Header";
import PotatoCharacter from "./PotatoCharacter";
import RoastForm from "./RoastForm";
import RoastResult from "./RoastResult";
import Footer from "./Footer";
import SupportButton from "./SupportButton";

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
      setRoast(data.result || "Got nothing back! Try again?");
    } catch (err) {
      console.error(err);
      setRoast("Oops! Something went wrong. Try again?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fffdf5] text-[#211403]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] opacity-50"
        style={{
          backgroundImage: "radial-gradient(#c68642 0.7px, transparent 0.7px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-5 sm:px-6 sm:pt-8 lg:px-8">
        <Header />
        <main>
          <section className="mx-auto grid max-w-5xl items-center gap-4 pb-8 pt-4 sm:pb-12 md:grid-cols-[1.15fr_0.85fr] md:gap-8 md:pt-10">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#44260a]/20 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#66421f]">
                <Sparkles aria-hidden="true" size={14} /> Honest feedback, with a little spice
              </span>
              <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-[#211403] sm:text-5xl md:mx-0 md:text-6xl">
                Your CV deserves a{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">reality check.</span>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-1 -z-0 h-3 -rotate-1 bg-[#f2b055]/75 sm:h-4" />
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#66421f] sm:text-lg md:mx-0">
                Get a sharp, specific AI roast of your resume—plus practical ways to make it stronger. No account, no awkward pep talk.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-[#66421f] md:justify-start">
                <span className="inline-flex items-center gap-2"><FileText size={16} aria-hidden="true" /> PDF, DOCX or paste</span>
                <span className="inline-flex items-center gap-2"><ShieldCheck size={16} aria-hidden="true" /> No sign-up required</span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xs md:max-w-sm">
              <div className="relative rounded-3xl border-2 border-[#44260a] bg-[#f8e4c5] px-6 pb-5 pt-4 shadow-[6px_6px_0_#44260a] sm:px-8">
                <span className="absolute -right-3 -top-3 rotate-6 rounded-md border-2 border-[#44260a] bg-[#f2b055] px-3 py-1 text-xs font-black uppercase tracking-wide shadow-[2px_2px_0_#44260a]">CV inspector</span>
                <PotatoCharacter />
                <p className="mt-1 text-center text-sm font-semibold text-[#66421f]">A tiny potato. Very big opinions.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="form-heading" className="mx-auto max-w-4xl scroll-mt-6">
            <div className="mb-4 flex flex-col items-center gap-1 text-center sm:mb-5">
              <h2 id="form-heading" className="text-2xl font-black tracking-tight text-[#211403] sm:text-3xl">Let’s see what your CV is hiding.</h2>
            </div>
            <RoastForm resume={resume} setResume={setResume} handleRoast={handleRoast} loading={loading} />
            <RoastResult roast={roast} onClear={() => setRoast("")} />
          </section>
        </main>
        <Footer />
      </div>

      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <SupportButton />
      </div>
    </div>
  );
};

export default Hero;
