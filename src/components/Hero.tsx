import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, Compass, ChevronDown } from 'lucide-react';
import { AmbariElephant, LotusIcon, ToranaGarland } from './SouthIndianMotifs';

interface HeroProps {
  language: Language;
  onOpenPlanner: () => void;
  onExploreDestinations: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenPlanner,
  onExploreDestinations,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 800], [1.04, 1.14]);
  const bgOpacity = useTransform(scrollY, [0, 600], [1, 0.7]);
  const t = translations[language];

  return (
    <section className="relative min-h-[100dvh] flex items-end pb-12 sm:pb-20 lg:pb-24 pt-28 sm:pt-36 overflow-hidden bg-[#263F32]">
      {/* Background Image with Fallback, Subtle Parallax & Measured Dark Scrim */}
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : bgScale,
          opacity: shouldReduceMotion ? 1 : bgOpacity,
        }}
        className="absolute inset-0 z-0 origin-center"
      >
        <img
          src="/images/hero_western_ghats_1791795450720.jpg"
          alt="Misty Western Ghats mountain landscape at dawn in Karnataka"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for AA contrast (WCAG 4.5:1) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#162E22] via-[#263F32]/70 to-black/45" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#263F32]/30 to-[#162E22]/90" />
        {/* Delicate South Indian Kolam motif texture overlay */}
        <div className="absolute inset-0 bg-kolam-dark opacity-35 pointer-events-none mix-blend-overlay" />

        {/* Auspicious Mysore Ambari Elephant Watermark Silhouette */}
        <div className="hidden lg:block absolute right-8 bottom-12 w-96 h-80 text-[#D4AF37] opacity-15 pointer-events-none select-none">
          <AmbariElephant className="w-full h-full" color="#D4AF37" />
        </div>
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl lg:max-w-4xl">
          {/* Natural human editorial kicker with traditional auspicious emblem */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-wide text-[#E5B842] mb-3 sm:mb-4"
          >
            <span className="w-6 h-px bg-[#D4AF37]" />
            <LotusIcon className="w-4 h-4 text-[#F5D77F]" />
            <span className="flex items-center gap-1.5">
              <span>{t.hero.kicker}</span>
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="text-[#F5D77F]">{language === 'kn' ? 'ಆಧುನಿಕ ಪಯಣಗಳು' : 'Timeless Roots'}</span>
          </motion.div>

          {/* Expressive Bilingual Display Headline */}
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-serif-editorial text-[#F6F3EA] tracking-tight leading-[1.16] sm:leading-[1.12] mb-4 sm:mb-6 drop-shadow-sm text-balance"
          >
            {t.hero.headline}
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#F6F3EA]/90 leading-relaxed font-normal mb-6 sm:mb-8 max-w-2xl"
          >
            {t.hero.subhead}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenPlanner}
              data-cursor="Plan"
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 rounded-md bg-[#F6F3EA] text-[#263F32] hover:bg-white text-sm sm:text-base font-semibold tracking-wide transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer whitespace-nowrap"
            >
              <span>{t.hero.ctaPlan}</span>
              <ArrowRight className="w-4 h-4 text-[#B96F50]" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreDestinations}
              data-cursor="Explore"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-md bg-black/30 hover:bg-black/50 text-[#F6F3EA] border border-[#F6F3EA]/30 backdrop-blur-xs text-sm sm:text-base font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap"
            >
              <Compass className="w-4 h-4 text-[#AAB69A]" />
              <span>{t.hero.ctaExplore}</span>
            </motion.button>
          </motion.div>

          {/* Trust Marker (Unboxed text with typographic separators) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex items-center gap-3 text-xs sm:text-sm text-[#AAB69A] border-t border-[#F6F3EA]/15 pt-5"
          >
            <span>{t.hero.trustNotice}</span>
          </motion.div>
        </div>
      </div>

      {/* Floating Animated Scroll Down Cue */}
      {!shouldReduceMotion && (
        <motion.button
          type="button"
          onClick={onExploreDestinations}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 0.85, y: [0, 8, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
            opacity: { delay: 1, duration: 0.5 },
          }}
          className="hidden md:flex absolute bottom-6 right-8 z-10 items-center gap-2 text-xs text-[#E4D8C5] hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to explore destinations"
        >
          <span className="font-serif-editorial tracking-wider uppercase text-[11px]">
            {language === 'kn' ? 'ಕೆಳಗೆ ನೋಡಿ' : 'Scroll to discover'}
          </span>
          <ChevronDown className="w-4 h-4 text-[#B96F50]" />
        </motion.button>
      )}
    </section>
  );
};
