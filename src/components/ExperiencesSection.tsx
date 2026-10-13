import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language, Experience } from '../types';
import { translations } from '../data/translations';
import { experiences } from '../data/experiences';
import { ArrowRight, Check, Compass, Sparkles, Heart } from 'lucide-react';

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

  return (
    <section id="experiences" className="py-20 sm:py-28 bg-[#1B2F24] text-[#F6F3EA] relative overflow-hidden">
      {/* Kolam geometric background motif */}
      <div className="absolute inset-0 bg-kolam-dark opacity-25 pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#F5D77F] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37]">✦</span>
            <span>{t.experiences.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-editorial text-[#F6F3EA] tracking-tight leading-[1.18]">
            {t.experiences.title}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#F6F3EA]/75 leading-relaxed font-normal">
            {t.experiences.subtitle}
          </p>
        </motion.div>

        {/* Interactive Master-Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Experience List Selector (5 cols) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-2.5"
          >
            {experiences.map((exp, idx) => {
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
                    <span
                      className={`text-base sm:text-lg font-bold font-serif-editorial ${
                        isSelected ? 'text-[#263F32]' : 'text-[#F6F3EA]'
                      }`}
                    >
                      {language === 'kn' ? exp.titleKn : exp.titleEn}
                    </span>
                    {/* Unboxed inline tag */}
                    <span
                      className={`text-[11px] font-medium ${
                        isSelected ? 'text-[#B96F50]' : 'text-[#AAB69A]'
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
            <div className="relative aspect-16/9 overflow-hidden">
              <img
                src={selectedExp.image}
                alt={language === 'kn' ? selectedExp.titleKn : selectedExp.titleEn}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3228] via-[#1e3228]/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
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
                      <Check className="w-3.5 h-3.5 text-[#B96F50] shrink-0 mt-0.5" />
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
