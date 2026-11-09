import { communityReflections } from "../data/community";
import type { Locale } from "../types";

type Props = {
  locale: Locale;
};

export function TravellerStories({ locale }: Props) {
  const isKn = locale === "kn";

  return (
    <section className="stories-section section bg-[#F6F3EA] bg-kolam-subtle scroll-mt-24" aria-labelledby="stories-title">
      <div className="shell">
        <div className="section-intro" data-reveal="up">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#9E3D28] uppercase mb-2.5">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <span>✦</span>
            <span>{isKn ? "ಪ್ರಯಾಣಿಕರ ಅನುಭವಗಳು" : "TRAVELLER REFLECTIONS"}</span>
            <span>✦</span>
            <span className="w-5 h-px bg-[#D4AF37]" />
          </div>
          <h2 id="stories-title" className={`text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-[#162E22] tracking-tight leading-[1.18] ${isKn ? "font-kannada-serif" : ""}`}>
            {isKn ? (
              <>
                ಆತ್ಮೀಯ ಪಯಣದ{" "}
                <em className="text-[#9E3D28] font-normal font-serif-editorial italic">
                  ನೈಜ ನೆನಪುಗಳು.
                </em>
              </>
            ) : (
              <>
                Reflections from{" "}
                <em className="text-[#9E3D28] font-normal font-serif-editorial italic">
                  Fellow Travellers.
                </em>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-[#252923]/75 leading-relaxed font-normal mt-3">
            {isKn
              ? "ನಮ್ಮೊಂದಿಗೆ ಪ್ರಯಾಣಿಸಿದ ಅತಿಥಿಗಳ ಮನದಾಳದ ನುಡಿಗಳು ಮತ್ತು ಮಲೆನಾಡು ಆತಿಥ್ಯದ ನೆನಪುಗಳು."
              : "Unhurried journeys, personalized pacing, and authentic South Indian hospitality remembered with warmth."}
          </p>
        </div>

        <div className="stories-grid">
          {communityReflections.map((story, idx) => (
            <article className="story-card" key={story.id} data-reveal="card" data-delay={80 + idx * 80}>
              <blockquote className="story-card__quote">
                {isKn ? story.quoteKn : story.quoteEn}
              </blockquote>
              <div className="story-card__author">
                <div>
                  <div className="story-card__name">{isKn ? story.authorKn : story.authorEn}</div>
                  <div className="story-card__route">{isKn ? story.journeyKn : story.journeyEn}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
