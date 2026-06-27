import type { Variants, Transition } from 'motion/react';

/** Calm, no-bounce easing shared across the site (matches Tailwind ease-nx). */
export const EASE_NX = [0.22, 1, 0.36, 1] as const;

/** Springy settle (slight overshoot) — gives reveals tactile life without bouncing. */
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const;

export const T_BASE: Transition = { duration: 0.55, ease: EASE_NX };

/**
 * Single element: fade + rise with a hair of scale and a springy settle.
 * Used everywhere via <Reveal> / <Stagger>, so this one tune lifts the whole site.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_SPRING } },
};

/** Larger entrance for hero lines. */
export const fadeUpLg: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.66, ease: EASE_SPRING } },
};

/** Stronger "pop" for cards/tiles — more overshoot, slightly longer travel. */
export const pop: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_SPRING } },
};

/** Parent that staggers its children's reveals. */
export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Default in-view trigger config: once, a little before fully on screen. */
export const inView = { once: true, amount: 0.3, margin: '0px 0px -10% 0px' } as const;
