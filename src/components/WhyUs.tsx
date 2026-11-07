import React from 'react';
import type { Locale } from '../types';

interface WhyUsProps {
  locale: Locale;
}

const content = {
  en: {
    kicker: 'OUR PHILOSOPHY',
    title: 'Personal warmth, dependable guidance',
    subtitle:
      'We are not an automated booking engine; we are your dedicated travel partners who treat your vacation as our own.',
    tag: 'Inchara Standard',
    cards: [
      {
        num: '01',
        title: 'Personalised Planning',
        desc: 'Custom-crafted day-by-day itineraries that match your family rhythm instead of rushed cookie-cutter tours.',
      },
      {
        num: '02',
        title: 'Transport Coordination',
        desc: 'Clean vehicles, verified polite chauffeurs, and effortless transfers across railheads and airports.',
      },
      {
        num: '03',
        title: 'Friendly Guidance',
        desc: 'Honest insider advice on best times to visit, authentic regional cuisine, and uncrowded viewpoints.',
      },
      {
        num: '04',
        title: 'Clear Communication',
        desc: 'Direct WhatsApp and voice access with transparent expectations and zero hidden surprises.',
      },
      {
        num: '05',
        title: 'Thoughtful Flexibility',
        desc: 'Pacing that allows spontaneous stops for tender coconut, scenic viewpoints, or local artisan visits.',
      },
      {
        num: '06',
        title: 'Continuous Support',
        desc: 'Gentle check-ins while you are on the road to ensure everything unfolds smoothly from start to finish.',
      },
    ],
  },
  kn: {
    kicker: 'ನಮ್ಮ ತತ್ವ & ಬದ್ಧತೆ',
    title: 'ಆತ್ಮೀಯ ಕಾಳಜಿ, ವಿಶ್ವಾಸಾರ್ಹ ಮಾರ್ಗದರ್ಶನ',
    subtitle:
      'ನಾವು ಕೇವಲ ಕಂಪ್ಯೂಟರ್ ಬುಕಿಂಗ್ ವ್ಯವಸ್ಥೆಯಲ್ಲ; ನಿಮ್ಮ ರಜೆಯ ದಿನಗಳನ್ನು ನಮ್ಮದೇ ಎಂಬಂತೆ ಅತ್ಯಂತ ಕಾಳಜಿಯಿಂದ ರೂಪಿಸುವ ಆಪ್ತ ಪ್ರಯಾಣ ಪಾಲುದಾರರು.',
    tag: 'ಇಂಚರ ಮಾನದಂಡ',
    cards: [
      {
        num: '01',
        title: 'ವೈಯಕ್ತಿಕ ಪ್ರವಾಸ ಯೋಜನೆ',
        desc: 'ಯಾವುದೇ ಧಾವಂತವಿಲ್ಲದ, ನಿಮ್ಮ ಕುಟುಂಬದ ಆಸಕ್ತಿಗೆ ತಕ್ಕಂತೆ ರೂಪಿಸಿದ ದಿನನಿತ್ಯದ ಸಮತೋಲಿತ ಪ್ರವಾಸ ದಿನಚರಿ.',
      },
      {
        num: '02',
        title: 'ಸುರಕ್ಷಿತ ಸಾರಿಗೆ ಸಮನ್ವಯ',
        desc: 'ಸ್ವಚ್ಛ ಹಾಗೂ ಪರಿಶೀಲಿಸಿದ ವಾಹನಗಳು, ನುರಿತ ಸೌಜನ್ಯಯುತ ಚಾಲಕರು ಮತ್ತು ನಿಲ್ದಾಣಗಳಿಂದ ನಿರಾತಂಕ ಸಾರಿಗೆ.',
      },
      {
        num: '03',
        title: 'ಆಪ್ತ ಮಾರ್ಗದರ್ಶನ',
        desc: 'ತಾಣಗಳ ಭೇಟಿಗೆ ಸೂಕ್ತ ಸಮಯ, ಶುದ್ಧ ಸಾಂಪ್ರದಾಯಿಕ ಆಹಾರದ ಆಯ್ಕೆಗಳು ಹಾಗೂ ಪ್ರಶಾಂತ ಸ್ಥಳಗಳ ಪ್ರಾಮಾಣಿಕ ಮಾಹಿತಿ.',
      },
      {
        num: '04',
        title: 'ಸ್ಪಷ್ಟ ಸಂವಹನ & ಪಾರದರ್ಶಕತೆ',
        desc: 'ಯಾವುದೇ ಗುಪ್ತ ವೆಚ್ಚಗಳಿಲ್ಲದ ಸ್ಪಷ್ಟ ವಿವರಗಳು ಹಾಗೂ ವಾಟ್ಸಾಪ್ ಮತ್ತು ದೂರವಾಣಿ ಮೂಲಕ ನೇರ ಸಂಪರ್ಕ.',
      },
      {
        num: '05',
        title: 'ಅನುಕೂಲಕರ ನಮ್ಯತೆ',
        desc: 'ದಾರಿಯಲ್ಲಿ ಎಳನೀರು ಸವಿಯಲು, ಸುಂದರ ದೃಶ್ಯ ಕಣ್ತುಂಬಿಕೊಳ್ಳಲು ಅಥವಾ ಸ್ಥಳೀಯ ಕರಕುಶಲ ವಸ್ತು ನೋಡಲು ಮುಕ್ತ ಸಮಯ.',
      },
      {
        num: '06',
        title: 'ನಿರಂತರ ಪ್ರಯಾಣ ಬೆಂಬಲ',
        desc: 'ಪ್ರವಾಸ ಆರಂಭದಿಂದ ಮುಗಿಯುವವರೆಗೆ ಎಲ್ಲವೂ ಸುಗಮವಾಗಿ ಸಾಗುತ್ತಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳುವ ನಿರಂತರ ಕಾಳಜಿ.',
      },
    ],
  },
};

export function WhyUs({ locale }: WhyUsProps) {
  const c = content[locale];

  return (
    <section id="why-us" className="py-14 sm:py-20 bg-[#FBF8F1] bg-kolam-subtle relative overflow-hidden border-b border-[#263F32]/10" aria-labelledby="why-us-title">
      {/* Subtle geometric dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(#162E22 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header matching Image 3 */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#9E3D28] uppercase mb-2">
            <span className="w-5 h-px bg-[#D4AF37]" />
            <span>✦</span>
            <span>{c.kicker}</span>
            <span>✦</span>
            <span className="w-5 h-px bg-[#D4AF37]" />
          </div>
          <h2 id="why-us-title" className={`text-2xl sm:text-3xl lg:text-4xl font-serif-editorial font-bold text-[#162E22] tracking-tight leading-[1.15] mb-4 ${
            locale === 'kn' ? 'font-kannada-serif' : ''
          }`}>
            {c.title}
          </h2>
          <p className="text-sm sm:text-base text-[#252923]/75 leading-relaxed font-normal">
            {c.subtitle}
          </p>
        </div>

        {/* 6-Card Grid matching Image 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {c.cards.map((card) => (
            <div
              key={card.num}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-[#263F32]/10 hover:border-[#D4AF37] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Number in Terracotta */}
                <span className="text-2xl sm:text-3xl font-serif-editorial font-bold text-[#9E3D28] group-hover:text-[#D4AF37] transition-colors block mb-2 sm:mb-3">
                  {card.num}
                </span>

                <h3 className={`text-lg sm:text-xl font-serif-editorial font-bold text-[#162E22] mb-2 group-hover:text-[#9E3D28] transition-colors leading-snug ${
                  locale === 'kn' ? 'font-kannada-serif' : ''
                }`}>
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#252923]/75 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              {/* Bottom tag: Inchara Standard + Accent */}
              <div className="mt-5 pt-3 border-t border-[#263F32]/8 flex items-center justify-between text-xs text-[#252923]/50 font-medium">
                <span className="tracking-wider uppercase text-[11px] font-semibold text-[#252923]/60 group-hover:text-[#162E22] transition-colors">
                  {c.tag}
                </span>
                <span className="text-[#D4AF37] text-xs font-bold" aria-hidden="true">▲</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
