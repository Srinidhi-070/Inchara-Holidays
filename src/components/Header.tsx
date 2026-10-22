import React, { useState, useEffect } from 'react';
import { Language, Concept } from '../types';
import { translations } from '../data/translations';
import {
  Compass,
  X,
  Globe,
  Building2,
  UtensilsCrossed,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Mail,
  Home as HomeIcon,
  Info,
  ArrowRight
} from 'lucide-react';

export function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? 'brand-light' : ''}`}
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <Mark />
      <span>
        <strong lang="kn">ಇಂಚರ ಹಾಲಿಡೇಸ್</strong>
        <small>INCHARA HOLIDAYS</small>
      </span>
    </a>
  );
}

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenPlanner: () => void;
  onOpenContact: () => void;
  onNavigateSection: (sectionId: string) => void;
  concept?: Concept;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenPlanner,
  onOpenContact,
  onNavigateSection,
  concept = 'A',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[language];
  const isKn = language === 'kn';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkNav = concept === 'B' && !isScrolled;

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'contact') {
      onOpenContact();
    } else {
      onNavigateSection(sectionId);
    }
  };

  return (
    <>
      <header
        className={`header ${isScrolled ? 'bg-[#162e22]/95 backdrop-blur-md shadow-lg !fixed' : ''}`}
      >
        <Brand light={!isDarkNav} />

        <nav
          className={`nav ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Main navigation"
        >
          <a
            href="#destinations"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('destinations');
            }}
          >
            {isKn ? 'ತಾಣಗಳು' : 'Destinations'}
          </a>
          <a
            href="#experiences"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('experiences');
            }}
          >
            {isKn ? 'ಅನುಭವಗಳು' : 'Experiences'}
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('services');
            }}
          >
            {isKn ? 'ಕಾರ್ಪೊರೇಟ್ ಮತ್ತು ಕ್ಯಾಟರಿಂಗ್' : 'Corporate & Catering'}
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('services');
            }}
          >
            {isKn ? 'ಶಾಲಾ ಪ್ರವಾಸಗಳು' : 'School Trips'}
          </a>
          <a
            href="#difference"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('difference');
            }}
          >
            {isKn ? 'ನಮ್ಮ ಕಥೆ' : 'Our Story'}
          </a>
        </nav>

        <div className="header-actions">
          {/* Language Toggle */}
          <div
            aria-label="Select language"
            className="language-toggle"
            role="group"
          >
            <button
              aria-pressed={language === 'kn'}
              className={language === 'kn' ? 'active' : ''}
              lang="kn"
              onClick={() => onLanguageChange('kn')}
              type="button"
            >
              ಕನ್ನಡ
            </button>
            <i />
            <button
              aria-pressed={language === 'en'}
              className={language === 'en' ? 'active' : ''}
              onClick={() => onLanguageChange('en')}
              type="button"
            >
              EN
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            className="button button-gold hidden sm:inline-flex"
            onClick={onOpenPlanner}
          >
            <span>{isKn ? 'ಪ್ರಯಾಣ ರೂಪಿಸಿ' : 'Plan your journey'}</span>
            <span aria-hidden="true">↗</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle navigation"
            className="menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#162e22] text-[#f6f3ea] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 border-l border-[#d4af37]/25">
            <div>
              {/* Top Drawer Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <Brand light />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[#f5d77f]" />
                </button>
              </div>

              {/* Language selection in mobile menu */}
              <div className="mt-4 p-3 bg-white/5 rounded-xl flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-2 text-xs font-medium text-[#f5d77f]">
                  <Globe className="w-4 h-4 text-[#d4af37]" />
                  <span>{isKn ? 'ಭಾಷೆ / Language' : 'Language'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => onLanguageChange('kn')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      language === 'kn'
                        ? 'bg-[#d4af37] text-[#162e22] font-bold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    ಕನ್ನಡ
                  </button>
                  <button
                    type="button"
                    onClick={() => onLanguageChange('en')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      language === 'en'
                        ? 'bg-[#d4af37] text-[#162e22] font-bold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Core Links */}
              <div className="mt-6 space-y-1">
                <div className="text-[11px] font-bold text-[#f5d77f] uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  <span>{isKn ? 'ಪರಿವಿಡಿ' : 'Navigation'}</span>
                </div>
                <button
                  onClick={() => handleNavClick('top')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HomeIcon className="w-4 h-4 text-[#d4af37]" />
                    <span>{t.nav.home}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </button>
                <button
                  onClick={() => handleNavClick('destinations')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#d4af37]" />
                    <span>{isKn ? 'ತಾಣಗಳು' : 'Destinations'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </button>
                <button
                  onClick={() => handleNavClick('experiences')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span>{isKn ? 'ಅನುಭವಗಳು' : 'Experiences'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </button>
                <button
                  onClick={() => handleNavClick('services')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-[#d4af37]" />
                    <span>{isKn ? 'ಕಾರ್ಪೊರೇಟ್ ಮತ್ತು ಕ್ಯಾಟರಿಂಗ್' : 'Corporate & Catering'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </button>
                <button
                  onClick={() => handleNavClick('services')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-[#d4af37]" />
                    <span>{isKn ? 'ಶಾಲಾ ಪ್ರವಾಸಗಳು' : 'School Trips'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </button>
                <button
                  onClick={() => handleNavClick('difference')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-[#d4af37]" />
                    <span>{isKn ? 'ನಮ್ಮ ಕಥೆ' : 'Our Story'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </button>
              </div>

              {/* Action Buttons in Drawer */}
              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPlanner();
                  }}
                  className="w-full button button-gold justify-center gap-2 text-center"
                >
                  <span>{isKn ? 'ಪ್ರಯಾಣ ರೂಪಿಸಿ' : 'Plan your journey'}</span>
                  <span>↗</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full button button-outline justify-center gap-2 text-center"
                >
                  <span>{isKn ? 'ಸಂಪರ್ಕಿಸಿ' : 'Contact Us'}</span>
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-white/10 text-center text-xs text-[#f5d77f]/70">
              <p>ಇಂಚರ ಹಾಲಿಡೇಸ್ · INCHARA HOLIDAYS</p>
              <p className="mt-1 text-[11px] text-white/50">Travel slowly. Remember deeply.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
