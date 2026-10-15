import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { communityReflections } from '../data/community';
import { Quote } from 'lucide-react';
import { LotusIcon, SikkuKolamMandala } from './SouthIndianMotifs';

interface TravellerStoriesProps {
  language: Language;
}

export const TravellerStories: React.FC<TravellerStoriesProps> = ({ language }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  return (
    <section className="py-24 sm:py-32 bg-[#FBF8F1] bg-kolam-subtle border-t border-[#263F32]/10 overflow-hidden relative">
      {/* Subtle Sikku Kolam Mandala watermark */}
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
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E3D28] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.community.kicker}</span>
          </div>
          <h2 className="text-display-md font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.18]">
            {t.community.title}
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#252923]/75 leading-relaxed font-normal">
            {t.community.subtitle}
          </p>
        </motion.div>

        {/* Clear placeholder disclaimer tag as mandated by prompt guidelines */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 px-4 py-2 rounded-xl bg-white border border-[#D4AF37]/35 inline-flex items-center gap-2 text-xs text-[#252923]/80 shadow-2xs"
        >
          <span className="font-bold text-[#9E3D28]">{language === 'kn' ? 'ಗಮನಿಸಿ:' : 'Note:'}</span>{' '}
          <span>{t.community.sampleTag}</span>
        </motion.div>

        {/* Quotation Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {communityReflections.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={shouldReduceMotion ? {} : { y: -5 }}
              data-cursor="Story"
              className="p-7 sm:p-9 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-xs flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl cursor-default relative overflow-hidden group"
            >
              {/* Delicate top gold hairline */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

              <div>
                <Quote className="w-7 h-7 text-[#9E3D28]/80 mb-4" />
                <p className="text-base sm:text-lg text-[#162E22] italic font-serif-editorial leading-relaxed mb-6 font-normal">
                  {language === 'kn' ? item.quoteKn : item.quoteEn}
                </p>
              </div>

              <div className="pt-4 border-t border-[#263F32]/10">
                <div className="font-bold text-base text-[#162E22]">
                  {language === 'kn' ? item.authorKn : item.authorEn}
                </div>
                <div className="text-xs text-[#252923]/65 mt-0.5">
                  {language === 'kn' ? item.journeyKn : item.journeyEn}
                </div>
                <div className="text-xs text-[#9E3D28] mt-1 font-semibold flex items-center gap-1">
                  <span>✦</span>
                  <span>{language === 'kn' ? item.noteKn : item.noteEn}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
