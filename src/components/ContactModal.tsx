import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { translations } from '../data/translations';
import { X, Send, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { Mark } from './Header';

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            onClick={onClose}
          />

          <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#fbf8f1] rounded-none shadow-2xl overflow-hidden border border-[#d4af37]/35 text-[#17261e] max-h-[92dvh] flex flex-col my-4"
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
                        {language === 'kn' ? 'ನೇರ ಸಂಪರ್ಕ' : 'DIRECT CONCIERGE'}
                      </span>
                    </div>
                    <h3 className="font-normal font-serif text-xl sm:text-2xl text-white tracking-tight leading-tight">
                      {language === 'kn' ? 'ಇಂಚರ ಹಾಲಿಡೇಸ್ ಸಂಪರ್ಕಿಸಿ' : 'Contact Inchara Holidays'}
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

              <div className="p-6 sm:p-8 relative bg-[#fbf8f1] overflow-y-auto modal-scroll-pane">
                {submitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-none bg-[#263F32]/10 text-[#263F32] flex items-center justify-center mx-auto border border-[#263F32]/20">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-normal font-serif text-[#162e22]">
                      {language === 'kn' ? 'ಧನ್ಯವಾದಗಳು!' : 'Message Received with Warmth'}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5b675f] max-w-sm mx-auto leading-relaxed">
                      {language === 'kn'
                        ? 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ನಮ್ಮ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.'
                        : 'Your enquiry has been received. One of our dedicated journey partners will reach out shortly.'}
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="button button-dark !min-h-[2.5rem] !px-5 text-xs mx-auto rounded-none"
                      >
                        {t.modal.close}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-xs text-[#5b675f] leading-relaxed">
                      {language === 'kn'
                        ? 'ಪ್ರವಾಸದ ದಿನಾಂಕಗಳು, ವಾಹನ ಅಗತ್ಯತೆಗಳು ಅಥವಾ ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳಿದ್ದರೂ ನಮಗೆ ತಿಳಿಸಿ.'
                        : 'Have questions about routes, estate homestays, or customized group plans? Leave a note below.'}
                    </p>

                    {error && (
                      <div className="p-2.5 rounded-none bg-[#9e3d28]/10 text-[#9e3d28] text-xs font-medium border border-[#9e3d28]/30">
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b675f] mb-1">
                        {t.planner.fullName} *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={language === 'kn' ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Your name'}
                        className="w-full px-3.5 py-2.5 rounded-none border border-[#c9c5b9] bg-[#fffdf7] text-xs text-[#17261e] focus:outline-none focus:border-[#263f32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b675f] mb-1">
                        {language === 'kn' ? 'ಮೊಬೈಲ್ / ವಾಟ್ಸಾಪ್ ಅಥವಾ ಇಮೇಲ್ *' : 'Phone / WhatsApp or Email *'}
                      </label>
                      <input
                        type="text"
                        value={phoneOrEmail}
                        onChange={(e) => setPhoneOrEmail(e.target.value)}
                        placeholder="+91 98765 43210 or yourname@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-none border border-[#c9c5b9] bg-[#fffdf7] text-xs text-[#17261e] focus:outline-none focus:border-[#263f32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#5b675f] mb-1">
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
                        className="w-full px-3.5 py-2.5 rounded-none border border-[#c9c5b9] bg-[#fffdf7] text-xs text-[#17261e] focus:outline-none focus:border-[#263f32]"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="button button-outline !text-[#162e22] !border-[#c9c5b9] hover:!bg-[#162e22] hover:!text-white !min-h-[2.5rem] !px-4 text-xs rounded-none"
                      >
                        {t.modal.close}
                      </button>
                      <button
                        type="submit"
                        className="button button-dark !min-h-[2.5rem] !px-5 text-xs flex items-center gap-2 rounded-none"
                      >
                        <Send className="w-3.5 h-3.5 text-[#f5d77f]" />
                        <span>{language === 'kn' ? 'ಸಂದೇಶ ಕಳುಹಿಸಿ' : 'Send Enquiry'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
