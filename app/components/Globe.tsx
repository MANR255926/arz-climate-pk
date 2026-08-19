"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Globe() {
  const globeRef = useRef<SVGSVGElement | null>(null);
  const [isDangerInView, setIsDangerInView] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (globeRef.current) {
            const offset = window.scrollY * 0.28;
            globeRef.current.style.transform = `translate3d(-50%, ${offset}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run once on mount to set initial offset if page is already scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver to tie globe crack intensity to Danger section view
    const dangerEl = document.getElementById("danger");
    let observer: IntersectionObserver | null = null;

    if (dangerEl) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            setIsDangerInView((prev) =>
              prev !== entry.isIntersecting ? entry.isIntersecting : prev
            );
          }
        },
        {
          root: null,
          rootMargin: "0px 0px -15% 0px",
          threshold: [0, 0.15, 0.3],
        }
      );
      observer.observe(dangerEl);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <svg
      ref={globeRef}
      className={`bg-globe fixed -top-[4vh] left-1/2 w-[min(85vw,860px)] h-[min(85vw,860px)] z-0 opacity-85 pointer-events-none will-change-transform transition-[filter] duration-700 ${
        isDangerInView ? "globe-danger-active" : ""
      }`}
      style={{ transform: "translate3d(-50%, 0px, 0)" }}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sphereBase" cx="36%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#454d43" />
          <stop offset="45%" stopColor="#262e26" />
          <stop offset="80%" stopColor="#12160f" />
          <stop offset="100%" stopColor="#080a07" />
        </radialGradient>
        <radialGradient id="sphereShade" cx="62%" cy="70%" r="70%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="62%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.65" />
        </radialGradient>
        <radialGradient id="sphereGloss" cx="32%" cy="24%" r="26%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="atmosphere" cx="50%" cy="50%" r="50%">
          <stop offset="82%" stopColor="#5db3d8" stopOpacity="0" />
          <stop offset="94%" stopColor="#5db3d8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#5db3d8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cloudGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.11" />
          <stop offset="65%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <clipPath id="globeClip">
          <circle cx="200" cy="200" r="178" />
        </clipPath>
      </defs>

      <circle cx="200" cy="200" r="190" fill="url(#atmosphere)" />
      <circle cx="200" cy="200" r="178" fill="url(#sphereBase)" />

      <g clipPath="url(#globeClip)">
        <g className="globe-spin">
          <path
            d="M40 150 Q65 105 120 100 Q165 96 185 120 Q205 142 195 175 Q210 195 200 220 Q192 245 160 250 Q125 255 105 230 Q75 235 55 205 Q35 180 40 150 Z"
            fill="#4a6a3a"
          />
          <path
            d="M120 100 Q140 85 165 90 Q175 78 195 82 Q205 95 195 108 Q210 112 205 128 Q188 132 175 120 Q160 128 148 115 Q130 118 120 100 Z"
            fill="#3d5a33"
          />
          <path
            d="M105 230 Q130 245 135 275 Q138 300 118 315 Q98 322 85 305 Q72 285 80 262 Q88 240 105 230 Z"
            fill="#5c7a46"
          />
          <path
            d="M225 110 Q265 95 300 112 Q325 128 328 158 Q330 185 305 198 Q278 208 255 190 Q235 175 232 148 Q228 128 225 110 Z"
            fill="#425c37"
          />
          <path
            d="M245 205 Q280 200 300 225 Q312 248 295 268 Q275 282 252 270 Q235 256 238 232 Q240 216 245 205 Z"
            fill="#3a5230"
          />
          <path
            d="M300 250 Q325 255 328 278 Q325 296 305 298 Q288 294 288 274 Q290 258 300 250 Z"
            fill="#4a6a3a"
          />
          <path
            d="M55 205 Q45 225 55 242 Q68 254 82 244 Q90 228 80 212 Q68 202 55 205 Z"
            fill="#c9a876"
            opacity="0.65"
          />
          <path
            d="M170 55 Q198 48 212 65 Q218 82 198 90 Q178 92 168 76 Q164 63 170 55 Z"
            fill="#c9a876"
            opacity="0.55"
          />
          <ellipse cx="340" cy="130" rx="6" ry="4" fill="#4a6a3a" opacity="0.7" />
          <ellipse cx="100" cy="330" rx="8" ry="5" fill="#5c7a46" opacity="0.6" />
          <ellipse cx="330" cy="310" rx="5" ry="3.5" fill="#3d5a33" opacity="0.6" />

          <path
            d="M120 100 Q150 105 165 90"
            fill="none"
            stroke="#2c3d26"
            strokeWidth="1.4"
            opacity="0.5"
          />
          <path
            d="M245 205 Q265 220 260 245"
            fill="none"
            stroke="#2c3d26"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <path
            d="M105 230 Q118 250 112 272"
            fill="none"
            stroke="#38502f"
            strokeWidth="1.1"
            opacity="0.45"
          />

          <path
            className="crack crack-pulse"
            d="M85 145 Q110 175 100 210 Q92 240 118 268 Q138 290 132 318"
            fill="none"
            stroke="#ff6a2b"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            className="crack crack-pulse"
            d="M100 210 Q140 216 165 195 Q195 172 232 182"
            fill="none"
            stroke="#ff6a2b"
            strokeWidth="2.1"
            strokeLinecap="round"
            style={{ animationDelay: "0.5s" }}
          />
          <path
            className="crack crack-pulse"
            d="M232 182 Q258 168 254 132 Q250 105 270 82"
            fill="none"
            stroke="#ff6a2b"
            strokeWidth="1.9"
            strokeLinecap="round"
            style={{ animationDelay: "1s" }}
          />
          <path
            className="crack crack-pulse"
            d="M118 268 Q152 278 178 262 Q202 247 232 260"
            fill="none"
            stroke="#ff6a2b"
            strokeWidth="1.7"
            strokeLinecap="round"
            style={{ animationDelay: "1.5s" }}
          />
          <path
            className="crack crack-pulse"
            d="M232 260 Q258 270 264 298"
            fill="none"
            stroke="#ff6a2b"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ animationDelay: "1.9s" }}
          />
          <path
            className="crack crack-pulse"
            d="M270 82 Q288 68 315 72"
            fill="none"
            stroke="#ff6a2b"
            strokeWidth="1.3"
            strokeLinecap="round"
            style={{ animationDelay: "2.3s" }}
          />

          <path
            d="M85 145 Q110 175 100 210 Q92 240 118 268"
            fill="none"
            stroke="#ff9a5c"
            strokeWidth="1.2"
            opacity="0.35"
          />
        </g>

        <g className="clouds-spin">
          <ellipse
            cx="140"
            cy="120"
            rx="46"
            ry="14"
            fill="url(#cloudGlow)"
          />
          <ellipse
            cx="260"
            cy="160"
            rx="60"
            ry="16"
            fill="url(#cloudGlow)"
          />
          <ellipse
            cx="110"
            cy="260"
            rx="50"
            ry="13"
            fill="url(#cloudGlow)"
          />
          <ellipse
            cx="290"
            cy="280"
            rx="40"
            ry="12"
            fill="url(#cloudGlow)"
          />
          <ellipse
            cx="200"
            cy="70"
            rx="55"
            ry="11"
            fill="url(#cloudGlow)"
          />
        </g>
      </g>

      <circle cx="200" cy="200" r="178" fill="url(#sphereShade)" />
      <circle cx="200" cy="200" r="178" fill="url(#sphereGloss)" />
      <circle
        cx="200"
        cy="200"
        r="178"
        fill="none"
        stroke="#ff6a2b"
        strokeOpacity="0.1"
        strokeWidth="1"
      />
      <circle
        cx="200"
        cy="200"
        r="190"
        fill="none"
        stroke="#5db3d8"
        strokeOpacity="0.18"
        strokeWidth="2"
      />

      <circle
        className="ember"
        cx="365"
        cy="140"
        r="2"
        fill="#ffb088"
        style={{ animationDelay: ".3s" }}
      />
      <circle
        className="ember"
        cx="380"
        cy="220"
        r="1.6"
        fill="#ffb088"
        style={{ animationDelay: "1.4s" }}
      />
      <circle
        className="ember"
        cx="350"
        cy="300"
        r="1.8"
        fill="#ff6a2b"
        style={{ animationDelay: "2.2s" }}
      />
      <circle
        className="ember"
        cx="30"
        cy="260"
        r="1.6"
        fill="#ffb088"
        style={{ animationDelay: ".9s" }}
      />
    </svg>
  );
}
