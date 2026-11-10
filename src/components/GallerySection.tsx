import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale, ServiceId } from '../types';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import {
  Camera,
  MapPin,
  Sparkles,
  X,
  ArrowRight,
  Maximize2,
  Landmark,
  TreePine,
  Waves,
  UtensilsCrossed,
  Car,
} from 'lucide-react';
import { LotusIcon } from './SouthIndianMotifs';

interface GallerySectionProps {
  locale: Locale;
  onEnquire: (service?: ServiceId | string, initialDetails?: string) => void;
}

type GalleryCategoryFilter = 'all' | 'heritage' | 'nature' | 'coastal' | 'culinary' | 'fleet';

export const GallerySection: React.FC<GallerySectionProps> = ({ locale, onEnquire }) => {
  const isKn = locale === 'kn';
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryFilter>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filterTabs: { id: GalleryCategoryFilter; labelEn: string; labelKn: string; icon: React.ReactNode }[] = [
    { id: 'all', labelEn: 'All Moments', labelKn: 'ಎಲ್ಲಾ ಚಿತ್ರಗಳು', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'heritage', labelEn: 'Heritage & Corridors', labelKn: 'ಪರಂಪರೆ & ವಾಸ್ತುಶಿಲ್ಪ', icon: <Landmark className="w-3.5 h-3.5" /> },
    { id: 'nature', labelEn: 'Misty Hills & Ghats', labelKn: 'ಮಲೆನಾಡು & ಗಿರಿಧಾಮ', icon: <TreePine className="w-3.5 h-3.5" /> },
    { id: 'coastal', labelEn: 'Coastal Serenity', labelKn: 'ಕರಾವಳಿ ತೀರಗಳು', icon: <Waves className="w-3.5 h-3.5" /> },
    { id: 'culinary', labelEn: 'Pure Veg Feasts', labelKn: 'ಸಾತ್ವಿಕ ಪಂಕ್ತಿಯೂಟ', icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
    { id: 'fleet', labelEn: 'Verified Chauffeur Fleet', labelKn: 'ಸುರಕ್ಷಿತ ವಾಹನಗಳು', icon: <Car className="w-3.5 h-3.5" /> },
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="section bg-[#162E22] text-[#FBF8F1] relative py-20 overflow-hidden" id="gallery" aria-labelledby="gallery-heading">
      {/* Ambient Glows */}
      <div className="absolute left-1/4 top-0 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-[#0A1810]/60 blur-3xl pointer-events-none" />

      <div className="shell relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#F5D77F] uppercase mb-3">
            <span className="w-6 h-px bg-[#D4AF37]" />
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <span>{isKn ? 'ನೈಜ ಕ್ಷಣಗಳು · ಸುಂದರ ಅನುಭವಗಳು' : 'Visual Journal & Authentic Frames'}</span>
            <span className="w-6 h-px bg-[#D4AF37]" />
          </div>

          <h2 id="gallery-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-editorial text-white tracking-tight">
            {isKn ? (
              <>
                ಚಿತ್ರಗಳ ಮೂಲಕ <em className="text-[#F5D77F] font-normal font-serif">ಪಯಣದ ಸೊಬಗು</em>
              </>
            ) : (
              <>
                Captured Moments of <em className="text-[#F5D77F] font-normal font-serif">Discovery</em>
              </>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
            {isKn
              ? 'ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆಯ ಸೌಂದರ್ಯ, ಮಂಜು ಮುಸುಕಿದ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು, ಶುದ್ಧ ಸಾತ್ವಿಕ ಬಾಳೆ ಎಲೆ ಊಟ ಮತ್ತು ನಮ್ಮ ನುರಿತ ಸಾರಥಿಗಳ ಸಾರಿಗೆ — ಪ್ರತಿಯೊಂದು ಕ್ಷಣವೂ ಜೀವಂತ.'
              : 'Glimpse the living stone carvings of Belur, cloud-draped coffee estates of Kodagu, pure vegetarian Sadya feasts, and verified chauffeur travel.'}
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D77F] text-[#12261C] border-[#F5D77F] font-bold shadow-md shadow-[#D4AF37]/20'
                    : 'bg-white/5 text-white/80 border-white/10 hover:border-[#D4AF37]/40 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{isKn ? tab.labelKn : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => {
            const title = isKn ? item.titleKn : item.titleEn;
            const location = isKn ? item.locationKn : item.locationEn;
            const caption = isKn ? item.captionKn : item.captionEn;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 hover:border-[#D4AF37]/60 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="aspect-4/3 w-full overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* Top-Right Expand Icon */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-xs border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-[#F5D77F]" />
                  </div>

                  {/* Location Chip */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs border border-[#D4AF37]/40 text-[#F5D77F] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{location}</span>
                    </span>
                  </div>
                </div>

                {/* Content Dossier */}
                <div className="p-4 bg-[#12261C]">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#F5D77F] transition-colors line-clamp-1">
                    {title}
                  </h3>
                  <p className="text-xs text-white/60 mt-1 line-clamp-2 leading-relaxed">
                    {caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox / Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full bg-[#162E22] rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-white/80 hover:text-white hover:bg-black border border-white/20 flex items-center justify-center cursor-pointer transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Modal Image */}
                <div className="aspect-16/9 sm:aspect-16/10 w-full overflow-hidden relative">
                  <img
                    src={selectedItem.imageUrl}
                    alt={isKn ? selectedItem.titleKn : selectedItem.titleEn}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#162E22] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Modal Text & Action */}
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F5D77F] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{isKn ? selectedItem.locationKn : selectedItem.locationEn}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-white">
                    {isKn ? selectedItem.titleKn : selectedItem.titleEn}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {isKn ? selectedItem.captionKn : selectedItem.captionEn}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-4">
                    <span className="text-xs text-white/50">
                      {isKn ? 'ಇಂಚರ ಹಾಲಿಡೇಸ್ ಅಧಿಕೃತ ಪ್ರವಾಸ ಅನುಭವ' : 'Authentic Inchara Holidays Journey Experience'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const loc = isKn ? selectedItem.locationKn : selectedItem.locationEn;
                        setSelectedItem(null);
                        onEnquire('holidays', `Inquiry inspired by photo: ${loc}`);
                      }}
                      className="gold-button !m-0 !py-2 !px-4 !text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <span>{isKn ? 'ಈ ತಾಣದ ಪ್ರವಾಸ ರೂಪಿಸಿ' : 'Plan This Trip'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
