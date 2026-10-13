import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X, Send, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  language,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(language === 'kn' ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ.' : 'Please enter your name.');
      return;
    }
    if (!phoneOrEmail.trim()) {
      setError(
        language === 'kn'
          ? 'ದಯವಿಟ್ಟು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಥವಾ ಇಮೇಲ್ ನಮೂದಿಸಿ.'
          : 'Please enter a contact phone number or email.'
      );
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setPhoneOrEmail('');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-xs" onClick={onClose} />

      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-lg bg-[#F6F3EA] rounded-2xl shadow-2xl overflow-hidden border border-[#263F32]/15 text-[#252923] max-h-[92dvh] flex flex-col my-4">
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 sm:py-5 bg-[#263F32] text-[#F6F3EA] flex items-center justify-between shrink-0">
            <div>
              <h3 className="font-bold font-serif-editorial text-lg text-[#F6F3EA]">
                {language === 'kn' ? 'ಇಂಚಾರಾ ಹಾಲಿಡೇಸ್ ಸಂಪರ್ಕಿಸಿ' : 'Contact Inchara Holidays'}
              </h3>
              <p className="text-xs text-[#AAB69A]">
                {t.brandName} · {t.tagline}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-white/10 text-white/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#263F32]/10 text-[#263F32] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-serif-editorial text-[#263F32]">
                  {language === 'kn' ? 'ಧನ್ಯವಾದಗಳು!' : 'Message Received with Warmth'}
                </h4>
                <p className="text-xs sm:text-sm text-[#252923]/75 max-w-sm mx-auto leading-relaxed">
                  {language === 'kn'
                    ? 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ನಮ್ಮ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.'
                    : 'Your enquiry has been noted in our sample prototype. One of our dedicated journey partners will reach out shortly.'}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-md bg-[#263F32] text-[#F6F3EA] text-xs font-semibold hover:bg-[#1f3328] transition-colors"
                  >
                    {t.modal.close}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-[#252923]/75 leading-relaxed">
                  {language === 'kn'
                    ? 'ಪ್ರವಾಸದ ದಿನಾಂಕಗಳು, ವಾಹನ ಅಗತ್ಯತೆಗಳು ಅಥವಾ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೂ ನಮಗೆ ತಿಳಿಸಿ.'
                    : 'Have questions about routes, estate homestays, or customized group plans? Leave a note below.'}
                </p>

                {error && (
                  <div className="p-2.5 rounded-md bg-[#B96F50]/15 text-[#B96F50] text-xs font-medium border border-[#B96F50]/30">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#263F32] mb-1">
                    {t.planner.fullName} *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'kn' ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Your name'}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-xs text-[#252923] focus:outline-none focus:ring-1 focus:ring-[#263F32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#263F32] mb-1">
                    {language === 'kn' ? 'ಮೊಬೈಲ್ / ವಾಟ್ಸಾಪ್ ಅಥವಾ ಇಮೇಲ್ *' : 'Phone / WhatsApp or Email *'}
                  </label>
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="+91 98765 43210 or yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-xs text-[#252923] focus:outline-none focus:ring-1 focus:ring-[#263F32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#263F32] mb-1">
                    {language === 'kn' ? 'ನಿಮ್ಮ ಸಂದೇಶ / ಪ್ರಶ್ನೆ' : 'Your Message / Travel Question'}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      language === 'kn'
                        ? 'ಯಾವ ತಾಣಕ್ಕೆ ಪ್ರಯಾಣಿಸಲು ಇಷ್ಟಪಡುತ್ತೀರಿ? ಎಷ್ಟು ದಿನಗಳ ರಜೆ?'
                        : 'Which destination are you considering, and when would you like to travel?'
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#263F32]/20 bg-white text-xs text-[#252923] focus:outline-none focus:ring-1 focus:ring-[#263F32]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-md border border-[#263F32]/20 text-xs font-semibold text-[#252923] hover:bg-[#263F32]/5"
                  >
                    {t.modal.close}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-md bg-[#263F32] text-[#F6F3EA] hover:bg-[#1f3328] text-xs font-semibold flex items-center gap-2 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-[#B96F50]" />
                    <span>{language === 'kn' ? 'ಸಂದೇಶ ಕಳುಹಿಸಿ' : 'Send Enquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
