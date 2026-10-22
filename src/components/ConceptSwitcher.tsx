import React, { useState, useEffect } from 'react';
import { Concept } from '../types';
import { X, Sparkles } from 'lucide-react';

interface ConceptSwitcherProps {
  concept: Concept;
  onChange: (concept: Concept) => void;
}

export const ConceptSwitcher: React.FC<ConceptSwitcherProps> = ({
  concept,
  onChange,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide dock automatically once scrolled past the hero section
      if (window.scrollY > 250) {
        setScrolledAway(true);
      } else {
        setScrolledAway(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const concepts: { id: Concept; num: string; name: string; detail: string }[] = [
    {
      id: 'A',
      num: '01',
      name: 'Indian Luxury Edit',
      detail: 'Quiet, cinematic, refined',
    },
    {
      id: 'B',
      num: '02',
      name: 'Living Travel Journal',
      detail: 'Layered, tactile, storied',
    },
    {
      id: 'C',
      num: '03',
      name: 'Global Explorer',
      detail: 'Bold, modern, expansive',
    },
  ];

  // If minimized, display a sleek reopen button so you can bring it back anytime
  if (dismissed) {
    return (
      <aside
        className={`fixed z-40 left-1/2 -translate-x-1/2 bottom-3 transition-all duration-300 ${
          scrolledAway ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
        aria-label="Reopen art directions dock"
      >
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-[#162e22]/95 hover:bg-[#1f3f2f] text-white border border-[#f5d77f]/40 shadow-xl backdrop-blur-md rounded-none text-xs font-medium transition-all cursor-pointer hover:border-[#f5d77f] group"
          title="Reopen concept preview dock"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#f5d77f]" />
          <span className="font-serif tracking-wide text-[#f6f3ea]">
            Art Directions <span className="text-[#f5d77f] font-mono text-[11px] ml-1">0{concept === 'A' ? '1' : concept === 'B' ? '2' : '3'}</span>
          </span>
          <span className="text-[10px] text-[#f5d77f]/80 group-hover:text-white uppercase tracking-wider ml-1">
            ↑ Reopen
          </span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      className={`concept-dock ${scrolledAway ? 'dock-hidden' : ''}`}
      aria-label="Explore three homepage concepts"
    >
      <div className="concept-intro">
        <span>03 directions / 01 spirit</span>
        <p>Choose an art direction</p>
      </div>
      <div className="concept-options">
        {concepts.map((item) => (
          <button
            className={concept === item.id ? 'active' : ''}
            key={item.id}
            onClick={() => onChange(item.id)}
            type="button"
          >
            <b>{item.num}</b>
            <span>
              <strong>{item.name}</strong>
              <small>{item.detail}</small>
            </span>
          </button>
        ))}
      </div>
      <span className="selected-note">
        {concept === 'A' ? 'Selected direction' : 'Concept preview'}
      </span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="concept-dismiss-btn"
        title="Minimize concept switcher"
        aria-label="Minimize concept switcher"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
