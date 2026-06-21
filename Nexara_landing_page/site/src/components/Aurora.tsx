"use client";
import { motion, useReducedMotion } from "motion/react";

// Soft teal/mint aurora — brand-coloured, not the generic purple blob. Drifts slowly.
const BLOBS = [
  { c: "rgba(63,191,182,0.55)", w: 460, h: 460, top: "-8%", left: "4%", dur: 18, x: 40, y: 30 },
  { c: "rgba(14,124,123,0.45)", w: 520, h: 520, top: "10%", left: "52%", dur: 22, x: -50, y: 40 },
  { c: "rgba(230,244,243,0.9)", w: 400, h: 400, top: "32%", left: "26%", dur: 26, x: 30, y: -40 },
];

export function Aurora() {
  const reduce = useReducedMotion();
  return (
    <div className="aurora" aria-hidden>
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="aurora__blob"
          style={{ background: b.c, width: b.w, height: b.h, top: b.top, left: b.left }}
          animate={reduce ? undefined : { x: [0, b.x, 0], y: [0, b.y, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
