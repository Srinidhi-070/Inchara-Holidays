import { affiliations, copy, services } from "../content";
import type { Locale, ServiceId } from "../types";
import { ArrowRight, ArrowUpRight, ChevronDown, ServiceIcon } from "./Icons";
import { Check, ShieldCheck } from "lucide-react";

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
        <a className="scroll-cue" href="#about" data-reveal="fade" data-delay="450">
          <span>{String(c.scroll)}</span>
          <ChevronDown />
        </a>
      </div>
    </section>
  );
}

// Recognised Industry Affiliations & Accreditations matching Image 1
export function Affiliations({ locale }: { locale: Locale }) {
  const isKn = locale === "kn";

  const partners = [
    {
      abbr: "KTF Karnataka",
      sub: isKn ? "ರಾಜ್ಯ ಪ್ರವಾಸೋದ್ಯಮ ಒಕ್ಕೂಟ" : "Karnataka State Chapter",
      logo: "/images/partners/ktf_logo_trimmed.jpg",
      alt: "Karnataka Tourism Forum",
    },
    {
      abbr: "IATTE India",
      sub: isKn ? "ರಾಷ್ಟ್ರೀಯ ತಜ್ಞರ ಮಂಡಳಿ" : "National Expert Council",
      logo: "/images/partners/iatte_logo_trimmed.jpg",
      alt: "Indian Association of Travel & Tourism Experts",
    },
    {
      abbr: "ABTO Tourism",
      sub: isKn ? "ಅಂತಾರಾಷ್ಟ್ರೀಯ & ದೇಶೀಯ" : "International & National",
      logo: "/images/partners/abto_logo_trimmed.png",
      alt: "Association of Buddhist Tour Operators",
    },
    {
      abbr: "UTEN Fraternity",
      sub: isKn ? "ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸೋದ್ಯಮ ಜಾಲ" : "Educational & Travel Network",
      logo: "/images/partners/uten_logo.png",
      alt: "United Travel & Educational Network",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F6F3EA] border-b border-[#263F32]/10 relative overflow-hidden" id="trust" aria-labelledby="trust-title">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#162E22 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header matching Image 1 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-widest text-[#9E3D28] uppercase mb-2">
            <span className="w-6 h-px bg-[#D4AF37]" />
            <span>✦</span>
            <span>
              {isKn ? "ಅಧಿಕೃತ ಪ್ರವಾಸೋದ್ಯಮ ಮಾನ್ಯತೆಗಳು & ಒಕ್ಕೂಟಗಳು" : "RECOGNISED INDUSTRY AFFILIATIONS & ACCREDITATIONS"}
            </span>
            <span>✦</span>
            <span className="w-6 h-px bg-[#D4AF37]" />
          </div>
          <p className="text-sm sm:text-base text-[#252923]/75 leading-relaxed font-normal">
            {isKn
              ? "ರಾಜ್ಯ, ರಾಷ್ಟ್ರೀಯ ಮತ್ತು ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪ್ರವಾಸೋದ್ಯಮ ಸಂಸ್ಥೆಗಳ ಅಧಿಕೃತ ಸದಸ್ಯತ್ವ ಹೊಂದಿರುವ ಹೆಮ್ಮೆ"
              : "Proud members of leading state, national & international travel trade bodies"}
          </p>
        </div>

        {/* 4 Large White Cards in Row matching Image 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {partners.map((p) => (
            <div
              key={p.abbr}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#263F32]/10 hover:border-[#D4AF37] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
            >
              <div className="w-full h-24 sm:h-28 flex items-center justify-center p-2 mb-4 bg-white rounded-2xl">
                <img
                  src={p.logo}
                  alt={p.alt}
                  loading="lazy"
                  className="max-h-full max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-serif-editorial text-[#162E22] mb-1">
                {p.abbr}
              </h3>
              <p className="text-xs text-[#252923]/60 font-medium">
                {p.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Green Compliance Verification Pill matching Image 1 */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#EBF7EE] border border-[#25D366]/40 text-[#162E22] text-xs sm:text-sm font-medium shadow-xs">
            <span className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span>
              {isKn
                ? "ಎಲ್ಲಾ ಪ್ರವಾಸಗಳು ಪ್ರಮಾಣೀಕೃತ ಮಾರ್ಗಸೂಚಿಗಳು, ನ್ಯಾಯಯುತ ದರ ಹಾಗೂ ಪರಿಶೀಲಿಸಿದ ಸುರಕ್ಷತಾ ನಿಯಮಗಳನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಪಾಲಿಸುತ್ತವೆ"
                : "All journeys strictly adhere to certified trade guidelines, fair pricing & vetted safety norms"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// 6 Core Services with balanced imagery, icons, and descriptions
export function Services({ locale, onEnquire }: Props) {
  const c = copy[locale];

  const serviceImages: Record<string, string> = {
    holidays: "/images/karnataka-heritage.jpg",
    education: "/images/hoysala_belur.jpg",
    corporate: "/images/chikmagalur_peaks.jpg",
    transport: "/images/coorg_misty_plantation_1791795473840.jpg",
    visa: "/images/signature_gokarna_coast_1791795485390.jpg",
    catering: "/images/pure_veg_travel_meal.jpg",
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-10">
          {services.map((service, index) => (
            <article
              className="rounded-3xl bg-white border border-[#263F32]/12 hover:border-[#D4AF37] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              id={service.id}
              key={service.id}
              data-reveal="card"
              data-delay={60 + (index % 3) * 80}
            >
              <div>
                {/* Photo header on all cards for visual symmetry */}
                <div className="relative h-48 overflow-hidden bg-[#162E22]">
                  <img
                    src={serviceImages[service.id] || "/images/karnataka-heritage.jpg"}
                    alt={service.title[locale]}
                    loading="lazy"
                    width="600"
                    height="320"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#162E22]/90 backdrop-blur-md border border-[#D4AF37]/50 text-[#F5D77F] text-xs font-bold flex items-center justify-center">
                      {service.number}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider text-[#F5D77F] uppercase flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      <ServiceIcon id={service.id} className="w-3.5 h-3.5" />
                      <span>{service.shortTitle[locale]}</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className={`text-xl font-bold font-serif-editorial text-[#162E22] mb-2.5 group-hover:text-[#9E3D28] transition-colors leading-snug ${
                    locale === "kn" ? "font-kannada-serif" : ""
                  }`}>
                    {service.title[locale]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#252923]/75 leading-relaxed mb-4">
                    {service.description[locale]}
                  </p>
                  <ul className="space-y-2 border-t border-[#263F32]/8 pt-3 text-xs text-[#252923]/80">
                    {service.features[locale].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-[#D4AF37] font-bold">✦</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-transparent">
                <button
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F3EA] hover:bg-[#162E22] text-[#162E22] hover:text-[#F5D77F] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#263F32]/10 hover:border-[#D4AF37]"
                  type="button"
                  onClick={() => onEnquire(service.id)}
                >
                  <span>{String(c.discover)}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
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
