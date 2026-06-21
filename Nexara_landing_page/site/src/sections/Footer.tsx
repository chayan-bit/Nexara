import { Logo } from "../components/Logo";
import { Reveal } from "../components/Reveal";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <Reveal dir="up">
          <div className="footer__top">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <Logo size={32} color="#fff" />
                <span className="footer__brand">Nexara</span>
              </div>
              <p className="t-body" style={{ maxWidth: "34ch" }}>
                The connective tissue of healthcare — one longitudinal record, four intelligent layers,
                every encounter smarter than the last.
              </p>
            </div>
            <div className="footer__cols">
              <div className="footer__col">
                <h5>System</h5>
                <a href="#vision">Vision</a>
                <a href="#brand">Brand & tokens</a>
                <a href="#components">Components</a>
                <a href="#screens">Screens</a>
              </div>
              <div className="footer__col">
                <h5>Source</h5>
                <a href="https://www.figma.com/design/UQ3esejYL49sBwcI3gXXkN" target="_blank" rel="noreferrer">Figma file</a>
                <a href="#foundations">Foundations</a>
                <a href="#top">Series A pitch</a>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="footer__rule" />
        <div className="footer__fine">
          <span>Product Design System · v1.0 · {new Date().getFullYear()}</span>
          <span>Generated visuals are directional concepts. Tokens are 1:1 with Figma, CSS & Tailwind.</span>
        </div>
      </div>
    </footer>
  );
}
