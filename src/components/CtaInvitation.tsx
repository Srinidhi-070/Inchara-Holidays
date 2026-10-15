import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, MessageCircle, Compass } from 'lucide-react';
import { AmbariElephant, LotusIcon, KolamBorderRibbon, SikkuKolamMandala } from './SouthIndianMotifs';

interface CtaInvitationProps {
  language: Language;
  onOpenPlanner: () => void;
  onOpenContact: () => void;
}

export const CtaInvitation: React.FC<CtaInvitationProps> = ({
  language,
  onOpenPlanner,
  onOpenContact,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-[#162E22] via-[#0F2218] to-[#0A1810] text-[#F6F3EA] relative overflow-hidden">
      {/* Top delicate Kasavu Gold hairline & Kolam ribbon */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent z-20" />
      <div className="absolute top-[2px] left-0 right-0 h-2 opacity-20 overflow-hidden pointer-events-none z-20">
        <KolamBorderRibbon patternUnits={48} className="h-full" color="#D4AF37" dotColor="#F5D77F" />
      </div>

      {/* Decorative Kolam pattern & Warm Mysore Gold Glow */}
      <div className="absolute inset-0 bg-kolam-dark opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Large Sikku Kolam Mandala watermark in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] text-[#D4AF37] opacity-[0.04] pointer-events-none">
        <SikkuKolamMandala className="w-full h-full" />
      </div>

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className="w-16 h-16 rounded-full bg-[#12261C] border border-[#D4AF37]/60 text-[#F5D77F] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#D4AF37]/10">
          <AmbariElephant className="w-9 h-9 text-[#F5D77F]" color="#D4AF37" />
        </div>

        <h2 className="text-display-md font-bold font-serif-editorial text-[#F6F3EA] tracking-tight leading-tight mb-6 text-balance">
          {t.ctaSection.headline}
        </h2>

        <p className="text-base sm:text-lg text-[#F6F3EA]/85 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {t.ctaSection.subhead}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenPlanner}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#12261C] hover:brightness-105 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer border border-[#D4AF37]/50"
          >
            <span>{t.ctaSection.btnPlan}</span>
            <ArrowRight className="w-4 h-4 text-[#12261C]" />
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className="w-full sm:w-auto px-7 py-4 rounded-xl border border-[#D4AF37]/40 text-[#F5D77F] hover:bg-white/5 text-xs sm:text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.ctaSection.btnWhatsapp}</span>
          </button>
        </div>

        <div className="mt-8 text-xs text-[#E4D8C5]/80">
          {language === 'kn'
            ? 'ಯಾವುದೇ ಮುಂಗಡ ಶುಲ್ಕವಿಲ್ಲದೆ ಮುಕ್ತ ಸಮಾಲೋಚನೆ · ನಿಮ್ಮ ಅನುಕೂಲಕ್ಕೆ ತಕ್ಕ ದಿನಚರಿ'
            : 'Personalized guidance with zero pressure · Travel at your own unhurried pace'}
        </div>
      </motion.div>
    </section>
  );
};
