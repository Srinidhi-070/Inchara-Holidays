import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { LotusIcon } from './SouthIndianMotifs';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

interface WhyUsProps {
  language: Language;
}

export const WhyUs: React.FC<WhyUsProps> = ({ language }) => {
  const shouldReduceMotion = useReducedMotion();
  const t = translations[language];

  const affiliations = [
    {
      id: 'ktf',
      code: 'KTF',
      labelKn: 'ಕೆಟಿಎಫ್ ಕರ್ನಾಟಕ',
      labelEn: 'KTF Karnataka',
      fullNameKn: 'ಕರ್ನಾಟಕ ಟೂರಿಸಂ ಫೋರಮ್',
      fullNameEn: 'Karnataka Tourism Forum',
      badgeKn: 'ರಾಜ್ಯ ಪ್ರವಾಸೋದ್ಯಮ ಒಕ್ಕೂಟ',
      badgeEn: 'Karnataka State Chapter',
      logo: '/images/partners/ktf_logo_trimmed.jpg',
      alt: 'Karnataka Tourism Forum (KTF)',
      verifiedKn: 'ಮಾನ್ಯತೆ ಪಡೆದ ಸದಸ್ಯರು',
      verifiedEn: 'Verified Member',
    },
    {
      id: 'iatte',
      code: 'IATTE',
      labelKn: 'ಐಎಟಿಟಿಇ ಇಂಡಿಯಾ',
      labelEn: 'IATTE India',
      fullNameKn: 'ಇಂಡಿಯನ್ ಅಸೋಸಿಯೇಷನ್ ಆಫ್ ಟ್ರಾವೆಲ್ & ಟೂರಿಸಂ ಎಕ್ಸ್‌ಪರ್ಟ್ಸ್',
      fullNameEn: 'Indian Assoc. of Travel & Tourism Experts',
      badgeKn: 'ರಾಷ್ಟ್ರೀಯ ತಜ್ಞರ ಮಂಡಳಿ',
      badgeEn: 'National Expert Council',
      logo: '/images/partners/iatte_logo_trimmed.jpg',
      alt: 'IATTE - Indian Association of Travel & Tourism Experts',
      verifiedKn: 'ರಾಷ್ಟ್ರೀಯ ನೋಂದಾಯಿತ',
      verifiedEn: 'National Registered',
    },
    {
      id: 'abto',
      code: 'ABTO',
      labelKn: 'ಎಬಿಟಿಒ ಪ್ರವಾಸೋದ್ಯಮ',
      labelEn: 'ABTO Tourism',
      fullNameKn: 'ಅಸೋಸಿಯೇಷನ್ ಆಫ್ ಬುದ್ಧಿಸ್ಟ್ ಟೂರ್ ಆಪರೇಟರ್ಸ್',
      fullNameEn: 'Assoc. of Buddhist Tour Operators',
      badgeKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ & ದೇಶೀಯ',
      badgeEn: 'International & National',
      logo: '/images/partners/abto_logo_trimmed.png',
      alt: 'Association of Buddhist Tour Operators (ABTO)',
      verifiedKn: 'ವಿಶ್ವವ್ಯಾಪಿ ಸದಸ್ಯತ್ವ',
      verifiedEn: 'Charter Member',
    },
    {
      id: 'uten',
      code: 'UTEN',
      labelKn: 'ಯುಟಿಇಎನ್ ಫ್ರಾಟರ್ನಿಟಿ',
      labelEn: 'UTEN Fraternity',
      fullNameKn: 'ಯುನೈಟೆಡ್ ಟ್ರಾವೆಲ್ & ಎಜುಕೇಷನಲ್ ನೆಟ್‌ವರ್ಕ್',
      fullNameEn: 'United Travel & Educational Network',
      badgeKn: 'ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸೋದ್ಯಮ ಜಾಲ',
      badgeEn: 'Educational & Travel Network',
      logo: '/images/partners/uten_logo.png',
      alt: 'UTEN - Empowering Travel Fraternity',
      verifiedKn: 'ಅಧಿಕೃತ ಪಾಲುದಾರರು',
      verifiedEn: 'Official Partner',
    },
  ];

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#F6F3EA] bg-kolam-subtle overflow-hidden relative border-t border-[#263F32]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E3D28] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.whyUs.kicker}</span>
          </div>
          <h2 className="text-display-md font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.18]">
            {t.whyUs.title}
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#252923]/75 leading-relaxed font-normal">
            {t.whyUs.subtitle}
          </p>
        </motion.div>

        {/* Expressive Editorial Grid with Staggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.whyUs.reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : (idx % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              data-cursor="Care"
              className="p-7 sm:p-9 rounded-2xl bg-white border border-[#263F32]/12 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between group cursor-default relative overflow-hidden"
            >
              {/* Delicate top gold hairline */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

              <div>
                {/* Editorial Human Numbering */}
                <div className="text-3xl sm:text-4xl font-serif-editorial font-bold text-[#9E3D28] group-hover:text-[#D4AF37] transition-colors mb-4">
                  {reason.num}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#162E22] mb-3 group-hover:text-[#9E3D28] transition-colors leading-snug">
                  {reason.title}
                </h3>

                <p className="text-sm text-[#252923]/75 leading-relaxed font-normal">
                  {reason.desc}
                </p>
              </div>

              {/* Delicate hairline bottom accent with Lotus */}
              <div className="pt-6 mt-6 border-t border-[#263F32]/8 flex items-center justify-between text-xs text-[#252923]/60 font-medium">
                <span>{language === 'kn' ? 'ಇಂಚರ ಮಾನದಂಡ' : 'Inchara Standard'}</span>
                <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industry Accreditations & Trade Affiliations */}
        <div id="accreditations" className="mt-16 sm:mt-24 pt-12 border-t border-[#263F32]/10">
          {/* Header matching user's reference */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#9E3D28] inline-flex items-center gap-2">
              <span className="w-5 h-px bg-[#D4AF37]" />
              <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>
                {language === 'kn'
                  ? 'ಅಧಿಕೃತ ಪ್ರವಾಸೋದ್ಯಮ ಒಕ್ಕೂಟಗಳು & ಮಾನ್ಯತೆಗಳು'
                  : 'Recognised Industry Affiliations & Accreditations'}
              </span>
              <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
              <span className="w-5 h-px bg-[#D4AF37]" />
            </span>
            <p className="text-sm sm:text-base text-[#252923]/75 font-normal mt-2">
              {language === 'kn'
                ? 'ರಾಜ್ಯ, ರಾಷ್ಟ್ರೀಯ ಮತ್ತು ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪ್ರವಾಸೋದ್ಯಮ ಒಕ್ಕೂಟಗಳ ಹೆಮ್ಮೆಯ ಸದಸ್ಯತ್ವ'
                : 'Proud members of leading state, national & international travel trade bodies'}
            </p>
          </div>

          {/* Prominent High-Visibility Logos in Balanced Pill Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-7 max-w-5xl mx-auto">
            {affiliations.map((partner, idx) => (
              <motion.div
                key={partner.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className="flex flex-col items-center group cursor-default"
              >
                {/* Large White Rounded Pill Card */}
                <div className="w-full h-32 sm:h-36 md:h-40 bg-white rounded-2xl sm:rounded-3xl border border-[#263F32]/12 group-hover:border-[#D4AF37] p-4 sm:p-6 flex items-center justify-center shadow-xs group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  {/* Subtle top gold hairline on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#9E3D28] via-[#D4AF37] to-[#162E22] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <img
                    src={partner.logo}
                    alt={partner.alt}
                    loading="lazy"
                    className={`max-h-24 sm:max-h-28 md:max-h-32 max-w-[88%] object-contain group-hover:scale-105 transition-transform duration-300 ${
                      partner.id === 'uten' ? 'rounded-lg' : ''
                    }`}
                  />
                </div>

                {/* Primary Caption Label */}
                <span className="mt-3 text-xs sm:text-sm font-bold text-[#162E22] tracking-wide group-hover:text-[#9E3D28] transition-colors text-center">
                  {language === 'kn' ? partner.labelKn : partner.labelEn}
                </span>

                {/* Secondary Scope Subtitle */}
                <span className="text-[11px] text-[#252923]/65 font-medium text-center mt-0.5">
                  {language === 'kn' ? partner.badgeKn : partner.badgeEn}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Trust Subtext Guarantee */}
          <div className="mt-10 sm:mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#162E22]/5 border border-[#263F32]/10 text-xs text-[#252923]/75 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
              <span>
                {language === 'kn'
                  ? 'ಎಲ್ಲಾ ಪ್ರವಾಸಗಳು ಅಧಿಕೃತ ಪ್ರವಾಸೋದ್ಯಮ ಮಾರ್ಗಸೂಚಿಗಳು ಮತ್ತು ಸುರಕ್ಷತಾ ನಿಯಮಾವಳಿಗಳಿಗೆ ಬದ್ಧವಾಗಿವೆ'
                  : 'All journeys strictly adhere to certified trade guidelines, fair pricing & vetted safety norms'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
