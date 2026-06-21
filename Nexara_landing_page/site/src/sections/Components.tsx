"use client";
import { motion } from "motion/react";
import { springs, motionTokens } from "../lib/motion-tokens";
import { Stagger, staggerItem } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";

const STATUS_BADGES = [
  { tone: "success", label: "Adherent" },
  { tone: "warning", label: "Due soon" },
  { tone: "danger", label: "Urgent" },
  { tone: "info", label: "Referred" },
] as const;

function Btn({ variant, children }: { variant: "primary" | "secondary" | "ghost"; children: string }) {
  return (
    <motion.button className={`btn btn--${variant}`}
      whileHover={{ scale: motionTokens.scale.pop }} whileTap={{ scale: motionTokens.scale.press }}
      transition={springs.snappy}>
      {children}
    </motion.button>
  );
}

export function Components() {
  return (
    <section id="components" className="section">
      <div className="wrap">
        <SectionHeading eyebrow="Component Library" title={<>Bound to tokens, <span className="brand">built for variants.</span></>}>
          Every component binds to live variables — no hardcoded fills, spacing or radius. These are the
          real, interactive primitives rendered on the same token set as the product.
        </SectionHeading>

        <Stagger className="grid grid-2">
          {/* Button */}
          <motion.div variants={staggerItem} className="card comp">
            <div className="comp__title">
              <h3 className="t-h3">Button</h3>
              <span className="t-caption muted">Primary · Secondary · Ghost</span>
            </div>
            <div className="comp__demo">
              <Btn variant="primary">Book</Btn>
              <Btn variant="secondary">Connect now</Btn>
              <Btn variant="ghost">Skip</Btn>
            </div>
          </motion.div>

          {/* Status Badge */}
          <motion.div variants={staggerItem} className="card comp">
            <div className="comp__title">
              <h3 className="t-h3">Status Badge</h3>
              <span className="t-caption muted">Always icon/dot + label</span>
            </div>
            <div className="comp__demo">
              {STATUS_BADGES.map((b) => (
                <span key={b.tone} className="badge"
                  style={{ background: `color-mix(in srgb, var(--nx-status-${b.tone}) 12%, white)`, color: `var(--nx-status-${b.tone})` }}>
                  <span className="dot" style={{ background: `var(--nx-status-${b.tone})` }} />
                  {b.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* KPI Card */}
          <motion.div variants={staggerItem} className="card comp">
            <div className="comp__title">
              <h3 className="t-h3">KPI Card</h3>
              <span className="t-caption muted">Overline · value · delta</span>
            </div>
            <div className="comp__demo">
              <div className="card kpi">
                <div className="label t-overline">Medication adherence (PDC)</div>
                <div className="val">87%</div>
                <span className="badge" style={{ background: "color-mix(in srgb, var(--nx-status-success) 12%, white)", color: "var(--nx-status-success)" }}>
                  <span className="dot" style={{ background: "var(--nx-status-success)" }} /> +4.2 pts
                </span>
              </div>
              <div className="card kpi">
                <div className="label t-overline">Referral completion</div>
                <div className="val">73%</div>
                <span className="badge" style={{ background: "color-mix(in srgb, var(--nx-status-warning) 12%, white)", color: "var(--nx-status-warning)" }}>
                  <span className="dot" style={{ background: "var(--nx-status-warning)" }} /> -1.1 pts
                </span>
              </div>
            </div>
          </motion.div>

          {/* Input */}
          <motion.div variants={staggerItem} className="card comp">
            <div className="comp__title">
              <h3 className="t-h3">Input</h3>
              <span className="t-caption muted">Default · Focus · Error</span>
            </div>
            <div className="comp__demo" style={{ flexDirection: "column", alignItems: "stretch" }}>
              <label className="field">
                <span className="t-label">Describe your symptoms</span>
                <input placeholder="e.g. sharp chest pain since this morning" />
                <span className="t-caption muted">Guidance, not diagnosis. A clinician reviews every assessment.</span>
              </label>
            </div>
          </motion.div>
        </Stagger>
      </div>
    </section>
  );
}
