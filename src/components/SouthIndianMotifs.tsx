import React from 'react';

interface MotifProps {
  className?: string;
  size?: number | string;
  color?: string;
}

/**
 * Mysore Dasara Royal Ambari Elephant (ಅಂಬಾರಿ ಆನೆ)
 * Iconic symbol of Karnataka heritage, Mysore Palace Dasara Jamboo Savari,
 * carrying the sacred golden howdah with floral caparisons.
 */
export const AmbariElephant: React.FC<MotifProps> = ({
  className = 'w-10 h-10',
  size,
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Howdah / Mantapa on back */}
    <path
      d="M48 34H72V30C72 26 68 22 60 20C52 22 48 26 48 30V34Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M59 12V20M59 12L65 14L59 16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M50 30H70M53 26H67"
      stroke="#FBF8F1"
      strokeWidth="1.2"
    />
    {/* Pillars of Howdah */}
    <rect x="50" y="34" width="3" height="8" rx="1" fill={color} />
    <rect x="58.5" y="34" width="3" height="8" rx="1" fill={color} />
    <rect x="67" y="34" width="3" height="8" rx="1" fill={color} />
    <path d="M46 42H74V44H46V42Z" fill={color} />

    {/* Elephant Body & Head */}
    <path
      d="M74 44C82 45 88 50 91 56C93 60 92 65 91 69C95 68 100 66 104 60C106 57 106 54 105 52C104 50 100 48 98 48C97 45 94 43 91 43C88 43 85 41 83 40C78 38 72 40 70 42L74 44Z"
      fill={color}
    />
    {/* Trunk raised in auspicious royal salute */}
    <path
      d="M91 69C90 73 93 78 96 82C99 86 103 89 108 88C112 87 114 83 113 79C112 75 109 72 106 72C103 72 102 74 102 76C102 77 103 78 104 78C103 81 100 82 98 80C96 78 94 74 93 70"
      fill={color}
    />
    {/* Royal Tusk */}
    <path
      d="M89 67C94 68 101 68 106 65C108 64 109 63 108 62C106 62 100 63 94 63C91 63 89 64 89 67Z"
      fill="#FBF8F1"
    />
    {/* Elephant Main Body / Flanks */}
    <path
      d="M44 44C34 46 24 53 20 62C16 71 16 80 17 88H26C27 82 28 76 30 73C33 73 36 78 37 88H47C48 78 48 70 51 68C55 68 57 74 58 88H68C69 77 70 70 74 67C77 67 79 74 81 88H90C91 78 92 68 89 61C86 54 80 47 72 44H44Z"
      fill={color}
    />
    {/* Tail */}
    <path
      d="M20 62C18 67 17 74 18 80C18 82 17 84 15 84C14 84 14 81 15 78C16 72 17 66 20 62Z"
      fill={color}
    />

    {/* Ornate Jhool (Decorative saddle blanket) */}
    <path
      d="M38 50H78C76 64 73 70 58 70C43 70 40 64 38 50Z"
      fill="#FBF8F1"
      opacity="0.95"
    />
    <path
      d="M42 53H74C72 63 70 67 58 67C46 67 44 63 42 53Z"
      fill={color}
      opacity="0.2"
    />
    {/* Floral / Bell Embroidery on Jhool */}
    <circle cx="58" cy="59" r="3.5" fill={color} />
    <circle cx="49" cy="57" r="2" fill={color} />
    <circle cx="67" cy="57" r="2" fill={color} />
    <path d="M42 66H74" stroke={color} strokeWidth="1" strokeDasharray="1.5 1.5" />

    {/* Ear Details */}
    <path
      d="M74 48C70 48 66 52 66 57C66 62 70 66 75 66C76 63 77 56 78 52C78 49 76 48 74 48Z"
      fill="#FBF8F1"
      opacity="0.4"
    />
    {/* Eye */}
    <circle cx="84" cy="51" r="1.5" fill="#FBF8F1" />
  </svg>
);

/**
 * Dravidian Temple Gopuram (ಗೋಪುರ)
 * Majestic multi-tiered South Indian entrance tower with kalashas.
 */
export const GopuramIcon: React.FC<MotifProps> = ({
  className = 'w-8 h-8',
  size,
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Kalashas (sacred urn finials on summit) */}
    <path d="M38 16V10M44 14V8M50 12V6M56 14V8M62 16V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M34 16H66" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

    {/* Tier 1 (Top) */}
    <path d="M36 16L38 28H62L64 16H36Z" fill={color} />
    <rect x="47" y="20" width="6" height="8" rx="1" fill="#FBF8F1" opacity="0.8" />

    {/* Tier 2 */}
    <path d="M32 28L34 42H66L68 28H32Z" fill={color} />
    <rect x="40" y="32" width="5" height="10" rx="1" fill="#FBF8F1" opacity="0.8" />
    <rect x="47.5" y="32" width="5" height="10" rx="1" fill="#FBF8F1" opacity="0.8" />
    <rect x="55" y="32" width="5" height="10" rx="1" fill="#FBF8F1" opacity="0.8" />

    {/* Tier 3 */}
    <path d="M28 42L30 58H70L72 42H28Z" fill={color} />
    <rect x="36" y="46" width="5" height="12" rx="1" fill="#FBF8F1" opacity="0.8" />
    <rect x="44" y="46" width="5" height="12" rx="1" fill="#FBF8F1" opacity="0.8" />
    <rect x="51" y="46" width="5" height="12" rx="1" fill="#FBF8F1" opacity="0.8" />
    <rect x="59" y="46" width="5" height="12" rx="1" fill="#FBF8F1" opacity="0.8" />

    {/* Tier 4 (Base & Sanctum Gate) */}
    <path d="M24 58L26 84H74L76 58H24Z" fill={color} />
    {/* Grand Dravidian arched entrance doorway */}
    <path
      d="M42 84V68C42 63.5 45.5 60 50 60C54.5 60 58 63.5 58 68V84H42Z"
      fill="#FBF8F1"
    />
    <rect x="20" y="84" width="60" height="4" rx="1" fill={color} />
  </svg>
);

/**
 * Sacred Lotus Bloom (ಕಮಲ / Padma)
 * Auspicious symbol of purity, beauty, and wisdom across South India.
 */
export const LotusIcon: React.FC<MotifProps> = ({
  className = 'w-8 h-8',
  size,
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Central Petal */}
    <path
      d="M50 14C45 28 42 44 50 62C58 44 55 28 50 14Z"
      fill={color}
    />
    {/* Inner Left Petal */}
    <path
      d="M48 24C38 32 30 46 42 62C47 52 48 38 48 24Z"
      fill={color}
    />
    {/* Inner Right Petal */}
    <path
      d="M52 24C62 32 70 46 58 62C53 52 52 38 52 24Z"
      fill={color}
    />
    {/* Outer Left Petal */}
    <path
      d="M38 36C22 44 18 58 36 64C40 56 40 46 38 36Z"
      fill={color}
    />
    {/* Outer Right Petal */}
    <path
      d="M62 36C78 44 82 58 64 64C60 56 60 46 62 36Z"
      fill={color}
    />
    {/* Base Calyx & Stem */}
    <path
      d="M34 64C40 70 60 70 66 64C62 67 38 67 34 64Z"
      fill={color}
    />
    <rect x="48.5" y="66" width="3" height="14" rx="1.5" fill={color} />
  </svg>
);

/**
 * Temple Hanging Bell (ಘಂಟೆ / Ghanta)
 * Traditional brass bell suspended in temples and traditional thresholds.
 */
export const TempleBell: React.FC<MotifProps> = ({
  className = 'w-8 h-8',
  size,
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Top Hanging Ring & Chain Link */}
    <circle cx="50" cy="16" r="6" stroke={color} strokeWidth="3" />
    <path d="M50 22V28" stroke={color} strokeWidth="3" strokeLinecap="round" />

    {/* Top Crown of Bell */}
    <path d="M43 28H57V32H43V28Z" fill={color} />

    {/* Flared Bell Body */}
    <path
      d="M44 32C44 48 30 62 25 72C24 74 25 76 27 76H73C75 76 76 74 75 72C70 62 56 48 56 32H44Z"
      fill={color}
    />

    {/* Bottom Rim Band */}
    <rect x="22" y="74" width="56" height="4" rx="2" fill={color} />

    {/* Clapper Ball suspended at bottom */}
    <circle cx="50" cy="85" r="4.5" fill={color} />
    <path d="M50 76V82" stroke={color} strokeWidth="2.5" />
  </svg>
);

/**
 * Floral Torana Entrance Garland (ಹೂವಿನ ತೋರಣ / ಮಾಲೆ)
 * Traditional marigold & mango leaf entrance swag for auspicious beginnings.
 */
export const ToranaGarland: React.FC<MotifProps> = ({
  className = 'w-full h-8',
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Main Curving Vine Rope */}
    <path
      d="M10 8C50 28 75 32 100 32C125 32 150 28 190 8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="1 3"
    />
    <path
      d="M20 10C55 34 80 38 100 38C120 38 145 34 180 10"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Center Pendant Blossom */}
    <circle cx="100" cy="30" r="4" fill={color} />
    <circle cx="100" cy="36" r="2.5" fill={color} />

    {/* Leaves & Blossoms Left */}
    <circle cx="45" cy="18" r="3" fill={color} />
    <path d="M42 22L36 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="70" cy="26" r="3.5" fill={color} />
    <path d="M68 30L64 36" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

    {/* Leaves & Blossoms Right */}
    <circle cx="155" cy="18" r="3" fill={color} />
    <path d="M158 22L164 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="130" cy="26" r="3.5" fill={color} />
    <path d="M132 30L136 36" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

    {/* Corner Tie Knots */}
    <circle cx="10" cy="8" r="3" fill={color} />
    <circle cx="190" cy="8" r="3" fill={color} />
  </svg>
);

/**
 * Traditional Banana Leaf (ಬಾಳೆ ಎಲೆ / Plantain Leaf)
 * The quintessential South Indian dining, hospitality, and pooja symbol.
 */
export const BananaLeafIcon: React.FC<MotifProps> = ({
  className = 'w-8 h-8',
  size,
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Oval Leaf Blade */}
    <path
      d="M20 80C16 60 25 35 48 18C70 2 84 8 84 14C84 32 72 65 42 82C32 88 24 86 20 80Z"
      fill={color}
    />
    {/* Midrib Stem */}
    <path
      d="M16 88C22 84 38 68 54 48C70 28 82 14 84 14"
      stroke="#FBF8F1"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.9"
    />
    {/* Lateral Veins Left */}
    <path
      d="M32 72C26 68 25 60 28 56M42 58C34 54 32 46 36 42M52 44C44 40 42 32 46 28"
      stroke="#FBF8F1"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Lateral Veins Right */}
    <path
      d="M42 66C50 64 58 56 62 48M52 52C60 50 68 42 72 34M62 38C70 36 76 28 80 20"
      stroke="#FBF8F1"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

/**
 * Authentic Sikku Kolam Diamond Mandala (ಸಿಕ್ಕು ರಂಗೋಲಿ)
 * Directly inspired by Image 2: Interconnected geometric loops
 * woven around central dots in a traditional Brahma Mudi diamond knot.
 */
export const SikkuKolamMandala: React.FC<MotifProps> = ({
  className = 'w-24 h-24',
  size,
  color = '#FBF8F1',
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Background Grid Dots (Pulli / ಚುಕ್ಕಿಗಳು) */}
    <g fill={color} opacity="0.8">
      <circle cx="100" cy="40" r="3" />
      <circle cx="80" cy="60" r="3" />
      <circle cx="100" cy="60" r="3" />
      <circle cx="120" cy="60" r="3" />
      <circle cx="60" cy="80" r="3" />
      <circle cx="80" cy="80" r="3" />
      <circle cx="100" cy="80" r="3" />
      <circle cx="120" cy="80" r="3" />
      <circle cx="140" cy="80" r="3" />
      <circle cx="40" cy="100" r="3" />
      <circle cx="60" cy="100" r="3" />
      <circle cx="80" cy="100" r="3" />
      <circle cx="100" cy="100" r="3" />
      <circle cx="120" cy="100" r="3" />
      <circle cx="140" cy="100" r="3" />
      <circle cx="160" cy="100" r="3" />
      <circle cx="60" cy="120" r="3" />
      <circle cx="80" cy="120" r="3" />
      <circle cx="100" cy="120" r="3" />
      <circle cx="120" cy="120" r="3" />
      <circle cx="140" cy="120" r="3" />
      <circle cx="80" cy="140" r="3" />
      <circle cx="100" cy="140" r="3" />
      <circle cx="120" cy="140" r="3" />
      <circle cx="100" cy="160" r="3" />
    </g>

    {/* Intertwined Sikku / Brahma Mudi Continuous Loops */}
    <g stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Top Outer Loop */}
      <path d="M100 24C92 24 88 32 94 40L106 52C112 60 112 68 106 74L94 86C88 92 80 92 74 86L62 74C56 68 56 60 62 54" />
      {/* Right Outer Loop */}
      <path d="M176 100C176 92 168 88 160 94L148 106C140 112 132 112 126 106L114 94C108 88 108 80 114 74L126 62C132 56 140 56 146 62" />
      {/* Bottom Outer Loop */}
      <path d="M100 176C108 176 112 168 106 160L94 148C88 140 88 132 94 126L106 114C112 108 120 108 126 114L138 126C144 132 144 140 138 146" />
      {/* Left Outer Loop */}
      <path d="M24 100C24 108 32 112 40 106L52 94C60 88 68 88 74 94L86 106C92 112 92 120 86 126L74 138C68 144 60 144 54 138" />

      {/* Symmetrical Inner Weaves */}
      <path d="M100 52C110 52 124 66 124 76C124 86 110 100 100 100C90 100 76 86 76 76C76 66 90 52 100 52Z" />
      <path d="M100 100C110 100 124 114 124 124C124 134 110 148 100 148C90 148 76 134 76 124C76 114 90 100 100 100Z" />
      <path d="M76 100C76 90 90 76 100 76C110 76 124 90 124 100C124 110 110 124 100 124C90 124 76 110 76 100Z" />
      
      {/* Corner Loop Finials (Directly matching Image 2) */}
      <path d="M100 24C106 24 110 28 110 34C110 40 104 46 96 46C88 46 84 40 84 34C84 28 88 24 94 24" />
      <path d="M176 100C176 106 172 110 166 110C160 110 154 104 154 96C154 88 160 84 166 84C172 84 176 88 176 94" />
      <path d="M100 176C94 176 90 172 90 166C90 160 96 154 104 154C112 154 116 160 116 166C116 172 112 176 106 176" />
      <path d="M24 100C24 94 28 90 34 90C40 90 46 96 46 104C46 112 40 116 34 116C28 116 24 112 24 106" />
    </g>
  </svg>
);

/**
 * Continuous Sikku Kolam Looped Border Ribbon (ರಂಗೋಲಿ ಬಾರ್ಡರ್)
 * Replicates the looping border ribbon running along the perimeter in Image 2.
 */
export const KolamBorderRibbon: React.FC<{
  className?: string;
  color?: string;
  dotColor?: string;
  patternUnits?: number;
}> = ({
  className = 'w-full h-8',
  color = '#FBF8F1',
  dotColor = '#FBF8F1',
  patternUnits = 12,
}) => (
  <div className={`overflow-hidden flex items-center ${className}`}>
    <svg
      viewBox={`0 0 ${patternUnits * 32} 32`}
      className="w-full h-full preserve-3d"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {Array.from({ length: patternUnits }).map((_, i) => {
        const x = i * 32;
        return (
          <g key={i} transform={`translate(${x}, 0)`}>
            {/* Dots */}
            <circle cx="8" cy="16" r="2" fill={dotColor} />
            <circle cx="24" cy="16" r="2" fill={dotColor} />
            {/* Top Loop */}
            <path
              d="M0 16C4 8 12 8 16 16C20 24 28 24 32 16"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Interlacing Counter-Loop */}
            <path
              d="M0 16C4 24 12 24 16 16C20 8 28 8 32 16"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Ornamental loop nodes */}
            <circle cx="8" cy="8" r="1.5" stroke={color} strokeWidth="1" />
            <circle cx="24" cy="24" r="1.5" stroke={color} strokeWidth="1" />
          </g>
        );
      })}
    </svg>
  </div>
);

/**
 * Authentic Kolam Corner Accent for cards, banners, and modals
 */
export const KolamCorner: React.FC<{
  className?: string;
  color?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}> = ({
  className = 'w-12 h-12',
  color = '#D4AF37',
  position = 'top-left',
}) => {
  const rotation = {
    'top-left': 'rotate(0deg)',
    'top-right': 'rotate(90deg)',
    'bottom-right': 'rotate(180deg)',
    'bottom-left': 'rotate(270deg)',
  }[position];

  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: rotation }}
      aria-hidden="true"
    >
      <circle cx="15" cy="15" r="2.5" fill={color} />
      <circle cx="35" cy="15" r="2" fill={color} opacity="0.7" />
      <circle cx="15" cy="35" r="2" fill={color} opacity="0.7" />
      <path
        d="M6 6H30C40 6 46 14 46 24C46 34 38 42 28 42C18 42 14 36 14 26C14 16 22 14 30 14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 6V30C6 40 14 46 24 46C34 46 42 38 42 28C42 18 36 14 26 14C16 14 14 22 14 30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
