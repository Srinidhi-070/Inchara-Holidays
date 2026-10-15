import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Compass, Sparkles, MapPin } from 'lucide-react';
import { AmbariElephant, SikkuKolamMandala, LotusIcon, KolamCorner } from './SouthIndianMotifs';

interface OurStoryProps {
  language: Language;
  onOpenPlanner: () => void;
}

export const OurStory: React.FC<OurStoryProps> = ({ language, onOpenPlanner }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  return (
    <section id="our-story" className="py-24 sm:py-32 bg-linear-to-br from-[#12261C] via-[#1A382A] to-[#12261C] text-[#F6F3EA] relative overflow-hidden">
      {/* Top delicate gold hairline */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Editorial Frame (5 cols) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#0E1E16] group">
              {/* Kolam corner decorative accents */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none opacity-70">
                <KolamCorner className="w-10 h-10" color="#D4AF37" position="top-left" />
              </div>
              <div className="absolute top-3 right-3 z-10 pointer-events-none opacity-70">
                <KolamCorner className="w-10 h-10" color="#D4AF37" position="top-right" />
              </div>

              <img
                src="/images/south_indian_temple.jpg"
                alt="Traditional South Indian temple heritage and cultural roots of Karnataka"
                className="w-full aspect-4/5 object-cover object-center img-vignette group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12261C] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#12261C]/85 backdrop-blur-md border border-[#D4AF37]/50 text-xs shadow-xl">
                <div className="text-[#F5D77F] font-bold mb-1 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <LotusIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{language === 'kn' ? 'ಮೂಲ ಧ್ಯೇಯ' : 'Core Promise'}</span>
                </div>
                <div className="text-[#F6F3EA] font-serif-editorial font-bold text-base sm:text-lg">
                  {t.subtagline}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Narrative (7 cols) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 relative overflow-hidden"
          >
            {/* Sikku Kolam Mandala Watermark */}
            <div className="hidden sm:block absolute -right-16 -top-16 w-80 h-80 text-[#D4AF37] opacity-8 pointer-events-none select-none">
              <SikkuKolamMandala className="w-full h-full" color="#F5D77F" />
            </div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#F5D77F] uppercase mb-2.5">
                <span className="w-5 h-px bg-[#D4AF37]" />
                <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.ourStory.kicker}</span>
              </div>
              <h2 className="text-display-md font-bold font-serif-editorial text-[#F6F3EA] tracking-tight leading-[1.18]">
                {t.ourStory.title}
              </h2>
            </motion.div>

            <div className="space-y-4 text-sm sm:text-base text-[#F6F3EA]/85 leading-relaxed font-normal">
              <p>{t.ourStory.body1}</p>
              <p>{t.ourStory.body2}</p>
              <p className="text-[#F5D77F] italic border-l-2 border-[#D4AF37] pl-5 font-serif-editorial text-base sm:text-lg leading-relaxed">
                {t.ourStory.body3}
              </p>
            </div>

            {/* Cultural Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/15 text-xs text-[#E4D8C5]">
              <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 hover:border-[#D4AF37]/40 hover:bg-white/[0.1] transition-all">
                <span className="block font-bold text-[#F5D77F] text-sm mb-1">
                  {language === 'kn' ? 'ಆತಿಥ್ಯದ ಸಂಸ್ಕಾರ' : 'Cultural Warmth'}
                </span>
                <span className="text-[#F6F3EA]/80 leading-relaxed text-xs">
                  {language === 'kn'
                    ? 'ಕನ್ನಡ ನಾಡಿನ ಆತ್ಮೀಯತೆ ಮತ್ತು ಪ್ರಾಮಾಣಿಕ ನಡವಳಿಕೆ.'
                    : 'Grounded hospitality rooted in Karnataka heritage.'}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.06] border border-white/10 hover:border-[#D4AF37]/40 hover:bg-white/[0.1] transition-all">
                <span className="block font-bold text-[#F5D77F] text-sm mb-1">
                  {language === 'kn' ? 'ನಿರಾತಂಕ ಹೊಂದಾಣಿಕೆ' : 'Zero Friction'}
                </span>
                <span className="text-[#F6F3EA]/80 leading-relaxed text-xs">
                  {language === 'kn'
                    ? 'ವಾಹನ, ತಂಗುವಿಕೆ ಮತ್ತು ಮಾರ್ಗಸೂಚಿಗಳ ಪರಿಪೂರ್ಣ ಸಮನ್ವಯ.'
                    : 'Seamless travel coordination across all transit points.'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenPlanner}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#12261C] hover:brightness-105 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer border border-[#D4AF37]/50"
              >
                {t.ctaSection.btnPlan}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
