"use client";

import React, { useState, useEffect } from "react";

const previewLinks = [
  { id: "floods", label: "Floods", icon: "🌊" },
  { id: "heatwaves", label: "Heatwaves", icon: "🔥" },
  { id: "glaciers", label: "Glaciers", icon: "🧊" },
  { id: "crops", label: "Crops", icon: "🌾" },
  { id: "solutions", label: "Solutions", icon: "💡" },
  { id: "sources", label: "Sources", icon: "📊" },
];

export default function Hero() {
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState("0");
  const [val3, setVal3] = useState(0);

  useEffect(() => {
    // Helper function for requestAnimationFrame count up animation
    function animateCount(
      target: number,
      decimals: number,
      duration: number,
      onUpdate: (v: string | number) => void
    ) {
      const start = performance.now();
      function tick(now: number) {
        const elapsed = now - start;
        const p = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;

        onUpdate(decimals ? val.toFixed(decimals) : Math.round(val));

        if (p < 1) {
          requestAnimationFrame(tick);
        }
      }
      requestAnimationFrame(tick);
    }

    const timer = setTimeout(() => {
      animateCount(33, 0, 1400, (v) => setVal1(Number(v)));
      animateCount(15.2, 1, 1400, (v) => setVal2(String(v)));
      animateCount(9, 0, 1400, (v) => setVal3(Number(v)));
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative text-center pt-36 pb-20 px-6 z-10">
      {/* Eyebrow */}
      <div className="font-mono text-xs tracking-[0.12em] uppercase text-[#a9d3ea] mb-5 animate-fade-up-1">
        Pakistan · verified climate data · 2000–2025
      </div>

      {/* Headline */}
      <h1 className="font-['Space_Grotesk'] font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.02] tracking-tight max-w-[920px] text-[#f2f0e8] animate-fade-up-2">
        Pakistan is heating up —{" "}
        <em className="not-italic text-[#ff6a2b]">and paying for it.</em>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-[17px] text-[#a9b3ac] max-w-[520px] mt-6 leading-relaxed animate-fade-up-3">
        Real numbers from the World Bank, UNDP and the UN — not predictions. See
        what the greenhouse effect is already costing us, and what we can still
        do about it.
      </p>

      {/* Stat Cards Row */}
      <div className="flex flex-wrap gap-3.5 justify-center mt-14 animate-fade-up-4 w-full max-w-2xl">
        <div className="glass-panel rounded-2xl px-5 py-4 min-w-[150px] flex-1 sm:flex-initial text-left">
          <b className="block font-mono text-2xl sm:text-[26px] font-medium text-[#f2f0e8]">
            {val1}M
          </b>
          <span className="text-xs text-[#6c766f]">
            million displaced, 2022 floods
          </span>
        </div>

        <div className="glass-panel rounded-2xl px-5 py-4 min-w-[150px] flex-1 sm:flex-initial text-left">
          <b className="block font-mono text-2xl sm:text-[26px] font-medium text-[#f2f0e8]">
            ${val2}B
          </b>
          <span className="text-xs text-[#6c766f]">
            economic loss, 2022 floods
          </span>
        </div>

        <div className="glass-panel rounded-2xl px-5 py-4 min-w-[150px] flex-1 sm:flex-initial text-left">
          <b className="block font-mono text-2xl sm:text-[26px] font-medium text-[#f2f0e8]">
            {val3}%
          </b>
          <span className="text-xs text-[#6c766f]">
            of GDP at risk yearly, worst case
          </span>
        </div>
      </div>

      {/* What's Ahead Preview Strip */}
      <div className="mt-8 flex flex-col items-center gap-2.5 animate-fade-up-4 w-full max-w-2xl">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6c766f]">
          What&apos;s ahead
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {previewLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="glass-panel rounded-full px-3.5 py-1.5 font-mono text-xs text-[#a9b3ac] hover:text-[#f2f0e8] hover:border-[#ff6a2b]/40 hover:bg-[#ff6a2b]/[0.08] transition-all cursor-pointer inline-flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#ff6a2b]"
            >
              <span className="text-[11px] opacity-80" aria-hidden="true">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="mt-12 font-mono text-[11px] text-[#6c766f] flex flex-col items-center gap-2 animate-fade-up-5">
        <span>scroll</span>
        <div className="w-[1px] h-[34px] bg-gradient-to-b from-[#6c766f] to-transparent animate-drop" />
      </div>
    </section>
  );
}
