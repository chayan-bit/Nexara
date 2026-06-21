"use client";
import { motion, useReducedMotion } from "motion/react";

const ITEMS = [
  "FHIR-native", "EHR-embedded", "Human-in-the-loop", "Free at point of use",
  "Auditable by design", "WCAG AA", "RPM billing-ready", "Decision support, not diagnosis",
];

export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee" aria-hidden>
      <motion.div
        className="marquee__track"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {row.map((t, i) => (
          <span className="marquee__item" key={i}>
            <span className="dot" />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
