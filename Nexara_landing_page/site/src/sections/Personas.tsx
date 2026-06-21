"use client";
import { motion } from "motion/react";
import { PERSONAS } from "../data";
import { staggerParent, staggerItem } from "../components/Reveal";
import { SpotlightCard } from "../components/SpotlightCard";
import { SectionHeading } from "../components/SectionHeading";

// First persona spans 2 cols for an asymmetric bento rhythm.
export function Personas() {
  return (
    <section id="personas" className="section">
      <div className="wrap">
        <SectionHeading eyebrow="Personas → Surfaces" title={<>One ecosystem, <span className="grad-text">four surfaces.</span></>}>
          The shared component library scales from consumer-grade mobile to enterprise BI without losing
          coherence. The teal/whitespace system reads as both reassuring and credible.
        </SectionHeading>

        <motion.div className="bento" variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {PERSONAS.map((p, i) => (
            <motion.div key={p.role} variants={staggerItem} className={i === 0 ? "b-wide" : ""}>
              <SpotlightCard className="persona" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
                <span className="persona__bar" style={{ background: p.accent }} />
                <div className="persona__role">{p.role}</div>
                <p className="persona__job t-body muted">{p.job}</p>
                <div className="persona__foot">
                  <span className="t-overline brand">{p.surface}</span>
                  <span className="t-caption muted">“Good” feels like: {p.good}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
