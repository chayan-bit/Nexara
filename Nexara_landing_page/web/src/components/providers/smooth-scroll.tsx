'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'motion/react';
import { setLenis } from '@/lib/lenis-store';

/**
 * Lenis smooth scroll, synced with GSAP ScrollTrigger so scroll-driven
 * sequences stay frame-accurate. Disabled entirely under prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Expose for smooth anchor navigation from nav/hero/cta.
    setLenis(lenis);

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Bridge to GSAP ScrollTrigger if present (hero line draw, parallax).
    let detach: (() => void) | undefined;
    import('gsap')
      .then(async ({ gsap }) => {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
        const onScroll = () => ScrollTrigger.update();
        lenis.on('scroll', onScroll);
        gsap.ticker.lagSmoothing(0);
        detach = () => lenis.off('scroll', onScroll);
      })
      .catch(() => {});

    return () => {
      cancelAnimationFrame(rafId);
      detach?.();
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
