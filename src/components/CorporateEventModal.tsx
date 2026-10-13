import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, CheckCircle2, Copy, Send, PhoneCall } from 'lucide-react';
import { Language, CorporateInquiryData } from '../types';

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
            initial={{ y: '100%', opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 280,
            }}
            className="pointer-events-auto relative w-full h-[94dvh] max-h-[96dvh] lg:h-full lg:max-h-full lg:w-[600px] xl:w-[660px] bg-[#FBF9F4] text-left shadow-2xl rounded-t-3xl lg:rounded-none lg:rounded-l-3xl border-t lg:border-t-0 lg:border-l border-[#263F32]/15 flex flex-col overflow-hidden"
          >
            {/* Mobile pull handle */}
            <div className="lg:hidden w-full flex items-center justify-center pt-2.5 pb-1 bg-[#263F32] shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-white/25" />
            </div>

            {/* Header banner */}
            <div className="bg-[#263F32] text-[#F6F3EA] px-6 py-4 sm:py-5 relative shrink-0 shadow-xs">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 text-[#F6F3EA] hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="p-1.5 rounded-lg bg-[#B96F50]/20 text-[#D88D6F]">
                  <Building2 className="w-5 h-5" />
                </span>
                <span className="text-xs tracking-wider uppercase font-semibold text-[#D88D6F]">
                  {isKn ? 'ಕಾರ್ಪೊರೇಟ್ ಮತ್ತು ಉದ್ಯೋಗಿ ಕೂಟಗಳು' : 'Corporate Events & Team Outings'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-editorial">
                {isKn ? 'ಕಾರ್ಪೊರೇಟ್ ಕಾರ್ಯಕ್ರಮ ಯೋಜನೆ' : 'Plan a Corporate Event or Team Outing'}
              </h2>
              <p className="text-xs sm:text-sm text-[#F6F3EA]/80 mt-1">
                {isKn
                  ? 'ನಿಮ್ಮ ತಂಡದ ವಿಶ್ರಾಂತಿ, ಪ್ರೇರಣೆ ಹಾಗೂ ಸಂಭ್ರಮಕ್ಕೆ ಪರಿಪೂರ್ಣ ವಾತಾವರಣ ನಿರ್ಮಿಸುತ್ತೇವೆ.'
                  : 'Tailored retreats, seamless team coordination, and dedicated hospitality for your team.'}
              </p>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-7 flex-1 overflow-y-auto">
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
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#263F32] text-[#F6F3EA] font-semibold text-sm hover:bg-[#1C2F25] transition-colors cursor-pointer shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      {isKn ? 'ಕಾರ್ಪೊರೇಟ್ ಪ್ರಸ್ತಾವನೆ ಪಡೆಯಿರಿ' : 'Submit Corporate Inquiry'}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-3 rounded-lg border border-[#263F32]/20 text-[#263F32] text-sm font-medium hover:bg-[#263F32]/5 transition-colors cursor-pointer"
                    >
                      {isKn ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif-editorial text-[#263F32]">
                      {isKn ? 'ವಿಚಾರಣೆ ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಾಗಿದೆ!' : 'Corporate Request Received!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#252923]/80 mt-1 max-w-md mx-auto">
                      {isKn
                        ? `ಧನ್ಯವಾದಗಳು ${formData.contactPerson}. ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್‌ನ ಕಾರ್ಪೊರೇಟ್ ಸಂಯೋಜಕರು ತ್ವರಿತವಾಗಿ ಕಸ್ಟಮೈಸ್ಡ್ ಪ್ರಸ್ತಾವನೆಯೊಂದಿಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.`
                        : `Thank you, ${formData.contactPerson}. Our corporate events manager will review your details and connect with a tailored proposal shortly.`}
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#263F32]/5 border border-[#263F32]/10 rounded-xl p-4 text-left text-xs font-mono text-[#263F32] whitespace-pre-line">
                    {generateSummaryText()}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#263F32]/30 text-[#263F32] text-xs font-semibold hover:bg-[#263F32]/10 transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      {copied
                        ? isKn
                          ? 'ನಕಲಿಸಲಾಗಿದೆ!'
                          : 'Copied!'
                        : isKn
                        ? 'ಸಾರಾಂಶ ನಕಲಿಸಿ'
                        : 'Copy Brief'}
                    </button>
                    <a
                      href={`https://wa.me/919448000000?text=${encodeURIComponent(
                        generateSummaryText()
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#263F32] text-[#F6F3EA] text-xs font-semibold hover:bg-[#1C2F25] transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" />
                      {isKn ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಸಂಭಾಷಣೆ ನಡೆಸಿ' : 'Chat on WhatsApp'}
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2.5 rounded-lg text-xs font-medium text-[#263F32]/70 hover:text-[#263F32] transition-colors cursor-pointer"
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
    </AnimatePresence>
  );
};
