'use client';

import { useEffect, useRef } from 'react';
import { HERO } from '@/lib/content';

/** Node anchor points along a gentle, continuous wave (the "thread"). */
const NODES = [
  { x: 80, y: 80 },
  { x: 300, y: 132 },
  { x: 520, y: 80 },
  { x: 740, y: 132 },
  { x: 920, y: 80 },
];

const PATH_D =
  'M 80 80 C 170 80, 210 132, 300 132 C 390 132, 430 80, 520 80 ' +
  'C 610 80, 650 132, 740 132 C 830 132, 870 80, 920 80';

const LABEL_Y = 188;
const TICK_Y = 168;

/**
 * The Golden Thread: a single continuous line that draws itself (GSAP),
 * linking discrete care points. Nodes and labels stagger in after the line.
 * Everything is visible by default (SSR / no-JS / reduced-motion safe);
 * GSAP only hides-then-reveals when motion is allowed.
 */
export function GoldenThreadLine() {
  const root = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = root.current;
    const line = path.current;
    if (!svg || !line) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const length = line.getTotalLength();
    line.style.strokeDasharray = String(length);

    if (reduce) {
      line.style.strokeDashoffset = '0';
      return;
    }

    line.style.strokeDashoffset = String(length);
    let ctx: { revert: () => void } | undefined;

    import('gsap').then(({ gsap }) => {
      const nodes = svg.querySelectorAll('[data-node]');
      const labels = svg.querySelectorAll('[data-label]');
      ctx = gsap.context(() => {
        gsap.set(nodes, { opacity: 0, scale: 0 });
        gsap.set(labels, { opacity: 0, y: 6 });
        gsap
          .timeline({ defaults: { ease: 'power2.out' } })
          .to(line, { strokeDashoffset: 0, duration: 1.5 })
          .to(nodes, { opacity: 1, scale: 1, duration: 0.45, stagger: 0.12 }, '-=1.0')
          .to(labels, { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 }, '<+0.1');
      }, svg);
    });

    return () => ctx?.revert();
  }, []);

  return (
    <svg
      ref={root}
      viewBox="0 0 1000 210"
      className="h-auto w-full"
      role="img"
      aria-label={`The care chain Nexara connects: ${HERO.thread.join(' to ')}.`}
    >
      {NODES.map((n, i) => (
        <line key={`t${i}`} x1={n.x} y1={n.y} x2={n.x} y2={TICK_Y} stroke="var(--nx-gray-200)" strokeWidth="1" />
      ))}

      <path
        ref={path}
        d={PATH_D}
        fill="none"
        stroke="var(--nx-teal-700)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {NODES.map((n, i) => {
        const last = i === NODES.length - 1;
        return (
          <g key={`n${i}`} data-node style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <circle cx={n.x} cy={n.y} r="9" fill="#fff" stroke="var(--nx-teal-700)" strokeWidth="2.5" />
            <circle cx={n.x} cy={n.y} r="3.5" fill={last ? 'var(--nx-mint-500)' : 'var(--nx-teal-700)'} />
          </g>
        );
      })}

      {NODES.map((n, i) => (
        <text
          key={`l${i}`}
          data-label
          x={n.x}
          y={LABEL_Y}
          textAnchor="middle"
          className="fill-nx-slate-500 text-[13px] font-semibold"
        >
          {HERO.thread[i]}
        </text>
      ))}
    </svg>
  );
}
