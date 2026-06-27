'use client';

import { useEffect, useRef, useState } from 'react';
import { scrollToId } from '@/lib/lenis-store';

/**
 * Fixed left-edge "thread" that introduces the page as you scroll: one node per
 * section, a teal fill that grows to the current section, and labels on hover.
 * Desktop-only (xl+) — it would crowd narrow viewports. Reduced-motion safe:
 * the fill still tracks position, it just doesn't animate.
 */
interface RailSection {
  id: string;
  label: string;
}

const SECTIONS: RailSection[] = [
  { id: 'problem', label: '01 · The problem' },
  { id: 'layers', label: '02 · The platform' },
  { id: 'personas', label: '03 · Who it serves' },
  { id: 'thread', label: '04 · Golden Thread' },
  { id: 'trust', label: '05 · Trust & safety' },
  { id: 'model', label: '06 · Business model' },
  { id: 'roadmap', label: '07 · Roadmap' },
  { id: 'cta', label: '08 · Early access' },
];

export function SectionRail() {
  const [active, setActive] = useState(-1);
  const [visible, setVisible] = useState(false);
  const dotRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id));

    // Active = the last section whose top has crossed ~45% of the viewport.
    const recompute = () => {
      const mark = window.scrollY + window.innerHeight * 0.45;
      let next = -1;
      sections.forEach((el, i) => {
        if (el && el.offsetTop <= mark) next = i;
      });
      setActive(next);
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    recompute();
    window.addEventListener('scroll', recompute, { passive: true });
    window.addEventListener('resize', recompute, { passive: true });
    return () => {
      window.removeEventListener('scroll', recompute);
      window.removeEventListener('resize', recompute);
    };
  }, []);

  // Grow the fill line to the active dot.
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    const first = dotRefs.current[0];
    const cur = active >= 0 ? dotRefs.current[active] : null;
    fill.style.height = cur && first ? `${cur.offsetTop - first.offsetTop + 18}px` : '0px';
  }, [active]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col xl:flex"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.45s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* track + fill */}
      <span className="pointer-events-none absolute left-[5px] top-1.5 bottom-1.5 w-0.5 bg-nx-gray-200" aria-hidden="true" />
      <span
        ref={fillRef}
        className="pointer-events-none absolute left-[5px] top-1.5 w-0.5 bg-nx-teal-700 transition-[height] duration-300 ease-nx motion-reduce:transition-none"
        style={{ height: 0 }}
        aria-hidden="true"
      />

      {SECTIONS.map((s, i) => {
        const isActive = i === active;
        const isDone = i < active;
        return (
          <a
            key={s.id}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToId(`#${s.id}`);
            }}
            aria-label={s.label}
            aria-current={isActive ? 'true' : undefined}
            className="group relative flex items-center gap-3 py-[9px]"
          >
            <span
              className="relative z-10 h-3 w-3 flex-none rounded-full border-2 bg-white transition-all duration-300 ease-nx motion-reduce:transition-none"
              style={{
                borderColor: isActive || isDone ? 'var(--nx-teal-700)' : 'var(--nx-gray-300)',
                background: isActive || isDone ? 'var(--nx-teal-700)' : 'var(--nx-white)',
                transform: isActive ? 'scale(1.18)' : 'scale(1)',
                boxShadow: isActive ? '0 0 0 5px var(--nx-mint-50)' : 'none',
              }}
            />
            <span
              className="whitespace-nowrap text-caption font-medium text-nx-slate-500 transition-all duration-300 ease-nx group-hover:opacity-100 motion-reduce:transition-none"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                color: isActive ? 'var(--nx-teal-700)' : undefined,
              }}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
