import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowRight, MessageCircle, Compass } from 'lucide-react';

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
    <section className="py-20 sm:py-28 bg-[#162E22] text-[#F6F3EA] relative overflow-hidden">
      {/* Decorative Kolam pattern & Warm Mysore Gold Glow */}
      <div className="absolute inset-0 bg-kolam-dark opacity-30 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37]/25 to-white/5 border border-[#D4AF37]/40 text-[#F5D77F] flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <Compass className="w-7 h-7" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif-editorial text-[#F6F3EA] tracking-tight leading-tight mb-6 text-balance">
          {t.ctaSection.headline}
        </h2>

        <p className="text-base sm:text-lg text-[#F6F3EA]/85 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {t.ctaSection.subhead}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenPlanner}
            className="w-full sm:w-auto px-8 py-3.5 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#162E22] hover:brightness-105 text-sm sm:text-base font-bold tracking-wide transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>{t.ctaSection.btnPlan}</span>
            <ArrowRight className="w-4 h-4 text-[#162E22]" />
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className="w-full sm:w-auto px-7 py-3.5 rounded-md border border-[#D4AF37]/40 text-[#F5D77F] hover:bg-[#D4AF37]/10 text-sm sm:text-base font-medium tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
