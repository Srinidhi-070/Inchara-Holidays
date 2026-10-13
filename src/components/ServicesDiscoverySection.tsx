import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Language, SamplePackage } from '../types';
import { samplePackages } from '../data/packages';
import {
  Compass,
  Building2,
  UtensilsCrossed,
  GraduationCap,
  Calendar,
  Clock,
  Check,
  ShieldCheck,
  ArrowRight,
  Info,
  Users,
  Sparkles,
  MapPin,
  Coffee,
  HeartHandshake
} from 'lucide-react';

interface ServicesDiscoverySectionProps {
  language: Language;
  onOpenPlanner: (initialDest?: string, initialExp?: string) => void;
  onOpenCorporateModal: () => void;
  onOpenCateringModal: () => void;
  onOpenSchoolModal: () => void;
}

export const ServicesDiscoverySection: React.FC<ServicesDiscoverySectionProps> = ({
  language,
  onOpenPlanner,
  onOpenCorporateModal,
  onOpenCateringModal,
  onOpenSchoolModal,
}) => {
  const isKn = language === 'kn';
  const shouldReduceMotion = useReducedMotion();

  // Active filter for Sample Packages tab
  const [packageCategory, setPackageCategory] = useState<'all' | 'karnataka' | 'panIndia' | 'international'>('all');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(samplePackages[0].id);

  const filteredPackages = packageCategory === 'all'
    ? samplePackages
    : samplePackages.filter((p) => p.category === packageCategory);

  const activePackage = samplePackages.find((p) => p.id === selectedPackageId) || samplePackages[0];

  const servicesNav = [
    {
      id: 'packages',
      labelKn: 'ರಜಾ ಪ್ರವಾಸಗಳು',
      labelEn: 'Holiday Packages',
      icon: Compass,
      descKn: 'ಕುಟುಂಬ & ಗುಂಪು ಪಯಣಗಳು',
      descEn: 'Family & Curated Tours',
    },
    {
      id: 'corporate',
      labelKn: 'ಕಾರ್ಪೊರೇಟ್ ಕಾರ್ಯಕ್ರಮಗಳು',
      labelEn: 'Corporate Events',
      icon: Building2,
      descKn: 'ಟೀಮ್ ಔಟಿಂಗ್ & ಆಫ್‌ಸೈಟ್',
      descEn: 'Team Retreats & Off-sites',
    },
    {
      id: 'catering',
      labelKn: 'ಆಹಾರ ಸೇವೆಗಳು',
      labelEn: 'Catering & Hospitality',
      icon: UtensilsCrossed,
      descKn: 'ಸಮಾರಂಭ & ಪ್ರವಾಸ ಭೋಜನ',
      descEn: 'Gatherings & Travel Dining',
    },
    {
      id: 'school',
      labelKn: 'ಶಾಲಾ ಕಾರ್ಯಕ್ರಮಗಳು',
      labelEn: 'School Trips & Events',
      icon: GraduationCap,
      descKn: 'ಸುರಕ್ಷಿತ ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸಗಳು',
      descEn: 'Educational Study Tours',
    },
  ];

  const handleScrollToSub = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FBF9F4] relative border-b border-[#263F32]/10 overflow-hidden">
      {/* Decorative background subtle watermark */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#263F32]/[0.03] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B96F50]/[0.03] rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#263F32]/10 border border-[#263F32]/15 text-[#263F32] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B96F50]" />
            {isKn ? 'ಸಮಗ್ರ ಸೇವೆಗಳ ಶ್ರೇಣಿ' : 'Comprehensive Services'}
          </div>

          {/* Requested Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-editorial text-[#263F32] tracking-tight leading-tight">
            {isKn
              ? 'ನಿಮ್ಮ ಪ್ರತಿಯೊಂದು ಯೋಜನೆಗೂ, ನಮ್ಮ ಜೊತೆಯಿದೆ.'
              : 'One partner for journeys, gatherings, and celebrations.'}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#252923]/75 leading-relaxed">
            {isKn
              ? 'ವೈಯಕ್ತಿಕ ರಜಾದಿನಗಳಿಂದ ಹಿಡಿದು ಸಾಂಸ್ಥಿಕ ಸಮ್ಮೇಳನಗಳು, ಸಂಪ್ರದಾಯಬದ್ಧ ಊಟೋಪಚಾರ ಹಾಗೂ ಶಾಲಾ ಶೈಕ್ಷಣಿಕ ಪಯಣದವರೆಗೆ — ಪ್ರತಿಯೊಂದರಲ್ಲೂ ಅಚ್ಚುಕಟ್ಟು ಆತಿಥ್ಯ ಮತ್ತು ವಿಶ್ವಾಸ.'
              : 'From bespoke personal vacations and corporate retreats to respectful catering and safe student expeditions — Inchara brings authentic hospitality and care to every milestone.'}
          </p>

          {/* Quick Service Anchor Navigation */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {servicesNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollToSub(`service-${item.id}`)}
                  className="flex flex-col items-center p-3 sm:p-4 rounded-xl border border-[#263F32]/15 bg-white/70 hover:bg-[#263F32] hover:text-[#F6F3EA] text-[#263F32] transition-all group cursor-pointer shadow-2xs hover:shadow-md"
                >
                  <Icon className="w-5 h-5 mb-1.5 text-[#B96F50] group-hover:text-[#F6F3EA] transition-colors" />
                  <span className="text-xs sm:text-sm font-bold font-serif-editorial text-center leading-tight">
                    {isKn ? item.labelKn : item.labelEn}
                  </span>
                  <span className="text-[10px] text-[#252923]/60 group-hover:text-[#F6F3EA]/80 text-center mt-0.5 hidden sm:block">
                    {isKn ? item.descKn : item.descEn}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* SERVICE 1: HOLIDAY PACKAGES & TRAVEL                            */}
        {/* ============================================================== */}
        <div id="service-packages" className="mb-24 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white border border-[#263F32]/15 p-6 sm:p-10 lg:p-12 shadow-sm"
          >
            {/* Service 1 Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#263F32]/10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#B96F50] uppercase tracking-wider mb-2">
                  <Compass className="w-4 h-4" />
                  <span>01. {isKn ? 'ರಜಾ ಪ್ರವಾಸಗಳು & ಪಯಣ' : 'Holiday Packages & Travel'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#263F32]">
                  {isKn ? 'ಕ್ಯುರೇಟೆಡ್ & ಕಸ್ಟಮೈಸ್ಡ್ ರಜಾದಿನಗಳ ಅನುಭವ' : 'Curated Domestic & International Journeys'}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#252923]/70">
                  {isKn
                    ? 'ಕುಟುಂಬದ ಪ್ರವಾಸ, ಆಪ್ತರ ಸಮೂಹ ಪಯಣ, ವಾರಾಂತ್ಯದ ವಿಶ್ರಾಂತಿ, ಪರಂಪರೆಯ ಹಾದಿ, ನಿಸರ್ಗ ಸಾಹಸ ಹಾಗೂ ಅಂತಾರಾಷ್ಟ್ರೀಯ ರಜೆಗಳು. ಪ್ರತಿ ವಿವರವನ್ನೂ ನಿಮ್ಮ ಅಭಿರುಚಿಗೆ ತಕ್ಕಂತೆ ಕಸ್ಟಮೈಸ್ ಮಾಡಲಾಗುತ್ತದೆ.'
                    : 'From family vacations and group expeditions to weekend getaways, heritage trails, nature adventures, and international travel. Paced, guided, and seamlessly coordinated.'}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenPlanner()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#263F32] text-[#F6F3EA] text-xs sm:text-sm font-semibold hover:bg-[#1C2F25] transition-colors cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  {isKn ? 'ನಿಮ್ಮ ಪ್ರವಾಸ ರೂಪಿಸಿ' : 'Custom Trip Inquiry'}
                </button>
              </div>
            </div>

            {/* Service Pillars Badges */}
            <div className="py-6 flex flex-wrap gap-2 text-xs text-[#263F32]">
              {[
                { kn: 'ಕುಟುಂಬ ರಜಾದಿನಗಳು', en: 'Family Holidays' },
                { kn: 'ಗುಂಪು ಪ್ರವಾಸಗಳು', en: 'Group Tours' },
                { kn: 'ವಾರಾಂತ್ಯದ ವಿಶ್ರಾಂತಿ', en: 'Weekend Getaways' },
                { kn: 'ಸಾಂಸ್ಕೃತಿಕ & ಪರಂಪರೆ', en: 'Cultural & Heritage' },
                { kn: 'ನಿಸರ್ಗ & ಸಾಹಸ', en: 'Nature & Adventure' },
                { kn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ರಜೆಗಳು', en: 'International Holidays' },
                { kn: 'ವಾಹನ & ಸಾರಿಗೆ ವ್ಯವಸ್ಥೆ', en: 'Transit Coordination' },
                { kn: 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶನ', en: 'Guided Experiences' },
              ].map((pill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-[#F6F3EA] border border-[#263F32]/10 font-medium"
                >
                  {isKn ? pill.kn : pill.en}
                </span>
              ))}
            </div>

            {/* Sample Packages Tabs */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 border-b border-[#263F32]/10 pb-4">
              {/* Category Filter Pills (Mobile-optimized segmented scroll rail) */}
              <div className="w-full sm:w-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-1 -mx-1 sm:mx-0 sm:px-0 bg-[#263F32]/[0.04] sm:bg-transparent p-1 sm:p-0 rounded-2xl sm:rounded-none border border-[#263F32]/10 sm:border-0 touch-pan-x scroll-smooth">
                {[
                  { key: 'all', kn: 'ಎಲ್ಲಾ ಮಾದರಿಗಳು', en: 'All Curated Samples' },
                  { key: 'karnataka', kn: 'ಕರ್ನಾಟಕ & ಮಲೆನಾಡು', en: 'Karnataka & Malnad' },
                  { key: 'panIndia', kn: 'ಭಾರತದ ಪ್ರವಾಸ', en: 'Pan-India Classic' },
                  { key: 'international', kn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ', en: 'International' },
                ].map((cat) => {
                  const isCatActive = packageCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => {
                        const newCat = cat.key as any;
                        setPackageCategory(newCat);
                        const match = newCat === 'all'
                          ? samplePackages[0]
                          : samplePackages.find((p) => p.category === newCat);
                        if (match) setSelectedPackageId(match.id);
                      }}
                      className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[38px] sm:min-h-0 flex items-center justify-center ${
                        isCatActive
                          ? 'bg-[#263F32] text-[#F6F3EA] shadow-xs font-bold'
                          : 'bg-white/80 sm:bg-transparent text-[#263F32]/75 hover:bg-[#263F32]/10 hover:text-[#263F32] shadow-2xs sm:shadow-none'
                      }`}
                    >
                      {isKn ? cat.kn : cat.en}
                    </button>
                  );
                })}
              </div>

              {/* Sample Content Transparency Notice */}
              <div className="flex items-center gap-1.5 text-[11px] text-[#B96F50] bg-[#B96F50]/10 px-3 py-1.5 rounded-xl border border-[#B96F50]/20 w-full sm:w-auto">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {isKn
                    ? 'ಮಾದರಿ ವಿವರಣೆಗಳು — ಅಂತಿಮ ದರ ಹಾಗೂ ದಿನಚರಿ ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ನಿಗದಿಯಾಗುತ್ತದೆ.'
                    : 'Sample curated content — Exact inclusions & pricing customized upon direct inquiry.'}
                </span>
              </div>
            </div>

            {/* Interactive Package Showcase (Editorial Split Layout) */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Selector List */}
              <div className="lg:col-span-5 space-y-3">
                {filteredPackages.map((pkg) => {
                  const isSelected = pkg.id === activePackage.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#263F32] bg-[#263F32]/5 shadow-xs'
                          : 'border-[#263F32]/15 hover:border-[#263F32]/40 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-[#B96F50]">
                          {isKn ? pkg.badgeKn : pkg.badgeEn}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#263F32]/70 font-medium">
                          <Clock className="w-3 h-3" />
                          {isKn ? pkg.durationKn : pkg.durationEn}
                        </span>
                      </div>
                      <h4 className="text-base font-bold font-serif-editorial text-[#263F32] leading-snug">
                        {isKn ? pkg.titleKn : pkg.titleEn}
                      </h4>
                    </div>
                  );
                })}
              </div>

              {/* Right Detail Spotlight */}
              <div className="lg:col-span-7 bg-[#F6F3EA] rounded-2xl p-6 sm:p-8 border border-[#263F32]/15">
                <div className="relative rounded-xl overflow-hidden aspect-16/9 mb-6 shadow-xs">
                  <img
                    src={activePackage.image}
                    alt={activePackage.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#263F32]/90 backdrop-blur-xs text-[#F6F3EA] text-xs font-semibold px-3 py-1 rounded-full">
                    {isKn ? activePackage.badgeKn : activePackage.badgeEn}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-[#F6F3EA] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {isKn ? activePackage.durationKn : activePackage.durationEn}
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-serif-editorial text-[#263F32]">
                  {isKn ? activePackage.titleKn : activePackage.titleEn}
                </h3>

                {/* Highlights */}
                <div className="mt-5 space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#263F32]/70">
                    {isKn ? 'ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು' : 'Signature Highlights'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#252923]">
                    {(isKn ? activePackage.highlightsKn : activePackage.highlightsEn).map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions */}
                <div className="mt-5 space-y-2 pt-4 border-t border-[#263F32]/10">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#263F32]/70">
                    {isKn ? 'ಪ್ಯಾಕೇಜ್ ಒಳಗೊಂಡ ಸೌಲಭ್ಯಗಳು (ಮಾದರಿ)' : 'Sample Inclusions'}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#252923]/80">
                    {(isKn ? activePackage.inclusionsKn : activePackage.inclusionsEn).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B96F50] mt-1.5 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer banner */}
                <div className="mt-5 p-3 rounded-lg bg-amber-500/10 border border-amber-600/20 text-[11px] text-[#252923]/80">
                  <span className="font-semibold text-[#8C462C]">
                    {isKn ? 'ಸೂಚನೆ:' : 'Note:'}{' '}
                  </span>
                  {isKn ? activePackage.samplePriceDisclaimerKn : activePackage.samplePriceDisclaimerEn}
                </div>

                {/* Action button */}
                <div className="mt-6 pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenPlanner(
                        isKn ? activePackage.titleKn : activePackage.titleEn,
                        isKn ? activePackage.badgeKn : activePackage.badgeEn
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#263F32] text-[#F6F3EA] text-sm font-semibold hover:bg-[#1C2F25] transition-colors cursor-pointer shadow-xs"
                  >
                    <span>{isKn ? 'ಈ ಪ್ರವಾಸದ ಕುರಿತು ವಿಚಾರಿಸಿ' : 'Inquire for This Package'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* SERVICE 2: CORPORATE EVENTS & TEAM OUTINGS                     */}
        {/* ============================================================== */}
        <div id="service-corporate" className="mb-24 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-linear-to-br from-[#1C2F25] to-[#263F32] text-[#F6F3EA] p-6 sm:p-10 lg:p-14 shadow-xl border border-white/10 relative overflow-hidden"
          >
            {/* Visual background accents */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#B96F50]/15 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Story & Offerings */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D88D6F] uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>02. {isKn ? 'ಕಾರ್ಪೊರೇಟ್ ಕಾರ್ಯಕ್ರಮಗಳು & ಟೀಮ್ ಔಟಿಂಗ್' : 'Corporate Events & Team Outings'}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold font-serif-editorial tracking-tight text-white leading-tight">
                  {isKn
                    ? 'ಕಂಪನಿಯ ಸಂಭ್ರಮ, ಟೀಮ್ ಬಿಲ್ಡಿಂಗ್ ಹಾಗೂ ಆಫ್‌ಸೈಟ್ ಸಭೆಗಳು.'
                    : 'Polished retreats, spirited team outings & off-site summits.'}
                </h3>

                <p className="text-sm sm:text-base text-[#F6F3EA]/85 leading-relaxed">
                  {isKn
                    ? 'ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳಿಂದ ಹಿಡಿದು ಬಹುರಾಷ್ಟ್ರೀಯ ಕಂಪನಿಗಳವರೆಗೆ — ಉದ್ಯೋಗಿಗಳ ಒಗ್ಗಟ್ಟು ಹೆಚ್ಚಿಸುವ ಚಟುವಟಿಕೆಗಳು, ವಾರ್ಷಿಕ ಸಂಭ್ರಮಗಳು ಹಾಗೂ ಕಾನ್ಫರೆನ್ಸ್‌ಗಳಿಗೆ ನಾವು ಪರಿಪೂರ್ಣ ವ್ಯವಸ್ಥೆ ಮಾಡುತ್ತೇವೆ. ಸಾರಿಗೆ, ರೆಸಾರ್ಟ್ ಬುಕಿಂಗ್, ಆಡಿಯೋ-ವಿಶುಯಲ್ ಸೆಟಪ್ ಮತ್ತು ರುಚಿಕರ ಊಟೋಪಚಾರ ಒಂದೇ ಸೂರಿನಡಿ.'
                    : 'From growing startups to enterprise divisions — we orchestrate memorable off-sites, leadership conferences, team-bonding challenges, and annual galas with seamless travel coordination and personal warmth.'}
                </p>

                {/* 6 Category Offerings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    {
                      kn: 'ಕಾರ್ಪೊರೇಟ್ ಟೀಮ್ ಔಟಿಂಗ್ (Team Outings)',
                      en: 'Corporate Team Outings',
                      subKn: 'ಚಿಕ್ಕಮಗಳೂರು, ಕೂರ್ಗ್, ಕಬಿನಿ ರೆಸಾರ್ಟ್‌ಗಳು',
                      subEn: 'Coorg, Chikmagalur & Kabini resorts',
                    },
                    {
                      kn: 'ಟೀಮ್ ಬಿಲ್ಡಿಂಗ್ ಆಟಗಳು (Team Activities)',
                      en: 'Team-Building Activities',
                      subKn: 'ನುರಿತ ಫೆಸಿಲಿಟೇಟರ್‌ಗಳ ಮಾರ್ಗದರ್ಶನ',
                      subEn: 'Certified group facilitators & fun challenges',
                    },
                    {
                      kn: 'ವಾರ್ಷಿಕ ಕಂಪನಿ ಸಂಭ್ರಮ (Company Celebrations)',
                      en: 'Company Milestone Celebrations',
                      subKn: 'ಗಾಲಾ ಡಿನ್ನರ್, ಸಾಂಸ್ಕೃತಿಕ ಸಂಜೆ, ಲೈವ್ ಸಂಗೀತ',
                      subEn: 'Gala dinners, live acoustic sets & awards',
                    },
                    {
                      kn: 'ಆಫ್‌ಸೈಟ್ ಕಾನ್ಫರೆನ್ಸ್ (Conferences & Seminars)',
                      en: 'Conferences & Off-site Gatherings',
                      subKn: 'ಪ್ರೊಜೆಕ್ಟರ್, ಸಭಾಂಗಣ, ಹೈ-ಟೀ & ಊಟೋಪಚಾರ',
                      subEn: 'Boardroom AV setup, hi-tea & acoustics',
                    },
                    {
                      kn: 'ಉದ್ಯೋಗಿ ತೊಡಗಿಸಿಕೊಳ್ಳುವಿಕೆ (Engagement Events)',
                      en: 'Employee Engagement Drives',
                      subKn: 'ಪರಿಸರ ನಡಿಗೆ, ಸಾಹಸ ಕ್ರೀಡೆ, ಯೋಗ ಶಿಬಿರಗಳು',
                      subEn: 'Nature treks, wellness & creative workshops',
                    },
                    {
                      kn: 'ಎಕ್ಸಿಕ್ಯೂಟಿವ್ ಸಾರಿಗೆ (Corporate Transit)',
                      en: 'Corporate Travel Coordination',
                      subKn: 'ಹವಾನಿಯಂತ್ರಿತ ಬಸ್ಸುಗಳು & ಪ್ರೀಮಿಯಂ ಕಾರುಗಳು',
                      subEn: 'Sanitized luxury coaches & seamless transfers',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {isKn ? item.kn : item.en}
                      </div>
                      <div className="text-[11px] text-[#F6F3EA]/70 mt-0.5">
                        {isKn ? item.subKn : item.subEn}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary CTA */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <button
                    type="button"
                    onClick={onOpenCorporateModal}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#B96F50] text-[#F6F3EA] text-sm font-semibold hover:bg-[#D88D6F] hover:text-[#1C2F25] transition-all cursor-pointer shadow-md group"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{isKn ? 'ಕಾರ್ಪೊರೇಟ್ ಕಾರ್ಯಕ್ರಮ ರೂಪಿಸಿ' : 'Plan a Corporate Event'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-xs text-[#F6F3EA]/70">
                    {isKn
                      ? 'ತ್ವರಿತ ಪ್ರಸ್ತಾವನೆ & ಕಸ್ಟಮೈಸ್ಡ್ ಬಜೆಟ್ ಯೋಜನೆ'
                      : 'Fast custom quotation & tailored venue options'}
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Collages */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-4/3">
                  <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80"
                    alt="Corporate team event and conference gathering"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-xs font-semibold text-[#D88D6F] uppercase tracking-wider">
                      {isKn ? 'ವಿಶೇಷ ರೆಸಾರ್ಟ್ ಪಾಲುದಾರಿಕೆಗಳು' : 'Bespoke Resort Partnerships'}
                    </span>
                    <h5 className="text-base font-bold text-white font-serif-editorial">
                      {isKn
                        ? 'ಕೂರ್ಗ್, ಕಬಿನಿ ಮತ್ತು ಬೆಂಗಳೂರು ಹೊರವಲಯದ ಪ್ರಕೃತಿಧಾಮಗಳು'
                        : 'Serene Coffee Estates & Riverfront Conference Retreats'}
                    </h5>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden aspect-4/3 relative border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                      alt="Team building workshop"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center">
                      <span className="text-[11px] font-semibold text-white">
                        {isKn ? 'ಟೀಮ್ ಬಿಲ್ಡಿಂಗ್' : 'Team Challenges'}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-4/3 relative border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80"
                      alt="Evening gala celebration"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center">
                      <span className="text-[11px] font-semibold text-white">
                        {isKn ? 'ಗಾಲಾ ಸಂಜೆ' : 'Evening Galas'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* SERVICE 3: CATERING & HOSPITALITY                              */}
        {/* ============================================================== */}
        <div id="service-catering" className="mb-24 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white border border-[#263F32]/15 p-6 sm:p-10 lg:p-14 shadow-sm"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#263F32]/10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#B96F50] uppercase tracking-wider mb-2">
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>03. {isKn ? 'ಆಹಾರ ಸೇವೆಗಳು & ಆತಿಥ್ಯ' : 'Catering & Hospitality'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#263F32]">
                  {isKn
                    ? 'ರುಚಿಕರ ಶುದ್ಧ ಆಹಾರ, ಅಚ್ಚುಕಟ್ಟು ಪಂಕ್ತಿ ಸೇವೆ'
                    : 'Authentic Flavors & Thoughtful Hospitality'}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[#252923]/70">
                  {isKn
                    ? 'ಕಾರ್ಪೊರೇಟ್ ಸಭೆಗಳು, ಶಾಲಾ ಸಮಾರಂಭಗಳು, ಪ್ರವಾಸದ ಹಾದಿಯಲ್ಲಿ ಬಿಸಿಬಿಸಿ ಊಟೋಪಚಾರ ಹಾಗೂ ಕೌಟುಂಬಿಕ ಸಮಾರಂಭಗಳಿಗೆ ಸೂಕ್ತವಾದ ಗುಣಮಟ್ಟದ ಆಹಾರ ವ್ಯವಸ್ಥೆ.'
                    : 'Catering for corporate summits, school events, group transit dining, and family gatherings. Prepared with hygiene, served with traditional warmth.'}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={onOpenCateringModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#B96F50] text-[#F6F3EA] text-sm font-semibold hover:bg-[#8C462C] transition-colors cursor-pointer shadow-xs"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>{isKn ? 'ಆಹಾರ ವಿವರಣೆ ಪಡೆಯಿರಿ' : 'Request Catering Details'}</span>
                </button>
              </div>
            </div>

            {/* Sensory Photography Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="rounded-2xl bg-[#F6F3EA] overflow-hidden border border-[#263F32]/10 group">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src="/images/south_indian_feast.jpg"
                    alt="Traditional south indian feast on plantain banana leaf"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-[#B96F50] uppercase tracking-wider">
                    {isKn ? 'ಸಾಂಪ್ರದಾಯಿಕ ಪಂಕ್ತಿ ಭೋಜನ' : 'Traditional Plantain Feasts'}
                  </span>
                  <h4 className="text-base font-bold font-serif-editorial text-[#263F32] mt-1">
                    {isKn ? 'ಬಾಳೆ ಎಲೆ ಊಟ & ಸತ್ಕಾರ' : 'Banana Leaf Banquet & Poojas'}
                  </h4>
                  <p className="text-xs text-[#252923]/75 mt-1.5 leading-relaxed">
                    {isKn
                      ? 'ಕೌಟುಂಬಿಕ ಸಮಾರಂಭಗಳು, ಹಬ್ಬಗಳು ಹಾಗೂ ಪೂಜೆಗಳಿಗೆ ಶುದ್ಧ ಸಾತ್ವಿಕ ಅಡುಗೆ, ಪಾಯಸ, ಹಾಗೂ ಸಾಂಪ್ರದಾಯಿಕ ಸತ್ಕಾರ.'
                      : 'Authentic festive feasts with payasa, regional delicacies, and traditional seated hospitality.'}
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-[#F6F3EA] overflow-hidden border border-[#263F32]/10 group">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src="/images/south_indian_coffee.jpg"
                    alt="Traditional South Indian filter coffee in etched brass davarah"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-[#B96F50] uppercase tracking-wider">
                    {isKn ? 'ಕಾರ್ಪೊರೇಟ್ & ಹೈ-ಟೀ' : 'Corporate Buffets & Hi-Tea'}
                  </span>
                  <h4 className="text-base font-bold font-serif-editorial text-[#263F32] mt-1">
                    {isKn ? 'ದಾವಣಗೆರೆ ಬೆಣ್ಣೆದೋಸೆ & ಫಿಲ್ಟರ್ ಕಾಫಿ' : 'Authentic Filter Coffee & High-Tea'}
                  </h4>
                  <p className="text-xs text-[#252923]/75 mt-1.5 leading-relaxed">
                    {isKn
                      ? 'ಕಾನ್ಫರೆನ್ಸ್‌ಗಳಿಗೆ ಅಪ್ಪಟ ಹಿತ್ತಾಳೆ ಲೋಟದ ಫಿಲ್ಟರ್ ಕಾಫಿ, ಗರಿಗರಿ ತಿಂಡಿಗಳು, ಮತ್ತು ಅಚ್ಚುಕಟ್ಟಾದ ಮಲ್ಟಿ-ಕುಸೀನ್ ಬಫೆ ಕೌಂಟರ್ ವ್ಯವಸ್ಥೆ.'
                      : 'Traditional brass davarah filter coffee stations, regional savouries, and multi-cuisine lunch buffets for corporate gatherings.'}
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl bg-[#F6F3EA] overflow-hidden border border-[#263F32]/10 group">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                    alt="Nutritious travel meals and school lunches"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-[#B96F50] uppercase tracking-wider">
                    {isKn ? 'ಪ್ರವಾಸದ ಬಾಕ್ಸ್ ಮೀಲ್ಸ್' : 'Travel & School Meals'}
                  </span>
                  <h4 className="text-base font-bold font-serif-editorial text-[#263F32] mt-1">
                    {isKn ? 'ಶಾಲಾ & ಪ್ರವಾಸಿ ಪೌಷ್ಟಿಕ ಊಟ' : 'Nutritious & Hygienic Travel Packs'}
                  </h4>
                  <p className="text-xs text-[#252923]/75 mt-1.5 leading-relaxed">
                    {isKn
                      ? 'ಪ್ರವಾಸದ ಮಾರ್ಗದಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಹಾಗೂ ಪ್ರವಾಸಿಗರಿಗೆ ಸುರಕ್ಷಿತ, ಬಿಸಿ ಮತ್ತು ಪರಿಸರಸ್ನೇಹಿ ಪ್ಯಾಕ್ಡ್ ಊಟ.'
                      : 'Wholesome, timely, and hygienic boxed meals during bus transits and student field trips.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Inquire Details Strip */}
            <div className="mt-8 p-4 rounded-xl bg-[#263F32]/5 border border-[#263F32]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#263F32]">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#B96F50] shrink-0" />
                <span>
                  {isKn
                    ? 'ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ, ದಿನಾಂಕ, ಮೆನು ಶೈಲಿ ಹಾಗೂ ಲೈವ್ ಕೌಂಟರ್‌ಗಳ ಕುರಿತು ಮುಕ್ತವಾಗಿ ಚರ್ಚಿಸಿ.'
                    : 'Inquire with your exact guest count, date, meal timings, and special dietary requests.'}
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenCateringModal}
                className="font-bold underline text-[#8C462C] hover:text-[#B96F50] cursor-pointer shrink-0"
              >
                {isKn ? 'ಮೆನು ವಿಚಾರಿಸಿ →' : 'Plan Catering Menu →'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* SERVICE 4: SCHOOL TRIPS & EDUCATIONAL EVENTS                   */}
        {/* ============================================================== */}
        <div id="service-school" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-linear-to-br from-[#123023] via-[#1D4E3A] to-[#123023] text-[#F6F3EA] p-6 sm:p-10 lg:p-14 shadow-xl border border-white/10 relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Visuals & Safety Pillars */}
              <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-4/3">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                    alt="School students on an educational field trip"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5">
                    <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                      {isKn ? 'ಪ್ರಾಯೋಗಿಕ ಶಿಕ್ಷಣ & ಅನುಭವ' : 'Experiential Learning & Heritage'}
                    </span>
                    <h5 className="text-base font-bold text-white font-serif-editorial">
                      {isKn
                        ? 'ಪಠ್ಯಪುಸ್ತಕದ ಪಾಠಗಳು ಜೀವಂತವಾಗುವ ನೈಜ ಅನುಭವ'
                        : 'History, Science & Nature brought to life'}
                    </h5>
                  </div>
                </div>

                {/* Safety Guarantee Matrix */}
                <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2.5 text-xs">
                  <div className="font-bold text-emerald-200 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>{isKn ? 'ಸುರಕ್ಷತೆ ನಮ್ಮ ಮೊದಲ ಆದ್ಯತೆ' : 'Safety-First Commitment'}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#F6F3EA]/85 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      <span>{isKn ? 'ಜಿಪಿಎಸ್ ಟ್ರ್ಯಾಕ್ಡ್ ವಾಹನಗಳು' : 'GPS-tracked insured coaches'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      <span>{isKn ? 'ಪ್ರಥಮ ಚಿಕಿತ್ಸಾ ತರಬೇತಿ ಪಡೆದ ಮಾರ್ಷಲ್ಸ್' : 'First-aid certified trip marshals'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      <span>{isKn ? 'ಶುದ್ಧ, ಪೌಷ್ಟಿಕ ಬಿಸಿ ಊಟ' : 'Hygienic wholesome meals'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      <span>{isKn ? 'ವಿದ್ಯಾರ್ಥಿನಿಯರಿಗೆ ಪ್ರತ್ಯೇಕ ಸುರಕ್ಷತೆ' : 'Dedicated chaperone safety'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Descriptions & Action */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>04. {isKn ? 'ಶಾಲಾ ಪ್ರವಾಸಗಳು & ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ರಮಗಳು' : 'School Trips & Educational Events'}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold font-serif-editorial tracking-tight text-white leading-tight">
                  {isKn
                    ? 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಜ್ಞಾನ, ಶಿಸ್ತು ಮತ್ತು ಮರೆಯಲಾಗದ ಸಾಹಸ.'
                    : 'Safe, inspiring study tours & educational expeditions.'}
                </h3>

                <p className="text-sm sm:text-base text-[#F6F3EA]/85 leading-relaxed">
                  {isKn
                    ? 'ಶಾಲೆ, ಕಾಲೇಜು ಹಾಗೂ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳಿಗೆ ವಿಶ್ವಾಸಾರ್ಹ ಪಾಲುದಾರರಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತೇವೆ. ಕರ್ನಾಟಕದ ಭವ್ಯ ಇತಿಹಾಸದ ತಾಣಗಳು (ಹಂಪಿ, ಬಾದಾಮಿ, ಮೈಸೂರು), ವಿಜ್ಞಾನ ಕೇಂದ್ರಗಳು (ತಾರಾಲಯ, HAL ಮ್ಯೂಸಿಯಂ), ಹಾಗೂ ಪರಿಸರ ಶಿಬಿರಗಳ ಸಮಗ್ರ ವ್ಯವಸ್ಥೆ.'
                    : 'Trusted by school managements, educators, and parents. We design curriculum-aligned field trips, historical architectural tours, science expeditions, and annual picnics with verified logistics, nutritious meals, and structured student care.'}
                </p>

                {/* 4 Educational Circuits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    {
                      kn: 'ಐತಿಹಾಸಿಕ & ವಾಸ್ತುಶಿಲ್ಪ ಅಧ್ಯಯನ',
                      en: 'Heritage & UNESCO Circuits',
                      subKn: 'ಹಂಪಿ, ಪಟ್ಟದಕಲ್ಲು, ಬೇಲೂರು, ಮೈಸೂರು ಅರಮನೆ',
                      subEn: 'Hampi, Badami, Belur & Mysore Palace',
                    },
                    {
                      kn: 'ವಿಜ್ಞಾನ & ಬಾಹ್ಯಾಕಾಶ ಪರಿಶೋಧನೆ',
                      en: 'Science & Aerospace Expeditions',
                      subKn: 'ನೆಹರೂ ತಾರಾಲಯ, HAL, ವಿಶ್ವೇಶ್ವರಯ್ಯ ಮ್ಯೂಸಿಯಂ',
                      subEn: 'Planetarium, Visvesvaraya Museum & HAL',
                    },
                    {
                      kn: 'ಪರಿಸರ ವಿಜ್ಞಾನ & ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು',
                      en: 'Ecology & Biodiversity Camps',
                      subKn: 'ಮಲೆನಾಡು ಕಾಡುಗಳು, ಜೈವಿಕ ಉದ್ಯಾನವನಗಳು',
                      subEn: 'Western Ghats trails & flora studies',
                    },
                    {
                      kn: 'ವಾರ್ಷಿಕ ಶಾಲಾ ಪಿಕ್ನಿಕ್ & ಕ್ರೀಡೆ',
                      en: 'Annual Picnics & Fun Retreats',
                      subKn: 'ಮನರಂಜನಾ ಪಾರ್ಕ್, ಸಾಹಸ ಶಿಬಿರ, ಸಂವಾದ ಕೂಟ',
                      subEn: 'Theme parks, team building & bonding camps',
                    },
                  ].map((circ, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {isKn ? circ.kn : circ.en}
                      </div>
                      <div className="text-[11px] text-[#F6F3EA]/70 mt-0.5">
                        {isKn ? circ.subKn : circ.subEn}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primary CTA */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <button
                    type="button"
                    onClick={onOpenSchoolModal}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-[#123023] text-sm font-bold hover:bg-emerald-400 transition-all cursor-pointer shadow-md group"
                  >
                    <GraduationCap className="w-4 h-4 text-[#123023]" />
                    <span>{isKn ? 'ಶಾಲಾ ಪ್ರವಾಸ ರೂಪಿಸಿ' : 'Plan an Educational Trip'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-xs text-[#F6F3EA]/70">
                    {isKn
                      ? 'ಪೋಷಕರಿಗೆ ನಿರಾಳತೆ, ಶಿಕ್ಷಕರಿಗೆ ನೆಮ್ಮದಿ, ಮಕ್ಕಳಿಗೆ ಖುಷಿ'
                      : 'Peace of mind for educators and parents alike'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
