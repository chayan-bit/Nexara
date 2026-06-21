"use client";
import { motion } from "motion/react";
import { SWATCHES, STATUS, TYPE_RAMP } from "../data";
import { springs } from "../lib/motion-tokens";
import { Stagger, staggerItem, Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

export function Brand() {
  return (
    <section id="brand" className="section" style={{ background: "var(--nx-bg-subtle)" }}>
      <div className="wrap">
        <SectionHeading eyebrow="Brand & Tokens" title={<>Color carries meaning, <span className="brand">never decoration.</span></>}>
          Brand teal is chrome and actions; status colors are clinical signal — always paired with icon
          and label, never color alone. Values are one source of truth: Figma variables, CSS, Tailwind.
        </SectionHeading>

        <h3 className="t-overline muted" style={{ marginBottom: 16 }}>Core palette</h3>
        <Stagger className="grid grid-4">
          {SWATCHES.map((s) => (
            <motion.div key={s.token} variants={staggerItem} className="swatch"
              whileHover={{ y: -4 }} transition={springs.snappy}>
              <div className="swatch__chip" style={{ background: `var(${s.token})` }}>
                <span className="hex" style={{ color: s.onDark ? "#fff" : "var(--nx-charcoal-900)" }}>{s.hex}</span>
              </div>
              <div className="swatch__meta">
                <div className="swatch__name">{s.name}</div>
                <div className="swatch__role">{s.role}</div>
              </div>
            </motion.div>
          ))}
        </Stagger>

        <Reveal dir="up">
          <div className="status-row">
            {STATUS.map((s) => (
              <span key={s.token} className="status-chip"
                style={{ background: `color-mix(in srgb, var(${s.token}) 12%, white)`, color: `var(${s.token})` }}>
                <span className="dot" style={{ background: `var(${s.token})` }} />
                {s.name} · {s.hex}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-2" style={{ marginTop: 56, alignItems: "start" }}>
          <div>
            <h3 className="t-overline muted" style={{ marginBottom: 16 }}>Type scale · Inter</h3>
            <div className="card" style={{ padding: "8px 22px" }}>
              {TYPE_RAMP.map((r, i) => (
                <motion.div key={r.name} className="ramp-row"
                  initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }} transition={{ ...springs.gentle, delay: i * 0.04 }}>
                  <span className={r.className}>{r.sample}</span>
                  <span className="meta t-caption"><span className="n">{r.name}</span>{r.spec}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="t-overline muted" style={{ marginBottom: 16 }}>Voice & tone</h3>
            <Stagger className="grid" >
              {[
                { who: "Patient", how: "Plain, warm, reassuring, jargon-free — never alarmist." },
                { who: "Clinician", how: "Terse, factual, context-first — lead with why this patient, why now." },
                { who: "Payer", how: "Outcome- and dollar-anchored — PDC, Star Ratings, readmissions, completion." },
              ].map((v) => (
                <motion.div key={v.who} variants={staggerItem} className="card" style={{ padding: 20 }}>
                  <div className="t-overline brand">{v.who}</div>
                  <p className="t-body" style={{ marginTop: 6 }}>{v.how}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
