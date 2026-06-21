"use client";
import { motion } from "motion/react";
import { FOUNDATION_SPECS, PRINCIPLES } from "../data";
import { springs } from "../lib/motion-tokens";
import { Stagger, staggerItem, Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

export function Foundations() {
  return (
    <section id="foundations" className="section">
      <div className="wrap">
        <SectionHeading eyebrow="Foundations" title={<>Restraint is the <span className="brand">system.</span></>}>
          An 8px spine, hairline borders over heavy shadow, and five cross-surface principles that keep a
          consumer app and an enterprise dashboard speaking the same language.
        </SectionHeading>

        <div className="grid grid-2" style={{ alignItems: "start" }}>
          <div className="card foundation-grid" style={{ padding: 8 }}>
            {FOUNDATION_SPECS.map((f, i) => (
              <motion.div key={f.k} className="foundation-row"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }} transition={{ ...springs.gentle, delay: i * 0.05 }}>
                <span className="k t-label">{f.k}</span>
                <span className="t-body muted">{f.v}</span>
              </motion.div>
            ))}
          </div>

          <Stagger className="grid grid-2">
            {PRINCIPLES.map((p, i) => (
              <motion.div key={p.t} variants={staggerItem} className="card principle">
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h4>{p.t}</h4>
                <p className="t-body muted">{p.d}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>

        <Reveal dir="up">
          <div className="thread__caption" style={{ marginTop: 40 }}>
            <p className="t-body">
              <strong>Positioning guardrails:</strong> not a diagnosis engine (decision support,
              human-in-the-loop) · not a walled garden (FHIR-native, EHR-embedded) · not patient-billed
              (free at point of use; five B2B buyers pay).
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
