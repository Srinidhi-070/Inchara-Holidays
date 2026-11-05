/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { LotusIcon, AmbariElephant, SikkuKolamMandala } from './SouthIndianMotifs';
import { Utensils, Sparkles, Check, ArrowRight, Heart } from 'lucide-react';

interface CateringShowcaseProps {
  language: Language;
  onOpenCatering: () => void;
}

export const CateringShowcase: React.FC<CateringShowcaseProps> = ({
  language,
  onOpenCatering,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const kn = language === 'kn';

  return (
    <section id="catering-showcase" className="py-24 sm:py-32 bg-[#FBF8F1] bg-kolam-subtle relative overflow-hidden border-b border-[#263F32]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            {/* Layered Photo Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50 group">
              <img
                src="/images/pure_veg_travel_meal.jpg"
                alt="100% Pure Vegetarian South Indian Feast"
                loading="lazy"
                className="w-full h-[340px] sm:h-[460px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/south_indian_feast.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-5 left-5">
                <span className="px-3.5 py-1.5 rounded-full bg-[#162E22]/95 backdrop-blur-md border border-[#D4AF37]/80 text-[#F5D77F] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>{kn ? '೧೦೦% ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ' : '100% Pure Vegetarian'}</span>
                </span>
              </div>

              {/* Bottom Card Copy */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <LotusIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{kn ? 'ಪಾರಂಪರಿಕ ಬಾಳೆ ಎಲೆ ಊಟ' : 'Plantain Leaf Tradition'}</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-serif-editorial leading-snug">
                  {kn ? 'ಅಪ್ಪಟ ತುಪ್ಪ, ತಾಜಾ ತೆಂಗಿನಕಾಯಿ ಮತ್ತು ಪ್ರೀತಿಯ ಬಡಿಸುವಿಕೆ.' : 'Desi Ghee, Fresh Coconut & Reverent Service.'}
                </div>
              </div>
            </div>

            {/* Decorative Gold Frame Offset */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-[#D4AF37]/40 -z-10 pointer-events-none" />
          </motion.div>

          {/* Right Column: Editorial & Details */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E3D28] uppercase">
              <span className="w-5 h-px bg-[#D4AF37]" />
              <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>{kn ? 'ಕ್ಯಾಟರಿಂಗ್ & ಆತಿಥ್ಯ' : 'Catering & Hospitality'}</span>
            </div>

            <h2 className="text-display-md font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.18]">
              {kn ? (
                <>
                  ಪ್ರವಾಸದಲ್ಲೂ ಮನೆ ಊಟದ{' '}
                  <em className="text-[#9E3D28] font-normal">ಸವಿ ಮತ್ತು ಪಾವಿತ್ರ್ಯ.</em>
                </>
              ) : (
                <>
                  The Sanctity of Home Cuisine,{' '}
                  <em className="text-[#9E3D28] font-normal">Wherever You Travel.</em>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-[#252923]/80 leading-relaxed font-normal">
              {kn
                ? 'ಪ್ರವಾಸದ ನಿಜವಾದ ನೆಮ್ಮದಿ ಇರುವುದು ಆರೋಗ್ಯಕರ ಹಾಗೂ ಸದ್ಗುಣದ ಊಟದಲ್ಲಿ. ಇಂಚರ ಹಾಲಿಡೇಸ್ ಪ್ರವಾಸದ ಮಾರ್ಗಮಧ್ಯೆ ಬಾಳೆ ಎಲೆಯ ಪಂಕ್ತಿ ಭೋಜನ, ಮಲೆನಾಡಿನ ಅಕ್ಕಿರೊಟ್ಟಿ, ಸಾತ್ವಿಕ ಮತ್ತು ಜೈನ ಪದ್ಧತಿಯ ಈರುಳ್ಳಿ-ಬೆಳ್ಳುಳ್ಳಿ ರಹಿತ ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಆಹಾರವನ್ನು ನಿಗದಿತ ಸಮಯಕ್ಕೆ ತಲುಪಿಸುತ್ತದೆ.'
                : 'Mindful travel is incomplete without pure, nourishing food. Whether stopping along Western Ghats highway passes or organizing a wedding banquet, our culinary team delivers warm, hygienic South and North Indian pure vegetarian feasts cooked in pure desi ghee.'}
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                {
                  titleKn: 'ಪಂಕ್ತಿ ಸೇವೆ ಶಿಸ್ತು',
                  titleEn: 'Banana Leaf Pankti Seva',
                  descKn: 'ಬಿಸಿ ಅನ್ನ, ಬೇಳೆ ಸಾರು, ರಸಂ, ಪಾಯಸ, ಮೈಸೂರು ಪಾಕ್ ಬಾಳೆ ಎಲೆ ಮೇಲೆ ಪ್ರೀತಿಯಿಂದ ಬಡಿಸುವಿಕೆ.',
                  descEn: 'Traditional seating with multi-course feasts served reverently on fresh plantain leaves.',
                },
                {
                  titleKn: 'ಸಾತ್ವಿಕ & ಜೈನ ಆಹಾರ',
                  titleEn: 'Sattvic & Jain Strictness',
                  descKn: 'ಈರುಳ್ಳಿ ಮತ್ತು ಬೆಳ್ಳುಳ್ಳಿ ರಹಿತ ೧೦೦% ಶುದ್ಧ ಸಾತ್ವಿಕ ನಿಯಮಗಳ ಪಾಲನೆ.',
                  descEn: 'Strictly No Onion, No Garlic preparation adhering to religious dietary norms.',
                },
                {
                  titleKn: 'ಪ್ರವಾಸದ ಮಧ್ಯೆ ಬಿಸಿ ಊಟ',
                  titleEn: 'On-Highway Meal Halts',
                  descKn: 'ಬಸ್ಸು ನಿಲ್ದಾಣಗಳಲ್ಲಿ ಸೋರಿಕೆಯಾಗದ ಪರಿಸರ ಸ್ನೇಹಿ ಬಾಕ್ಸ್‌ಗಳಲ್ಲಿ ಬಿಸಿ ಭೋಜನ.',
                  descEn: 'Punctual hot meal halts packed cleanly in eco-friendly insulated meal boxes.',
                },
                {
                  titleKn: 'ಮಲೆನಾಡಿನ ವಿಶೇಷ ತಿನಿಸುಗಳು',
                  titleEn: 'Authentic Malenadu Spread',
                  descKn: 'ತಾಜಾ ಅಕ್ಕಿರೊಟ್ಟಿ, ಎಳನೀರು, ಹಲಸಿನಕಾಯಿ ಖಾದ್ಯಗಳು ಹಾಗೂ ಕುದಿಯುವ ಫಿಲ್ಟರ್ ಕಾಫಿ.',
                  descEn: 'Akki Rotti, tender jackfruit delicacies, herbal tambuli, and artisanal filter coffee.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-[#263F32]/10 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <LotusIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-sm font-bold text-[#162E22]">{kn ? item.titleKn : item.titleEn}</span>
                  </div>
                  <p className="text-xs text-[#252923]/70 leading-relaxed font-normal">
                    {kn ? item.descKn : item.descEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={onOpenCatering}
                className="w-full sm:w-auto px-7 py-4 min-h-[48px] rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#162E22] text-xs sm:text-sm font-bold uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer border border-[#D4AF37]/50 focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <span>{kn ? 'ಕ್ಯಾಟರಿಂಗ್ ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ' : 'Request Catering Consultation'}</span>
                <ArrowRight className="w-4 h-4 text-[#162E22]" />
              </button>

              <div className="text-xs text-[#252923]/60 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#9E3D28]" />
                <span>{kn ? '೫೦ ರಿಂದ ೨೦೦೦+ ಅತಿಥಿಗಳಿಗೆ ಆಯೋಜನೆ' : 'Scalable for 50 to 2000+ guests'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
