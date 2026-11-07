import { useState } from "react";
import { samplePackages } from "../data/packages";
import type { Locale, ServiceId, SamplePackage } from "../types";
import { ArrowUpRight, Check } from "./Icons";

type Props = {
  locale: Locale;
  onEnquire: (service?: ServiceId) => void;
  onViewItinerary?: (pkg: SamplePackage) => void;
};

export function PackagesSection({ locale, onEnquire, onViewItinerary }: Props) {
  const [filter, setFilter] = useState<"all" | "karnataka" | "panIndia" | "international">("all");
  const isKn = locale === "kn";

  const filtered = filter === "all" ? samplePackages : samplePackages.filter((p) => p.category === filter);

  const categories = [
    { id: "all", label: { en: "All Packages", kn: "ಎಲ್ಲಾ ಪ್ಯಾಕೇಜ್‌ಗಳು" } },
    { id: "karnataka", label: { en: "Karnataka & Malnad", kn: "ಕರ್ನಾಟಕ & ಮಲೆನಾಡು" } },
    { id: "panIndia", label: { en: "Pan-India Circuits", kn: "ರಾಷ್ಟ್ರೀಯ ಪಯಣಗಳು" } },
    { id: "international", label: { en: "International Escapes", kn: "ಅಂತರರಾಷ್ಟ್ರೀಯ ರಜೆಗಳು" } },
  ];

  return (
    <section className="packages-section section" id="packages" aria-labelledby="packages-title">
      <div className="shell">
        <div className="section-intro" data-reveal="up">
          <p className="eyebrow">{isKn ? "ವಿನ್ಯಾಸಗೊಳಿಸಿದ ಪ್ರವಾಸ ಯೋಜನೆಗಳು" : "Curated Holiday Blueprints"}</p>
          <h2 id="packages-title" className={isKn ? "font-kannada-serif" : ""}>
            {isKn ? "ಜನಪ್ರಿಯ ರಜಾದಿನಗಳ ಮಾದರಿ ಪ್ಯಾಕೇಜ್‌ಗಳು." : "Curated Journeys Ready to Experience."}
          </h2>
          <p>
            {isKn
              ? "ಹಂಪಿ, ಬಾದಾಮಿ, ಕೊಡಗಿನ ಕಾಫಿ ತೋಟಗಳಿಂದ ಹಿಡಿದು ರಾಜಸ್ಥಾನ ಮತ್ತು ಕೇರಳದ ಹಿನ್ನೀರವರೆಗೆ — ನಿಮ್ಮಿಷ್ಟಕ್ಕೆ ತಕ್ಕಂತೆ ಬದಲಾಯಿಸಬಹುದಾದ ಮಾದರಿ ರೂಪರೇಷೆಗಳು."
              : "From the stone monoliths of Hampi and misty coffee estates of Coorg to royal desert circuits and serene backwaters — verified journeys tailored to your rhythm."}
          </p>
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  filter === cat.id
                    ? "bg-[#162E22] text-[#F5D77F] border-[#D4AF37] shadow-sm"
                    : "bg-white text-[#162E22] border-[#162E22]/15 hover:border-[#D4AF37] hover:bg-[#F6F3EA]"
                }`}
                onClick={() => setFilter(cat.id as any)}
              >
                {cat.label[locale]}
              </button>
            ))}
          </div>
        </div>

        <div className="packages-grid">
          {filtered.map((pkg, idx) => (
            <article className="package-card" key={pkg.id} data-reveal="card" data-delay={80 + (idx % 3) * 60}>
              <div className="package-card__media">
                <img src={pkg.image} alt={pkg.imageAlt} loading="lazy" width="600" height="400" />
                <span className="package-card__badge">{isKn ? pkg.badgeKn : pkg.badgeEn}</span>
                <span className="package-card__duration">{isKn ? pkg.durationKn : pkg.durationEn}</span>
              </div>
              <div className="package-card__content">
                <h3 className="package-card__title">{isKn ? pkg.titleKn : pkg.titleEn}</h3>
                <ul className="space-y-1.5 my-3 flex-1">
                  {(isKn ? pkg.highlightsKn : pkg.highlightsEn).slice(0, 3).map((hl) => (
                    <li key={hl} className="text-xs text-[#2b3a32] flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold mt-0.5">✦</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
                <div className="package-card__footer">
                  {onViewItinerary && (
                    <button
                      type="button"
                      className="text-xs font-semibold text-[#8a321f] hover:underline"
                      onClick={() => onViewItinerary(pkg)}
                    >
                      {isKn ? "ದಿನಚರಿ ನೋಡಿ" : "View Itinerary"}
                    </button>
                  )}
                  <button
                    className="gold-button !min-h-[40px] !py-2 !px-3.5 !text-[11px]"
                    type="button"
                    onClick={() => onEnquire("holidays")}
                  >
                    {isKn ? "ಪಯಣ ರೂಪಿಸಿ" : "Plan This Tour"}
                    <ArrowUpRight />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
