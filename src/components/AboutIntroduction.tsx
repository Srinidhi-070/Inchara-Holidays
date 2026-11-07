import React from "react";
import type { Locale } from "../types";
import { HeartHandshake, Compass, Shield } from "lucide-react";

interface AboutIntroductionProps {
  locale: Locale;
}

const copy = {
  en: {
    kicker: "ABOUT INCHARA HOLIDAYS",
    titleStart: "A Bridge to Karnataka’s Heritage & ",
    titleHighlight: "Mindful Hospitality.",
    body: "Inchara Holidays is more than a tour operator; we are custodians of Karnataka’s Hoysala heritage, misty Western Ghats trails, and sacred South Indian warmth. From multi-generational family getaways and curriculum-aligned industrial visits to executive corporate retreats and 100% pure vegetarian banquet catering — we provide end-to-end travel and hospitality under one trusted banner.",
    promise: "Core Promise",
    pillars: [
      {
        icon: HeartHandshake,
        title: "Sacred Hospitality",
        desc: "Rooted in the ancient ethos of treating every traveller as an honored guest with genuine care.",
      },
      {
        icon: Compass,
        title: "Unhurried Pacing",
        desc: "Mindful, unhurried itineraries designed for deep cultural immersion and restorative leisure.",
      },
      {
        icon: Shield,
        title: "Complete Transparency",
        desc: "Zero hidden costs, verified safety protocols, clean sanitized fleets, and audited heritage stays.",
      },
    ],
  },
  kn: {
    kicker: "ಇಂಚರ ಪರಿಚಯ",
    titleStart: "ಕರ್ನಾಟಕದ ಪರಂಪರೆ & ",
    titleHighlight: "ಆತ್ಮೀಯ ಆತಿಥ್ಯದ ಸೇತುವೆ.",
    body: "ಇಂಚರ ಹಾಲಿಡೇಸ್ ಕೇವಲ ಪ್ರವಾಸ ಸಂಸ್ಥೆಯಲ್ಲ; ಇದು ಕರ್ನಾಟಕದ ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆ, ಮಲೆನಾಡಿನ ಹಸಿರು ಕಣಿವೆಗಳು ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತೀಯ ಪವಿತ್ರ ಆತಿಥ್ಯವನ್ನು ಜೀವಂತವಾಗಿ ಅನುಭವಿಸುವಂತೆ ಮಾಡುವ ಆಪ್ತ ತಂಡ. ಕುಟುಂಬದ ರಜೆಗಳು, ಕಾಲೇಜುಗಳ ಕೈಗಾರಿಕಾ ಭೇಟಿಗಳು, ಕಾರ್ಪೊರೇಟ್ ಸಮ್ಮೇಳನಗಳಿಂದ ಹಿಡಿದು ೧೦೦% ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಪಂಕ್ತಿ ಭೋಜನದವರೆಗೆ — ಸಮಗ್ರ ಸೇವೆಗಳನ್ನು ಒಂದೇ ಸೂರಿನಡಿ ಒದಗಿಸುತ್ತೇವೆ.",
    promise: "ಇಂಚರ ಸಂಕಲ್ಪ",
    pillars: [
      {
        icon: HeartHandshake,
        title: "ಅತಿಥಿ ದೇವೋ ಭವ",
        desc: "ಪ್ರತಿಯೊಬ್ಬ ಪ್ರಯಾಣಿಕರನ್ನೂ ನಮ್ಮ ಮನೆಗೆ ಬಂದ ಅತಿಥಿಯಂತೆ ಆದರದಿಂದ ಕಾಣುವ ಪಾರಂಪರಿಕ ಸಂಸ್ಕೃತಿ.",
      },
      {
        icon: Compass,
        title: "ನಿರಾತಂಕ ಪಯಣ",
        desc: "ಯಾವುದೇ ಧಾವಂತವಿಲ್ಲದ, ಸ್ಥಳೀಯ ಇತಿಹಾಸ ಮತ್ತು ಪ್ರಕೃತಿಯನ್ನು ಆಪ್ತವಾಗಿ ಅನುಭವಿಸುವ ಸಮತೋಲಿತ ದಿನಚರಿ.",
      },
      {
        icon: Shield,
        title: "ಪಾರದರ್ಶಕ ವಿಶ್ವಾಸ",
        desc: "ಗುಪ್ತ ವೆಚ್ಚಗಳಿಲ್ಲದ ಸ್ಪಷ್ಟ ಬಿಲ್ಲಿಂಗ್, ಸ್ವಚ್ಛ ವಾಹನಗಳು ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ಪಾರಂಪರಿಕ ವಾಸ್ತವ್ಯ.",
      },
    ],
  },
};

export function AboutIntroduction({ locale }: AboutIntroductionProps) {
  const c = copy[locale];

  return (
    <section id="about" className="py-14 sm:py-20 bg-[#F6F3EA] bg-kolam-subtle relative overflow-hidden border-b border-[#263F32]/10" aria-labelledby="about-title">
      {/* Subtle diamond background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#162E22 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Official Registered Emblem */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-2 shadow-md border border-[#D4AF37]/60 flex items-center justify-center hover:scale-105 transition-transform duration-300">
              <img
                src="/images/brand/inchara_official_logo.png"
                alt="Inchara Holidays Official Emblem"
                className="w-full h-full object-contain"
                loading="lazy"
                width="96"
                height="96"
              />
            </div>
          </div>

          {/* Eyebrow matching Image 5 */}
          <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-widest text-[#9E3D28] uppercase mb-3.5">
            <span className="w-6 h-px bg-[#D4AF37]" />
            <span>✦</span>
            <span>{c.kicker}</span>
            <span>✦</span>
            <span className="w-6 h-px bg-[#D4AF37]" />
          </div>

          <h2 id="about-title" className={`text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-[#162E22] tracking-tight leading-[1.16] mb-6 ${
            locale === "kn" ? "font-kannada-serif" : ""
          }`}>
            {c.titleStart}
            <em className="text-[#9E3D28] font-normal not-italic font-serif-editorial italic">
              {c.titleHighlight}
            </em>
          </h2>

          <p className="text-sm sm:text-base text-[#252923]/80 leading-relaxed font-normal">
            {c.body}
          </p>
        </div>

        {/* 3 Pillar Cards matching Image 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {c.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#263F32]/12 hover:border-[#D4AF37] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F6F3EA] border border-[#D4AF37]/40 text-[#9E3D28] flex items-center justify-center mb-4 group-hover:bg-[#162E22] group-hover:text-[#F5D77F] transition-colors shadow-xs">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-serif-editorial font-bold text-[#162E22] mb-2 group-hover:text-[#9E3D28] transition-colors ${
                    locale === "kn" ? "font-kannada-serif" : ""
                  }`}>
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#252923]/75 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#263F32]/8 flex items-center justify-between text-xs text-[#252923]/60 font-medium">
                  <span className="text-[11px] uppercase tracking-wider font-semibold group-hover:text-[#162E22] transition-colors">
                    {c.promise}
                  </span>
                  <span className="text-[#D4AF37] text-xs font-bold" aria-hidden="true">▲</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
