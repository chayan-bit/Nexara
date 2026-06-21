"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LAYERS } from "../data";
import { springs, motionTokens } from "../lib/motion-tokens";
import { Reveal } from "../components/Reveal";
import { BlurText } from "../components/BlurText";

export function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="vision" className="section band-dark">
      <div className="band-dark__bg" style={{ backgroundImage: "url(/assets/thread-band.png)" }} />
      <div className="wrap">
        <div className="shead">
          <Reveal dir="up" distance={14}>
            <span className="eyebrow t-overline"><span className="dot" />Product Vision</span>
          </Reveal>
          <h2 className="t-h1" style={{ margin: "18px 0 14px" }}>
            <BlurText text="One record. Four intelligent layers." accentWords={["Four", "intelligent", "layers."]} inView />
          </h2>
          <Reveal dir="up" delay={0.1}>
            <p className="t-body-l muted" style={{ maxWidth: "62ch" }}>
              Nexara is the connective tissue of healthcare — not a symptom checker, not a booking tool,
              not an adherence app, but the layer that makes all of them work together. Everything writes
              back to the Golden Thread.
            </p>
          </Reveal>
        </div>

        <div className="thread" ref={ref}>
          <div className="thread__line">
            <motion.div className="thread__fill" style={{ scaleY: fillScale }} />
          </div>

          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.n}
              className="layer"
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ ...springs.gentle, delay: i * 0.06 }}
            >
              <motion.div className="layer__node"
                whileHover={{ scale: motionTokens.scale.pop }} transition={springs.snappy}>
                {layer.n}
              </motion.div>
              <div>
                <h3 className="t-h3">
                  {layer.name} <span className="layer__feat">· {layer.feature}</span>
                </h3>
                <p className="t-body muted" style={{ marginTop: 4, maxWidth: "62ch" }}>{layer.body}</p>
              </div>
            </motion.div>
          ))}

          <motion.div className="thread__caption"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={springs.gentle}>
            <p className="t-body">
              <strong>The Golden Thread</strong> — the single living narrative that makes every encounter
              smarter than the last. Defensibility is not any one screen; it is the <em>compounding</em>
              {" "}of four data streams against one record.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
