import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language, Destination, CulturalEtiquetteTip } from '../types';
import { translations } from '../data/translations';
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Heart,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';
import { AmbariElephant, LotusIcon, SikkuKolamMandala, KolamCorner } from './SouthIndianMotifs';

interface DestinationModalProps {
  destination: Destination | null;
  language: Language;
  onClose: () => void;
  onPlanTrip: (destinationName: string) => void;
}

// Universal Karnataka cultural etiquette tips
const universalKarnatakaTips: CulturalEtiquetteTip[] = [
  {
    categoryKn: 'ವಸ್ತ್ರಸಂಹಿತೆ',
    categoryEn: 'Dress Code',
    titleKn: 'ದೇಗುಲ ಮತ್ತು ಪವಿತ್ರ ಸ್ಥಳಗಳಲ್ಲಿ ವಸ್ತ್ರ ಗೌರವ',
    titleEn: 'Sacred Temple Dress Codes',
    tipKn: 'ಕರ್ನಾಟಕದ ಪ್ರಾಚೀನ ದೇವಾಲಯಗಳಲ್ಲಿ ಭುಜ ಮತ್ತು ಮೊಣಕಾಲುಗಳನ್ನು ಮುಚ್ಚುವ ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪು ಧರಿಸಿ. ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡಿನ ಕೆಲವು ದೇಗುಲಗಳ ಗರ್ಭಗುಡಿ ಪ್ರವೇಶಿಸಲು ಪುರುಷರು ಶರ್ಟ್ ಕಳಚಬೇಕಾಗಬಹುದು.',
    tipEn: 'Wear modest clothing covering shoulders and knees when visiting heritage shrines. In certain coastal and Malnad sanctums, men may be required to remove shirts before entering the inner sanctum.',
    badge: 'Essential',
  },
  {
    categoryKn: 'ಸಾಂಪ್ರದಾಯಿಕ ನಮಸ್ಕಾರ',
    categoryEn: 'Greetings',
    titleKn: 'ಎರಡು ಕೈ ಮುಗಿದ ನಮಸ್ಕಾರ & ಆಪ್ತತೆ',
    titleEn: 'Namaskara & Respectful Greetings',
    tipKn: 'ಸ್ಥಳೀಯರನ್ನು ಮತ್ತು ಹಿರಿಯರನ್ನು ಎರಡು ಕೈ ಮುಗಿದು "ನಮಸ್ಕಾರ" ಎಂದು ವಿನಮ್ರವಾಗಿ ಸ್ವಾಗತಿಸಿ. ಚಾಲಕರು ಅಥವಾ ಆತಿಥೇಯರನ್ನು "ಅಣ್ಣ" (ಅಥವಾ "ಅಕ್ಕ") ಎಂದು ಕರೆಯುವುದು ತಕ್ಷಣದ ಆಪ್ತತೆ ತರುತ್ತದೆ.',
    tipEn: 'Greet locals with folded hands and a sincere "Namaskara". Addressing hosts or chauffeurs as "Anna" (elder brother) or "Akka" (sister) fosters genuine warmth and respect.',
    badge: 'Greeting',
  },
  {
    categoryKn: 'ಪಾದರಕ್ಷೆ ಸಂಪ್ರದಾಯ',
    categoryEn: 'Footwear Courtesy',
    titleKn: 'ಮನೆ ಮತ್ತು ದೇಗುಲ ಪ್ರವೇಶಿಸುವಾಗ ಪಾದರಕ್ಷೆ ಕಳಚುವುದು',
    titleEn: 'Removing Footwear at Shrines & Homestays',
    tipKn: 'ಯಾವುದೇ ದೇವಸ್ಥಾನ, ಮಠ, ಅಥವಾ ಸಾಂಪ್ರದಾಯಿಕ ಮನೆ/ಹೋಮ್‌ಸ್ಟೇ ಪ್ರವೇಶಿಸುವ ಮುನ್ನ ಪಾದರಕ್ಷೆಗಳನ್ನು ಕಳಚಬೇಕು. ದೇಗುಲಗಳಲ್ಲಿ ಇದಕ್ಕಾಗಿ ಮೀಸಲಾದ ಜಾಗವಿರುತ್ತದೆ.',
    tipEn: 'Always remove shoes outside temples, prayer halls, and traditional home verandas. Heritage sites offer designated shoe stands.',
    badge: 'Custom',
  },
  {
    categoryKn: 'ಆತಿಥ್ಯ & ಭೋಜನ',
    categoryEn: 'Dining Etiquette',
    titleKn: 'ಬಾಳೆ ಎಲೆ ಊಟ ಮತ್ತು ಬಲಗೈ ಸಂಪ್ರದಾಯ',
    titleEn: 'Plantain Leaf Meals & Right Hand Courtesy',
    tipKn: 'ಸಾಂಪ್ರದಾಯಿಕ ಬಾಳೆ ಎಲೆ ಊಟ ಮತ್ತು ಫಿಲ್ಟರ್ ಕಾಫಿಯನ್ನು ಬಲಗೈಯಿಂದ ಸವಿಯಲಾಗುತ್ತದೆ. ದೇವಾಲಯದ ತೀರ್ಥ-ಪ್ರಸಾದ ಅಥವಾ ಉಡುಗೊರೆಗಳನ್ನು ಯಾವಾಗಲೂ ಬಲಗೈ ಅಥವಾ ಎರಡೂ ಕೈಗಳಿಂದ ಸ್ವೀಕರಿಸಿ.',
    tipEn: 'Traditional meals on fresh plantain leaves and morning filter coffee are eaten with the right hand. Receive sacred offerings (prasada) or tea cups with both hands or the right hand.',
    badge: 'Dining',
  },
  {
    categoryKn: 'ಪರಂಪರೆ & ಪರಿಸರ',
    categoryEn: 'Heritage Care',
    titleKn: 'ಶಿಲಾ ಸ್ಮಾರಕಗಳ ಗೌರವ & ದೇವರ ಕಾಡು ರಕ್ಷಣೆ',
    titleEn: 'Heritage Monoliths & Sacred Groves',
    tipKn: 'ಪ್ರಾಚೀನ ಶಿಲಾ ಕೆತ್ತನೆಗಳು ಅಥವಾ ದೇವರ ವಿಗ್ರಹಗಳ ಮೇಲೆ ಕಾಲಿಡುವುದು ನಿಷೇಧ. ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಪ್ರಕೃತಿ ಮತ್ತು ದೇವರ ಕಾಡುಗಳಲ್ಲಿ ಪ್ಲಾಸ್ಟಿಕ್ ಮುಕ್ತ ಶಿಸ್ತನ್ನು ಕಾಪಾಡಿ.',
    tipEn: 'Never climb on ancient carved friezes or consecrated monoliths. In the Western Ghats and Coorg, honour sacred groves (Devara Kadu) with zero-plastic responsibility.',
    badge: 'Heritage',
  },
];

// Essential conversational Kannada phrases for cultural travelers
const kannadaPhrases = [
  {
    kn: 'ನಮಸ್ಕಾರ',
    phonetic: 'Namaskara',
    en: 'Hello / Greetings (Fold hands)',
    context: 'Use with everyone',
  },
  {
    kn: 'ಧನ್ಯವಾದಗಳು',
    phonetic: 'Dhanyavadagalu',
    en: 'Thank you very much',
    context: 'Gratitude for service or guidance',
  },
  {
    kn: 'ಊಟ ಆಯ್ತಾ?',
    phonetic: 'Oota aaytha?',
    en: 'Have you had food? (Warmest inquiry)',
    context: 'Expresses deep familial care',
  },
  {
    kn: 'ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ',
    phonetic: 'Thumba chennagide',
    en: 'It is truly wonderful / delicious',
    context: 'Praising coffee, food, or view',
  },
  {
    kn: 'ದಯವಿಟ್ಟು',
    phonetic: 'Dayavittu',
    en: 'Please',
    context: 'Polite requests',
  },
  {
    kn: 'ಹೋಗಿ ಬರ್ತೀನಿ',
    phonetic: 'Hogi barteeni',
    en: 'Goodbye ("I shall go and return")',
    context: 'Gracious traditional leave-taking',
  },
];

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  language,
  onClose,
  onPlanTrip,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);

  useEffect(() => {
    if (!destination) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [destination, onClose]);

  if (!destination) return null;
  const t = translations[language];

  // Specific tips for this destination if defined, plus universal Karnataka etiquette
  const destinationSpecificTips = destination.culturalEtiquette || [];

  const handleCopyPhrase = (phrase: string) => {
    navigator.clipboard?.writeText(phrase);
    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-2.5 sm:p-6 lg:p-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#FBF8F1] rounded-2xl shadow-2xl overflow-hidden border border-[#D4AF37]/40 text-[#252923] max-h-[94dvh] flex flex-col my-4"
        >
          {/* Top Kasavu gold highlight */}
          <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#B96F50]" />

          {/* Close button: high z-index, pointer-events-auto, isolated hit-area */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 active:scale-95 text-[#F6F3EA] flex items-center justify-center backdrop-blur-md transition-all cursor-pointer pointer-events-auto shadow-lg"
            aria-label={t.modal.close}
            data-cursor="Close"
          >
            <X className="w-5 h-5 pointer-events-none" />
          </button>

          {/* Hero Banner inside modal */}
          <div className="relative h-48 sm:h-72 lg:h-80 w-full overflow-hidden bg-[#263F32] shrink-0">
            <img
              src={destination.image}
              alt={destination.imageAlt}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#263F32] via-[#263F32]/50 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-[#F6F3EA] flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#F5D77F] mb-1">
                  <span>{language === 'kn' ? destination.regionKn : destination.regionEn}</span>
                  <span aria-hidden="true">·</span>
                  <span>{language === 'kn' ? destination.tagKn : destination.tagEn}</span>
                </div>
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold font-serif-editorial tracking-tight">
                  {language === 'kn' ? destination.nameKn : destination.nameEn}
                </h3>
              </div>
              <div className="hidden sm:block p-2 rounded-xl bg-black/40 border border-[#D4AF37]/40 backdrop-blur-md">
                <AmbariElephant className="w-8 h-8 text-[#F5D77F]" color="#F5D77F" />
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-8 space-y-7 flex-1 overflow-y-auto">
            {/* Quick Specs Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-4 rounded-xl bg-[#E4D8C5]/50 border border-[#263F32]/10 text-xs">
              <div>
                <span className="block text-[#252923]/60 mb-0.5">{t.modal.bestTime}</span>
                <span className="font-semibold text-[#263F32]">
                  {language === 'kn' ? destination.bestSeasonKn : destination.bestSeasonEn}
                </span>
              </div>
              <div>
                <span className="block text-[#252923]/60 mb-0.5">{t.modal.idealDuration}</span>
                <span className="font-semibold text-[#263F32]">
                  {language === 'kn' ? destination.durationKn : destination.durationEn}
                </span>
              </div>
              <div>
                <span className="block text-[#252923]/60 mb-0.5">{t.modal.style}</span>
                <span className="font-semibold text-[#263F32]">
                  {language === 'kn' ? destination.travelStyleKn : destination.travelStyleEn}
                </span>
              </div>
            </div>

            {/* Narrative & Description */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold font-serif-editorial text-[#263F32]">
                {language === 'kn' ? 'ತಾಣದ ಪರಿಚಯ ಮತ್ತು ಹಿನ್ನೆಲೆ' : 'Destination Essence & Character'}
              </h4>
              <p className="text-sm sm:text-base text-[#252923]/80 leading-relaxed font-normal">
                {language === 'kn' ? destination.narrativeKn : destination.narrativeEn}
              </p>
              <p className="text-sm text-[#252923]/70 leading-relaxed italic border-l-2 border-[#B96F50] pl-4 font-serif-editorial">
                {language === 'kn' ? destination.shortDescKn : destination.shortDescEn}
              </p>
            </div>

            {/* Curated Highlights */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold font-serif-editorial text-[#263F32]">
                {t.modal.highlights}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(language === 'kn' ? destination.highlightsKn : destination.highlightsEn).map((hl, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-lg bg-white/70 border border-[#263F32]/10 flex items-start gap-2.5 text-xs text-[#252923]/85"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B96F50] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural Etiquette Section (Styled with Kaavi Terracotta & Sikku Kolam - Image 2) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#263F32]/8 via-[#E4D8C5]/40 to-[#263F32]/5 border border-[#263F32]/15 space-y-6">
              {/* Kaavi Terracotta Header Banner with White Sikku Kolam Watermark */}
              <div className="relative rounded-xl bg-gradient-to-r from-[#9E3D28] via-[#B34A34] to-[#8C341F] text-[#FBF8F1] p-5 border border-[#D4AF37]/40 overflow-hidden shadow-sm">
                {/* Authentic Sikku Kolam Watermark (Directly from Image 2) */}
                <div className="absolute right-2 -bottom-6 w-32 h-32 text-white opacity-25 pointer-events-none select-none">
                  <SikkuKolamMandala className="w-full h-full" color="#FBF8F1" />
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5D77F]">
                      <LotusIcon className="w-4 h-4 text-[#F5D77F]" />
                      <span>{t.modal.culturalEtiquette}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#FBF8F1]/90 font-medium">
                        {language === 'kn' ? 'ಕರ್ನಾಟಕ ಪರಂಪರೆ' : 'Karnataka Heritage'}
                      </span>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white tracking-tight">
                      {language === 'kn' ? 'ಪ್ರಯಾಣಿಕರ ಸಾಂಸ್ಕೃತಿಕ ಶಿಷ್ಟಾಚಾರ' : 'Cultural Etiquette & Respect'}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#FBF8F1]/85 leading-relaxed font-normal max-w-xl">
                      {t.modal.culturalEtiquetteSub}
                    </p>
                  </div>
                  <div className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-md text-[#F5D77F] border border-[#D4AF37]/40 text-[11px] font-semibold tracking-wide flex items-center gap-1.5 shrink-0 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F5D77F]" />
                    <span>{language === 'kn' ? 'ವಿಶ್ವಾಸಾರ್ಹ ಸಲಹೆಗಳು' : 'Trusted Guidelines'}</span>
                  </div>
                </div>
              </div>

              {/* Destination-Specific Tips if available */}
              {destinationSpecificTips.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-[#263F32] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B96F50]" />
                    <span>
                      {language === 'kn'
                        ? `${destination.nameKn} ತಾಣದ ನಿರ್ದಿಷ್ಟ ಶಿಷ್ಟಾಚಾರ`
                        : `Custom Etiquette for ${destination.nameEn}`}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {destinationSpecificTips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/85 border border-[#263F32]/12 shadow-xs space-y-1.5 hover:border-[#263F32]/25 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B96F50]">
                            {language === 'kn' ? tip.categoryKn : tip.categoryEn}
                          </span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-[#263F32] font-serif-editorial">
                          {language === 'kn' ? tip.titleKn : tip.titleEn}
                        </h5>
                        <p className="text-xs text-[#252923]/80 leading-relaxed font-normal">
                          {language === 'kn' ? tip.tipKn : tip.tipEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Universal Karnataka Etiquette Cards */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-[#263F32] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#263F32]" />
                  <span>
                    {language === 'kn'
                      ? 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಮುಖ್ಯವಾದ ಸಾಂಸ್ಕೃತಿಕ ಅಂಶಗಳು'
                      : 'Essential Practices across Karnataka'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {universalKarnatakaTips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/75 border border-[#263F32]/10 space-y-1.5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-[#B96F50] uppercase mb-1">
                          <span>{language === 'kn' ? tip.categoryKn : tip.categoryEn}</span>
                          {tip.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#263F32]/10 text-[#263F32]">
                              {tip.badge}
                            </span>
                          )}
                        </div>
                        <h5 className="text-xs font-bold text-[#263F32] font-serif-editorial leading-snug mb-1">
                          {language === 'kn' ? tip.titleKn : tip.titleEn}
                        </h5>
                        <p className="text-[11px] text-[#252923]/75 leading-relaxed font-normal">
                          {language === 'kn' ? tip.tipKn : tip.tipEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Kannada Travel Phrases Mini-Guide */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#263F32] text-[#F6F3EA] space-y-3 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#AAB69A]" />
                    <h5 className="text-xs sm:text-sm font-bold font-serif-editorial text-[#F6F3EA]">
                      {language === 'kn'
                        ? 'ಆಪ್ತ ಸಂವಹನಕ್ಕಾಗಿ ಸರಳ ಕನ್ನಡ ಮಾತುಗಳು'
                        : 'Everyday Kannada Phrases for Travellers'}
                    </h5>
                  </div>
                  <span className="text-[10px] text-[#AAB69A]">
                    {language === 'kn' ? 'ಸ್ಪರ್ಶಿಸಿ ನಕಲಿಸಿ' : 'Click to copy phrase'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                  {kannadaPhrases.map((phrase, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleCopyPhrase(phrase.kn)}
                      className="p-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-left transition-all group flex items-start justify-between gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[#F6F3EA] font-kannada">
                            {phrase.kn}
                          </span>
                          <span className="text-[10px] text-[#AAB69A] italic">
                            ({phrase.phonetic})
                          </span>
                        </div>
                        <div className="text-[11px] text-[#E4D8C5]/90 line-clamp-1">
                          {phrase.en}
                        </div>
                      </div>
                      <div className="shrink-0 p-1 rounded text-white/50 group-hover:text-white transition-colors">
                        {copiedPhrase === phrase.kn ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cultural nuance notice */}
            <div className="p-4 rounded-xl bg-[#263F32]/5 border border-[#263F32]/15 text-xs text-[#252923]/75 space-y-1">
              <span className="font-semibold text-[#263F32]">
                {language === 'kn' ? 'ಇಂಚಾರಾ ಪ್ರವಾಸ ಸಲಹೆ:' : 'The Inchara Guidance:'}
              </span>
              <p>
                {language === 'kn'
                  ? 'ಈ ತಾಣಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ಅತ್ಯುತ್ತಮ ವಾಹನ ಮಾರ್ಗ, ಸ್ಥಳೀಯ ಆತಿಥ್ಯ ಮತ್ತು ಜನನಿಬಿಡವಲ್ಲದ ಸಮಯಗಳನ್ನು ಒಳಗೊಂಡ ಕಸ್ಟಮ್ ದಿನಚರಿಯನ್ನು ನಾವು ಸಿದ್ಧಪಡಿಸುತ್ತೇವೆ.'
                  : 'We handcraft the daily pace for this destination, matching driving hours with scenic rest points, heritage homestays, and verified local chauffeur coordination.'}
              </p>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 bg-[#E4D8C5]/40 border-t border-[#263F32]/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shrink-0">
            <span className="text-xs text-[#252923]/60 text-center sm:text-left">
              {language === 'kn'
                ? 'ಯಾವುದೇ ಮುಂಗಡ ಶುಲ್ಕವಿಲ್ಲದೆ ನಿಮ್ಮ ಪ್ರವಾಸ ದಿನಚರಿ ಚರ್ಚಿಸಿ.'
                : 'Discuss your bespoke itinerary with zero upfront commitment.'}
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-md border border-[#263F32]/20 text-xs font-semibold text-[#252923] hover:bg-[#263F32]/5 transition-colors cursor-pointer"
              >
                {t.modal.close}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onPlanTrip(language === 'kn' ? destination.nameKn : destination.nameEn);
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-md bg-[#263F32] text-[#F6F3EA] hover:bg-[#1f3328] text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>{t.modal.planThisTrip}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B96F50]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
