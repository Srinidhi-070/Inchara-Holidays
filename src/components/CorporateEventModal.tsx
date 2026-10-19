import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, CheckCircle2, Copy, Send, PhoneCall } from 'lucide-react';
import { Language, CorporateInquiryData } from '../types';
import { Mark } from './Header';

interface CorporateEventModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const CorporateEventModal: React.FC<CorporateEventModalProps> = ({
  isOpen,
  language,
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

  const [formData, setFormData] = useState<CorporateInquiryData>({
    organizationName: '',
    contactPerson: '',
    workEmail: '',
    phone: '',
    eventType: 'Team-Building Outing',
    preferredDate: '',
    attendeeCount: '30-75',
    locationPreference: 'Chikmagalur / Coorg Resort',
    budgetRange: 'Standard Corporate Budget',
    additionalRequirements: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const isKn = language === 'kn';

  const eventTypesKn = [
    'ಟೀಮ್ ಬಿಲ್ಡಿಂಗ್ & ಔಟಿಂಗ್ (Team-Building Outing)',
    'ವಾರ್ಷಿಕ ಕಂಪನಿ ಸಂಭ್ರಮ (Annual Celebration / Gala)',
    'ನಾಯಕತ್ವ ಸಭೆ & ಆಫ್‌ಸೈಟ್ ಕಾನ್ಫರೆನ್ಸ್ (Leadership Off-site)',
    'ಉದ್ಯೋಗಿ ಪ್ರೋತ್ಸಾಹಕ ಪ್ರವಾಸ (Employee Incentive Trip)',
    'ಕಾರ್ಯನಿರ್ವಾಹಕ ಸಾರಿಗೆ & ವಸತಿ (Corporate Travel Logistics)',
  ];

  const eventTypesEn = [
    'Team-Building Outing',
    'Annual Celebration & Gala Dinner',
    'Leadership Off-site & Conference',
    'Employee Incentive Travel',
    'Corporate Travel & Transit Logistics',
  ];

  const attendeeCounts = ['10 - 25', '25 - 50', '50 - 100', '100 - 250', '250+'];

  const locationsKn = [
    'ಚಿಕ್ಕಮಗಳೂರು / ಕೂರ್ಗ್ ರೆಸಾರ್ಟ್ (Malnad Coffee Estates)',
    'ಬೆಂಗಳೂರು ಹೊರವಲಯ / ಕನಕಪುರ ರಸ್ತೆ (Bengaluru Outskirts)',
    'ಕಬಿನಿ / ಬಂಡೀಪುರ ವನ್ಯಧಾಮ (Jungle Safari Retreat)',
    'ಗೋಕರ್ಣ / ಗೋವಾ ಕರಾವಳಿ (Coastal Beach Offsite)',
    'ಮೈಸೂರು ಸಾಂಸ್ಕೃತಿಕ ರೆಸಾರ್ಟ್ (Royal Heritage Mysore)',
    'ಇತರ ತಾಣಗಳು (Custom Location)',
  ];

  const locationsEn = [
    'Chikmagalur / Coorg Coffee Estate Resort',
    'Bengaluru Outskirts / Kanakapura Road',
    'Kabini / Bandipur Wilderness Retreat',
    'Gokarna / Goa Coastal Beach Resort',
    'Mysuru Heritage Resort',
    'Custom / Other Outstation Location',
  ];

  const budgetRangesKn = [
    'ಮಿತವ್ಯಯದ ಯೋಜನೆ (Value Corporate Package)',
    'ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಮಾನದಂಡ (Standard Corporate)',
    'ಪ್ರೀಮಿಯಂ ಲಕ್ಸುರಿ & ವಿಐಪಿ (Executive & Premium)',
    'ಚರ್ಚೆಯ ನಂತರ ನಿರ್ಧರಿಸುವುದು (To Be Discussed)',
  ];

  const budgetRangesEn = [
    'Value Corporate Budget',
    'Standard Corporate Package',
    'Executive & Premium Luxury',
    'Flexible / To Be Discussed',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateSummaryText = () => {
    return isKn
      ? `[ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್ - ಕಾರ್ಪೊರೇಟ್ ವಿಚಾರಣೆ]
ಸಂಸ್ಥೆಯ ಹೆಸರು: ${formData.organizationName}
ಸಂಪರ್ಕ ವ್ಯಕ್ತಿ: ${formData.contactPerson}
ಇಮೇಲ್: ${formData.workEmail}
ದೂರವಾಣಿ: ${formData.phone}
ಕಾರ್ಯಕ್ರಮ ಶೈಲಿ: ${formData.eventType}
ಅಂದಾಜು ದಿನಾಂಕ: ${formData.preferredDate || 'ತಿಳಿಸಿಲ್ಲ'}
ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ: ${formData.attendeeCount}
ಮೆಚ್ಚಿನ ತಾಣ: ${formData.locationPreference}
ಬಜೆಟ್ ಆದ್ಯತೆ: ${formData.budgetRange}
ಹೆಚ್ಚುವರಿ ಅಗತ್ಯಗಳು: ${formData.additionalRequirements || 'ಯಾವುದೂ ಇಲ್ಲ'}`
      : `[Inchara Holidays - Corporate Event Inquiry]
Organization: ${formData.organizationName}
Contact Person: ${formData.contactPerson}
Work Email: ${formData.workEmail}
Phone: ${formData.phone}
Event Type: ${formData.eventType}
Preferred Date: ${formData.preferredDate || 'Flexible'}
Attendees: ${formData.attendeeCount}
Location Preference: ${formData.locationPreference}
Budget Tier: ${formData.budgetRange}
Requirements: ${formData.additionalRequirements || 'None specified'}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      organizationName: '',
      contactPerson: '',
      workEmail: '',
      phone: '',
      eventType: 'Team-Building Outing',
      preferredDate: '',
      attendeeCount: '30-75',
      locationPreference: 'Chikmagalur / Coorg Resort',
      budgetRange: 'Standard Corporate Budget',
      additionalRequirements: '',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
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
                      {isKn ? 'ಕಾರ್ಪೊರೇಟ್ ಮತ್ತು ಉದ್ಯೋಗಿ ಕೂಟಗಳು' : 'CORPORATE & EXECUTIVE RETREATS'}
                    </span>
                  </div>
                  <h3 className="font-normal font-serif text-xl sm:text-2xl text-white tracking-tight leading-tight">
                    {isKn ? 'ಕಾರ್ಪೊರೇಟ್ ಕಾರ್ಯಕ್ರಮ ಯೋಜನೆ' : 'Plan a Corporate Event'}
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

            {/* Content Body */}
            <div className="p-6 sm:p-8 flex-1 modal-scroll-pane relative bg-[#fbf8f1]">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-sm text-[#252923]">
                  {/* Org Name & Contact Person */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಸಂಸ್ಥೆ / ಕಂಪನಿಯ ಹೆಸರು *' : 'Organization Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.organizationName}
                        onChange={(e) =>
                          setFormData({ ...formData, organizationName: e.target.value })
                        }
                        placeholder={isKn ? 'ಉದಾ: ಇನ್ಫೋಸಿಸ್ / ಸ್ಟಾರ್ಟ್‌ಅಪ್ ತಂಡ' : 'e.g. Acme Corp / Tech Studio'}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#263F32]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಸಂಪರ್ಕಿಸುವವರ ಹೆಸರು *' : "Contact Person's Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) =>
                          setFormData({ ...formData, contactPerson: e.target.value })
                        }
                        placeholder={isKn ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Your Name'}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#263F32]/20"
                      />
                    </div>
                  </div>

                  {/* Work Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಅಧಿಕೃತ ಇಮೇಲ್ (Work Email) *' : 'Work Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.workEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, workEmail: e.target.value })
                        }
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#263F32]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ದೂರವಾಣಿ / ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆ *' : 'Phone / WhatsApp Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98450 12345"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#263F32]/20"
                      />
                    </div>
                  </div>

                  {/* Event Type & Preferred Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಕಾರ್ಯಕ್ರಮದ ಸ್ವರೂಪ' : 'Event Type'}
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) =>
                          setFormData({ ...formData, eventType: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#263F32]/20"
                      >
                        {(isKn ? eventTypesKn : eventTypesEn).map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಅಂದಾಜು ದಿನಾಂಕ / ತಿಂಗಳು' : 'Preferred Date / Month'}
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredDate: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#263F32]/20"
                      />
                    </div>
                  </div>

                  {/* Attendee Count & Location Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಭಾಗವಹಿಸುವವರ ಸಂಖ್ಯೆ' : 'Approximate Attendee Count'}
                      </label>
                      <select
                        value={formData.attendeeCount}
                        onChange={(e) =>
                          setFormData({ ...formData, attendeeCount: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#263F32]/20"
                      >
                        {attendeeCounts.map((count) => (
                          <option key={count} value={count}>
                            {count} {isKn ? 'ಸದಸ್ಯರು' : 'People'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಆದ್ಯತೆಯ ಸ್ಥಳ / ತಾಣ' : 'Location Preference'}
                      </label>
                      <select
                        value={formData.locationPreference}
                        onChange={(e) =>
                          setFormData({ ...formData, locationPreference: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#263F32]/20"
                      >
                        {(isKn ? locationsKn : locationsEn).map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-xs font-semibold text-[#263F32] mb-1">
                      {isKn ? 'ಅಂದಾಜು ಬಜೆಟ್ ಶ್ರೇಣಿ' : 'Approximate Budget Range'}
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) =>
                        setFormData({ ...formData, budgetRange: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#263F32]/20"
                    >
                      {(isKn ? budgetRangesKn : budgetRangesEn).map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <label className="block text-xs font-semibold text-[#263F32] mb-1">
                      {isKn
                        ? 'ಹೆಚ್ಚುವರಿ ಅಗತ್ಯಗಳು (ಸಾರಿಗೆ, ಟೀಮ್ ಬಿಲ್ಡಿಂಗ್ ಗೇಮ್ಸ್, ಸಭಾಂಗಣ ಇತ್ಯಾದಿ)'
                        : 'Additional Requirements (Transit, Team activities, AV, Special food)'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalRequirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          additionalRequirements: e.target.value,
                        })
                      }
                      placeholder={
                        isKn
                          ? 'ನಿಮ್ಮ ತಂಡದ ಅಪೇಕ್ಷೆಗಳು, ವಾಸ್ತವ್ಯದ ದಿನಗಳು ಅಥವಾ ವಿಶೇಷ ವಿನಂತಿಗಳು...'
                          : 'Specific activities, coach transport requirement, conference hall setup...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#263F32]/20"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="button button-dark !min-h-[2.85rem] !px-6 flex-1"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isKn ? 'ಕಾರ್ಪೊರೇಟ್ ಪ್ರಸ್ತಾವನೆ ಪಡೆಯಿರಿ' : 'Submit Corporate Inquiry'}</span>
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
                      {isKn ? 'ವಿಚಾರಣೆ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ!' : 'Corporate Request Received!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5b675f] mt-1 max-w-md mx-auto">
                      {isKn
                        ? `ಧನ್ಯವಾದಗಳು ${formData.contactPerson}. ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್‌ನ ಕಾರ್ಪೊರೇಟ್ ಸಂಯೋಜಕರು ತ್ವರಿತವಾಗಿ ಕಸ್ಟಮೈಸ್ಡ್ ಪ್ರಸ್ತಾವನೆಯೊಂದಿಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.`
                        : `Thank you, ${formData.contactPerson}. Our corporate events manager will review your details and connect with a tailored proposal shortly.`}
                    </p>
                  </div>

                  {/* Summary Box */}
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
                      <span>
                        {copied
                          ? isKn
                            ? 'ನಕಲಿಸಲಾಗಿದೆ!'
                            : 'Copied!'
                          : isKn
                          ? 'ಸಾರಾಂಶ ನಕಲಿಸಿ'
                          : 'Copy Brief'}
                      </span>
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
                      <span>{isKn ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಂಭಾಷಣೆ ನಡೆಸಿ' : 'Chat on WhatsApp'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="button button-text !text-[#5b675f] hover:!text-[#162e22] !min-h-[2.6rem] !px-3 text-xs"
                    >
                      {isKn ? 'ಮತ್ತೊಂದು ವಿಚಾರಣೆ' : 'New Inquiry'}
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
