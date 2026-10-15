import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Compass, Globe, Mail, Phone, MapPin, Building2, UtensilsCrossed, GraduationCap, Heart } from 'lucide-react';
import { AmbariElephant, KolamBorderRibbon, SikkuKolamMandala } from './SouthIndianMotifs';

interface FooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenPlanner: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onLanguageChange,
  onNavigateSection,
  onOpenPlanner,
  onOpenContact,
}) => {
  const t = translations[language];
  const isKn = language === 'kn';

  return (
    <footer className="bg-[#0E1E16] text-[#F6F3EA] border-t border-[#D4AF37]/40 pt-16 pb-12 relative overflow-hidden">
      {/* Kolam pattern overlay */}
      <div className="absolute inset-0 bg-kolam-dark opacity-15 pointer-events-none mix-blend-overlay" />
      {/* Continuous Kolam Looped Border Ribbon at top of footer */}
      <div className="absolute top-0 left-0 right-0 h-2 opacity-25 overflow-hidden pointer-events-none">
        <KolamBorderRibbon patternUnits={48} className="h-full" color="#D4AF37" dotColor="#F5D77F" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#162E22] border border-[#D4AF37]/50 flex items-center justify-center text-[#F5D77F] shadow-[0_0_10px_rgba(212,175,55,0.25)]">
                <AmbariElephant className="w-5.5 h-5.5" color="#D4AF37" />
              </div>
              <div>
                <span className="text-xl font-bold font-serif-editorial tracking-tight text-[#F6F3EA] block">
                  {isKn ? 'ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್' : 'Inchara Holidays'}
                </span>
                <span className="text-[10px] text-[#F5D77F] tracking-[0.14em] uppercase block font-medium">
                  {isKn ? 'ಅತಿಥಿ ದೇವೋ ಭವ · ಪ್ರವಾಸ & ಆತಿಥ್ಯ' : 'Atithi Devo Bhava · Travel & Hospitality'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F6F3EA]/70 leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>

            <div className="text-xs text-[#D4AF37] font-serif-editorial italic">
              {t.footer.blessing}
            </div>

            {/* Language Switcher in Footer */}
            <div className="pt-2 flex items-center gap-2 text-xs">
              <Globe className="w-3.5 h-3.5 text-[#AAB69A]" />
              <button
                type="button"
                onClick={() => onLanguageChange('kn')}
                className={`transition-colors cursor-pointer ${
                  language === 'kn' ? 'text-[#F6F3EA] font-bold underline' : 'text-[#F6F3EA]/60 hover:text-white'
                }`}
              >
                ಕನ್ನಡ
              </button>
              <span className="opacity-30">/</span>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`transition-colors cursor-pointer ${
                  language === 'en' ? 'text-[#F6F3EA] font-bold underline' : 'text-[#F6F3EA]/60 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Col 2: Services Offerings (Expanded!) */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#AAB69A] font-semibold mb-4">
              {isKn ? 'ನಮ್ಮ ಸೇವೆಗಳು' : 'Core Services'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F6F3EA]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('service-packages')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-3 h-3 text-[#D4AF37]" />
                  <span>{t.nav.packages}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('service-corporate')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Building2 className="w-3 h-3 text-[#D4AF37]" />
                  <span>{t.nav.corporate}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('service-catering')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <UtensilsCrossed className="w-3 h-3 text-[#D4AF37]" />
                  <span>{t.nav.catering}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('service-school')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-3 h-3 text-emerald-400" />
                  <span>{t.nav.school}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('services')}
                  className="text-[#F5D77F] hover:underline transition-colors text-left font-medium cursor-pointer"
                >
                  {isKn ? 'ಸಮಗ್ರ ಸೇವಾ ಅವಲೋಕನ →' : 'All Services Overview →'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Destinations & Heritage */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#AAB69A] font-semibold mb-4">
              {t.footer.popularDestinations}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F6F3EA]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('destinations')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {isKn ? 'ಕೊಡಗು (ಕೂರ್ಗ್) ಕಾಫಿ ಬೆಟ್ಟಗಳು' : 'Coorg (Kodagu) Hills'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('destinations')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {isKn ? 'ಹಂಪಿ ಶಿಲಾ ಪರಂಪರೆ (UNESCO)' : 'Hampi Heritage (UNESCO)'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('destinations')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {isKn ? 'ಗೋಕರ್ಣ ಕಡಲತೀರ & ದೇಗುಲ' : 'Gokarna Coastline'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('destinations')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {isKn ? 'ಚಿಕ್ಕಮಗಳೂರು ಮುಳ್ಳಯ್ಯನಗಿರಿ' : 'Chikkamagaluru Peaks'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('destinations')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  {isKn ? 'ಮೈಸೂರು ಅರಮನೆ & ಪರಂಪರೆ' : 'Mysuru Royal Palace'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Reach Out & Planning */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#AAB69A] font-semibold mb-4">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-3 text-xs text-[#F6F3EA]/75">
              <p className="text-[11px] text-[#AAB69A] leading-relaxed">
                {t.footer.onlineServiceNote}
              </p>
              <div>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-left font-semibold text-[#F6F3EA] hover:text-[#F5D77F] transition-colors cursor-pointer"
                >
                  {isKn ? 'ವಿಚಾರಣೆ ಕಳುಹಿಸಿ (ಸಂಪರ್ಕಿಸಿ) →' : 'Send Enquiry Note →'}
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={onOpenPlanner}
                  className="text-left text-[#F5D77F] hover:underline cursor-pointer"
                >
                  {isKn ? 'ಪ್ರವಾಸ ರೂಪಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Start Trip Planning Flow'}
                </button>
              </div>
              <div className="pt-2 text-[11px] text-[#AAB69A]/80">
                <span>WhatsApp / Call: </span>
                <span className="text-[#F6F3EA] font-mono">+91 94480 00000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F6F3EA]/50">
          <div className="flex items-center gap-2">
            <AmbariElephant className="w-5 h-5 text-[#D4AF37]/60 shrink-0" color="#D4AF37" />
            <span>{t.footer.copyright}</span>
          </div>
          <div className="text-[11px] text-center sm:text-right text-[#F5D77F]/60">
            {t.footer.disclaimer}
          </div>
        </div>
      </div>
    </footer>
  );
};
