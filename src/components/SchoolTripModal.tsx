import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, CheckCircle2, Copy, Send, PhoneCall } from 'lucide-react';
import { Language, SchoolTripInquiryData } from '../types';
import { Mark } from './Header';

interface SchoolTripModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const SchoolTripModal: React.FC<SchoolTripModalProps> = ({
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

  const [formData, setFormData] = useState<SchoolTripInquiryData>({
    institutionName: '',
    coordinatorName: '',
    designation: '',
    phone: '',
    email: '',
    studentCount: '50 - 100',
    gradeLevels: 'Higher Primary (Classes 5 - 8)',
    chaperoneCount: '6 - 10 Staff Members',
    learningFocus: 'Heritage & History (ಹಂಪಿ, ಬಾದಾಮಿ, ಮೈಸೂರು)',
    preferredDates: '',
    durationDays: '2 Days / 1 Night',
    safetyOrDietaryNeeds: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const gradeLevelOptionsKn = [
    'ಪ್ರಾಥಮಿಕ ಶಾಲೆ (ತರಗತಿ ೧ - ೪ / ವಯಸ್ಸು ೬-೯)',
    'ಹಿರಿಯ ಪ್ರಾಥಮಿಕ (ತರಗತಿ ೫ - ೮ / ವಯಸ್ಸು ೧೦-೧೩)',
    'ಪ್ರೌಢಶಾಲೆ (ತರಗತಿ ೯ - ೧೦ / ವಯಸ್ಸು ೧೪-೧೬)',
    'ಪಿಯುಸಿ & ಜೂನಿಯರ್ ಕಾಲೇಜು (೧೧ - ೧೨)',
    'ಪದವಿ & ಇಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿಗಳು',
  ];

  const gradeLevelOptionsEn = [
    'Primary School (Grades 1 - 4)',
    'Middle School (Grades 5 - 8)',
    'High School (Grades 9 - 10)',
    'Senior Secondary / PU College (Grades 11 - 12)',
    'College & University Students',
  ];

  const studentCountOptions = ['30 - 60', '60 - 120', '120 - 250', '250 - 500', '500+'];

  const durationOptionsKn = [
    'ಏಕದಿನ ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸ (1 Day Excursion)',
    '೨ ದಿನಗಳು / ೧ ರಾತ್ರಿ (2 Days / 1 Night)',
    '೩ ದಿನಗಳು / ೨ ರಾತ್ರಿಗಳು (3 Days / 2 Nights)',
    '೪-೫ ದಿನಗಳ ವಿಸ್ತೃತ ಸ್ಟಡಿ ಟೂರ್ (4-5 Days Study Tour)',
  ];

  const durationOptionsEn = [
    '1 Day Field Excursion',
    '2 Days / 1 Night Stay',
    '3 Days / 2 Nights',
    '4 - 5 Days Extensive Study Tour',
  ];

  const learningFocusOptionsKn = [
    'ಕರ್ನಾಟಕದ ಇತಿಹಾಸ & ವಾಸ್ತುಶಿಲ್ಪ (ಹಂಪಿ, ಬೇಲೂರು, ಮೈಸೂರು)',
    'ವಿಜ್ಞಾನ, ತಂತ್ರಜ್ಞಾನ & ಬಾಹ್ಯಾಕಾಶ (ನೆಹರೂ ತಾರಾಲಯ, HAL, ISRO ಮ್ಯೂಸಿಯಂ)',
    'ನಿಸರ್ಗ ಪರಿಸರ ವಿಜ್ಞಾನ & ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಜೀವವೈವಿಧ್ಯ',
    'ವನ್ಯಜೀವಿ ಸಂರಕ್ಷಣೆ (ಬನ್ನೇರುಘಟ್ಟ, ನಾಗರಹೊಳೆ, ಬಂಡೀಪುರ)',
    'ವಾರ್ಷಿಕ ಮನರಂಜನಾ ಪಿಕ್ನಿಕ್ & ಸಾಹಸ ಶಿಬಿರ',
  ];

  const learningFocusOptionsEn = [
    'Karnataka History & UNESCO Architecture (Hampi, Belur, Mysore)',
    'Science, Astronomy & Industry (Planetarium, HAL, ISRO Heritage)',
    'Ecology & Western Ghats Biodiversity Study',
    'Wildlife Conservation (Bannerghatta, Nagarhole, Bandipur)',
    'Annual Fun Picnic, Waterpark & Adventure Outing',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateSummaryText = () => {
    return isKn
      ? `[ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್ - ಶಾಲಾ ಪ್ರವಾಸ ವಿಚಾರಣೆ]
ಸಂಸ್ಥೆಯ ಹೆಸರು: ${formData.institutionName}
ಸಂಯೋಜಕರು: ${formData.coordinatorName} (${formData.designation})
ದೂರವಾಣಿ: ${formData.phone}
ಇಮೇಲ್: ${formData.email || 'ತಿಳಿಸಿಲ್ಲ'}
ವಿದ್ಯಾರ್ಥಿಗಳ ಸಂಖ್ಯೆ: ${formData.studentCount}
ವಿದ್ಯಾರ್ಥಿ ಹಂತ/ಗ್ರೇಡ್: ${formData.gradeLevels}
ಶಿಕ್ಷಕರು/ಮೇಲ್ವಿಚಾರಕರು: ${formData.chaperoneCount}
ಕಲಿಕಾ ಉದ್ದೇಶ: ${formData.learningFocus}
ಪ್ರಯಾಣದ ಅವಧಿ: ${formData.durationDays}
ದಿನಾಂಕ: ${formData.preferredDates || 'ತಿಳಿಸಿಲ್ಲ'}
ಸುರಕ್ಷತೆ & ಆಹಾರ ಅಗತ್ಯಗಳು: ${formData.safetyOrDietaryNeeds || 'ಯಾವುದೂ ಇಲ್ಲ'}`
      : `[Inchara Holidays - Educational Trip Inquiry]
Institution: ${formData.institutionName}
Coordinator: ${formData.coordinatorName} (${formData.designation})
Phone: ${formData.phone}
Email: ${formData.email || 'N/A'}
Student Count: ${formData.studentCount}
Grade / Age: ${formData.gradeLevels}
Staff Chaperones: ${formData.chaperoneCount}
Learning Focus: ${formData.learningFocus}
Duration: ${formData.durationDays}
Preferred Dates: ${formData.preferredDates || 'Flexible'}
Safety & Dietary Needs: ${formData.safetyOrDietaryNeeds || 'Standard safety requirements'}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      institutionName: '',
      coordinatorName: '',
      designation: '',
      phone: '',
      email: '',
      studentCount: '50 - 100',
      gradeLevels: 'Higher Primary (Classes 5 - 8)',
      chaperoneCount: '6 - 10 Staff Members',
      learningFocus: 'Heritage & History (ಹಂಪಿ, ಬಾದಾಮಿ, ಮೈಸೂರು)',
      preferredDates: '',
      durationDays: '2 Days / 1 Night',
      safetyOrDietaryNeeds: '',
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-auto relative w-full h-[94dvh] max-h-[96dvh] lg:h-full lg:max-h-full lg:w-[620px] xl:w-[680px] bg-[#fbf8f1] text-left shadow-2xl rounded-none border-t lg:border-t-0 lg:border-l border-[#d4af37]/35 flex flex-col overflow-hidden text-[#17261e]"
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
                      {isKn ? 'ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ರಮಗಳು & ಶಾಲಾ ಪ್ರವಾಸಗಳು' : 'EDUCATIONAL EXPEDITIONS & TOURS'}
                    </span>
                  </div>
                  <h3 className="font-normal font-serif text-xl sm:text-2xl text-white tracking-tight leading-tight">
                    {isKn ? 'ಶಾಲಾ ಪ್ರವಾಸ ಯೋಜನೆ ರೂಪಿಸಿ' : 'Plan an Educational Trip'}
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
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto modal-scroll-pane relative bg-[#fbf8f1]">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-sm text-[#252923]">
                  {/* Institution Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#263F32] mb-1">
                      {isKn ? 'ಶಾಲೆ / ಕಾಲೇಜು / ಸಂಸ್ಥೆಯ ಹೆಸರು *' : 'School / College / Institution Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institutionName}
                      onChange={(e) =>
                        setFormData({ ...formData, institutionName: e.target.value })
                      }
                      placeholder={
                        isKn
                          ? 'ಉದಾ: ರಾಷ್ಟ್ರೋತ್ಥಾನ ವಿದ್ಯಾಕೇಂದ್ರ, ಬೆಂಗಳೂರು'
                          : 'e.g. National Public School, Bengaluru'
                      }
                      className="w-full px-3.5 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                    />
                  </div>

                  {/* Coordinator & Designation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಸಂಯೋಜಕರು / ಪ್ರಾಂಶುಪಾಲರ ಹೆಸರು *' : 'Coordinator / Principal Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.coordinatorName}
                        onChange={(e) =>
                          setFormData({ ...formData, coordinatorName: e.target.value })
                        }
                        placeholder={isKn ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Contact Person Name'}
                        className="w-full px-3.5 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಹುದ್ದೆ / ಹುದ್ದೆಯ ವಿವರ' : 'Designation / Role'}
                      </label>
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) =>
                          setFormData({ ...formData, designation: e.target.value })
                        }
                        placeholder={
                          isKn ? 'ಪ್ರಾಂಶುಪಾಲರು / ಪ್ರವಾಸ ಸಂಯೋಜಕರು' : 'Principal / Trip In-Charge'
                        }
                        className="w-full px-3.5 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ದೂರವಾಣಿ / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *' : 'Phone / Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98450 12345"
                        className="w-full px-3.5 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಶಾಲೆಯ ಅಧಿಕೃತ ಇಮೇಲ್' : 'Institution Email'}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="school@institution.edu.in"
                        className="w-full px-3.5 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                      />
                    </div>
                  </div>

                  {/* Student Count & Grade Levels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಅಂದಾಜು ವಿದ್ಯಾರ್ಥಿಗಳ ಸಂಖ್ಯೆ' : 'Approximate Student Count'}
                      </label>
                      <select
                        value={formData.studentCount}
                        onChange={(e) =>
                          setFormData({ ...formData, studentCount: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                      >
                        {studentCountOptions.map((c) => (
                          <option key={c} value={c}>
                            {c} {isKn ? 'ವಿದ್ಯಾರ್ಥಿಗಳು' : 'Students'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ವಿದ್ಯಾರ್ಥಿಗಳ ತರಗತಿ / ವಯೋಮಾನ' : 'Grade Levels / Age Group'}
                      </label>
                      <select
                        value={formData.gradeLevels}
                        onChange={(e) =>
                          setFormData({ ...formData, gradeLevels: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                      >
                        {(isKn ? gradeLevelOptionsKn : gradeLevelOptionsEn).map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Chaperones & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಜೊತೆಗಿರುವ ಶಿಕ್ಷಕರು / ಸಿಬ್ಬಂದಿ ಸಂಖ್ಯೆ' : 'Accompanying Staff / Teachers'}
                      </label>
                      <input
                        type="text"
                        value={formData.chaperoneCount}
                        onChange={(e) =>
                          setFormData({ ...formData, chaperoneCount: e.target.value })
                        }
                        placeholder={isKn ? 'ಉದಾ: ೮ ಶಿಕ್ಷಕರು, ೨ ರಕ್ಷಕರು' : 'e.g. 8 Teachers, 2 Caretakers'}
                        className="w-full px-3.5 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಪ್ರವಾಸದ ಸಮಯಾವಧಿ' : 'Tour Duration'}
                      </label>
                      <select
                        value={formData.durationDays}
                        onChange={(e) =>
                          setFormData({ ...formData, durationDays: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                      >
                        {(isKn ? durationOptionsKn : durationOptionsEn).map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Learning Focus & Preferred Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಕಲಿಕಾ ಅಥವಾ ಪ್ರವಾಸದ ಉದ್ದೇಶ' : 'Learning Focus / Circuit'}
                      </label>
                      <select
                        value={formData.learningFocus}
                        onChange={(e) =>
                          setFormData({ ...formData, learningFocus: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                      >
                        {(isKn ? learningFocusOptionsKn : learningFocusOptionsEn).map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#263F32] mb-1">
                        {isKn ? 'ಅಪೇಕ್ಷಿತ ತಿಂಗಳು / ದಿನಾಂಕ' : 'Preferred Travel Dates'}
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDates}
                        onChange={(e) =>
                          setFormData({ ...formData, preferredDates: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                      />
                    </div>
                  </div>

                  {/* Safety & Dietary requirements */}
                  <div>
                    <label className="block text-xs font-semibold text-[#263F32] mb-1">
                      {isKn
                        ? 'ವಿಶೇಷ ಸುರಕ್ಷತಾ ಅಥವಾ ಪೌಷ್ಟಿಕ ಆಹಾರ ಕೋರಿಕೆಗಳು'
                        : 'Safety, First-Aid & Dietary Requirements'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.safetyOrDietaryNeeds}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          safetyOrDietaryNeeds: e.target.value,
                        })
                      }
                      placeholder={
                        isKn
                          ? 'ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ, ಜಿಪಿಎಸ್ ಬಸ್ ಸೌಲಭ್ಯ, ಬಿಸಿ ಸಾತ್ವಿಕ ಊಟ, ಪ್ರತ್ಯೇಕ ಹೆಣ್ಣುಮಕ್ಕಳ ವಸತಿ ಸುರಕ್ಷತೆ ಇತ್ಯಾದಿ...'
                          : 'First aid marshals, GPS bus tracking, purified warm water, separate girl-student security guards...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-none border border-[#263F32]/20 bg-white text-[#252923] focus:outline-hidden focus:ring-2 focus:ring-[#1D4E3A]/30"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="button button-dark !min-h-[2.85rem] !px-6 flex-1"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isKn ? 'ಶೈಕ್ಷಣಿಕ ಪ್ರವಾಸ ಯೋಜನೆ ಸಿದ್ಧಪಡಿಸಿ' : 'Submit School Tour Plan'}</span>
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
                      {isKn ? 'ಶಾಲಾ ಪ್ರವಾಸ ವಿವರಣೆ ದಾಖಲಾಗಿದೆ!' : 'Educational Tour Brief Received!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5b675f] mt-1 max-w-md mx-auto">
                      {isKn
                        ? `ಧನ್ಯವಾದಗಳು ${formData.coordinatorName}. ${formData.institutionName} ವಿದ್ಯಾರ್ಥಿಗಳ ಸುರಕ್ಷಿತ ಹಾಗೂ ಅರ್ಥಪೂರ್ಣ ಕಲಿಕಾ ಪ್ರವಾಸಕ್ಕಾಗಿ ನಾವು ಸಂಪೂರ್ಣ ವಿವರಣೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಿ ಶೀಘ್ರದಲ್ಲಿ ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.`
                        : `Thank you, ${formData.coordinatorName}. Our educational journeys team will design a structured, safety-audited itinerary for ${formData.institutionName} and connect shortly.`}
                    </p>
                  </div>

                  <div className="bg-[#fffdf7] border border-[#c9c5b9] rounded-none p-4 text-left text-xs font-mono text-[#162e22] whitespace-pre-line">
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
                      {isKn ? 'ಮತ್ತೊಂದು ಪ್ರವಾಸ' : 'New School Plan'}
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
