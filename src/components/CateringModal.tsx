import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UtensilsCrossed, CheckCircle2, Copy, Send, PhoneCall } from 'lucide-react';
import { Language, CateringInquiryData } from '../types';
import { Mark } from './Header';

interface CateringModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const CateringModal: React.FC<CateringModalProps> = ({
  isOpen,
  language,
  onClose,
}) => {
  const isKn = language === 'kn';

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

  const [formData, setFormData] = useState<CateringInquiryData>({
    fullName: '',
    phone: '',
    email: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '50 - 100',
    occasionType: 'Family Celebration / Function',
    mealTypes: ['Lunch (ಮಧ್ಯಾಹ್ನದ ಊಟ)'],
    dietaryPreference: 'Pure Vegetarian (ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ)',
    serviceStyle: 'Buffet Setup (ಬಫೆ ವ್ಯವಸ್ಥೆ)',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const occasionOptionsKn = [
    'ಕುಟುಂಬದ ಶುಭಕಾರ್ಯ & ಸಮಾರಂಭ (Family Function & Celebration)',
    'ಕಾರ್ಪೊರೇಟ್ ಸಭೆ & ಕಾನ್ಫರೆನ್ಸ್ (Corporate Meeting & Event)',
    'ಶಾಲಾ / ಕಾಲೇಜು ಕಾರ್ಯಕ್ರಮ (School or College Gathering)',
    'ಪ್ರವಾಸದ ಹಾದಿಯಲ್ಲಿ ಊಟೋಪಚಾರ (Group Travel Transit Meal)',
    'ಆಪ್ತ ಗೃಹಕೂಟ / ಪೂಜೆ (Intimate Home Gathering / Pooja)',
  ];

  const occasionOptionsEn = [
    'Family Function & Milestone Celebration',
    'Corporate Meeting & Team Gathering',
    'School or College Event',
    'Group Travel Transit Meals',
    'Intimate Home Gathering or Pooja',
  ];

  const guestCountOptions = ['25 - 50', '50 - 100', '100 - 250', '250 - 500', '500+'];

  const mealTypeOptionsKn = [
    'ಬೆಳಗಿನ ಉಪಹಾರ (Breakfast)',
    'ಮಧ್ಯಾಹ್ನದ ಸಾಂಪ್ರದಾಯಿಕ ಊಟ (Traditional Lunch)',
    'ಸಂಜೆಯ ಕಾಫಿ & ತಿಂಡಿ (Hi-Tea & Snacks)',
    'ರಾತ್ರಿಯ ಭೋಜನ (Dinner Banquet)',
    'ಪ್ರವಾಸದ ಬಾಕ್ಸ್ ಮೀಲ್ಸ್ (Packed Travel Meals)',
    'ಬಾಳೆ ಎಲೆ ಸಮಾರಾಧನೆ ಊಟ (Plantain Leaf Feast)',
  ];

  const mealTypeOptionsEn = [
    'Morning Breakfast',
    'Traditional Lunch',
    'Hi-Tea & Snacks',
    'Dinner Banquet',
    'Packed Travel Meals',
    'Plantain Leaf Traditional Feast',
  ];

  const dietaryOptionsKn = [
    'ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ (100% Pure Vegetarian)',
    'ಜೈನ ಆಹಾರ (Jain Vegetarian / No Onion Garlic)',
    'ಶುದ್ಧ ಸಾತ್ವಿಕ ಸಸ್ಯಾಹಾರಿ (Satvic Vegetarian)',
    'ವಿಶೇಷ ಮಲೆನಾಡು & ಕರಾವಳಿ ಸಸ್ಯಾಹಾರಿ ರುಚಿಗಳು (Regional Karnataka Pure Veg)',
  ];

  const dietaryOptionsEn = [
    '100% Pure Vegetarian',
    'Jain Vegetarian (No Onion / Garlic)',
    'Satvic Traditional Vegetarian',
    'Regional Karnataka Pure Veg Specialties',
  ];

  const serviceStyleOptionsKn = [
    'ಅಚ್ಚುಕಟ್ಟಾದ ಬಫೆ ಕೌಂಟರ್ (Modern Buffet Setup)',
    'ಸಾಂಪ್ರದಾಯಿಕ ಪಂಕ್ತಿ ಸೇವೆ / ಬಾಳೆ ಎಲೆ (Traditional Seated Table Service)',
    'ಲೈವ್ ಕೌಂಟರ್‌ಗಳು - ದೋಸೆ, ಕಾಫಿ, ಚಾಟ್ (Live Counters)',
    'ಪರಿಸರಸ್ನೇಹಿ ಪ್ಯಾಕ್ಡ್ ಮೀಲ್ಸ್ (Eco-friendly Boxed Meals)',
  ];

  const serviceStyleOptionsEn = [
    'Modern Buffet Setup with Warmers',
    'Traditional Seated Plantain Leaf Table Service',
    'Live Counters (Dosa, Filter Coffee, Chaat)',
    'Eco-friendly Boxed Meals for Transit',
  ];

  const toggleMealType = (meal: string) => {
    setFormData((prev) => {
      const exists = prev.mealTypes.includes(meal);
      if (exists) {
        return {
          ...prev,
          mealTypes: prev.mealTypes.filter((m) => m !== meal),
        };
      } else {
        return {
          ...prev,
          mealTypes: [...prev.mealTypes, meal],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateSummaryText = () => {
    return isKn
      ? `[ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್ - ಕ್ಯಾಟರಿಂಗ್ ವಿಚಾರಣೆ]
ಹೆಸರು: ${formData.fullName}
ದೂರವಾಣಿ: ${formData.phone}
ಇಮೇಲ್: ${formData.email || 'ತಿಳಿಸಿಲ್ಲ'}
ದಿನಾಂಕ: ${formData.eventDate || 'ತಿಳಿಸಿಲ್ಲ'}
ಸ್ಥಳ: ${formData.eventLocation}
ಸಮಾರಂಭ: ${formData.occasionType}
ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ: ${formData.guestCount}
ಊಟದ ವಿಧಗಳು: ${formData.mealTypes.join(', ') || 'ಸಾಮಾನ್ಯ'}
ಆಹಾರ ಶೈಲಿ: ${formData.dietaryPreference}
ಸರ್ವೀಸ್ ವಿಧಾನ: ${formData.serviceStyle}
ವಿಶೇಷ ಕೋರಿಕೆಗಳು: ${formData.specialRequests || 'ಯಾವುದೂ ಇಲ್ಲ'}`
      : `[Inchara Holidays - Catering & Hospitality Inquiry]
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Event Date: ${formData.eventDate || 'Flexible'}
Location: ${formData.eventLocation}
Occasion: ${formData.occasionType}
Guest Count: ${formData.guestCount}
Meal Types: ${formData.mealTypes.join(', ') || 'Standard'}
Dietary Style: ${formData.dietaryPreference}
Service Setup: ${formData.serviceStyle}
Special Requests: ${formData.specialRequests || 'None specified'}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      eventDate: '',
      eventLocation: '',
      guestCount: '50 - 100',
      occasionType: 'Family Celebration / Function',
      mealTypes: ['Lunch (ಮಧ್ಯಾಹ್ನದ ಊಟ)'],
      dietaryPreference: 'Pure Vegetarian (ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ)',
      serviceStyle: 'Buffet Setup (ಬಫೆ ವ್ಯವಸ್ಥೆ)',
      specialRequests: '',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        />

        {/* Modal / Sheet Container: Full-screen slide-up on mobile, right-docked side-sheet on larger screens */}
        <div className="fixed inset-0 flex flex-col justify-end lg:justify-stretch lg:items-end pointer-events-none">
          <motion.div
            initial={{ x: '100%', opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-auto relative w-full h-full lg:w-[620px] xl:w-[680px] bg-[#fbf8f1] text-left shadow-2xl rounded-none border-l border-[#d4af37]/35 flex flex-col overflow-hidden text-[#17261e]"
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
                      {isKn ? '೧೦೦% ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಆತಿಥ್ಯ' : '100% PURE VEGETARIAN HOSPITALITY'}
                    </span>
                  </div>
                  <h3 className="font-normal font-serif text-xl sm:text-2xl text-white tracking-tight leading-tight">
                    {isKn ? 'ಸಾಂಪ್ರದಾಯಿಕ ಆಹಾರ ಸೇವೆಗಳು' : 'Catering & Plantain Feasts'}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-none border border-white/20 hover:border-white/50 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer z-50 pointer-events-auto bg-white/5 hover:bg-white/10"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8 flex-1 modal-scroll-pane relative bg-[#fbf8f1]">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-sm text-[#252923]">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={isKn ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Your Name'}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#9E3D28]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ದೂರವಾಣಿ / ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆ *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98450 12345"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#9E3D28]/30"
                      />
                    </div>
                  </div>

                  {/* Occasion & Guest Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಸಮಾರಂಭದ ವಿಧ' : 'Occasion Type'}
                      </label>
                      <select
                        value={formData.occasionType}
                        onChange={(e) =>
                          setFormData({ ...formData, occasionType: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#9E3D28]/30"
                      >
                        {(isKn ? occasionOptionsKn : occasionOptionsEn).map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಅಂದಾಜು ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ' : 'Approximate Guest Count'}
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#9E3D28]/30"
                      >
                        {guestCountOptions.map((g) => (
                          <option key={g} value={g}>
                            {g} {isKn ? 'ಜನರು' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Event Date & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಕಾರ್ಯಕ್ರಮದ ದಿನಾಂಕ' : 'Event Date'}
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#9E3D28]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಕಾರ್ಯಕ್ರಮದ ಸ್ಥಳ / ನಗರ *' : 'Event Location / City *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.eventLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, eventLocation: e.target.value })
                        }
                        placeholder={
                          isKn ? 'ಉದಾ: ಬೆಂಗಳೂರು, ಮೈಸೂರು, ಹಾಸನ...' : 'e.g. Bengaluru, Mysuru, Hassan'
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#9E3D28]/30"
                      />
                    </div>
                  </div>

                  {/* Meal Types (Multi-select pills) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#263F32] mb-1.5">
                      {isKn ? 'ಅಗತ್ಯವಿರುವ ಊಟದ ಅವಧಿಗಳು (ಬಹು ಆಯ್ಕೆಗಳು)' : 'Required Meal Timings'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(isKn ? mealTypeOptionsKn : mealTypeOptionsEn).map((meal) => {
                        const isSelected = formData.mealTypes.includes(meal);
                        return (
                          <button
                            type="button"
                            key={meal}
                            onClick={() => toggleMealType(meal)}
                            className={`p-2 text-xs rounded-lg border text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'border-[#9E3D28] bg-[#9E3D28]/10 text-[#8C462C] font-semibold'
                                : 'border-[#263F32]/15 bg-white text-[#252923]/80 hover:bg-[#263F32]/5'
                            }`}
                          >
                            {meal}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dietary Preference & Setup Style */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಆಹಾರ ಆದ್ಯತೆ' : 'Dietary Preference'}
                      </label>
                      <select
                        value={formData.dietaryPreference}
                        onChange={(e) =>
                          setFormData({ ...formData, dietaryPreference: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#9E3D28]/30"
                      >
                        {(isKn ? dietaryOptionsKn : dietaryOptionsEn).map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಸರ್ವೀಸ್ & ಸೆಟಪ್ ಶೈಲಿ' : 'Service & Setup Style'}
                      </label>
                      <select
                        value={formData.serviceStyle}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceStyle: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#9E3D28]/30"
                      >
                        {(isKn ? serviceStyleOptionsKn : serviceStyleOptionsEn).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-semibold text-[#263F32] mb-1">
                      {isKn
                        ? 'ಮೆನು ವಿವರಗಳು ಅಥವಾ ವಿಶೇಷ ಕೋರಿಕೆಗಳು'
                        : 'Menu Requirements & Custom Requests'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({ ...formData, specialRequests: e.target.value })
                      }
                      placeholder={
                        isKn
                          ? 'ಉದಾ: ಮಲೆನಾಡು ಕಡಬು, ಫಿಲ್ಟರ್ ಕಾಫಿ, ಜೋಳದ ರೊಟ್ಟಿ ಊಟ, ಅಥವಾ ವಿಶೇಷ ಸಿಹಿ ತಿನಿಸುಗಳು...'
                          : 'Specific sweets, live counters, welcome drinks, or custom regional recipes...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#9E3D28]/30"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="button button-dark !min-h-[2.85rem] !px-6 flex-1"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isKn ? 'ಆಹಾರ ವಿವರಣೆ ಪ್ರಸ್ತಾವನೆ ಪಡೆಯಿರಿ' : 'Request Catering Quote'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="button button-outline !text-[#162e22] !border-[#c9c5b9] hover:!bg-[#162e22] hover:!text-white !min-h-[2.85rem] !px-5"
                    >
                      {isKn ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#263F32]/10 text-[#263F32] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-normal font-serif text-[#162e22]">
                      {isKn ? 'ಆಹಾರ ವಿವರಣೆ ಕೋರಿಕೆ ದಾಖಲಾಗಿದೆ!' : 'Catering Inquiry Submitted!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5b675f] mt-1 max-w-md mx-auto">
                      {isKn
                        ? `ಧನ್ಯವಾದಗಳು ${formData.fullName}. ನಮ್ಮ ಆತಿಥ್ಯ ಮತ್ತು ಮೆನು ಸಂಯೋಜಕರು ನಿಮ್ಮ ಕಾರ್ಯಕ್ರಮದ ದಿನಾಂಕ ಹಾಗೂ ಆದ್ಯತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಸೂಕ್ತ ಮೆನು ಪ್ರಸ್ತಾವನೆಯೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.`
                        : `Thank you, ${formData.fullName}. Our culinary coordinator will review your menu requirements and reach out with custom options and setup details.`}
                    </p>
                  </div>

                  <div className="bg-[#fffdf7] border border-[#c9c5b9] rounded-xl p-4 text-left text-xs font-mono text-[#162e22] whitespace-pre-line">
                    {generateSummaryText()}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="button button-outline !text-[#162e22] !border-[#c9c5b9] hover:!bg-[#162e22] hover:!text-white !min-h-[2.6rem] !px-4 text-xs"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copied ? (isKn ? 'ನಕಲಿಸಲಾಗಿದೆ!' : 'Copied!') : isKn ? 'ಸಾರಾಂಶ ನಕಲಿಸಿ' : 'Copy Brief'}</span>
                    </button>
                    <a
                      href={`https://wa.me/919448000000?text=${encodeURIComponent(
                        generateSummaryText()
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-gold !min-h-[2.6rem] !px-4 text-xs"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{isKn ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಚರ್ಚಿಸಿ' : 'Discuss on WhatsApp'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="button button-text !text-[#5b675f] hover:!text-[#162e22] !min-h-[2.6rem] !px-3 text-xs"
                    >
                      {isKn ? 'ಮತ್ತೊಂದು ಕೋರಿಕೆ' : 'New Request'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      )}
    </AnimatePresence>
  );
};
