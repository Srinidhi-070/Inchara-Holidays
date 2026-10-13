import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, TripPlanningFormData } from '../types';
import { translations } from '../data/translations';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Calendar,
  Users,
  Compass,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  Copy,
  CheckCheck,
  MessageCircle,
  Clock,
  Shield,
  RefreshCw,
} from 'lucide-react';
import { AmbariElephant, LotusIcon, KolamBorderRibbon, SikkuKolamMandala } from './SouthIndianMotifs';

interface TripPlannerModalProps {
  isOpen: boolean;
  language: Language;
  initialDestination?: string;
  initialExperience?: string;
  onClose: () => void;
}

const initialForm: TripPlanningFormData = {
  scope: 'domestic',
  destinations: [],
  customDestination: '',
  travelMonth: 'Upcoming Month',
  flexibility: 'flexible_few_days',
  durationDays: 4,
  travellersCount: 2,
  travellerType: 'couple',
  styles: ['Nature & Plantations', 'Heritage & Architecture'],
  budgetTier: 'premium',
  specialNotes: '',
  fullName: '',
  contactNumber: '',
  email: '',
  preferredChannel: 'whatsapp',
};

export const TripPlannerModal: React.FC<TripPlannerModalProps> = ({
  isOpen,
  language,
  initialDestination,
  initialExperience,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<TripPlanningFormData>(() => {
    return {
      ...initialForm,
      destinations: initialDestination ? [initialDestination] : [],
      styles: initialExperience ? [initialExperience] : initialForm.styles,
    };
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  if (!isOpen) return null;
  const t = translations[language];

  const popularDestinationsList = [
    { kn: 'ಕೊಡಗು (ಕೂರ್ಗ್)', en: 'Coorg (Kodagu)' },
    { kn: 'ಹಂಪಿ', en: 'Hampi' },
    { kn: 'ಗೋಕರ್ಣ', en: 'Gokarna' },
    { kn: 'ಚಿಕ್ಕಮಗಳೂರು', en: 'Chikkamagaluru' },
    { kn: 'ಮೈಸೂರು & ಶ್ರೀರಂಗಪಟ್ಟಣ', en: 'Mysuru & Srirangapatna' },
    { kn: 'ಕೇರಳ ಹಿನ್ನೀರು & ವಯನಾಡು', en: 'Kerala Backwaters & Wayanad' },
    { kn: 'ರಾಜಸ್ಥಾನ', en: 'Rajasthan' },
    { kn: 'ಹಿಮಾಲಯ / ಕಾಶ್ಮೀರ', en: 'Himalayas / Kashmir' },
    { kn: 'ಜಪಾನ್', en: 'Japan' },
    { kn: 'ವಿಯೆಟ್ನಾಂ', en: 'Vietnam' },
  ];

  const travelStylesList = [
    { id: 'nature', kn: 'ಮಂಜಿನ ಗಿರಿಗಳು & ಕಾಫಿ ತೋಟಗಳು', en: 'Misty Hills & Plantations' },
    { id: 'heritage', kn: 'ಪ್ರಾಚೀನ ಪರಂಪರೆ & ಶಿಲಾ ಶಿಲ್ಪಗಳು', en: 'Ancient Heritage & Stone Architecture' },
    { id: 'coastal', kn: 'ಶಾಂತ ಕಡಲತೀರ & ಸೂರ್ಯಾಸ್ತ', en: 'Coastal Retreat & Sunset Walks' },
    { id: 'wildlife', kn: 'ವನ್ಯಜೀವಿ ಸಫಾರಿ & ಮಳೆಕಾಡು', en: 'Wildlife Safari & Rainforests' },
    { id: 'roadtrip', kn: 'ಸುಂದರ ಘಾಟ್ ರಸ್ತೆ ಪಯಣ', en: 'Scenic Mountain Ghat Drives' },
    { id: 'culinary', kn: 'ಸ್ಥಳೀಯ ಆಹಾರ & ಸಾಂಸ್ಕೃತಿಕ ರುಚಿ', en: 'Authentic Regional Gastronomy' },
  ];

  const months = [
    { kn: 'ಮುಂದಿನ ೩೦ ದಿನಗಳಲ್ಲಿ', en: 'Next 30 Days' },
    { kn: 'ನವೆಂಬರ್ – ಡಿಸೆಂಬರ್', en: 'Nov – Dec' },
    { kn: 'ಜನವರಿ – ಫೆಬ್ರವರಿ', en: 'Jan – Feb' },
    { kn: 'ಮಾರ್ಚ್ – ಏಪ್ರಿಲ್', en: 'Mar – Apr' },
    { kn: 'ಮೇ – ಜೂನ್', en: 'May – Jun' },
    { kn: 'ಜುಲೈ – ಅಕ್ಟೋಬರ್', en: 'Jul – Oct' },
  ];

  const handleToggleDestination = (destName: string) => {
    setFormData((prev) => {
      const exists = prev.destinations.includes(destName);
      if (exists) {
        return { ...prev, destinations: prev.destinations.filter((d) => d !== destName) };
      }
      return { ...prev, destinations: [...prev.destinations, destName] };
    });
  };

  const handleToggleStyle = (styleName: string) => {
    setFormData((prev) => {
      const exists = prev.styles.includes(styleName);
      if (exists) {
        return { ...prev, styles: prev.styles.filter((s) => s !== styleName) };
      }
      return { ...prev, styles: [...prev.styles, styleName] };
    });
  };

  const validateStep = (currentStep: number): boolean => {
    setValidationError('');
    if (currentStep === 2) {
      if (formData.destinations.length === 0 && !formData.customDestination.trim()) {
        setValidationError(
          language === 'kn'
            ? 'ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ಒಂದು ತಾಣವನ್ನು ಆರಿಸಿ ಅಥವಾ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.'
            : 'Please select at least one destination or enter your desired location.'
        );
        return false;
      }
    }
    if (currentStep === 7) {
      if (!formData.fullName.trim()) {
        setValidationError(
          language === 'kn' ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.' : 'Please provide your full name.'
        );
        return false;
      }
      if (!formData.contactNumber.trim() && !formData.email.trim()) {
        setValidationError(
          language === 'kn'
            ? 'ದಯವಿಟ್ಟು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಥವಾ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.'
            : 'Please provide either a phone number or email address.'
        );
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 8));
    }
  };

  const handlePrev = () => {
    setValidationError('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const generateBriefSummaryText = (): string => {
    const selectedDests = [
      ...formData.destinations,
      formData.customDestination.trim() ? formData.customDestination.trim() : null,
    ]
      .filter(Boolean)
      .join(', ');

    return `*${language === 'kn' ? 'ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್ ಪ್ರವಾಸ ರೂಪರೇಷೆ' : 'Inchara Holidays Travel Brief'}*
----------------------------------------
• ${language === 'kn' ? 'ಪ್ರಯಾಣಿಕರ ಹೆಸರು' : 'Guest'}: ${formData.fullName || (language === 'kn' ? 'ಹೆಸರು ಇಲ್ಲ' : 'Traveller')}
• ${language === 'kn' ? 'ವ್ಯಾಪ್ತಿ' : 'Scope'}: ${formData.scope.toUpperCase()}
• ${language === 'kn' ? 'ಆಯ್ಕೆಯ ತಾಣಗಳು' : 'Destinations'}: ${selectedDests || (language === 'kn' ? 'ಸಮಾಲೋಚನೆಗೆ ಮುಕ್ತ' : 'Open to suggestions')}
• ${language === 'kn' ? 'ಅವಧಿ' : 'Duration'}: ${formData.durationDays} ${language === 'kn' ? 'ದಿನಗಳು' : 'Days'} (${formData.travelMonth})
• ${language === 'kn' ? 'ಹೊಂದಾಣಿಕೆ' : 'Flexibility'}: ${formData.flexibility}
• ${language === 'kn' ? 'ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ' : 'Travellers'}: ${formData.travellersCount} (${formData.travellerType})
• ${language === 'kn' ? 'ಬಜೆಟ್ ಹಂತ' : 'Comfort Tier'}: ${formData.budgetTier}
• ${language === 'kn' ? 'ಆಸಕ್ತಿ ಶೈಲಿಗಳು' : 'Styles'}: ${formData.styles.join(', ')}
• ${language === 'kn' ? 'ವಿಶೇಷ ಕೋರಿಕೆ' : 'Notes'}: ${formData.specialNotes || 'None'}
• ${language === 'kn' ? 'ಸಂಪರ್ಕ' : 'Contact'}: ${formData.contactNumber || formData.email} (${formData.preferredChannel})
----------------------------------------
Generated via Inchara Holidays Prototype`;
  };

  const handleCopySummary = async () => {
    const text = generateBriefSummaryText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleOpenWhatsAppSample = () => {
    const text = encodeURIComponent(generateBriefSummaryText());
    // Safe placeholder URL for prototype demonstration
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setFormData(initialForm);
    setStep(1);
    setValidationError('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Dark backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />

        {/* Modal / Sheet Container: Fullscreen slide-up on mobile, right-aligned side-sheet on desktop */}
        <div className="fixed inset-0 flex flex-col justify-end lg:justify-stretch lg:items-end pointer-events-none">
          <motion.div
            initial={{ y: '100%', opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 280,
            }}
            className="pointer-events-auto relative w-full h-[94dvh] max-h-[96dvh] lg:h-full lg:max-h-full lg:w-[620px] xl:w-[680px] bg-[#FBF8F1] rounded-t-3xl lg:rounded-none lg:rounded-l-3xl shadow-2xl overflow-hidden border-t lg:border-t-0 lg:border-l border-[#D4AF37]/35 text-[#252923] flex flex-col"
          >
            {/* Top Kasavu gold hairline */}
            <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#B96F50]" />

            {/* Mobile Sheet Pull Handle Bar */}
            <div className="lg:hidden w-full flex items-center justify-center pt-2.5 pb-1 bg-[#263F32] shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-white/25" />
            </div>

            {/* Header */}
            <div className="px-5 sm:px-6 py-3.5 sm:py-5 bg-[#263F32] text-[#F6F3EA] flex items-center justify-between shrink-0 shadow-xs relative overflow-hidden">
              {/* Kolam Watermark in header */}
              <div className="absolute right-12 -bottom-6 w-28 h-28 opacity-10 pointer-events-none text-[#F5D77F]">
                <SikkuKolamMandala className="w-full h-full" />
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5D77F]">
                  <AmbariElephant className="w-5 h-5 text-[#F5D77F]" />
                </div>
                <div>
                  <h3 className="font-bold font-serif-editorial text-base sm:text-xl text-[#F6F3EA] flex items-center gap-2">
                    {t.planner.modalTitle}
                    <LotusIcon className="w-3.5 h-3.5 text-[#F5D77F]/80 hidden sm:inline-block" />
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#AAB69A]">
                    {t.planner.step} {step} {t.planner.of} 8: {t.planner.steps[`step${step}` as keyof typeof t.planner.steps]}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-white/10 text-white/80 transition-colors cursor-pointer z-10"
                aria-label={t.modal.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-[#263F32]/10 w-full shrink-0">
              <div
                className="h-full bg-[#D4AF37] transition-all duration-300"
                style={{ width: `${(step / 8) * 100}%` }}
              />
            </div>

            {/* Continuous Sikku Kolam ribbon */}
            <KolamBorderRibbon className="w-full h-3 shrink-0" color="#D4AF37" />

            {/* Step Form Body */}
            <div className="p-5 sm:p-8 flex-1 overflow-y-auto flex flex-col justify-between relative bg-[#FBF9F4]">
              {/* Subtle background Kolam watermark */}
              <div className="absolute right-4 bottom-8 w-64 h-64 opacity-[0.035] pointer-events-none text-[#263F32]">
                <SikkuKolamMandala className="w-full h-full" />
              </div>
            <div className="space-y-6">
              {/* STEP 1: Travel Scope */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold font-serif-editorial text-[#263F32]">
                      {t.planner.scopeQuestion}
                    </h4>
                    <p className="text-xs text-[#252923]/70">
                      {language === 'kn'
                        ? 'ಕರ್ನಾಟಕದ ಸುಂದರ ಮಲೆನಾಡು, ಕರಾವಳಿ, ಭಾರತದ ಪಯಣ ಅಥವಾ ವಿದೇಶದ ಸಾಹಸ.'
                        : 'Explore local Karnataka sanctuaries, grand Indian circuits, or global frontiers.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                    {[
                      {
                        key: 'domestic',
                        titleKn: 'ಕರ್ನಾಟಕ & ಭಾರತ',
                        titleEn: 'Karnataka & India',
                        descKn: 'ಮಲೆನಾಡು, ಕರಾವಳಿ, ಹಂಪಿ, ರಾಜಸ್ಥಾನ, ಹಿಮಾಲಯ...',
                        descEn: 'Coorg, Gokarna, Hampi, Kerala, Rajasthan...',
                      },
                      {
                        key: 'international',
                        titleKn: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ',
                        titleEn: 'International',
                        descKn: 'ಜಪಾನ್, ವಿಯೆಟ್ನಾಂ, ಯುರೋಪ್, ಬಾಲೀ...',
                        descEn: 'Japan, Vietnam, Europe, Thailand...',
                      },
                      {
                        key: 'both',
                        titleKn: 'ಎರಡೂ ಆಯ್ಕೆಗಳು',
                        titleEn: 'Open to Both',
                        descKn: 'ಸಲಹೆ ಮತ್ತು ಬಜೆಟ್‌ಗೆ ತಕ್ಕಂತೆ ಆಲೋಚನೆ',
                        descEn: 'Guidance based on season and mood',
                      },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, scope: item.key as any })}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          formData.scope === item.key
                            ? 'bg-[#263F32] text-[#F6F3EA] border-[#263F32] shadow-sm'
                            : 'bg-white/80 border-[#263F32]/10 hover:border-[#263F32]/30 text-[#252923]'
                        }`}
                      >
                        <div className="font-bold text-sm mb-1">
                          {language === 'kn' ? item.titleKn : item.titleEn}
                        </div>
                        <div
                          className={`text-xs ${
                            formData.scope === item.key ? 'text-[#AAB69A]' : 'text-[#252923]/60'
                          }`}
                        >
                          {language === 'kn' ? item.descKn : item.descEn}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Destination Preference */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold font-serif-editorial text-[#263F32]">
                      {t.planner.destinationQuestion}
                    </h4>
                    <p className="text-xs text-[#252923]/70">
                      {language === 'kn'
                        ? 'ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ತಾಣಗಳನ್ನು ಆರಿಸಬಹುದು; ನಾವು ಅತ್ಯುತ್ತಮ ಮಾರ್ಗವನ್ನು ಸಂಯೋಜಿಸುತ್ತೇವೆ.'
                        : 'Select multiple stops; we craft the smoothest scenic connections between them.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {popularDestinationsList.map((dest, i) => {
                      const name = language === 'kn' ? dest.kn : dest.en;
                      const isSelected = formData.destinations.includes(name);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleToggleDestination(name)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                            isSelected
                              ? 'bg-[#263F32] text-[#F6F3EA] border-[#263F32] shadow-xs'
                              : 'bg-white/80 text-[#252923] border-[#263F32]/15 hover:border-[#263F32]/40'
                          }`}
                        >
                          {isSelected && '✓ '}
                          {name}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#263F32] mb-1.5">
                      {t.planner.destinationCustomPlaceholder}
                    </label>
                    <input
                      type="text"
                      value={formData.customDestination}
                      onChange={(e) => setFormData({ ...formData, customDestination: e.target.value })}
                      placeholder={language === 'kn' ? 'ಉದಾಹರಣೆ: ಬೇಲೂರು, ಧರ್ಮಸ್ಥಳ, ಜೋಗ, ಬಾಲೀ...' : 'e.g. Belur, Dharmasthala, Bali...'}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white/90 text-xs text-[#252923] focus:outline-none focus:ring-1 focus:ring-[#263F32]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Dates & Duration */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold font-serif-editorial text-[#263F32]">
                      {t.planner.travelMonthQuestion}
                    </h4>
                    <p className="text-xs text-[#252923]/70">
                      {language === 'kn'
                        ? 'ನಿಮ್ಮ ಪ್ರಯಾಣದ ಸಮಯ ಮತ್ತು ಲಭ್ಯತೆಯ ಅಂದಾಜು ತಿಳಿಸಿ.'
                        : 'Your preferred travel window helps us recommend weather-optimized circuits.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                    {months.map((m, i) => {
                      const mLabel = language === 'kn' ? m.kn : m.en;
                      const isSelected = formData.travelMonth === mLabel;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFormData({ ...formData, travelMonth: mLabel })}
                          className={`p-3 rounded-lg border text-xs text-center font-medium transition-colors ${
                            isSelected
                              ? 'bg-[#263F32] text-[#F6F3EA] border-[#263F32]'
                              : 'bg-white/80 text-[#252923] border-[#263F32]/15 hover:border-[#263F32]/40'
                          }`}
                        >
                          {mLabel}
                        </button>
                      );
                    })}
                  </div>

                  {/* Trip Duration Slider */}
                  <div className="pt-4 border-t border-[#263F32]/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#263F32]">
                        {t.planner.durationQuestion}
                      </span>
                      <span className="text-sm font-bold text-[#B96F50]">
                        {formData.durationDays} {t.planner.daysLabel}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={14}
                      value={formData.durationDays}
                      onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                      className="w-full accent-[#263F32] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#252923]/50">
                      <span>2 {t.planner.daysLabel} (Weekend)</span>
                      <span>7 {t.planner.daysLabel} (Week)</span>
                      <span>14 {t.planner.daysLabel} (Extended)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Travellers & Group */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold font-serif-editorial text-[#263F32]">
                      {t.planner.travellerTypeQuestion}
                    </h4>
                    <p className="text-xs text-[#252923]/70">
                      {language === 'kn'
                        ? 'ಪ್ರಯಾಣಿಕರ ಸ್ವರೂಪಕ್ಕೆ ತಕ್ಕಂತೆ ವಾಹನ ಮತ್ತು ವಾಸ್ತವ್ಯವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತದೆ.'
                        : 'Ensures appropriate vehicle sizing, elevator access, and tailored privacy.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { key: 'solo', label: t.planner.typeSolo, descKn: 'ಶಾಂತ ಏಕಾಂಗಿ ಅನ್ವೇಷಣೆ', descEn: 'Unhurried solo discovery' },
                      { key: 'couple', label: t.planner.typeCouple, descKn: 'ಏಕಾಂತ & ರೊಮ್ಯಾಂಟಿಕ್', descEn: 'Intimate & picturesque' },
                      { key: 'family', label: t.planner.typeFamily, descKn: 'ಹಿರಿಯರು & ಮಕ್ಕಳಿಗೆ ಸುಲಭ ನಡಿಗೆ', descEn: 'Spacious & senior-friendly' },
                      { key: 'friends', label: t.planner.typeFriends, descKn: 'ಸಾಹಸ & ಉತ್ಸಾಹದ ಗುಂಪು', descEn: 'Energetic group discovery' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, travellerType: item.key as any })}
                        className={`p-3.5 rounded-xl border text-left transition-colors ${
                          formData.travellerType === item.key
                            ? 'bg-[#263F32] text-[#F6F3EA] border-[#263F32]'
                            : 'bg-white/80 text-[#252923] border-[#263F32]/15 hover:border-[#263F32]/40'
                        }`}
                      >
                        <div className="text-xs font-bold mb-0.5">{item.label}</div>
                        <div
                          className={`text-[11px] ${
                            formData.travellerType === item.key ? 'text-[#AAB69A]' : 'text-[#252923]/60'
                          }`}
                        >
                          {language === 'kn' ? item.descKn : item.descEn}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Traveller count counter */}
                  <div className="pt-4 border-t border-[#263F32]/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#263F32]">
                      {t.planner.travellersQuestion}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, travellersCount: Math.max(1, formData.travellersCount - 1) })}
                        className="w-8 h-8 rounded-md bg-white border border-[#263F32]/20 font-bold text-sm text-[#263F32] hover:bg-[#263F32]/5"
                      >
                        -
                      </button>
                      <span className="text-base font-bold text-[#263F32] w-6 text-center tabular-nums">
                        {formData.travellersCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, travellersCount: Math.min(20, formData.travellersCount + 1) })}
                        className="w-8 h-8 rounded-md bg-white border border-[#263F32]/20 font-bold text-sm text-[#263F32] hover:bg-[#263F32]/5"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Travel Styles & Interests */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold font-serif-editorial text-[#263F32]">
                      {t.planner.stylesQuestion}
                    </h4>
                    <p className="text-xs text-[#252923]/70">
                      {language === 'kn'
                        ? 'ನಿಮ್ಮ ಆಸಕ್ತಿಗಳನ್ನು ಆರಿಸಿ; ನಾವು ಸೂಕ್ತ ಸ್ಥಳಗಳನ್ನು ಜೋಡಿಸುತ್ತೇವೆ.'
                        : 'Select what moves your spirit so we calibrate your stops and views.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {travelStylesList.map((st) => {
                      const label = language === 'kn' ? st.kn : st.en;
                      const isSelected = formData.styles.includes(label);
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => handleToggleStyle(label)}
                          className={`p-3 rounded-lg border text-left text-xs font-medium transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#263F32] text-[#F6F3EA] border-[#263F32]'
                              : 'bg-white/80 text-[#252923] border-[#263F32]/15 hover:border-[#263F32]/35'
                          }`}
                        >
                          <span>{label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#B96F50]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: Budget Tier & Special Requests */}
              {step === 6 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold font-serif-editorial text-[#263F32]">
                      {t.planner.budgetQuestion}
                    </h4>
                    <p className="text-xs text-[#252923]/70">
                      {language === 'kn'
                        ? 'ವಾಸ್ತವ್ಯ ಮತ್ತು ಸಾರಿಗೆಯ ಆರಾಮದಾಯಕತೆಯ ಆಯ್ಕೆ.'
                        : 'Calibration for accommodation standard and chauffeur category.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { key: 'comfort', label: t.planner.budgetComfort, descKn: 'ಸ್ವಚ್ಛ, ವಿಶ್ವಾಸಾರ್ಹ ಮತ್ತು ಮಿತವ್ಯಯದ ವಾಸ್ತವ್ಯ', descEn: 'Clean, charming homestays & comfortable cars' },
                      { key: 'premium', label: t.planner.budgetPremium, descKn: 'ಪ್ರಾಚೀನ ಎಸ್ಟೇಟ್ ಬಂಗಲೆಗಳು & ಹೆರಿಟೇಜ್ ರೆಸಾರ್ಟ್‌ಗಳು', descEn: 'Heritage plantation villas & boutique resorts' },
                      { key: 'curated_luxury', label: t.planner.budgetLuxury, descKn: 'ವಿಶೇಷ ಐಷಾರಾಮಿ ಸೂಟ್‌ಗಳು & ಖಾಸಗಿ ವಾಹನ ವ್ಯವಸ್ಥೆ', descEn: 'Signature luxury retreats & bespoke transfers' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setFormData({ ...formData, budgetTier: item.key as any })}
                        className={`p-4 rounded-xl border text-left transition-colors ${
                          formData.budgetTier === item.key
                            ? 'bg-[#263F32] text-[#F6F3EA] border-[#263F32]'
                            : 'bg-white/80 text-[#252923] border-[#263F32]/15 hover:border-[#263F32]/35'
                        }`}
                      >
                        <div className="text-xs font-bold mb-1">{item.label}</div>
                        <div
                          className={`text-[11px] ${
                            formData.budgetTier === item.key ? 'text-[#AAB69A]' : 'text-[#252923]/60'
                          }`}
                        >
                          {language === 'kn' ? item.descKn : item.descEn}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-[#263F32] mb-1.5">
                      {language === 'kn' ? 'ವಿಶೇಷ ಆಸೆಗಳು ಅಥವಾ ಆಹಾರ ಪದ್ಧತಿ:' : 'Special Dietary or Accessibility Notes:'}
                    </label>
                    <textarea
                      rows={2}
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      placeholder={t.planner.specialNotesPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white/90 text-xs text-[#252923] focus:outline-none focus:ring-1 focus:ring-[#263F32]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 7: Contact Preferences */}
              {step === 7 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h4 className="text-xl font-bold font-serif-editorial text-[#263F32]">
                      {t.planner.contactDetailsTitle}
                    </h4>
                    <p className="text-xs text-[#252923]/70">
                      {language === 'kn'
                        ? 'ರೂಪಿಸಿದ ದಿನಚರಿಯನ್ನು ನಿಮ್ಮೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲು ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ನೀಡಿ.'
                        : 'Your blueprint will be customized and sent directly via your preferred channel.'}
                    </p>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {t.planner.fullName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={language === 'kn' ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Your Full Name'}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white/90 text-xs text-[#252923] focus:outline-none focus:ring-1 focus:ring-[#263F32]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#263F32] mb-1">
                          {t.planner.phone}
                        </label>
                        <input
                          type="tel"
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white/90 text-xs text-[#252923] focus:outline-none focus:ring-1 focus:ring-[#263F32]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#263F32] mb-1">
                          {t.planner.email}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="namaskara@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white/90 text-xs text-[#252923] focus:outline-none focus:ring-1 focus:ring-[#263F32]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {t.planner.preferredChannel}
                      </label>
                      <div className="flex gap-2">
                        {[
                          { id: 'whatsapp', label: 'WhatsApp' },
                          { id: 'phone', label: language === 'kn' ? 'ದೂರವಾಣಿ ಕರೆ' : 'Phone Call' },
                          { id: 'email', label: 'Email' },
                        ].map((ch) => (
                          <button
                            key={ch.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, preferredChannel: ch.id as any })}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                              formData.preferredChannel === ch.id
                                ? 'bg-[#263F32] text-[#F6F3EA] border-[#263F32]'
                                : 'bg-white text-[#252923] border-[#263F32]/20 hover:border-[#263F32]/40'
                            }`}
                          >
                            {ch.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: Review & Travel Blueprint Presentation */}
              {step === 8 && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#B96F50] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.planner.reviewTitle}</span>
                    </div>
                    <h4 className="text-xl font-bold font-serif-editorial text-[#263F32]">
                      {formData.fullName
                        ? `${formData.fullName} ಅವರ ಕಸ್ಟಮ್ ಪ್ರವಾಸ ನಕ್ಷೆ`
                        : (language === 'kn' ? 'ನಿಮ್ಮ ಪ್ರವಾಸ ರೂಪರೇಷೆ ಸಿದ್ಧವಾಗಿದೆ' : 'Your Journey Blueprint')}
                    </h4>
                    <p className="text-xs text-[#252923]/70">{t.planner.reviewSub}</p>
                  </div>

                  {/* Blueprint Card */}
                  <div className="p-5 rounded-xl bg-white/95 border border-[#263F32]/15 shadow-sm space-y-3.5 text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-3 border-b border-[#263F32]/10">
                      <div>
                        <span className="block text-[#252923]/50 text-[10px]">{language === 'kn' ? 'ವ್ಯಾಪ್ತಿ' : 'Scope'}</span>
                        <span className="font-bold text-[#263F32] uppercase">{formData.scope}</span>
                      </div>
                      <div>
                        <span className="block text-[#252923]/50 text-[10px]">{language === 'kn' ? 'ಅವಧಿ' : 'Duration'}</span>
                        <span className="font-bold text-[#263F32]">{formData.durationDays} {language === 'kn' ? 'ದಿನಗಳು' : 'Days'}</span>
                      </div>
                      <div>
                        <span className="block text-[#252923]/50 text-[10px]">{language === 'kn' ? 'ಪ್ರಯಾಣಿಕರು' : 'Group'}</span>
                        <span className="font-bold text-[#263F32]">{formData.travellersCount} ({formData.travellerType})</span>
                      </div>
                      <div>
                        <span className="block text-[#252923]/50 text-[10px]">{language === 'kn' ? 'ಬಜೆಟ್' : 'Tier'}</span>
                        <span className="font-bold text-[#263F32] capitalize">{formData.budgetTier}</span>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[#252923]/50 text-[10px] mb-1">
                        {language === 'kn' ? 'ಆಯ್ಕೆಯ ತಾಣಗಳು' : 'Target Destinations'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          ...formData.destinations,
                          formData.customDestination.trim() ? formData.customDestination.trim() : null,
                        ]
                          .filter(Boolean)
                          .map((d, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-[#E4D8C5]/60 text-[#263F32] font-semibold text-[11px]">
                              {d}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div>
                      <span className="block text-[#252923]/50 text-[10px] mb-1">
                        {language === 'kn' ? 'ಅನುಭವ ಶೈಲಿಗಳು' : 'Preferred Travel Styles'}
                      </span>
                      <span className="text-[#252923]/80">
                        {formData.styles.join(' · ') || 'General Discovery'}
                      </span>
                    </div>

                    {formData.specialNotes && (
                      <div className="pt-2 border-t border-[#263F32]/10">
                        <span className="block text-[#252923]/50 text-[10px]">
                          {language === 'kn' ? 'ವಿಶೇಷ ಸೂಚನೆಗಳು' : 'Special Notes'}
                        </span>
                        <span className="text-[#252923]/80 italic">{formData.specialNotes}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions on Review */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="px-4 py-2.5 rounded-md bg-[#263F32] text-[#F6F3EA] hover:bg-[#1f3328] text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
                    >
                      {copied ? <CheckCheck className="w-3.5 h-3.5 text-[#AAB69A]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? t.planner.copied : t.planner.copySummary}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleOpenWhatsAppSample}
                      className="px-4 py-2.5 rounded-md bg-[#25D366]/90 text-white hover:bg-[#25D366] text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{t.planner.openWhatsapp}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-3 py-2.5 rounded-md border border-[#263F32]/20 text-xs font-medium text-[#252923]/70 hover:bg-[#263F32]/5 transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{t.planner.resetForm}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="mt-4 p-2.5 rounded-md bg-[#B96F50]/15 border border-[#B96F50]/30 text-xs text-[#B96F50] font-medium">
                {validationError}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-6 mt-6 border-t border-[#263F32]/10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-md border border-[#263F32]/20 text-xs font-medium text-[#252923] hover:bg-[#263F32]/5 flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.planner.prev}</span>
                </button>
              ) : (
                <div />
              )}

              {step < 8 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-md bg-[#263F32] text-[#F6F3EA] hover:bg-[#1f3328] text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
                >
                  <span>{step === 7 ? t.planner.finish : t.planner.next}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B96F50]" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-md border border-[#263F32]/20 text-xs font-semibold text-[#263F32] hover:bg-[#263F32]/10 transition-colors"
                >
                  {t.modal.close}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </AnimatePresence>
  );
};
