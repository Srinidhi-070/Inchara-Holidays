import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '../types';
import { brandConfig } from '../config/brand';
import { ShieldCheck, FileText, X, Lock, CheckCircle2, AlertTriangle, Compass } from 'lucide-react';
import { LotusIcon } from './SouthIndianMotifs';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export const PrivacyPolicyModal: React.FC<LegalModalProps> = ({ isOpen, onClose, locale }) => {
  const isKn = locale === 'kn';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative max-w-3xl w-full bg-[#FBF8F1] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#162E22] text-[#FBF8F1] p-6 sm:p-8 relative shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F5D77F] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>{isKn ? 'ಗೌಪ್ಯತೆ ಸಂರಕ್ಷಣೆ & ಡಿಪಿಡಿಪಿ' : 'DPDP 2023 & Privacy Commitment'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white">
              {isKn ? 'ಗೌಪ್ಯತಾ ನೀತಿ' : 'Privacy & Data Protection Policy'}
            </h2>

            <p className="text-xs sm:text-sm text-white/75 mt-1">
              {isKn
                ? 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳ ಸುರಕ್ಷತೆ ಮತ್ತು ನೈಜ ಪ್ರವಾಸ ನಿರ್ವಹಣೆಗೆ ಮಾತ್ರ ಡೇಟಾ ಬಳಕೆ.'
                : 'How Inchara Holidays safeguards your personal information with absolute integrity.'}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs sm:text-sm text-[#252923]/80 leading-relaxed">
            <div className="p-4 rounded-xl bg-[#F6F3EA] border border-[#263F32]/10 space-y-1">
              <div className="font-bold text-[#162E22] text-xs uppercase tracking-wider">
                {isKn ? 'ಪ್ರಮುಖ ತತ್ವ: ಡೇಟಾ ಮಾರಾಟವಿಲ್ಲ' : 'Core Promise: Zero Data Brokerage or Resale'}
              </div>
              <p>
                {isKn
                  ? 'ಇಂಚರ ಹಾಲಿಡೇಸ್ ಯಾವುದೇ ಸಂದರ್ಭದಲ್ಲೂ ಪ್ರಯಾಣಿಕರ ಫೋನ್ ಸಂಖ್ಯೆ, ಇಮೇಲ್ ಅಥವಾ ಪ್ರವಾಸದ ವಿವರಗಳನ್ನು ಮೂರನೇ ವ್ಯಕ್ತಿಗಳಿಗೆ, ಜಾಹೀರಾತುದಾರರಿಗೆ ಅಥವಾ ದಲ್ಲಾಳಿಗಳಿಗೆ ಮಾರಾಟ ಮಾಡುವುದಿಲ್ಲ.'
                  : 'Inchara Holidays strictly never sells, rents, monetizes, or shares traveller contact numbers, itinerary plans, or personal details with marketing brokers or advertisers.'}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#162E22]">
                {isKn ? '೧. ನಾವು ಯಾವ ವಿವರಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತೇವೆ?' : '1. Information We Collect'}
              </h3>
              <p>
                {isKn
                  ? 'ವಿಚಾರಣೆ ನಮೂನೆ, ದೂರವಾಣಿ ಕರೆ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ನೀವು ಸ್ವಯಂಪ್ರೇರಿತರಾಗಿ ಹಂಚಿಕೊಳ್ಳುವ ವಿವರಗಳು: ಹೆಸರು, ದೂರವಾಣಿ ಸಂಖ್ಯೆ, ಇಮೇಲ್ ವಿಳಾಸ, ಪ್ರಯಾಣದ ದಿನಾಂಕಗಳು, ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ, ಪಿಕಪ್ ಸ್ಥಳ ಮತ್ತು ಆಹಾರದ ಆದ್ಯತೆಗಳು (ಉದಾ: ಜೈನ ಸಾತ್ವಿಕ/ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ).'
                  : 'We collect information you voluntarily provide via our Universal Enquiry form, telephone conversations, or WhatsApp chats: full name, contact number, email, travel dates, passenger count, pickup city, and dietary specifications (e.g. Jain Satvik/100% Pure Vegetarian).'}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#162E22]">
                {isKn ? '೨. ಮಾಹಿತಿಯ ಬಳಕೆ ಉದ್ದೇಶ' : '2. Purpose of Collection'}
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  {isKn
                    ? 'ನಿಮ್ಮ ಪ್ರವಾಸಕ್ಕೆ ನಿಖರವಾದ ಮಾರ್ಗಸೂಚಿ ಮತ್ತು ಕೊಟೇಶನ್ ಸಿದ್ಧಪಡಿಸಲು.'
                    : 'To craft bespoke itinerary proposals, calculate accurate GST quotations, and communicate directly with you.'}
                </li>
                <li>
                  {isKn
                    ? 'ಹೋಟೆಲ್ ವಾಸ್ತವ್ಯ, ವಾಹನ ಸಾರಿಗೆ ಮತ್ತು ಅಧಿಕೃತ ಪ್ರವೇಶ ಪರವಾನಗಿಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲು.'
                    : 'To execute verified hotel reservations, assign vetted chauffeurs, and arrange monument/industrial visit permits.'}
                </li>
                <li>
                  {isKn
                    ? 'ಪ್ರವಾಸದ ಸಮಯದಲ್ಲಿ ತುರ್ತು ನೆರವು ಮತ್ತು ಸುರಕ್ಷತಾ ಮೇಲ್ವಿಚಾರಣೆಗೆ.'
                    : 'To provide 24/7 on-tour emergency dispatch assistance and route coordination during ghat travel.'}
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#162E22]">
                {isKn ? '೩. ಡೇಟಾ ಅಳಿಸುವಿಕೆ ಮತ್ತು ಹಕ್ಕುಗಳು' : '3. Your Rights & Data Deletion'}
              </h3>
              <p>
                {isKn
                  ? 'ಡಿಜಿಟಲ್ ವೈಯಕ್ತಿಕ ಡೇಟಾ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ (DPDP 2023) ಅಡಿಯಲ್ಲಿ, ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಮ್ಮ ವ್ಯವಸ್ಥೆಯಿಂದ ಸಂಪೂರ್ಣವಾಗಿ ಅಳಿಸಲು (Purge) ನೀವು ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ರವೀಂದ್ರ ಅವರನ್ನು (+91 90361 74880) ಸಂಪರ್ಕಿಸಬಹುದು. ೪೮ ಗಂಟೆಗಳ ಒಳಗೆ ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ.'
                  : 'In compliance with India\'s Digital Personal Data Protection Act 2023, you retain the complete right to request the deletion or correction of your contact records. Contact Ravindra S at +91 90361 74880 or via WhatsApp; all records will be securely purged within 48 business hours.'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#F6F3EA] border-t border-[#263F32]/10 flex items-center justify-between">
            <span className="text-xs text-[#252923]/60">
              {brandConfig.nameEn}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#162E22] text-white hover:bg-[#1E3A2B] text-xs font-semibold cursor-pointer transition-colors"
            >
              {isKn ? 'ಸಮ್ಮತಿಸಿ ಮುಚ್ಚಿ' : 'Close'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const TermsModal: React.FC<LegalModalProps> = ({ isOpen, onClose, locale }) => {
  const isKn = locale === 'kn';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative max-w-3xl w-full bg-[#FBF8F1] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#162E22] text-[#FBF8F1] p-6 sm:p-8 relative shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F5D77F] uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>{isKn ? 'ನಿಯಮಗಳು & ಷರತ್ತುಗಳು' : 'Customary Terms & Advisory'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white">
              {isKn ? 'ಪ್ರವಾಸ ನಿಯಮಗಳು ಮತ್ತು ನಿಬಂಧನೆಗಳು' : 'Tour Terms & Booking Conditions'}
            </h2>

            <p className="text-xs sm:text-sm text-white/75 mt-1">
              {isKn
                ? 'ಪಾರದರ್ಶಕ ಒಡಂಬಡಿಕೆ. ಯಾವುದೇ ಗುಪ್ತ ಷರತ್ತುಗಳಿಲ್ಲದ ಸ್ಪಷ್ಟ ವ್ಯವಹಾರ ನಿಯಮಗಳು.'
                : 'Transparent customary travel guidelines governing your bespoke holiday with Inchara Holidays.'}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs sm:text-sm text-[#252923]/80 leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#162E22]">
                {isKn ? '೧. ಕಾಯ್ದಿರಿಸುವಿಕೆ ಮತ್ತು ಪಾವತಿ ವೇಳಾಪಟ್ಟಿ' : '1. Booking Confirmation & Payment Schedule'}
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  {isKn
                    ? '೩೦% ಮುಂಗಡ ಟೋಕನ್: ಅಧಿಕೃತ ಮಾರ್ಗಸೂಚಿ ಅಂಗೀಕರಿಸಿದಾಗ ಹೋಟೆಲ್ ಮತ್ತು ವಾಹನ ಕಾಯ್ದಿರಿಸಲು.'
                    : '30% Advance Token: Required upon agreement of the itinerary proposal to confirm hotel blocks and reserve dedicated chauffeur transport.'}
                </li>
                <li>
                  {isKn
                    ? '೫೦% ದ್ವಿತೀಯ ಪಾವತಿ: ಪ್ರವಾಸ ಆರಂಭವಾಗುವ ೭ ದಿನಗಳ ಮೊದಲು.'
                    : '50% Second Tranche: Payable 7 business days prior to departure date.'}
                </li>
                <li>
                  {isKn
                    ? '೨೦% ಅಂತಿಮ ಬಾಕಿ: ಪ್ರವಾಸದ ಮೊದಲ ದಿನ ಹೋಟೆಲ್ ಚೆಕ್-ಇನ್ ಅಥವಾ ವಾಹನ ಪಿಕಪ್ ವೇಳೆಯಲ್ಲಿ.'
                    : '20% Final Settlement: Payable upon arrival / hotel check-in at the destination.'}
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#162E22]">
                {isKn ? '೨. ಚಾಲಕರ ಕರ್ತವ್ಯ ಮತ್ತು ವಾಹನ ನಿಯಮಗಳು' : '2. Chauffeur Duty Hours & Fleet Regulations'}
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  {isKn
                    ? 'ಸಾಮಾನ್ಯ ವೀಕ್ಷಣಾ ಸಮಯ ಬೆಳಿಗ್ಗೆ ೮:೦೦ ರಿಂದ ರಾತ್ರಿ ೮:೦೦ ರವರೆಗೆ. ರಾತ್ರಿ ಘಾಟಿ ಪ್ರಯಾಣವನ್ನು ಪ್ರಯಾಣಿಕರ ಸುರಕ್ಷತೆಯ ದೃಷ್ಟಿಯಿಂದ ಕಟ್ಟುನಿಟ್ಟಾಗಿ ತಪ್ಪಿಸಲಾಗುತ್ತದೆ.'
                    : 'Standard local sightseeing duty is 8:00 AM to 8:00 PM. Night driving across Western Ghats hairpin curves is strictly avoided to guarantee passenger safety.'}
                </li>
                <li>
                  {isKn
                    ? 'ವಾಹನಗಳಲ್ಲಿ ಧೂಮಪಾನ ಮತ್ತು ಮದ್ಯಪಾನವನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ.'
                    : 'Smoking and alcohol consumption inside our tourist vehicles is strictly prohibited.'}
                </li>
                <li>
                  {isKn
                    ? 'ಇಂಧನ, ಚಾಲಕರ ದಿನಭತ್ಯೆ (Bata), ಟೋಲ್ ಮತ್ತು ಪಾರ್ಕಿಂಗ್ ಶುಲ್ಕಗಳು ನಮ್ಮ ಕೊಟೇಶನ್‌ನಲ್ಲಿ ಒಳಗೊಂಡಿರುತ್ತವೆ.'
                    : 'Fuel, chauffeur daily bata, interstate road permits, and toll expenses are included as itemized in your formal quotation.'}
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#162E22]">
                {isKn ? '೩. ರದ್ದತಿ ಮತ್ತು ಮರುಹೊಂದಾಣಿಕೆ (Rescheduling)' : '3. Cancellation & Force Majeure Advisory'}
              </h3>
              <p>
                {isKn
                  ? 'ಪ್ರಕೃತಿ ವಿಕೋಪ, ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ರಸ್ತೆ ಕುಸಿತ ಅಥವಾ ಸರ್ಕಾರದ ನಿರ್ಬಂಧಗಳ ಸಂದರ್ಭದಲ್ಲಿ, ಪಾವತಿಸಿದ ಮುಂಗಡ ಹಣವನ್ನು ವ್ಯರ್ಥವಾಗಲು ಬಿಡದೆ ಮುಂದಿನ ೧೨ ತಿಂಗಳ ಒಳಗೆ ಮರುಹೊಂದಿಸಲು (Reschedule) ಸಂಪೂರ್ಣ ಅವಕಾಶ ಕಲ್ಪಿಸಲಾಗುತ್ತದೆ.'
                  : 'In the event of unforeseen monsoon road closures, landslips, or natural force majeure, we coordinate safe alternative routes. If an itinerary must be deferred, your advance token balance is preserved as transferable credit valid for 12 months.'}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#162E22]">
                {isKn ? '೪. ೧೦೦% ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಬದ್ಧತೆ' : '4. 100% Pure Vegetarian Assurance'}
              </h3>
              <p>
                {isKn
                  ? 'ನಮ್ಮ ಪ್ರವಾಸ ಪ್ಯಾಕೇಜ್‌ನಲ್ಲಿ ಬರುವ ಎಲ್ಲಾ ಊಟೋಪಚಾರಗಳು ಸಾಂಪ್ರದಾಯಿಕ ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಹೋಟೆಲ್ ಮತ್ತು ಅಡುಗೆ ಮನೆಗಳಿಂದಲೇ ಒದಗಿಸಲ್ಪಡುತ್ತವೆ.'
                  : 'All group and family meal services arranged under Inchara Holidays meal plans are 100% pure vegetarian, prepared without non-vegetarian contact.'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-[#F6F3EA] border-t border-[#263F32]/10 flex items-center justify-between">
            <span className="text-xs text-[#252923]/60">
              {brandConfig.addressEn}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#162E22] text-white hover:bg-[#1E3A2B] text-xs font-semibold cursor-pointer transition-colors"
            >
              {isKn ? 'ಸಮ್ಮತಿಸಿ ಮುಚ್ಚಿ' : 'I Understand'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
