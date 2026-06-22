'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

const PARTS = /^(\D*)(\d[\d,]*)(.*)$/;
const DURATION = 1200;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts an embedded integer up to its target when scrolled into view.
 * Preserves any non-numeric prefix/suffix (e.g. "~80" → counts "80").
 * Jumps straight to the value under prefers-reduced-motion.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = value.match(PARTS);

  const prefix = match?.[1] ?? '';
  const target = match ? Number(match[2].replace(/,/g, '')) : NaN;
  const suffix = match?.[3] ?? '';
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!match || Number.isNaN(target)) return;
    if (!inView) return;
    if (reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / DURATION);
      setN(Math.round(easeOut(p) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, match, target, reduce]);

  if (!match || Number.isNaN(target)) {
    return <span className={className}>{value}</span>;
  }
  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
