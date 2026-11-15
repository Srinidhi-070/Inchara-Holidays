import React, { useEffect, useRef, useState } from "react";
import type { Locale, SamplePackage } from "../types";
import { ArrowUpRight, CloseIcon } from "./Icons";
import { Printer } from "lucide-react";
import { ItineraryBrochureModal } from "./documents/ItineraryBrochureModal";

type Props = {
  pkg: SamplePackage | null;
  locale: Locale;
  onClose: () => void;
  onPlan: () => void;
};

export function ItineraryModal({ pkg, locale, onClose, onPlan }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showBrochure, setShowBrochure] = useState(false);
  const isKn = locale === "kn";

  useEffect(() => {
    if (!pkg) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [pkg, onClose]);

  if (!pkg) return null;

  return (
    <>
      <div
        className="dialog-backdrop"
        onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="itinerary-dialog max-h-[90vh] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          ref={modalRef}
          tabIndex={-1}
        >
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <img
              src={pkg.image}
              alt={pkg.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1810] via-transparent to-black/30" />
            <button
              type="button"
              className="dialog-close !bg-black/50 !text-white"
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F5D77F] bg-[#162E22]/80 px-2.5 py-1 rounded-md">
                {isKn ? pkg.badgeKn : pkg.badgeEn} · {isKn ? pkg.durationKn : pkg.durationEn}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold mt-2 text-white leading-tight">
                {isKn ? pkg.titleKn : pkg.titleEn}
              </h3>
            </div>
          </div>

          <div className="itinerary-dialog__body p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#9E3D28] mb-3">
                {isKn ? "ಪಯಣದ ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು" : "Itinerary Highlights"}
              </h4>
              <ul className="space-y-2">
                {(isKn ? pkg.highlightsKn : pkg.highlightsEn).map((hl, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#252923]">
                    <span className="text-[#D4AF37] font-bold">✦</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#162E22]/10 pt-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#9E3D28] mb-3">
                {isKn ? "ಸೇರ್ಪಡೆಗಳು & ಸೌಲಭ್ಯಗಳು" : "Inclusions & Experiences"}
              </h4>
              <ul className="space-y-2">
                {(isKn ? pkg.inclusionsKn : pkg.inclusionsEn).map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#4b5850]">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-[#4b5850]/80 italic bg-[#F6F3EA] p-3.5 rounded-xl border border-[#D4AF37]/20">
              {isKn ? pkg.samplePriceDisclaimerKn : pkg.samplePriceDisclaimerEn}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#162E22]/10">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="quiet-button !px-4"
                  onClick={onClose}
                >
                  {isKn ? "ಮುಚ್ಚಿ" : "Close"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowBrochure(true)}
                  className="px-3.5 py-2 rounded-xl border border-[#D4AF37]/50 text-xs font-bold text-[#162E22] bg-[#F6F3EA] hover:bg-[#F5D77F]/30 flex items-center gap-1.5 cursor-pointer transition-all shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{isKn ? "ಬ್ರೋಷರ್ / PDF" : "Brochure PDF"}</span>
                </button>
              </div>

              <button
                type="button"
                className="gold-button"
                onClick={() => {
                  onClose();
                  onPlan();
                }}
              >
                {isKn ? "ಈ ಪ್ರವಾಸ ರೂಪಿಸಿ" : "Shape This Journey"}
                <ArrowUpRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBrochure && (
        <ItineraryBrochureModal
          pkg={pkg}
          locale={locale}
          onClose={() => setShowBrochure(false)}
        />
      )}
    </>
  );
}
