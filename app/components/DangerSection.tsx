"use client";

import React from "react";

interface DangerCardProps {
  icon: string;
  title: string;
  description: string;
  tag: string;
  theme?: "amber" | "blue" | "khaki";
}

function DangerCard({
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

export default function DangerSection() {
  return (
    <section className="py-24 px-6 max-w-[1100px] mx-auto relative z-10" id="danger">
      <div className="text-center mb-16">
        <div className="font-mono text-xs tracking-[0.12em] uppercase text-[#ffb088]">
          01 — Why it matters here
        </div>
        <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl md:text-[44px] tracking-tight mt-3 text-[#f2f0e8]">
          One country, disproportionate cost
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 [perspective:1000px]">
        <DangerCard
          icon="🌊"
          title="Floods"
          description="The 2022 monsoon floods submerged a third of the country and displaced tens of millions, with losses reaching billions of dollars."
          tag="World Bank PDNA, 2022"
          theme="amber"
        />
        <DangerCard
          icon="🧊"
          title="Glacier melt"
          description="Pakistan holds more glacial ice than almost anywhere outside the poles — and it's retreating, threatening long-term water supply."
          tag="UN / glacier studies"
          theme="blue"
        />
        <DangerCard
          icon="🌾"
          title="Crop and livestock loss"
          description="Waterlogged farmland and killed livestock hit food security directly, pushing millions closer to poverty."
          tag="PDNA human impact report"
          theme="khaki"
        />
        <DangerCard
          icon="🔥"
          title="Heatwaves"
          description="Rising temperatures bring longer, more frequent heatwaves that strain health systems, farming and daily life."
          tag="Ministry of Climate Change"
          theme="amber"
        />
      </div>
    </section>
  );
}
