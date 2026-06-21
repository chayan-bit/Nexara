"use client";
import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SCREENS } from "../data";
import { springs } from "../lib/motion-tokens";
import { SectionHeading } from "../components/SectionHeading";

/* ---- tiny shared bits ---- */
function Badge({ tone, children }: { tone: "success" | "warning" | "danger" | "info"; children: ReactNode }) {
  return (
    <span className="badge" style={{ background: `color-mix(in srgb, var(--nx-status-${tone}) 12%, white)`, color: `var(--nx-status-${tone})` }}>
      <span className="dot" style={{ background: `var(--nx-status-${tone})` }} />
      {children}
    </span>
  );
}

/* ---- device chrome ---- */
function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="device-phone">
      <div className="device-phone__island" />
      <div className="device-phone__screen">{children}</div>
    </div>
  );
}

function WindowFrame({ addr, children }: { addr: string; children: ReactNode }) {
  return (
    <div className="device-window">
      <div className="device-window__bar">
        <div className="device-window__lights">
          <i style={{ background: "#ff5f57" }} /><i style={{ background: "#febc2e" }} /><i style={{ background: "#28c840" }} />
        </div>
        <div className="device-window__addr">{addr}</div>
      </div>
      {children}
    </div>
  );
}

/* ---- native screen UIs ---- */
function TriageUI() {
  return (
    <div className="ui">
      <div className="ui-appbar"><span>Nexara</span><span className="dotline">9:41</span></div>
      <div className="ui-stack">
        <span className="ui-overline">Symptom Checker</span>
        <div className="ui-bubble">Hi Sarah — describe what you’re feeling today.</div>
        <div className="ui-input ui-muted">Tight feeling in my chest…</div>
        <div className="ui-assess">
          <span className="ui-overline">AI Assessment</span>
          <div className="ui-row"><span className="ui-muted">Likely care pathway</span><b>Cardiology</b></div>
          <div className="ui-row"><span className="ui-muted">Urgency tier</span><Badge tone="warning">Priority · today</Badge></div>
          <div className="ui-spec">
            <div className="ui-avatar" />
            <div><b style={{ fontSize: 13 }}>Dr. Eleanor Vance</b><div className="ui-muted" style={{ fontSize: 11 }}>Cardiologist · 4.8 ★ · in-network</div></div>
          </div>
          <div className="ui-btnrow">
            <button className="btn btn--primary">Book</button>
            <button className="btn btn--secondary">Connect now</button>
          </div>
          <div className="ui-muted" style={{ fontSize: 11 }}>Guidance, not a diagnosis. A clinician reviews every priority flag.</div>
        </div>
      </div>
    </div>
  );
}

function HubUI() {
  return (
    <div className="ui ui-hub">
      <div className="col-l">
        <span className="ui-overline">Golden Thread</span>
        <div style={{ marginTop: 12 }}>
          <div className="ui-tl"><b>Triage</b><span>Cardiology · priority</span></div>
          <div className="ui-tl"><b>Visit — GP</b><span>Referral issued</span></div>
          <div className="ui-tl"><b>Rx — Atorvastatin</b><span>Filled 12d ago</span></div>
          <div className="ui-tl"><b>Side-effect</b><span>Muscle pain</span></div>
        </div>
      </div>
      <div className="col-c">
        <span className="ui-overline">Care thread</span>
        <div style={{ marginTop: 12 }}>
          <div className="ui-msg"><div className="who">Dr. Patel (GP)</div><p>Referring to cardiology — query statin tolerance.</p></div>
          <div className="ui-msg">
            <div className="who">Pharmacist</div><p>Patient reports myalgia. Flagging interaction.</p>
            <div className="ui-alert">
              <Badge tone="danger">Drug interaction</Badge>
              <p style={{ fontSize: 12, margin: "8px 0" }}>Atorvastatin + new diltiazem ↑ myopathy risk.</p>
              <div className="ui-btnrow">
                <button className="btn btn--primary">Adjust dose</button>
                <button className="btn btn--secondary">Call patient</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-r">
        <span className="ui-overline">Summary</span>
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          <div><div className="ui-muted" style={{ fontSize: 11 }}>Active meds</div><div style={{ fontSize: 12 }}>Atorvastatin, Diltiazem</div></div>
          <div><div className="ui-muted" style={{ fontSize: 11 }}>Allergies</div><div style={{ fontSize: 12 }}>Penicillin</div></div>
          <div><div className="ui-muted" style={{ fontSize: 11 }}>Adherence</div><Badge tone="warning">PDC 0.71</Badge></div>
          <div className="ui-muted" style={{ fontSize: 11, marginTop: 4 }}>🔒 Audit-logged · SMART on FHIR</div>
        </div>
      </div>
    </div>
  );
}

function DashboardUI() {
  const bars = [62, 80, 48, 71, 55, 88, 66];
  return (
    <div className="ui ui-dash">
      <div className="ui-kpis">
        <div className="ui-kpi"><span className="ui-overline">Adherence</span><span className="v">82%</span><Badge tone="success">+6.1 pts</Badge></div>
        <div className="ui-kpi"><span className="ui-overline">Avg PDC</span><span className="v">0.84</span><Badge tone="success">4★ band</Badge></div>
        <div className="ui-kpi"><span className="ui-overline">Referral done</span><span className="v">73%</span><Badge tone="warning">+9 pts</Badge></div>
        <div className="ui-kpi"><span className="ui-overline">RPM billable</span><span className="v">1,284</span><Badge tone="info">99457</Badge></div>
      </div>
      <div className="ui-charts">
        <div className="ui-panel">
          <span className="ui-overline">Adherence by drug cohort</span>
          <div className="ui-bars">
            {bars.map((h, i) => <i key={i} className={i % 3 === 2 ? "alt" : ""} style={{ height: `${h}%` }} />)}
          </div>
          <div className="ui-legend"><span>Statins</span><span>Anticoag</span><span>SSRIs</span><span>Beta-blk</span><span>Metformin</span><span>ACE-i</span><span>PPIs</span></div>
        </div>
        <div className="ui-panel">
          <span className="ui-overline">Care-gap follow-up</span>
          <table className="ui-table" style={{ marginTop: 12 }}>
            <thead><tr><th>Cohort</th><th>Gap</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Post-MI statin</td><td>112</td><td><Badge tone="danger">Open</Badge></td></tr>
              <tr><td>Diabetic A1c</td><td>64</td><td><Badge tone="warning">In progress</Badge></td></tr>
              <tr><td>HTN refill</td><td>38</td><td><Badge tone="success">Closing</Badge></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const UI: Record<string, ReactNode> = {
  triage: <PhoneFrame><TriageUI /></PhoneFrame>,
  hub: <WindowFrame addr="nexara.health / care-team"><HubUI /></WindowFrame>,
  dashboard: <WindowFrame addr="nexara.health / population"><DashboardUI /></WindowFrame>,
};

function Screen({ screen, index }: { screen: (typeof SCREENS)[number]; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  const flip = index % 2 === 1;

  return (
    <div className={`screen ${flip ? "screen--flip" : ""}`} ref={ref}>
      <motion.div
        className="screen__stage"
        initial={{ opacity: 0, scale: 0.96, y: reduce ? 0 : 28 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ ...springs.gentle }}
      >
        <motion.div style={{ y }}>{UI[screen.id]}</motion.div>
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
          Three surfaces, one data spine — rendered live on the Nexara token set. Each scrolls with light
          parallax that preserves spatial continuity as you move through the care chain.
        </SectionHeading>
        {SCREENS.map((s, i) => (
          <Screen key={s.id} screen={s} index={i} />
        ))}
      </div>
    </section>
  );
}
