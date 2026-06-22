'use client';

import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { Button } from '@/components/ui/button';
import { scrollToId } from '@/lib/lenis-store';
import { CTA } from '@/lib/content';

export function Cta() {
  return (
    <section id="cta" className="scroll-mt-24 bg-nx-teal-900 py-nx-24 text-white md:py-nx-32">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="nx-eyebrow nx-eyebrow--mint">{CTA.eyebrow}</p>
          <h2 className="mt-nx-4 text-[clamp(1.875rem,1.2rem+2.6vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            {CTA.title}
          </h2>
          <p className="mx-auto mt-nx-4 max-w-prose text-body-l text-white/75">{CTA.sub}</p>

          <div className="mt-nx-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-nx-teal-900 hover:bg-nx-mint-50 hover:text-nx-teal-900"
            >
              <a href="mailto:hello@nexara.health?subject=Nexara%20early%20access">
                {CTA.primary}
                <ArrowRight className="h-[18px] w-[18px] transition-transform duration-200 ease-nx group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollToId('#problem')}
              className="border border-white/30 text-white hover:bg-white/10"
            >
              {CTA.secondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
