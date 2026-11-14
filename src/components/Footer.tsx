import { copy, services } from "../content";
import type { Locale, ServiceId } from "../types";
import { ArrowRight } from "./Icons";
import { LanguageSwitch } from "./Header";
import { brandConfig, getWhatsAppInquiryUrl } from "../config/brand";
import { Phone, Mail, MessageCircle, MapPin, Clock, Shield } from "lucide-react";

type Props = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  onEnquire: (service?: ServiceId) => void;
  onOpenAdmin?: () => void;
  onOpenContact?: () => void;
  onOpenGuides?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
};

export function Footer({
  locale,
  setLocale,
  onEnquire,
  onOpenAdmin,
  onOpenContact,
  onOpenGuides,
  onOpenPrivacy,
  onOpenTerms,
}: Props) {
  const c = copy[locale];
  const isKn = locale === "kn";

  const waGreeting = isKn
    ? "ನಮಸ್ಕಾರ ಇಂಚರ ಹಾಲಿಡೇಸ್, ನನ್ನ ಪ್ರವಾಸದ ಯೋಜನೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಸಮಾಲೋಚನೆ ನಡೆಸಲು ಬಯಸುತ್ತೇನೆ."
    : "Namaskara Inchara Holidays, I would like to plan a bespoke holiday tour with you.";

  return (
    <footer className="footer bg-[#0a1810] text-[#fbf8f1] border-t border-[#d4af37]/20 pt-16 pb-8" id="footer">
      <div className="shell grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10" data-reveal="up">
        {/* Column 1: Brand & Mysore Office */}
        <div className="space-y-4">
          <a className="brand brand-light flex items-center gap-3" href="#top">
            <div className="w-10 h-10 rounded-full bg-white p-1 border border-[#D4AF37]/60 shadow-sm shrink-0 flex items-center justify-center">
              <img
                src="/images/brand/inchara_official_logo.png"
                alt="Inchara Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span>
              <b className="text-white text-base tracking-wide font-serif-editorial">
                {String(c.brand)}
              </b>
              <small className="text-[#f5d77f] text-xs block">
                {String(c.brandKannada)}
              </small>
            </span>
          </a>

          <p className="text-xs text-white/70 leading-relaxed font-normal">
            {String(c.footerBody)}
          </p>

          <div className="pt-2 text-xs text-white/80 space-y-2">
            <a
              href={brandConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 hover:text-[#f5d77f] transition-colors group cursor-pointer"
              title={isKn ? "ಗೂಗಲ್ ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ" : "View on Google Maps"}
            >
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span>{isKn ? brandConfig.addressKn : brandConfig.addressEn}</span>
            </a>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{isKn ? brandConfig.hoursKn : brandConfig.hoursEn}</span>
            </div>
          </div>
        </div>

        {/* Column 2: 6 Services Directory */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#f5d77f]">
            {isKn ? "ನಮ್ಮ ಸೇವೆಗಳು" : "SERVICES"}
          </h2>
          <ul className="space-y-2 text-xs text-white/75">
            {services.map((service) => (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => onEnquire(service.id)}
                  className="hover:text-[#f5d77f] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span className="text-[#D4AF37]/60">✦</span>
                  <span>{service.title[locale]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Explore Destinations */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#f5d77f]">
            {isKn ? "ತಾಣಗಳ ಅನ್ವೇಷಣೆ" : "EXPLORE DESTINATIONS"}
          </h2>
          <ul className="space-y-2 text-xs text-white/75">
            <li>
              <a href="#destinations" className="hover:text-[#f5d77f] transition-colors flex items-center gap-1.5">
                <span className="text-[#D4AF37]/60">✦</span>
                <span>{isKn ? "ಕರ್ನಾಟಕ ಪರಂಪರೆ & ಮಲೆನಾಡು" : "Karnataka & Western Ghats"}</span>
              </a>
            </li>
            <li>
              <a href="#destinations" className="hover:text-[#f5d77f] transition-colors flex items-center gap-1.5">
                <span className="text-[#D4AF37]/60">✦</span>
                <span>{isKn ? "ಕೇರಳದ ಪ್ರಶಾಂತ ಹಿನ್ನೀರು" : "Kerala Houseboat Backwaters"}</span>
              </a>
            </li>
            <li>
              <a href="#destinations" className="hover:text-[#f5d77f] transition-colors flex items-center gap-1.5">
                <span className="text-[#D4AF37]/60">✦</span>
                <span>{isKn ? "ರಾಜಸ್ಥಾನ ಅರಮನೆಗಳ ಪಯಣ" : "Royal Rajasthan Desert Circuit"}</span>
              </a>
            </li>
            <li>
              <a href="#destinations" className="hover:text-[#f5d77f] transition-colors flex items-center gap-1.5">
                <span className="text-[#D4AF37]/60">✦</span>
                <span>{isKn ? "ಹಿಮಾಚಲ & ಕಾಶ್ಮೀರ ಕಣಿವೆ" : "Himachal & Kashmir Valleys"}</span>
              </a>
            </li>
            <li>
              <a href="#catering-showcase" className="hover:text-[#f5d77f] transition-colors flex items-center gap-1.5">
                <span className="text-[#D4AF37]/60">✦</span>
                <span>{isKn ? "೧೦೦% ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಆತಿಥ್ಯ" : "100% Pure Veg Pankti Seva"}</span>
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-[#f5d77f] transition-colors flex items-center gap-1.5">
                <span className="text-[#D4AF37]/60">✦</span>
                <span>{isKn ? "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು (FAQs)" : "Common Questions & FAQs"}</span>
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-[#f5d77f] transition-colors flex items-center gap-1.5">
                <span className="text-[#D4AF37]/60">✦</span>
                <span>{isKn ? "ಚಿತ್ರ ಗ್ಯಾಲರಿ" : "Visual Journey Gallery"}</span>
              </a>
            </li>
            {onOpenGuides && (
              <li>
                <button
                  type="button"
                  onClick={onOpenGuides}
                  className="hover:text-[#f5d77f] transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span className="text-[#D4AF37]/60">✦</span>
                  <span>{isKn ? "ಸಾಂಸ್ಕೃತಿಕ ಶಿಷ್ಟಾಚಾರ ಮಾರ್ಗದರ್ಶಿ" : "Cultural Etiquette Guide"}</span>
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Column 4: Contact & Staff Access */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#f5d77f]">
            {String(c.footerContact)}
          </h2>
          <p className="text-xs text-white/70 leading-relaxed font-normal">
            {String(c.footerContactBody)}
          </p>

          <div className="space-y-2.5 pt-1">
            <a
              href={`tel:${brandConfig.phoneRaw}`}
              className="inline-flex items-center gap-2.5 text-xs font-semibold text-white/90 hover:text-[#f5d77f] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>{brandConfig.phoneDisplay}</span>
            </a>

            <a
              href={getWhatsAppInquiryUrl(waGreeting)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-xs font-semibold text-[#25D366] hover:brightness-110 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isKn ? "ವಾಟ್ಸಾಪ್ ಚಾಟ್ ಆರಂಭಿಸಿ" : "WhatsApp Chat"}</span>
            </a>

            <a
              href={`mailto:${brandConfig.email}`}
              className="flex items-center gap-2.5 text-xs font-semibold text-white/90 hover:text-[#f5d77f] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>{brandConfig.email}</span>
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              className="gold-button !text-xs !py-2.5 !px-4 w-full justify-center"
              type="button"
              onClick={() => onEnquire()}
            >
              <span>{String(c.footerCta)}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#f5d77f] hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isKn ? "ಕಾರ್ಯಾಚರಣಾ ವಿಳಾಸ & ಸಂಪರ್ಕ" : "Operating Desk & Direct Line"}</span>
              </button>
            )}

            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold text-[#f5d77f]/70 hover:text-[#f5d77f] transition-colors pt-2 cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isKn ? "ಮಾಲೀಕರ ನಿರ್ವಹಣೆ (Owner Portal)" : "Owner Operations Portal"}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="shell flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-white/60">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <p>
            © {new Date().getFullYear()} {String(c.rights)}
          </p>
          <div className="flex items-center gap-3 text-white/50 text-[11px]">
            {onOpenPrivacy && (
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="hover:text-[#f5d77f] transition-colors cursor-pointer"
              >
                {isKn ? "ಗೌಪ್ಯತಾ ನೀತಿ" : "Privacy Policy"}
              </button>
            )}
            <span>·</span>
            {onOpenTerms && (
              <button
                type="button"
                onClick={onOpenTerms}
                className="hover:text-[#f5d77f] transition-colors cursor-pointer"
              >
                {isKn ? "ನಿಯಮಗಳು & ಷರತ್ತುಗಳು" : "Terms & Conditions"}
              </button>
            )}
          </div>
        </div>

        <p className="text-center sm:text-left text-[#f5d77f]/80">
          {String(c.demo)}
        </p>
        <LanguageSwitch locale={locale} setLocale={setLocale} label={String(c.language)} dark />
      </div>
    </footer>
  );
}
