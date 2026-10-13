import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Compass, CalendarDays, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HowItWorksProps {
  language: Language;
  onOpenPlanner: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ language, onOpenPlanner }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  const steps = [
    {
      num: t.howItWorks.step1Num,
      title: t.howItWorks.step1Title,
      english: t.howItWorks.step1Eng,
      desc: t.howItWorks.step1Desc,
      icon: Compass,
      tag: language === 'kn' ? 'ಆರಂಭಿಕ ಹಂಚಿಕೆ' : 'Inspiration & Brief',
    },
    {
      num: t.howItWorks.step2Num,
      title: t.howItWorks.step2Title,
      english: t.howItWorks.step2Eng,
      desc: t.howItWorks.step2Desc,
      icon: CalendarDays,
      tag: language === 'kn' ? 'ಆಪ್ತ ಸಮಾಲೋಚನೆ' : 'Custom Itinerary',
    },
    {
      num: t.howItWorks.step3Num,
      title: t.howItWorks.step3Title,
      english: t.howItWorks.step3Eng,
      desc: t.howItWorks.step3Desc,
      icon: ShieldCheck,
      tag: language === 'kn' ? 'ನಿರಾತಂಕ ಅನುಭವ' : 'On-Trip Care',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#F6F3EA] border-y border-[#263F32]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#B96F50] uppercase mb-2.5">
            <span className="w-4 h-px bg-[#B96F50]" />
            <span>{t.howItWorks.kicker}</span>
            <span className="w-4 h-px bg-[#B96F50]" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-editorial text-[#263F32] tracking-tight leading-[1.18]">
            {t.howItWorks.title}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#252923]/75 leading-relaxed font-normal">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* 3 Simple Stages Horizontal Storytelling Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle connecting hairline for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-[#263F32]/10 via-[#263F32]/30 to-[#263F32]/10 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: shouldReduceMotion ? 0 : idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className="relative z-10 p-6 sm:p-8 rounded-xl bg-white/85 border border-[#263F32]/10 backdrop-blur-xs flex flex-col justify-between hover:border-[#263F32]/25 transition-all duration-300 hover:shadow-lg group"
              >
                <div>
                  {/* Top indicator: Editorial number + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-serif-editorial font-bold text-[#B96F50]">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#263F32]/5 text-[#263F32] group-hover:bg-[#263F32] group-hover:text-[#F6F3EA] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Dual Language Label */}
                  <div className="mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#263F32]">
                      {step.title}
                    </h3>
                    <div className="text-xs text-[#252923]/50 font-medium">
                      {step.english}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#252923]/80 leading-relaxed mb-6 font-normal">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom unboxed text tag */}
                <div className="pt-4 border-t border-[#263F32]/10 flex items-center justify-between text-xs text-[#263F32]/70 font-medium">
                  <span>{step.tag}</span>
                  <span className="text-[#B96F50] text-[10px]">
                    {idx < 2 ? '→' : '✓'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance Callout */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 p-6 rounded-xl bg-[#E4D8C5]/50 border border-[#263F32]/10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-6 h-6 text-[#263F32] shrink-0" />
            <div className="text-xs sm:text-sm text-[#252923]/85">
              <span className="font-semibold text-[#263F32]">
                {language === 'kn' ? 'ನೇರ ಮತ್ತು ಆತ್ಮೀಯ ಸಂಬಂಧ:' : 'Direct, personal bond:'}{' '}
              </span>
              <span>
                {language === 'kn'
                  ? 'ಭೌತಿಕ ಕಚೇರಿಯ ಆಡಂಬರವಿಲ್ಲದೆ ಆನ್‌ಲೈನ್ ಮೂಲಕವೇ ಸುಲಭವಾಗಿ ಸಂಪರ್ಕಿಸಿ.'
                  : 'Zero corporate red tape. Honest, end-to-end guidance from genuine travel companions.'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenPlanner}
            className="px-4 py-2 rounded-md bg-[#263F32] text-[#F6F3EA] hover:bg-[#1f3328] text-xs font-semibold whitespace-nowrap transition-all shrink-0 shadow-xs active:scale-95"
          >
            {t.ctaSection.btnPlan}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
