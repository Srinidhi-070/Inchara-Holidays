/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { ServiceCategoryId } from '../types/inquiry';
import { serviceCategories } from '../data/servicesData';
import { LotusIcon, AmbariElephant, SikkuKolamMandala } from './SouthIndianMotifs';
import {
  Compass,
  GraduationCap,
  Briefcase,
  Bus,
  FileCheck,
  Utensils,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface ServicesDiscoverySectionProps {
  language: Language;
  onSelectCategory: (categoryId: ServiceCategoryId, subServiceId?: string) => void;
}

export const ServicesDiscoverySection: React.FC<ServicesDiscoverySectionProps> = ({
  language,
  onSelectCategory,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const kn = language === 'kn';
  const [activeExpandedCategory, setActiveExpandedCategory] = useState<ServiceCategoryId | null>(null);

  const getCategoryIcon = (id: ServiceCategoryId) => {
    switch (id) {
      case 'holidays': return <Compass className="w-6 h-6 text-[#D4AF37]" />;
      case 'educational': return <GraduationCap className="w-6 h-6 text-[#D4AF37]" />;
      case 'corporate': return <Briefcase className="w-6 h-6 text-[#D4AF37]" />;
      case 'transport': return <Bus className="w-6 h-6 text-[#D4AF37]" />;
      case 'visa_passport': return <FileCheck className="w-6 h-6 text-[#D4AF37]" />;
      case 'catering': return <Utensils className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#FBF8F1] bg-kolam-subtle relative overflow-hidden border-b border-[#263F32]/10">
      {/* Background Motif */}
      <div className="absolute right-0 top-1/3 -translate-y-1/2 w-96 h-96 opacity-[0.03] pointer-events-none text-[#263F32]">
        <SikkuKolamMandala className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E3D28] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{kn ? 'ಸಮಗ್ರ ಸೇವಾ ವಿಭಾಗಗಳು' : 'Comprehensive Travel Services'}</span>
          </div>
          <h2 className="text-display-md font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.18]">
            {kn ? (
              <>
                ಪ್ರವಾಸ, ಆತಿಥ್ಯ & ಸಾರಿಗೆ —{' '}
                <br />
                <em className="text-[#9E3D28] font-normal">ಆರು ಪ್ರಮುಖ ಆಧಾರಸ್ತಂಭಗಳು.</em>
              </>
            ) : (
              <>
                Travel, Hospitality & Logistics —{' '}
                <br />
                <em className="text-[#9E3D28] font-normal">Our Six Core Pillars.</em>
              </>
            )}
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#252923]/75 leading-relaxed font-normal">
            {kn
              ? 'ಪ್ರತಿಯೊಂದು ಪ್ರವಾಸಕ್ಕೂ ಸೂಕ್ತ ಮಾರ್ಗದರ್ಶನ. ವೈಯಕ್ತಿಕ ರಜಾದಿನಗಳಿಂದ ಹಿಡಿದು ಸಾಂಸ್ಥಿಕ ಸಾರಿಗೆ, ಶೈಕ್ಷಣಿಕ ಭೇಟಿಗಳು, ವೀಸಾ ನೆರವು ಮತ್ತು ಅಪ್ಪಟ ಬಾಳೆ ಎಲೆ ಸಸ್ಯಾಹಾರಿ ಕ್ಯಾಟರಿಂಗ್‌ವರೆಗೆ — ನಿಮ್ಮ ಎಲ್ಲಾ ಅಗತ್ಯಗಳಿಗೂ ಒಂದೇ ವಿಶ್ವಾಸಾರ್ಹ ತಾಣ.'
              : 'End-to-end expertise for every journey. From bespoke leisure holidays to institutional transport, educational expeditions, travel documentation guidance, and traditional banquet catering.'}
          </p>
        </motion.div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviceCategories.map((cat, idx) => {
            const isExpanded = activeExpandedCategory === cat.id;

            return (
              <motion.article
                key={cat.id}
                id={`service-${cat.id}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-3xl bg-white border border-[#263F32]/12 hover:border-[#D4AF37] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between overflow-hidden group relative"
              >
                {/* Top Gold Hairline */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

                <div className="p-7 sm:p-8">
                  {/* Top Header: Number + Icon + Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-serif-editorial font-bold text-[#D4AF37]">
                      0{cat.displayOrder}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#F6F3EA] border border-[#D4AF37]/30 text-[11px] font-bold text-[#9E3D28] tracking-wider uppercase">
                        {kn ? cat.badgeKn : cat.badgeEn}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#162E22] flex items-center justify-center shadow-xs">
                        {getCategoryIcon(cat.id)}
                      </div>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#162E22] mb-1.5 leading-snug group-hover:text-[#9E3D28] transition-colors">
                    {kn ? cat.titleKn : cat.titleEn}
                  </h3>
                  <div className="text-xs font-semibold text-[#D4AF37] mb-3">
                    {kn ? cat.taglineKn : cat.taglineEn}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#252923]/75 leading-relaxed font-normal mb-5">
                    {kn ? cat.descriptionKn : cat.descriptionEn}
                  </p>

                  {/* Sub-services list (Progressive disclosure) */}
                  <div className="space-y-2 border-t border-[#263F32]/8 pt-4">
                    <div className="text-[11px] font-bold text-[#162E22] uppercase tracking-wider mb-2">
                      {kn ? 'ಒಳಗೊಂಡಿರುವ ಸೇವೆಗಳು:' : 'Available Offerings:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.services.map((sub) => (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => onSelectCategory(cat.id, sub.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#F6F3EA] hover:bg-[#D4AF37]/20 border border-[#263F32]/10 text-xs text-[#252923]/90 transition-colors text-left flex items-center gap-1 cursor-pointer"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                          <span>{kn ? sub.titleKn.split('(')[0] : sub.titleEn.split('(')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-5 sm:px-8 bg-[#FBF8F1] border-t border-[#263F32]/8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className="button-text text-xs sm:text-sm font-bold uppercase tracking-wider text-[#162E22] hover:text-[#9E3D28] flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>{kn ? 'ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ' : 'Enquire Now'}</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#162E22] text-[#F5D77F] hover:bg-[#263F32] text-xs font-semibold transition-all active:scale-95 cursor-pointer"
                  >
                    {kn ? 'ವಿವರಗಳು' : 'Details'}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
