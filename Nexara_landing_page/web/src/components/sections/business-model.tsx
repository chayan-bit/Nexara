import { Section, SectionHeader } from '@/components/ui/section';
import { Stagger, RevealItem } from '@/components/ui/reveal';
import { Icon, type IconName } from '@/components/ui/icon';
import { MODEL } from '@/lib/content';

export function BusinessModel() {
  return (
    <Section id="model" bg="white">
      <SectionHeader eyebrow={MODEL.eyebrow} title={MODEL.title} sub={MODEL.sub} />

      <Stagger
        className="mt-nx-16 grid gap-nx-4 sm:grid-cols-2 lg:grid-cols-5"
        stagger={0.08}
      >
        {MODEL.buyers.map((b) => (
          <RevealItem
            key={b.name}
            className="group flex flex-col rounded-modal border border-nx-gray-200 bg-white p-nx-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-nx hover:-translate-y-1 hover:border-nx-gray-300 hover:shadow-card-hover"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-card bg-nx-mint-50 text-nx-teal-700">
              <Icon name={b.icon as IconName} className="h-5 w-5" />
            </span>
            <h3 className="mt-nx-4 text-heading-s font-semibold text-nx-charcoal-900">{b.name}</h3>
            <p className="mt-nx-2 text-body-m text-nx-slate-500">{b.body}</p>
          </RevealItem>
        ))}
      </Stagger>
    </Section>
  );
}
