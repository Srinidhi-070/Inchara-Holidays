import React from 'react';
import { Language } from '../types';

interface OurStoryProps {
  language: Language;
  onOpenPlanner?: () => void;
}

export const OurStory: React.FC<OurStoryProps> = ({ language, onOpenPlanner }) => {
  const kn = language === 'kn';

  const principles = [
    {
      number: '01',
      title: kn ? 'ನಿಮಗಾಗಿ ರೂಪಿಸಿದ ಯೋಜನೆ' : 'Planned around you',
      copy: kn
        ? 'ವೇಗ, ಆಸಕ್ತಿಗಳು ಮತ್ತು ಅನುಕೂಲತೆಯೇ ಪ್ರತಿಯೊಂದು ಮಾರ್ಗವನ್ನೂ ರೂಪಿಸುತ್ತವೆ.'
        : 'Pace, interests and comfort shape every route.',
    },
    {
      number: '02',
      title: kn ? 'ಮಣ್ಣಿನ ಸಂಸ್ಕೃತಿಯಲ್ಲಿ ಬೇರೂರಿದೆ' : 'Rooted in place',
      copy: kn
        ? 'ಸ್ಥಳೀಯ ಧ್ವನಿಗಳು, ಶುದ್ಧ ಸಾಂಪ್ರದಾಯಿಕ ಆಹಾರ ಮತ್ತು ಅರ್ಥಪೂರ್ಣ ಭೇಟಿಗಳು.'
        : 'Local voices, pure vegetarian cuisine and meaningful encounters.',
    },
    {
      number: '03',
      title: kn ? 'ಸದಾ ಜೊತೆಗಿರುವ ಆಪ್ತ ಆತಿಥ್ಯ' : 'Hospitality that stays close',
      copy: kn
        ? 'ಯೋಚನೆಯಿಂದ ಹಿಡಿದು ಮನೆಗೆ ಮರಳುವವರೆಗೆ ಸದಾ ಸಹಾಯಕವಾದ ಸ್ನೇಹಪರ ಸಾಮೀಪ್ಯ.'
        : 'A helpful human presence, from idea to homecoming.',
    },
  ];

  return (
    <section className="difference section-pad" id="difference">
      <div className="difference-photo">
        <img
          alt="Houseboat moving peacefully through Kerala backwaters"
          src="https://images.unsplash.com/photo-1593417033942-bcdf26b74700?auto=format&fit=crop&w=1400&q=85"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/kerala_backwaters.jpg';
          }}
        />
        <div className="photo-note">
          <span>{kn ? 'ನಮ್ಮ ತತ್ವ / OUR PHILOSOPHY' : 'Our philosophy / ನಮ್ಮ ತತ್ವ'}</span>
          <p>{kn ? 'ಸಾರ್ಥಕವಾಗಿ ಪಯಣಿಸಿ. ಬದಲಾಗಿ ಮರಳಿ.' : 'Travel well. Return changed.'}</p>
        </div>
      </div>

      <div className="difference-copy">
        <div className="section-title">
          <p className="section-label">
            <span>✦</span> {kn ? 'ಇಂಚರ ವೈಶಿಷ್ಟ್ಯ' : 'THE INCHARA DIFFERENCE'}
          </p>
          <h2>
            {kn ? (
              <>
                ಚಿಕ್ಕ ವಿವರಗಳೇ
                <br /> ಅತ್ಯಂತ <em>ಆಳವಾದ ಪಯಣ.</em>
              </>
            ) : (
              <>
                The smallest details
                <br /> make the <em>deepest journeys.</em>
              </>
            )}
          </h2>
        </div>

        <p className="lead">
          {kn
            ? 'ಉತ್ತಮ ಪ್ರಯಾಣವು ಆಲಿಸುವುದರಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ. ನಿಮಗೆ, ಸ್ಥಳಕ್ಕೆ ಮತ್ತು ಅದನ್ನು ತನ್ನ ಮನೆ ಎಂದು ಕರೆಯುವ ಜನರಿಗೆ.'
            : 'We believe thoughtful travel starts with listening. To you, to a place, and to the people who call it home.'}
        </p>

        <div className="principles">
          {principles.map((item) => (
            <div key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>

        {onOpenPlanner && (
          <div className="mt-10">
            <button
              type="button"
              className="button button-gold"
              onClick={onOpenPlanner}
            >
              <span>{kn ? 'ನಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಿ' : 'Plan your journey'}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
