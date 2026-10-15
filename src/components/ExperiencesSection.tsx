import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language, Experience } from '../types';
import { translations } from '../data/translations';
import { experiences } from '../data/experiences';
import {
  ArrowRight,
  Check,
  Compass,
  Heart,
  Users,
  Trees,
  Car,
  Globe,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { LotusIcon, GopuramIcon, KolamBorderRibbon, SikkuKolamMandala } from './SouthIndianMotifs';

interface ExperiencesSectionProps {
  language: Language;
  onOpenPlannerWithExperience: (expTitle: string) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({
  language,
  onOpenPlannerWithExperience,
}) => {
  const [selectedExp, setSelectedExp] = useState<Experience>(experiences[0]);
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  // Mobile horizontal tabs container & ref array
  const pillContainerRef = useRef<HTMLDivElement>(null);
  const mobilePillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Mobile touch gesture coordinates
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Preload all 6 experience images once to avoid network cancellation & lag during fast browsing
  useEffect(() => {
    experiences.forEach((exp) => {
      const img = new Image();
      img.src = exp.image;
    });
  }, []);

  const currentIndex = experiences.findIndex((e) => e.id === selectedExp.id);

  // Helper for iconography matching each experience style
  const getExperienceIcon = (id: string, className: string = 'w-4 h-4') => {
    switch (id) {
      case 'family':
        return <Users className={className} />;
      case 'couples':
        return <Heart className={className} />;
      case 'heritage':
        return <GopuramIcon className={className} />;
      case 'nature':
        return <Trees className={className} />;
      case 'roadtrips':
        return <Car className={className} />;
      case 'international':
        return <Globe className={className} />;
      default:
        return <Compass className={className} />;
    }
  };

  const selectExperienceByIndex = (index: number) => {
    const target = experiences[index];
    if (!target) return;
    setSelectedExp(target);

    // Auto-scroll the mobile pill into view smoothly
    const pillEl = mobilePillRefs.current[index];
    if (pillEl && pillContainerRef.current) {
      const container = pillContainerRef.current;
      const pillLeft = pillEl.offsetLeft;
      const pillWidth = pillEl.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({
        left: pillLeft - containerWidth / 2 + pillWidth / 2,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + experiences.length) % experiences.length;
    selectExperienceByIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % experiences.length;
    selectExperienceByIndex(newIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    // Trigger horizontal swipe if deltaX is sufficiently larger than vertical movement deltaY
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <section id="experiences" className="py-20 sm:py-28 bg-[#1B2F24] text-[#F6F3EA] relative overflow-hidden">
      {/* Top Kolam border ribbon */}
      <KolamBorderRibbon className="absolute top-0 left-0 right-0 w-full h-3 z-20" color="#D4AF37" />

      {/* Kolam geometric background motif */}
      <div className="absolute inset-0 bg-kolam-dark opacity-25 pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Sikku Kolam Mandala watermark */}
      <div className="absolute -left-20 bottom-12 w-96 h-96 opacity-[0.04] pointer-events-none text-[#F5D77F]">
        <SikkuKolamMandala className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-8 sm:mb-16"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#F5D77F] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.experiences.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-editorial text-[#F6F3EA] tracking-tight leading-[1.18]">
            {t.experiences.title}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#F6F3EA]/75 leading-relaxed font-normal">
            {t.experiences.subtitle}
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* MOBILE VIEW (< lg): Horizontal Category Pills + Direct Card   */}
        {/* ============================================================== */}
        <div className="block lg:hidden space-y-4">
          {/* Scrollable Category Filter Pills */}
          <div
            ref={pillContainerRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {experiences.map((exp, idx) => {
              const isSelected = selectedExp.id === exp.id;
              return (
                <button
                  key={exp.id}
                  ref={(el) => {
                    mobilePillRefs.current[idx] = el;
                  }}
                  type="button"
                  onClick={() => selectExperienceByIndex(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap shrink-0 snap-center transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#162E22] font-bold shadow-md shadow-[#D4AF37]/25 scale-102'
                      : 'bg-white/10 text-[#F6F3EA]/80 hover:bg-white/15 border border-white/10'
                  }`}
                >
                  <span className={isSelected ? 'text-[#162E22]' : 'text-[#D4AF37]'}>
                    {getExperienceIcon(exp.id, 'w-3.5 h-3.5')}
                  </span>
                  <span>{language === 'kn' ? exp.titleKn : exp.titleEn}</span>
                </button>
              );
            })}
          </div>

          {/* Direct Mobile Experience Showcase Card with Touch Swipe */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="bg-[#1A2E22] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-2xl transition-all"
          >
            {/* Visual Header with Image & Overlay Controls */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#162E22]">
              <img
                key={selectedExp.id}
                src={selectedExp.image}
                alt={language === 'kn' ? selectedExp.titleKn : selectedExp.titleEn}
                className="w-full h-full object-cover object-center animate-fadeIn"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E22] via-[#1A2E22]/50 to-transparent pointer-events-none" />

              {/* Top Tag Badges & Index Counter */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#162E22]/90 backdrop-blur-md text-[#F5D77F] border border-[#D4AF37]/35 shadow-sm">
                  {language === 'kn' ? selectedExp.badgeKn : selectedExp.badgeEn}
                </span>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#162E22]/90 backdrop-blur-md text-[#F6F3EA] border border-white/15 shadow-sm">
                  <span>{currentIndex + 1}</span>
                  <span className="opacity-40">/</span>
                  <span>{experiences.length}</span>
                </div>
              </div>

              {/* Bottom Info on Image */}
              <div className="absolute bottom-3 left-4 right-16 pointer-events-none">
                <div className="text-[11px] text-[#AAB69A] font-medium mb-1">
                  {language === 'kn' ? 'ಸೂಕ್ತವಾದವರು:' : 'Ideal for:'}{' '}
                  <span className="text-[#F6F3EA]">
                    {language === 'kn' ? selectedExp.idealForKn : selectedExp.idealForEn}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#F6F3EA] leading-tight">
                  {language === 'kn' ? selectedExp.titleKn : selectedExp.titleEn}
                </h3>
              </div>

              {/* Quick Arrow Controls */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous experience style"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/70 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next experience style"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/70 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Card Content */}
            <div className="p-4 sm:p-6 space-y-4">
              <p className="text-xs sm:text-sm text-[#F5D77F]/95 font-medium leading-snug">
                {language === 'kn' ? selectedExp.subtitleKn : selectedExp.subtitleEn}
              </p>
              <p className="text-xs sm:text-sm text-[#F6F3EA]/80 leading-relaxed font-normal">
                {language === 'kn' ? selectedExp.descriptionKn : selectedExp.descriptionEn}
              </p>

              {/* Highlights List */}
              <div className="space-y-2 pt-1">
                <h4 className="text-[11px] uppercase tracking-wider text-[#AAB69A] font-semibold">
                  {language === 'kn' ? 'ಪ್ರಮುಖ ಅನುಭವ ಅಂಶಗಳು:' : 'Signature Inclusions:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(language === 'kn' ? selectedExp.highlightsKn : selectedExp.highlightsEn).map((hl, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2 text-xs text-[#E4D8C5]"
                    >
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="leading-tight">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Bar: Dots Pagination & Primary CTA */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                {/* Dots indicator */}
                <div className="flex items-center justify-center gap-1.5 py-1">
                  {experiences.map((exp, idx) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => selectExperienceByIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                        idx === currentIndex
                          ? 'w-6 bg-[#D4AF37]'
                          : 'w-2 bg-white/25 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenPlannerWithExperience(
                      language === 'kn' ? selectedExp.titleKn : selectedExp.titleEn
                    )
                  }
                  className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#162E22] hover:brightness-105 text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer"
                >
                  <span>
                    {language === 'kn'
                      ? 'ಈ ಶೈಲಿಯಲ್ಲಿ ಪ್ರವಾಸ ರೂಪಿಸಿ'
                      : 'Plan in this travel style'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#162E22]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEW (lg+): Magazine Master-Detail Split Grid (5/7)    */}
        {/* ============================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Experience List Selector (5 cols) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-2.5"
          >
            {experiences.map((exp) => {
              const isSelected = selectedExp.id === exp.id;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setSelectedExp(exp)}
                  data-cursor="Select"
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[#FBF8F1] text-[#1E3B2B] border-[#D4AF37] shadow-lg translate-x-1 sm:translate-x-2'
                      : 'bg-white/5 text-[#F6F3EA] border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className={isSelected ? 'text-[#9E3D28]' : 'text-[#D4AF37]'}>
                        {getExperienceIcon(exp.id, 'w-4 h-4')}
                      </span>
                      <span
                        className={`text-base sm:text-lg font-bold font-serif-editorial ${
                          isSelected ? 'text-[#263F32]' : 'text-[#F6F3EA]'
                        }`}
                      >
                        {language === 'kn' ? exp.titleKn : exp.titleEn}
                      </span>
                    </div>
                    {/* Unboxed inline tag */}
                    <span
                      className={`text-[11px] font-medium shrink-0 ${
                        isSelected ? 'text-[#9E3D28]' : 'text-[#AAB69A]'
                      }`}
                    >
                      {language === 'kn' ? exp.badgeKn : exp.badgeEn}
                    </span>
                  </div>

                  <p
                    className={`text-xs line-clamp-2 leading-relaxed ${
                      isSelected ? 'text-[#252923]/80' : 'text-[#F6F3EA]/65'
                    }`}
                  >
                    {language === 'kn' ? exp.subtitleKn : exp.subtitleEn}
                  </p>
                </button>
              );
            })}
          </motion.div>

          {/* Active Detail Showcase Area (7 cols) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#1A2E22] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Visual Header */}
            <div className="relative aspect-16/9 overflow-hidden bg-[#162E22]">
              <img
                key={selectedExp.id}
                src={selectedExp.image}
                alt={language === 'kn' ? selectedExp.titleKn : selectedExp.titleEn}
                className="w-full h-full object-cover object-center animate-fadeIn"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3228] via-[#1e3228]/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 right-6 pointer-events-none">
                <div className="text-xs text-[#AAB69A] font-medium mb-1">
                  {language === 'kn' ? 'ಸೂಕ್ತವಾದವರು:' : 'Ideal for:'}{' '}
                  <span className="text-[#F6F3EA]">
                    {language === 'kn' ? selectedExp.idealForKn : selectedExp.idealForEn}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-editorial text-[#F6F3EA]">
                  {language === 'kn' ? selectedExp.titleKn : selectedExp.titleEn}
                </h3>
              </div>
            </div>

            {/* Showcase Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-[#F6F3EA]/85 leading-relaxed font-normal">
                {language === 'kn' ? selectedExp.descriptionKn : selectedExp.descriptionEn}
              </p>

              {/* Highlights List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-[#AAB69A] font-semibold">
                  {language === 'kn' ? 'ಪ್ರಮುಖ ಅನುಭವ ಅಂಶಗಳು:' : 'Signature Inclusions:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(language === 'kn' ? selectedExp.highlightsKn : selectedExp.highlightsEn).map((hl, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-[#E4D8C5]"
                    >
                      <Check className="w-3.5 h-3.5 text-[#9E3D28] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trigger Planner Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                <span className="text-xs text-[#F6F3EA]/60">
                  {language === 'kn'
                    ? 'ನಿಮ್ಮ ಆಸಕ್ತಿಯ ತಾಣದೊಂದಿಗೆ ಈ ಅನುಭವವನ್ನು ಸಂಯೋಜಿಸಿ.'
                    : 'Pair this travel style with any chosen destination.'}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenPlannerWithExperience(
                      language === 'kn' ? selectedExp.titleKn : selectedExp.titleEn
                    )
                  }
                  className="px-5 py-2.5 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#162E22] hover:brightness-105 text-xs font-bold tracking-wide transition-all flex items-center gap-2 shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>
                    {language === 'kn'
                      ? 'ಈ ಶೈಲಿಯಲ್ಲಿ ಪ್ರವಾಸ ರೂಪಿಸಿ'
                      : 'Plan in this travel style'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#162E22]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
