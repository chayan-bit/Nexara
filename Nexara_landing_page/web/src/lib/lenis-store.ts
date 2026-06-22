import type Lenis from 'lenis';

/** Module singleton so nav/hero/cta can drive Lenis without a global. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

/** Smooth-scroll to a selector; falls back to native if Lenis is unavailable. */
export function scrollToId(href: string, offset = -80) {
  const el = document.querySelector(href);
  if (!el) return;
  if (instance) instance.scrollTo(el as HTMLElement, { offset });
  else el.scrollIntoView({ behavior: 'smooth' });
}
