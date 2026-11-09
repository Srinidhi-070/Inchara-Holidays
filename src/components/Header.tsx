import { useEffect, useRef, useState } from "react";
import { copy } from "../content";
import type { Locale, ServiceId } from "../types";
import { ArrowUpRight, CloseIcon, MenuIcon } from "./Icons";
import { BrandMark } from "./BrandMark";

export const Mark = BrandMark;

type Props = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  onEnquire: (service?: ServiceId) => void;
};

export function Header({ locale, setLocale, onEnquire }: Props) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const c = copy[locale];
  const isKn = locale === "kn";

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("menu-open");
    const firstControl = mobileMenuRef.current?.querySelector<HTMLElement>("button, a");
    window.setTimeout(() => firstControl?.focus(), 0);

    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    const desktopQuery = window.matchMedia("(min-width: 1121px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => event.matches && setOpen(false);
    window.addEventListener("keydown", close);
    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", close);
      desktopQuery.removeEventListener("change", closeAtDesktop);
    };
  }, [open]);

  const navigate = () => setOpen(false);

  const navItems = [
    { href: "#packages", label: isKn ? "ಪ್ರವಾಸಗಳು" : "Holidays" },
    { href: "#education", label: isKn ? "ಶೈಕ್ಷಣಿಕ" : "Educational" },
    { href: "#corporate", label: isKn ? "ಕಾರ್ಪೊರೇಟ್" : "Corporate" },
    { href: "#transport", label: isKn ? "ಸಾರಿಗೆ" : "Transport" },
    { href: "#travel-assistance", label: isKn ? "ಪ್ರಯಾಣ ನೆರವು" : "Travel Assistance" },
    { href: "#catering-showcase", label: isKn ? "ಸಸ್ಯಾಹಾರಿ ಅಡುಗೆ" : "Pure Veg Catering" },
    { href: "#destinations", label: isKn ? "ತಾಣಗಳು" : "Destinations" },
    { href: "#about", label: isKn ? "ಪರಿಚಯ" : "About" },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <a className="brand flex items-center gap-3" href="#top" aria-label={String(c.brand)}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white p-1 border border-[#D4AF37]/60 shadow-sm shrink-0 flex items-center justify-center">
            <img
              src="/images/brand/inchara_official_logo.png"
              alt="Inchara Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span>
            <b className={locale === "kn" ? "font-kannada" : ""}>{String(c.brand)}</b>
            <small className={locale === "en" ? "font-kannada" : ""}>
              {String(c.brandKannada)}
            </small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label={String(c.navLabel)}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSwitch locale={locale} setLocale={setLocale} label={String(c.language)} />
          <button className="gold-button header-cta" type="button" onClick={() => onEnquire()}>
            <span className="header-cta__label">{String(c.enquire)}</span>
            <ArrowUpRight className="header-cta__icon" />
          </button>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? String(c.close) : String(c.menu)}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav className="shell" aria-label={String(c.navLabel)}>
          <div className="mobile-menu__language">
            <span>{String(c.language)}</span>
            <LanguageSwitch locale={locale} setLocale={setLocale} label={String(c.language)} />
          </div>
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={navigate} tabIndex={open ? 0 : -1}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <button
            className="gold-button mt-4"
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              setOpen(false);
              onEnquire();
            }}
          >
            {String(c.enquire)}
            <ArrowUpRight />
          </button>
        </nav>
      </div>
    </header>
  );
}

export function LanguageSwitch({
  locale,
  setLocale,
  label,
  dark = false,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  label: string;
  dark?: boolean;
}) {
  const nextLocale = locale === "en" ? "kn" : "en";

  return (
    <button
      className={`language-toggle language-toggle--${locale} ${dark ? "language-toggle--dark" : ""}`}
      type="button"
      role="switch"
      aria-checked={locale === "kn"}
      aria-label={`${label}: ${locale === "en" ? "English" : "ಕನ್ನಡ"}`}
      onClick={() => setLocale(nextLocale)}
    >
      <span className="language-toggle__option font-kannada" aria-hidden="true">
        ಕ
      </span>
      <span className="language-toggle__option" aria-hidden="true">
        EN
      </span>
    </button>
  );
}
