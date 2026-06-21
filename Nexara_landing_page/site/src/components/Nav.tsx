"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { springs } from "../lib/motion-tokens";
import { NAV } from "../data";
import { Logo } from "./Logo";

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, springs.release);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <nav className={`nav ${solid ? "nav--solid" : ""}`}>
        <a href="#top" className="nav__brand">
          <Logo size={24} color="var(--nx-teal-700)" className="nav__mark" />
          <span>Nexara</span>
        </a>
        <div className="nav__links">
          {NAV.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={`nav__link ${active === id ? "active" : ""}`}>
              {active === id && (
                <motion.span layoutId="nav-pill" className="nav__pill" transition={springs.snappy} />
              )}
              {label}
            </a>
          ))}
        </div>
        <a href="#screens" className="btn btn--primary" style={{ padding: "9px 16px" }}>
          View screens
        </a>
      </nav>
    </>
  );
}
