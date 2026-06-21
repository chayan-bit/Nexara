"use client";
import { useReducedMotion } from "motion/react";

// Accessibility-compliant enter/exit: transforms drop to 0 under reduced motion.
export function useSafeMotion(fullY = 16) {
  const reduce = useReducedMotion();
  return {
    initial: { opacity: 0, y: reduce ? 0 : fullY },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: reduce ? 0 : -fullY },
  };
}
