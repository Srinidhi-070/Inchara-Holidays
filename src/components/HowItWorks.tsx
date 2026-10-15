import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Compass, CalendarDays, ShieldCheck, HeartHandshake } from 'lucide-react';
import { LotusIcon, SikkuKolamMandala } from './SouthIndianMotifs';

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
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#FBF8F1] bg-kolam-subtle border-y border-[#263F32]/10 overflow-hidden relative">
      {/* Background Sikku Kolam Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.03] pointer-events-none text-[#263F32]">
        <SikkuKolamMandala className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E3D28] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.howItWorks.kicker}</span>
            <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
            <span className="w-5 h-px bg-[#D4AF37]" />
          </div>
          <h2 className="text-display-md font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.18]">
            {t.howItWorks.title}
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#252923]/75 leading-relaxed font-normal">
            {t.howItWorks.subtitle}
          </p>
        </motion.div>

        {/* 3 Simple Stages Horizontal Storytelling Flow with Visual Connective Thread */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Visual Connective Gold Thread across the process steps */}
          <div className="hidden md:block absolute top-[72px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/70 to-[#D4AF37]/20 z-0 pointer-events-none" />

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
                className="relative z-10 p-7 sm:p-9 rounded-2xl bg-white border border-[#D4AF37]/35 flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300 shadow-xs hover:shadow-xl group overflow-hidden"
              >
                {/* Top delicate gold hairline */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

                <div>
                  {/* Top indicator: Editorial number + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-serif-editorial font-bold text-[#9E3D28]">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-[#162E22] text-[#F5D77F] border border-[#D4AF37]/45 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Dual Language Label */}
                  <div className="mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#162E22] leading-snug">
                      {step.title}
                    </h3>
                    <div className="text-xs text-[#9E3D28] font-semibold mt-0.5 tracking-wider uppercase">
                      {step.english}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#252923]/75 leading-relaxed mb-6 font-normal">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom unboxed text tag */}
                <div className="pt-4 border-t border-[#263F32]/10 flex items-center justify-between text-xs text-[#162E22] font-semibold">
                  <span>{step.tag}</span>
                  <span className="text-[#D4AF37] text-xs">
                    {idx < 2 ? '✦ →' : '✦ ✓'}
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
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-linear-to-r from-[#12261C] via-[#1A382A] to-[#12261C] text-[#F6F3EA] border border-[#D4AF37]/40 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6 text-[#F5D77F]" />
            </div>
            <div className="text-sm text-[#F6F3EA]/90 leading-relaxed">
              <span className="font-bold text-[#F5D77F] block sm:inline">
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
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#12261C] border border-[#D4AF37]/50 hover:brightness-105 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all shrink-0 shadow-md active:scale-95 cursor-pointer"
          >
            {t.ctaSection.btnPlan}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
