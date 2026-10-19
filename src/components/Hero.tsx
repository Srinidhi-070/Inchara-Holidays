import React from 'react';
import { Language, Concept } from '../types';

interface HeroProps {
  language: Language;
  onOpenPlanner: () => void;
  onExploreDestinations: () => void;
  concept?: Concept;
  headerSlot?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenPlanner,
  onExploreDestinations,
  concept = 'A',
  headerSlot,
}) => {
  const kn = language === 'kn';

  if (concept === 'B') {
    return (
      <section className="hero hero-journal" id="top">
        {headerSlot}
        <div className="journal-photo photo-munnar" />
        <div className="journal-postcard">
          <span>FIELD NOTE / 01</span>
          <p lang="kn">ಮಣ್ಣಿನ ಕಥೆ. ಜನರ ಆತ್ಮೀಯತೆ.</p>
          <small>Western Ghats · 12.97° N</small>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            {kn
              ? 'ಸಂಸ್ಕೃತಿಯಿಂದ ರೂಪುಗೊಂಡ, ಹೃದಯದಿಂದ ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಯಾಣಗಳು'
              : 'Journeys shaped by culture, guided by heart'}
          </p>
          <h1>
            {kn
              ? 'ನಿಧಾನವಾಗಿ ಸಾಗಿದಾಗ ಪ್ರಯಾಣವೇ ಕಥೆಯಾಗುತ್ತದೆ.'
              : 'Travel becomes a story when you slow down.'}
          </h1>
          <p className="kannada" lang="kn">
            ನಿಧಾನವಾಗಿ ಸಾಗಿ. ಆಳವಾಗಿ ಅನುಭವಿಸಿ.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="button button-gold"
              onClick={onOpenPlanner}
            >
              <span>{kn ? 'ನಿಮ್ಮ ಕಥೆ ಆರಂಭಿಸಿ' : 'Begin your story'}</span>
              <span aria-hidden="true">↗</span>
            </button>
            <button
              type="button"
              className="button button-outline"
              onClick={onExploreDestinations}
            >
              <span>{kn ? 'ಪ್ರಯಾಣ ಪತ್ರಿಕೆ ತೆರೆಯಿರಿ' : 'Open the journal'}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
        <div className="thread-line" aria-hidden="true" />
      </section>
    );
  }

  if (concept === 'C') {
    return (
      <section className="hero hero-global" id="top">
        {headerSlot}
        <div className="global-word" aria-hidden="true">
          BEYOND
        </div>
        <div className="global-image image-one" />
        <div className="global-image image-two" />
        <div className="hero-copy">
          <p className="eyebrow">
            {kn
              ? 'ಭಾರತದಿಂದ ವಿಶ್ವದವರೆಗೆ · ನಿಮಗಾಗಿ ರೂಪಿಸಿದ'
              : 'India to the world · Curated privately'}
          </p>
          <h1>
            {kn ? 'ಇನ್ನೂ' : 'GO'}
            <br />
            <em>{kn ? 'ಮುಂದೆ.' : 'FURTHER.'}</em>
          </h1>
          <p className="kannada" lang="kn">
            ಜಗತ್ತನ್ನು ನಿಮ್ಮ ರೀತಿಯಲ್ಲಿ ಅನ್ವೇಷಿಸಿ.
          </p>
          <button
            type="button"
            className="button button-dark"
            onClick={onOpenPlanner}
          >
            <span>{kn ? 'ನನ್ನ ಪ್ರವಾಸ ರೂಪಿಸಿ' : 'Design my escape'}</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
        <p className="global-caption">
          One thoughtful travel studio.
          <br />A world of uncommon places.
        </p>
      </section>
    );
  }

  // Concept A: Indian Luxury Edit (Default)
  return (
    <section className="hero hero-luxury" id="top">
      {headerSlot}
      <div className="hero-image" />
      <div className="hero-rule" />
      <div className="location-stamp">
        <span>12° 58′ N · 75° 46′ E</span>
        <strong>Western Ghats, India</strong>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">
          {kn
            ? 'ಸಂಸ್ಕೃತಿಯಿಂದ ರೂಪುಗೊಂಡ, ಹೃದಯದಿಂದ ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಯಾಣಗಳು'
            : 'Journeys shaped by culture, guided by heart'}
        </p>
        <h1>
          {kn ? 'ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ,' : 'Discover India,'}
          <br />
          <em>{kn ? 'ಸಾಮಾನ್ಯತೆಯನ್ನು ಮೀರಿ.' : 'beyond the ordinary.'}</em>
        </h1>
        <p className="kannada" lang="kn">
          ಭಾರತವನ್ನು ಹೊಸ ಅನುಭವಗಳೊಂದಿಗೆ ಅನ್ವೇಷಿಸಿ.
        </p>
        <p className="hero-summary">
          {kn
            ? 'ಚಿಂತನೆಯಿಂದ ರೂಪಿಸಿದ ಪ್ರಯಾಣಗಳು, ನೈಜ ಸ್ಥಳೀಯ ಅನುಭವಗಳು ಮತ್ತು ಪ್ರತಿಯೊಂದು ಪ್ರಯಾಣವನ್ನೂ ಆತ್ಮೀಯವಾಗಿಸುವ ಆತಿಥ್ಯ.'
            : 'Thoughtfully curated journeys, authentic local experiences, and hospitality that makes every journey feel personal.'}
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="button button-gold"
            onClick={onOpenPlanner}
          >
            <span>{kn ? 'ಪ್ರಯಾಣ ರೂಪಿಸಿ' : 'Plan your journey'}</span>
            <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            className="button button-outline"
            onClick={onExploreDestinations}
          >
            <span>{kn ? 'ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ' : 'Explore destinations'}</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
      <button
        type="button"
        className="scroll-cue cursor-pointer border-0 bg-transparent text-white"
        onClick={onExploreDestinations}
      >
        <span />
        {kn ? 'ಅನ್ವೇಷಿಸಲು ಕೆಳಗೆ ಸಾಗಿ' : 'Scroll to wander'}
      </button>
    </section>
  );
};
