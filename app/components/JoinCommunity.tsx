"use client";

import React, { useState } from "react";

interface HourglassParticle {
  id: number;
  top: string;
  left: string;
  sizeClass: string;
  opacity: number;
  animationDelay: string;
  animationDuration: string;
  isAnimated: boolean;
  transform: string;
}

// Procedurally generate a deterministic starry field of hourglasses with natural variation and gaps
function generateHourglassField(count = 32, seed = 71823): HourglassParticle[] {
  let s = seed;
  const pseudoRandom = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };

  const sizes = [
    "text-[10px]",
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
  ];

  const particles: HourglassParticle[] = [];

  for (let i = 0; i < count; i++) {
    // Generate organic 2D spatial distribution across full section with natural clustering & gaps
    const rx = pseudoRandom();
    const ry = pseudoRandom();

    // Map coordinates to section margins [2.5% .. 96%]
    const leftVal = (2.5 + rx * 93.5).toFixed(1);
    const topVal = (3.5 + ry * 92.5).toFixed(1);

    const sizeIndex = Math.floor(pseudoRandom() * sizes.length);
    const opacityVal = Number((0.08 + pseudoRandom() * 0.18).toFixed(2));
    const delayVal = (pseudoRandom() * 6).toFixed(1);
    const durationVal = (5.5 + pseudoRandom() * 2.5).toFixed(1);
    const isAnimated = i % 2 === 0;
    const initialRot = Math.floor(pseudoRandom() * 32 - 16);

    particles.push({
      id: i,
      left: `${leftVal}%`,
      top: `${topVal}%`,
      sizeClass: sizes[sizeIndex],
      opacity: opacityVal,
      animationDelay: `${delayVal}s`,
      animationDuration: `${durationVal}s`,
      isAnimated,
      transform: `rotate(${initialRot}deg)`,
    });
  }

  return particles;
}

// Deterministically generated once on module load
const hourglassField = generateHourglassField(32, 71823);

export default function JoinCommunity() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Basic Validation
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!formData.city.trim()) {
      setErrorMessage("Please enter your city.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          city: formData.city.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setSuccessMessage(data.message || "Thank you for joining the movement!");
        setFormData({ name: "", email: "", city: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section
      className="my-16 mx-6 max-w-[1100px] sm:mx-auto rounded-[28px] py-16 px-6 sm:px-12 text-center relative overflow-hidden bg-gradient-to-br from-[#ff6a2b]/[0.16] to-[#4f9ac9]/[0.12] border border-white/10 z-10"
      id="join-community"
    >
      {/* Background glow accent */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,106,43,0.25),transparent_70%)] -top-[150px] -left-[100px] pointer-events-none animate-float-glow" />

      {/* Procedurally generated field of decorative background hourglasses */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        {hourglassField.map((item) => (
          <span
            key={item.id}
            className={`absolute ${item.sizeClass} ${
              item.isAnimated ? "hourglass-float" : ""
            }`}
            style={{
              top: item.top,
              left: item.left,
              opacity: item.opacity,
              animationDelay: item.isAnimated ? item.animationDelay : undefined,
              animationDuration: item.isAnimated ? item.animationDuration : undefined,
              transform: item.transform,
            }}
          >
            ⌛
          </span>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="font-['Space_Grotesk'] font-bold text-3xl sm:text-4xl lg:text-[40px] tracking-tight text-[#f2f0e8]">
          Pakistan is heating up —{" "}
          <span className="text-[#ff6a2b]">
            we don&apos;t have to keep paying for it alone.
          </span>
        </h2>
        <p className="text-[#a9b3ac] mt-3.5 mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
          Join a growing community of Pakistanis tracking, learning, and acting
          on climate data together.
        </p>

        {status === "success" ? (
          <div className="bg-[#4f9ac9]/15 border border-[#4f9ac9]/40 rounded-2xl p-6 text-center animate-fade-up-1">
            <div className="text-3xl mb-2">🌿</div>
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#f2f0e8] mb-1">
              Welcome to the Arz Community!
            </h3>
            <p className="text-sm text-[#a9d3ea]">{successMessage}</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-5 text-xs font-mono text-[#ffb088] underline hover:text-[#ff6a2b]"
            >
              Submit another response
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 text-left max-w-xl mx-auto"
            noValidate
          >
            {status === "error" && (
              <div
                role="alert"
                className="bg-[#ff6a2b]/20 border border-[#ff6a2b]/50 rounded-xl p-3 text-xs text-[#ffb088] font-mono"
              >
                ⚠️ {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-mono text-[#a9b3ac] mb-1.5"
                >
                  Full Name <span className="text-[#ff6a2b]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Fatima Ali"
                  disabled={status === "loading"}
                  required
                  className="w-full bg-[#0a1210]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f2f0e8] placeholder-[#6c766f] focus:outline-none focus:border-[#ff6a2b] focus:ring-1 focus:ring-[#ff6a2b] transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-mono text-[#a9b3ac] mb-1.5"
                >
                  City <span className="text-[#ff6a2b]">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Lahore, Karachi, Quetta"
                  disabled={status === "loading"}
                  required
                  className="w-full bg-[#0a1210]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f2f0e8] placeholder-[#6c766f] focus:outline-none focus:border-[#ff6a2b] focus:ring-1 focus:ring-[#ff6a2b] transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono text-[#a9b3ac] mb-1.5"
              >
                Email Address <span className="text-[#ff6a2b]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                disabled={status === "loading"}
                required
                className="w-full bg-[#0a1210]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f2f0e8] placeholder-[#6c766f] focus:outline-none focus:border-[#ff6a2b] focus:ring-1 focus:ring-[#ff6a2b] transition-all disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-3 font-sans font-medium text-sm bg-[#ff6a2b] text-[#1a0d05] py-3.5 px-8 rounded-full cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,106,43,0.4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6a2b] focus:ring-offset-[#0a1210] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-[#1a0d05]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Join the community →</span>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
