/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { LotusIcon, AmbariElephant, SikkuKolamMandala } from './SouthIndianMotifs';
import { GraduationCap, Briefcase, ShieldCheck, Bus, Factory, Award, ArrowRight } from 'lucide-react';

interface InstitutionalCorporateHighlightProps {
  language: Language;
  onOpenEducational: () => void;
  onOpenCorporate: () => void;
}

export const InstitutionalCorporateHighlight: React.FC<InstitutionalCorporateHighlightProps> = ({
  language,
  onOpenEducational,
  onOpenCorporate,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const kn = language === 'kn';

  return (
    <section id="institutional-corporate" className="py-24 sm:py-32 bg-[#FBF8F1] bg-kolam-subtle relative overflow-hidden border-b border-[#263F32]/10">
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
            <span>{kn ? 'ಸಾಂಸ್ಥಿಕ & ಕಾರ್ಪೊರೇಟ್ ಪರಿಣತಿ' : 'Institutional & Corporate Excellence'}</span>
          </div>
          <h2 className="text-display-md font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.18]">
            {kn ? (
              <>
                ಶೈಕ್ಷಣಿಕ ಶಿಸ್ತು ಮತ್ತು{' '}
                <em className="text-[#9E3D28] font-normal">ಕಾರ್ಪೊರೇಟ್ ವೃತ್ತಿಪರತೆ.</em>
              </>
            ) : (
              <>
                Academic Rigor &{' '}
                <em className="text-[#9E3D28] font-normal">Executive Precision.</em>
              </>
            )}
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#252923]/75 leading-relaxed font-normal">
            {kn
              ? 'ಶಾಲೆಗಳ ಶೈಕ್ಷಣಿಕ ಪಯಣಗಳು, ಎಂಜಿನಿಯರಿಂಗ್-ಮ್ಯಾನೇಜ್‌ಮೆಂಟ್ ಕಾಲೇಜುಗಳ ಕೈಗಾರಿಕಾ ಭೇಟಿಗಳು (IV) ಹಾಗೂ ಪ್ರಮುಖ ಕಂಪನಿಗಳ ಲೀಡರ್‌ಶಿಪ್ ಆಫ್‌ಸೈಟ್‌ಗಳು — ನಿಖರ ಸುರಕ್ಷತಾ ಮಾನದಂಡಗಳೊಂದಿಗೆ.'
              : 'School learning expeditions, verified industrial visits (IV) for higher education, and rejuvenating leadership offsites for corporate teams — executed with uncompromising safety.'}
          </p>
        </motion.div>

        {/* Dual Pillar Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Educational & Industrial Tours */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white border border-[#263F32]/12 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#9E3D28] via-[#D4AF37] to-transparent" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#162E22] text-[#F5D77F] flex items-center justify-center shadow-md">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#9E3D28]/10 text-[#9E3D28] text-xs font-bold uppercase tracking-wider border border-[#9E3D28]/30">
                  {kn ? 'ಶೈಕ್ಷಣಿಕ & ಕೈಗಾರಿಕಾ' : 'Schools & Colleges'}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif-editorial text-[#162E22] mb-3">
                {kn ? 'ಶಾಲಾ-ಕಾಲೇಜು ಪ್ರವಾಸಗಳು & ಕೈಗಾರಿಕಾ ಭೇಟಿಗಳು (IV)' : 'Educational Study Tours & Industrial Visits'}
              </h3>
              <p className="text-sm text-[#252923]/75 leading-relaxed font-normal mb-6">
                {kn
                  ? 'ಪಠ್ಯಕ್ರಮಕ್ಕೆ ಪೂರಕವಾದ ತಾಣಗಳು, ಅಧಿಕೃತ ಕೈಗಾರಿಕಾ ಪ್ರವೇಶ ಅನುಮತಿಗಳು, ಜಿಪಿಎಸ್ ಆಧಾರಿತ ಸುರಕ್ಷಿತ ಕೋಚ್‌ಗಳು ಮತ್ತು ಪೌಷ್ಟಿಕ ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಊಟ.'
                  : 'Syllabus-aligned field destinations, verified plant permissions, speed-governed GPS coaches, and dedicated teacher chaperone accommodations.'}
              </p>

              <div className="space-y-3 mb-8">
                {[
                  {
                    icon: ShieldCheck,
                    textKn: '೧೫ ಅಂಶಗಳ ವಾಹನ ಸುರಕ್ಷತಾ ಆಡಿಟ್ & ನುರಿತ ಅನುಭವಿ ಚಾಲಕರು',
                    textEn: '15-point mechanical safety audit and vetted institutional drivers',
                  },
                  {
                    icon: Factory,
                    textKn: 'ಉತ್ಪಾದನಾ, ಐಟಿ & ಕೃಷಿ ಘಟಕಗಳ ಅಧಿಕೃತ ಪ್ರವೇಶ ಲೈಸನ್',
                    textEn: 'Official entry permits for manufacturing, IT, and agro facilities',
                  },
                  {
                    icon: Bus,
                    textKn: 'ಪ್ರತ್ಯೇಕ ಶಿಕ್ಷಕ ಕೊಠಡಿಗಳು & ತುರ್ತು ವೈದ್ಯಕೀಯ ನೆಟ್‌ವರ್ಕ್ ಬೆಂಬಲ',
                    textEn: 'Dedicated faculty rooms and on-call regional doctor network',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#162E22] font-medium">
                      <div className="w-6 h-6 rounded-full bg-[#F6F3EA] text-[#D4AF37] flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{kn ? item.textKn : item.textEn}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenEducational}
              className="w-full py-4 px-6 rounded-xl bg-[#162E22] hover:bg-[#263F32] text-[#F5D77F] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95 cursor-pointer border border-[#D4AF37]/50"
            >
              <span>{kn ? 'ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸ ವಿಚಾರಣೆ' : 'Plan Educational Tour'}</span>
              <ArrowRight className="w-4 h-4 text-[#F5D77F]" />
            </button>
          </motion.div>

          {/* Card 2: Corporate & Event Tours */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white border border-[#263F32]/12 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#162E22] via-[#D4AF37] to-transparent" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#9E3D28] text-[#F5D77F] flex items-center justify-center shadow-md">
                  <Briefcase className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#162E22]/10 text-[#162E22] text-xs font-bold uppercase tracking-wider border border-[#162E22]/30">
                  {kn ? 'ಕಾರ್ಪೊರೇಟ್ & ಈವೆಂಟ್ಸ್' : 'Offsites & Retreats'}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif-editorial text-[#162E22] mb-3">
                {kn ? 'ಕಾರ್ಪೊರೇಟ್ ಆಫ್‌ಸೈಟ್‌ಗಳು & ಸಮ್ಮೇಳನಗಳು' : 'Corporate Offsites & Leadership Retreats'}
              </h3>
              <p className="text-sm text-[#252923]/75 leading-relaxed font-normal mb-6">
                {kn
                  ? 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಪ್ರಶಾಂತ ಪ್ಲಾಂಟೇಶನ್ ರೆಸಾರ್ಟ್‌ಗಳು, ಹೈ-ಸ್ಪೀಡ್ ವೈಫೈ ಕಾನ್ಫರೆನ್ಸ್ ಸಭಾಂಗಣಗಳು, ಟೀಮ್ ಬಿಲ್ಡಿಂಗ್ ಹಾಗೂ ಗೌರ್ಮೆ ಕ್ಯಾಟರಿಂಗ್ ನಿರ್ವಹಣೆ.'
                  : 'Distraction-free coffee estate retreats, conference-ready AV halls, structured team building activities, and seamless executive transfers.'}
              </p>

              <div className="space-y-3 mb-8">
                {[
                  {
                    icon: Award,
                    textKn: 'ಪೂರ್ಣ ಗೌಪ್ಯತೆಯ ಲೀಡರ್‌ಶಿಪ್ ಕಾನ್ಫರೆನ್ಸ್ ಸೌಲಭ್ಯಗಳು',
                    textEn: 'Private conference spaces with verified high-speed internet & AV',
                  },
                  {
                    icon: Bus,
                    textKn: 'ಕಚೇರಿಯ ಬಾಗಿಲಿನಿಂದಲೇ ಎಸಿ ಕೋಚ್ ಪಿಕ್-ಅಪ್ ಮತ್ತು ಡ್ರಾಪ್',
                    textEn: 'Corporate doorstep executive coach pickup and return transfers',
                  },
                  {
                    icon: ShieldCheck,
                    textKn: 'ಜಿಎಸ್‌ಟಿ ಇನ್‌ವಾಯ್ಸ್ & ಅಧಿಕೃತ ಪಾರದರ್ಶಕ ಕಾರ್ಪೊರೇಟ್ ಬಿಲ್ಲಿಂಗ್',
                    textEn: 'Itemized GST invoicing and compliant procurement billing documentation',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#162E22] font-medium">
                      <div className="w-6 h-6 rounded-full bg-[#F6F3EA] text-[#D4AF37] flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{kn ? item.textKn : item.textEn}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenCorporate}
              className="w-full py-4 px-6 rounded-xl bg-[#9E3D28] hover:bg-[#853220] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95 cursor-pointer border border-[#D4AF37]/40"
            >
              <span>{kn ? 'ಕಾರ್ಪೊರೇಟ್ ಈವೆಂಟ್ ರೂಪಿಸಿ' : 'Plan Corporate Event'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
