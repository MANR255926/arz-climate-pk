"use client";

import React from "react";

interface SolutionCardProps {
  icon: string;
  title: string;
  description: string;
  tag: string;
  theme?: "amber" | "blue" | "khaki";
}

function SolutionCard({
  icon,
  title,
  description,
  tag,
  theme = "amber",
}: SolutionCardProps) {
  let hoverStyle =
    "hover:border-[#ff6a2b]/40 hover:bg-[#ff6a2b]/[0.08]";
  let tagColor = "text-[#ffb088]";

  if (theme === "blue") {
    hoverStyle =
      "hover:border-[#4f9ac9]/40 hover:bg-[#4f9ac9]/[0.08]";
    tagColor = "text-[#a9d3ea]";
  } else if (theme === "khaki") {
    hoverStyle =
      "hover:border-[#c9a876]/40 hover:bg-[#c9a876]/[0.08]";
    tagColor = "text-[#c9a876]";
  }

  return (
    <div
      className={`glass-panel rounded-2xl p-7 card-tilt ${hoverStyle} cursor-default flex flex-col justify-between h-full`}
    >
      <div>
        <span className="text-3xl mb-4 block" role="img" aria-label={title}>
          {icon}
        </span>
        <h3 className="font-['Space_Grotesk'] text-[17px] font-medium text-[#f2f0e8] mb-2.5">
          {title}
        </h3>
        <p className="text-sm text-[#a9b3ac] leading-relaxed">{description}</p>
      </div>
      <span className={`font-mono text-[11px] ${tagColor} mt-4 block`}>
        {tag}
      </span>
    </div>
  );
}

export default function SolutionsSection() {
  return (
    <section className="py-24 px-6 max-w-[1100px] mx-auto relative z-10" id="solutions">
      <div className="text-center mb-16">
        <div className="font-mono text-xs tracking-[0.12em] uppercase text-[#a9d3ea]">
          02 — What we can do
        </div>
        <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-[44px] tracking-tight mt-3 text-[#f2f0e8]">
          Realistic action for Pakistan
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [perspective:1000px]">
        <SolutionCard
          icon="🌳"
          title="Urban Forestry & Mangroves"
          description="Mass urban tree drives and coastal mangrove restoration in Sindh & Balochistan to reduce urban heat islands and prevent erosion."
          tag="Community Action"
          theme="khaki"
        />
        <SolutionCard
          icon="🌧️"
          title="Rainwater Harvesting"
          description="Household rainwater capture and localized reservoir storage to buffer against severe droughts and manage heavy monsoon runoff."
          tag="Water Security"
          theme="blue"
        />
        <SolutionCard
          icon="☀️"
          title="Solar Microgrids"
          description="Decentralized solar installations for off-grid villages and rooftop solar expansion across urban hubs to reduce coal reliance."
          tag="Clean Energy"
          theme="amber"
        />
        <SolutionCard
          icon="🌱"
          title="Resilient Farming"
          description="Switching to heat and drought-tolerant crop strains alongside drip irrigation to protect crop yields against climate stress."
          tag="Agritech Innovation"
          theme="khaki"
        />
      </div>
    </section>
  );
}
