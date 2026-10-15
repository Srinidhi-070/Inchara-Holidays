import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 pointer-events-none bg-transparent">
      <motion.div
        style={{ scaleX, transformOrigin: '0%' }}
        className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#9E3D28] shadow-sm"
      />
    </div>
  );
};
