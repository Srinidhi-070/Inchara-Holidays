import React, { useState, useEffect, useRef } from 'react';
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
import { Mark } from './Header';

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
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<TripPlanningFormData>(() => {
    return {
      ...initialForm,
      destinations: initialDestination ? [initialDestination] : [],
      styles: initialExperience ? [initialExperience] : initialForm.styles,
    };
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  const t = translations[language];
  const kn = language === 'kn';

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
          kn
            ? 'ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ಒಂದು ತಾಣವನ್ನು ಆರಿಸಿ ಅಥವಾ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.'
            : 'Please select at least one destination or enter your desired location.'
        );
        return false;
      }
    }
    if (currentStep === 7) {
      if (!formData.fullName.trim()) {
        setValidationError(
          kn ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.' : 'Please provide your full name.'
        );
        return false;
      }
      if (!formData.contactNumber.trim() && !formData.email.trim()) {
        setValidationError(
          kn
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
      setDirection(1);
      setStep((prev) => Math.min(prev + 1, 8));
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setValidationError('');
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateBriefSummaryText = (): string => {
    const selectedDests = [
      ...formData.destinations,
      formData.customDestination.trim() ? formData.customDestination.trim() : null,
    ]
      .filter(Boolean)
      .join(', ');

    return `*${kn ? 'ಇಂಚರ ಹಾಲಿಡೇಸ್ ಪ್ರವಾಸ ರೂಪರೇಷೆ' : 'Inchara Holidays Travel Brief'}*
----------------------------------------
• ${kn ? 'ಪ್ರಯಾಣಿಕರ ಹೆಸರು' : 'Guest'}: ${formData.fullName || (kn ? 'ಹೆಸರು ಇಲ್ಲ' : 'Traveller')}
• ${kn ? 'ವ್ಯಾಪ್ತಿ' : 'Scope'}: ${formData.scope.toUpperCase()}
• ${kn ? 'ಆಯ್ಕೆಯ ತಾಣಗಳು' : 'Destinations'}: ${selectedDests || (kn ? 'ಸಮಾಲೋಚನೆಗೆ ಮುಕ್ತ' : 'Open to suggestions')}
• ${kn ? 'ಅವಧಿ' : 'Duration'}: ${formData.durationDays} ${kn ? 'ದಿನಗಳು' : 'Days'} (${formData.travelMonth})
• ${kn ? 'ಹೊಂದಾಣಿಕೆ' : 'Flexibility'}: ${formData.flexibility}
• ${kn ? 'ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ' : 'Travellers'}: ${formData.travellersCount} (${formData.travellerType})
• ${kn ? 'ಬಜೆಟ್ ಹಂತ' : 'Comfort Tier'}: ${formData.budgetTier}
• ${kn ? 'ಆಸಕ್ತಿ ಶೈಲಿಗಳು' : 'Styles'}: ${formData.styles.join(', ')}
• ${kn ? 'ವಿಶೇಷ ಕೋರಿಕೆ' : 'Notes'}: ${formData.specialNotes || 'None'}
• ${kn ? 'ಸಂಪರ್ಕ' : 'Contact'}: ${formData.contactNumber || formData.email} (${formData.preferredChannel})
----------------------------------------
Generated via Inchara Holidays Studio`;
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
    const url = `https://wa.me/919900000000?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReset = () => {
    setFormData(initialForm);
    setDirection(-1);
    setStep(1);
    setValidationError('');
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 32 : -32,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.32,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -32 : 32,
      opacity: 0,
      transition: {
        duration: 0.22,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
        {/* Dark backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-[#07140d]/80 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />

        {/* Modal / Sheet Container: Square architectural drawer sliding in from right */}
        <div className="fixed inset-0 flex justify-end pointer-events-none">
          <motion.div
            initial={{ x: '100%', opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-auto relative w-full h-full lg:w-[620px] xl:w-[680px] bg-[#fbf8f1] rounded-none shadow-2xl overflow-hidden border-l border-[#d4af37]/35 text-[#17261e] flex flex-col"
          >
            {/* Top Kasavu gold hairline */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#d4af37] via-[#f5d77f] to-[#9e3d28]" />

            {/* Editorial Header in Deep Sacred Green */}
            <div className="px-6 py-5 bg-[#162e22] text-white flex items-center justify-between shrink-0 border-b border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-3.5 relative z-10">
                <Mark />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#f5d77f]">
                      {kn ? 'ಇಂಚರ ಪ್ರವಾಸ ಸ್ಟುಡಿಯೋ' : 'INCHARA TRAVEL STUDIO'}
                    </span>
                  </div>
                  <h3 className="font-normal font-serif text-xl sm:text-2xl text-white tracking-tight leading-tight">
                    {kn ? 'ನಿಮ್ಮ ಪ್ರಯಾಣ ರೂಪಿಸಿ' : 'Plan Your Journey'}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-none border border-white/20 hover:border-white/50 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer z-50 pointer-events-auto bg-white/5 hover:bg-white/10"
                aria-label={t.modal.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Editorial Progress Bar */}
            <div className="px-6 py-4 bg-[#f6f3ea] border-b border-[#c9c5b9]/50 shrink-0">
              <div className="planner-progress !py-0 !border-0">
                <span className="text-[#9e3d28] font-bold">
                  {kn ? `ಹಂತ ೦${step} / ೦೮` : `STEP 0${step} OF 08`}
                </span>
                <div className="h-[2px] bg-[#ddd8ca] relative overflow-hidden">
                  <motion.i
                    className="block h-full bg-[#9e3d28]"
                    initial={false}
                    animate={{ width: `${(step / 8) * 100}%` }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <AnimatePresence mode="wait">
                  <motion.b
                    key={step}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-serif text-[#9e3d28] text-2xl font-normal block"
                  >
                    0{step}
                  </motion.b>
                </AnimatePresence>
              </div>
            </div>

            {/* Step Form Body: Smooth Scroll Container with luxury hairline scrollbar */}
            <div
              ref={contentRef}
              className="p-6 sm:p-8 flex-1 overflow-y-auto modal-scroll-pane flex flex-col justify-between relative bg-[#fbf8f1]"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* STEP 1: Travel Scope */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#9e3d28]">
                          ✦ {kn ? 'ಹಂತ ೦೧' : 'STARTING POINT'}
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-normal font-serif text-[#162e22] tracking-tight">
                          {t.planner.scopeQuestion}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#5b675f] leading-relaxed">
                          {kn
                            ? 'ಕರ್ನಾಟಕದ ಸುಂದರ ಮಲೆನಾಡು, ಕರಾವಳಿ, ಭಾರತದ ಪಯಣ ಅಥವಾ ವಿದೇಶದ ಸಾಹಸ.'
                            : 'Explore local Karnataka sanctuaries, grand Indian circuits, or global frontiers.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3 pt-2">
                        {[
                          {
                            key: 'domestic',
                            sub: 'ಕರ್ನಾಟಕ & ಭಾರತ',
                            title: kn ? 'ಕರ್ನಾಟಕ & ಭಾರತ' : 'Karnataka & India',
                            desc: kn
                              ? 'ಮಲೆನಾಡು, ಕರಾವಳಿ, ಹಂಪಿ, ರಾಜಸ್ಥಾನ, ಹಿಮಾಲಯ...'
                              : 'Coorg, Gokarna, Hampi, Kerala, Rajasthan...',
                          },
                          {
                            key: 'international',
                            sub: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ',
                            title: kn ? 'ಅಂತರರಾಷ್ಟ್ರೀಯ' : 'International',
                            desc: kn
                              ? 'ಜಪಾನ್, ವಿಯೆಟ್ನಾಂ, ಬಾಲೀ, ಯುರೋಪ್...'
                              : 'Japan, Vietnam, Bali, Thailand, Europe...',
                          },
                          {
                            key: 'both',
                            sub: 'ಎರಡೂ ಆಯ್ಕೆಗಳು',
                            title: kn ? 'ಎರಡೂ ಆಯ್ಕೆಗಳು' : 'Open to Both',
                            desc: kn
                              ? 'ಋತುಮಾನ ಮತ್ತು ಬಜೆಟ್‌ಗೆ ತಕ್ಕಂತೆ ಸೂಕ್ತ ಶಿಫಾರಸು'
                              : 'Bespoke recommendations tailored to your season and pace',
                          },
                        ].map((item) => {
                          const isSelected = formData.scope === item.key;
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => setFormData({ ...formData, scope: item.key as any })}
                              className={`p-4 rounded-none border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[#263f32] !text-[#f6f3ea] border-[#263f32] shadow-md -translate-y-0.5'
                                  : 'bg-[#fffdf7] border-[#c9c5b9] hover:border-[#263f32] hover:bg-[#faf7ee] text-[#17261e]'
                              }`}
                            >
                              <div>
                                <div className="font-serif text-lg font-medium mb-0.5">
                                  {item.title}
                                </div>
                                <div
                                  className={`text-xs ${
                                    isSelected ? 'text-[#f5d77f]' : 'text-[#647068]'
                                  }`}
                                >
                                  {item.desc}
                                </div>
                              </div>
                              <span
                                className={`w-6 h-6 rounded-none border flex items-center justify-center shrink-0 ml-3 text-xs transition-colors duration-200 ${
                                  isSelected
                                    ? 'border-[#f5d77f] text-[#f5d77f] bg-white/10'
                                    : 'border-[#c9c5b9] text-transparent'
                                }`}
                              >
                                ✓
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Destination Preference */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#9e3d28]">
                          ✦ {kn ? 'ಹಂತ ೦೨' : 'TARGET DESTINATIONS'}
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-normal font-serif text-[#162e22] tracking-tight">
                          {t.planner.destinationQuestion}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#5b675f] leading-relaxed">
                          {kn
                            ? 'ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ತಾಣಗಳನ್ನು ಆರಿಸಬಹುದು; ನಾವು ಅತ್ಯುತ್ತಮ ಮಾರ್ಗವನ್ನು ಸಂಯೋಜಿಸುತ್ತೇವೆ.'
                            : 'Select multiple stops; we craft the smoothest scenic connections between them.'}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {popularDestinationsList.map((dest, i) => {
                          const name = kn ? dest.kn : dest.en;
                          const isSelected = formData.destinations.includes(name);
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleToggleDestination(name)}
                              className={`px-3.5 py-2.5 rounded-none text-xs font-medium border transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#263f32] !text-[#f6f3ea] border-[#263f32] shadow-sm -translate-y-0.5'
                                  : 'bg-[#fffdf7] text-[#17261e] border-[#c9c5b9] hover:border-[#263f32] hover:bg-[#faf7ee]'
                              }`}
                            >
                              {isSelected ? '✓ ' : '+ '}
                              {name}
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-3">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b675f] mb-1.5">
                          {t.planner.destinationCustomPlaceholder}
                        </label>
                        <input
                          type="text"
                          value={formData.customDestination}
                          onChange={(e) => setFormData({ ...formData, customDestination: e.target.value })}
                          placeholder={kn ? 'ಉದಾಹರಣೆ: ಬೇಲೂರು, ಧರ್ಮಸ್ಥಳ, ಜೋಗ, ಬಾಲೀ...' : 'e.g. Belur, Dharmasthala, Bali...'}
                          className="w-full px-4 py-3 rounded-none border border-[#c9c5b9] bg-[#fffdf7] text-xs text-[#17261e] focus:outline-none focus:border-[#263f32] transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Dates & Duration */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#9e3d28]">
                          ✦ {kn ? 'ಹಂತ ೦೩' : 'DATES & DURATION'}
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-normal font-serif text-[#162e22] tracking-tight">
                          {t.planner.travelMonthQuestion}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#5b675f] leading-relaxed">
                          {kn
                            ? 'ನಿಮ್ಮ ಪ್ರಯಾಣದ ಸಮಯ ಮತ್ತು ಲಭ್ಯತೆಯ ಅಂದಾಜು ತಿಳಿಸಿ.'
                            : 'Your preferred travel window helps us recommend weather-optimized circuits.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                        {months.map((m, i) => {
                          const mLabel = kn ? m.kn : m.en;
                          const isSelected = formData.travelMonth === mLabel;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setFormData({ ...formData, travelMonth: mLabel })}
                              className={`p-3.5 rounded-none border text-xs text-center font-medium transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#263f32] !text-[#f6f3ea] border-[#263f32] shadow-sm -translate-y-0.5'
                                  : 'bg-[#fffdf7] text-[#17261e] border-[#c9c5b9] hover:border-[#263f32] hover:bg-[#faf7ee]'
                              }`}
                            >
                              {mLabel}
                            </button>
                          );
                        })}
                      </div>

                      {/* Trip Duration Slider */}
                      <div className="pt-5 border-t border-[#c9c5b9]/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#5b675f]">
                            {t.planner.durationQuestion}
                          </span>
                          <span className="font-serif text-xl font-normal text-[#9e3d28]">
                            {formData.durationDays} {t.planner.daysLabel}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={14}
                          value={formData.durationDays}
                          onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                          className="w-full accent-[#9e3d28] cursor-pointer"
                        />
                        <div className="flex justify-between text-[11px] text-[#647068]">
                          <span>2 {t.planner.daysLabel} (Weekend)</span>
                          <span>7 {t.planner.daysLabel} (Week)</span>
                          <span>14 {t.planner.daysLabel} (Extended)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Travellers & Group */}
                  {step === 4 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#9e3d28]">
                          ✦ {kn ? 'ಹಂತ ೦೪' : 'TRAVELLERS & PARTY'}
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-normal font-serif text-[#162e22] tracking-tight">
                          {t.planner.travellerTypeQuestion}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#5b675f] leading-relaxed">
                          {kn
                            ? 'ಪ್ರಯಾಣಿಕರ ಸ್ವರೂಪಕ್ಕೆ ತಕ್ಕಂತೆ ವಾಹನ ಮತ್ತು ವಾಸ್ತವ್ಯವನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತದೆ.'
                            : 'Ensures appropriate vehicle sizing, elevator access, and tailored privacy.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {[
                          { key: 'solo', label: t.planner.typeSolo, desc: kn ? 'ಶಾಂತ ಏಕಾಂಗಿ ಅನ್ವೇಷಣೆ' : 'Unhurried solo discovery' },
                          { key: 'couple', label: t.planner.typeCouple, desc: kn ? 'ಏಕಾಂತ & ರೊಮ್ಯಾಂಟಿಕ್' : 'Intimate & picturesque' },
                          { key: 'family', label: t.planner.typeFamily, desc: kn ? 'ಹಿರಿಯರು & ಮಕ್ಕಳಿಗೆ ಸುಲಭ ನಡಿಗೆ' : 'Spacious & senior-friendly' },
                          { key: 'friends', label: t.planner.typeFriends, desc: kn ? 'ಸಾಹಸ & ಉತ್ಸಾಹದ ಗುಂಪು' : 'Energetic group discovery' },
                        ].map((item) => {
                          const isSelected = formData.travellerType === item.key;
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => setFormData({ ...formData, travellerType: item.key as any })}
                              className={`p-4 rounded-none border text-left transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#263f32] !text-[#f6f3ea] border-[#263f32] shadow-sm -translate-y-0.5'
                                  : 'bg-[#fffdf7] text-[#17261e] border-[#c9c5b9] hover:border-[#263f32] hover:bg-[#faf7ee]'
                              }`}
                            >
                              <div className="font-serif text-base font-medium mb-1">{item.label}</div>
                              <div
                                className={`text-[11px] ${
                                  isSelected ? 'text-[#f5d77f]' : 'text-[#647068]'
                                }`}
                              >
                                {item.desc}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Traveller count counter */}
                      <div className="pt-5 border-t border-[#c9c5b9]/50 flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#5b675f]">
                          {t.planner.travellersQuestion}
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, travellersCount: Math.max(1, formData.travellersCount - 1) })}
                            className="w-9 h-9 rounded-none bg-[#fffdf7] border border-[#c9c5b9] font-bold text-base text-[#162e22] hover:border-[#162e22] transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-serif text-xl font-normal text-[#162e22] w-8 text-center tabular-nums">
                            {formData.travellersCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, travellersCount: Math.min(20, formData.travellersCount + 1) })}
                            className="w-9 h-9 rounded-none bg-[#fffdf7] border border-[#c9c5b9] font-bold text-base text-[#162e22] hover:border-[#162e22] transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Travel Styles & Interests */}
                  {step === 5 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#9e3d28]">
                          ✦ {kn ? 'ಹಂತ ೦೫' : 'TRAVEL STYLES'}
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-normal font-serif text-[#162e22] tracking-tight">
                          {t.planner.stylesQuestion}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#5b675f] leading-relaxed">
                          {kn
                            ? 'ನಿಮ್ಮ ಆಸಕ್ತಿಗಳನ್ನು ಆರಿಸಿ; ನಾವು ಸೂಕ್ತ ಸ್ಥಳಗಳನ್ನು ಜೋಡಿಸುತ್ತೇವೆ.'
                            : 'Select what moves your spirit so we calibrate your stops and views.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {travelStylesList.map((st) => {
                          const label = kn ? st.kn : st.en;
                          const isSelected = formData.styles.includes(label);
                          return (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => handleToggleStyle(label)}
                              className={`p-3.5 rounded-none border text-left text-xs font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-[#263f32] !text-[#f6f3ea] border-[#263f32] shadow-sm -translate-y-0.5'
                                  : 'bg-[#fffdf7] text-[#17261e] border-[#c9c5b9] hover:border-[#263f32] hover:bg-[#faf7ee]'
                              }`}
                            >
                              <span>{label}</span>
                              {isSelected && <Check className="w-4 h-4 text-[#f5d77f]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 6: Budget Tier & Special Requests */}
                  {step === 6 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#9e3d28]">
                          ✦ {kn ? 'ಹಂತ ೦೬' : 'COMFORT & REQUESTS'}
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-normal font-serif text-[#162e22] tracking-tight">
                          {t.planner.budgetQuestion}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#5b675f] leading-relaxed">
                          {kn
                            ? 'ವಾಸ್ತವ್ಯ ಮತ್ತು ಸಾರಿಗೆಯ ಆರಾಮದಾಯಕತೆಯ ಆಯ್ಕೆ.'
                            : 'Calibration for accommodation standard and chauffeur category.'}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        {[
                          { key: 'comfort', label: t.planner.budgetComfort, desc: kn ? 'ಸ್ವಚ್ಛ, ವಿಶ್ವಾಸಾರ್ಹ ವಾಸ್ತವ್ಯ' : 'Clean, charming homestays & comfortable cars' },
                          { key: 'premium', label: t.planner.budgetPremium, desc: kn ? 'ಎಸ್ಟೇಟ್ ಬಂಗಲೆಗಳು & ರೆಸಾರ್ಟ್‌ಗಳು' : 'Heritage plantation villas & boutique resorts' },
                          { key: 'curated_luxury', label: t.planner.budgetLuxury, desc: kn ? 'ಐಷಾರಾಮಿ ಸೂಟ್‌ಗಳು & ಖಾಸಗಿ ವಾಹನ' : 'Signature luxury retreats & bespoke transfers' },
                        ].map((item) => {
                          const isSelected = formData.budgetTier === item.key;
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => setFormData({ ...formData, budgetTier: item.key as any })}
                              className={`p-4 rounded-none border text-left transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#263f32] !text-[#f6f3ea] border-[#263f32] shadow-sm -translate-y-0.5'
                                  : 'bg-[#fffdf7] text-[#17261e] border-[#c9c5b9] hover:border-[#263f32] hover:bg-[#faf7ee]'
                              }`}
                            >
                              <div className="font-serif text-base font-medium mb-1">{item.label}</div>
                              <div
                                className={`text-[11px] ${
                                  isSelected ? 'text-[#f5d77f]' : 'text-[#647068]'
                                }`}
                              >
                                {item.desc}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-3">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b675f] mb-1.5">
                          {kn ? 'ವಿಶೇಷ ಆಸೆಗಳು ಅಥವಾ ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಆಹಾರ ಪದ್ಧತಿ:' : 'Special Dietary (100% Pure Veg) or Accessibility Notes:'}
                        </label>
                        <textarea
                          rows={2}
                          value={formData.specialNotes}
                          onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                          placeholder={t.planner.specialNotesPlaceholder}
                          className="w-full px-4 py-3 rounded-none border border-[#c9c5b9] bg-[#fffdf7] text-xs text-[#17261e] focus:outline-none focus:border-[#263f32] transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 7: Contact Preferences */}
                  {step === 7 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#9e3d28]">
                          ✦ {kn ? 'ಹಂತ ೦೭' : 'CONTACT PREFERENCES'}
                        </p>
                        <h4 className="text-2xl sm:text-3xl font-normal font-serif text-[#162e22] tracking-tight">
                          {t.planner.contactDetailsTitle}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#5b675f] leading-relaxed">
                          {kn
                            ? 'ರೂಪಿಸಿದ ದಿನಚರಿಯನ್ನು ನಿಮ್ಮೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲು ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ನೀಡಿ.'
                            : 'Your blueprint will be customized and sent directly via your preferred channel.'}
                        </p>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b675f] mb-1">
                            {t.planner.fullName} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder={kn ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Your Full Name'}
                            className="w-full px-4 py-3 rounded-none border border-[#c9c5b9] bg-[#fffdf7] text-xs text-[#17261e] focus:outline-none focus:border-[#263f32] transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b675f] mb-1">
                              {t.planner.phone}
                            </label>
                            <input
                              type="tel"
                              value={formData.contactNumber}
                              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                              placeholder="+91 98765 43210"
                              className="w-full px-4 py-3 rounded-none border border-[#c9c5b9] bg-[#fffdf7] text-xs text-[#17261e] focus:outline-none focus:border-[#263f32] transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b675f] mb-1">
                              {t.planner.email}
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="namaskara@example.com"
                              className="w-full px-4 py-3 rounded-none border border-[#c9c5b9] bg-[#fffdf7] text-xs text-[#17261e] focus:outline-none focus:border-[#263f32] transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b675f] mb-2">
                            {t.planner.preferredChannel}
                          </label>
                          <div className="flex gap-2">
                            {[
                              { id: 'whatsapp', label: 'WhatsApp' },
                              { id: 'phone', label: kn ? 'ದೂರವಾಣಿ ಕರೆ' : 'Phone Call' },
                              { id: 'email', label: 'Email' },
                            ].map((ch) => {
                              const isSelected = formData.preferredChannel === ch.id;
                              return (
                                <button
                                  key={ch.id}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, preferredChannel: ch.id as any })}
                                  className={`px-4 py-2 rounded-none text-xs font-medium border transition-all duration-200 cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#263f32] !text-[#f6f3ea] border-[#263f32] shadow-sm'
                                      : 'bg-[#fffdf7] text-[#17261e] border-[#c9c5b9] hover:border-[#263f32] hover:bg-[#faf7ee]'
                                  }`}
                                >
                                  {ch.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 8: Review & Travel Blueprint Presentation */}
                  {step === 8 && (
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#9e3d28] uppercase tracking-wider">
                          <span>✦</span>
                          <span>{t.planner.reviewTitle}</span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-normal font-serif text-[#162e22] tracking-tight">
                          {formData.fullName
                            ? `${formData.fullName} ಅವರ ಪ್ರವಾಸ ನಕ್ಷೆ`
                            : (kn ? 'ನಿಮ್ಮ ಪ್ರವಾಸ ರೂಪರೇಷೆ ಸಿದ್ಧವಾಗಿದೆ' : 'Your Journey Blueprint')}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#5b675f]">{t.planner.reviewSub}</p>
                      </div>

                      {/* Blueprint Card */}
                      <div className="p-5 sm:p-6 rounded-none bg-[#fffdf7] border border-[#c9c5b9] shadow-sm space-y-4 text-xs">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-3 border-b border-[#c9c5b9]/50">
                          <div>
                            <span className="block text-[#647068] text-[10px] uppercase tracking-wider">{kn ? 'ವ್ಯಾಪ್ತಿ' : 'Scope'}</span>
                            <span className="font-serif text-base text-[#162e22]">{formData.scope.toUpperCase()}</span>
                          </div>
                          <div>
                            <span className="block text-[#647068] text-[10px] uppercase tracking-wider">{kn ? 'ಅವಧಿ' : 'Duration'}</span>
                            <span className="font-serif text-base text-[#162e22]">{formData.durationDays} {kn ? 'ದಿನಗಳು' : 'Days'}</span>
                          </div>
                          <div>
                            <span className="block text-[#647068] text-[10px] uppercase tracking-wider">{kn ? 'ಪ್ರಯಾಣಿಕರು' : 'Group'}</span>
                            <span className="font-serif text-base text-[#162e22]">{formData.travellersCount} ({formData.travellerType})</span>
                          </div>
                          <div>
                            <span className="block text-[#647068] text-[10px] uppercase tracking-wider">{kn ? 'ಬಜೆಟ್' : 'Tier'}</span>
                            <span className="font-serif text-base text-[#162e22] capitalize">{formData.budgetTier}</span>
                          </div>
                        </div>

                        <div>
                          <span className="block text-[#647068] text-[10px] uppercase tracking-wider mb-1.5">
                            {kn ? 'ಆಯ್ಕೆಯ ತಾಣಗಳು' : 'Target Destinations'}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              ...formData.destinations,
                              formData.customDestination.trim() ? formData.customDestination.trim() : null,
                            ]
                              .filter(Boolean)
                              .map((d, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-none bg-[#263f32]/8 text-[#162e22] font-semibold text-[11px] border border-[#263f32]/10">
                                  {d}
                                </span>
                              ))}
                          </div>
                        </div>

                        <div>
                          <span className="block text-[#647068] text-[10px] uppercase tracking-wider mb-1">
                            {kn ? 'ಅನುಭವ ಶೈಲಿಗಳು' : 'Preferred Travel Styles'}
                          </span>
                          <span className="text-[#17261e] font-serif text-sm">
                            {formData.styles.join(' · ') || 'General Discovery'}
                          </span>
                        </div>

                        {formData.specialNotes && (
                          <div className="pt-3 border-t border-[#c9c5b9]/50">
                            <span className="block text-[#647068] text-[10px] uppercase tracking-wider">
                              {kn ? 'ವಿಶೇಷ ಸೂಚನೆಗಳು' : 'Special Notes'}
                            </span>
                            <span className="text-[#5b675f] italic">{formData.specialNotes}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions on Review */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleOpenWhatsAppSample}
                          className="button button-gold !rounded-none !min-h-[2.75rem] !px-4"
                        >
                          <MessageCircle className="w-4 h-4 text-[#162e22]" />
                          <span>{t.planner.openWhatsapp}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleCopySummary}
                          className="button button-outline !rounded-none !text-[#162e22] !border-[#c9c5b9] hover:!bg-[#162e22] hover:!text-white !min-h-[2.75rem] !px-4"
                        >
                          {copied ? <CheckCheck className="w-4 h-4 text-[#9e3d28]" /> : <Copy className="w-4 h-4" />}
                          <span>{copied ? t.planner.copied : t.planner.copySummary}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="button button-text !rounded-none !text-[#5b675f] hover:!text-[#162e22] !min-h-[2.75rem] !px-2"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>{t.planner.resetForm}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Validation Error Banner */}
              {validationError && (
                <div className="mt-4 p-3 rounded-none bg-[#9e3d28]/10 border border-[#9e3d28]/30 text-xs text-[#9e3d28] font-medium">
                  {validationError}
                </div>
              )}

              {/* Navigation Bottom Action Bar */}
              <div className="pt-6 mt-8 border-t border-[#c9c5b9]/60 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="button button-outline !rounded-none !text-[#162e22] !border-[#c9c5b9] hover:!bg-[#162e22] hover:!text-white !min-h-[2.75rem] !px-4"
                  >
                    <span>← {t.planner.prev}</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 8 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="button button-dark !rounded-none !min-h-[2.75rem] !px-5"
                  >
                    <span>{step === 7 ? t.planner.finish : t.planner.next}</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onClose}
                    className="button button-outline !rounded-none !text-[#162e22] !border-[#c9c5b9] hover:!bg-[#162e22] hover:!text-white !min-h-[2.75rem] !px-5"
                  >
                    <span>{t.modal.close}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
};
