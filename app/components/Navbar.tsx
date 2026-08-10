"use client";

import React from "react";

export default function Navbar() {
  const scrollToJoin = () => {
    const target = document.getElementById("join-community");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-5 backdrop-blur-md bg-gradient-to-b from-[#081010]/70 to-transparent border-b border-white/5">
      {/* Logo */}
      <a
        href="#"
        className="font-['Space_Grotesk'] font-bold text-xl tracking-tight flex items-center gap-2 text-[#f2f0e8] focus:outline-none focus:ring-2 focus:ring-[#ff6a2b] rounded-md px-1"
      >
        Arz<span className="text-[#ff6a2b]">.</span>
      </a>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-9 text-sm text-[#a9b3ac]">
        <a
          href="#danger"
          className="hover:text-[#f2f0e8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6a2b] rounded px-1"
        >
          The danger
        </a>
        <a
          href="#solutions"
          className="hover:text-[#f2f0e8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6a2b] rounded px-1"
        >
          Solutions
        </a>
        <a
          href="#sources"
          className="hover:text-[#f2f0e8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6a2b] rounded px-1"
        >
          Sources
        </a>
      </div>

      {/* Action Button */}
      <button
        onClick={scrollToJoin}
        className="font-sans font-medium text-sm bg-[#ff6a2b] text-[#1a0d05] px-5 py-2.5 rounded-full cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,106,43,0.35)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6a2b] focus:ring-offset-[#0a1210]"
      >
        Join community
      </button>
    </nav>
  );
}
