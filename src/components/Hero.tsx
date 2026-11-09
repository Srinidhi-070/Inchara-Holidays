import React from 'react';
import { Language, Concept } from '../types';
import { LotusIcon, AmbariElephant, SikkuKolamMandala } from './SouthIndianMotifs';
import { Globe, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  language: Language;
  onOpenPlanner: () => void;
  onExploreDestinations: () => void;
  concept?: Concept;
  headerSlot?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenPlanner,
  onExploreDestinations,
  concept = 'A',
  headerSlot,
}) => {
  const kn = language === 'kn';

  if (concept === 'B') {
    return (
      <section className="hero hero-journal relative min-h-screen min-h-dvh flex flex-col justify-between overflow-hidden" id="top">
        {headerSlot}

        {/* Ambient Subtle Parchment & Kolam Background */}
        <div className="absolute inset-0 bg-[#FBF8F1] z-0" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] text-[#263F32] opacity-[0.035] pointer-events-none z-0">
          <SikkuKolamMandala className="w-full h-full" />
        </div>
        <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none z-0" />

        {/* Main Content Grid: Seamless across 16:9, 21:9, 4:3, Tablets, & Mobile */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* Left Column (7 cols): Editorial Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#9E3D28] uppercase">
                <span className="w-6 h-px bg-[#D4AF37]" />
                <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {kn
                    ? 'ಸಂಸ್ಕೃತಿಯಿಂದ ರೂಪುಗೊಂಡ, ಹೃದಯದಿಂದ ಮಾರ್ಗದರ್ಶಿತ'
                    : 'Journeys shaped by culture, guided by heart'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif-editorial text-[#162E22] tracking-tight leading-[1.12]">
                {kn ? (
                  <>
                    ನಿಧಾನವಾಗಿ ಸಾಗಿದಾಗ{' '}
                    <br />
                    <em className="text-[#9E3D28] font-normal font-serif">ಪ್ರಯಾಣವೇ ಕಥೆಯಾಗುತ್ತದೆ.</em>
                  </>
                ) : (
                  <>
                    Travel becomes a story{' '}
                    <br />
                    <em className="text-[#9E3D28] font-normal font-serif">when you slow down.</em>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[#252923]/80 leading-relaxed font-normal max-w-xl">
                {kn
                  ? 'ಮಣ್ಣಿನ ಕಥೆ, ಜನರ ಆತ್ಮೀಯತೆ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ನೈಜ ಸೊಬಗು. ಧಾವಂತವಿಲ್ಲದ ಪಯಣದ ನೈಜ ಅನುಭವಗಳು.'
                  : 'An unhurried journal of South India’s misty hills, ancient stone corridors, and the warm, quiet dignity of authentic hospitality.'}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  className="group px-7 sm:px-8 py-3.5 sm:py-4 min-h-[48px] rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] hover:brightness-105 text-[#12261C] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] active:scale-95 cursor-pointer border border-[#F5D77F]/60"
                  onClick={onOpenPlanner}
                >
                  <span className="text-[#12261C] font-bold">{kn ? 'ನಿಮ್ಮ ಕಥೆ ಆರಂಭಿಸಿ' : 'Begin your story'}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#12261C] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button
                  type="button"
                  className="px-7 py-3.5 min-h-[46px] rounded-xl bg-white hover:bg-[#F6F3EA] text-[#162E22] border border-[#263F32]/15 text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95 cursor-pointer"
                  onClick={onExploreDestinations}
                >
                  <span>{kn ? 'ಪ್ರಯಾಣ ಪತ್ರಿಕೆ ತೆರೆಯಿರಿ' : 'Open the journal'}</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>

            {/* Right Column (5 cols): Layered Visual Journal Spread */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/40 bg-white p-3 group">
                <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96">
                  <img
                    src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=88"
                    alt="Western Ghats travel journal photography"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
                  
                  {/* Photo Frame Internal Hairline */}
                  <div className="absolute inset-3 border border-white/35 rounded-xl pointer-events-none" />
                  
                  {/* Bottom Location & Coordinates Pill */}
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between">
                    <span className="font-semibold tracking-wider uppercase text-[#F5D77F] flex items-center gap-1.5">
                      <LotusIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Western Ghats</span>
                    </span>
                    <span className="font-mono text-[11px] opacity-80">12.97° N · 75.78° E</span>
                  </div>
                </div>

                {/* Tactile Field Note Card Docked Seamlessly Under the Photo */}
                <div className="mt-3 p-3.5 rounded-xl bg-[#F6F3EA] border border-[#263F32]/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold text-[#9E3D28] tracking-widest uppercase flex items-center gap-1">
                      <span>✦ FIELD NOTE / 01</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#162E22] font-semibold mt-0.5">
                      {kn ? 'ಮಣ್ಣಿನ ಕಥೆ. ಜನರ ಆತ್ಮೀಯತೆ.' : 'Stories of soil. Generosity of people.'}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#162E22] text-[#F5D77F] flex items-center justify-center shrink-0 border border-[#D4AF37]/40 shadow-xs">
                    <AmbariElephant className="w-5 h-5" color="#D4AF37" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <button
          type="button"
          className="scroll-cue cursor-pointer border-0 bg-transparent text-[#162E22] pb-4"
          onClick={onExploreDestinations}
        >
          <span />
          {kn ? 'ಅನ್ವೇಷಿಸಲು ಕೆಳಗೆ ಸಾಗಿ' : 'Scroll to wander'}
        </button>
      </section>
    );
  }

  if (concept === 'C') {
    return (
      <section className="hero hero-global relative min-h-screen min-h-dvh flex flex-col justify-between overflow-hidden" id="top">
        {headerSlot}

        {/* Cinematic Full-Bleed Background with Luxury Atmosphere */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1653189382464-25302f3e7409?auto=format&fit=crop&w=2200&q=90"
            alt="Global expedition scenic vista"
            className="w-full h-full object-cover"
          />
          {/* Dual Gradient Scrim: Horizontal contrast for readability + vertical bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06170E]/95 via-[#06170E]/75 to-[#06170E]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06170E] via-transparent to-transparent opacity-80" />
        </div>

        {/* Typographic "BEYOND" Watermark gracefully positioned on the right */}
        <div className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 text-white/[0.04] font-bold font-sans text-[clamp(6rem,18vw,20rem)] tracking-tighter leading-none pointer-events-none select-none z-0">
          BEYOND
        </div>

        {/* Main Content Grid: Resilient across ALL screen ratios */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* Left Column (7 cols): Bold Global Explorer Typography */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#F5D77F] uppercase">
                <span className="w-6 h-px bg-[#D4AF37]" />
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {kn
                    ? 'ಭಾರತದಿಂದ ವಿಶ್ವದವರೆಗೆ · ನಿಮಗಾಗಿ ರೂಪಿಸಿದ'
                    : 'India to the world · Curated privately'}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sans text-white tracking-tight leading-[0.98]">
                {kn ? (
                  <>
                    ಇನ್ನೂ <br />
                    <em className="text-[#F5D77F] font-normal font-serif">ಮುಂದೆ.</em>
                  </>
                ) : (
                  <>
                    GO <br />
                    <em className="text-[#F5D77F] font-normal font-serif">FURTHER.</em>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal max-w-xl">
                {kn
                  ? 'ಜಗತ್ತನ್ನು ನಿಮ್ಮ ರೀತಿಯಲ್ಲಿ ಅನ್ವೇಷಿಸಿ. ಪ್ರಮುಖ ದೇಶೀಯ ತಾಣಗಳಿಂದ ಹಿಡಿದು ಅಂತಾರಾಷ್ಟ್ರೀಯ ಪಯಣಗಳವರೆಗೆ ಎಲ್ಲವೂ ಒಂದೇ ಸೂರಿನಡಿ.'
                  : 'One thoughtful travel studio. A world of uncommon places. Tailor-made journeys across India and distinctive international horizons.'}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  className="group px-7 sm:px-8 py-3.5 sm:py-4 min-h-[48px] rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] hover:brightness-105 text-[#12261C] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] active:scale-95 cursor-pointer border border-[#F5D77F]/60"
                  onClick={onOpenPlanner}
                >
                  <span className="text-[#12261C] font-bold">{kn ? 'ನನ್ನ ಪ್ರವಾಸ ರೂಪಿಸಿ' : 'Design my escape'}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#12261C] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button
                  type="button"
                  className="px-7 py-3.5 min-h-[46px] rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 backdrop-blur-xs active:scale-95 cursor-pointer group"
                  onClick={onExploreDestinations}
                >
                  <span>{kn ? 'ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ' : 'Explore destinations'}</span>
                  <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>

            {/* Right Column (5 cols): Modern Explorer Preview Card */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md p-3 group">
                <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96">
                  <img
                    src="https://images.unsplash.com/photo-1742175257067-414cbe9033ff?auto=format&fit=crop&w=1200&q=88"
                    alt="International travel landscape"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/60 text-[#F5D77F] text-xs font-bold tracking-wider uppercase">
                      Curated Horizons
                    </span>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs flex items-center justify-between">
                    <span className="font-semibold tracking-wider uppercase text-white flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Beyond India</span>
                    </span>
                    <span className="font-mono text-[11px] text-[#F5D77F]">Vietnam · Bali · Europe</span>
                  </div>
                </div>

                {/* Explorer Subtext Guarantee */}
                <div className="mt-3 p-3 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between text-xs text-white/80">
                  <span>Custom private itineraries with end-to-end visas & transit</span>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <button
          type="button"
          className="scroll-cue cursor-pointer border-0 bg-transparent text-white pb-4"
          onClick={onExploreDestinations}
        >
          <span />
          {kn ? 'ಅನ್ವೇಷಿಸಲು ಕೆಳಗೆ ಸಾಗಿ' : 'Scroll to wander'}
        </button>
      </section>
    );
  }

  // Concept A: Indian Luxury Edit (Default)
  return (
    <section className="hero hero-luxury" id="top">
      {headerSlot}
      <div className="hero-image" />
      <div className="hero-rule" />
      <div className="location-stamp">
        <span>12° 58′ N · 75° 46′ E</span>
        <strong>Western Ghats, India</strong>
      </div>
      <div className="hero-copy">
        <p className="eyebrow">
          {kn
            ? 'ಸಂಸ್ಕೃತಿಯಿಂದ ರೂಪುಗೊಂಡ, ಹೃದಯದಿಂದ ಮಾರ್ಗದರ್ಶಿತ ಪ್ರಯಾಣಗಳು'
            : 'Journeys shaped by culture, guided by heart'}
        </p>
        <h1>
          {kn ? 'ಭಾರತವನ್ನು ಅನ್ವೇಷಿಸಿ,' : 'Discover India,'}
          <br />
          <em>{kn ? 'ಸಾಮಾನ್ಯತೆಯನ್ನು ಮೀರಿ.' : 'beyond the ordinary.'}</em>
        </h1>
        <p className="kannada" lang="kn">
          ಭಾರತವನ್ನು ಹೊಸ ಅನುಭವಗಳೊಂದಿಗೆ ಅನ್ವೇಷಿಸಿ.
        </p>
        <p className="hero-summary">
          {kn
            ? 'ಚಿಂತನೆಯಿಂದ ರೂಪಿಸಿದ ಪ್ರಯಾಣಗಳು, ನೈಜ ಸ್ಥಳೀಯ ಅನುಭವಗಳು ಮತ್ತು ಪ್ರತಿಯೊಂದು ಪ್ರಯಾಣವನ್ನೂ ಆತ್ಮೀಯವಾಗಿಸುವ ಆತಿಥ್ಯ.'
            : 'Thoughtfully curated journeys, authentic local experiences, and hospitality that makes every journey feel personal.'}
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="button button-gold"
            onClick={onOpenPlanner}
          >
            <span>{kn ? 'ಪ್ರಯಾಣ ರೂಪಿಸಿ' : 'Plan your journey'}</span>
            <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            className="button button-outline group inline-flex items-center gap-2 cursor-pointer"
            onClick={onExploreDestinations}
          >
            <span>{kn ? 'ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ' : 'Explore destinations'}</span>
            <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
      <button
        type="button"
        className="scroll-cue cursor-pointer border-0 bg-transparent text-white"
        onClick={onExploreDestinations}
      >
        <span />
        {kn ? 'ಅನ್ವೇಷಿಸಲು ಕೆಳಗೆ ಸಾಗಿ' : 'Scroll to wander'}
      </button>
    </section>
  );
};
