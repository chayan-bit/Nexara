import { type ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="shead">
      <Reveal dir="up" distance={14}>
        <span className="eyebrow t-overline">
          <span className="dot" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal dir="up" delay={0.05}>
        <h2 className="t-h1">{title}</h2>
      </Reveal>
      {children && (
        <Reveal dir="up" delay={0.1}>
          <p className="t-body-l muted">{children}</p>
        </Reveal>
      )}
    </div>
  );
}
