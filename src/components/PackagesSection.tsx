/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { samplePackages } from '../data/packages';
import { LotusIcon, AmbariElephant, SikkuKolamMandala } from './SouthIndianMotifs';
import { Clock, Check, ArrowRight, Sparkles, MapPin, Calendar } from 'lucide-react';

interface PackagesSectionProps {
  language: Language;
  onSelectPackage: (packageName: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  language,
  onSelectPackage,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const kn = language === 'kn';
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'karnataka' | 'panIndia' | 'international'>('all');

  const filteredPackages = selectedFilter === 'all'
    ? samplePackages
    : samplePackages.filter((p) => p.category === selectedFilter);

  const filterTabs = [
    { id: 'all', labelKn: 'ಎಲ್ಲಾ ಪ್ಯಾಕೇಜ್‌ಗಳು', labelEn: 'All Packages' },
    { id: 'karnataka', labelKn: 'ಕರ್ನಾಟಕ ಪರಂಪರೆ & ಮಲೆನಾಡು', labelEn: 'Karnataka & Malnad' },
    { id: 'panIndia', labelKn: 'ಆಲ್-ಇಂಡಿಯಾ ಪಯಣಗಳು', labelEn: 'Pan-India Circuits' },
    { id: 'international', labelKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ರಜೆಗಳು', labelEn: 'International Escapes' },
  ];

  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#F6F3EA] bg-kolam-subtle relative overflow-hidden border-b border-[#263F32]/10">
      {/* Decorative Sikku Kolam Watermark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.03] pointer-events-none text-[#263F32]">
        <SikkuKolamMandala className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9E3D28] uppercase mb-2.5">
              <span className="w-5 h-px bg-[#D4AF37]" />
              <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
              <span>{kn ? 'ವಿನ್ಯಾಸಗೊಳಿಸಿದ ಪ್ರವಾಸ ಯೋಜನೆಗಳು' : 'Curated Tour Itineraries'}</span>
            </div>
            <h2 className="text-display-md font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.18]">
              {kn ? (
                <>
                  ಜನಪ್ರಿಯ ರಜಾದಿನಗಳ{' '}
                  <em className="text-[#9E3D28] font-normal">ಮಾದರಿ ಪ್ಯಾಕೇಜ್‌ಗಳು.</em>
                </>
              ) : (
                <>
                  Pre-Organised &{' '}
                  <em className="text-[#9E3D28] font-normal">Customised Package Blueprints.</em>
                </>
              )}
            </h2>
            <p className="mt-3 text-base text-[#252923]/75 leading-relaxed font-normal">
              {kn
                ? 'ಕರ್ನಾಟಕದ ದೇಗುಲ ವಾಸ್ತುಶಿಲ್ಪದಿಂದ ಹಿಡಿದು ರಾಜಸ್ಥಾನದ ಅರಮನೆಗಳು ಹಾಗೂ ಬಾಲಿಯ ಕಡಲತೀರದವರೆಗೆ — ಮುಂಚಿತವಾಗಿ ರೂಪಿಸಿದ ಹಾಗೂ ನಿಮ್ಮ ಇಷ್ಟಕ್ಕೆ ತಕ್ಕಂತೆ ಬದಲಾಯಿಸಬಹುದಾದ ಮಾದರಿ ರೂಪರೇಷೆಗಳು.'
                : 'From UNESCO world heritage temples of Karnataka to royal desert circuits and tropical island shores — explore verified blueprints ready to be customized for your travel party.'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#162E22] text-[#F5D77F] border-[#D4AF37] shadow-sm'
                      : 'bg-white text-[#252923]/75 border-[#263F32]/12 hover:border-[#D4AF37]/50'
                  }`}
                >
                  {kn ? tab.labelKn : tab.labelEn}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, idx) => (
            <motion.article
              key={pkg.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-3xl bg-white border border-[#263F32]/12 hover:border-[#D4AF37] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative h-60 overflow-hidden bg-[#162E22]">
                  <img
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero_western_ghats_1791795450720.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-[#162E22]/90 backdrop-blur-md border border-[#D4AF37]/60 text-[#F5D77F] text-xs font-bold tracking-wider uppercase shadow-md">
                      {kn ? pkg.badgeKn : pkg.badgeEn}
                    </span>
                  </div>

                  {/* Duration pill at bottom of photo */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{kn ? pkg.durationKn : pkg.durationEn}</span>
                    </span>
                  </div>
                </div>

                {/* Package Details */}
                <div className="p-6 sm:p-7 space-y-4">
                  <h3 className="text-xl font-bold font-serif-editorial text-[#162E22] group-hover:text-[#9E3D28] transition-colors leading-snug">
                    {kn ? pkg.titleKn : pkg.titleEn}
                  </h3>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 border-t border-[#263F32]/8 pt-3">
                    <div className="text-[11px] font-bold text-[#162E22] uppercase tracking-wider">
                      {kn ? 'ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು:' : 'Key Highlights:'}
                    </div>
                    {(kn ? pkg.highlightsKn : pkg.highlightsEn).slice(0, 3).map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#252923]/75 leading-relaxed">
                        <LotusIcon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Inclusions summary */}
                  <div className="p-3 rounded-xl bg-[#F6F3EA] border border-[#263F32]/8 text-xs text-[#252923]/80">
                    <span className="font-bold text-[#162E22]">
                      {kn ? 'ಒಳಗೊಂಡಿರುವ ಸೌಲಭ್ಯ: ' : 'Inclusions: '}
                    </span>
                    <span>
                      {(kn ? pkg.inclusionsKn : pkg.inclusionsEn).slice(0, 2).join(' · ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 sm:p-7 pt-0 border-t border-transparent">
                <button
                  type="button"
                  onClick={() => onSelectPackage(kn ? pkg.titleKn : pkg.titleEn)}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#162E22] hover:bg-[#263F32] text-[#F5D77F] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer border border-[#D4AF37]/40"
                >
                  <span>{kn ? 'ಈ ಪ್ಯಾಕೇಜ್ ವಿಚಾರಿಸಿ' : 'Request Custom Quote'}</span>
                  <ArrowRight className="w-4 h-4 text-[#F5D77F]" />
                </button>
                <div className="text-[11px] text-[#252923]/50 text-center mt-2 font-normal">
                  {kn ? 'ನಿಮ್ಮ ದಿನಾಂಕ & ತಂಡದ ಗಾತ್ರಕ್ಕೆ ತಕ್ಕಂತೆ ದರ ನಿಗದಿ' : 'Tailored to your dates, group size & stay preferences'}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
