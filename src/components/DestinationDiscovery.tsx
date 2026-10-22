import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Language, Destination } from '../types';
import { destinations } from '../data/destinations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Detect mobile screen ratio (<= 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth programmatic scroll to target card
  const scrollToCard = useCallback((targetIndex: number) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;
    if (cards[targetIndex]) {
      const card = cards[targetIndex] as HTMLElement;
      const containerLeft = gridRef.current.getBoundingClientRect().left;
      const cardLeft = card.getBoundingClientRect().left;
      const targetScroll = cardLeft - containerLeft + gridRef.current.scrollLeft;

      gridRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
      setActiveIndex(targetIndex);
    }
  }, []);

  // Automatic scrolling every 10 seconds on mobile
  useEffect(() => {
    if (!isMobile) return;

    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const nextIndex = (prev + 1) % editorialDestinations.length;
          scrollToCard(nextIndex);
          return nextIndex;
        });
      }, 10000); // 10 seconds automatic animation
    };

    startTimer();

    // Reset 10s timer on user touch/drag so it doesn't interrupt active manual swiping
    const gridEl = gridRef.current;
    const handleTouchStart = () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    const handleTouchEnd = () => {
      startTimer();
    };

    if (gridEl) {
      gridEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      gridEl.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gridEl) {
        gridEl.removeEventListener('touchstart', handleTouchStart);
        gridEl.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMobile, editorialDestinations.length, scrollToCard]);

  // Synchronize activeIndex on manual touch swipe
  const handleGridScroll = () => {
    if (!gridRef.current || !isMobile) return;
    const scrollLeft = gridRef.current.scrollLeft;
    const cards = gridRef.current.children;
    if (!cards.length) return;

    const cardWidth = (cards[0] as HTMLElement).offsetWidth || 1;
    const gap = 14;
    const computedIndex = Math.round(scrollLeft / (cardWidth + gap));
    const clampedIndex = Math.max(0, Math.min(editorialDestinations.length - 1, computedIndex));

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  };

  const handleTileClick = (item: typeof editorialDestinations[0]) => {
    if (item.destObj) {
      onSelectDestination(item.destObj);
    } else {
      onOpenPlannerWithDest(item.name);
    }
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + editorialDestinations.length) % editorialDestinations.length;
    scrollToCard(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % editorialDestinations.length;
    scrollToCard(nextIndex);
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

      <div
        ref={gridRef}
        onScroll={handleGridScroll}
        className="destination-grid"
      >
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

      {/* Mobile Ratio Auto-Scroll Controls & Indicators */}
      <div className="md:hidden mt-5 pt-3 flex items-center justify-between border-t border-[#263f32]/10 select-none">
        {/* Animated Pills */}
        <div className="flex items-center gap-1.5">
          {editorialDestinations.map((dest, idx) => (
            <button
              key={dest.id}
              type="button"
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to ${dest.name}`}
              className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer border-0 p-0 ${
                activeIndex === idx
                  ? 'w-7 bg-[#9e3d28]'
                  : 'w-2 bg-[#263f32]/25 hover:bg-[#263f32]/50'
              }`}
            />
          ))}
        </div>

        {/* Counter & 10s Timer Indicator */}
        <div className="flex items-center gap-3">
          <div className="text-[11px] font-mono tracking-wider text-[#263f32]/70 flex items-center gap-1">
            <span className="font-bold text-[#9e3d28]">0{activeIndex + 1}</span>
            <span>/</span>
            <span>0{editorialDestinations.length}</span>
            <span className="text-[10px] text-[#263f32]/40 ml-1.5 uppercase tracking-normal">
              · 10s auto
            </span>
          </div>

          {/* Quick Prev / Next Arrows for Mobile Touch */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous destination"
              className="w-7 h-7 rounded-none border border-[#263f32]/20 flex items-center justify-center text-[#263f32]/75 hover:bg-[#263f32]/10 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next destination"
              className="w-7 h-7 rounded-none border border-[#263f32]/20 flex items-center justify-center text-[#263f32]/75 hover:bg-[#263f32]/10 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
