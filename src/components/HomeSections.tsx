import { affiliations, copy, services } from "../content";
import type { Locale, ServiceId, Concept } from "../types";
import { ArrowRight, ArrowUpRight, ChevronDown, ServiceIcon } from "./Icons";
import { Check, ShieldCheck, MessageSquareHeart, Compass, HeartHandshake } from "lucide-react";
import { DriftWall } from "./DriftWall";

type Props = {
  locale: Locale;
  onEnquire: (service?: ServiceId, initialDetails?: string) => void;
  concept?: Concept;
  hasSelectedConcept?: boolean;
};

export function Hero({ locale, onEnquire, concept = "A", hasSelectedConcept = false }: Props) {
  const c = copy[locale];

  // Default opening state (serene tea gardens / Western Ghats landscape)
  let heroImage = "/images/western-ghats-hero.jpg";
  let eyebrow = String(c.heroEyebrow);
  let titleA = String(c.heroTitleA);
  let titleB = String(c.heroTitleB);
  let body = String(c.heroBody);
  let primaryBtn = String(c.heroPrimary);
  let secondaryBtn = String(c.heroSecondary);

  // When user explicitly selects an art direction:
  if (hasSelectedConcept) {
    if (concept === "A") {
      // 01 Karnataka Heritage & In-Karnataka Tours (Belur Hoysala Stone Heritage)
      heroImage = "/images/hoysala_belur.jpg";
      eyebrow = locale === "kn" ? "ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆ · ಹೊಯ್ಸಳ & ಮೈಸೂರು ಪರಂಪರೆ" : "Soul of Karnataka · Hoysala to Mysuru Heritage";
      titleA = locale === "kn" ? "ಶಿಲ್ಪಕಲೆಯ ನೆಲೆ, " : "Living Stone, ";
      titleB = locale === "kn" ? "ಹೊಯ್ಸಳ ಪರಂಪರೆ." : "Royal Legacies.";
      body = locale === "kn"
        ? "ಹೊಯ್ಸಳ ದೇಗುಲಗಳ ಶಿಲ್ಪ ವೈಭವ, ಹಂಪಿಯ ಕಲ್ಲಿನ ರಥ, ಮೈಸೂರು ಅರಮನೆ ಮತ್ತು ಮಲೆನಾಡಿನ ಹಸಿರು ಪ್ಲಾಂಟೇಶನ್‌ಗಳು — ಸಮಗ್ರ ಕರ್ನಾಟಕ ಪ್ರವಾಸಗಳು."
        : "Curated in-Karnataka journeys: 12th-century Hoysala temple marvels of Belur & Halebidu, royal Mysuru palace traditions, Hampi UNESCO ruins, and misty Coorg coffee hills.";
      primaryBtn = locale === "kn" ? "ಕರ್ನಾಟಕ ಪ್ರವಾಸಗಳು" : "Explore Karnataka Tours";
      secondaryBtn = locale === "kn" ? "ಮಾರ್ಗಸೂಚಿಗಳು" : "View Karnataka Routes";
    } else if (concept === "B") {
      // 02 Incredible India Domestic Circuits (Rajasthan Palaces / All-India)
      heroImage = "/images/rajasthan_heritage.jpg";
      eyebrow = locale === "kn" ? "ಭಾರತೀಯ ಪಯಣಗಳು · ರಾಜಸ್ಥಾನ & ಹಿಮಾಲಯ" : "Incredible India · Palaces, Peaks & Backwaters";
      titleA = locale === "kn" ? "ಕೋಟೆಗಳಿಂದ " : "From Royal Forts ";
      titleB = locale === "kn" ? "ಹಿನ್ನೀರಿನವರೆಗೆ." : "to Tranquil Waters.";
      body = locale === "kn"
        ? "ರಾಜಸ್ಥಾನದ ಭವ್ಯ ಅರಮನೆಗಳು ಮತ್ತು ಮರಳುಗಾಡು, ಕೇರಳದ ಹೌಸ್‌ಬೋಟ್ ಹಿನ್ನೀರು, ಹಿಮಾಚಲದ ಹಿಮಶಿಖರಗಳು ಮತ್ತು ವಾರಣಾಸಿಯ ಗಂಗಾರತಿ — ಸಮಗ್ರ ಭಾರತೀಯ ಪ್ರವಾಸಗಳು."
        : "Curated domestic journeys across India: majestic Rajasthan lake palaces, serene Kerala backwaters, snow-clad Himachal valleys, and sacred Ganges heritage.";
      primaryBtn = locale === "kn" ? "ಭಾರತೀಯ ಸರ್ಕ್ಯೂಟ್‌ಗಳು" : "Explore India Circuits";
      secondaryBtn = locale === "kn" ? "ಪ್ಯಾಕೇಜ್‌ಗಳು" : "Browse All-India";
    } else if (concept === "C") {
      // 03 International Destinations (Vietnam Ha Long Bay & Global Horizons)
      heroImage = "/images/vietnam_halong.jpg";
      eyebrow = locale === "kn" ? "ಅಂತಾರಾಷ್ಟ್ರೀಯ ದಿಗಂತಗಳು · ವಿಶ್ವಾಸಾರ್ಹ ಪಯಣ" : "International Horizons · Curated Global Expeditions";
      titleA = locale === "kn" ? "ಗಡಿಗಳನ್ನು ಮೀರಿ, " : "Beyond Borders, ";
      titleB = locale === "kn" ? "ಹೊಸ ದಿಗಂತಗಳೆಡೆge." : "with Authentic Care.";
      body = locale === "kn"
        ? "ವಿಯೆಟ್ನಾಂನ ಹಾಲಾಂಗ್ ಕೊಲ್ಲಿ, ಬಾಲಿ ದ್ವೀಪ, ಜಪಾನ್ ಚೆರ್ರಿ ಬ್ಲಾಸಮ್, ದುಬೈ ಮತ್ತು ಯೂರೋಪ್ — ಸಂಪೂರ್ಣ ವೀಸಾ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಭಾರತೀಯ ಸಾತ್ವಿಕ ಊಟದ ಸೌಕರ್ಯದೊಂದಿಗೆ."
        : "Seamless global horizons: Vietnam emerald bays, Bali island sanctuaries, Kyoto cherry blossom trails, Dubai dunes, and classic European circuits with end-to-end visa assistance.";
      primaryBtn = locale === "kn" ? "ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪ್ರವಾಸಗಳು" : "Explore International";
      secondaryBtn = locale === "kn" ? "ಗ್ಲೋಬಲ್ ವೀಸಾ & ಪ್ರವಾಸ" : "Global Tours & Visa";
    }
  }

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <img
        key={heroImage}
        className="hero__image transition-opacity duration-700"
        src={heroImage}
        alt="Scenic landscape of Karnataka and beyond"
        width="2200"
        height="1467"
        fetchPriority="high"
      />
      <div className="hero__shade" />
      <div className="hero__ornament" aria-hidden="true" />
      <div className="shell hero__content">
        <div className="hero__main" data-reveal="hero">
          <p className="eyebrow eyebrow--light">{eyebrow}</p>
          <h1 id="hero-title" className={locale === "kn" ? "font-kannada-serif" : ""}>
            {titleA}
            <em>{titleB}</em>
          </h1>
          <p className="hero__body">{body}</p>
          <div className="hero__actions">
            <button className="gold-button" type="button" onClick={() => onEnquire()}>
              {primaryBtn}
              <ArrowUpRight />
            </button>
            <a className="outline-button" href="#services">
              {secondaryBtn}
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
    <section className="py-8 sm:py-12 bg-[#F6F3EA] bg-kolam-subtle border-b border-[#263F32]/10 relative overflow-hidden" id="trust" aria-labelledby="trust-title">
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
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
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
              <div className="w-full h-16 sm:h-20 flex items-center justify-center p-2 mb-4 bg-white rounded-2xl">
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
    <section className="services-section section scroll-mt-24" id="services" aria-labelledby="services-title">
      <div className="shell">
        <div className="max-w-3xl mb-10 sm:mb-12" data-reveal="up">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#9E3D28] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <span>✦</span>
            <span>{String(c.servicesEyebrow)}</span>
            <span>✦</span>
            <span className="w-5 h-px bg-[#D4AF37]" />
          </div>
          <h2 id="services-title" className={`text-xl sm:text-2xl lg:text-3xl font-serif-editorial font-bold text-[#162E22] tracking-tight leading-[1.18] ${locale === "kn" ? "font-kannada-serif" : ""}`}>
            {locale === "kn" ? (
              <>
                ಪ್ರಯಾಣ, ಸಮಾಗಮ ಮತ್ತು ಆತಿಥ್ಯ —{" "}
                <em className="text-[#9E3D28] font-normal font-serif-editorial italic">
                  ಒಂದೇ ಸೂರಿನಡಿ.
                </em>
              </>
            ) : (
              <>
                Travel, gathering & hospitality —{" "}
                <em className="text-[#9E3D28] font-normal font-serif-editorial italic">
                  considered as one.
                </em>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-[#252923]/75 leading-relaxed font-normal mt-2">{String(c.servicesBody)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-7">
          {services.map((service, index) => (
            <article
              className="rounded-3xl bg-white border border-[#263F32]/12 hover:border-[#D4AF37] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              id={`service-card-${service.id}`}
              key={service.id}
              data-reveal="card"
              data-delay={60 + (index % 3) * 80}
            >
              <div>
                {/* Photo header on all cards for visual symmetry */}
                <div className="relative h-36 sm:h-40 overflow-hidden bg-[#162E22]">
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

                <div className="p-4 sm:p-5">
                  <h3 className={`text-base sm:text-lg font-bold font-serif-editorial text-[#162E22] mb-1.5 group-hover:text-[#9E3D28] transition-colors leading-snug ${
                    locale === "kn" ? "font-kannada-serif" : ""
                  }`}>
                    {service.title[locale]}
                  </h3>
                  <p className="text-xs text-[#252923]/75 leading-relaxed mb-3 line-clamp-2">
                    {service.description[locale]}
                  </p>
                  {/* Interactive Offering Chips with Spring Hover */}
                  <div className="border-t border-[#263F32]/8 pt-3 space-y-2">
                    <div className="text-[11px] font-bold text-[#162E22] uppercase tracking-wider">
                      {locale === "kn" ? "ಲಭ್ಯವಿರುವ ಕೊಡುಗೆಗಳು:" : "Featured Offerings:"}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.features[locale].map((feature) => (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => onEnquire(service.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#F6F3EA] hover:bg-[#D4AF37]/25 border border-[#263F32]/10 text-xs text-[#162E22] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 group/chip"
                          data-cursor="Explore"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] group-hover/chip:scale-125 transition-transform" />
                          <span>{feature}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-transparent">
                <button
                  className="w-full py-3 px-4 rounded-xl bg-[#F6F3EA] hover:bg-[#162E22] text-[#162E22] hover:text-[#F5D77F] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#263F32]/10 hover:border-[#D4AF37] active:scale-95 group/btn"
                  type="button"
                  onClick={() => onEnquire(service.id)}
                  data-cursor="Open"
                >
                  <span>{locale === "kn" ? "ವಿವರಗಳು & ಯೋಜನೆ" : "Explore & Plan"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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

          {/* Feast Styles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
            {[
              {
                title: locale === "kn" ? "ಬಾಳೆ ಎಲೆ ಸಮಾರಾಧನೆ ಊಟ" : "Plantain Leaf Feasts",
                desc: locale === "kn" ? "ಅಪ್ಪಟ ತುಪ್ಪ, ಪಾಯಸ & ೧೨+ ಸಾಂಪ್ರದಾಯಿಕ ತಿನಿಸುಗಳು" : "Traditional sit-down banquet with 12+ items",
              },
              {
                title: locale === "kn" ? "ಪ್ರವಾಸದ ಮೊಬೈಲ್ ಕಿಚನ್" : "Mobile Tour Kitchens",
                desc: locale === "kn" ? "ದೂರದ ಪ್ರವಾಸಿ ತಾಣಗಳಲ್ಲೂ ತಾಜಾ ಬಿಸಿ ಊಟೋಪಚಾರ" : "Fresh hot meals on remote Karnataka circuits",
              },
              {
                title: locale === "kn" ? "ಫಿಲ್ಟರ್ ಕಾಫಿ & ಹೈ-ಟೀ" : "Hi-Tea & Local Snacks",
                desc: locale === "kn" ? "ಮೈಸೂರು ಪಾಕ್, ಮದ್ದೂರು ವಡೆ & ಅಪ್ಪಟ ಕಾಫಿ" : "Mysore filter coffee & regional delicacies",
              },
              {
                title: locale === "kn" ? "೧೦೦% ಶುದ್ಧ ಜೈನ ಆಹಾರ" : "Satvic & Jain Commitment",
                desc: locale === "kn" ? "ಈರುಳ್ಳಿ-ಬೆಳ್ಳುಳ್ಳಿ ರಹಿತ ಪ್ರತ್ಯೇಕ ಅಡುಗೆ ಸೌಲಭ್ಯ" : "No onion/garlic preparation on request",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/70 border border-[#263F32]/10 space-y-0.5">
                <div className="text-xs font-bold text-[#162E22]">{item.title}</div>
                <div className="text-[11px] text-[#252923]/70">{item.desc}</div>
              </div>
            ))}
          </div>

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
  const stepIcons = [MessageSquareHeart, Compass, HeartHandshake];
  const stepTags = {
    en: ["Personal Discovery", "Bespoke Curation", "End-to-End Care"],
    kn: ["ವೈಯಕ್ತಿಕ ಸಮಾಲೋಚನೆ", "ಕಸ್ಟಮ್ ರೂಪರೇಷೆ", "ಪೂರ್ಣ ಜವಾಬ್ದಾರಿ"],
  };

  return (
    <section className="py-12 sm:py-16 bg-[#162E22] text-white relative overflow-hidden border-b border-[#D4AF37]/20" id="process" aria-labelledby="process-title">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16" data-reveal="up">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#F5D77F] uppercase mb-3">
            <span className="w-6 h-px bg-[#D4AF37]" />
            <span>✦</span>
            <span>{String(c.processEyebrow)}</span>
            <span>✦</span>
            <span className="w-6 h-px bg-[#D4AF37]" />
          </div>
          <h2 id="process-title" className={`text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-[#F6F3EA] tracking-tight leading-[1.15] ${locale === "kn" ? "font-kannada-serif" : ""}`}>
            {locale === "kn" ? (
              <>
                ನಾವು ಆಲಿಸುವುದರಿಂದ{" "}
                <em className="text-[#F5D77F] font-normal font-serif-editorial italic">
                  ಆರಂಭಿಸುತ್ತೇವೆ.
                </em>
              </>
            ) : (
              <>
                We begin by{" "}
                <em className="text-[#F5D77F] font-normal font-serif-editorial italic">
                  listening.
                </em>
              </>
            )}
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-white/75 leading-relaxed max-w-xl mx-auto font-normal">
            {locale === "kn"
              ? "ನಿಮ್ಮ ಪ್ರಯಾಣದ ಪ್ರತಿಯೊಂದು ಹೆಜ್ಜೆಯಲ್ಲೂ ನಮ್ಮ ಮಾರ್ಗದರ್ಶನ, ಪರಿಶೀಲಿಸಿದ ವಾಹನಗಳು ಮತ್ತು ಅಪ್ಪಟ ಆತಿಥ್ಯದ ಜವಾಬ್ದಾರಿ ಇರುತ್ತದೆ."
              : "From quiet conversations to custom routes and complete on-ground guardianship, travel at ease without rushed checklists."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {(c.process as string[][]).map(([title, body], index) => {
            const Icon = stepIcons[index] || Compass;
            return (
              <div
                key={title}
                data-reveal="up"
                data-delay={index * 120}
                className="relative rounded-3xl bg-[#1E3A2B]/80 backdrop-blur-md border border-[#D4AF37]/25 hover:border-[#D4AF37] p-5 sm:p-6 shadow-md hover:shadow-2xl transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif-editorial text-2xl font-bold text-[#D4AF37] tracking-wider">
                      0{index + 1}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#162E22] border border-[#D4AF37]/35 text-[#F5D77F] flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-[#D4AF37] transition-all">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold font-serif-editorial text-[#F6F3EA] group-hover:text-[#F5D77F] transition-colors mb-3.5 ${
                    locale === "kn" ? "font-kannada-serif" : ""
                  }`}>
                    {title}
                  </h3>

                  <p className="text-sm text-white/75 leading-relaxed font-normal">
                    {body}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-semibold text-[#F5D77F]/90 uppercase tracking-wider">
                  <span>{stepTags[locale][index] || "Inchara Standard"}</span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function InvitationBanner({ locale, onEnquire }: Props) {
  const c = copy[locale];

  const travelMoments = [
    { image: "/images/hoysala_belur.jpg", title: "Hoysala Belur Heritage" },
    { image: "/images/coorg_misty_plantation_1791795473840.jpg", title: "Coorg Coffee Estates" },
    { image: "/images/kerala_backwaters_luxury.jpg", title: "Kerala Luxury Backwaters" },
    { image: "/images/himachal_alpine_peaks.jpg", title: "Himachal Alpine Peaks" },
    { image: "/images/hampi_stone_chariot_1791795462673.jpg", title: "Hampi Stone Chariot" },
    { image: "/images/signature_gokarna_coast_1791795485390.jpg", title: "Gokarna Coast" },
    { image: "/images/mysuru_palace.jpg", title: "Mysuru Royal Palace" },
    { image: "/images/chikmagalur_peaks.jpg", title: "Chikmagalur Peaks" },
    { image: "/images/banana-leaf-feast.jpg", title: "Satvik Pure Veg Feast" },
    { image: "/images/rajasthan_heritage.jpg", title: "Rajasthan Palaces" },
    { image: "/images/vietnam_halong.jpg", title: "Vietnam Halong Bay" },
    { image: "/images/bali_temple.jpg", title: "Bali Lake Temple" },
    { image: "/images/japan_kyoto.jpg", title: "Kyoto Gardens" },
    { image: "/images/western-ghats-hero.jpg", title: "Western Ghats Trails" },
    { image: "/images/karnataka-heritage.jpg", title: "Karnataka Temple Trails" },
  ];

  return (
    <section className="invitation relative overflow-hidden min-h-[660px] sm:min-h-[720px] flex items-center justify-center bg-[#07130C] border-t border-[#D4AF37]/25" aria-labelledby="invitation-title">
      {/* 3D Drifting Expedition Photo Wall (Full-Bleed 7-Column Canvas, Zero Gaps) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <DriftWall
          items={travelMoments}
          columns={7}
          tileWidth={220}
          tileHeight={150}
          gap={18}
          radius={14}
          tilt={12}
          turn={-10}
          depth={110}
          speed={46}
          variance={0.4}
          parallax={0.6}
          pauseOnHover={false}
          lift={60}
          fade={0.15}
          dim={0.95}
          overlayColor="rgba(7, 19, 12, 0.1)"
          onTileClick={(item) => onEnquire("holidays", item.title)}
        />
      </div>

      {/* Floating Center Luxury Glassmorphic Invitation Card */}
      <div className="shell relative z-10 my-8 sm:my-12 pointer-events-none">
        <div className="max-w-2xl mx-auto px-6 py-8 sm:px-10 sm:py-9 rounded-3xl bg-[#07130C]/65 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_30px_90px_rgba(0,0,0,0.85)] ring-1 ring-[#F5D77F]/25 text-center pointer-events-auto">
          <p className="eyebrow eyebrow--lined text-xs sm:text-sm font-bold tracking-widest text-[#F5D77F] uppercase mb-2.5">
            {String(c.invitationEyebrow)}
          </p>
          <h2 id="invitation-title" className={`text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-white tracking-tight leading-[1.2] mb-3 ${locale === "kn" ? "font-kannada-serif" : ""}`}>
            {locale === "kn" ? (
              <>
                ನಿಮ್ಮ ಹೃದಯದ ಮುಂದಿನ{" "}
                <em className="text-[#F5D77F] font-normal font-serif-editorial italic">
                  ಪಯಣ ಎಲ್ಲಿಗೆ?
                </em>
              </>
            ) : (
              <>
                Where will your heart{" "}
                <em className="text-[#F5D77F] font-normal font-serif-editorial italic">
                  take you next?
                </em>
              </>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal max-w-lg mx-auto mb-6">
            {String(c.invitationBody)}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 !mt-0">
            <button
              className="gold-button group !m-0 h-12 min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider py-3 px-7 rounded-xl shadow-lg hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] transition-all active:scale-95"
              type="button"
              onClick={() => onEnquire()}
            >
              <span className="font-bold text-[#12261C]">{String(c.enquire)}</span>
              <ArrowUpRight className="w-4 h-4 text-[#12261C] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="#destinations"
              className="outline-button group !m-0 h-12 min-h-[48px] w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-white border border-[#D4AF37]/50 hover:border-[#F5D77F] hover:text-[#F5D77F] bg-white/5 hover:bg-white/10 transition-all py-3 px-7 rounded-xl text-xs uppercase font-bold tracking-wider cursor-pointer backdrop-blur-xs active:scale-95"
            >
              <span>{locale === "kn" ? "ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ" : "Explore Destinations"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
