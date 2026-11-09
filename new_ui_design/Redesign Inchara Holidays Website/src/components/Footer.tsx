import { copy, services } from "../content";
import type { Locale, ServiceId } from "../types";
import { BrandMark } from "./BrandMark";
import { ArrowUpRight } from "./Icons";
import { LanguageSwitch } from "./Header";

type Props = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  onEnquire: (service?: ServiceId) => void;
};

export function Footer({ locale, setLocale, onEnquire }: Props) {
  const c = copy[locale];
  return (
    <footer className="footer">
      <div className="shell footer__grid" data-reveal="up">
        <div className="footer__brand">
          <a className="brand" href="#top">
            <BrandMark />
            <span>
              <b>{String(c.brand)}</b>
              <small className={locale === "en" ? "font-kannada" : ""}>
                {String(c.brandKannada)}
              </small>
            </span>
          </a>
          <p>{String(c.footerBody)}</p>
        </div>
        <nav className="footer__nav" aria-label={String(c.footerExplore)}>
          <h2>{String(c.footerExplore)}</h2>
          {services.map((service) => (
            <a key={service.id} href={`#${service.id}`}>
              {service.shortTitle[locale]}
            </a>
          ))}
        </nav>
        <div className="footer__contact">
          <h2>{String(c.footerContact)}</h2>
          <p>{String(c.footerContactBody)}</p>
          <button className="text-link text-link--light" type="button" onClick={() => onEnquire()}>
            {String(c.footerCta)}
            <ArrowUpRight />
          </button>
        </div>
      </div>
      <div className="shell footer__bottom">
        <p>
          © {new Date().getFullYear()} {String(c.rights)}
        </p>
        <p>{String(c.demo)}</p>
        <LanguageSwitch locale={locale} setLocale={setLocale} label={String(c.language)} dark />
      </div>
    </footer>
  );
}
