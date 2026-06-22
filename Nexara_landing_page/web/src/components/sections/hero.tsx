'use client';

import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GoldenThreadLine } from './golden-thread-line';
import { scrollToId } from '@/lib/lenis-store';
import { HERO } from '@/lib/content';

/**
 * Hero entrance uses CSS keyframes (animate-fade-up) rather than JS motion:
 * above-the-fold content must render even if JS is slow/absent, and it gives
 * a deterministic staggered reveal. Below-the-fold sections use Framer reveals.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="nx-eyebrow animate-fade-up">{HERO.eyebrow}</p>

          <h1
            className="mt-nx-6 text-display-2xl text-nx-charcoal-900 animate-fade-up"
            style={{ animationDelay: '70ms' }}
          >
            {HERO.title[0]}
            <br />
            in the <span className="text-nx-teal-700">care chain.</span>
          </h1>

          <p
            className="mx-auto mt-nx-6 max-w-prose text-body-l text-nx-slate-500 animate-fade-up"
            style={{ animationDelay: '140ms' }}
          >
            {HERO.sub}
          </p>

          <div
            className="mt-nx-8 flex flex-col items-center justify-center gap-3 animate-fade-up sm:flex-row"
            style={{ animationDelay: '210ms' }}
          >
            <Button size="lg" onClick={() => scrollToId('#cta')}>
              {HERO.primaryCta}
              <ArrowRight className="h-[18px] w-[18px] transition-transform duration-200 ease-nx group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => scrollToId('#layers')}>
              {HERO.secondaryCta}
            </Button>
          </div>

          <ul
            className="mt-nx-8 flex flex-wrap items-center justify-center gap-x-nx-6 gap-y-2 animate-fade-up"
            style={{ animationDelay: '280ms' }}
          >
            {HERO.trustStrip.map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5 text-label-m text-nx-slate-500">
                <Check className="h-4 w-4 text-nx-teal-700" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Golden Thread */}
        <div
          className="relative mx-auto mt-nx-16 max-w-5xl rounded-modal border border-nx-gray-200 bg-white p-nx-8 shadow-card animate-fade-up md:mt-nx-24"
          style={{ animationDelay: '360ms' }}
        >
          <div className="nx-dotgrid pointer-events-none absolute inset-0 rounded-modal opacity-40" aria-hidden="true" />
          <div className="relative">
            <GoldenThreadLine />
          </div>
        </div>
      </div>
    </section>
  );
}
