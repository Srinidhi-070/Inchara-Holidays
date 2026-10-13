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
    <section className="py-20 sm:py-28 bg-[#263F32] text-[#F6F3EA] relative overflow-hidden bg-kannada-pattern-dark">
      {/* Decorative Warm Terracotta Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B96F50]/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <div className="w-12 h-12 rounded-full bg-white/10 text-[#E4D8C5] flex items-center justify-center mx-auto mb-6">
          <Compass className="w-6 h-6" />
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
            className="w-full sm:w-auto px-7 py-3.5 rounded-md bg-[#F6F3EA] text-[#263F32] hover:bg-white text-sm sm:text-base font-semibold tracking-wide transition-all shadow-md active:scale-98 flex items-center justify-center gap-2.5"
          >
            <span>{t.ctaSection.btnPlan}</span>
            <ArrowRight className="w-4 h-4 text-[#B96F50]" />
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className="w-full sm:w-auto px-6 py-3.5 rounded-md border border-[#F6F3EA]/30 text-[#F6F3EA] hover:bg-white/10 text-sm sm:text-base font-medium tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#AAB69A]" />
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
