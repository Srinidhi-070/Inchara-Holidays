import React, { useState, useEffect } from 'react';
import { Concept } from '../types';
import { X } from 'lucide-react';

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

  if (dismissed) return null;

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
        title="Dismiss concept switcher"
        aria-label="Dismiss concept switcher"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
