import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  Compass,
  Menu,
  X,
  Globe,
  Calendar,
  ArrowRight,
  Building2,
  UtensilsCrossed,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Mail,
  Home as HomeIcon,
  Info
} from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenPlanner: () => void;
  onOpenContact: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenPlanner,
  onOpenContact,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];
  const isKn = language === 'kn';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      id: 'top',
      label: t.nav.home,
      isHome: true,
    },
    {
      id: 'service-packages',
      label: t.nav.packages,
      icon: Compass,
      tagKn: 'ಪಯಣ',
      tagEn: 'Travel',
    },
    {
      id: 'service-corporate',
      label: t.nav.corporate,
      icon: Building2,
      tagKn: 'ಕಾರ್ಪೊರೇಟ್',
      tagEn: 'Corporate',
    },
    {
      id: 'service-catering',
      label: t.nav.catering,
      icon: UtensilsCrossed,
      tagKn: 'ಆಹಾರ',
      tagEn: 'Catering',
    },
    {
      id: 'service-school',
      label: t.nav.school,
      icon: GraduationCap,
      tagKn: 'ಶಾಲಾ',
      tagEn: 'School',
    },
    {
      id: 'our-story',
      label: t.nav.ourStory,
      icon: Info,
    },
    {
      id: 'contact',
      label: t.nav.contact,
      isContact: true,
      icon: Mail,
    },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (link.isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.isContact) {
      onOpenContact();
    } else {
      onNavigateSection(link.id);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F6F3EA]/95 backdrop-blur-md shadow-xs border-b border-[#263F32]/10 py-3 text-[#252923]'
            : 'bg-linear-to-b from-black/60 via-black/30 to-transparent py-4 sm:py-5 text-[#F6F3EA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group whitespace-nowrap shrink-0"
              aria-label="Inchara Holidays Home"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isScrolled
                    ? 'bg-[#263F32] text-[#F6F3EA]'
                    : 'bg-[#F6F3EA]/20 text-[#F6F3EA] backdrop-blur-xs'
                }`}
              >
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight font-serif-editorial">
                  {isKn ? 'ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್' : 'Inchara Holidays'}
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] tracking-wider uppercase font-medium ${
                    isScrolled ? 'text-[#263F32]/70' : 'text-[#F6F3EA]/80'
                  }`}
                >
                  {isKn ? 'Inchara Holidays & Events' : 'ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್ & ಈವೆಂಟ್ಸ್'}
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop: lg screens and above) */}
            <nav className="hidden xl:flex items-center gap-5 2xl:gap-6 text-xs 2xl:text-sm font-medium">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-1 cursor-pointer ${
                    isScrolled
                      ? 'text-[#252923]/80 hover:text-[#263F32] decoration-[#263F32]/40'
                      : 'text-[#F6F3EA]/90 hover:text-white decoration-white/40'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Compact desktop nav for standard laptops (1024px - 1280px) */}
            <nav className="hidden lg:flex xl:hidden items-center gap-3.5 text-xs font-medium">
              {navLinks.slice(1, 6).map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-1 cursor-pointer ${
                    isScrolled
                      ? 'text-[#252923]/80 hover:text-[#263F32]'
                      : 'text-[#F6F3EA]/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Zone 3: Language Switcher & Primary Action */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Language Switcher */}
              <div
                className={`flex items-center p-0.5 rounded-lg border text-xs font-medium transition-colors ${
                  isScrolled
                    ? 'border-[#263F32]/20 bg-[#263F32]/5 text-[#252923]'
                    : 'border-white/20 bg-black/20 text-[#F6F3EA]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onLanguageChange('kn')}
                  aria-pressed={language === 'kn'}
                  className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    language === 'kn'
                      ? 'bg-[#263F32] text-[#F6F3EA] shadow-2xs font-semibold'
                      : 'hover:text-[#B96F50]'
                  }`}
                >
                  ಕನ್ನಡ
                </button>
                <span className="opacity-30 px-0.5">/</span>
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  aria-pressed={language === 'en'}
                  className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#263F32] text-[#F6F3EA] shadow-2xs font-semibold'
                      : 'hover:text-[#B96F50]'
                  }`}
                >
                  ENG
                </button>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={onOpenPlanner}
                className={`hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap shrink-0 shadow-2xs active:scale-95 cursor-pointer ${
                  isScrolled
                    ? 'bg-[#263F32] text-[#F6F3EA] hover:bg-[#1f3328]'
                    : 'bg-[#F6F3EA] text-[#263F32] hover:bg-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.nav.planTrip}</span>
              </button>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg lg:hidden transition-colors cursor-pointer ${
                  isScrolled
                    ? 'text-[#252923] hover:bg-[#263F32]/10'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
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
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#FBF9F4] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto z-10 border-l border-[#263F32]/15">
            <div>
              {/* Top Drawer Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#263F32]/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#263F32] text-[#F6F3EA] flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold font-serif-editorial text-[#263F32] text-base block leading-tight">
                      {isKn ? 'ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್' : 'Inchara Holidays'}
                    </span>
                    <span className="text-[10px] text-[#252923]/60 uppercase tracking-wider block">
                      {isKn ? 'ಪ್ರವಾಸ · ಈವೆಂಟ್ಸ್ · ಆತಿಥ್ಯ' : 'Travel · Events · Hospitality'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[#263F32]/10 text-[#252923] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language selection in mobile menu */}
              <div className="mt-4 p-2.5 bg-[#263F32]/5 rounded-xl flex items-center justify-between border border-[#263F32]/10">
                <div className="flex items-center gap-2 text-xs font-medium text-[#252923]/80">
                  <Globe className="w-3.5 h-3.5 text-[#263F32]" />
                  <span>{isKn ? 'ಭಾಷೆ / Language' : 'Language'}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() => onLanguageChange('kn')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      language === 'kn'
                        ? 'bg-[#263F32] text-[#F6F3EA] font-semibold'
                        : 'text-[#252923] hover:text-[#B96F50]'
                    }`}
                  >
                    ಕನ್ನಡ
                  </button>
                  <button
                    type="button"
                    onClick={() => onLanguageChange('en')}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      language === 'en'
                        ? 'bg-[#263F32] text-[#F6F3EA] font-semibold'
                        : 'text-[#252923] hover:text-[#B96F50]'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Section 1: Main Services with clear hierarchy */}
              <div className="mt-6">
                <div className="text-[11px] font-bold text-[#B96F50] uppercase tracking-wider px-2 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>{isKn ? 'ನಮ್ಮ ಪ್ರಮುಖ ಸೇವೆಗಳು' : 'Core Services'}</span>
                </div>
                <nav className="flex flex-col space-y-1">
                  <button
                    onClick={() => handleNavClick(navLinks[0])}
                    className="text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#252923] hover:bg-[#263F32]/8 hover:text-[#263F32] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <HomeIcon className="w-4 h-4 text-[#263F32]" />
                      <span>{t.nav.home}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#263F32]/30" />
                  </button>

                  <button
                    onClick={() => handleNavClick(navLinks[1])}
                    className="text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#252923] hover:bg-[#263F32]/8 hover:text-[#263F32] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Compass className="w-4 h-4 text-[#B96F50]" />
                      <span>{t.nav.packages}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B96F50]/15 text-[#B96F50] font-medium">
                      {isKn ? 'ಪಯಣ' : 'Travel'}
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick(navLinks[2])}
                    className="text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#252923] hover:bg-[#263F32]/8 hover:text-[#263F32] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-[#263F32]" />
                      <span>{t.nav.corporate}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#263F32]/10 text-[#263F32] font-medium">
                      {isKn ? 'ಔಟಿಂಗ್' : 'Corporate'}
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick(navLinks[3])}
                    className="text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#252923] hover:bg-[#263F32]/8 hover:text-[#263F32] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <UtensilsCrossed className="w-4 h-4 text-[#B96F50]" />
                      <span>{t.nav.catering}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B96F50]/15 text-[#B96F50] font-medium">
                      {isKn ? 'ಊಟೋಪಚಾರ' : 'Food'}
                    </span>
                  </button>

                  <button
                    onClick={() => handleNavClick(navLinks[4])}
                    className="text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-[#252923] hover:bg-[#263F32]/8 hover:text-[#263F32] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-emerald-800" />
                      <span>{t.nav.school}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium">
                      {isKn ? 'ಶೈಕ್ಷಣಿಕ' : 'Study'}
                    </span>
                  </button>
                </nav>
              </div>

              {/* Section 2: Explore & Organization */}
              <div className="mt-5 pt-4 border-t border-[#263F32]/10">
                <div className="text-[11px] font-bold text-[#263F32]/60 uppercase tracking-wider px-2 mb-2">
                  {isKn ? 'ತಾಣಗಳು & ನಮ್ಮ ಬಗ್ಗೆ' : 'Discover & About'}
                </div>
                <nav className="flex flex-col space-y-1">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateSection('destinations');
                    }}
                    className="text-left py-2 px-3 rounded-lg text-sm text-[#252923]/80 hover:bg-[#263F32]/5 hover:text-[#263F32] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{t.nav.destinations}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#263F32]/30" />
                  </button>
                  <button
                    onClick={() => handleNavClick(navLinks[5])}
                    className="text-left py-2 px-3 rounded-lg text-sm text-[#252923]/80 hover:bg-[#263F32]/5 hover:text-[#263F32] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{t.nav.ourStory}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#263F32]/30" />
                  </button>
                  <button
                    onClick={() => handleNavClick(navLinks[6])}
                    className="text-left py-2 px-3 rounded-lg text-sm text-[#252923]/80 hover:bg-[#263F32]/5 hover:text-[#263F32] transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{t.nav.contact}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#263F32]/30" />
                  </button>
                </nav>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#263F32]/10 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanner();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#263F32] text-[#F6F3EA] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1f3328] transition-colors shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.nav.planTrip}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919448000000"
                  className="py-2.5 px-3 rounded-lg border border-[#263F32]/20 text-[#263F32] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#263F32]/5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#B96F50]" />
                  <span>{isKn ? 'ಕರೆ ಮಾಡಿ' : 'Direct Call'}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="py-2.5 px-3 rounded-lg border border-[#263F32]/20 text-[#263F32] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#263F32]/5 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#263F32]" />
                  <span>{t.nav.contact}</span>
                </button>
              </div>

              <div className="text-center text-[10px] text-[#252923]/60 pt-1">
                {t.hero.trustNotice}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
