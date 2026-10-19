import React from 'react';
import { Language, Destination } from '../types';
import { destinations } from '../data/destinations';

interface DestinationDiscoveryProps {
  language: Language;
  onSelectDestination: (dest: Destination) => void;
  onOpenPlannerWithDest: (destName: string) => void;
}

export const DestinationDiscovery: React.FC<DestinationDiscoveryProps> = ({
  language,
  onSelectDestination,
  onOpenPlannerWithDest,
}) => {
  const kn = language === 'kn';

  // Map the 5 editorial tiles to corresponding detailed destination objects in destinations.ts
  const karnatakaDest = destinations.find((d) => d.id === 'coorg' || d.category === 'karnataka') || destinations[0];
  const keralaDest = destinations.find((d) => d.id === 'kerala' || d.nameEn.toLowerCase().includes('kerala')) || destinations[1];
  const rajasthanDest = destinations.find((d) => d.id === 'rajasthan' || d.nameEn.toLowerCase().includes('rajasthan')) || destinations[2];
  const himachalDest = destinations.find((d) => d.id === 'himachal' || d.nameEn.toLowerCase().includes('kashmir') || d.nameEn.toLowerCase().includes('himachal')) || destinations[3];
  const globalDest = destinations.find((d) => d.category === 'international') || destinations[4];

  const editorialDestinations = [
    {
      id: 'karnataka',
      name: kn ? 'ಕರ್ನಾಟಕ' : 'Karnataka',
      note: kn ? 'ಕಾಫಿ ತೋಟಗಳು · ಜೀವಂತ ಪರಂಪರೆ · ಕಾನನಗಳು' : 'Coffee estates · living heritage · wild forests',
      image: 'https://images.unsplash.com/photo-1455157823797-3019317cbcf0?auto=format&fit=crop&w=1400&q=85',
      fallbackImage: '/images/coorg_misty_plantation_1791795473840.jpg',
      className: 'destination-lead',
      destObj: karnatakaDest,
    },
    {
      id: 'kerala',
      name: kn ? 'ಕೇರಳ' : 'Kerala',
      note: kn ? 'ತೆಂಗಿನ ಮರಗಳ ಮಡಿಲಲ್ಲಿ ಪ್ರಶಾಂತ ಹಿನ್ನೀರು' : 'Backwaters at the pace of the palms',
      image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1400&q=85',
      fallbackImage: '/images/kerala_backwaters.jpg',
      className: 'destination-tall',
      destObj: keralaDest,
    },
    {
      id: 'rajasthan',
      name: kn ? 'ರಾಜಸ್ಥಾನ' : 'Rajasthan',
      note: kn ? 'ಮರಳುಗಾಡಿನ ಬೆಳಕು ಮತ್ತು ಅರಮನೆಗಳ ಕಥೆ' : 'Desert light and palace stories',
      image: 'https://images.unsplash.com/photo-1713682995521-22ec819b50ac?auto=format&fit=crop&w=1600&q=85',
      fallbackImage: '/images/rajasthan_heritage.jpg',
      className: 'destination-wide',
      destObj: rajasthanDest,
    },
    {
      id: 'himachal',
      name: kn ? 'ಹಿಮಾಚಲ' : 'Himachal',
      note: kn ? 'ಪರ್ವತದ ತಂಗಾಳಿ ಮತ್ತು ಪ್ರಶಾಂತ ಹಳ್ಳಿಗಳು' : 'Mountain air and quiet villages',
      image: 'https://images.unsplash.com/photo-1736914319111-d54ada582633?auto=format&fit=crop&w=1500&q=85',
      fallbackImage: '/images/himalayas_kashmir.jpg',
      className: 'destination-small',
      destObj: himachalDest,
    },
    {
      id: 'beyond-india',
      name: kn ? 'ಅಂತರರಾಷ್ಟ್ರೀಯ' : 'Beyond India',
      note: kn ? 'ವಿಶೇಷ, ಚಿಂತನೆಯಿಂದ ಆಯ್ಕೆಮಾಡಿದ ತಾಣಗಳು' : 'Distinctive places, thoughtfully chosen',
      image: 'https://images.unsplash.com/photo-1653189382464-25302f3e7409?auto=format&fit=crop&w=1400&q=85',
      fallbackImage: '/images/vietnam_halong.jpg',
      className: 'destination-global',
      destObj: globalDest,
    },
  ];

  const handleTileClick = (item: typeof editorialDestinations[0]) => {
    if (item.destObj) {
      onSelectDestination(item.destObj);
    } else {
      onOpenPlannerWithDest(item.name);
    }
  };

  return (
    <section className="destinations section-pad" id="destinations">
      <div className="title-row">
        <div className="section-title">
          <p className="section-label">
            <span>✦</span> {kn ? 'ತಾಣಗಳ ಅನ್ವೇಷಣೆ' : 'DESTINATION DISCOVERY'}
          </p>
          <h2>
            {kn ? (
              <>
                ನಿಧಾನವಾಗಿ ಸಾಗಲು
                <br /> ಯೋಗ್ಯವಾದ <em>ಜಗತ್ತು.</em>
              </>
            ) : (
              <>
                A world worth
                <br /> travelling <em>slowly.</em>
              </>
            )}
          </h2>
          <p className="section-copy">
            {kn
              ? 'ದಕ್ಷಿಣ ಭಾರತದ ನಮ್ಮ ನೆಲೆಯಿಂದ ಪ್ರಪಂಚದ ವಿವಿಧ ಮೂಲೆಗಳವರೆಗೆ, ಪ್ರತಿಯೊಂದು ಮಾರ್ಗವನ್ನೂ ನೀವು ಅನುಭವಿಸುವ ಭಾವನೆಗಳ ಆಧಾರದ ಮೇಲೆ ರೂಪಿಸಲಾಗಿದೆ.'
              : 'From our home in South India to places across the world, every route is chosen for what it lets you feel—not how much it lets you tick off.'}
          </p>
        </div>
        <div className="journey-links">
          <a href="#journeys">
            <span>{kn ? 'ದೇಶೀಯ ಪಯಣಗಳು' : 'Domestic journeys'}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a href="#journeys">
            <span>{kn ? 'ಅಂತರರಾಷ್ಟ್ರೀಯ ಪಯಣಗಳು' : 'International escapes'}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="destination-grid">
        {editorialDestinations.map((item, index) => (
          <div
            className={`destination ${item.className} cursor-pointer`}
            key={item.id}
            onClick={() => handleTileClick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleTileClick(item);
              }
            }}
          >
            <img
              alt={`${item.name} travel landscape`}
              src={item.image}
              loading="lazy"
              onError={(e) => {
                // Fallback to local image if remote fails
                (e.target as HTMLImageElement).src = item.fallbackImage;
              }}
            />
            <span className="image-wash" />
            <div>
              <small>0{index + 1} / {kn ? 'ಅನ್ವೇಷಿಸಿ' : 'EXPLORE'}</small>
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </div>
            <b>
              <span aria-hidden="true">↗</span>
            </b>
          </div>
        ))}
      </div>
    </section>
  );
};
