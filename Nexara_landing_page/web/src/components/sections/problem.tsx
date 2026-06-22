import { Section, SectionHeader } from '@/components/ui/section';
import { Stagger, RevealItem } from '@/components/ui/reveal';
import { Counter } from '@/components/ui/counter';
import { PROBLEM } from '@/lib/content';

export function Problem() {
  return (
    <Section id="problem" bg="subtle">
      <SectionHeader eyebrow={PROBLEM.eyebrow} title={PROBLEM.title} sub={PROBLEM.body} />

      <Stagger className="mt-nx-16 grid gap-nx-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        {PROBLEM.stats.map((s) => (
          <RevealItem
            key={s.label}
            className="group flex flex-col rounded-modal border border-nx-gray-200 bg-white p-nx-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-nx hover:-translate-y-1 hover:border-nx-gray-300 hover:shadow-card-hover"
          >
            <p className="flex items-baseline gap-1 text-[44px] font-extrabold leading-none tracking-[-0.03em] text-nx-teal-700">
              <Counter value={s.value} />
              <span className="text-heading-m font-bold text-nx-slate-500">{s.unit}</span>
            </p>
            <p className="mt-nx-4 flex-1 text-body-m text-nx-charcoal-900">{s.label}</p>
            <p className="mt-nx-4 inline-flex items-center gap-2 text-caption text-nx-slate-500">
              <span className="h-1 w-4 rounded-full bg-nx-mint-500" aria-hidden="true" />
              {s.source}
            </p>
          </RevealItem>
        ))}
      </Stagger>
    </Section>
  );
}
