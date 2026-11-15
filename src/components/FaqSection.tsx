import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale, ServiceId } from '../types';
import { FAQS_DATA } from '../data/faqData';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Sparkles,
  MessageCircleQuestion,
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
  Car,
  GraduationCap,
  CreditCard,
  CloudSunRain,
} from 'lucide-react';
import { LotusIcon } from './SouthIndianMotifs';

interface FaqSectionProps {
  locale: Locale;
  onEnquire: (service?: ServiceId | string, initialDetails?: string) => void;
}

type FaqCategoryFilter = 'all' | 'pure_veg' | 'booking_pricing' | 'custom_planning' | 'fleet_safety' | 'educational' | 'cancellation';

export const FaqSection: React.FC<FaqSectionProps> = ({ locale, onEnquire }) => {
  const isKn = locale === 'kn';
  const [activeCategory, setActiveCategory] = useState<FaqCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(FAQS_DATA[0].id);

  const categories: { id: FaqCategoryFilter; labelEn: string; labelKn: string; icon: React.ReactNode }[] = [
    { id: 'all', labelEn: 'All Questions', labelKn: 'ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳು', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'pure_veg', labelEn: '100% Pure Veg', labelKn: 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರ', icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
    { id: 'booking_pricing', labelEn: 'Pricing & Token', labelKn: 'ದರ & ಮುಂಗಡ', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'custom_planning', labelEn: 'Custom Tailoring', labelKn: 'ವಿಶಿಷ್ಟ ಮಾರ್ಗಸೂಚಿ', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'fleet_safety', labelEn: 'Fleet & Chauffeurs', labelKn: 'ವಾಹನ & ಚಾಲಕರು', icon: <Car className="w-3.5 h-3.5" /> },
    { id: 'educational', labelEn: 'Educational Tours', labelKn: 'ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸ', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'cancellation', labelEn: 'Weather & Refunds', labelKn: 'ಹವಾಮಾನ & ನೀತಿ', icon: <CloudSunRain className="w-3.5 h-3.5" /> },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.questionEn.toLowerCase().includes(q) ||
        faq.questionKn.toLowerCase().includes(q) ||
        faq.answerEn.toLowerCase().includes(q) ||
        faq.answerKn.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section bg-[#FBF8F1] relative py-20 overflow-hidden" id="faqs" aria-labelledby="faqs-heading">
      {/* Background Motifs */}
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-[#162E22]/5 blur-3xl pointer-events-none" />

      <div className="shell relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#9E3D28] uppercase mb-3">
            <span className="w-6 h-px bg-[#D4AF37]" />
            <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>{isKn ? 'ನಿಮ್ಮ ಸಂಶಯಗಳಿಗೆ ಸ್ಪಷ್ಟ ಉತ್ತರಗಳು' : 'Clarity & Honest Guidance'}</span>
            <span className="w-6 h-px bg-[#D4AF37]" />
          </div>

          <h2 id="faqs-heading" className="text-3xl sm:text-4xl font-bold font-serif-editorial text-[#162E22] tracking-tight">
            {isKn ? (
              <>
                ಪ್ರಯಾಣಿಕರ ಸಾಮಾನ್ಯ <em className="text-[#9E3D28] font-normal font-serif">ಪ್ರಶ್ನೋತ್ತರಗಳು</em>
              </>
            ) : (
              <>
                Frequently Asked <em className="text-[#9E3D28] font-normal font-serif">Questions</em>
              </>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#252923]/75 leading-relaxed">
            {isKn
              ? 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಆತಿಥ್ಯ, ಪಾವತಿ ವಿಧಾನ, ಸುರಕ್ಷಿತ ವಾಹನಗಳು ಮತ್ತು ನಿಮ್ಮ ಅನುಕೂಲಕ್ಕೆ ತಕ್ಕಂತೆ ಪ್ರವಾಸ ರೂಪಿಸುವ ಬಗೆಗಿನ ಸಮಗ್ರ ವಿವರಣೆಗಳು.'
              : 'Everything you need to know about our 100% pure vegetarian dining promise, verified fleet, transparent pricing, and personalized tour planning.'}
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-[#162E22]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isKn ? 'ಪ್ರಶ್ನೆ ಅಥವಾ ವಿಷಯವನ್ನು ಹುಡುಕಿ...' : 'Search answers, e.g. pure veg, advance, refund...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#263F32]/15 text-xs text-[#162E22] placeholder:text-[#252923]/40 focus:outline-none focus:border-[#D4AF37] shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 max-w-4xl mx-auto px-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isActive
                    ? 'bg-[#162E22] text-[#F5D77F] border-[#162E22] shadow-sm'
                    : 'bg-white/80 text-[#252923]/80 border-[#263F32]/10 hover:border-[#D4AF37]/50 hover:bg-white shadow-xs'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{isKn ? cat.labelKn : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white/60 rounded-2xl border border-dashed border-[#263F32]/15">
              <MessageCircleQuestion className="w-8 h-8 text-[#9E3D28]/60 mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#162E22]">
                {isKn ? 'ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'No matching questions found'}
              </p>
              <p className="text-xs text-[#252923]/60 mt-1">
                {isKn ? 'ನೇರವಾಗಿ ರವೀಂದ್ರ ಅವರನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ವಿಚಾರಣೆ ನಮೂನೆ ಭರ್ತಿ ಮಾಡಿ.' : 'Feel free to consult Ravindra directly via WhatsApp or submit an enquiry.'}
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isExpanded = expandedId === faq.id;
              const question = isKn ? faq.questionKn : faq.questionEn;
              const answer = isKn ? faq.answerKn : faq.answerEn;
              const counter = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl transition-all border ${
                    isExpanded
                      ? 'bg-white border-[#D4AF37]/60 shadow-md ring-1 ring-[#D4AF37]/20'
                      : 'bg-white/70 hover:bg-white border-[#263F32]/10 shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <span className="text-xs font-mono font-bold text-[#9E3D28] shrink-0 bg-[#F6F3EA] px-2 py-0.5 rounded-md border border-[#9E3D28]/15">
                        {counter}
                      </span>
                      <span className={`text-sm sm:text-base font-semibold leading-snug ${isExpanded ? 'text-[#162E22]' : 'text-[#252923]'}`}>
                        {question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isExpanded ? 'bg-[#162E22] text-[#F5D77F] rotate-180' : 'bg-[#F6F3EA] text-[#162E22]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#252923]/80 leading-relaxed border-t border-[#263F32]/5">
                          <p>{answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Direct Assistance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#162E22] to-[#1E3A2B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#D4AF37]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F5D77F] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isKn ? 'ವಿಶಿಷ್ಟ ಅಗತ್ಯವಿದೆಯೇ?' : 'Have a unique travel requirement?'}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif-editorial text-white">
              {isKn ? 'ನೇರವಾಗಿ ರವೀಂದ್ರ ಅವರೊಂದಿಗೆ ಮಾತನಾಡಿ' : 'Consult Ravindra S (Owner & Curator)'}
            </h3>
            <p className="text-xs text-white/70 mt-0.5">
              {isKn
                ? 'ನಿಮ್ಮ ಕುಟುಂಬ ಅಥವಾ ತಂಡಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಕೈಬರಹದ ಮಾರ್ಗಸೂಚಿ ಮತ್ತು ಕೊಟೇಶನ್ ಪಡೆಯಿರಿ.'
                : 'Get bespoke itinerary advisory and an itemized quotation tailored to your exact dates.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEnquire('holidays', 'Inquiry from FAQ Section')}
            className="gold-button !m-0 !py-2.5 !px-5 !text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-2"
          >
            <span>{isKn ? 'ವಿಚಾರಣೆ ಆರಂಭಿಸಿ' : 'Start Enquiry'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
