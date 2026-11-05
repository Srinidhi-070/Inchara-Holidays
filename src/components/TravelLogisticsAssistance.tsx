/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import { LotusIcon, AmbariElephant, SikkuKolamMandala } from './SouthIndianMotifs';
import { Bus, Car, FileCheck, ShieldAlert, ArrowRight, CheckCircle2, Train, Ticket } from 'lucide-react';

interface TravelLogisticsAssistanceProps {
  language: Language;
  onOpenTransport: () => void;
  onOpenVisaPassport: () => void;
}

export const TravelLogisticsAssistance: React.FC<TravelLogisticsAssistanceProps> = ({
  language,
  onOpenTransport,
  onOpenVisaPassport,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const kn = language === 'kn';

  return (
    <section id="transport-visa" className="py-24 sm:py-32 bg-[#F6F3EA] bg-kolam-subtle relative overflow-hidden border-b border-[#263F32]/10">
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
            <span>{kn ? 'ಸಾರಿಗೆ & ದಾಖಲೆಗಳ ನೆರವು' : 'Transit Fleets & Document Advisory'}</span>
          </div>
          <h2 className="text-display-md font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.18]">
            {kn ? (
              <>
                ಸುರಕ್ಷಿತ ವಾಹನಗಳು &{' '}
                <em className="text-[#9E3D28] font-normal">ವಿಶ್ವಾಸಾರ್ಹ ಪ್ರವಾಸ ದಾಖಲೆ ನೆರವು.</em>
              </>
            ) : (
              <>
                Audited Fleets &{' '}
                <em className="text-[#9E3D28] font-normal">Trusted Documentation Guidance.</em>
              </>
            )}
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-[#252923]/75 leading-relaxed font-normal">
            {kn
              ? 'ಹವಾನಿಯಂತ್ರಿತ ಕಾರುಗಳು, ಟೆಂಪೋ ಟ್ರಾವೆಲರ್‌ಗಳು, ದೊಡ್ಡ ಕೋಚ್‌ಗಳ ಬಾಡಿಗೆ, ರೈಲು/ಬಸ್ಸು ಟಿಕೆಟ್ ಮಾಹಿತಿ ಹಾಗೂ ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪ್ರವಾಸಿ ವೀಸಾ ಮತ್ತು ಪಾಸ್‌ಪೋರ್ಟ್ ಅರ್ಜಿ ಸಮಾಲೋಚನೆ.'
              : 'Sanitized chauffeur-driven sedans, Innova fleets, Tempo Travellers, intercity coach rentals, alongside authorized guidance for visas, passports, and travel documentation.'}
          </p>
        </motion.div>

        {/* 2 Focused Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1. Fleet & Bookings Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white border border-[#263F32]/12 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#162E22] text-[#F5D77F] flex items-center justify-center shadow-md">
                  <Bus className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#162E22]/10 text-[#162E22] text-xs font-bold uppercase tracking-wider">
                  {kn ? 'ಸಾರಿಗೆ ಬಾಡಿಗೆ & ಟಿಕೆಟ್ ನೆರವು' : 'Fleets & Transit'}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif-editorial text-[#162E22] mb-3">
                {kn ? 'ವಾಹನ ಬಾಡಿಗೆ & ಟಿಕೆಟ್ ಬುಕಿಂಗ್ ನೆರವು' : 'Chauffeur Fleet & Ticket Assistance'}
              </h3>
              <p className="text-sm text-[#252923]/75 leading-relaxed font-normal mb-6">
                {kn
                  ? 'ಸೆಡಾನ್, ಇನೋವಾ ಕ್ರಿಸ್ಟಾ, ೧೨ ರಿಂದ ೨೬ ಸೀಟುಗಳ ಟೆಂಪೋ ಟ್ರಾವೆಲರ್, ಮಿನಿ ಬಸ್ಸುಗಳು ಹಾಗೂ ರೈಲು/ಬಸ್ಸು ಟಿಕೆಟ್ ಕಾಯ್ದಿರಿಸುವಿಕೆಯ ವಿಶ್ವಾಸಾರ್ಹ ನೆರವು.'
                  : 'Well-maintained fleet for airport transfers, outstation pilgrimages, and family events, coupled with ticketing consultation.'}
              </p>

              {/* Fleet Spec Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { titleKn: 'ಇನೋವಾ ಕ್ರಿಸ್ಟಾ', titleEn: 'Innova Crysta', subKn: '೬-೭ ಸೀಟುಗಳು · ಕುಟುಂಬ ಸ್ನೇಹಿ', subEn: '6-7 Seater Luxury SUV' },
                  { titleKn: 'ಟೆಂಪೋ ಟ್ರಾವೆಲರ್', titleEn: 'Tempo Traveller', subKn: '೧೨-೨೬ ಸೀಟುಗಳು · ವಿಶಾಲ ಲಗೇಜ್', subEn: '12-26 Seater Group Van' },
                  { titleKn: 'ಲಕ್ಸುರಿ ಟೂರಿಸ್ಟ್ ಕೋಚ್', titleEn: 'Luxury Coaches', subKn: '೩೦-೫೦ ಸೀಟುಗಳು · ಎಸಿ ಪುಷ್-ಬ್ಯಾಕ್', subEn: '30-50 Seater Push-back' },
                  { titleKn: 'ರೈಲು & ಬಸ್ಸು ನೆರವು', titleEn: 'Train & Bus Guidance', subKn: 'ಸೀಟು ಮಾಹಿತಿ & ನಿಲ್ದಾಣ ಸಾರಿಗೆ', subEn: 'Route & Schedule Advisory' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#F6F3EA] border border-[#263F32]/8 space-y-1">
                    <div className="text-xs font-bold text-[#162E22]">{kn ? item.titleKn : item.titleEn}</div>
                    <div className="text-[11px] text-[#252923]/65">{kn ? item.subKn : item.subEn}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenTransport}
              className="w-full py-4 px-6 min-h-[48px] rounded-xl bg-[#162E22] hover:bg-[#263F32] text-[#F5D77F] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95 cursor-pointer border border-[#D4AF37]/50 focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <span>{kn ? 'ವಾಹನ ಬಾಡಿಗೆ ವಿಚಾರಿಸಿ' : 'Book Vehicle or Transit'}</span>
              <ArrowRight className="w-4 h-4 text-[#F5D77F]" />
            </button>
          </motion.div>

          {/* 2. Visa & Passport Assistance Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-white border border-[#263F32]/12 p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#9E3D28] to-transparent" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#9E3D28] text-white flex items-center justify-center shadow-md">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#9E3D28]/10 text-[#9E3D28] text-xs font-bold uppercase tracking-wider">
                  {kn ? 'ದಾಖಲೆ ಸಮಾಲೋಚನೆ' : 'Document Advisory'}
                </span>
              </div>

              <h3 className="text-2xl font-bold font-serif-editorial text-[#162E22] mb-3">
                {kn ? 'ಪ್ರವಾಸಿ ವೀಸಾ & ಪಾಸ್‌ಪೋರ್ಟ್ ನೆರವು' : 'Tourist Visa & Passport Consultation'}
              </h3>
              <p className="text-sm text-[#252923]/75 leading-relaxed font-normal mb-5">
                {kn
                  ? 'ದುಬೈ, ಆಗ್ನೇಯ ಏಷ್ಯಾ ಮತ್ತು ಯೂರೋಪ್ ಪ್ರವಾಸಿ ವೀಸಾ ಅರ್ಜಿ ನೆರವು, ಪಾಸ್‌ಪೋರ್ಟ್ ಅರ್ಜಿ/ನವೀಕರಣ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಪ್ರವಾಸಿ ವಿಮೆ ಸಲಹೆ.'
                  : 'Professional consultation for tourist visas, fresh passport applications, renewals, and travel insurance orientation.'}
              </p>

              {/* Security Banner */}
              <div className="p-3.5 rounded-2xl bg-[#FBF8F1] border border-[#263F32]/12 space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9E3D28]">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{kn ? 'ಸಂಪೂರ್ಣ ಪಾರದರ್ಶಕತೆ & ಗೌಪ್ಯತೆ' : 'Privacy & Security Standards'}</span>
                </div>
                <p className="text-xs text-[#252923]/75 leading-relaxed font-normal">
                  {kn
                    ? 'ಸೂಕ್ಷ್ಮ ಗುರುತಿನ ದಾಖಲೆಗಳನ್ನು ಆನ್‌ಲೈನ್ ಫಾರ್ಮ್‌ನಲ್ಲಿ ಪಡೆಯುವುದಿಲ್ಲ. ನಮ್ಮ ಪರಿಶೀಲಿಸಿದ ಅಧಿಕಾರಿಗಳು ನೇರವಾಗಿ ನಿಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ ಅಧಿಕೃತ ಕಚೇರಿಗಳಲ್ಲಿ ಸಲ್ಲಿಸಲು ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾರೆ.'
                    : 'We do not collect sensitive identity scans on public forms. Verified consultants guide you directly through official embassy and passport seva portals.'}
                </p>
              </div>

              <div className="space-y-2.5 mb-8">
                {[
                  kn ? 'ಇ-ವೀಸಾ (eVisa) ದಾಖಲೆಗಳ ಪೂರ್ವ ಪರಿಶೀಲನೆ' : 'eVisa documentation checklist pre-audits',
                  kn ? 'ಪಾಸ್‌ಪೋರ್ಟ್ ಸೇವಾ ಕೇಂದ್ರದ (PSK) ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ನೆರವು' : 'Passport Seva Kendra (PSK) appointment assistance',
                  kn ? 'ಪ್ರವಾಸಿ ವೈದ್ಯಕೀಯ ವಿಮೆ (Travel Insurance) ಆಯ್ಕೆಗಳು' : 'Comprehensive overseas medical travel insurance',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#162E22]">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenVisaPassport}
              className="w-full py-4 px-6 min-h-[48px] rounded-xl bg-[#9E3D28] hover:bg-[#853220] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-95 cursor-pointer border border-[#D4AF37]/40 focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <span>{kn ? 'ವೀಸಾ / ಪಾಸ್‌ಪೋರ್ಟ್ ನೆರವು ವಿಚಾರಿಸಿ' : 'Request Visa & Passport Guidance'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
