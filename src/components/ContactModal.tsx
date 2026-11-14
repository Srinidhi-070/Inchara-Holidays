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
    ? 'ನಮಸ್ಕಾರ ರವೀಂದ್ರ ಅವರೇ, ಇಂಚರ ಹಾಲಿಡೇಸ್ ಮೂಲಕ ನನ್ನ ಪ್ರವಾಸದ ಯೋಜನೆಗೆ ಸಮಾಲೋಚನೆ ನಡೆಸಲು ಬಯಸುತ್ತೇನೆ.'
    : 'Namaskara Ravindra, I would like to consult with you for planning a holiday itinerary with Inchara Holidays.';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative max-w-lg w-full bg-[#FBF8F1] rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl my-4 sm:my-6 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-[#162E22] text-[#FBF8F1] p-4 sm:p-5 relative shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#F5D77F] uppercase tracking-wider mb-1">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{isKn ? 'ನೇರ ಸಂಪರ್ಕ & ಸಮಾಲೋಚನೆ' : 'Direct Advisory & Contact'}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold font-serif-editorial text-white leading-tight">
              {isKn ? 'ಇಂಚರ ಹಾಲಿಡೇಸ್ ಸಂಪರ್ಕಿಸಿ' : 'Get in Touch with Ravindra S'}
            </h2>

            <p className="text-[11px] sm:text-xs text-white/75 mt-0.5 leading-snug">
              {isKn
                ? 'ಒಬ್ಬರೇ ನಿರ್ವಾಹಕರಿಂದ ನೇರ ಮಾರ್ಗದರ್ಶನ. ಯಾವುದೇ ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲದೆ, ವಿಶ್ವಾಸಾರ್ಹ ಪ್ರವಾಸ ಯೋಜನೆ.'
                : 'Direct personal advisory by the owner-operator. No middle-agents, no robotic scripts — genuine hospitality.'}
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-3.5 sm:p-4 space-y-2.5 sm:space-y-3 overflow-y-auto">
            {/* Solo Operator Card */}
            <div className="p-3 rounded-xl bg-white border border-[#263F32]/10 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#162E22] text-[#F5D77F] flex items-center justify-center shrink-0 border border-[#D4AF37]/40 shadow-xs">
                <AmbariElephant className="w-5 h-5" color="#D4AF37" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold text-[#9E3D28] tracking-widest uppercase">
                  {isKn ? 'ಮಾಲೀಕರು & ಪ್ರಧಾನ ಮಾರ್ಗದರ್ಶಿ' : 'Owner & Lead Curator'}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#162E22] truncate">
                  Ravindra S (ರವೀಂದ್ರ ಎಸ್)
                </h3>
                <p className="text-[10.5px] text-[#252923]/70 mt-0.5 leading-tight">
                  {isKn
                    ? 'ಪ್ರತಿಯೊಂದು ವಿಚಾರಣೆ, ಕೊಟೇಶನ್ ಮತ್ತು ವಾಹನ ಸಾರಿಗೆಯನ್ನು ಸ್ವತಃ ವೈಯಕ್ತಿಕವಾಗಿ ನಿರ್ವಹಿಸುತ್ತಾರೆ.'
                    : 'Personally oversees every itinerary design, chauffeur dispatch, and vegetarian meal assurance.'}
                </p>
              </div>
            </div>

            {/* Contact Channels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {/* WhatsApp */}
              <a
                href={getWhatsAppInquiryUrl(waGreeting)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/15 border border-[#25D366]/30 flex items-center gap-2.5 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-bold text-[#162E22] uppercase tracking-wider">
                    {isKn ? 'ವಾಟ್ಸಾಪ್ ಸಮಾಲೋಚನೆ' : 'Instant WhatsApp'}
                  </div>
                  <div className="text-xs font-semibold text-[#162E22] group-hover:text-[#128C7E] transition-colors truncate">
                    {brandConfig.phoneDisplay}
                  </div>
                  <span className="text-[9px] text-[#252923]/60 block leading-tight">
                    {isKn ? 'ಕ್ಷಿಪ್ರ ಪ್ರತಿಕ್ರಿಯೆ' : 'Fastest response'}
                  </span>
                </div>
              </a>

              {/* Direct Call */}
              <a
                href={`tel:${brandConfig.phoneRaw}`}
                className="p-2.5 rounded-lg bg-white hover:bg-[#F6F3EA] border border-[#263F32]/15 flex items-center gap-2.5 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#162E22] text-[#F5D77F] flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-bold text-[#9E3D28] uppercase tracking-wider">
                    {isKn ? 'ನೇರ ದೂರವಾಣಿ ಕರೆ' : 'Direct Call Line'}
                  </div>
                  <div className="text-xs font-semibold text-[#162E22] group-hover:text-[#9E3D28] transition-colors truncate">
                    {brandConfig.phoneDisplay}
                  </div>
                  <span className="text-[9px] text-[#252923]/60 block leading-tight">
                    8:00 AM – 9:30 PM IST
                  </span>
                </div>
              </a>

              {/* Official Email */}
              <a
                href={`mailto:${brandConfig.email}`}
                className="p-2.5 rounded-lg bg-white border border-[#263F32]/15 hover:border-[#D4AF37]/50 hover:bg-[#F6F3EA]/50 transition-all flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-full bg-[#162E22] text-[#F5D77F] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-bold text-[#9E3D28] uppercase tracking-wider">
                    {isKn ? 'ಅಧಿಕೃತ ಇಮೇಲ್' : 'Official Email'}
                  </div>
                  <div className="text-xs font-semibold text-[#162E22] truncate group-hover:text-[#9E3D28] transition-colors">
                    {brandConfig.email}
                  </div>
                  <span className="text-[9px] text-[#252923]/60 block leading-tight">
                    {isKn ? 'ಪ್ರಸ್ತಾವನೆಗಳು & ವಿಚಾರಣೆಗಳಿಗಾಗಿ' : 'For formal proposals & enquiries'}
                  </span>
                </div>
              </a>

              {/* Business Hours */}
              <div className="p-2.5 rounded-lg bg-white border border-[#263F32]/10 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F6F3EA] text-[#162E22] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-bold text-[#252923]/60 uppercase tracking-wider">
                    {isKn ? 'ಕಾರ್ಯನಿರ್ವಹಣಾ ಸಮಯ' : 'Operating Desk Hours'}
                  </div>
                  <div className="text-xs font-semibold text-[#162E22] truncate">
                    Mon – Sun: 8:00 AM – 9:30 PM
                  </div>
                  <span className="text-[9px] text-[#9E3D28] font-medium block leading-tight">
                    24/7 emergency dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* Bengaluru Operating Desk & Address (Clickable Map Location) */}
            <a
              href={brandConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-lg bg-[#F6F3EA] hover:bg-[#efe9dc] border border-[#263F32]/15 flex items-start justify-between gap-2.5 transition-colors group cursor-pointer"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="text-[11px] min-w-0">
                  <div className="font-bold text-[#162E22] uppercase tracking-wider text-[10px]">
                    {isKn ? 'ಬೆಂಗಳೂರು ಕಾರ್ಯಾಚರಣಾ ವಿಳಾಸ' : 'Bengaluru Operating Desk'}
                  </div>
                  <p className="text-[#252923]/85 mt-0.5 leading-snug">
                    {isKn ? brandConfig.addressKn : brandConfig.addressEn}
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-[#9E3D28] group-hover:text-[#162E22] transition-colors mt-0.5 whitespace-nowrap bg-white/80 px-2 py-1 rounded-md border border-[#9E3D28]/20">
                <span>{isKn ? 'ನಕ್ಷೆ ನೋಡಿ' : 'View on Maps'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </div>

          {/* Footer Actions */}
          <div className="p-3 sm:p-3.5 bg-white border-t border-[#263F32]/10 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <span className="text-[11px] text-[#252923]/65 text-center sm:text-left leading-tight">
              {isKn ? 'ತ್ವರಿತ ಕೊಟೇಶನ್‌ಗಾಗಿ ಆನ್‌ಲೈನ್ ವಿಚಾರಣೆ ನಮೂನೆ ಬಳಸಿ' : 'Need an itemized quotation? Use our universal form.'}
            </span>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenEnquiry('holidays');
              }}
              className="gold-button !m-0 !py-2 !px-4 !text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-full sm:w-auto justify-center rounded-lg shadow-sm"
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
