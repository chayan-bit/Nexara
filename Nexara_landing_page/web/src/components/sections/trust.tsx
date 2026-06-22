import { Section, SectionHeader } from '@/components/ui/section';
import { Stagger, RevealItem } from '@/components/ui/reveal';
import { StatusBadge } from '@/components/ui/badge';
import { TRUST } from '@/lib/content';
import type { IconName } from '@/components/ui/icon';

type Tone = 'success' | 'warning' | 'danger' | 'info';

export function Trust() {
  return (
    <Section id="trust" bg="subtle">
      <SectionHeader eyebrow={TRUST.eyebrow} title={TRUST.title} sub={TRUST.sub} />

      <Stagger className="mt-nx-16 grid gap-nx-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {TRUST.invariants.map((inv) => (
          <RevealItem
            key={inv.label}
            className="rounded-modal border border-nx-gray-200 bg-white p-nx-6 shadow-card"
          >
            <StatusBadge tone={inv.tone as Tone} icon={inv.icon as IconName}>
              {inv.label}
            </StatusBadge>
            <p className="mt-nx-4 text-body-m text-nx-slate-500">{inv.detail}</p>
          </RevealItem>
        ))}
      </Stagger>
    </Section>
  );
}
