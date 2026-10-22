import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { LotusIcon } from './SouthIndianMotifs';

interface WhyUsProps {
  language: Language;
}

export const WhyUs: React.FC<WhyUsProps> = ({ language }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#F6F3EA] bg-kolam-subtle overflow-hidden relative border-t border-[#263F32]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E3D28] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.whyUs.kicker}</span>
          </div>
          <h2 className="text-display-md font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.18]">
            {t.whyUs.title}
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#252923]/75 leading-relaxed font-normal">
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
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              data-cursor="Care"
              className="p-7 sm:p-9 rounded-2xl bg-white border border-[#263F32]/12 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between group cursor-default relative overflow-hidden"
            >
              {/* Delicate top gold hairline */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

              <div>
                {/* Editorial Human Numbering */}
                <div className="text-3xl sm:text-4xl font-serif-editorial font-bold text-[#9E3D28] group-hover:text-[#D4AF37] transition-colors mb-4">
                  {reason.num}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#162E22] mb-3 group-hover:text-[#9E3D28] transition-colors leading-snug">
                  {reason.title}
                </h3>

                <p className="text-sm text-[#252923]/75 leading-relaxed font-normal">
                  {reason.desc}
                </p>
              </div>

              {/* Delicate hairline bottom accent with Lotus */}
              <div className="pt-6 mt-6 border-t border-[#263F32]/8 flex items-center justify-between text-xs text-[#252923]/60 font-medium">
                <span>{language === 'kn' ? 'ಇಂಚರ ಮಾನದಂಡ' : 'Inchara Standard'}</span>
                <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
