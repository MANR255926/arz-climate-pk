"use client";

import React from "react";

const sourcesData = [
  {
    name: "33 million displaced, $15.2B in losses (2022 floods)",
    label: "World Bank PDNA →",
    url: "https://www.worldbank.org/en/news/press-release/2022/10/28/pakistan-flood-damages-and-economic-losses-over-usd-30-billion-and-reconstruction-needs-over-usd-16-billion-new-assessme",
  },
  {
    name: "Damages + losses, poverty impact detail",
    label: "UNDP Climate Promise →",
    url: "https://climatepromise.undp.org/research-and-reports/pakistan-floods-2022-post-disaster-needs-assessment",
  },
  {
    name: "9% of GDP at risk yearly, worst-case scenario",
    label: "US Congress CRS report →",
    url: "https://www.congress.gov/crs-product/IF12211",
  },
  {
    name: "Pakistan ranked 176/180 on climate readiness",
    label: "Britannica summary →",
    url: "https://www.britannica.com/event/Pakistan-floods-of-2022",
  },
  {
    name: "Government flood response + water data",
    label: "Ministry of Planning, Pakistan →",
    url: "https://uraanpakistan.pk/climate-change/",
  },
];

export default function SourcesSection() {
  return (
    <section className="pt-10 pb-[120px] px-6 max-w-[900px] mx-auto relative z-10" id="sources">
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 backdrop-blur-md">
        <h3 className="font-['Space_Grotesk'] text-xl font-medium text-[#f2f0e8] mb-2">
          Where these numbers come from
        </h3>
        <p className="text-sm text-[#a9b3ac] mb-7 leading-relaxed">
          Every stat on this page traces back to a government, UN, or World Bank
          report — not an estimate we made up. This section stays on the live site
          as a permanent, clickable proof-of-source list.
        </p>

        <ul className="list-none flex flex-col gap-3.5">
          {sourcesData.map((item, idx) => (
            <li
              key={idx}
              className={`flex flex-col sm:flex-row justify-between sm:items-baseline gap-2 sm:gap-4 text-sm ${
                idx !== 0 ? "border-t border-white/10 pt-3.5" : ""
              }`}
            >
              <span className="text-[#f2f0e8]">{item.name}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffb088] font-mono text-xs whitespace-nowrap hover:underline focus:outline-none focus:ring-1 focus:ring-[#ff6a2b] rounded px-1 w-fit"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
