"use client";
import { type ReactNode, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "../lib/motion-tokens";

// Card with a cursor-following radial sheen + lift. The sheen is a CSS var updated on move.
export function SpotlightCard({
  children,
  className,
  style,
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  lift?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      className={`spotlight ${className ?? ""}`}
      style={style}
      onMouseMove={onMove}
      whileHover={reduce || !lift ? undefined : { y: -6 }}
      transition={springs.snappy}
    >
      <span className="spotlight__sheen" aria-hidden />
      <div className="spotlight__inner">{children}</div>
    </motion.div>
  );
}
