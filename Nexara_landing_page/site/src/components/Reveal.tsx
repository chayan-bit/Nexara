"use client";
import { type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { motionTokens, springs } from "../lib/motion-tokens";

const VIEWPORT = { once: true, amount: 0.3 } as const;

type Dir = "up" | "down" | "left" | "right" | "none";

const offset = (dir: Dir, d: number, reduce: boolean) => {
  if (reduce || dir === "none") return { x: 0, y: 0 };
  switch (dir) {
    case "up": return { x: 0, y: d };
    case "down": return { x: 0, y: -d };
    case "left": return { x: d, y: 0 };
    case "right": return { x: -d, y: 0 };
  }
};

export function Reveal({
  children,
  dir = "up",
  delay = 0,
  distance = motionTokens.distance.lg,
  className,
  as = "div",
}: {
  children: ReactNode;
  dir?: Dir;
  delay?: number;
  distance?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const o = offset(dir, distance, !!reduce);
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...o }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...springs.gentle, delay }}
    >
      {children}
    </MotionTag>
  );
}

// Stagger container — children use the `staggerItem` variants below.
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: motionTokens.distance.md },
  show: { opacity: 1, y: 0, transition: springs.gentle },
};

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
