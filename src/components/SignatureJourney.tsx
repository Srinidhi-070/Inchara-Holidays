import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Compass, Calendar, MapPin, ArrowRight, Check } from 'lucide-react';

interface SignatureJourneyProps {
  language: Language;
  onPlanSignatureJourney: () => void;
}

export const SignatureJourney: React.FC<SignatureJourneyProps> = ({
  language,
  onPlanSignatureJourney,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  return (
    <section className="py-20 sm:py-28 bg-[#252923] text-[#F6F3EA] relative overflow-hidden">
      {/* Background Graphic Accents with Ambient Animation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B96F50]/15 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#263F32]/25 rounded-full blur-3xl pointer-events-none animate-ambient-glow" style={{ animationDelay: '3.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Publication Style Cover Layout */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-white/15 bg-gradient-to-b from-white/5 to-white/0 overflow-hidden shadow-2xl backdrop-blur-xs"
        >
          {/* Top Publication Header Bar */}
          <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs tracking-widest text-[#E4D8C5] uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B96F50] animate-pulse" />
              <span className="font-semibold">{t.signature.kicker}</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[#AAB69A]">
              <span>VOL. 2026</span>
              <span aria-hidden="true">·</span>
              <span>KARNATAKA COAST & MALNAD EDITION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Cover Asset (7 cols) */}
            <div
              className="lg:col-span-7 relative min-h-[360px] lg:min-h-[520px] overflow-hidden bg-black/40 group"
              data-cursor="Journey"
            >
              <img
                src="/src/assets/images/signature_gokarna_coast_1791795485390.jpg"
                alt="Gokarna coastline at sunset"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252923] via-transparent to-transparent lg:hidden" />
              {/* Overlay stamp watermark */}
              <div className="absolute top-6 left-6 p-3 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-xs text-[#F6F3EA] space-y-0.5">
                <div className="text-[10px] uppercase tracking-wider text-[#AAB69A]">
                  {language === 'kn' ? 'ಮಾರ್ಗ ಸಂಚಿಕೆ' : 'Selected Circuit'}
                </div>
                <div className="font-semibold">{t.signature.duration}</div>
              </div>
            </div>

            {/* Editorial Narrative (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                {/* Route strip */}
                <div className="inline-flex items-center gap-2 text-xs text-[#B96F50] font-semibold mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="line-clamp-1">{t.signature.route}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-editorial text-[#F6F3EA] tracking-tight leading-snug mb-4">
                  {t.signature.title}
                </h3>

                <p className="text-sm text-[#F6F3EA]/75 leading-relaxed mb-6 font-normal">
                  {t.signature.narrative}
                </p>

                {/* Highlights */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <h4 className="text-xs uppercase tracking-wider text-[#AAB69A] font-semibold">
                    {t.signature.highlightsTitle}
                  </h4>
                  {t.signature.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E4D8C5]">
                      <Check className="w-3.5 h-3.5 text-[#B96F50] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={onPlanSignatureJourney}
                  data-cursor="Plan"
                  className="px-6 py-3 rounded-md bg-[#F6F3EA] text-[#263F32] hover:bg-white text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span>{t.signature.ctaPlanThis}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B96F50]" />
                </button>
                <div className="text-center sm:text-left text-[11px] text-[#AAB69A]">
                  {language === 'kn' ? 'ಸಂಪೂರ್ಣ ವೈಯಕ್ತಿಕ ಹೊಂದಾಣಿಕೆ ಸಾಧ್ಯ' : 'Fully customizable to your schedule'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
