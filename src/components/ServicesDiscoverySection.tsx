import React from 'react';
import { Language } from '../types';

interface ServicesDiscoverySectionProps {
  language: Language;
  onOpenPlanner: (initialDest?: string, initialExp?: string) => void;
  onOpenCorporateModal: () => void;
  onOpenCateringModal: () => void;
  onOpenSchoolModal: () => void;
}

export const ServicesDiscoverySection: React.FC<ServicesDiscoverySectionProps> = ({
  language,
  onOpenPlanner,
  onOpenCorporateModal,
  onOpenCateringModal,
  onOpenSchoolModal,
}) => {
  const kn = language === 'kn';

  return (
    <section className="services" id="services">
      <div className="services-heading section-pad">
        <div className="section-title">
          <p className="section-label">
            <span>✦</span> {kn ? 'ಕೇವಲ ಪ್ರವಾಸ ಮಾತ್ರವಲ್ಲ' : 'MORE THAN TRAVEL'}
          </p>
          <h2>
            {kn ? (
              <>
                ಆತಿಥ್ಯ,
                <br /> ಅದರ ಎಲ್ಲ <em>ರೂಪಗಳಲ್ಲಿ.</em>
              </>
            ) : (
              <>
                Hospitality,
                <br /> in all its <em>forms.</em>
              </>
            )}
          </h2>
        </div>
        <p>
          {kn
            ? 'ಒಂದು ಜವಾಬ್ದಾರಿಯುತ ತಂಡ, ಜನರನ್ನು ಒಗ್ಗೂಡಿಸಲು ನಾಲ್ಕು ವಿಶಿಷ್ಟ ಮಾರ್ಗಗಳು. ಮೊದಲ ಸಂಭಾಷಣೆಯಿಂದ ಹಿಡಿದು ಅಂತಿಮ ಬೀಳ್ಕೊಡುಗೆಯವರೆಗೆ ಪ್ರತಿಯೊಂದು ವಿವರವನ್ನೂ ಗಮನಿಸಲಾಗುತ್ತದೆ.'
            : 'One attentive team, four ways to bring people together. Every detail is considered, from the first conversation to the final farewell.'}
        </p>
      </div>

      {/* Service 01: Curated Holidays */}
      <div className="service-holidays" id="service-packages">
        <img
          alt="Lush tea gardens in Munnar"
          src="https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?auto=format&fit=crop&w=2000&q=88"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/hero_western_ghats_1791795450720.jpg';
          }}
        />
        <div className="service-number">01</div>
        <div className="service-copy">
          <span>{kn ? 'ವೈಯಕ್ತಿಕ ಮತ್ತು ಗುಂಪು ಪ್ರವಾಸ' : 'PRIVATE & GROUP TRAVEL'}</span>
          <h3>{kn ? 'ವಿನ್ಯಾಸಗೊಳಿಸಿದ ರಜಾ ದಿನಗಳು' : 'Curated Holidays'}</h3>
          <p>
            {kn
              ? 'ಭಾರತ ಮತ್ತು ವಿದೇಶಗಳಲ್ಲಿ ನಿಮ್ಮ ಅಭಿರುಚಿಗೆ ತಕ್ಕಂತೆ ರೂಪಿಸಿದ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಪ್ರಯಾಣಗಳು.'
              : 'Personalised journeys across India and beyond, built around your pace and curiosities.'}
          </p>
          <button
            type="button"
            className="button button-text"
            onClick={() => onOpenPlanner()}
          >
            <span>{kn ? 'ಪ್ರವಾಸ ಅನ್ವೇಷಿಸಿ' : 'Discover holidays'}</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      {/* Service 02 & 03: Corporate and Catering */}
      <div className="service-duo">
        {/* Service 02: Corporate Events */}
        <article className="service-corporate" id="service-corporate">
          <span className="service-number">02</span>
          <p className="mini-label">{kn ? 'ಉದ್ದೇಶಪೂರ್ವಕ ಸಭೆ' : 'GATHER WITH PURPOSE'}</p>
          <h3>{kn ? 'ಕಾರ್ಪೊರೇಟ್ ಕಾರ್ಯಕ್ರಮಗಳು' : 'Corporate Events'}</h3>
          <p>
            {kn
              ? 'ತಂಡದ ಸಮ್ಮೇಳನಗಳು, ರಿಟ್ರೀಟ್‌ಗಳು ಮತ್ತು ಆಫ್‌ಸೈಟ್‌ಗಳು — ಸರಿಯಾದ ಸ್ಥಳ ಮತ್ತು ನಿಖರ ಯೋಜನೆಯೊಂದಿಗೆ ಸ್ಮರಣೀಯ.'
              : 'Team offsites, retreats and conferences made memorable through place, people and precision.'}
          </p>
          <div className="line-illustration" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <button
            type="button"
            className="button button-text"
            onClick={onOpenCorporateModal}
          >
            <span>{kn ? 'ಕಾರ್ಯಕ್ರಮ ರೂಪಿಸಿ' : 'Plan an event'}</span>
            <span aria-hidden="true">↗</span>
          </button>
        </article>

        {/* Service 03: Catering & Hospitality (100% Pure Vegetarian) */}
        <article className="service-food" id="service-catering">
          <img
            alt="Pure vegetarian South Indian feast and travel meal"
            src="/images/pure_veg_travel_meal.jpg"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/south_indian_feast.jpg';
            }}
          />
          <div className="food-caption">
            <span>{kn ? '೦೩ / ಕ್ಯಾಟರಿಂಗ್ ಮತ್ತು ಆತಿಥ್ಯ' : '03 / CATERING & HOSPITALITY'}</span>
            <h3>{kn ? 'ಕಥೆಗಳಿಂದ ತುಂಬಿದ ಔತಣ.' : 'A table full of stories.'}</h3>
            <p>
              {kn
                ? 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಸಾಂಪ್ರದಾಯಿಕ ಅಡುಗೆಗಳು ಮತ್ತು ಪ್ರತಿಯೊಂದು ಸಮಾರಂಭಕ್ಕೂ ಶ್ರೇಷ್ಠ ಆತಿಥ್ಯ.'
                : 'Regional 100% pure vegetarian menus and warm hospitality for celebrations of every scale.'}
            </p>
            <button
              type="button"
              className="button button-outline"
              onClick={onOpenCateringModal}
            >
              <span>{kn ? 'ಕ್ಯಾಟರಿಂಗ್ ವಿವರಗಳು' : 'Explore catering'}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </article>
      </div>

      {/* Service 04: School & Educational Trips */}
      <div className="service-school section-pad" id="service-school">
        <div className="school-art">
          <div className="arch">
            <img
              alt="Himalayan heritage architecture"
              src="https://images.unsplash.com/photo-1736914309887-6403a7a7b9b8?auto=format&fit=crop&w=1000&q=85"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/south_indian_temple.jpg';
              }}
            />
          </div>
          <span className="orbit">LEARN · WONDER · CONNECT ·</span>
        </div>
        <div className="school-copy">
          <span>{kn ? '೦೪ / ಶಾಲಾ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸಗಳು' : '04 / SCHOOL & EDUCATIONAL TRIPS'}</span>
          <h3>
            {kn
              ? 'ಜಗತ್ತೇ ಅತ್ಯಂತ ಸಜೀವ ತರಗತಿ.'
              : 'The world is the most vivid classroom.'}
          </h3>
          <p>
            {kn
              ? 'ಇತಿಹಾಸ, ಸಂಸ್ಕೃತಿ, ಪರಿಸರ ಮತ್ತು ಸಮುದಾಯವನ್ನು ವಿದ್ಯಾರ್ಥಿಗಳು ನೆನಪಿಡುವ ಅನುಭವಗಳಾಗಿ ಪರಿವರ್ತಿಸುವ ಚಿಂತನಶೀಲ ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸಗಳು.'
              : 'Thoughtfully organised educational excursions that turn history, culture, ecology and community into experiences students remember.'}
          </p>
          <button
            type="button"
            className="button button-dark"
            onClick={onOpenSchoolModal}
          >
            <span>{kn ? 'ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸ ರೂಪಿಸಿ' : 'Plan an educational trip'}</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};
