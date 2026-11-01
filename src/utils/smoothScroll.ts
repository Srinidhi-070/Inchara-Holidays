/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Global variable to track active animation frame and permit interruption
let activeScrollAnimationId: number | null = null;

// Cubic bezier ease-in-out easing function: smooth start, brisk glide, soft deceleration
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Alternative luxury quintic easing for ultra-smooth cinematic scrolls
const easeInOutQuart = (t: number): number => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
};

export interface SmoothScrollOptions {
  /** Offset in pixels from top of element (e.g. for fixed header). Defaults to auto-calculated header height + breathing room */
  offset?: number;
  /** Explicit duration in ms. If omitted, dynamically calculated based on distance (650ms - 950ms) */
  duration?: number;
  /** Callback executed when the scroll animation completes */
  onComplete?: () => void;
}

/**
 * Resolves section ID aliases to their corresponding DOM elements
 */
export const resolveTargetElement = (target: string): HTMLElement | null => {
  const cleanId = target.replace(/^#/, '');

  if (cleanId === 'top') {
    return document.getElementById('top') || document.body;
  }

  // Check direct ID match
  const direct = document.getElementById(cleanId);
  if (direct) return direct;

  // Semantic alias mapping
  const aliasMap: Record<string, string[]> = {
    experiences: ['experiences', 'journeys', 'service-packages'],
    journeys: ['journeys', 'experiences'],
    destinations: ['destinations', 'destination-discovery'],
    corporate: ['service-corporate', 'services'],
    catering: ['service-catering', 'services'],
    school: ['service-school', 'services'],
    services: ['services', 'service-packages'],
    difference: ['difference', 'our-story'],
    planner: ['planner', 'planner-teaser'],
    stories: ['stories', 'testimonials'],
    footer: ['footer'],
  };

  const candidates = aliasMap[cleanId] || [cleanId];
  for (const id of candidates) {
    const el = document.getElementById(id);
    if (el) return el;
  }

  return null;
};

/**
 * High-performance smooth scrolling engine using requestAnimationFrame.
 * Replaces native browser scrollIntoView which frequently teleports or clips
 * on mobile and Windows devices.
 */
export const smoothScrollTo = (
  target: string | HTMLElement | number,
  options: SmoothScrollOptions = {}
): void => {
  if (typeof window === 'undefined') return;

  // Cancel any ongoing scroll animation immediately
  if (activeScrollAnimationId !== null) {
    cancelAnimationFrame(activeScrollAnimationId);
    activeScrollAnimationId = null;
  }

  const startY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  let targetY = 0;

  if (typeof target === 'number') {
    targetY = target;
  } else if (target === 'top' || target === '#top') {
    targetY = 0;
  } else {
    const element = typeof target === 'string' ? resolveTargetElement(target) : target;
    if (!element) {
      console.warn(`[smoothScrollTo] Target element not found:`, target);
      return;
    }

    if (element === document.body || element.id === 'top') {
      targetY = 0;
    } else {
      const rect = element.getBoundingClientRect();
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
      
      // Calculate dynamic header height clearance
      const headerEl = document.querySelector('.header') as HTMLElement | null;
      const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 80;
      
      // Breathing room below the fixed header (16px on mobile, 24px on desktop)
      const breathingRoom = window.innerWidth <= 768 ? 16 : 24;
      const effectiveOffset = options.offset !== undefined ? options.offset : (headerHeight + breathingRoom);

      targetY = Math.max(0, currentScroll + rect.top - effectiveOffset);
    }
  }

  // Ensure target does not exceed max document scroll boundary
  const docHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight
  );
  const maxScroll = Math.max(0, docHeight - window.innerHeight);
  targetY = Math.min(targetY, maxScroll);

  const distance = Math.abs(targetY - startY);

  // If distance is negligible, jump directly and finish
  if (distance < 4) {
    window.scrollTo(0, targetY);
    options.onComplete?.();
    return;
  }

  // Compute luxury travel duration based on distance:
  // Short scrolls (e.g. 400px): ~650ms
  // Long scrolls (e.g. 3000px): ~950ms
  const computedDuration = options.duration || Math.min(950, Math.max(650, distance * 0.32));
  let startTime: number | null = null;

  // Cleanup listeners on user manual intervention (touch or mousewheel)
  const cancelOnUserInteraction = () => {
    if (activeScrollAnimationId !== null) {
      cancelAnimationFrame(activeScrollAnimationId);
      activeScrollAnimationId = null;
    }
    removeListeners();
  };

  const removeListeners = () => {
    window.removeEventListener('wheel', cancelOnUserInteraction);
    window.removeEventListener('touchmove', cancelOnUserInteraction);
    window.removeEventListener('keydown', cancelOnUserInteraction);
  };

  window.addEventListener('wheel', cancelOnUserInteraction, { passive: true });
  window.addEventListener('touchmove', cancelOnUserInteraction, { passive: true });
  window.addEventListener('keydown', cancelOnUserInteraction, { passive: true });

  const step = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / computedDuration, 1);

    // Use gentle Quartic easing for that velvety luxury editorial glide
    const eased = easeInOutQuart(progress);
    const newY = startY + (targetY - startY) * eased;

    window.scrollTo(0, newY);

    if (progress < 1) {
      activeScrollAnimationId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
      activeScrollAnimationId = null;
      removeListeners();
      options.onComplete?.();
    }
  };

  activeScrollAnimationId = requestAnimationFrame(step);
};
