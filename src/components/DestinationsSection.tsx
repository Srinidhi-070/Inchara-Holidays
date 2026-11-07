import { destinations } from "../data/destinations";
import type { Locale, ServiceId } from "../types";
import { ArrowUpRight } from "./Icons";

type Props = {
  locale: Locale;
  onEnquire: (service?: ServiceId) => void;
};

export function DestinationsSection({ locale, onEnquire }: Props) {
  const isKn = locale === "kn";
  const featured = destinations.slice(0, 6);

  return (
    <section className="destinations-section section" id="destinations" aria-labelledby="destinations-title">
      <div className="shell">
        <div className="section-intro" data-reveal="up">
          <p className="eyebrow">{isKn ? "ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆಯ ತಾಣಗಳು" : "Regions & Sanctuaries"}</p>
          <h2 id="destinations-title" className={isKn ? "font-kannada-serif" : ""}>
            {isKn ? "ಕರ್ನಾಟಕದ ನೈಜ ಸೌಂದರ್ಯವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ." : "Timeless Horizons of Karnataka."}
          </h2>
          <p>
            {isKn
              ? "ಪಶ್ಚಿಮ ಘಟ್ಟದ ತಂಪು ಗಿರಿಶಿಖರಗಳು, ಯುನೆಸ್ಕೋ ಶಿಲ್ಪಕಲೆಯ ಭವ್ಯತೆ ಮತ್ತು ಕರಾವಳಿಯ ಪ್ರಶಾಂತ ಕಡಲತೀರಗಳು."
              : "Lush mist-laden Ghats, monolithic temple spires, wildlife sanctuaries, and secluded coastal cliffs."}
          </p>
        </div>

        <div className="destinations-grid">
          {featured.map((dest, idx) => (
            <article
              className="destination-card"
              key={dest.id}
              data-reveal="card"
              data-delay={60 + (idx % 3) * 70}
              onClick={() => onEnquire("holidays")}
            >
              <img
                src={dest.image}
                alt={dest.imageAlt}
                className="destination-card__img"
                loading="lazy"
                width="600"
                height="450"
              />
              <div className="destination-card__overlay">
                <span className="destination-card__region">{isKn ? dest.regionKn : dest.regionEn}</span>
                <h3 className="destination-card__name">{isKn ? dest.nameKn : dest.nameEn}</h3>
                <p className="destination-card__sight">{isKn ? dest.tagKn : dest.tagEn}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-[#f5d77f] font-semibold">
                  <span>{isKn ? "ಪ್ರವಾಸ ವಿಚಾರಿಸಿ" : "Enquire Journey"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
