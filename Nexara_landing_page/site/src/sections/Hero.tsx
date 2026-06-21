"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { springs, motionTokens } from "../lib/motion-tokens";
import { Aurora } from "../components/Aurora";
import { BlurText } from "../components/BlurText";
import { MagneticButton } from "../components/MagneticButton";
import { Counter } from "../components/Counter";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.04, reduce ? 1.04 : 1.14]);
  const chipY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  const float = (delay: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -8, 0] },
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay },
        };

  return (
    <header id="top" className="hero" ref={ref}>
      <Aurora />
      <div className="hero__grid-overlay" />
      <div className="wrap hero__inner">
        <div>
          <motion.span
            className="eyebrow t-overline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.05 }}
          >
            <span className="dot" />
            Product Design System · v1.0
          </motion.span>

          <h1 className="hero__title t-display">
            <BlurText
              text="The intelligent healthcare continuity ecosystem"
              accentWords={["intelligent", "ecosystem"]}
              delay={0.12}
            />
          </h1>

          <motion.p
            className="hero__sub t-body-l muted"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.55 }}
          >
            Connecting every link in the care chain — from first symptom to long-term adherence.
            One living record, four intelligent layers acting on it.
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.gentle, delay: 0.65 }}
          >
            <MagneticButton href="#vision" className="btn btn--primary">Explore the system</MagneticButton>
            <MagneticButton href="#brand" className="btn btn--secondary">Brand & tokens</MagneticButton>
          </motion.div>

          <motion.div
            className="hero__meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: motionTokens.duration.slow }}
          >
            <div>
              <div className="k"><span className="grad-text"><Counter to={4} /></span></div>
              <div className="t-caption muted">intelligent layers</div>
            </div>
            <div>
              <div className="k"><span className="grad-text"><Counter to={5} /></span></div>
              <div className="t-caption muted">B2B buyers · free to patients</div>
            </div>
            <div>
              <div className="k"><span className="grad-text"><Counter to={1} /></span></div>
              <div className="t-caption muted">longitudinal record</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero__showcase"
          initial={{ opacity: 0, scale: 0.95, y: reduce ? 0 : 26 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...springs.gentle, delay: 0.3 }}
        >
          <motion.img
            src="/assets/hero-network.jpg"
            alt="Nexara — a connected network of care nodes spanning the globe"
            style={{ y: imgY, scale: imgScale }}
          />
          <div className="hero__showcase-glow" />

          <motion.div className="float-chip glass--dark float-chip--tl" style={{ y: chipY }} {...float(0)}>
            <span className="v teal">FHIR-native</span>
            <span className="l">EHR-embedded</span>
          </motion.div>
          <motion.div className="float-chip glass--dark float-chip--ml" {...float(1.2)}>
            <span className="v">87%</span>
            <span className="l">medication adherence</span>
          </motion.div>
          <motion.div className="float-chip glass--dark float-chip--br" style={{ y: chipY }} {...float(0.6)}>
            <span className="v">Golden Thread</span>
            <span className="l">one living record</span>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
