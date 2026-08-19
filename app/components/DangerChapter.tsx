"use client";

import React from "react";

interface HardStat {
  value: string;
  label: string;
  sublabel?: string;
}

interface DangerChapterProps {
  id: string;
  chapterNumber: string;
  title: string;
  hardStat: HardStat;
  secondaryStat?: HardStat;
  paragraph: string;
  citationText: string;
  citationUrl?: string;
  icon: string;
  visualSide?: "left" | "right";
  theme?: "amber" | "blue" | "khaki";
  visualBadge?: string;
  visualHighlight?: {
    metric: string;
    description: string;
  };
}

export default function DangerChapter({
  id,
  chapterNumber,
  title,
  hardStat,
  secondaryStat,
  paragraph,
  citationText,
  citationUrl = "#sources",
  icon,
  visualSide = "left",
  theme = "amber",
  visualBadge,
  visualHighlight,
}: DangerChapterProps) {
  let themeColor = "text-[#ffb088]";
  let themeBorder = "border-[#ff6a2b]/30";
  let themeBg = "bg-[#ff6a2b]/10";
  let glowGradient =
    "bg-[radial-gradient(circle,rgba(255,106,43,0.18),transparent_70%)]";

  if (theme === "blue") {
    themeColor = "text-[#a9d3ea]";
    themeBorder = "border-[#4f9ac9]/30";
    themeBg = "bg-[#4f9ac9]/10";
    glowGradient =
      "bg-[radial-gradient(circle,rgba(79,154,201,0.18),transparent_70%)]";
  } else if (theme === "khaki") {
    themeColor = "text-[#c9a876]";
    themeBorder = "border-[#c9a876]/30";
    themeBg = "bg-[#c9a876]/10";
    glowGradient =
      "bg-[radial-gradient(circle,rgba(201,168,118,0.18),transparent_70%)]";
  }

  const isVisualLeft = visualSide === "left";

  const scrollToTarget = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId.startsWith("#")) {
      e.preventDefault();
      const el = document.getElementById(targetId.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      id={id}
      className="scroll-mt-28 py-10 sm:py-14 border-t border-white/5 first:border-t-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Visual Column */}
        <div
          className={`lg:col-span-5 ${
            isVisualLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[300px]">
            {/* Ambient atmospheric glow */}
            <div
              className={`absolute w-72 h-72 rounded-full ${glowGradient} -top-20 -right-20 pointer-events-none`}
            />

            <div className="relative z-10 flex items-center justify-between">
              <span className="text-4xl sm:text-5xl" role="img" aria-label={title}>
                {icon}
              </span>
              {visualBadge && (
                <span
                  className={`font-mono text-xs ${themeColor} ${themeBg} border ${themeBorder} rounded-full px-3 py-1`}
                >
                  {visualBadge}
                </span>
              )}
            </div>

            {visualHighlight && (
              <div className="relative z-10 my-6">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-[#f2f0e8] tracking-tight">
                  {visualHighlight.metric}
                </div>
                <div className="text-xs sm:text-sm text-[#a9b3ac] mt-1 font-sans">
                  {visualHighlight.description}
                </div>
              </div>
            )}

            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#6c766f]">
              <span>Verified Pakistan Data</span>
              <span className={themeColor}>2000–2025</span>
            </div>
          </div>
        </div>

        {/* Text & Stats Column */}
        <div
          className={`lg:col-span-7 flex flex-col justify-center ${
            isVisualLeft ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className={`font-mono text-xs tracking-[0.12em] uppercase ${themeColor} mb-2`}>
            {chapterNumber}
          </div>

          <h3 className="font-['Space_Grotesk'] font-bold text-2xl sm:text-3xl md:text-4xl text-[#f2f0e8] leading-tight tracking-tight">
            {title}
          </h3>

          {/* Hard Stats Callout */}
          <div className="flex flex-wrap gap-4 my-5">
            <div className="glass-panel rounded-2xl px-5 py-3.5 border border-white/10 min-w-[160px]">
              <div className="font-mono text-2xl sm:text-3xl font-medium text-[#f2f0e8]">
                {hardStat.value}
              </div>
              <div className="text-xs text-[#6c766f] mt-0.5">
                {hardStat.label}
              </div>
            </div>

            {secondaryStat && (
              <div className="glass-panel rounded-2xl px-5 py-3.5 border border-white/10 min-w-[160px]">
                <div className="font-mono text-2xl sm:text-3xl font-medium text-[#f2f0e8]">
                  {secondaryStat.value}
                </div>
                <div className="text-xs text-[#6c766f] mt-0.5">
                  {secondaryStat.label}
                </div>
              </div>
            )}
          </div>

          <p className="text-base text-[#a9b3ac] leading-relaxed max-w-xl">
            {paragraph}
          </p>

          <div className="mt-5">
            <a
              href={citationUrl}
              onClick={(e) => citationUrl.startsWith("#") ? scrollToTarget(e, citationUrl) : undefined}
              target={citationUrl.startsWith("http") ? "_blank" : undefined}
              rel={citationUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`font-mono text-xs ${themeColor} hover:underline inline-flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#ff6a2b] rounded px-1 -ml-1`}
            >
              <span>{citationText}</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
