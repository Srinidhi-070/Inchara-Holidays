/**
 * INCHARA HOLIDAYS — INTERACTIVE REGIONAL TRAVEL MAP
 * Clean, glitch-free, click-to-explore cartography:
 * 1. Karnataka Map (27 survey-accurate districts, every district clickable)
 * 2. India Map (36 authentic states & UTs, every state clickable)
 * 3. International Map (143 authentic countries, every country clickable)
 *
 * NO random floating points. NO distracting connection lines. NO artificial highlighting of India on the world map.
 * Clicking ANY territory immediately displays its complete itinerary dossier, top places to visit,
 * logistics, pure veg dining guarantee, and direct enquiry routing.
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale, ServiceId } from '../types';
import {
  MapPin,
  Clock,
  Car,
  UtensilsCrossed,
  Sparkles,
  ArrowUpRight,
  Compass,
  Globe,
  CheckCircle2,
  PhoneCall,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
} from 'lucide-react';
import {
  KARNATAKA_DISTRICTS,
  INDIA_STATES,
  WORLD_COUNTRIES,
} from '../data/travelMapData';
import {
  getTerritoryDetail,
  type TerritoryDetail,
} from '../data/territoryDossiers';

interface InteractiveTravelMapProps {
  locale: Locale;
  onEnquire: (service?: ServiceId | string, initialDetails?: string) => void;
}

type MapTier = 'karnataka' | 'india' | 'international';

// Country names lookup for world map ISO codes
const COUNTRY_NAMES: Record<string, string> = {
  vn: 'Vietnam',
  id: 'Indonesia (Bali)',
  jp: 'Japan',
  ae: 'United Arab Emirates (Dubai)',
  ch: 'Switzerland',
  th: 'Thailand',
  sg: 'Singapore',
  my: 'Malaysia',
  fr: 'France',
  it: 'Italy',
  gb: 'United Kingdom',
  de: 'Germany',
  es: 'Spain',
  us: 'United States',
  au: 'Australia',
  eg: 'Egypt',
  tr: 'Turkey',
  lk: 'Sri Lanka',
  mv: 'Maldives',
  np: 'Nepal',
  bt: 'Bhutan',
  in: 'India',
  za: 'South Africa',
  nz: 'New Zealand',
  ke: 'Kenya',
  mu: 'Mauritius',
  at: 'Austria',
  nl: 'Netherlands',
  be: 'Belgium',
  pt: 'Portugal',
  gr: 'Greece',
};

export const InteractiveTravelMap: React.FC<InteractiveTravelMapProps> = ({
  locale,
  onEnquire,
}) => {
  const isKn = locale === 'kn';
  const [activeTier, setActiveTier] = useState<MapTier>('karnataka');

  // Currently selected entity per tier
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('hassan');
  const [selectedStateId, setSelectedStateId] = useState<string>('rj');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('vn');

  // Hover state for tooltip readout
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  // Zoom & Pan state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragOrigin = useRef<{ startX: number; startY: number; panX: number; panY: number }>({
    startX: 0,
    startY: 0,
    panX: 0,
    panY: 0,
  });
  const hasDragged = useRef<boolean>(false);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(Number((prev + 0.35).toFixed(2)), 3.8));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(Number((prev - 0.35).toFixed(2)), 1.0);
      if (next === 1.0) {
        setPan({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    hasDragged.current = false;
    dragOrigin.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragOrigin.current.startX;
    const dy = e.clientY - dragOrigin.current.startY;
    if (Math.hypot(dx, dy) > 4) {
      hasDragged.current = true;
    }
    const maxPan = (zoom - 1) * 240 + 60;
    const newX = Math.max(-maxPan, Math.min(maxPan, dragOrigin.current.panX + dx));
    const newY = Math.max(-maxPan, Math.min(maxPan, dragOrigin.current.panY + dy));
    setPan({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      hasDragged.current = false;
      dragOrigin.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        panX: pan.x,
        panY: pan.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragOrigin.current.startX;
    const dy = e.touches[0].clientY - dragOrigin.current.startY;
    if (Math.hypot(dx, dy) > 4) {
      hasDragged.current = true;
    }
    const maxPan = (zoom - 1) * 240 + 60;
    const newX = Math.max(-maxPan, Math.min(maxPan, dragOrigin.current.panX + dx));
    const newY = Math.max(-maxPan, Math.min(maxPan, dragOrigin.current.panY + dy));
    setPan({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (zoom < 3.0) {
      setZoom((prev) => Math.min(Number((prev + 0.6).toFixed(2)), 3.8));
    } else {
      handleResetZoom();
    }
  };

  // Compute active territory details dynamically
  let activeDetail: TerritoryDetail;
  if (activeTier === 'karnataka') {
    const dist = KARNATAKA_DISTRICTS.find((d) => d.id === selectedDistrictId) || KARNATAKA_DISTRICTS[0];
    activeDetail = getTerritoryDetail('karnataka', dist.id, dist.name);
  } else if (activeTier === 'india') {
    const state = INDIA_STATES.find((s) => s.id === selectedStateId) || INDIA_STATES[0];
    activeDetail = getTerritoryDetail('india', state.id, state.name);
  } else {
    const countryName = COUNTRY_NAMES[selectedCountryId] || selectedCountryId.toUpperCase();
    activeDetail = getTerritoryDetail('international', selectedCountryId, countryName);
  }

  const handleTierChange = (tier: MapTier) => {
    setActiveTier(tier);
    setHoveredName(null);
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  const tiers: { id: MapTier; num: string; labelEn: string; labelKn: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      id: 'karnataka',
      num: '01',
      labelEn: 'Karnataka Districts',
      labelKn: 'ಕರ್ನಾಟಕದ ಜಿಲ್ಲೆಗಳು',
      icon: Compass,
    },
    {
      id: 'india',
      num: '02',
      labelEn: 'Incredible India',
      labelKn: 'ಭಾರತೀಯ ರಾಜ್ಯಗಳು',
      icon: MapPin,
    },
    {
      id: 'international',
      num: '03',
      labelEn: 'Global Horizons',
      labelKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ದಿಗಂತ',
      icon: Globe,
    },
  ];

  // Curated quick-select items for each tier
  const quickPills: { tier: MapTier; id: string; nameEn: string; nameKn: string }[] = [
    // Karnataka
    { tier: 'karnataka', id: 'hassan', nameEn: 'Hassan (Belur)', nameKn: 'ಹಾಸನ (ಬೇಲೂರು)' },
    { tier: 'karnataka', id: 'mysore', nameEn: 'Mysuru (Palace)', nameKn: 'ಮೈಸೂರು' },
    { tier: 'karnataka', id: 'chamrajnagar', nameEn: 'Bandipur (Safari)', nameKn: 'ಬಂಡೀಪುರ' },
    { tier: 'karnataka', id: 'kodagu', nameEn: 'Kodagu (Coorg)', nameKn: 'ಕೊಡಗು (ಕೂರ್ಗ್)' },
    { tier: 'karnataka', id: 'chikmagalur', nameEn: 'Chikmagalur', nameKn: 'ಚಿಕ್ಕಮಗಳೂರು' },
    { tier: 'karnataka', id: 'uttar-kannand', nameEn: 'Gokarna (Coast)', nameKn: 'ಗೋಕರ್ಣ' },
    { tier: 'karnataka', id: 'udupi', nameEn: 'Udupi', nameKn: 'ಉಡುಪಿ' },
    { tier: 'karnataka', id: 'bellary', nameEn: 'Hampi (Ballari)', nameKn: 'ಹಂಪಿ' },
    { tier: 'karnataka', id: 'bagalkot', nameEn: 'Badami (Bagalkot)', nameKn: 'ಬಾದಾಮಿ' },
    { tier: 'karnataka', id: 'bijapur', nameEn: 'Bijapur (Gol Gumbaz)', nameKn: 'ವಿಜಯಪುರ' },
    { tier: 'karnataka', id: 'shimoga', nameEn: 'Shivamogga (Jog)', nameKn: 'ಶಿವಮೊಗ್ಗ' },

    // India
    { tier: 'india', id: 'rj', nameEn: 'Rajasthan', nameKn: 'ರಾಜಸ್ಥಾನ' },
    { tier: 'india', id: 'mp', nameEn: 'Madhya Pradesh', nameKn: 'ಮಧ್ಯಪ್ರದೇಶ' },
    { tier: 'india', id: 'kl', nameEn: 'Kerala', nameKn: 'ಕೇರಳ' },
    { tier: 'india', id: 'hp', nameEn: 'Himachal', nameKn: 'ಹಿಮಾಚಲ' },
    { tier: 'india', id: 'jk', nameEn: 'Kashmir', nameKn: 'ಕಾಶ್ಮೀರ' },
    { tier: 'india', id: 'up', nameEn: 'Varanasi & Agra', nameKn: 'ವಾರಣಾಸಿ & ಆಗ್ರಾ' },
    { tier: 'india', id: 'ga', nameEn: 'Goa', nameKn: 'ಗೋವಾ' },
    { tier: 'india', id: 'ka', nameEn: 'Karnataka', nameKn: 'ಕರ್ನಾಟಕ' },
    { tier: 'india', id: 'gj', nameEn: 'Gujarat', nameKn: 'ಗುಜರಾತ್' },
    { tier: 'india', id: 'tn', nameEn: 'Tamil Nadu', nameKn: 'ತಮಿಳುನಾಡು' },
    { tier: 'india', id: 'mh', nameEn: 'Maharashtra', nameKn: 'ಮಹಾರಾಷ್ಟ್ರ' },
    { tier: 'india', id: 'ut', nameEn: 'Uttarakhand', nameKn: 'ಉತ್ತರಾಖಂಡ' },

    // International (Premier, Verified Destinations Only)
    { tier: 'international', id: 'vn', nameEn: 'Vietnam', nameKn: 'ವಿಯೆಟ್ನಾಂ' },
    { tier: 'international', id: 'id', nameEn: 'Bali, Indonesia', nameKn: 'ಬಾಲಿ' },
    { tier: 'international', id: 'jp', nameEn: 'Japan', nameKn: 'ಜಪಾನ್' },
    { tier: 'international', id: 'ae', nameEn: 'Dubai (UAE)', nameKn: 'ದುಬೈ' },
    { tier: 'international', id: 'ch', nameEn: 'Switzerland', nameKn: 'ಸ್ವಿಟ್ಜರ್‌ಲ್ಯಾಂಡ್' },
    { tier: 'international', id: 'th', nameEn: 'Thailand', nameKn: 'ಥೈಲ್ಯಾಂಡ್' },
    { tier: 'international', id: 'sg', nameEn: 'Singapore', nameKn: 'ಸಿಂಗಾಪುರ' },
    { tier: 'international', id: 'fr', nameEn: 'France (Paris)', nameKn: 'ಫ್ರಾನ್ಸ್' },
    { tier: 'international', id: 'it', nameEn: 'Italy', nameKn: 'ಇಟಲಿ' },
    { tier: 'international', id: 'gb', nameEn: 'United Kingdom', nameKn: 'ಯುಕೆ' },
    { tier: 'international', id: 'mv', nameEn: 'Maldives', nameKn: 'ಮಾಲ್ಡೀವ್ಸ್' },
    { tier: 'international', id: 'lk', nameEn: 'Sri Lanka', nameKn: 'ಶ್ರೀಲಂಕಾ' },
  ];

  const currentPills = quickPills.filter((p) => p.tier === activeTier);

  return (
    <section
      id="travel-map"
      style={{ scrollMarginTop: '6rem' }}
      className="py-16 sm:py-24 bg-[#07130C] relative overflow-hidden border-t border-b border-[#D4AF37]/25"
      aria-labelledby="map-section-heading"
    >
      {/* Background Ambience & Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#1E3A2B]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest text-[#F5D77F] uppercase mb-3">
            <span className="w-6 h-px bg-[#D4AF37]" />
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>
              {isKn
                ? 'ನೈಜ ನಕ್ಷೆಯ ಮೂಲಕ ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ'
                : 'EXPLORE DESTINATIONS BY AUTHENTIC MAP'}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="w-6 h-px bg-[#D4AF37]" />
          </div>

          <h2
            id="map-section-heading"
            className={`text-2xl sm:text-4xl lg:text-5xl font-serif-editorial font-bold text-white tracking-tight leading-[1.18] mb-4 ${
              isKn ? 'font-kannada-serif' : ''
            }`}
          >
            {isKn ? (
              <>
                ಯಾವುದೇ ರಾಜ್ಯ, ಜಿಲ್ಲೆ ಅಥವಾ ದೇಶವನ್ನು{' '}
                <em className="text-[#F5D77F] font-normal italic">
                  ಕ್ಲಿಕ್ ಮಾಡಿ ವಿವರ ನೋಡಿ
                </em>
              </>
            ) : (
              <>
                Click Any State, District or Nation to{' '}
                <em className="text-[#F5D77F] font-normal italic">
                  Explore Details
                </em>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#F6F3EA]/75 max-w-2xl mx-auto leading-relaxed">
            {isKn
              ? 'ನಕ್ಷೆಯಲ್ಲಿ ನೇರವಾಗಿ ಯಾವುದೇ ತಾಣವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ. ಬಲಭಾಗದ ವಿಂಡೋದಲ್ಲಿ ಆ ಸ್ಥಳದ ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು, ಪ್ರಯಾಣದ ಅವಧಿ ಹಾಗೂ ಸಾರಿಗೆ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ.'
              : 'Interactive click-to-explore map: Click directly on any district in Karnataka, state in India, or country worldwide to review top places to visit and plan your customized journey.'}
          </p>

          {/* Tier Switcher Segmented Control */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#0D1F15]/90 border border-[#D4AF37]/40 shadow-[0_12px_32px_rgba(0,0,0,0.5)] mt-6 max-w-full overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]">
            {tiers.map((t) => {
              const active = activeTier === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTierChange(t.id)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 whitespace-nowrap z-10 ${
                    active
                      ? 'text-[#07130C] font-bold shadow-md'
                      : 'text-[#F6F3EA]/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="active-map-tier"
                      transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] -z-10"
                    />
                  )}
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      active ? 'text-[#07130C]/80' : 'text-[#D4AF37]'
                    }`}
                  >
                    {t.num}
                  </span>
                  <span>{isKn ? t.labelKn : t.labelEn}</span>
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      active ? 'text-[#07130C]' : 'text-[#D4AF37]/70'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Clean Vector Map Canvas (Left) + Rich Territory Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN (7 COLS): Clean Vector Map & Quick Select */}
          <div className="lg:col-span-7 bg-[#0D1F15]/85 backdrop-blur-xl rounded-3xl border border-[#D4AF37]/35 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex flex-col justify-between">
            {/* Top Bar with Status & Live Hover Readout */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5D77F]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="uppercase tracking-wider">
                  {activeTier === 'karnataka'
                    ? (isKn ? 'ಕರ್ನಾಟಕ ನಕ್ಷೆ (೨೭ ಜಿಲ್ಲೆಗಳು)' : 'Karnataka Map (27 Districts)')
                    : activeTier === 'india'
                    ? (isKn ? 'ಭಾರತದ ನಕ್ಷೆ (೩೬ ರಾಜ್ಯಗಳು)' : 'India Map (36 States & UTs)')
                    : (isKn ? `ವಿಶ್ವ ನಕ್ಷೆ (${WORLD_COUNTRIES.length} ಪ್ರಮುಖ ತಾಣಗಳು)` : `World Map (${WORLD_COUNTRIES.length} Global Horizons)`)}
                </span>
              </div>
              <span className="text-xs text-[#F5D77F] font-semibold tracking-wide">
                {hoveredName || (isKn ? 'ತಾಣದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Click any territory')}
              </span>
            </div>

            {/* PURE VECTOR SVG CANVAS WITH PAN & ZOOM */}
            <div
              className={`relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#07130C]/95 rounded-2xl border border-[#D4AF37]/20 overflow-hidden flex items-center justify-center p-3 sm:p-5 select-none ${
                zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onDoubleClick={handleDoubleClick}
            >
              {/* Floating Zoom & Pan Controls Dock */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1 bg-[#0D1F15]/90 backdrop-blur-md border border-[#D4AF37]/40 rounded-xl p-1 shadow-xl">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  title={isKn ? "ದೊಡ್ಡದಾಗಿಸಿ (Zoom In)" : "Zoom In (+)"}
                  aria-label="Zoom In"
                  disabled={zoom >= 3.8}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#F5D77F] hover:bg-[#D4AF37]/20 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <div className="px-1.5 text-[10px] sm:text-xs font-mono font-bold text-[#F5D77F] min-w-[38px] text-center select-none">
                  {Math.round(zoom * 100)}%
                </div>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title={isKn ? "ಚಿಕ್ಕದಾಗಿಸಿ (Zoom Out)" : "Zoom Out (-)"}
                  aria-label="Zoom Out"
                  disabled={zoom <= 1.0}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#F5D77F] hover:bg-[#D4AF37]/20 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                {(zoom > 1.0 || pan.x !== 0 || pan.y !== 0) && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    title={isKn ? "ಮರುಹೊಂದಿಸಿ (Reset View)" : "Reset View"}
                    aria-label="Reset View"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#F5D77F] hover:bg-[#D4AF37]/20 active:scale-95 transition-all cursor-pointer border-l border-white/10 ml-0.5 pl-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                  </button>
                )}
              </div>

              {/* Drag to explore badge when zoomed in */}
              {zoom > 1.0 && (
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-none flex items-center gap-1.5 bg-[#07130C]/90 backdrop-blur-xs border border-[#D4AF37]/35 rounded-lg px-2.5 py-1 text-[10px] sm:text-xs text-[#F5D77F] shadow-lg animate-fade-in">
                  <Move className="w-3 h-3 text-[#D4AF37]" />
                  <span>{isKn ? 'ನಕ್ಷೆ ಸರಿಸಲು ಎಳೆಯಿರಿ · ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Drag to pan · Click territory to view'}</span>
                </div>
              )}

              {/* TRANSFORM WRAPPER FOR SMOOTH PAN & ZOOM */}
              <div
                className="w-full h-full flex items-center justify-center origin-center select-none"
                style={{
                  transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                  transition: isDragging ? 'none' : 'transform 240ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                  willChange: 'transform',
                }}
              >
                {/* TIER 1: KARNATAKA (EVERY DISTRICT CLICKABLE) */}
                {activeTier === 'karnataka' && (
                  <svg
                    viewBox="0 0 500 650"
                    className="w-full h-full max-h-[440px] drop-shadow-[0_10px_32px_rgba(0,0,0,0.9)]"
                  >
                    <g>
                      {KARNATAKA_DISTRICTS.map((district) => {
                        const isSelected = selectedDistrictId === district.id;

                        return (
                          <path
                            key={district.id}
                            id={district.id}
                            d={district.path}
                            fill={isSelected ? '#D4AF37' : '#11261B'}
                            fillOpacity={isSelected ? 0.85 : 0.8}
                            stroke={isSelected ? '#FFFFFF' : '#2A4637'}
                            strokeWidth={isSelected ? '2' : '0.8'}
                            className="transition-colors duration-200 cursor-pointer hover:fill-[#D4AF37]/55 hover:stroke-[#F5D77F]"
                            onMouseEnter={() => setHoveredName(district.name)}
                            onMouseLeave={() => setHoveredName(null)}
                            onClick={() => {
                              if (hasDragged.current) return;
                              setSelectedDistrictId(district.id);
                            }}
                          >
                            <title>{district.name} District, Karnataka</title>
                          </path>
                        );
                      })}
                    </g>
                  </svg>
                )}

                {/* TIER 2: INDIA (EVERY STATE CLICKABLE) */}
                {activeTier === 'india' && (
                  <svg
                    viewBox="0 0 612 696"
                    className="w-full h-full max-h-[440px] drop-shadow-[0_10px_32px_rgba(0,0,0,0.9)]"
                  >
                    <g>
                      {INDIA_STATES.map((state) => {
                        const isSelected = selectedStateId === state.id;

                        return (
                          <path
                            key={state.id}
                            id={state.id}
                            d={state.path}
                            fill={isSelected ? '#D4AF37' : '#11261B'}
                            fillOpacity={isSelected ? 0.85 : 0.8}
                            stroke={isSelected ? '#FFFFFF' : '#2A4637'}
                            strokeWidth={isSelected ? '2' : '0.8'}
                            className="transition-colors duration-200 cursor-pointer hover:fill-[#D4AF37]/55 hover:stroke-[#F5D77F]"
                            onMouseEnter={() => setHoveredName(state.name)}
                            onMouseLeave={() => setHoveredName(null)}
                            onClick={() => {
                              if (hasDragged.current) return;
                              setSelectedStateId(state.id);
                            }}
                          >
                            <title>{state.name}</title>
                          </path>
                        );
                      })}
                    </g>
                  </svg>
                )}

                {/* TIER 3: WORLD (EVERY COUNTRY CLICKABLE, NO SPECIAL INDIA HIGHLIGHT) */}
                {activeTier === 'international' && (
                  <svg
                    viewBox="30.767 241.591 784.077 458.627"
                    className="w-full h-full max-h-[440px] drop-shadow-[0_10px_32px_rgba(0,0,0,0.9)]"
                  >
                    <g>
                      {WORLD_COUNTRIES.map((country) => {
                        const isSelected = selectedCountryId === country.id;
                        const countryName = COUNTRY_NAMES[country.id] || country.id.toUpperCase();

                        return (
                          <path
                            key={country.id}
                            id={country.id}
                            d={country.path}
                            fill={isSelected ? '#D4AF37' : '#11261B'}
                            fillOpacity={isSelected ? 0.9 : 0.75}
                            stroke={isSelected ? '#FFFFFF' : '#2A4637'}
                            strokeWidth={isSelected ? '1.8' : '0.5'}
                            className="transition-colors duration-200 cursor-pointer hover:fill-[#D4AF37]/60 hover:stroke-[#F5D77F]"
                            onMouseEnter={() => setHoveredName(countryName)}
                            onMouseLeave={() => setHoveredName(null)}
                            onClick={() => {
                              if (hasDragged.current) return;
                              setSelectedCountryId(country.id);
                            }}
                          >
                            <title>{countryName}</title>
                          </path>
                        );
                      })}
                    </g>
                  </svg>
                )}
              </div>
            </div>

            {/* Quick Select Destination Buttons */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2 items-center">
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mr-1">
                {isKn ? 'ಜನಪ್ರಿಯ ತಾಣಗಳು:' : 'Popular Destinations:'}
              </span>
              {currentPills.map((pill) => {
                const isSelected =
                  activeTier === 'karnataka'
                    ? selectedDistrictId === pill.id
                    : activeTier === 'india'
                    ? selectedStateId === pill.id
                    : selectedCountryId === pill.id;

                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => {
                      if (activeTier === 'karnataka') setSelectedDistrictId(pill.id);
                      else if (activeTier === 'india') setSelectedStateId(pill.id);
                      else setSelectedCountryId(pill.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#07130C] font-bold shadow-md scale-105'
                        : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-[#07130C]" />}
                    <span>{isKn ? pill.nameKn : pill.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (5 COLS): Selected Territory Rich Dossier & Details */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDetail.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="bg-[#0D1F15] rounded-3xl border border-[#D4AF37]/45 p-6 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.7)] flex flex-col justify-between"
              >
                <div>
                  {/* Photo Card with Category Badge */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-[#D4AF37]/30 shadow-inner group">
                    <img
                      src={activeDetail.image}
                      alt={isKn ? activeDetail.nameKn : activeDetail.nameEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07130C] via-[#07130C]/35 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#07130C]/85 backdrop-blur-md border border-[#D4AF37]/50 text-[#F5D77F] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {isKn ? activeDetail.tagKn : activeDetail.tagEn}
                      </span>
                    </div>

                    {/* Image Footer with Location & Duration */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/95">
                      <span className="font-semibold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {isKn ? activeDetail.nameKn : activeDetail.nameEn}
                      </span>
                      <span className="text-[11px] text-[#F5D77F] font-mono font-bold">
                        {isKn ? activeDetail.durationKn : activeDetail.durationEn}
                      </span>
                    </div>
                  </div>

                  {/* Heading & Summary */}
                  <h3
                    className={`text-xl sm:text-2xl font-bold font-serif-editorial text-white mb-2 leading-tight ${
                      isKn ? 'font-kannada-serif' : ''
                    }`}
                  >
                    {isKn ? activeDetail.nameKn : activeDetail.nameEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                    {isKn ? activeDetail.summaryKn : activeDetail.summaryEn}
                  </p>

                  {/* 3 Core Travel Logistics: Duration, Chauffeur/Flight & Pure Veg */}
                  <div className="space-y-2.5 mb-5 p-3.5 rounded-xl bg-black/25 border border-white/10 text-xs">
                    <div className="flex items-start gap-2.5 text-white/90">
                      <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#F5D77F] font-semibold">
                          {isKn ? 'ಸೂಕ್ತ ಅವಧಿ: ' : 'Ideal Duration: '}
                        </span>
                        <span>{isKn ? activeDetail.durationKn : activeDetail.durationEn}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-white/90">
                      <Car className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#F5D77F] font-semibold">
                          {isKn ? 'ಸಾರಿಗೆ & ಪ್ರಯಾಣ: ' : 'Transit & Logistics: '}
                        </span>
                        <span>{isKn ? activeDetail.transitKn : activeDetail.transitEn}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-white/90">
                      <UtensilsCrossed className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#F5D77F] font-semibold">
                          {isKn ? 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರ: ' : 'Pure Veg Guarantee: '}
                        </span>
                        <span>{isKn ? activeDetail.diningKn : activeDetail.diningEn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Places to Visit Checklist */}
                  <div className="mb-6">
                    <p className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                      {isKn ? 'ಪ್ರಮುಖವಾಗಿ ನೋಡಬೇಕಾದ ಸ್ಥಳಗಳು:' : 'Top Places to Visit & Experience:'}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {(isKn ? activeDetail.placesToVisitKn : activeDetail.placesToVisitEn).map(
                        (place, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 text-xs text-[#F6F3EA]/90"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                            <span className="truncate">{place}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onEnquire(
                        'holidays',
                        isKn ? activeDetail.nameKn : activeDetail.nameEn
                      )
                    }
                    className="gold-button w-full sm:flex-1 py-3 px-5 text-xs font-bold uppercase tracking-wider rounded-xl inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>
                      {isKn
                        ? `${activeDetail.nameKn.split(' ')[0]} ಪ್ರವಾಸ ರೂಪಿಸಿ`
                        : `Plan Trip to ${activeDetail.nameEn.split(' ')[0]}`}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/919900000000?text=${encodeURIComponent(
                      `Hello Inchara Holidays, I would like to plan a bespoke tour to ${activeDetail.nameEn} (${activeDetail.durationEn}). Please share itinerary and pure veg dining details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="outline-button w-full sm:w-auto py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 border-white/20 hover:border-[#25D366] text-white hover:text-[#25D366] transition-colors cursor-pointer"
                    title={isKn ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ' : 'Chat on WhatsApp'}
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
