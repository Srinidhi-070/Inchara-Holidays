import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';

interface WhyUsProps {
  language: Language;
}

export const WhyUs: React.FC<WhyUsProps> = ({ language }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-[#FBF8F1] bg-kolam-subtle overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#B96F50] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <span className="text-[#D4AF37]">✦</span>
            <span>{t.whyUs.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-editorial text-[#263F32] tracking-tight leading-[1.18]">
            {t.whyUs.title}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#252923]/75 leading-relaxed font-normal">
            {t.whyUs.subtitle}
          </p>
        </motion.div>

        {/* Expressive Editorial Grid with Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.whyUs.reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : (idx % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={shouldReduceMotion ? {} : { y: -4, borderColor: 'rgba(185, 111, 80, 0.4)' }}
              data-cursor="Care"
              className="p-6 sm:p-8 rounded-xl bg-white/85 backdrop-blur-xs border border-[#263F32]/10 hover:border-[#B96F50]/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between group cursor-default"
            >
              <div>
                {/* Editorial Human Numbering */}
                <div className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#B96F50] mb-4">
                  {reason.num}
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-serif-editorial text-[#263F32] mb-3 group-hover:text-[#B96F50] transition-colors">
                  {reason.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#252923]/75 leading-relaxed font-normal">
                  {reason.desc}
                </p>
              </div>

              {/* Delicate hairline bottom accent */}
              <div className="pt-6 mt-6 border-t border-[#263F32]/8 flex items-center justify-between text-[11px] text-[#252923]/50 font-medium">
                <span>{language === 'kn' ? 'ಇಂಚಾರಾ ಮಾನದಂಡ' : 'Inchara Standard'}</span>
                <span className="text-[#263F32] font-medium">✓</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
