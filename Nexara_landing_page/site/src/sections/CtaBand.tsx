"use client";
import { Reveal } from "../components/Reveal";
import { BlurText } from "../components/BlurText";
import { MagneticButton } from "../components/MagneticButton";

export function CtaBand() {
  return (
    <section className="section--tight">
      <div className="wrap">
        <Reveal dir="up">
          <div className="cta-band">
            <span className="eyebrow t-overline" style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.25)", color: "#fff" }}>
              <span className="dot" />The connective tissue of healthcare
            </span>
            <h2 className="t-h1" style={{ margin: "20px auto 14px", maxWidth: "18ch" }}>
              <BlurText text="Every encounter, smarter than the last." accentWords={["smarter"]} inView />
            </h2>
            <p className="t-body-l" style={{ color: "rgba(255,255,255,0.78)", maxWidth: "52ch", margin: "0 auto 30px" }}>
              One longitudinal record. Four intelligent layers. Five buyers who pay so patients never do.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <MagneticButton href="#screens" className="btn btn--primary">See the screens</MagneticButton>
              <MagneticButton href="https://www.figma.com/design/UQ3esejYL49sBwcI3gXXkN" className="btn btn--secondary">Open Figma file</MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
