import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { communityReflections } from '../data/community';
import { Quote } from 'lucide-react';

interface TravellerStoriesProps {
  language: Language;
}

export const TravellerStories: React.FC<TravellerStoriesProps> = ({ language }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  return (
    <section className="py-20 sm:py-28 bg-[#F6F3EA] border-t border-[#263F32]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#B96F50] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#B96F50]" />
            <span>{t.community.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-editorial text-[#263F32] tracking-tight leading-[1.18]">
            {t.community.title}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#252923]/75 leading-relaxed font-normal">
            {t.community.subtitle}
          </p>
        </motion.div>

        {/* Clear placeholder disclaimer tag as mandated by prompt guidelines */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 p-3.5 rounded-lg bg-[#E4D8C5]/50 border border-[#263F32]/12 inline-block text-xs text-[#263F32]/80"
        >
          <span className="font-semibold text-[#263F32]">{language === 'kn' ? 'ಗಮನಿಸಿ:' : 'Note:'}</span>{' '}
          {t.community.sampleTag}
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
              whileHover={shouldReduceMotion ? {} : { y: -5, borderColor: 'rgba(38, 63, 50, 0.35)' }}
              data-cursor="Story"
              className="p-6 sm:p-8 rounded-xl bg-white/90 border border-[#263F32]/10 shadow-sm flex flex-col justify-between hover:border-[#263F32]/35 transition-all duration-300 hover:shadow-lg cursor-default"
            >
              <div>
                <Quote className="w-6 h-6 text-[#B96F50]/70 mb-4" />
                <p className="text-sm sm:text-base text-[#252923]/90 italic font-serif-editorial leading-relaxed mb-6 font-normal">
                  {language === 'kn' ? item.quoteKn : item.quoteEn}
                </p>
              </div>

              <div className="pt-4 border-t border-[#263F32]/10">
                <div className="font-bold text-sm text-[#263F32]">
                  {language === 'kn' ? item.authorKn : item.authorEn}
                </div>
                <div className="text-xs text-[#252923]/60 mt-0.5">
                  {language === 'kn' ? item.journeyKn : item.journeyEn}
                </div>
                <div className="text-[10px] text-[#B96F50] mt-1 font-semibold">
                  {language === 'kn' ? item.noteKn : item.noteEn}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
