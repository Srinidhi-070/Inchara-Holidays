import React, { useRef } from 'react';
import type { Locale, SamplePackage } from '../../types';
import { Printer, Download, X, ShieldCheck, Utensils, Bus, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { AmbariElephant, SikkuKolamMandala } from '../SouthIndianMotifs';

interface ItineraryBrochureModalProps {
  pkg: SamplePackage;
  locale: Locale;
  onClose: () => void;
}

export const ItineraryBrochureModal: React.FC<ItineraryBrochureModalProps> = ({ pkg, locale, onClose }) => {
  const isKn = locale === 'kn';
  const printContentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white sm:rounded-3xl shadow-2xl flex flex-col my-auto max-h-[95vh] overflow-hidden border border-[#D4AF37]/40 print:max-w-none print:max-h-none print:border-none print:shadow-none print:rounded-none">
        {/* Modal Top Control Bar (Hidden during print) */}
        <div className="p-4 bg-[#162E22] text-[#F6F3EA] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <AmbariElephant className="w-6 h-6 text-[#F5D77F]" />
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-[#F5D77F]">
                {isKn ? 'ಅಧಿಕೃತ ಪ್ರವಾಸ ವಿವರ ಬ್ರೋಷರ್' : 'Official Itinerary Document & Brochure'}
              </span>
              <div className="text-[11px] text-white/70">
                {isKn ? pkg.titleKn : pkg.titleEn}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-[#162E22] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{isKn ? 'ಮುದ್ರಿಸಿ / PDF ಡೌನ್‌ಲೋಡ್' : 'Print / Save as PDF'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div
          ref={printContentRef}
          className="p-6 sm:p-10 overflow-y-auto space-y-8 text-[#252923] bg-[#FCFBF8] print:p-0 print:overflow-visible print:bg-white"
        >
          {/* Document Letterhead */}
          <header className="border-b-2 border-[#162E22] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-[#162E22] border border-[#D4AF37] flex items-center justify-center text-[#F5D77F] shrink-0">
                <AmbariElephant className="w-8 h-8 text-[#F5D77F]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#162E22] tracking-tight leading-none">
                  INCHARA HOLIDAYS
                </h1>
                <p className="text-xs text-[#9E3D28] font-semibold mt-1">
                  ಇಂಚರ ಹಾಲಿಡೇಸ್ · Reg: KA-TO-2024-88419
                </p>
                <p className="text-[11px] text-[#252923]/70 font-normal">
                  Approved Karnataka Tourism, Heritage & Pure Veg Hospitality Provider
                </p>
              </div>
            </div>

            <div className="text-right text-xs space-y-0.5 text-[#252923]/80">
              <div className="font-semibold text-[#162E22]">Head Office: Sayyaji Rao Road, Mysuru - 570001</div>
              <div>Phone: +91 94480 00000 · WhatsApp Desk: +91 94480 00000</div>
              <div>Email: hello@incharaholidays.com · www.incharaholidays.com</div>
            </div>
          </header>

          {/* Package Title Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-[#162E22] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[180px] border border-[#D4AF37]/40 shadow-sm print:bg-[#162E22] print:text-white">
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#162E22] font-bold text-xs uppercase tracking-wider">
                {isKn ? pkg.badgeKn : pkg.badgeEn}
              </span>
              <span className="font-mono text-xs font-semibold text-[#F5D77F] bg-black/40 px-3 py-1 rounded-full">
                Duration: {isKn ? pkg.durationKn : pkg.durationEn}
              </span>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F6F3EA] leading-tight">
                {isKn ? pkg.titleKn : pkg.titleEn}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-2 max-w-2xl leading-relaxed">
                Curated South Indian heritage itinerary with sanitized private transport, verified heritage stays, and pure vegetarian cuisine.
              </p>
            </div>
          </div>

          {/* Itinerary Highlights */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9E3D28] border-b border-[#D4AF37]/30 pb-2">
              <span>✦</span>
              <h3>{isKn ? 'ಪಯಣದ ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು' : 'Key Itinerary Highlights'}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {(isKn ? pkg.highlightsKn : pkg.highlightsEn).map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#263F32]/10 shadow-xs">
                  <span className="text-[#D4AF37] font-bold">✦</span>
                  <span className="text-[#162E22] font-medium leading-relaxed">{hl}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Inclusions & Pure Veg Guarantee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inclusions */}
            <section className="p-5 rounded-2xl bg-white border border-[#263F32]/10 space-y-3 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#162E22] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{isKn ? 'ಪ್ರವಾಸದಲ್ಲಿ ಸೇರಿರುವ ಸೌಲಭ್ಯಗಳು' : 'Included in Package'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#252923]/80">
                {(isKn ? pkg.inclusionsKn : pkg.inclusionsEn).map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Incharas 3 Pillars of Trust */}
            <section className="p-5 rounded-2xl bg-[#F6F3EA] border border-[#D4AF37]/30 space-y-3.5 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#9E3D28] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>The Inchara Hospitality Commitment</span>
              </h4>
              <div className="space-y-2.5 text-xs text-[#252923]/80 leading-relaxed">
                <div className="flex items-start gap-2">
                  <Utensils className="w-4 h-4 text-[#9E3D28] shrink-0 mt-0.5" />
                  <span><strong>100% Pure Vegetarian:</strong> Traditional banana leaf pankti feasts, satvic preparations, and zero non-vegetarian cross-contamination.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Bus className="w-4 h-4 text-[#162E22] shrink-0 mt-0.5" />
                  <span><strong>Audited Fleet & Chauffeurs:</strong> GPS-equipped air-conditioned coaches, sedans & tempo travellers with verified polite drivers.</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Honest Quotations:</strong> Zero commercial shop stops, zero hidden surcharges, itemized GST invoicing.</span>
                </div>
              </div>
            </section>
          </div>

          {/* Price Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
            <strong>Customization Notice:</strong> {isKn ? pkg.samplePriceDisclaimerKn : pkg.samplePriceDisclaimerEn}
          </div>

          {/* Document Footer */}
          <footer className="border-t border-[#263F32]/15 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#252923]/60">
            <div>© {new Date().getFullYear()} Inchara Holidays. All rights reserved. Registered with Govt of Karnataka Tourism.</div>
            <div className="font-mono text-[10px]">Doc Ref: ICH-BRO-{pkg.id.toUpperCase()}-{new Date().getFullYear()}</div>
          </footer>
        </div>
      </div>
    </div>
  );
};
