"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { springs } from "../lib/motion-tokens";

// Word-by-word blur+rise reveal for headlines. Reduced motion → plain fade, no blur/transform.
export function BlurText({
  text,
  className,
  accentWords = [],
  delay = 0,
  inView = false,
}: {
  text: string;
  className?: string;
  accentWords?: string[];
  delay?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const parent: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 26, filter: "blur(12px)" },
    show: reduce
      ? { opacity: 1 }
      : { opacity: 1, y: 0, filter: "blur(0px)", transition: springs.gentle },
  };

  const animateProps = inView
    ? { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } }
    : { animate: "show" as const };

  return (
    <motion.span className={className} variants={parent} initial="hidden" {...animateProps}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ display: "inline-block", marginRight: "0.26em", willChange: "transform, filter" }}
          className={accentWords.includes(w.replace(/[.,]/g, "")) ? "brand" : undefined}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}
