import React from 'react';
import { Language } from '../types';
import { ServiceCategoryId } from '../types/inquiry';
import { brandConfig, getWhatsAppInquiryUrl } from '../config/brand';
import { Mark } from './Header';
import { Shield, Phone, Mail, MessageCircle, MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenPlanner: () => void;
  onOpenContact: () => void;
  onOpenCategoryEnquiry?: (category: ServiceCategoryId) => void;
  onOpenAdmin?: () => void;
  onOpenCorporate?: () => void;
  onOpenCatering?: () => void;
  onOpenSchool?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onLanguageChange,
  onNavigateSection,
  onOpenPlanner,
  onOpenContact,
  onOpenCategoryEnquiry,
  onOpenAdmin,
  onOpenCorporate,
  onOpenCatering,
  onOpenSchool,
}) => {
  const kn = language === 'kn';

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'contact') {
      onOpenContact();
    } else {
      onNavigateSection(sectionId);
    }
  };

  const handleCategoryClick = (catId: ServiceCategoryId) => {
    if (onOpenCategoryEnquiry) {
      onOpenCategoryEnquiry(catId);
    } else {
      if (catId === 'corporate' && onOpenCorporate) onOpenCorporate();
      else if (catId === 'catering' && onOpenCatering) onOpenCatering();
      else if (catId === 'educational' && onOpenSchool) onOpenSchool();
      else onOpenPlanner();
    }
  };

  const whatsappUrl = getWhatsAppInquiryUrl(
    kn
      ? 'ನಮಸ್ಕಾರ ಇಂಚರ ಹಾಲಿಡೇಸ್, ನಿಮ್ಮ ಪ್ರವಾಸ ಸೇವೆಗಳ ಬಗ್ಗೆ ವಿಚಾರಿಸಲು ಬಯಸುತ್ತೇನೆ.'
      : 'Hello Inchara Holidays, I would like to inquire about your travel services.'
  );

  return (
    <footer className="footer">
      {/* Full-bleed photo invitation banner */}
      <div className="footer-image relative w-full overflow-hidden flex items-center justify-center text-center">
        {/* Cinematic Background Image */}
        <img
          alt="Misty tea fields at dawn in Western Ghats"
          src="https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?auto=format&fit=crop&w=2400&q=85"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] filter brightness-[0.88] contrast-[1.05]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/hero_western_ghats_1791795450720.jpg';
          }}
        />

        {/* Multi-tier Atmospheric Lighting & Vignette Scrims */}
        {/* Top edge soft blend from preceding section */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A1810]/75 via-[#0A1810]/30 to-transparent pointer-events-none" />

        {/* Bottom edge soft blend into footer directory */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0F261A] via-[#0F261A]/85 to-transparent pointer-events-none" />

        {/* Atmospheric central vignette for readability without muddying the landscape */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,22,14,0.45)_0%,rgba(6,18,11,0.72)_100%)] pointer-events-none" />

        {/* Warm Mysore gold ambient atmospheric glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[540px] h-80 sm:h-[540px] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 flex flex-col items-center">
          {/* Eyebrow with Kasavu Gold Accents */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            <span className="w-6 sm:w-10 h-px bg-gradient-to-r from-transparent to-[#F5D77F]/75" />
            <span className="footer-image-eyebrow text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#F5D77F] uppercase font-sans">
              {kn ? 'ನಿಮ್ಮ ಕಥೆ ಕಾಯುತ್ತಿದೆ' : 'YOUR STORY IS WAITING'}
            </span>
            <span className="w-6 sm:w-10 h-px bg-gradient-to-l from-transparent to-[#F5D77F]/75" />
          </div>

          {/* Headline - Balanced Typography across all ratios */}
          <h2 className="footer-image-title text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-normal text-white tracking-tight leading-[1.18] sm:leading-[1.14] max-w-2xl text-balance drop-shadow-md">
            {kn
              ? 'ನಿಮ್ಮ ಮನಸ್ಸು ಮುಂದೆ ಎಲ್ಲಿಗೆ ಕರೆದೊಯ್ಯುತ್ತದೆ?'
              : 'Where will your heart take you next?'}
          </h2>

          {/* Subtitle */}
          <p
            lang={kn ? 'kn' : 'en'}
            className="footer-image-copy mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/85 max-w-xl mx-auto leading-relaxed font-normal drop-shadow-sm text-balance"
          >
            {kn
              ? 'ನಿಮ್ಮ ಮುಂದಿನ ಪ್ರಯಾಣ ಇಲ್ಲಿಂದ ಆರಂಭವಾಗುತ್ತದೆ.'
              : 'Thoughtful journeys, genuine encounters, and hospitality from the heart.'}
          </p>

          {/* High-Contrast CTA Button */}
          <button
            type="button"
            className="footer-image-cta group mt-7 sm:mt-9 inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] hover:brightness-105 active:scale-95 shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer border border-[#F5D77F]/60"
            onClick={() => handleCategoryClick('holidays')}
          >
            <span className="text-[#12261C] font-bold">
              {kn ? 'ಪ್ರವಾಸ ವಿಚಾರಣೆ' : 'Enquire Now'}
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#12261C] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Comprehensive 4-column directory */}
      <div className="footer-main section-pad">
        <div className="footer-brand">
          <a
            className="brand brand-light"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onNavigateSection('top');
            }}
          >
            <Mark />
            <span>
              <strong lang="kn">ಇಂಚರ ಹಾಲಿಡೇಸ್</strong>
              <small>INCHARA HOLIDAYS</small>
            </span>
          </a>
          <p>
            {kn
              ? 'ಚಿಂತನಶೀಲ ಪ್ರಯಾಣಗಳು, ನೈಜ ಅನುಭವಗಳು ಮತ್ತು ಹೃದಯಸ್ಪರ್ಶಿ ಆತಿಥ್ಯ.'
              : 'Thoughtful journeys, genuine encounters,\nand hospitality from the heart.'}
          </p>
          
          <div className="mt-4 space-y-2 text-xs text-[#F6F3EA]/75">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a href={`mailto:${brandConfig.email}`} className="hover:text-white transition-colors">
                {brandConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <a href={`tel:${brandConfig.phoneRaw}`} className="hover:text-white transition-colors">
                {brandConfig.phoneDisplay}
              </a>
            </div>
            <div className="flex items-start gap-2 pt-1 text-[11px] leading-relaxed text-[#F6F3EA]/60">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>{kn ? brandConfig.addressKn : brandConfig.addressEn}</span>
            </div>
          </div>
        </div>

        <div className="footer-links">
          {/* Column 1: Explore Sections */}
          <div>
            <span>{kn ? 'ತಾಣಗಳು & ವಿವರ' : 'EXPLORE'}</span>
            <a
              href="#destinations"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('destinations');
              }}
            >
              {kn ? 'ತಾಣಗಳು' : 'Destinations'}
            </a>
            <a
              href="#packages"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('packages');
              }}
            >
              {kn ? 'ವಿಶೇಷ ಪ್ಯಾಕೇಜ್‌ಗಳು' : 'Curated Packages'}
            </a>
            <a
              href="#institutional-corporate"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('institutional-corporate');
              }}
            >
              {kn ? 'ಸಾಂಸ್ಥಿಕ & ಕಾರ್ಪೊರೇಟ್' : 'Institutions & Corporate'}
            </a>
            <a
              href="#transport-visa"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('transport-visa');
              }}
            >
              {kn ? 'ಸಾರಿಗೆ & ವೀಸಾ ನೆರವು' : 'Transit & Visa Guidance'}
            </a>
            <a
              href="#why-us"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('why-us');
              }}
            >
              {kn ? 'ನಮ್ಮ ವೈಶಿಷ್ಟ್ಯ' : 'Why Inchara'}
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('how-it-works');
              }}
            >
              {kn ? 'ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ' : 'How It Works'}
            </a>
          </div>

          {/* Column 2: All 6 Service Categories */}
          <div>
            <span>{kn ? '೬ ಸೇವಾ ವರ್ಗಗಳು' : 'SERVICES'}</span>
            <button
              type="button"
              className="cursor-pointer hover:underline text-left"
              onClick={() => handleCategoryClick('holidays')}
            >
              {kn ? '೧. ರಜಾದಿನಗಳ ಪ್ರವಾಸಗಳು' : '1. Holiday Packages'}
            </button>
            <button
              type="button"
              className="cursor-pointer hover:underline text-left"
              onClick={() => handleCategoryClick('educational')}
            >
              {kn ? '೨. ಶೈಕ್ಷಣಿಕ & ಕೈಗಾರಿಕಾ ಪ್ರವಾಸ' : '2. Educational & Industrial'}
            </button>
            <button
              type="button"
              className="cursor-pointer hover:underline text-left"
              onClick={() => handleCategoryClick('corporate')}
            >
              {kn ? '೩. ಕಾರ್ಪೊರೇಟ್ & ಈವೆಂಟ್ ಪ್ರವಾಸ' : '3. Corporate & Events'}
            </button>
            <button
              type="button"
              className="cursor-pointer hover:underline text-left"
              onClick={() => handleCategoryClick('transport')}
            >
              {kn ? '೪. ಸಾರಿಗೆ & ಬುಕಿಂಗ್ ನೆರವು' : '4. Transport & Bookings'}
            </button>
            <button
              type="button"
              className="cursor-pointer hover:underline text-left"
              onClick={() => handleCategoryClick('visa_passport')}
            >
              {kn ? '೫. ವೀಸಾ & ಪಾಸ್‌ಪೋರ್ಟ್ ನೆರವು' : '5. Visa & Passport Help'}
            </button>
            <button
              type="button"
              className="cursor-pointer hover:underline text-left"
              onClick={() => handleCategoryClick('catering')}
            >
              {kn ? '೬. ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಕ್ಯಾಟರಿಂಗ್' : '6. Pure Veg Catering'}
            </button>
          </div>

          {/* Column 3: Contact & Direct Channels */}
          <div>
            <span>{kn ? 'ಸಂಪರ್ಕ & ನೆರವು' : 'CONNECT'}</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp ↗</span>
            </a>
            <button
              type="button"
              onClick={onOpenContact}
              className="cursor-pointer hover:underline text-left"
            >
              {kn ? 'ನೇರ ವಿಚಾರಣೆ ನಮೂನೆ' : 'Direct Inquiry Form'}
            </button>

            {/* Staff Portal Portal Link */}
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5D77F] transition-colors mt-2 font-medium"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{kn ? 'ಸಿಬ್ಬಂದಿ ಲಾಗಿನ್ (Staff Portal)' : 'Staff Admin Portal'}</span>
              </button>
            )}

            {/* Operating hours */}
            <div className="mt-3 text-[11px] text-[#F6F3EA]/60 leading-tight">
              <Clock className="w-3 h-3 text-[#D4AF37] inline mr-1" />
              <span>{kn ? brandConfig.hoursKn : brandConfig.hoursEn}</span>
            </div>

            {/* Footer language toggle */}
            <div
              aria-label="Select language"
              className="language-toggle language-toggle-footer inline-flex flex-row items-center mt-4"
              role="group"
            >
              <button
                aria-pressed={language === 'kn'}
                className={`transition-colors cursor-pointer text-xs ${
                  language === 'kn' ? 'active font-bold text-[#f5d77f]' : 'text-white/60 hover:text-white'
                }`}
                lang="kn"
                onClick={() => onLanguageChange('kn')}
                type="button"
              >
                ಕನ್ನಡ
              </button>
              <span className="inline-block w-[1px] h-3 bg-white/35 mx-2" aria-hidden="true" />
              <button
                aria-pressed={language === 'en'}
                className={`transition-colors cursor-pointer text-xs ${
                  language === 'en' ? 'active font-bold text-[#f5d77f]' : 'text-white/60 hover:text-white'
                }`}
                onClick={() => onLanguageChange('en')}
                type="button"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom" id="footer">
        <span>© {new Date().getFullYear()} Inchara Holidays · Reg: {brandConfig.regNumber}</span>
        <span>{kn ? 'ನಿಧಾನವಾಗಿ ಪಯಣಿಸಿ. ಆಳವಾಗಿ ನೆನಪಿಸಿಕೊಳ್ಳಿ.' : 'Travel slowly. Remember deeply.'}</span>
        <span>Karnataka Tourism · Mindful Journeys</span>
      </div>
    </footer>
  );
};