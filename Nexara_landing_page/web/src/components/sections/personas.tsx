import Image from 'next/image';
import { Section, SectionHeader } from '@/components/ui/section';
import { Stagger, RevealItem } from '@/components/ui/reveal';
import { Icon, type IconName } from '@/components/ui/icon';
import { PERSONAS } from '@/lib/content';

export function Personas() {
  return (
    <Section id="personas" bg="subtle">
      <SectionHeader eyebrow={PERSONAS.eyebrow} title={PERSONAS.title} sub={PERSONAS.sub} />

      <Stagger className="mt-nx-16 grid gap-nx-6 md:grid-cols-2" stagger={0.1}>
        {PERSONAS.items.map((p) => (
          <RevealItem
            key={p.persona}
            className="group overflow-hidden rounded-modal border border-nx-gray-200 bg-white shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-nx hover:-translate-y-1 hover:border-nx-gray-300 hover:shadow-card-hover"
          >
            <div className="nx-photo aspect-[16/9] w-full">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-nx group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-nx-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-card bg-nx-mint-50 text-nx-teal-700">
                  <Icon name={p.icon as IconName} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-heading-s font-semibold text-nx-charcoal-900">{p.persona}</h3>
                  <p className="text-caption text-nx-slate-500">{p.surface}</p>
                </div>
              </div>
              <p className="mt-nx-6 border-l-2 border-nx-mint-500 pl-nx-4 text-body-l italic text-nx-charcoal-900">
                “{p.jtbd}”
              </p>
            </div>
          </RevealItem>
        ))}
      </Stagger>
    </Section>
  );
}
