"use client";

interface RoastResultProps {
  roast: string;
  onClear: () => void;
  loading?: boolean;
  error?: string;
}

const RoastResult = ({ roast, onClear, loading = false, error = "" }: RoastResultProps) => {
  if (!roast) {
    return (
      <section aria-live="polite" className="mt-7 rounded-2xl border border-[#44260a]/15 bg-white/80 px-5 py-6 text-center sm:px-8">
        <p className="font-bold text-[#44260a]">
          {loading ? "Your potato is reading the CV…" : error ? "We couldn’t finish that roast." : "Your roast will show up here."}
        </p>
        <p className={"mt-1 text-sm " + (error ? "text-red-800" : "text-[#66421f]")}>
          {loading
            ? "Finding the useful feedback between the buzzwords."
            : error || "Add at least 100 characters, then submit your CV to get started."}
        </p>
      </section>
    );
  }
  const lines = roast.split("\n").map((line) => line.trim()).filter(Boolean);

  return (
    <section aria-labelledby="roast-result-heading" aria-live="polite" className="mt-8 overflow-hidden rounded-2xl border-2 border-[#44260a] bg-white shadow-[6px_6px_0_#44260a] animate-fade-in">
      <div className="flex items-center justify-between gap-4 border-b-2 border-[#44260a] bg-[#f2b055] px-5 py-4 sm:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#66421f]">PotatoCV report</p>
          <h2 id="roast-result-heading" className="mt-1 text-xl font-black text-[#211403] sm:text-2xl">The honest review</h2>
        </div>
        <span aria-hidden="true" className="text-2xl">🥔</span>
      </div>
      <div className="space-y-4 px-5 py-6 sm:px-7 sm:py-8">
        {lines.map((line, index) => (
          <p key={index} className="break-words border-l-2 border-[#c68642] pl-4 text-left text-base leading-7 text-[#44260a] sm:text-lg">
            {line}
          </p>
        ))}
        <div className="border-t border-[#44260a]/15 pt-5">
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg px-3 py-2 text-sm font-bold text-[#66421f] transition-colors hover:bg-[#f2b055]/20 hover:text-[#211403] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#c68642]/40"
          >
            Roast another CV <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoastResult;
