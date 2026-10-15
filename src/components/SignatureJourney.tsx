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
    <section className="py-24 sm:py-32 bg-[#102118] text-[#F6F3EA] relative overflow-hidden">
      {/* Background Graphic Accents with Kolam pattern and Ambient Animation */}
      <div className="absolute inset-0 bg-kolam-dark opacity-15 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9E3D28]/15 rounded-full blur-3xl pointer-events-none animate-ambient-glow" style={{ animationDelay: '3.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Publication Style Cover Layout with Kasavu Gold hairline */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#183627]/90 via-[#142C20]/95 to-[#0E1E16] overflow-hidden shadow-2xl backdrop-blur-md"
        >
          {/* Top Publication Header Bar */}
          <div className="px-6 py-4 border-b border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-4 text-xs tracking-[0.18em] text-[#F5D77F] uppercase bg-black/30 relative">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
              <span className="font-semibold text-white tracking-widest">{t.signature.kicker}</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-[#E4D8C5]/90 text-[11px]">
              <span className="text-[#D4AF37]">✦</span>
              <span>INCHARA PRIVATE EXPEDITIONS</span>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span>COASTAL KARNATAKA & MALENADU CIRCUIT</span>
            </div>
          </div>
          {/* Restrained Kolam decorative border ribbon */}
          <div className="h-1.5 w-full overflow-hidden opacity-20">
            <KolamBorderRibbon patternUnits={40} className="h-full" color="#F5D77F" dotColor="#D4AF37" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Cover Asset (7 cols) */}
            <div
              className="lg:col-span-7 relative min-h-[380px] lg:min-h-[540px] overflow-hidden bg-black/40 group"
              data-cursor="Journey"
            >
              <img
                src="/images/signature_gokarna_coast_1791795485390.jpg"
                alt="Gokarna coastline at sunset"
                className="w-full h-full object-cover object-center img-vignette group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E16] via-transparent to-transparent lg:hidden" />
              {/* Overlay stamp watermark */}
              <div className="absolute top-6 left-6 p-3.5 rounded-xl bg-[#12261C]/80 backdrop-blur-md border border-[#D4AF37]/45 text-xs text-[#F6F3EA] space-y-0.5 shadow-xl">
                <div className="text-[10px] uppercase tracking-wider text-[#F5D77F] font-semibold flex items-center gap-1.5">
                  <span className="text-[#D4AF37]">✦</span>
                  <span>{language === 'kn' ? 'ವಿಶೇಷ ಮಾರ್ಗ ಸಂಚಿಕೆ' : 'Selected Circuit'}</span>
                </div>
                <div className="font-bold text-white font-serif-editorial text-sm sm:text-base">{t.signature.duration}</div>
              </div>
            </div>

            {/* Editorial Narrative (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 relative overflow-hidden">
              {/* Authentic Sikku Kolam Mandala watermark */}
              <div className="absolute -right-12 -bottom-12 w-64 h-64 text-[#D4AF37] opacity-8 pointer-events-none select-none">
                <SikkuKolamMandala className="w-full h-full" color="#F5D77F" />
              </div>

              <div className="relative z-10">
                {/* Route strip */}
                <div className="inline-flex items-center gap-2 text-xs text-[#F5D77F] font-semibold mb-3 tracking-wide">
                  <GopuramIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span className="line-clamp-1">{t.signature.route}</span>
                </div>

                <h3 className="text-display-sm sm:text-3xl lg:text-4xl font-bold font-serif-editorial text-[#F6F3EA] tracking-tight leading-snug mb-4">
                  {t.signature.title}
                </h3>

                <p className="text-sm sm:text-base text-[#F6F3EA]/85 leading-relaxed mb-6 font-normal">
                  {t.signature.narrative}
                </p>

                {/* Highlights */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <h4 className="text-xs uppercase tracking-wider text-[#F5D77F] font-semibold">
                    {t.signature.highlightsTitle}
                  </h4>
                  {t.signature.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E4D8C5]">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
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
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#12261C] hover:brightness-105 text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer border border-[#D4AF37]/50"
                >
                  <span>{t.signature.ctaPlanThis}</span>
                  <ArrowRight className="w-4 h-4 text-[#12261C]" />
                </button>
                <div className="text-center sm:text-left text-[11px] text-[#E4D8C5]/85">
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
