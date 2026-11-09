import React, { useState } from "react";
import type { Locale, Destination } from "../types";
import { destinations } from "../data/destinations";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";

interface DestinationDiscoveryProps {
  locale: Locale;
  onSelectDestination: (dest: Destination) => void;
  onEnquire: (service?: string, destinationName?: string) => void;
}

export function DestinationDiscovery({
  locale,
  onSelectDestination,
  onEnquire,
}: DestinationDiscoveryProps) {
  const isKn = locale === "kn";
  const [activeFilter, setActiveFilter] = useState<"all" | "domestic" | "international">("all");

  // Map destination objects
  const karnatakaDest = destinations.find((d) => d.id === "coorg") || destinations[0];
  const keralaDest = destinations.find((d) => d.id === "kerala" || d.nameEn.toLowerCase().includes("kerala")) || destinations[1] || destinations[0];
  const himachalDest = destinations.find((d) => d.id === "himachal" || d.nameEn.toLowerCase().includes("himachal") || d.nameEn.toLowerCase().includes("kashmir")) || destinations[3] || destinations[0];
  const rajasthanDest = destinations.find((d) => d.id === "rajasthan" || d.nameEn.toLowerCase().includes("rajasthan")) || destinations[2] || destinations[0];
  const beyondIndiaDest = destinations.find((d) => d.category === "international") || destinations[4] || destinations[0];

  const tiles = [
    {
      id: "karnataka",
      num: "01",
      name: isKn ? "ಕರ್ನಾಟಕ" : "Karnataka",
      desc: isKn ? "ಕಾಫಿ ತೋಟಗಳು · ಜೀವಂತ ಪರಂಪರೆ · ಕಾನನಗಳು" : "Coffee estates · living heritage · wild forests",
      image: "/images/coorg_misty_plantation_1791795473840.jpg",
      dest: karnatakaDest,
      category: "domestic" as const,
    },
    {
      id: "kerala",
      num: "02",
      name: isKn ? "ಕೇರಳ" : "Kerala",
      desc: isKn ? "ತೆಂಗಿನ ಮರಗಳ ಮಡಿಲಲ್ಲಿ ಪ್ರಶಾಂತ ಹಿನ್ನೀರು" : "Backwaters at the pace of the palms",
      image: "/images/kerala_backwaters.jpg",
      dest: keralaDest,
      category: "domestic" as const,
    },
    {
      id: "himachal",
      num: "03",
      name: isKn ? "ಹಿಮಾಚಲ" : "Himachal",
      desc: isKn ? "ಪರ್ವತದ ತಂಗಾಳಿ ಮತ್ತು ಪ್ರಶಾಂತ ಹಳ್ಳಿಗಳು" : "Mountain air and quiet villages",
      image: "/images/himalayas_kashmir.jpg",
      dest: himachalDest,
      category: "domestic" as const,
    },
    {
      id: "rajasthan",
      num: "04",
      name: isKn ? "ರಾಜಸ್ಥಾನ" : "Rajasthan",
      desc: isKn ? "ಮರಳುಗಾಡಿನ ಬೆಳಕು ಮತ್ತು ಅರಮನೆಗಳ ಕಥೆ" : "Desert light and palace stories",
      image: "/images/rajasthan_heritage.jpg",
      dest: rajasthanDest,
      category: "domestic" as const,
    },
    {
      id: "beyond-india",
      num: "05",
      name: isKn ? "ಅಂತರರಾಷ್ಟ್ರೀಯ" : "Beyond India",
      desc: isKn ? "ವಿಶೇಷ, ಚಿಂತನೆಯಿಂದ ಆಯ್ಕೆಮಾಡಿದ ತಾಣಗಳು" : "Distinctive places, thoughtfully chosen",
      image: "/images/bali_temple.jpg",
      dest: beyondIndiaDest,
      category: "international" as const,
    },
  ];

  const handleTileClick = (tile: typeof tiles[0]) => {
    if (tile.dest) {
      onSelectDestination(tile.dest);
    } else {
      onEnquire("holidays", tile.name);
    }
  };

  return (
    <section id="destinations" className="scroll-mt-24 py-10 sm:py-14 bg-[#FBF8F1] bg-kolam-subtle relative overflow-hidden border-b border-[#263F32]/10" aria-labelledby="dest-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#9E3D28] uppercase mb-2.5">
              <span className="w-5 h-px bg-[#D4AF37]" />
              <span>✦</span>
              <span>{isKn ? "ತಾಣಗಳ ಅನ್ವೇಷಣೆ" : "DESTINATION DISCOVERY"}</span>
              <span>✦</span>
              <span className="w-5 h-px bg-[#D4AF37]" />
            </div>

            <h2 id="dest-title" className={`text-xl sm:text-2xl lg:text-3xl font-serif-editorial font-bold text-[#162E22] tracking-tight leading-[1.15] ${
              isKn ? "font-kannada-serif" : ""
            }`}>
              {isKn ? "ನಿಧಾನವಾಗಿ ಸಾಗಲು ಯೋಗ್ಯವಾದ " : "A world worth travelling "}
              <em className="text-[#9E3D28] font-normal font-serif-editorial italic">
                {isKn ? "ಜಗತ್ತು." : "slowly."}
              </em>
            </h2>

            <p className="mt-3.5 text-xs sm:text-sm text-[#252923]/75 leading-relaxed font-normal">
              {isKn
                ? "ದಕ್ಷಿಣ ಭಾರತದ ನಮ್ಮ ನೆಲೆಯಿಂದ ಪ್ರಪಂಚದ ವಿವಿಧ ಮೂಲೆಗಳವರೆಗೆ, ಪ್ರತಿಯೊಂದು ಮಾರ್ಗವನ್ನೂ ನೀವು ಅನುಭವಿಸುವ ಭಾವನೆಗಳ ಆಧಾರದ ಮೇಲೆ ರೂಪಿಸಲಾಗಿದೆ."
                : "From our home in South India to places across the world, every route is chosen for what it lets you feel—not how much it lets you tick off."}
            </p>
          </div>

          {/* Top Right Editorial Quick Links */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-bold tracking-wider uppercase text-[#162E22]/80 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setActiveFilter(activeFilter === "domestic" ? "all" : "domestic")}
              className={`inline-flex items-center gap-1 py-1.5 transition-colors cursor-pointer ${
                activeFilter === "domestic" ? "text-[#9E3D28] underline underline-offset-4 font-bold" : "hover:text-[#162E22]"
              }`}
            >
              <span>{isKn ? "ದೇಶೀಯ ಪಯಣಗಳು" : "DOMESTIC JOURNEYS"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[#263F32]/25 font-light">|</span>
            <button
              type="button"
              onClick={() => setActiveFilter(activeFilter === "international" ? "all" : "international")}
              className={`inline-flex items-center gap-1 py-1.5 transition-colors cursor-pointer ${
                activeFilter === "international" ? "text-[#9E3D28] underline underline-offset-4 font-bold" : "hover:text-[#162E22]"
              }`}
            >
              <span>{isKn ? "ಅಂತರರಾಷ್ಟ್ರೀಯ ಪಯಣಗಳು" : "INTERNATIONAL ESCAPES"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5-Tile Editorial Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:h-[480px]">
          {/* Tile 1: Lead Tile (Karnataka) - Spans 2 Rows on Left */}
          <div
            onClick={() => handleTileClick(tiles[0])}
            className={`group relative rounded-[28px] overflow-hidden cursor-pointer border border-[#162E22]/10 hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(22,46,34,0.08)] hover:shadow-[0_20px_50px_rgba(22,46,34,0.2)] transition-all duration-500 lg:row-span-2 min-h-[280px] lg:min-h-full ${
              activeFilter === "international" ? "opacity-35 scale-[0.99]" : "opacity-100"
            }`}
          >
            <img
              src={tiles[0].image}
              alt={tiles[0].name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1810]/95 via-[#0A1810]/40 to-transparent pointer-events-none" />

            {/* Top Right Circular Explore Badge */}
            <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white/90 flex items-center justify-center shadow-md group-hover:bg-[#162E22] group-hover:text-[#F5D77F] group-hover:border-[#D4AF37]/60 group-hover:scale-110 transition-all duration-300">
              <Compass className="w-4 h-4" />
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
              <span className="text-[#F5D77F] text-xs font-bold tracking-widest uppercase block mb-1">
                {tiles[0].num} / {isKn ? "ಅನ್ವೇಷಿಸಿ" : "EXPLORE"}
              </span>
              <h3 className={`text-2xl sm:text-3xl font-serif-editorial font-bold text-[#F6F3EA] group-hover:text-[#F5D77F] transition-colors leading-tight ${
                isKn ? "font-kannada-serif" : ""
              }`}>
                {tiles[0].name}
              </h3>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
                {tiles[0].desc}
              </p>
            </div>
          </div>

          {/* Tile 2: Kerala (Middle Top) */}
          <div
            onClick={() => handleTileClick(tiles[1])}
            className={`group relative rounded-[28px] overflow-hidden cursor-pointer border border-[#162E22]/10 hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(22,46,34,0.08)] hover:shadow-[0_20px_50px_rgba(22,46,34,0.2)] transition-all duration-500 min-h-[190px] lg:min-h-0 ${
              activeFilter === "international" ? "opacity-35 scale-[0.99]" : "opacity-100"
            }`}
          >
            <img
              src={tiles[1].image}
              alt={tiles[1].name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1810]/95 via-[#0A1810]/40 to-transparent pointer-events-none" />

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white/90 flex items-center justify-center shadow-md group-hover:bg-[#162E22] group-hover:text-[#F5D77F] group-hover:border-[#D4AF37]/60 group-hover:scale-110 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="text-[#F5D77F] text-xs font-bold tracking-widest uppercase block mb-0.5">
                {tiles[1].num} / {isKn ? "ಅನ್ವೇಷಿಸಿ" : "EXPLORE"}
              </span>
              <h3 className={`text-2xl font-serif-editorial font-bold text-[#F6F3EA] group-hover:text-[#F5D77F] transition-colors ${
                isKn ? "font-kannada-serif" : ""
              }`}>
                {tiles[1].name}
              </h3>
              <p className="text-xs text-white/85 line-clamp-1 font-normal">
                {tiles[1].desc}
              </p>
            </div>
          </div>

          {/* Tile 4: Rajasthan (Right Top) */}
          <div
            onClick={() => handleTileClick(tiles[3])}
            className={`group relative rounded-[28px] overflow-hidden cursor-pointer border border-[#162E22]/10 hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(22,46,34,0.08)] hover:shadow-[0_20px_50px_rgba(22,46,34,0.2)] transition-all duration-500 min-h-[250px] lg:min-h-0 ${
              activeFilter === "international" ? "opacity-35 scale-[0.99]" : "opacity-100"
            }`}
          >
            <img
              src={tiles[3].image}
              alt={tiles[3].name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1810]/95 via-[#0A1810]/40 to-transparent pointer-events-none" />

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#162E22]/85 backdrop-blur-md border border-[#D4AF37]/50 text-[#F5D77F] flex items-center justify-center shadow-md group-hover:bg-[#D4AF37] group-hover:text-[#162E22] group-hover:scale-110 transition-all duration-300">
              <Compass className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="text-[#F5D77F] text-xs font-bold tracking-widest uppercase block mb-0.5">
                {tiles[3].num} / {isKn ? "ಅನ್ವೇಷಿಸಿ" : "EXPLORE"}
              </span>
              <h3 className={`text-2xl font-serif-editorial font-bold text-[#F6F3EA] group-hover:text-[#F5D77F] transition-colors ${
                isKn ? "font-kannada-serif" : ""
              }`}>
                {tiles[3].name}
              </h3>
              <p className="text-xs text-white/85 line-clamp-1 font-normal">
                {tiles[3].desc}
              </p>
            </div>
          </div>

          {/* Tile 3: Himachal (Middle Bottom) */}
          <div
            onClick={() => handleTileClick(tiles[2])}
            className={`group relative rounded-[28px] overflow-hidden cursor-pointer border border-[#162E22]/10 hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(22,46,34,0.08)] hover:shadow-[0_20px_50px_rgba(22,46,34,0.2)] transition-all duration-500 min-h-[250px] lg:min-h-0 ${
              activeFilter === "international" ? "opacity-35 scale-[0.99]" : "opacity-100"
            }`}
          >
            <img
              src={tiles[2].image}
              alt={tiles[2].name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1810]/95 via-[#0A1810]/40 to-transparent pointer-events-none" />

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white/90 flex items-center justify-center shadow-md group-hover:bg-[#162E22] group-hover:text-[#F5D77F] group-hover:border-[#D4AF37]/60 group-hover:scale-110 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="text-[#F5D77F] text-xs font-bold tracking-widest uppercase block mb-0.5">
                {tiles[2].num} / {isKn ? "ಅನ್ವೇಷಿಸಿ" : "EXPLORE"}
              </span>
              <h3 className={`text-2xl font-serif-editorial font-bold text-[#F6F3EA] group-hover:text-[#F5D77F] transition-colors ${
                isKn ? "font-kannada-serif" : ""
              }`}>
                {tiles[2].name}
              </h3>
              <p className="text-xs text-white/85 line-clamp-1 font-normal">
                {tiles[2].desc}
              </p>
            </div>
          </div>

          {/* Tile 5: Beyond India (Right Bottom) */}
          <div
            onClick={() => handleTileClick(tiles[4])}
            className={`group relative rounded-[28px] overflow-hidden cursor-pointer border border-[#162E22]/10 hover:border-[#D4AF37] shadow-[0_10px_30px_rgba(22,46,34,0.08)] hover:shadow-[0_20px_50px_rgba(22,46,34,0.2)] transition-all duration-500 min-h-[250px] lg:min-h-0 ${
              activeFilter === "domestic" ? "opacity-35 scale-[0.99]" : "opacity-100"
            }`}
          >
            <img
              src={tiles[4].image}
              alt={tiles[4].name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1810]/95 via-[#0A1810]/40 to-transparent pointer-events-none" />

            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white/90 flex items-center justify-center shadow-md group-hover:bg-[#162E22] group-hover:text-[#F5D77F] group-hover:border-[#D4AF37]/60 group-hover:scale-110 transition-all duration-300">
              <Compass className="w-4 h-4" />
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="text-[#F5D77F] text-xs font-bold tracking-widest uppercase block mb-0.5">
                {tiles[4].num} / {isKn ? "ಅನ್ವೇಷಿಸಿ" : "EXPLORE"}
              </span>
              <h3 className={`text-2xl font-serif-editorial font-bold text-[#F6F3EA] group-hover:text-[#F5D77F] transition-colors ${
                isKn ? "font-kannada-serif" : ""
              }`}>
                {tiles[4].name}
              </h3>
              <p className="text-xs text-white/85 line-clamp-1 font-normal">
                {tiles[4].desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
