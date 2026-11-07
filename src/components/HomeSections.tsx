import { affiliations, copy, services } from "../content";
import type { Locale, ServiceId } from "../types";
import { ArrowRight, ArrowUpRight, ChevronDown, ServiceIcon } from "./Icons";

type Props = {
  locale: Locale;
  onEnquire: (service?: ServiceId) => void;
};

export function Hero({ locale, onEnquire }: Props) {
  const c = copy[locale];
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <img
        className="hero__image"
        src="/images/western-ghats-hero.jpg"
        alt="Misty landscape of Western Ghats in Karnataka"
        width="2200"
        height="1467"
        fetchPriority="high"
      />
      <div className="hero__shade" />
      <div className="hero__ornament" aria-hidden="true" />
      <div className="shell hero__content">
        <div className="coordinate" data-reveal="fade">
          {String(c.coordinates)}
        </div>
        <div className="hero__main" data-reveal="hero">
          <p className="eyebrow eyebrow--light">{String(c.heroEyebrow)}</p>
          <h1 id="hero-title" className={locale === "kn" ? "font-kannada-serif" : ""}>
            {String(c.heroTitleA)}
            <em>{String(c.heroTitleB)}</em>
          </h1>
          <p className="hero__body">{String(c.heroBody)}</p>
          <div className="hero__actions">
            <button className="gold-button" type="button" onClick={() => onEnquire()}>
              {String(c.heroPrimary)}
              <ArrowUpRight />
            </button>
            <a className="outline-button" href="#services">
              {String(c.heroSecondary)}
              <ArrowRight />
            </a>
          </div>
        </div>
        <a className="scroll-cue" href="#trust" data-reveal="fade" data-delay="450">
          <span>{String(c.scroll)}</span>
          <ChevronDown />
        </a>
      </div>
    </section>
  );
}

export function Affiliations({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section className="trust" id="trust" aria-labelledby="trust-title">
      <div className="shell">
        <div className="trust__heading" data-reveal="up">
          <div>
            <p className="eyebrow">{String(c.trustEyebrow)}</p>
            <h2 id="trust-title">{String(c.trustTitle)}</h2>
          </div>
          <p>{String(c.trustNote)}</p>
        </div>
        <div className="affiliation-list" data-reveal="up" data-delay="100">
          {affiliations.map(([abbr, name, logoUrl]) => (
            <div className="affiliation" key={abbr}>
              <div className="affiliation-logo-badge">
                <img src={logoUrl} alt={name} loading="lazy" />
              </div>
              <span>{abbr}</span>
              <small>{name}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services({ locale, onEnquire }: Props) {
  const c = copy[locale];
  return (
    <section className="services-section section" id="services" aria-labelledby="services-title">
      <div className="shell">
        <div className="section-intro" data-reveal="up">
          <p className="eyebrow">{String(c.servicesEyebrow)}</p>
          <h2 id="services-title" className={locale === "kn" ? "font-kannada-serif" : ""}>
            {String(c.servicesTitle)}
          </h2>
          <p>{String(c.servicesBody)}</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <article
              className="service-card"
              id={service.id}
              key={service.id}
              data-reveal="card"
              data-delay={60 + (index % 2) * 90}
            >
              {index === 0 && (
                <img
                  src="/images/karnataka-heritage.jpg"
                  alt="Historic stone architecture in Karnataka"
                  loading="lazy"
                  width="1600"
                  height="905"
                />
              )}
              <div className="service-card__top">
                <span>{service.number}</span>
                <ServiceIcon id={service.id} />
              </div>
              <div className="service-card__body">
                <h3 className={locale === "kn" ? "font-kannada-serif" : ""}>
                  {service.title[locale]}
                </h3>
                <p>{service.description[locale]}</p>
                <ul>
                  {service.features[locale].map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button className="text-link" type="button" onClick={() => onEnquire(service.id)}>
                  {String(c.discover)}
                  <ArrowUpRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CateringFeature({ locale, onEnquire }: Props) {
  const c = copy[locale];
  return (
    <section className="catering-feature section" id="catering-showcase" aria-labelledby="catering-title">
      <div className="catering-feature__pattern" aria-hidden="true" />
      <div className="shell catering-feature__grid">
        <div className="catering-feature__image-wrap" data-reveal="image">
          <img
            src="/images/banana-leaf-feast.jpg"
            alt="Traditional South Indian vegetarian meal served on a banana leaf"
            loading="lazy"
            width="1600"
            height="1600"
          />
          <div className="catering-seal" aria-hidden="true">
            <ServiceIcon id="catering" />
            <span>ಅತಿಥಿ ದೇವೋ ಭವ</span>
          </div>
        </div>
        <div className="catering-feature__content" data-reveal="up" data-delay="120">
          <p className="eyebrow">{String(c.cateringEyebrow)}</p>
          <h2 id="catering-title" className={locale === "kn" ? "font-kannada-serif" : ""}>
            {String(c.cateringTitle)}
          </h2>
          <p>{String(c.cateringBody)}</p>
          <div className="catering-badge">
            <span aria-hidden="true">◆</span>
            {String(c.cateringBadge)}
          </div>
          <button className="gold-button" type="button" onClick={() => onEnquire("catering")}>
            {String(c.cateringCta)}
            <ArrowUpRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export function JourneyProcess({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section className="process section" aria-labelledby="process-title">
      <div className="shell">
        <div className="process__intro" data-reveal="up">
          <p className="eyebrow eyebrow--light">{String(c.processEyebrow)}</p>
          <h2 id="process-title" className={locale === "kn" ? "font-kannada-serif" : ""}>
            {String(c.processTitle)}
          </h2>
        </div>
        <ol className="process__list">
          {(c.process as string[][]).map(([title, body], index) => (
            <li key={title} data-reveal="up" data-delay={index * 100}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function InvitationBanner({ locale, onEnquire }: Props) {
  const c = copy[locale];
  return (
    <section className="invitation" aria-labelledby="invitation-title">
      <img
        src="/images/misty-mountains.jpg"
        alt="Lush green tea estate hills of Western Ghats"
        loading="lazy"
        width="2200"
        height="1513"
        className="invitation__image"
      />
      <div className="invitation__shade" />
      <div className="shell invitation__content" data-reveal="up">
        <p className="eyebrow eyebrow--lined">{String(c.invitationEyebrow)}</p>
        <h2 id="invitation-title" className={locale === "kn" ? "font-kannada-serif" : ""}>
          {String(c.invitationTitle)}
        </h2>
        <p>{String(c.invitationBody)}</p>
        <button className="gold-button" type="button" onClick={() => onEnquire()}>
          {String(c.enquire)}
          <ArrowUpRight />
        </button>
      </div>
    </section>
  );
}
