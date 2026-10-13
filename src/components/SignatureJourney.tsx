import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Compass, Calendar, MapPin, ArrowRight, Check } from 'lucide-react';
import { SikkuKolamMandala, KolamBorderRibbon, GopuramIcon } from './SouthIndianMotifs';

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
    <section className="py-20 sm:py-28 bg-[#1E2E24] text-[#F6F3EA] relative overflow-hidden">
      {/* Background Graphic Accents with Kolam pattern and Ambient Animation */}
      <div className="absolute inset-0 bg-kolam-dark opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B96F50]/20 rounded-full blur-3xl pointer-events-none animate-ambient-glow" style={{ animationDelay: '3.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Publication Style Cover Layout with Kasavu Gold hairline */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#263F32]/80 to-[#162E22]/90 overflow-hidden shadow-2xl backdrop-blur-md"
        >
          {/* Top Publication Header Bar */}
          <div className="px-6 py-4 border-b border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-4 text-xs tracking-widest text-[#F5D77F] uppercase bg-black/20 relative">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-deepam shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              <span className="font-semibold text-white tracking-wider">{t.signature.kicker}</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[#E4D8C5]">
              <span className="text-[#D4AF37]">✦</span>
              <span>VOL. 2026</span>
              <span aria-hidden="true">·</span>
              <span>KARNATAKA COAST & MALNAD HERITAGE CIRCUIT</span>
            </div>
          </div>
          {/* Kolam decorative border ribbon */}
          <div className="h-1.5 w-full overflow-hidden opacity-30">
            <KolamBorderRibbon patternUnits={40} className="h-full" color="#F5D77F" dotColor="#D4AF37" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Cover Asset (7 cols) */}
            <div
              className="lg:col-span-7 relative min-h-[360px] lg:min-h-[520px] overflow-hidden bg-black/40 group"
              data-cursor="Journey"
            >
              <img
                src="/images/signature_gokarna_coast_1791795485390.jpg"
                alt="Gokarna coastline at sunset"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162E22] via-transparent to-transparent lg:hidden" />
              {/* Overlay stamp watermark */}
              <div className="absolute top-6 left-6 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-xs text-[#F6F3EA] space-y-0.5 shadow-lg">
                <div className="text-[10px] uppercase tracking-wider text-[#F5D77F] font-medium">
                  {language === 'kn' ? 'ಮಾರ್ಗ ಸಂಚಿಕೆ' : 'Selected Circuit'}
                </div>
                <div className="font-semibold text-white">{t.signature.duration}</div>
              </div>
            </div>

            {/* Editorial Narrative (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6 relative overflow-hidden">
              {/* Authentic Sikku Kolam Mandala watermark (Image 2 style) */}
              <div className="absolute -right-12 -bottom-12 w-64 h-64 text-[#D4AF37] opacity-10 pointer-events-none select-none">
                <SikkuKolamMandala className="w-full h-full" color="#F5D77F" />
              </div>

              <div className="relative z-10">
                {/* Route strip */}
                <div className="inline-flex items-center gap-2 text-xs text-[#F5D77F] font-semibold mb-3">
                  <GopuramIcon className="w-4 h-4 text-[#D4AF37]" />
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
                  className="px-6 py-3 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#162E22] hover:brightness-105 text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span>{t.signature.ctaPlanThis}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#162E22]" />
                </button>
                <div className="text-center sm:text-left text-[11px] text-[#E4D8C5]">
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
