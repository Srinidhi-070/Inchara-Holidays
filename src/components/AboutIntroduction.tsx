/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { AmbariElephant, LotusIcon, SikkuKolamMandala } from './SouthIndianMotifs';
import { Sparkles, Shield, HeartHandshake, Compass } from 'lucide-react';

interface AboutIntroductionProps {
  language: Language;
  onOpenPlanner: () => void;
  onExploreServices: () => void;
}

export const AboutIntroduction: React.FC<AboutIntroductionProps> = ({
  language,
  onOpenPlanner,
  onExploreServices,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const kn = language === 'kn';

  const pillars = [
    {
      icon: HeartHandshake,
      titleKn: 'ಅತಿಥಿ ದೇವೋ ಭವ',
      titleEn: 'Sacred Hospitality',
      descKn: 'ಪ್ರತಿಯೊಬ್ಬ ಪ್ರಯಾಣಿಕರನ್ನೂ ನಮ್ಮ ಮನೆಗೆ ಬಂದ ಅತಿಥಿಯಂತೆ ಆದರದಿಂದ ಕಾಣುವ ಪಾರಂಪರಿಕ ಸಂಸ್ಕೃತಿ.',
      descEn: 'Rooted in the ancient ethos of treating every traveller as an honored guest with genuine care.',
    },
    {
      icon: Compass,
      titleKn: 'ನಿರಾತಂಕ ಪಯಣ',
      titleEn: 'Unhurried Pacing',
      descKn: 'ಯಾವುದೇ ಧಾವಂತವಿಲ್ಲದ, ಸ್ಥಳೀಯ ಇತಿಹಾಸ ಮತ್ತು ಪ್ರಕೃತಿಯನ್ನು ಆಪ್ತವಾಗಿ ಅನುಭವಿಸುವ ಸಮತೋಲಿತ ದಿನಚರಿ.',
      descEn: 'Mindful, unhurried itineraries designed for deep cultural immersion and restorative leisure.',
    },
    {
      icon: Shield,
      titleKn: 'ಪಾರದರ್ಶಕ ವಿಶ್ವಾಸ',
      titleEn: 'Complete Transparency',
      descKn: 'ಗುಪ್ತ ವೆಚ್ಚಗಳಿಲ್ಲದ ಸ್ಪಷ್ಟ ಬಿಲ್ಲಿಂಗ್, ಸ್ವಚ್ಛ ವಾಹನಗಳು ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ಪಾರಂಪರಿಕ ವಾಸ್ತವ್ಯ.',
      descEn: 'Zero hidden costs, verified safety protocols, clean sanitized fleets, and audited heritage stays.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F6F3EA] bg-kolam-subtle relative overflow-hidden border-b border-[#263F32]/10">
      {/* Decorative Sikku Kolam Watermark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.035] pointer-events-none text-[#263F32]">
        <SikkuKolamMandala className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Official Registered Emblem */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-2 shadow-md border border-[#D4AF37]/50 flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <img
                src="/images/brand/inchara_official_logo.png"
                alt="Inchara Holidays Official Emblem"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E3D28] uppercase mb-3">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{kn ? 'ಇಂಚರ ಪರಿಚಯ' : 'About Inchara Holidays'}</span>
            <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
            <span className="w-5 h-px bg-[#D4AF37]" />
          </div>

          <h2 className="text-display-md font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.18] mb-6">
            {kn ? (
              <>
                ಕರ್ನಾಟಕದ ಹೆರಿಟೇಜ್ & ಆತಿಥ್ಯದ{' '}
                <em className="text-[#9E3D28] font-normal">ವಿಶ್ವಾಸಾರ್ಹ ಸೇತುವೆ.</em>
              </>
            ) : (
              <>
                A Bridge to Karnataka’s Heritage &{' '}
                <em className="text-[#9E3D28] font-normal">Mindful Hospitality.</em>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[#252923]/80 leading-relaxed font-normal">
            {kn
              ? 'ಇಂಚರ ಹಾಲಿಡೇಸ್ ಕೇವಲ ಪ್ರವಾಸ ಆಯೋಜಿಸುವ ಸಂಸ್ಥೆಯಲ್ಲ; ಇದು ಕರ್ನಾಟಕದ ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆ, ಮಲೆನಾಡಿನ ಹಸಿರು ಕಣಿವೆಗಳು ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತೀಯ ಪವಿತ್ರ ಆತಿಥ್ಯವನ್ನು ಜೀವಂತವಾಗಿ ಅನುಭವಿಸುವಂತೆ ಮಾಡುವ ಆಪ್ತ ತಂಡ. ಕುಟುಂಬದ ರಜೆಗಳು, ಕಾಲೇಜುಗಳ ಕೈಗಾರಿಕಾ ಭೇಟಿಗಳು, ಕಾರ್ಪೊರೇಟ್ ಸಮ್ಮೇಳನಗಳಿಂದ ಹಿಡಿದು ೧೦೦% ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಪಂಕ್ತಿ ಭೋಜನದವರೆಗೆ — ಸಮಗ್ರ ಸೇವೆಗಳನ್ನು ಒಂದೇ ಸೂರಿನಡಿ ಒದಗಿಸುತ್ತೇವೆ.'
              : 'Inchara Holidays is more than a tour operator; we are custodians of Karnataka’s Hoysala heritage, misty Western Ghats trails, and sacred South Indian warmth. From multi-generational family getaways and curriculum-aligned industrial visits to executive corporate retreats and 100% pure vegetarian banquet catering — we provide end-to-end travel and hospitality under one trusted banner.'}
          </p>
        </motion.div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : idx * 0.1 }}
                className="p-7 sm:p-8 rounded-2xl bg-white border border-[#263F32]/12 hover:border-[#D4AF37]/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F6F3EA] border border-[#D4AF37]/40 text-[#9E3D28] flex items-center justify-center mb-5 group-hover:bg-[#162E22] group-hover:text-[#F5D77F] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-serif-editorial text-[#162E22] mb-2.5">
                    {kn ? pillar.titleKn : pillar.titleEn}
                  </h3>
                  <p className="text-sm text-[#252923]/75 leading-relaxed font-normal">
                    {kn ? pillar.descKn : pillar.descEn}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#263F32]/8 flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                  <span>{kn ? 'ಇಂಚರ ಸಂಕಲ್ಪ' : 'Core Promise'}</span>
                  <LotusIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
