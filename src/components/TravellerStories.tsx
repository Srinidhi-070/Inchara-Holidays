import { communityReflections } from "../data/community";
import type { Locale } from "../types";

type Props = {
  locale: Locale;
};

export function TravellerStories({ locale }: Props) {
  const isKn = locale === "kn";

  return (
    <section className="stories-section section" aria-labelledby="stories-title">
      <div className="shell">
        <div className="section-intro" data-reveal="up">
          <p className="eyebrow">{isKn ? "ಪ್ರಯಾಣಿಕರ ಅನುಭವಗಳು" : "Traveller Reflections"}</p>
          <h2 id="stories-title" className={isKn ? "font-kannada-serif" : ""}>
            {isKn ? "ಆತ್ಮೀಯ ಪಯಣದ ನೈಜ ನೆನಪುಗಳು." : "Reflections from Fellow Travellers."}
          </h2>
          <p>
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
