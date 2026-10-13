import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for the outer follower ring
  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktops/laptops with mouse/trackpad)
    // Never hijack or obstruct touch devices (smartphones, tablets)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    mediaQuery.addEventListener?.('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Inspect target element for interactive states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, input, select, textarea, [role="button"], [data-cursor], .cursor-pointer'
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHoveringClickable(true);
        const customBadge = interactiveEl.getAttribute('data-cursor');
        setHoverLabel(customBadge || null);
      } else {
        setIsHoveringClickable(false);
        setHoverLabel(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener?.('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // If touch device or reduced motion is preferred, don't render custom cursor
  if (!isPointerDevice || shouldReduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300" style={{ opacity: isVisible ? 1 : 0 }}>
      {/* Outer Follower Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hoverLabel ? 1.8 : isHoveringClickable ? 1.5 : 1,
          borderColor: isHoveringClickable ? '#B96F50' : 'rgba(38, 63, 50, 0.45)',
          backgroundColor: hoverLabel
            ? 'rgba(38, 63, 50, 0.92)'
            : isHoveringClickable
            ? 'rgba(185, 111, 80, 0.12)'
            : 'rgba(246, 243, 234, 0.05)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="w-9 h-9 rounded-full border border-[#263F32]/45 backdrop-blur-[1px] flex items-center justify-center shadow-xs"
      >
        {hoverLabel && (
          <span className="text-[8px] font-semibold tracking-wider uppercase text-[#F6F3EA] px-1 font-serif-editorial select-none">
            {hoverLabel}
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHoveringClickable ? 0.4 : 1,
          backgroundColor: isHoveringClickable ? '#B96F50' : '#263F32',
        }}
        transition={{ duration: 0.15 }}
        className="w-2 h-2 rounded-full shadow-xs"
      />
    </div>
  );
};
