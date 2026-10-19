import React from 'react';
import { Language } from '../types';

interface SignatureJourneyProps {
  language: Language;
  onPlanSignatureJourney: (journeyName?: string) => void;
}

export const SignatureJourney: React.FC<SignatureJourneyProps> = ({
  language,
  onPlanSignatureJourney,
}) => {
  const kn = language === 'kn';

  const journeys = [
    {
      id: 'karnataka-soul',
      name: kn ? 'ಕರ್ನಾಟಕದ ಆತ್ಮ' : 'The Soul of Karnataka',
      meta: kn ? '೮ ದಿನಗಳು · ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪ್ರಕೃತಿ' : '8 days · Culture & nature',
      image: 'https://images.unsplash.com/photo-1455157823797-3019317cbcf0?auto=format&fit=crop&w=1400&q=85',
      fallbackImage: '/images/coorg_misty_plantation_1791795473840.jpg',
    },
    {
      id: 'ghats-monsoon',
      name: kn ? 'ಘಟ್ಟಗಳಲ್ಲಿ ಮಳೆಗಾಲ' : 'Monsoon in the Ghats',
      meta: kn ? '೫ ದಿನಗಳು · ನಿಧಾನ & ಪುನರುಜ್ಜೀವನ' : '5 days · Slow & restorative',
      image: 'https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?auto=format&fit=crop&w=2000&q=88',
      fallbackImage: '/images/hero_western_ghats_1791795450720.jpg',
    },
    {
      id: 'rajasthan-royal',
      name: kn ? 'ರಾಜಸ್ಥಾನದ ವೈಭವ' : 'Royal Rajasthan',
      meta: kn ? '೯ ದಿನಗಳು · ಪರಂಪರೆ & ಸಂಪ್ರದಾಯ' : '9 days · Heritage & cuisine',
      image: 'https://images.unsplash.com/photo-1713682995521-22ec819b50ac?auto=format&fit=crop&w=1600&q=85',
      fallbackImage: '/images/rajasthan_heritage.jpg',
    },
    {
      id: 'himalayan-quietude',
      name: kn ? 'ಹಿಮಾಲಯದ ಶಾಂತಿ' : 'Himalayan Quietude',
      meta: kn ? '೭ ದಿನಗಳು · ಪರ್ವತಗಳ ಮಡಿಲಲ್ಲಿ' : '7 days · Mountain retreat',
      image: 'https://images.unsplash.com/photo-1736914319111-d54ada582633?auto=format&fit=crop&w=1500&q=85',
      fallbackImage: '/images/himalayas_kashmir.jpg',
    },
  ];

  return (
    <section className="journeys section-pad" id="journeys">
      <div className="journey-head">
        <div className="section-title light">
          <p className="section-label">
            <span>✦</span> {kn ? 'ವಿಶೇಷ ಪಯಣಗಳು' : 'SIGNATURE JOURNEYS'}
          </p>
          <h2>
            {kn ? (
              <>
                ಮನದಲ್ಲಿ ಉಳಿಯುವ
                <br /> ನೆನಪುಗಳು.
              </>
            ) : (
              <>
                Made to stay
                <br /> with you.
              </>
            )}
          </h2>
          <p className="section-copy">
            {kn
              ? 'ಪ್ರಕೃತಿ ಮತ್ತು ಸಂಸ್ಕೃತಿಯೊಂದಿಗೆ ಗಾಢ ಸಂಪರ್ಕ ಕಲ್ಪಿಸುವ ವಿಶಿಷ್ಟ ಪ್ರಯಾಣಗಳ ಸಣ್ಣ ಸಂಗ್ರಹ. ಇವು ಆರಂಭ ಮಾತ್ರ—ಉಳಿದುದನ್ನು ನಿಮ್ಮ ಇಚ್ಛೆಯಂತೆ ರೂಪಿಸುತ್ತೇವೆ.'
              : 'A small collection of journeys with a strong sense of place. Consider these a beginning—we shape the rest around you.'}
          </p>
        </div>
        <button
          type="button"
          className="button button-outline"
          onClick={() => onPlanSignatureJourney()}
        >
          <span>{kn ? 'ಎಲ್ಲ ಪಯಣಗಳನ್ನು ನೋಡಿ' : 'View all journeys'}</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="journey-list">
        {journeys.map((journey, index) => (
          <a
            href="#planner"
            key={journey.id}
            onClick={(e) => {
              e.preventDefault();
              onPlanSignatureJourney(journey.name);
            }}
          >
            <span>0{index + 1}</span>
            <h3>{journey.name}</h3>
            <p>{journey.meta}</p>
            <div className="journey-thumb">
              <img
                alt={journey.name}
                src={journey.image}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = journey.fallbackImage;
                }}
              />
            </div>
            <b>
              <span aria-hidden="true">↗</span>
            </b>
          </a>
        ))}
      </div>
    </section>
  );
};
