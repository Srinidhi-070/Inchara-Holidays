/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Concept, Locale } from '../types';
import { Sparkles, X, ChevronUp, Compass, MapPin, Globe, Check } from 'lucide-react';

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
  const [minimized, setMinimized] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const isKn = locale === 'kn';

  useEffect(() => {
    const handleScroll = () => {
      // Gracefully hide when scrolled past the hero section
      if (window.scrollY > 620) {
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
    shortEn: string;
    shortKn: string;
    detailEn: string;
    detailKn: string;
    image: string;
  }[] = [
    {
      id: 'A',
      num: '01',
      icon: Compass,
      nameEn: 'Karnataka Heritage',
      nameKn: 'ಕರ್ನಾಟಕ ಪರಂಪರೆ',
      shortEn: 'Karnataka',
      shortKn: 'ಕರ್ನಾಟಕ',
      detailEn: 'Hoysala temples, Coorg hills & royal Mysuru',
      detailKn: 'ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆ, ಮಲೆನಾಡು & ಮೈಸೂರು ವೈಭವ',
      image: '/images/hoysala_belur.jpg',
    },
    {
      id: 'B',
      num: '02',
      icon: MapPin,
      nameEn: 'Incredible India',
      nameKn: 'ಭಾರತೀಯ ಪಯಣಗಳು',
      shortEn: 'All-India',
      shortKn: 'ಭಾರತ',
      detailEn: 'Rajasthan palaces, Kerala backwaters & snow peaks',
      detailKn: 'ರಾಜಸ್ಥಾನ ಅರಮನೆಗಳು, ಹಿನ್ನೀರು & ಹಿಮಾಲಯ',
      image: '/images/rajasthan_heritage.jpg',
    },
    {
      id: 'C',
      num: '03',
      icon: Globe,
      nameEn: 'Global Explorer',
      nameKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ದಿಗಂತ',
      shortEn: 'International',
      shortKn: 'ವಿಶ್ವ',
      detailEn: 'Vietnam, Bali, Kyoto, Dubai & Europe',
      detailKn: 'ವಿಯೆಟ್ನಾಂ, ಬಾಲಿ, ಜಪಾನ್ & ಯೂರೋಪ್',
      image: '/images/vietnam_halong.jpg',
    },
  ];

  const activeConceptData = concepts.find((c) => c.id === concept) || concepts[0];

  return (
    <>
      {/* =========================================================================
          1. MOBILE EXPERIENCE (< 768px): Minimal Floating Trigger & Slide-Up Drawer
          Prevents covering the hero headline, opens full drawer only on demand.
         ========================================================================= */}
      <div className="md:hidden">
        {/* Compact Floating Mobile Pill (takes < 40px height, zero clutter) */}
        <aside
          className={`fixed z-40 left-1/2 -translate-x-1/2 bottom-4 transition-all duration-400 ${
            scrolledPast ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
          aria-label="Art direction selector trigger"
        >
          <button
            type="button"
            onClick={() => setMobileSheetOpen(true)}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#07130C]/95 hover:bg-[#0E2618] text-white border border-[#D4AF37]/50 shadow-[0_12px_32px_rgba(7,19,12,0.7)] backdrop-blur-xl text-xs font-medium cursor-pointer active:scale-95 transition-all ring-1 ring-[#F5D77F]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-[#F5D77F]" />
            <span className="text-[#F6F3EA] text-xs font-semibold">
              {isKn ? 'ಶೈಲಿ' : 'View'}:{' '}
              <strong className="text-[#F5D77F] font-bold">
                {isKn ? activeConceptData.shortKn : activeConceptData.shortEn}
              </strong>
            </span>
            <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider pl-1.5 border-l border-[#D4AF37]/30 flex items-center gap-0.5">
              <span>{isKn ? 'ಬದಲಿಸಿ' : 'Change'}</span>
              <ChevronUp className="w-3 h-3" />
            </span>
          </button>
        </aside>

        {/* Mobile Slide-Up Drawer Modal */}
        <AnimatePresence>
          {mobileSheetOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMobileSheetOpen(false)}
                className="fixed inset-0 bg-black/65 backdrop-blur-xs z-50 cursor-pointer"
                aria-hidden="true"
              />

              {/* Bottom Sheet Card */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                className="fixed bottom-0 inset-x-0 z-50 bg-[#07130C] border-t border-[#D4AF37]/45 rounded-t-3xl p-5 pb-8 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
              >
                {/* Drag pill handle */}
                <div className="w-10 h-1 bg-[#D4AF37]/40 rounded-full mx-auto mb-4" />

                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#D4AF37]/20 mb-3.5">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#F5D77F] uppercase flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>{isKn ? '೩ ಶೈಲಿಗಳು / ೧ ತಾಣ' : '03 CURATED VIEWS'}</span>
                    </span>
                    <h3 className="text-base font-bold font-serif-editorial text-[#F6F3EA] mt-0.5">
                      {isKn ? 'ಪ್ರವಾಸದ ಶೈಲಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ' : 'Select Hero Art Direction'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileSheetOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close sheet"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 3 Rich Visual Choice Cards */}
                <div className="space-y-2.5">
                  {concepts.map((item) => {
                    const isActive = concept === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onChange(item.id);
                          setMobileSheetOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-2xl flex items-center gap-3.5 transition-all cursor-pointer border ${
                          isActive
                            ? 'bg-[#122A1C] border-[#D4AF37] ring-1 ring-[#F5D77F]/30 shadow-lg'
                            : 'bg-black/30 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {/* Thumbnail Image */}
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#D4AF37]/30 relative">
                          <img
                            src={item.image}
                            alt={item.nameEn}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25" />
                          <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/70 text-[9px] font-bold text-[#F5D77F]">
                            {item.num}
                          </span>
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#F6F3EA]">
                              {isKn ? item.nameKn : item.nameEn}
                            </span>
                            {isActive && (
                              <span className="px-1.5 py-0.2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[9px] text-[#F5D77F] font-bold">
                                {isKn ? 'ಸಕ್ರಿಯ' : 'ACTIVE'}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">
                            {isKn ? item.detailKn : item.detailEn}
                          </p>
                        </div>

                        {/* Checkmark or Icon */}
                        <div className="shrink-0">
                          {isActive ? (
                            <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#07130C] flex items-center justify-center font-bold">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border border-white/20 text-white/40 flex items-center justify-center">
                              <Icon className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          2. DESKTOP EXPERIENCE (>= 768px): Sleek, Architectural Floating Pill Dock
          Compact, balanced, perfectly aligned with sliding active pill indicator.
         ========================================================================= */}
      <div className="hidden md:block">
        <aside
          className={`fixed z-40 left-1/2 -translate-x-1/2 bottom-5 transition-all duration-500 ${
            scrolledPast ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
          aria-label="Art direction selector dock"
        >
          {minimized ? (
            /* Minimized Sleek Pill Trigger */
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              type="button"
              onClick={() => setMinimized(false)}
              className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#07130C]/95 hover:bg-[#0E2618] text-white border border-[#D4AF37]/55 shadow-[0_16px_36px_rgba(7,19,12,0.7)] backdrop-blur-2xl text-xs font-semibold cursor-pointer transition-all hover:scale-105 active:scale-95 ring-1 ring-[#F5D77F]/20"
              title="Expand art direction selector"
            >
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-[#F5D77F]" />
              <span className="text-[#F6F3EA] tracking-wide">
                {isKn ? 'ಶೈಲಿ' : 'View'}:{' '}
                <strong className="text-[#F5D77F] font-bold">
                  {isKn ? activeConceptData.nameKn : activeConceptData.nameEn}
                </strong>
              </span>
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider pl-2 border-l border-[#D4AF37]/35 flex items-center gap-1">
                <span>{isKn ? 'ವಿಸ್ತರಿಸಿ' : 'Open'}</span>
                <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </motion.button>
          ) : (
            /* Full Sleek Pill Dock */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative flex items-center gap-2 p-1.5 rounded-full bg-[#07130C]/90 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_16px_40px_rgba(7,19,12,0.75)] ring-1 ring-[#F5D77F]/20"
            >
              {/* Left Aligned Label Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/30 text-[10px] font-bold tracking-wider text-[#F5D77F] uppercase shrink-0">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>{isKn ? 'ಶೈಲಿ' : 'VIEW'}</span>
              </div>

              {/* 3 Segmented Concept Buttons with Animated Sliding Gold Pill */}
              <div className="flex items-center gap-1">
                {concepts.map((item) => {
                  const isActive = concept === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onChange(item.id)}
                      className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer flex items-center gap-2 z-10 ${
                        isActive
                          ? 'text-[#07130C] font-bold'
                          : 'text-[#F6F3EA]/85 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {/* Animated Sliding Background Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="active-concept-pill"
                          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] shadow-[0_4px_16px_rgba(212,175,55,0.4)] -z-10"
                        />
                      )}

                      {/* Number Counter */}
                      <span
                        className={`text-[10px] font-mono tracking-tight font-bold ${
                          isActive ? 'text-[#07130C]/80' : 'text-[#D4AF37]'
                        }`}
                      >
                        {item.num}
                      </span>

                      {/* Name */}
                      <span className="whitespace-nowrap tracking-wide">
                        {isKn ? item.nameKn : item.nameEn}
                      </span>

                      {/* Tiny Icon */}
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-[#07130C]' : 'text-[#D4AF37]/70'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Minimize Button */}
              <button
                type="button"
                onClick={() => setMinimized(true)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10 shrink-0 ml-1"
                title="Minimize view selector"
                aria-label="Minimize"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </aside>
      </div>
    </>
  );
};
