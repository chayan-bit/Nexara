import type { Variants, Transition } from 'motion/react';

/** Calm, no-bounce easing shared across the site (matches Tailwind ease-nx). */
export const EASE_NX = [0.22, 1, 0.36, 1] as const;

export const T_BASE: Transition = { duration: 0.6, ease: EASE_NX };

/** Single element: fade + 12px rise. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: T_BASE },
};

/** Larger entrance for hero lines. */
export const fadeUpLg: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_NX } },
};

/** Parent that staggers its children's reveals. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Default in-view trigger config: once, a little before fully on screen. */
export const inView = { once: true, amount: 0.3, margin: '0px 0px -10% 0px' } as const;
