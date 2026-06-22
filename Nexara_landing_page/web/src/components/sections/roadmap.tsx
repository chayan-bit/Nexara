import { Section, SectionHeader } from '@/components/ui/section';
import { Stagger, RevealItem } from '@/components/ui/reveal';
import { StatusBadge } from '@/components/ui/badge';
import { ROADMAP } from '@/lib/content';
import { cn } from '@/lib/utils';

type Tone = 'success' | 'warning' | 'info';
const STATUS_TONE: Record<string, Tone | 'neutral'> = {
  Now: 'success',
  Building: 'warning',
  Next: 'info',
  Later: 'neutral',
};

export function Roadmap() {
  return (
    <Section id="roadmap" bg="subtle">
      <SectionHeader eyebrow={ROADMAP.eyebrow} title={ROADMAP.title} />

      <Stagger className="mt-nx-16 grid gap-nx-4 lg:grid-cols-4" stagger={0.1}>
        {ROADMAP.phases.map((p) => {
          const tone = STATUS_TONE[p.status];
          return (
            <RevealItem
              key={p.phase}
              className={cn(
                'relative flex flex-col rounded-modal border p-nx-6 transition-colors',
                p.wedge
                  ? 'border-nx-teal-700 bg-white shadow-card ring-1 ring-nx-teal-700'
                  : 'border-nx-gray-200 bg-white shadow-card',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-overline text-nx-slate-500">{p.phase}</span>
                {tone === 'neutral' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-pill bg-nx-gray-100 px-3 py-1 text-caption font-semibold text-nx-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-nx-gray-300" aria-hidden="true" />
                    {p.status}
                  </span>
                ) : (
                  <StatusBadge tone={tone}>{p.status}</StatusBadge>
                )}
              </div>
              <h3 className="mt-nx-4 text-heading-s font-semibold text-nx-charcoal-900">{p.name}</h3>
              <p className="mt-nx-2 text-body-m text-nx-slate-500">{p.body}</p>
              {p.wedge && (
                <span className="mt-nx-4 inline-flex w-fit rounded-pill bg-nx-mint-50 px-3 py-1 text-caption font-bold uppercase tracking-wide text-nx-teal-700">
                  You are here
                </span>
              )}
            </RevealItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
