import React, { useState, useEffect } from 'react';
import { Language, Concept } from '../types';
import { ServiceCategoryId } from '../types/inquiry';
import { translations } from '../data/translations';
import { smoothScrollTo } from '../utils/smoothScroll';
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
  ArrowRight,
  Shield,
  Layers,
  PackageCheck,
  CheckCircle2,
  HelpCircle
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

export function Brand({
  light = false,
  onNavigate,
}: {
  light?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <a
      className={`brand ${light ? 'brand-light' : ''}`}
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        if (onNavigate) {
          onNavigate();
        } else {
          smoothScrollTo('top');
        }
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
  onOpenEnquiry?: (category?: ServiceCategoryId) => void;
  onOpenAdmin?: () => void;
  onNavigateSection: (sectionId: string) => void;
  concept?: Concept;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenPlanner,
  onOpenContact,
  onOpenEnquiry,
  onOpenAdmin,
  onNavigateSection,
  concept = 'A',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('top');
  const t = translations[language];
  const isKn = language === 'kn';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollY = window.scrollY;
      const headerOffset = 160;

      const howItWorksEl = document.getElementById('how-it-works');
      const whyUsEl = document.getElementById('why-us');
      const cateringEl = document.getElementById('catering-showcase');
      const transportEl = document.getElementById('transport-visa');
      const instEl = document.getElementById('institutional-corporate');
      const packagesEl = document.getElementById('packages');
      const destinationsEl = document.getElementById('destinations');
      const servicesEl = document.getElementById('services');

      if (howItWorksEl && scrollY >= howItWorksEl.offsetTop - headerOffset) {
        setActiveSection('how-it-works');
      } else if (whyUsEl && scrollY >= whyUsEl.offsetTop - headerOffset) {
        setActiveSection('why-us');
      } else if (cateringEl && scrollY >= cateringEl.offsetTop - headerOffset) {
        setActiveSection('catering-showcase');
      } else if (transportEl && scrollY >= transportEl.offsetTop - headerOffset) {
        setActiveSection('transport-visa');
      } else if (instEl && scrollY >= instEl.offsetTop - headerOffset) {
        setActiveSection('institutional-corporate');
      } else if (packagesEl && scrollY >= packagesEl.offsetTop - headerOffset) {
        setActiveSection('packages');
      } else if (destinationsEl && scrollY >= destinationsEl.offsetTop - headerOffset) {
        setActiveSection('destinations');
      } else if (servicesEl && scrollY >= servicesEl.offsetTop - headerOffset) {
        setActiveSection('services');
      } else {
        setActiveSection('top');
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 1140) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isDarkNav = concept === 'B' && !isScrolled;

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (sectionId === 'contact') {
      onOpenContact();
    } else {
      setActiveSection(sectionId);
      smoothScrollTo(sectionId);
    }
  };

  const handlePrimaryCta = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry('holidays');
    } else {
      onOpenPlanner();
    }
  };

  return (
    <>
      <header
        className={`header ${isScrolled ? 'bg-[#162e22]/95 backdrop-blur-md shadow-lg !fixed' : ''}`}
      >
        <Brand light={!isDarkNav} onNavigate={() => handleNavClick('top')} />

        <nav
          className={`nav ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Main navigation"
        >
          <a
            href="#destinations"
            className={`nav-link ${activeSection === 'destinations' ? 'nav-link-active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('destinations');
            }}
          >
            {isKn ? 'ತಾಣಗಳು' : 'Destinations'}
          </a>

          <a
            href="#packages"
            className={`nav-link ${activeSection === 'packages' ? 'nav-link-active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('packages');
            }}
          >
            {isKn ? 'ಪ್ಯಾಕೇಜ್‌ಗಳು' : 'Packages'}
          </a>

          <a
            href="#services"
            className={`nav-link ${activeSection === 'services' ? 'nav-link-active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('services');
            }}
          >
            {isKn ? 'ಸೇವೆಗಳು' : 'Services'}
          </a>

          <a
            href="#institutional-corporate"
            className={`nav-link ${activeSection === 'institutional-corporate' ? 'nav-link-active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('institutional-corporate');
            }}
          >
            {isKn ? 'ಕಾರ್ಪೊರೇಟ್ & ಸಾಂಸ್ಥಿಕ' : 'Corporate & Institutions'}
          </a>

          <a
            href="#why-us"
            className={`nav-link ${activeSection === 'why-us' ? 'nav-link-active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('why-us');
            }}
          >
            {isKn ? 'ನಮ್ಮ ವೈಶಿಷ್ಟ್ಯ' : 'Why Us'}
          </a>

          <a
            href="#how-it-works"
            className={`nav-link ${activeSection === 'how-it-works' ? 'nav-link-active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('how-it-works');
            }}
          >
            {isKn ? 'ಹೇಗೆ?' : 'How It Works'}
          </a>
        </nav>

        <div className="header-actions">
          {/* Staff Portal discreet icon button */}
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center justify-center p-2 rounded-full text-[#F5D77F]/75 hover:text-[#F5D77F] hover:bg-white/10 transition-colors"
              title={isKn ? 'ಸಿಬ್ಬಂದಿ ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್' : 'Staff Admin Portal'}
              aria-label={isKn ? 'ಸಿಬ್ಬಂದಿ ನಿರ್ವಾಹಕ ಪೋರ್ಟಲ್' : 'Staff Admin Portal'}
            >
              <Shield className="w-4 h-4 text-[#D4AF37]" />
            </button>
          )}

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
            onClick={handlePrimaryCta}
          >
            <span>{isKn ? 'ಪ್ರವಾಸ ವಿಚಾರಣೆ' : 'Enquire Now'}</span>
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
        <div className="fixed inset-0 z-50">
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
                  onClick={() => handleNavClick('packages')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <PackageCheck className="w-4 h-4 text-[#d4af37]" />
                    <span>{isKn ? 'ಪ್ಯಾಕೇಜ್‌ಗಳು' : 'Packages'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </button>
                <button
                  onClick={() => handleNavClick('services')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-[#d4af37]" />
                    <span>{isKn ? '೬ ಸೇವಾ ವರ್ಗಗಳು' : 'All 6 Services'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </button>
                <button
                  onClick={() => handleNavClick('institutional-corporate')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-[#d4af37]" />
                    <span>{isKn ? 'ಸಾಂಸ್ಥಿಕ & ಕಾರ್ಪೊರೇಟ್' : 'Institutional & Corporate'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </button>
                <button
                  onClick={() => handleNavClick('why-us')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    <span>{isKn ? 'ನಮ್ಮ ವೈಶಿಷ್ಟ್ಯ' : 'Why Inchara'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                </button>
                <button
                  onClick={() => handleNavClick('how-it-works')}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#d4af37]" />
                    <span>{isKn ? 'ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ' : 'How It Works'}</span>
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
                    handlePrimaryCta();
                  }}
                  className="w-full button button-gold justify-center gap-2 text-center"
                >
                  <span>{isKn ? 'ಪ್ರವಾಸ ವಿಚಾರಣೆ' : 'Enquire Now'}</span>
                  <span>↗</span>
                </button>

                {onOpenAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full button button-outline justify-center gap-2 text-center border-[#D4AF37]/40 text-[#F5D77F]"
                  >
                    <Shield className="w-4 h-4 text-[#D4AF37]" />
                    <span>{isKn ? 'ಸಿಬ್ಬಂದಿ ಲಾಗಿನ್' : 'Staff Admin Portal'}</span>
                  </button>
                )}

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