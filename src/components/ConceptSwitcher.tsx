/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import type { Concept, Locale } from '../types';
import { Sparkles, X, Compass, Feather, Globe, ChevronUp } from 'lucide-react';

interface ConceptSwitcherProps {
  concept: Concept;
  onChange: (concept: Concept) => void;
  locale?: Locale;
}

export const ConceptSwitcher: React.FC<ConceptSwitcherProps> = ({
  concept,
  onChange,
  locale = 'en',
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const isKn = locale === 'kn';

  useEffect(() => {
    const handleScroll = () => {
      // Auto-hide when scrolled past hero (past 600px)
      if (window.scrollY > 600) {
        setScrolledPast(true);
      } else {
        setScrolledPast(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const concepts: {
    id: Concept;
    num: string;
    icon: React.ComponentType<{ className?: string }>;
    nameEn: string;
    nameKn: string;
    detailEn: string;
    detailKn: string;
  }[] = [
    {
      id: 'A',
      num: '01',
      icon: Compass,
      nameEn: 'Indian Luxury Edit',
      nameKn: 'ಭಾರತೀಯ ಲಕ್ಸುರಿ ಎಡಿಟ್',
      detailEn: 'Quiet, cinematic, refined',
      detailKn: 'ಶಾಂತ, ಸಿನಿಮೀಯ, ಭವ್ಯ ಅನುಭವ',
    },
    {
      id: 'B',
      num: '02',
      icon: Feather,
      nameEn: 'Living Travel Journal',
      nameKn: 'ಜೀವಂತ ಪ್ರವಾಸ ದಿನಚರಿ',
      detailEn: 'Layered, tactile, storied',
      detailKn: 'ಕಥೆಗಳ ಮಡಿಲು, ಪರಂಪರೆ ನಾದ',
    },
    {
      id: 'C',
      num: '03',
      icon: Globe,
      nameEn: 'Global Explorer',
      nameKn: 'ಗ್ಲೋಬಲ್ ಎಕ್ಸ್‌ಪ್ಲೋರರ್',
      detailEn: 'Bold, modern, expansive',
      detailKn: 'ವಿಸ್ತಾರ, ಆಧುನಿಕ, ಹೊಸ ದಿಗಂತ',
    },
  ];

  const activeConceptData = concepts.find((c) => c.id === concept) || concepts[0];

  // Minimized Floating Reopen Pill Button
  if (dismissed) {
    return (
      <aside
        className={`fixed z-40 left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 transition-all duration-500 ${
          scrolledPast ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
        aria-label="Reopen art directions dock"
      >
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="group flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#0A1810]/92 hover:bg-[#12261C] text-white border border-[#D4AF37]/50 hover:border-[#F5D77F] shadow-[0_12px_32px_rgba(10,24,16,0.45)] backdrop-blur-xl text-xs font-medium transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ring-1 ring-[#F5D77F]/20"
          title="Reopen Art Directions Switcher"
        >
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 text-[#F5D77F] group-hover:rotate-12 transition-transform" />
          <span className="font-serif-editorial tracking-wide text-[#F6F3EA]">
            {isKn ? 'ಕಲೆ & ಶೈಲಿ' : 'Art Direction'}:{' '}
            <strong className="text-[#F5D77F] font-semibold">
              {isKn ? activeConceptData.nameKn : activeConceptData.nameEn}
            </strong>
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] text-[#F5D77F]/90 uppercase font-bold tracking-wider pl-1 border-l border-[#D4AF37]/30">
            <span>{isKn ? 'ತೆರೆಯಿರಿ' : 'Open'}</span>
            <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </button>
      </aside>
    );
  }

  // Full Floating Art Direction Dock matching current Heritage-Modern theme
  return (
    <aside
      className={`fixed z-40 inset-x-3 sm:inset-x-6 md:left-1/2 md:-translate-x-1/2 md:max-w-5xl bottom-3 sm:bottom-6 transition-all duration-500 ${
        scrolledPast ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
      aria-label="Explore three homepage art directions"
    >
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#0A1810]/92 backdrop-blur-2xl border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(10,24,16,0.55)] ring-1 ring-[#F5D77F]/15 p-2 sm:p-2.5 overflow-hidden">
        {/* Subtle decorative gold sheen */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F5D77F]/60 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 sm:gap-3">
          
          {/* Left Eyebrow & Intro Column */}
          <div className="flex items-center justify-between lg:justify-start gap-3 px-3 py-1.5 sm:py-2 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/25 shrink-0">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold tracking-widest text-[#F5D77F] uppercase">
                <span className="w-3 h-px bg-[#D4AF37]" />
                <span>03 DIRECTIONS / 01 SPIRIT</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold font-serif-editorial text-[#F6F3EA] leading-tight mt-0.5">
                {isKn ? 'ಶೈಲಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ' : 'Choose an art direction'}
              </h4>
            </div>

            {/* Mobile-only close button */}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="lg:hidden w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Minimize art direction dock"
              aria-label="Minimize"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Concept Cards / Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 flex-1">
            {concepts.map((item) => {
              const isActive = concept === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange(item.id)}
                  className={`group relative text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-b from-[#1E3A2B] to-[#12261C] border border-[#D4AF37]/75 shadow-md shadow-black/30'
                      : 'bg-white/4 hover:bg-white/8 border border-transparent hover:border-[#D4AF37]/25'
                  }`}
                >
                  {/* Active glowing accent indicator strip on top */}
                  {isActive && (
                    <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F5D77F] to-transparent" />
                  )}

                  <div className="flex items-start gap-2.5">
                    <span
                      className={`font-serif-editorial text-sm sm:text-base font-bold shrink-0 transition-colors ${
                        isActive ? 'text-[#F5D77F]' : 'text-[#D4AF37]/70 group-hover:text-[#F5D77F]'
                      }`}
                    >
                      {item.num}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                            isActive ? 'text-[#F5D77F]' : 'text-[#F6F3EA] group-hover:text-white'
                          }`}
                        >
                          {isKn ? item.nameKn : item.nameEn}
                        </span>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-white/60 line-clamp-1 font-normal mt-0.5">
                        {isKn ? item.detailKn : item.detailEn}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Status Indicator & Desktop Close Button */}
          <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-[#D4AF37]/25 shrink-0">
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F5D77F] text-[9px] font-bold uppercase tracking-wider">
                {concept === 'A' ? 'SELECTED DIRECTION' : 'PREVIEWING'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              title="Minimize art direction dock"
              aria-label="Minimize"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};
