import React from 'react';
import { Language } from '../types';
import { Mark } from './Header';

interface FooterProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenPlanner: () => void;
  onOpenContact: () => void;
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
  onOpenCorporate,
  onOpenCatering,
  onOpenSchool,
}) => {
  const kn = language === 'kn';

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'contact') {
      onOpenContact();
    } else {
      onNavigateSection(sectionId);
    }
  };

  return (
    <footer className="footer">
      {/* Full-bleed photo invitation banner */}
      <div className="footer-image">
        <img
          alt="Misty tea fields at dawn in Western Ghats"
          src="https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?auto=format&fit=crop&w=2000&q=88"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/hero_western_ghats_1791795450720.jpg';
          }}
        />
        <div>
          <span>{kn ? 'ನಿಮ್ಮ ಕಥೆ ಕಾಯುತ್ತಿದೆ' : 'YOUR STORY IS WAITING'}</span>
          <h2>
            {kn
              ? 'ನಿಮ್ಮ ಮನಸ್ಸು ಮುಂದೆ ಎಲ್ಲಿಗೆ ಕರೆದೊಯ್ಯುತ್ತದೆ?'
              : 'Where will your heart take you next?'}
          </h2>
          <p lang="kn">
            {kn
              ? 'ನಿಮ್ಮ ಮುಂದಿನ ಪ್ರಯಾಣ ಇಲ್ಲಿಂದ ಆರಂಭವಾಗುತ್ತದೆ.'
              : 'ನಿಮ್ಮ ಮುಂದಿನ ಪ್ರಯಾಣ ಇಲ್ಲಿಂದ ಆರಂಭವಾಗುತ್ತದೆ.'}
          </p>
          <button
            type="button"
            className="button button-gold mx-auto mt-6"
            onClick={onOpenPlanner}
          >
            <span>{kn ? 'ಪ್ರಯಾಣ ರೂಪಿಸಿ' : 'Plan your journey'}</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      {/* 3-column directory */}
      <div className="footer-main section-pad">
        <div className="footer-brand">
          <a
            className="brand brand-light"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Mark />
            <span>
              <strong lang="kn">ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್</strong>
              <small>INCHARA HOLIDAYS</small>
            </span>
          </a>
          <p>
            {kn
              ? 'ಚಿಂತನಶೀಲ ಪ್ರಯಾಣಗಳು, ನೈಜ ಅನುಭವಗಳು ಮತ್ತು ಹೃದಯಸ್ಪರ್ಶಿ ಆತಿಥ್ಯ.'
              : 'Thoughtful journeys, genuine encounters,\nand hospitality from the heart.'}
          </p>
          <a href="mailto:hello@incharaholidays.com">hello@incharaholidays.com</a>
          <a href="tel:+919900000000">+91 99000 00000</a>
        </div>

        <div className="footer-links">
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
              href="#journeys"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('journeys');
              }}
            >
              {kn ? 'ವಿಶೇಷ ಪಯಣಗಳು' : 'Signature journeys'}
            </a>
            <a
              href="#experiences"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('experiences');
              }}
            >
              {kn ? 'ಅನುಭವಗಳು' : 'Experiences'}
            </a>
            <a
              href="#difference"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('difference');
              }}
            >
              {kn ? 'ನಮ್ಮ ಕಥೆ' : 'About Inchara'}
            </a>
          </div>

          <div>
            <span>{kn ? 'ಸೇವೆಗಳು' : 'SERVICES'}</span>
            <button
              type="button"
              className="cursor-pointer hover:underline text-left"
              onClick={onOpenCorporate || (() => handleNavClick('services'))}
            >
              {kn ? 'ಕಾರ್ಪೊರೇಟ್ ಕಾರ್ಯಕ್ರಮಗಳು' : 'Corporate events'}
            </button>
            <button
              type="button"
              className="cursor-pointer hover:underline text-left"
              onClick={onOpenCatering || (() => handleNavClick('services'))}
            >
              {kn ? 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಕ್ಯಾಟರಿಂಗ್' : 'Catering & Hospitality'}
            </button>
            <button
              type="button"
              className="cursor-pointer hover:underline text-left"
              onClick={onOpenSchool || (() => handleNavClick('services'))}
            >
              {kn ? 'ಶಾಲಾ ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸಗಳು' : 'School trips'}
            </button>
            <button
              type="button"
              className="cursor-pointer hover:underline text-left"
              onClick={onOpenPlanner}
            >
              {kn ? 'ಪ್ರಯಾಣ ರೂಪಿಸಿ' : 'Plan your journey'}
            </button>
          </div>

          <div>
            <span>{kn ? 'ಸಂಪರ್ಕ' : 'CONNECT'}</span>
            <a
              href="https://wa.me/919900000000?text=Hello%20Inchara%20Holidays%2C%20I%20would%20like%20to%20plan%20a%20trip"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </a>
            <button
              type="button"
              onClick={onOpenContact}
              className="cursor-pointer hover:underline text-left"
            >
              {kn ? 'ನೇರ ಸಂಪರ್ಕ' : 'Contact Enquiry'}
            </button>

            {/* Footer language toggle */}
            <div
              aria-label="Select language"
              className="language-toggle language-toggle-footer inline-flex flex-row items-center mt-3"
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
        <span>© {new Date().getFullYear()} Inchara Holidays</span>
        <span>{kn ? 'ನಿಧಾನವಾಗಿ ಪಯಣಿಸಿ. ಆಳವಾಗಿ ನೆನಪಿಸಿಕೊಳ್ಳಿ.' : 'Travel slowly. Remember deeply.'}</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
};
