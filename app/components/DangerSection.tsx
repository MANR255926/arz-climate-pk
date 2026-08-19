"use client";

import React from "react";
import DangerChapter from "./DangerChapter";

interface DangerCardProps {
  id?: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
  theme?: "amber" | "blue" | "khaki";
}

function DangerCard({
  id,
  icon,
  title,
  description,
  tag,
  theme = "amber",
}: DangerCardProps) {
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
      id={id}
      className={`glass-panel rounded-2xl p-7 card-tilt ${hoverStyle} cursor-default flex flex-col justify-between h-full scroll-mt-28`}
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

export default function DangerSection() {
  return (
    <section className="py-24 px-6 max-w-[1100px] mx-auto relative z-10" id="danger">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="font-mono text-xs tracking-[0.12em] uppercase text-[#ffb088]">
          01 — Why it matters here
        </div>
        <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-[44px] tracking-tight mt-3 text-[#f2f0e8]">
          One country, disproportionate cost
        </h2>
        <p className="text-sm sm:text-base text-[#a9b3ac] max-w-lg mx-auto mt-4">
          Pakistan contributes less than 1% of global greenhouse emissions, yet stands among the top ten most climate-vulnerable nations on Earth.
        </p>
      </div>

      {/* Chapter 1: Floods (Full width, visual left) */}
      <DangerChapter
        id="floods"
        chapterNumber="Chapter 01.1 — Deluge & Inundation"
        title="Floods: A third of the nation submerged"
        hardStat={{
          value: "33M",
          label: "people displaced in 2022",
        }}
        secondaryStat={{
          value: "$15.2B",
          label: "direct economic loss",
        }}
        paragraph="The 2022 monsoon season pushed Pakistan's river basins past their absolute breaking limits. Over 33 million people were displaced, 1,700+ lives were lost, and entire agricultural districts were submerged for months. Without climate-resilient water infrastructure, seasonal monsoons will repeatedly devastate vulnerable communities."
        citationText="World Bank Post-Disaster Needs Assessment (PDNA) 2022"
        citationUrl="https://www.worldbank.org/en/news/press-release/2022/10/28/pakistan-flood-damages-and-economic-losses-over-usd-30-billion-and-reconstruction-needs-over-usd-16-billion-new-assessme"
        icon="🌊"
        visualSide="left"
        theme="amber"
        visualBadge="Monsoon Crisis"
        visualHighlight={{
          metric: "1 / 3",
          description: "of Pakistan inundated under water during the peak 2022 disaster",
        }}
      />

      {/* Chapter 2: Heatwaves (Full width, visual right) */}
      <DangerChapter
        id="heatwaves"
        chapterNumber="Chapter 01.2 — Extreme Temperatures"
        title="Heatwaves: Pushing the edge of human survival"
        hardStat={{
          value: "53.5°C",
          label: "peak record in Jacobabad",
        }}
        secondaryStat={{
          value: "60+",
          label: "continuous days above 40°C",
        }}
        paragraph="Rising global baselines bring unrelenting, prolonged heatwaves across Sindh and southern Punjab. Temperatures frequently cross wet-bulb survivability thresholds, straining public hospitals, collapsing power grids under peak load, and halting outdoor economic productivity."
        citationText="Ministry of Climate Change & Meteorological Reports"
        citationUrl="https://uraanpakistan.pk/climate-change/"
        icon="🔥"
        visualSide="right"
        theme="amber"
        visualBadge="Thermal Stress"
        visualHighlight={{
          metric: "50°C+",
          description: "regularly breached across Indus Basin agricultural belts",
        }}
      />

      {/* Compact Pair: Glacier Melt & Crop/Livestock Loss */}
      <div className="pt-12 sm:pt-16 border-t border-white/5">
        <div className="mb-6">
          <div className="font-mono text-xs tracking-[0.12em] uppercase text-[#a9d3ea] mb-1">
            01.3 — Compound Ecological Impacts
          </div>
          <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#f2f0e8]">
            Accelerating glacial retreat & agricultural shocks
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 [perspective:1000px]">
          <DangerCard
            id="glaciers"
            icon="🧊"
            title="Glacier melt"
            description="Pakistan holds more glacial ice than almost anywhere outside the polar regions — over 7,200 glaciers. Accelerated melting triggers destructive glacial lake outburst floods (GLOFs) and threatens the long-term Indus river system."
            tag="UN / glacier studies"
            theme="blue"
          />
          <DangerCard
            id="crops"
            icon="🌾"
            title="Crop and livestock loss"
            description="Flooded farmland, extreme heat sterility, and livestock mortality strike food security directly — eroding rural livelihoods and pushing millions deeper into economic precarity."
            tag="PDNA human impact report"
            theme="khaki"
          />
        </div>
      </div>
    </section>
  );
}
