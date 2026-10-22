import React, { useState } from 'react';
import { Language } from '../types';
import { communityReflections } from '../data/community';

interface TravellerStoriesProps {
  language: Language;
}

export const TravellerStories: React.FC<TravellerStoriesProps> = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const kn = language === 'kn';

  const storyImages = [
    'https://images.unsplash.com/photo-1736914319111-d54ada582633?auto=format&fit=crop&w=1500&q=85',
    'https://images.unsplash.com/photo-1455157823797-3019317cbcf0?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1400&q=85',
  ];

  const currentStory = communityReflections[currentIndex] || communityReflections[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : communityReflections.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < communityReflections.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="stories section-pad" id="stories">
      <div className="stories-heading">
        <div className="section-title">
          <p className="section-label">
            <span>✦</span> {kn ? 'ಪ್ರಯಾಣಿಕರ ನೆನಪುಗಳು' : 'TRAVELLER STORIES'}
          </p>
          <h2>
            {kn ? (
              <>
                ಪಯಣದ ಹಾದಿಯ
                <br /> ನೈಜ <em>ನೆನಪುಗಳು.</em>
              </>
            ) : (
              <>
                Notes from
                <br /> the <em>road.</em>
              </>
            )}
          </h2>
        </div>
        <p>
          {kn
            ? 'ಇಂಚರ ಪ್ರಯಾಣಿಕರ ಸಾರ್ಥಕ ನೆನಪುಗಳು—ಪ್ರಶಾಂತ ಮುಂಜಾನೆಗಳು, ಅನಿರೀಕ್ಷಿತ ಸಂಭಾಷಣೆಗಳು ಮತ್ತು ಮನೆಯಂತೆ ಭಾಸವಾದ ತಾಣಗಳು.'
            : 'Space for real memories from Inchara travellers—unhurried mornings, unexpected conversations, and places that felt like home.'}
        </p>
      </div>

      <div className="story-layout">
        <img
          alt="Quiet travel landscape in India"
          src={storyImages[currentIndex % storyImages.length]}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/himalayas_kashmir.jpg';
          }}
        />
        <blockquote>
          <span>
            {kn ? 'ಪ್ರಯಾಣಿಕರ ಅನುಭವ / ' : 'TRAVELLER REFLECTION / '}
            {kn ? currentStory.noteKn : currentStory.noteEn}
          </span>
          <p>
            {kn ? currentStory.quoteKn : currentStory.quoteEn}
          </p>
          <footer>
            {kn ? currentStory.authorKn : currentStory.authorEn} ·{' '}
            {kn ? currentStory.journeyKn : currentStory.journeyEn}
          </footer>
        </blockquote>

        <div className="story-controls">
          <button
            aria-label="Previous story"
            type="button"
            onClick={handlePrev}
          >
            ←
          </button>
          <span>
            0{currentIndex + 1} / 0{communityReflections.length}
          </span>
          <button
            aria-label="Next story"
            type="button"
            onClick={handleNext}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};
