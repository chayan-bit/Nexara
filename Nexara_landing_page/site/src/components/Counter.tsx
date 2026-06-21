"use client";
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";

// Count-up that fires once on scroll-in. Respects reduced motion (renders final value).
export function Counter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 90, damping: 22, restDelta: 0.001 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
      return;
    }
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
    });
  }, [spring, prefix, suffix, decimals, reduce, to]);

  return <span ref={ref} className={className}>{`${prefix}${(0).toFixed(decimals)}${suffix}`}</span>;
}
