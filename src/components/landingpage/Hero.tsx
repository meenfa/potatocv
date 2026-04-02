"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import BananaCharacter from "./BananaCharacter";
import RoastForm from "./RoastForm";
import RoastResult from "./RoastResult";
import Footer from "./Footer";

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
          <Logo />
          <BananaCharacter />
          <RoastForm
            resume={resume}
            setResume={setResume}
            handleRoast={handleRoast}
            loading={loading}
          />
          <RoastResult roast={roast} onClear={() => setRoast("")} />
          <Footer />
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