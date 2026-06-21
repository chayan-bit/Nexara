"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SCREENS } from "../data";
import { springs } from "../lib/motion-tokens";
import { SectionHeading } from "../components/SectionHeading";

function BrowserFrame({ src, alt, addr }: { src: string; alt: string; addr: string }) {
  return (
    <div className="screen__frame">
      <div className="screen__bar">
        <span className="d" style={{ background: "#E0A100" }} />
        <span className="d" style={{ background: "#1E9E6A" }} />
        <span className="d" style={{ background: "#D64545" }} />
        <span className="addr">{addr}</span>
      </div>
      <img src={src} alt={alt} />
    </div>
  );
}

function Screen({ screen, index }: { screen: (typeof SCREENS)[number]; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 50, reduce ? 0 : -50]);
  const flip = index % 2 === 1;

  return (
    <div className={`screen ${flip ? "screen--flip" : ""}`} ref={ref}>
      <motion.div
        className="screen__media"
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
        initial={{ opacity: 0, scale: 0.95, y: reduce ? 0 : 28 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ...springs.gentle }}
      >
        <motion.div style={{ y }}>
          {screen.portrait ? (
            <div className="screen__phone">
              <img src={screen.img} alt={`${screen.label} — ${screen.title}`} />
            </div>
          ) : (
            <BrowserFrame src={screen.img} alt={`${screen.label} — ${screen.title}`} addr={`nexara.health / ${screen.id}`} />
          )}
        </motion.div>
      </motion.div>

      <div>
        <span className="t-overline brand">{screen.label}</span>
        <h3 className="t-h2" style={{ margin: "8px 0 6px" }}>{screen.title}</h3>
        <span className="t-caption muted">{screen.frame}</span>
        <div className="screen__points">
          {screen.points.map((p, i) => (
            <motion.div key={i} className="screen__point"
              initial={{ opacity: 0, x: flip ? 16 : -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }} transition={{ ...springs.gentle, delay: i * 0.06 }}>
              <span className="tick">{i + 1}</span>
              <p className="t-body">{p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Screens() {
  return (
    <section id="screens" className="section" style={{ background: "var(--nx-bg-subtle)" }}>
      <div className="wrap">
        <SectionHeading eyebrow="Screens" title={<>From symptom to <span className="grad-text">Star rating.</span></>}>
          Three surfaces, one data spine. Each scrolls with light parallax — motion that preserves spatial
          continuity as you move through the care chain.
        </SectionHeading>
        {SCREENS.map((s, i) => (
          <Screen key={s.id} screen={s} index={i} />
        ))}
      </div>
    </section>
  );
}
