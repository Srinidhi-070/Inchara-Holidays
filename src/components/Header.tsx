import { useEffect, useRef, useState } from "react";
import { copy, services } from "../content";
import type { Locale, ServiceId } from "../types";
import { BrandMark } from "./BrandMark";
import { ArrowUpRight, CloseIcon, MenuIcon } from "./Icons";

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

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <a className="brand" href="#top" aria-label={String(c.brand)}>
          <BrandMark />
          <span>
            <b className={locale === "kn" ? "font-kannada" : ""}>{String(c.brand)}</b>
            <small className={locale === "en" ? "font-kannada" : ""}>
              {String(c.brandKannada)}
            </small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label={String(c.navLabel)}>
          {services.map((service) => (
            <a key={service.id} href={`#${service.id}`}>
              {service.shortTitle[locale]}
            </a>
          ))}
          <a href="#packages">
            {locale === "kn" ? "ಪ್ಯಾಕೇಜ್‌ಗಳು" : "Packages"}
          </a>
          <a href="#destinations">
            {locale === "kn" ? "ತಾಣಗಳು" : "Destinations"}
          </a>
        </nav>

        <div className="header-actions">
          <LanguageSwitch locale={locale} setLocale={setLocale} label={String(c.language)} />
          <button className="gold-button header-cta" type="button" onClick={() => onEnquire()}>
            {String(c.enquire)}
            <ArrowUpRight />
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
          {services.map((service) => (
            <a key={service.id} href={`#${service.id}`} onClick={navigate} tabIndex={open ? 0 : -1}>
              <span>{service.number}</span>
              {service.title[locale]}
            </a>
          ))}
          <a href="#packages" onClick={navigate} tabIndex={open ? 0 : -1}>
            <span>07</span>
            {locale === "kn" ? "ಜನಪ್ರಿಯ ರಜಾ ಪ್ಯಾಕೇಜ್‌ಗಳು" : "Curated Tour Packages"}
          </a>
          <a href="#destinations" onClick={navigate} tabIndex={open ? 0 : -1}>
            <span>08</span>
            {locale === "kn" ? "ಕರ್ನಾಟಕ ಪ್ರವಾಸಿ ತಾಣಗಳು" : "Karnataka Destinations"}
          </a>
          <button
            className="gold-button"
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
