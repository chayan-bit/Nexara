import { Section, SectionHeader } from '@/components/ui/section';
import { Stagger, RevealItem, Reveal } from '@/components/ui/reveal';
import { Logo } from '@/components/ui/logo';
import { THREAD } from '@/lib/content';

export function GoldenThread() {
  return (
    <Section id="thread" bg="mint">
      <SectionHeader eyebrow={THREAD.eyebrow} title={THREAD.title} sub={THREAD.sub} />

      <Stagger className="mt-nx-16 grid gap-nx-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
        {THREAD.streams.map((s, i) => (
          <RevealItem
            key={s.name}
            className="rounded-modal border border-nx-mint-500/30 bg-white p-nx-6 shadow-card"
          >
            <span className="text-overline text-nx-teal-700">{`0${i + 1}`}</span>
            <h3 className="mt-nx-3 text-heading-s font-semibold text-nx-charcoal-900">{s.name}</h3>
            <p className="mt-nx-2 text-body-m text-nx-slate-500">{s.body}</p>
          </RevealItem>
        ))}
      </Stagger>

      <Reveal className="mt-nx-8">
        <div className="flex flex-col items-start gap-nx-6 rounded-modal bg-nx-teal-900 p-nx-8 text-white md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-heading-m font-semibold leading-snug">
            Defensibility is the <span className="text-nx-mint-500">compounding</span> of these four
            streams against one record — never any single screen.
          </p>
          <Logo tone="light" withWord />
        </div>
      </Reveal>
    </Section>
  );
}
