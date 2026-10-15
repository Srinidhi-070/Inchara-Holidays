import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, Compass, ChevronDown } from 'lucide-react';
import { AmbariElephant, LotusIcon } from './SouthIndianMotifs';

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
  const bgScale = useTransform(scrollY, [0, 800], [1.02, 1.1]);
  const bgOpacity = useTransform(scrollY, [0, 600], [1, 0.7]);
  const contentY = useTransform(scrollY, [0, 400], [0, 30]);
  const t = translations[language];

  return (
    <section className="relative min-h-[100dvh] flex items-end pb-12 sm:pb-20 lg:pb-24 pt-28 sm:pt-36 overflow-hidden bg-[#162E22]">
      {/* Background Image with Parallax & Cinematic Layered Scrim */}
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
          className="w-full h-full object-cover object-[center_35%] img-warm-tone"
          referrerPolicy="no-referrer"
          loading="eager"
          fetchPriority="high"
        />
        {/* Multi-layered cinematic scrim for depth and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#162E22] via-[#162E22]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#162E22]/70 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#162E22]/60" />
        {/* Subtle texture overlay — reduced kolam intensity */}
        <div className="absolute inset-0 bg-kolam-dark opacity-15 pointer-events-none mix-blend-overlay" />
      </motion.div>

      {/* Auspicious Mysore Ambari Elephant Watermark — repositioned to complement, not compete */}
      <div className="hidden lg:block absolute right-12 bottom-16 w-72 h-60 text-[#D4AF37] opacity-[0.08] pointer-events-none select-none z-[1]">
        <AmbariElephant className="w-full h-full" color="#D4AF37" />
      </div>

      {/* Editorial Gold Thread Accent — vertical line on left */}
      <div className="hidden lg:block absolute left-8 top-1/3 bottom-1/3 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent z-[1]" />

      {/* Hero Content Container */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-3xl lg:max-w-[52rem]">
          {/* Editorial Kicker with traditional auspicious emblem */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#E5B842] uppercase mb-4 sm:mb-5"
          >
            <span className="w-8 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
            <LotusIcon className="w-4 h-4 text-[#F5D77F] animate-deepam" />
            <span>{t.hero.kicker}</span>
            <span aria-hidden="true" className="opacity-30">·</span>
            <span className="text-[#F5D77F]/80">{language === 'kn' ? 'ಆಧುನಿಕ ಪಯಣಗಳು' : 'Timeless Roots'}</span>
          </motion.div>

          {/* Expressive Bilingual Display Headline — using fluid typography */}
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-xl font-bold font-serif-editorial text-[#F6F3EA] mb-5 sm:mb-7 drop-shadow-sm"
          >
            {t.hero.headline}
          </motion.h1>

          {/* Supporting Copy — improved max-width for better line length */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base lg:text-lg text-[#F6F3EA]/85 leading-relaxed font-normal mb-7 sm:mb-9 max-w-xl lg:max-w-2xl"
          >
            {t.hero.subhead}
          </motion.p>

          {/* Action CTAs — refined spacing and visual weight */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-12"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenPlanner}
              data-cursor="Plan"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-lg bg-[#F6F3EA] text-[#263F32] hover:bg-white text-sm sm:text-base font-semibold tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
            >
              <span>{t.hero.ctaPlan}</span>
              <ArrowRight className="w-4 h-4 text-[#9E3D28]" />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreDestinations}
              data-cursor="Explore"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-[#F6F3EA] border border-[#F6F3EA]/25 backdrop-blur-sm text-sm sm:text-base font-medium tracking-wide transition-all cursor-pointer whitespace-nowrap"
            >
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.hero.ctaExplore}</span>
            </motion.button>
          </motion.div>

          {/* Trust Marker — more refined editorial treatment */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-3 text-xs text-[#AAB69A] border-t border-[#F6F3EA]/10 pt-5"
          >
            <LotusIcon className="w-3.5 h-3.5 text-[#D4AF37]/60 shrink-0" />
            <span className="leading-relaxed">{t.hero.trustNotice}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Animated Scroll Down Cue — repositioned to bottom-center */}
      {!shouldReduceMotion && (
        <motion.button
          type="button"
          onClick={onExploreDestinations}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 0.75, y: [0, 6, 0] }}
          transition={{
            y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
            opacity: { delay: 1.2, duration: 0.5 },
          }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 text-[#E4D8C5]/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to explore destinations"
        >
          <span className="font-serif-editorial tracking-[0.15em] uppercase text-[10px]">
            {language === 'kn' ? 'ಕೆಳಗೆ ನೋಡಿ' : 'Discover'}
          </span>
          <ChevronDown className="w-4 h-4 text-[#D4AF37]/70" />
        </motion.button>
      )}

      {/* Bottom edge gradient for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FBF8F1] to-transparent z-[2] pointer-events-none" />
    </section>
  );
};
