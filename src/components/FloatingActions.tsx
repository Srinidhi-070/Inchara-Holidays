import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Calendar } from 'lucide-react';
import { Language } from '../types';

interface FloatingActionsProps {
  language: Language;
  onOpenPlanner: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  language,
  onOpenPlanner,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollPercentage(Math.min(100, Math.max(0, progress)));
      setShowScrollTop(scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2"
          >
            {/* Quick Plan button on mobile/desktop floating */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenPlanner}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#162E22] to-[#263F32] text-[#F5D77F] text-xs font-bold shadow-xl hover:brightness-110 transition-all border border-[#D4AF37]/50 cursor-pointer backdrop-blur-xs"
              data-cursor="Plan"
              aria-label={language === 'kn' ? 'ಪ್ರವಾಸ ರೂಪಿಸಿ' : 'Plan Trip'}
            >
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language === 'kn' ? 'ಪ್ರವಾಸ ರೂಪಿಸಿ' : 'Plan Trip'}</span>
            </motion.button>

            {/* Back to top circular button with progress ring */}
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative w-11 h-11 rounded-full bg-[#FBF8F1] text-[#162E22] flex items-center justify-center shadow-lg hover:shadow-xl transition-all border border-[#D4AF37]/40 cursor-pointer group"
              data-cursor="Top"
              aria-label={language === 'kn' ? 'ಮೇಲಕ್ಕೆ ಹೋಗಿ' : 'Back to top'}
            >
              {/* SVG circular progress ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  className="stroke-[#263F32]/15"
                  strokeWidth="2"
                  fill="transparent"
                />
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  className="stroke-[#D4AF37] transition-all duration-150"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <ArrowUp className="w-4 h-4 text-[#162E22] group-hover:text-[#D4AF37] transition-colors relative z-10" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
