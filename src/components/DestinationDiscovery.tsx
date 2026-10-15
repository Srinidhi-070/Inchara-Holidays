import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language, Destination } from '../types';
import { translations } from '../data/translations';
import { destinations } from '../data/destinations';
import { ArrowUpRight, Calendar, Clock, Sparkles } from 'lucide-react';
import { KolamCorner, GopuramIcon } from './SouthIndianMotifs';

interface DestinationDiscoveryProps {
  language: Language;
  onSelectDestination: (dest: Destination) => void;
  onOpenPlannerWithDest: (destName: string) => void;
}

export const DestinationDiscovery: React.FC<DestinationDiscoveryProps> = ({
  language,
  onSelectDestination,
  onOpenPlannerWithDest,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'karnataka' | 'panIndia' | 'international'>('all');
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  const filteredDestinations = destinations.filter((dest) => {
    if (activeCategory === 'all') return true;
    return dest.category === activeCategory;
  });

  const featuredDest = filteredDestinations.find((d) => d.isFeatured) || filteredDestinations[0];
  const secondaryDestinations = filteredDestinations.filter((d) => d.id !== featuredDest?.id);

  return (
    <section id="destinations" className="py-20 sm:py-28 bg-[#FBF8F1] bg-kannada-pattern bg-kolam-subtle overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Reveal Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E3D28] uppercase mb-2.5">
              <span className="w-5 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37]">✦</span>
              <span>{t.discovery.kicker}</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className="text-[#263F32] font-semibold">
                {language === 'kn' ? 'ಆಯ್ಕೆಯ ಪ್ರವಾಸಗಳು' : 'Curated Blueprints'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-editorial text-[#1E3B2B] tracking-tight leading-[1.16]">
              {t.discovery.title}
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-[#252923]/80 leading-relaxed font-normal max-w-xl">
              {t.discovery.subtitle}
            </p>
          </motion.div>

          {/* Interactive Filter Tabs */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:w-auto max-w-full overflow-x-auto no-scrollbar flex items-center gap-1.5 p-1.5 bg-[#F6F3EA] rounded-xl border border-[#263F32]/15 self-start md:self-end shadow-2xs"
          >
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              data-cursor="All"
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#162E22] text-[#F6F3EA] border border-[#D4AF37]/40 shadow-xs font-bold'
                  : 'text-[#252923]/75 hover:text-[#162E22] hover:bg-[#263F32]/5'
              }`}
            >
              {t.discovery.filterAll}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('karnataka')}
              data-cursor="Karnataka"
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeCategory === 'karnataka'
                  ? 'bg-[#162E22] text-[#F6F3EA] border border-[#D4AF37]/40 shadow-xs font-bold'
                  : 'text-[#252923]/75 hover:text-[#162E22] hover:bg-[#263F32]/5'
              }`}
            >
              {t.discovery.filterKarnataka}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('panIndia')}
              data-cursor="India"
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeCategory === 'panIndia'
                  ? 'bg-[#162E22] text-[#F6F3EA] border border-[#D4AF37]/40 shadow-xs font-bold'
                  : 'text-[#252923]/75 hover:text-[#162E22] hover:bg-[#263F32]/5'
              }`}
            >
              {t.discovery.filterIndia}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('international')}
              data-cursor="Global"
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeCategory === 'international'
                  ? 'bg-[#162E22] text-[#F6F3EA] border border-[#D4AF37]/40 shadow-xs font-bold'
                  : 'text-[#252923]/75 hover:text-[#162E22] hover:bg-[#263F32]/5'
              }`}
            >
              {t.discovery.filterInternational}
            </button>
          </motion.div>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="space-y-10">
          {featuredDest && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative group overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-linear-to-br from-[#12261C] via-[#1A382A] to-[#12261C] text-[#F6F3EA] shadow-2xl"
            >
              {/* Delicate top gold hairline */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                {/* Visual Area (7 cols) */}
                <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-full overflow-hidden bg-[#12261C]">
                  <img
                    src={featuredDest.image}
                    alt={featuredDest.imageAlt}
                    className="w-full h-full object-cover object-center img-vignette transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12261C] via-transparent to-transparent lg:hidden" />

                  {/* Editorial Cover Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162E22]/90 backdrop-blur-md border border-[#D4AF37]/50 text-[#F5D77F] text-xs font-semibold shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{language === 'kn' ? 'ವಿಶೇಷ ಮುಖಪುಟ ಪಯಣ' : 'Featured Cover Story'}</span>
                  </div>
                </div>

                {/* Editorial Content Area (5 cols) */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between relative">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#E5B842] mb-3 font-medium uppercase tracking-wider">
                      <span>{language === 'kn' ? featuredDest.regionKn : featuredDest.regionEn}</span>
                      <span aria-hidden="true" className="opacity-40">·</span>
                      <span className="text-[#F6F3EA]/90">{language === 'kn' ? featuredDest.tagKn : featuredDest.tagEn}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-editorial text-[#F6F3EA] tracking-tight mb-3.5 leading-snug">
                      {language === 'kn' ? featuredDest.nameKn : featuredDest.nameEn}
                    </h3>

                    <p className="text-sm sm:text-base text-[#F6F3EA]/85 leading-relaxed mb-6 font-normal">
                      {language === 'kn' ? featuredDest.narrativeKn : featuredDest.narrativeEn}
                    </p>

                    {/* Unboxed Journey Attributes */}
                    <div className="space-y-2.5 py-4 border-y border-white/10 text-xs text-[#F6F3EA]/90">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-[#F6F3EA]/70">{t.discovery.durationLabel}:</span>
                        <span className="font-semibold text-[#F6F3EA]">
                          {language === 'kn' ? featuredDest.durationKn : featuredDest.durationEn}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-[#F6F3EA]/70">{t.discovery.seasonLabel}:</span>
                        <span className="font-semibold text-[#F6F3EA]">
                          {language === 'kn' ? featuredDest.bestSeasonKn : featuredDest.bestSeasonEn}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 pt-1 text-[#F5D77F]">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-xs font-medium text-[#F6F3EA]/95">
                          {language === 'kn' ? 'ಸಾಂಸ್ಕೃತಿಕ ಶಿಷ್ಟಾಚಾರ ಸಲಹೆಗಳು ಲಭ್ಯ' : 'Cultural Etiquette & Guides Included'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectDestination(featuredDest)}
                      className="px-5 py-2.5 rounded-xl bg-[#F6F3EA] text-[#162E22] hover:bg-white text-xs font-semibold tracking-wide transition-all flex items-center gap-2 shadow-xs active:scale-95 cursor-pointer border border-[#D4AF37]/40"
                    >
                      <span>{t.discovery.viewDetails}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#9E3D28]" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenPlannerWithDest(language === 'kn' ? featuredDest.nameKn : featuredDest.nameEn)
                      }
                      className="px-4 py-2.5 rounded-xl border border-white/20 text-[#F6F3EA] hover:bg-white/10 text-xs font-medium transition-colors cursor-pointer"
                    >
                      {language === 'kn' ? 'ಈ ತಾಣವನ್ನು ರೂಪಿಸಿ' : 'Plan for this destination'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary Destination Tiles with Varied Layout and Regional Accents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {secondaryDestinations.map((dest, idx) => {
              const isKarnataka = dest.category === 'karnataka';
              const isPanIndia = dest.category === 'panIndia';
              const isInternational = dest.category === 'international';

              // Regional accent classes
              const topAccentClass = isKarnataka
                ? 'border-t-2 border-t-[#D4AF37]'
                : isPanIndia
                ? 'border-t-2 border-t-[#9E3D28]'
                : 'border-t-2 border-t-[#3A506B]';

              const tagColorClass = isKarnataka
                ? 'text-[#9E3D28]'
                : isPanIndia
                ? 'text-[#B45309]'
                : 'text-[#2C3E50]';

              // Asymmetrical rhythm: First card can have an extended presentation if there are enough cards
              const isLeadCard = idx === 0 && secondaryDestinations.length > 2;

              return (
                <motion.div
                  key={dest.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    delay: shouldReduceMotion ? 0 : (idx % 3) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  className={`group flex flex-col justify-between bg-white rounded-2xl border border-[#263F32]/12 overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-xl ${topAccentClass} ${
                    isLeadCard ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className={isLeadCard ? 'grid grid-cols-1 md:grid-cols-12 h-full' : ''}>
                    {/* Image container */}
                    <div
                      className={`relative overflow-hidden bg-[#263F32]/10 ${
                        isLeadCard ? 'md:col-span-7 aspect-16/10 md:aspect-auto md:min-h-full' : 'aspect-16/10'
                      }`}
                    >
                      <img
                        src={dest.image}
                        alt={dest.imageAlt}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 img-vignette"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90" />

                      {/* Inline kicker over image */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#F6F3EA]">
                        <span className="font-semibold drop-shadow-xs">
                          {language === 'kn' ? dest.regionKn : dest.regionEn}
                        </span>
                        <span className="text-white/90 drop-shadow-xs font-medium">
                          {language === 'kn' ? dest.durationKn : dest.durationEn}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className={`p-5 sm:p-6 flex flex-col justify-between ${isLeadCard ? 'md:col-span-5' : ''}`}>
                      <div>
                        {/* Clean unboxed subtitle */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[11px] font-bold uppercase tracking-wider ${tagColorClass}`}>
                            {language === 'kn' ? dest.tagKn : dest.tagEn}
                          </span>
                        </div>

                        <h4 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#162E22] mb-2.5 group-hover:text-[#9E3D28] transition-colors leading-snug">
                          {language === 'kn' ? dest.nameKn : dest.nameEn}
                        </h4>

                        <p className="text-xs sm:text-[13px] text-[#252923]/75 leading-relaxed line-clamp-3 mb-4 font-normal">
                          {language === 'kn' ? dest.shortDescKn : dest.shortDescEn}
                        </p>

                        {/* Highlights bullet preview */}
                        <div className="space-y-1.5 text-[11px] text-[#252923]/70 pt-3 border-t border-[#263F32]/10">
                          {(language === 'kn' ? dest.highlightsKn : dest.highlightsEn).slice(0, 2).map((item, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <span className="text-[#D4AF37] mt-0.5">✦</span>
                              <span className="line-clamp-1">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer Action */}
                      <div className="pt-4 mt-3 border-t border-[#263F32]/10 flex items-center justify-between">
                        <span className="text-[11px] text-[#252923]/65 font-medium">
                          {language === 'kn' ? dest.bestSeasonKn : dest.bestSeasonEn}
                        </span>
                        <button
                          type="button"
                          onClick={() => onSelectDestination(dest)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#162E22] group-hover:text-[#9E3D28] transition-colors cursor-pointer"
                        >
                          <span>{t.discovery.viewDetails}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#9E3D28]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
