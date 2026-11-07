import React, { useEffect, useState } from "react";
import type { Locale } from "../types";
import { ArrowUp } from "lucide-react";

interface FloatingActionsProps {
  locale: Locale;
  onOpenEnquiry?: () => void;
}

export function FloatingActions({ locale, onOpenEnquiry }: FloatingActionsProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const isKn = locale === "kn";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollPercentage(Math.min(100, Math.max(0, progress)));
      setShowScrollTop(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showScrollTop) return null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Back to top circular button with progress ring */}
      <button
        type="button"
        onClick={scrollToTop}
        className="relative w-12 h-12 rounded-full bg-[#FBF8F1] text-[#162E22] flex items-center justify-center shadow-lg hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border border-[#D4AF37]/50 cursor-pointer group"
        aria-label={isKn ? "ಮೇಲಕ್ಕೆ ಹೋಗಿ" : "Back to top"}
      >
        {/* SVG circular progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1">
          <circle
            cx="20"
            cy="20"
            r={radius}
            className="stroke-[#263F32]/15"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="20"
            cy="20"
            r={radius}
            className="stroke-[#D4AF37] transition-all duration-150"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <ArrowUp className="w-5 h-5 text-[#162E22] group-hover:text-[#9E3D28] transition-colors relative z-10" />
      </button>
    </div>
  );
}
