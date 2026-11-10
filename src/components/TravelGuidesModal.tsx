import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '../types';
import { karnatakaCoreEtiquette } from '../data/culturalEtiquette';
import {
  Compass,
  X,
  Sparkles,
  BookOpen,
  MapPin,
  Heart,
  Shirt,
  Footprints,
  Camera,
  UtensilsCrossed,
  Trees,
} from 'lucide-react';
import { LotusIcon, AmbariElephant } from './SouthIndianMotifs';

interface TravelGuidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export const TravelGuidesModal: React.FC<TravelGuidesModalProps> = ({
  isOpen,
  onClose,
  locale,
}) => {
  const isKn = locale === 'kn';
  const [activeTab, setActiveTab] = useState<'etiquette' | 'seasons' | 'phrases'>('etiquette');

  if (!isOpen) return null;

  const usefulPhrases = [
    { kn: 'ನಮಸ್ಕಾರ (Namaskara)', en: 'Hello / Greetings (Conveys deep cultural warmth)' },
    { kn: 'ಧನ್ಯವಾದಗಳು (Dhanyavadagalu)', en: 'Thank you very much' },
    { kn: 'ಊಟ ಆಯ್ತಾ? (Oota aaytha?)', en: 'Have you had your meal? (A cherished Karnataka sign of caring)' },
    { kn: 'ಎಷ್ಟು ಬೆಲೆ? (Eshtu bele?)', en: 'How much does this cost?' },
    { kn: 'ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ (Thumba chennagide)', en: 'This is very good / beautiful' },
    { kn: 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ (Shuddha Sasyaahari)', en: '100% Pure Vegetarian' },
    { kn: 'ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ (Dayavittu sahaaya maadi)', en: 'Please help me' },
  ];

  const seasonalGuidance = [
    {
      seasonEn: 'Post-Monsoon & Winter (October – February)',
      seasonKn: 'ಹಿಂಗಾರು & ಚಳಿಗಾಲ (ಅಕ್ಟೋಬರ್ – ಫೆಬ್ರವರಿ)',
      status: 'Peak Season',
      statusKn: 'ಪ್ರಮುಖ ಪ್ರವಾಸಿ ಅವಧಿ',
      destinationsEn: 'Mysuru, Hampi, Badami, Coorg, Chikmagalur, Gokarna',
      destinationsKn: 'ಮೈಸೂರು, ಹಂಪಿ, ಬಾದಾಮಿ, ಕೊಡಗು, ಚಿಕ್ಕಮಗಳೂರು, ಗೋಕರ್ಣ',
      tipEn: 'Pleasant daytime temperatures (20°C–28°C), clear skies for heritage architecture exploration and scenic hill vistas.',
      tipKn: 'ಆಹ್ಲಾದಕರ ಹವಾಮಾನ, ವಾಸ್ತುಶಿಲ್ಪ ಅನ್ವೇಷಣೆಗೆ ಸೂಕ್ತ ಕಾಲ ಮತ್ತು ಮಂಜಿನ ಗಿರಿಧಾಮಗಳ ನೈಜ ಸೊಬಗು.',
    },
    {
      seasonEn: 'Monsoon Magic (June – September)',
      seasonKn: 'ಮುಂಗಾರು ಮಳೆಗಾಲ (ಜೂನ್ – ಸೆಪ್ಟೆಂಬರ್)',
      status: 'Rain Lover Circuit',
      statusKn: 'ಪ್ರಕೃತಿ ಪ್ರಿಯರ ಆಯ್ಕೆ',
      destinationsEn: 'Agumbe, Jog Falls, Sakleshpur, Western Ghats Trails',
      destinationsKn: 'ಆಗುಂಬೆ, ಜೋಗ ಜಲಪಾತ, ಸಕಲೇಶಪುರ, ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ರಮಣೀಯ ತಾಣಗಳು',
      tipEn: 'Gushing waterfalls, dramatic rain clouds, and lush emerald coffee foliage. Travel with all-weather rain gear and safe vetted chauffeurs.',
      tipKn: 'ತುಂಬಿ ಹರಿಯುವ ಜಲಪಾತಗಳು ಮತ್ತು ಹಚ್ಚಹಸಿರಿನ ಕಾಫಿ ತೋಟಗಳು. ಮಳೆಕೋಟ್ ಮತ್ತು ಅನುಭವಿ ಘಾಟಿ ಚಾಲಕರೊಂದಿಗೆ ಪಯಣಿಸಲು ಸೂಕ್ತ.',
    },
    {
      seasonEn: 'Summer Hill Retreats (March – May)',
      seasonKn: 'ಬೇಸಿಗೆ ಗಿರಿಧಾಮಗಳು (ಮಾರ್ಚ್ – ಮೇ)',
      status: 'Cool Escapes',
      statusKn: 'ತಂಪಾದ ಗಿರಿಧಾಮಗಳು',
      destinationsEn: 'Kemmangundi, BR Hills, Ooty, Kodaikanal, Wayanad',
      destinationsKn: 'ಕೆಮ್ಮಣ್ಣುಗುಂಡಿ, ಬಿಳಿಗಿರಿರಂಗನ ಬೆಟ್ಟ, ಊಟಿ, ಕೊಡೈಕೆನಾಲ್, ವಯನಾಡ್',
      tipEn: 'Escape tropical heat in the elevated Western Ghats. Plan temple darshans during early morning or evening twilight hours.',
      tipKn: 'ತಂಪಾದ ಹವೆಯುಳ್ಳ ಬೆಟ್ಟಗುಡ್ಡಗಳ ತಾಣಗಳು. ಮಧ್ಯಾಹ್ನದ ಬಿಸಿಲು ತಪ್ಪಿಸಿ ಮುಂಜಾನೆ ಅಥವಾ ಸಂಜೆಯ ವೇಳೆಯಲ್ಲಿ ದೇವಾಲಯ ದರ್ಶನ ಉತ್ತಮ.',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative max-w-4xl w-full bg-[#FBF8F1] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#162E22] text-[#FBF8F1] p-6 sm:p-8 relative shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F5D77F] uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>{isKn ? 'ಸಂಸ್ಕಾರಯುತ ಪಯಣದ ಮಾರ್ಗದರ್ಶಿ' : 'Mindful Cultural Travel Guide'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white">
              {isKn ? 'ದಕ್ಷಿಣ ಭಾರತೀಯ ಸಂಸ್ಕೃತಿ & ಪ್ರಯಾಣ ಶಿಷ್ಟಾಚಾರ' : 'South Indian Etiquette & Seasonal Wisdom'}
            </h2>

            <p className="text-xs sm:text-sm text-white/75 mt-1 max-w-2xl">
              {isKn
                ? 'ಕರ್ನಾಟಕದ ಪವಿತ್ರ ದೇಗುಲಗಳು, ಸಾಂಪ್ರದಾಯಿಕ ಮನೆಗಳು ಮತ್ತು ಸೂಕ್ಷ್ಮ ಪರಿಸರದಲ್ಲಿ ಗೌರವಯುತವಾಗಿ ಪಯಣಿಸಲು ಅಗತ್ಯವಾದ ಸಲಹೆಗಳು.'
                : 'Essential cultural insights, temple protocols, seasonal planning, and everyday greetings for respectful travel across Karnataka.'}
            </p>

            {/* Sub-tabs */}
            <div className="flex items-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setActiveTab('etiquette')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === 'etiquette'
                    ? 'bg-[#D4AF37] text-[#12261C] font-bold shadow-xs'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {isKn ? 'ಸಾಂಸ್ಕೃತಿಕ ಶಿಷ್ಟಾಚಾರ' : 'Cultural Etiquette'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seasons')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === 'seasons'
                    ? 'bg-[#D4AF37] text-[#12261C] font-bold shadow-xs'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {isKn ? 'ಋತುಮಾನ & ಸಮಯ' : 'Best Seasons & Weather'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('phrases')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === 'phrases'
                    ? 'bg-[#D4AF37] text-[#12261C] font-bold shadow-xs'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {isKn ? 'ಉಪಯುಕ್ತ ಕನ್ನಡ ಮಾತುಗಳು' : 'Everyday Kannada Phrases'}
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {activeTab === 'etiquette' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {karnatakaCoreEtiquette.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#263F32]/10 shadow-xs space-y-2 hover:border-[#D4AF37]/50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-[#9E3D28] tracking-widest uppercase bg-[#F6F3EA] px-2.5 py-0.5 rounded-full border border-[#9E3D28]/15">
                        {tip.badge}
                      </span>
                      <span className="text-xs font-mono text-[#252923]/40">0{idx + 1}</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#162E22]">
                      {isKn ? tip.titleKn : tip.titleEn}
                    </h3>

                    <p className="text-xs text-[#252923]/80 leading-relaxed">
                      {isKn ? tip.tipKn : tip.tipEn}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'seasons' && (
              <div className="space-y-4">
                {seasonalGuidance.map((season, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-[#263F32]/10 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-[#162E22]">
                        {isKn ? season.seasonKn : season.seasonEn}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-[#162E22] text-[#F5D77F] text-xs font-bold">
                        {isKn ? season.statusKn : season.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#9E3D28] font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{isKn ? season.destinationsKn : season.destinationsEn}</span>
                    </div>

                    <p className="text-xs text-[#252923]/80 leading-relaxed">
                      {isKn ? season.tipKn : season.tipEn}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'phrases' && (
              <div className="space-y-3">
                <p className="text-xs text-[#252923]/70 mb-2">
                  {isKn
                    ? 'ಸ್ಥಳೀಯರೊಂದಿಗೆ ಮಾತನಾಡಲು ಮತ್ತು ಆತ್ಮೀಯತೆ ಬೆಳೆಸಲು ಈ ಸರಳ ಮಾತುಗಳನ್ನು ಬಳಸಿ:'
                    : 'A few warm words in Kannada will bring immediate smiles and open doors everywhere you travel:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {usefulPhrases.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-[#263F32]/10 shadow-xs space-y-1"
                    >
                      <div className="text-sm font-bold text-[#162E22] font-serif-editorial">
                        {phrase.kn}
                      </div>
                      <div className="text-xs text-[#252923]/70">
                        {phrase.en}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 bg-[#F6F3EA] border-t border-[#263F32]/10 flex items-center justify-between">
            <span className="text-xs text-[#252923]/60">
              {isKn ? 'ಇಂಚರ ಹಾಲಿಡೇಸ್ ಸಂಸ್ಕೃತಿ ವಿಭಾಗ' : 'Inchara Holidays Cultural Advisory'}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#162E22] text-white hover:bg-[#1E3A2B] text-xs font-semibold cursor-pointer transition-colors"
            >
              {isKn ? 'ಮುಚ್ಚಿ' : 'Close Guide'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
