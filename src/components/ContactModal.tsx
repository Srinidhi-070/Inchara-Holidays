import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale, ServiceId } from '../types';
import { brandConfig, getWhatsAppInquiryUrl } from '../config/brand';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  X,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  User,
  Compass,
} from 'lucide-react';
import { LotusIcon, AmbariElephant } from './SouthIndianMotifs';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  onOpenEnquiry: (service?: ServiceId | string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  locale,
  onOpenEnquiry,
}) => {
  const isKn = locale === 'kn';

  if (!isOpen) return null;

  const waGreeting = isKn
    ? 'ನಮಸ್ಕಾರ ಶ್ರೀನಿಧಿ ಅವರೇ, ಇಂಚರ ಹಾಲಿಡೇಸ್ ಮೂಲಕ ನನ್ನ ಪ್ರವಾಸದ ಯೋಜನೆಗೆ ಸಮಾಲೋಚನೆ ನಡೆಸಲು ಬಯಸುತ್ತೇನೆ.'
    : 'Namaskara Srinidhi, I would like to consult with you for planning a holiday itinerary with Inchara Holidays.';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative max-w-2xl w-full bg-[#FBF8F1] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl my-8 flex flex-col"
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
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>{isKn ? 'ನೇರ ಸಂಪರ್ಕ & ಸಮಾಲೋಚನೆ' : 'Direct Advisory & Contact'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white">
              {isKn ? 'ಇಂಚರ ಹಾಲಿಡೇಸ್ ಸಂಪರ್ಕಿಸಿ' : 'Get in Touch with Srinidhi N S'}
            </h2>

            <p className="text-xs sm:text-sm text-white/75 mt-1">
              {isKn
                ? 'ಒಬ್ಬರೇ ನಿರ್ವಾಹಕರಿಂದ ನೇರ ಮಾರ್ಗದರ್ಶನ. ಯಾವುದೇ ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ, ವಿಶ್ವಾಸಾರ್ಹ ಪ್ರವಾಸ ಯೋಜನೆ.'
                : 'Direct personal advisory by the owner-operator. No middle-agents, no robotic scripts — genuine hospitality.'}
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            {/* Solo Operator Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#263F32]/10 shadow-xs flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#162E22] text-[#F5D77F] flex items-center justify-center shrink-0 border border-[#D4AF37]/40 shadow-sm">
                <AmbariElephant className="w-8 h-8" color="#D4AF37" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-[#9E3D28] tracking-widest uppercase">
                  {isKn ? 'ಮಾಲೀಕರು & ಪ್ರಧಾನ ಮಾರ್ಗದರ್ಶಿ' : 'Owner & Lead Curator'}
                </div>
                <h3 className="text-base font-bold text-[#162E22]">
                  Srinidhi N S (ಶ್ರೀನಿಧಿ ಎನ್ ಎಸ್)
                </h3>
                <p className="text-xs text-[#252923]/70 mt-0.5">
                  {isKn
                    ? 'ಪ್ರತಿಯೊಂದು ವಿಚಾರಣೆ, ಕೊಟೇಶನ್ ಮತ್ತು ವಾಹನ ಸಾರಿಗೆಯನ್ನು ಸ್ವತಃ ವೈಯಕ್ತಿಕವಾಗಿ ನಿರ್ವಹಿಸುತ್ತಾರೆ.'
                    : 'Personally oversees every itinerary design, chauffeur dispatch, and vegetarian meal assurance.'}
                </p>
              </div>
            </div>

            {/* Contact Channels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* WhatsApp */}
              <a
                href={getWhatsAppInquiryUrl(waGreeting)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/15 border border-[#25D366]/30 flex items-center gap-3 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#162E22] uppercase tracking-wider">
                    {isKn ? 'ವಾಟ್ಸಾಪ್ ಸಮಾಲೋಚನೆ' : 'Instant WhatsApp'}
                  </div>
                  <div className="text-xs font-semibold text-[#162E22] group-hover:text-[#128C7E] transition-colors">
                    {brandConfig.phoneDisplay}
                  </div>
                  <span className="text-[10px] text-[#252923]/60">
                    {isKn ? 'ಕ್ಷಿಪ್ರ ಪ್ರತಿಕ್ರಿಯೆ' : 'Fastest response'}
                  </span>
                </div>
              </a>

              {/* Direct Call */}
              <a
                href={`tel:${brandConfig.phoneRaw}`}
                className="p-4 rounded-xl bg-white hover:bg-[#F6F3EA] border border-[#263F32]/15 flex items-center gap-3 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#162E22] text-[#F5D77F] flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#9E3D28] uppercase tracking-wider">
                    {isKn ? 'ನೇರ ದೂರವಾಣಿ ಕರೆ' : 'Direct Call Line'}
                  </div>
                  <div className="text-xs font-semibold text-[#162E22] group-hover:text-[#9E3D28] transition-colors">
                    {brandConfig.phoneDisplay}
                  </div>
                  <span className="text-[10px] text-[#252923]/60">
                    8:00 AM – 9:30 PM IST
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${brandConfig.email}`}
                className="p-4 rounded-xl bg-white hover:bg-[#F6F3EA] border border-[#263F32]/15 flex items-center gap-3 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#162E22] text-[#F5D77F] flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-[#9E3D28] uppercase tracking-wider">
                    {isKn ? 'ಇಮೇಲ್ ಪತ್ರವ್ಯವಹಾರ' : 'Official Email'}
                  </div>
                  <div className="text-xs font-semibold text-[#162E22] truncate group-hover:text-[#9E3D28] transition-colors">
                    {brandConfig.email}
                  </div>
                  <span className="text-[10px] text-[#252923]/60">
                    {isKn ? 'ದಾಖಲೆ & ಕೊಟೇಶನ್' : 'For formal proposals'}
                  </span>
                </div>
              </a>

              {/* Business Hours */}
              <div className="p-4 rounded-xl bg-white border border-[#263F32]/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F6F3EA] text-[#162E22] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#252923]/60 uppercase tracking-wider">
                    {isKn ? 'ಕಾರ್ಯನಿರ್ವಹಣಾ ಸಮಯ' : 'Operating Desk Hours'}
                  </div>
                  <div className="text-xs font-semibold text-[#162E22]">
                    Mon – Sun: 8:00 AM – 9:30 PM
                  </div>
                  <span className="text-[10px] text-[#9E3D28] font-medium">
                    24/7 on-tour emergency dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* Office Address */}
            <div className="p-4 rounded-xl bg-[#F6F3EA] border border-[#263F32]/10 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-bold text-[#162E22] uppercase tracking-wider text-[11px]">
                  {isKn ? 'ನೋಂದಾಯಿತ ಕಾರ್ಯಾಲಯ' : 'Registered Office Location'}
                </div>
                <p className="text-[#252923]/80 mt-0.5 leading-relaxed">
                  {isKn ? brandConfig.addressKn : brandConfig.addressEn}
                </p>
                <div className="text-[11px] font-mono text-[#9E3D28] mt-1 font-semibold">
                  Karnataka State Tourism Forum · Reg: {brandConfig.regNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#263F32]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#252923]/60 text-center sm:text-left">
              {isKn ? 'ತ್ವರಿತ ಕೊಟೇಶನ್‌ಗಾಗಿ ಆನ್‌ಲೈನ್ ವಿಚಾರಣೆ ನಮೂನೆ ಬಳಸಿ' : 'Need an itemized quotation? Use our universal form.'}
            </span>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenEnquiry('holidays');
              }}
              className="gold-button !m-0 !py-2.5 !px-5 !text-xs font-bold uppercase tracking-wider flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>{isKn ? 'ವಿಚಾರಣೆ ನಮೂನೆ ತೆರೆಯಿರಿ' : 'Open Enquiry Form'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
