"use client";
import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { springs, motionTokens } from "../lib/motion-tokens";

// Button/link that leans toward the cursor — high-signal tactility, disabled under reduced motion.
export function MagneticButton({
  children,
  href,
  className,
  strength = 0.4,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springs.release);
  const sy = useSpring(y, springs.release);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={{ scale: motionTokens.scale.pop }}
      whileTap={{ scale: motionTokens.scale.press }}
      transition={springs.snappy}
    >
      {children}
    </motion.a>
  );
}
