import React, { useEffect, useState } from "react";
import type { Locale } from "../types";
import { ArrowUp } from "lucide-react";

interface FloatingActionsProps {
  locale: Locale;
  onOpenEnquiry?: () => void;
}

export function FloatingActions({ locale }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const isKn = locale === "kn";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollPercentage(Math.min(100, Math.max(0, progress)));
      setShowScrollTop(scrollY > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showScrollTop) return null;

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <aside
      aria-label={isKn ? "ಮೇಲಕ್ಕೆ ಹೋಗುವ ಬಟನ್" : "Back to top controls"}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 pointer-events-auto"
    >
      {/* Back to top circular luxury button with SVG progress ring */}
      <button
        type="button"
        onClick={scrollToTop}
        className="relative w-12 h-12 rounded-full bg-[#0E2319]/95 hover:bg-[#163325] backdrop-blur-md flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.55)] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 border border-[#D4AF37]/50 hover:border-[#F5D77F] cursor-pointer group"
        aria-label={isKn ? "ಮೇಲಕ್ಕೆ ಸಾಗಿ" : "Scroll back to top"}
      >
        {/* SVG circular progress ring (precise 48x48 coordinate space, 0 clipping) */}
        <svg
          viewBox="0 0 48 48"
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        >
          <defs>
            <linearGradient id="scrollGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D77F" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="rgba(212, 175, 55, 0.2)"
            strokeWidth="2"
            fill="transparent"
          />
          {/* Animated Gold Progress Indicator */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="url(#scrollGoldGrad)"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* Center Sleek Arrow */}
        <ArrowUp className="w-5 h-5 text-[#F5D77F] group-hover:text-white stroke-[2.5] transition-all duration-300 group-hover:-translate-y-0.5 relative z-10" />

        {/* Hover Tooltip Capsule */}
        <span
          className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-[#07130C]/95 text-[#F5D77F] border border-[#D4AF37]/40 text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap"
        >
          {isKn ? "ಮೇಲಕ್ಕೆ ↑" : "Top ↑"}
        </span>
      </button>
    </aside>
  );
}
