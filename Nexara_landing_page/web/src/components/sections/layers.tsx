import { Section, SectionHeader } from '@/components/ui/section';
import { Stagger, RevealItem } from '@/components/ui/reveal';
import { Icon, type IconName } from '@/components/ui/icon';
import { LAYERS } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Layers() {
  return (
    <Section id="layers" bg="white">
      <SectionHeader eyebrow={LAYERS.eyebrow} title={LAYERS.title} sub={LAYERS.sub} />

      <Stagger className="mt-nx-16 grid gap-nx-4 lg:grid-cols-6" stagger={0.09}>
        {LAYERS.items.map((l) => {
          const moat = Boolean(l.tag);
          return (
            <RevealItem
              key={l.name}
              className={cn(
                'group relative flex flex-col rounded-modal border p-nx-8 transition-[transform,box-shadow,border-color] duration-300 ease-nx',
                moat
                  ? 'lg:col-span-6 border-transparent bg-nx-teal-900 text-white'
                  : 'lg:col-span-2 border-nx-gray-200 bg-white text-nx-charcoal-900 shadow-card hover:-translate-y-1 hover:border-nx-gray-300 hover:shadow-card-hover',
              )}
            >
              <div className={cn('flex items-center justify-between', moat && 'lg:max-w-2xl')}>
                <span
                  className={cn(
                    'inline-flex h-11 w-11 items-center justify-center rounded-card',
                    moat ? 'bg-white/10 text-nx-mint-500' : 'bg-nx-mint-50 text-nx-teal-700',
                  )}
                >
                  <Icon name={l.icon as IconName} className="h-5 w-5" />
                </span>
                <span className={cn('text-overline', moat ? 'text-white/40' : 'text-nx-gray-300')}>
                  {l.n}
                </span>
              </div>

              <div className={cn('mt-nx-6', moat && 'lg:flex lg:items-end lg:justify-between lg:gap-nx-12')}>
                <div className={cn(moat && 'lg:max-w-md')}>
                  <div className="flex items-center gap-3">
                    <h3 className={cn('text-heading-m font-semibold', moat ? 'text-white' : 'text-nx-charcoal-900')}>
                      {l.name}
                    </h3>
                    {moat && (
                      <span className="rounded-pill bg-nx-mint-500 px-3 py-1 text-caption font-bold uppercase tracking-wide text-nx-teal-900">
                        {l.tag}
                      </span>
                    )}
                  </div>
                  <p className={cn('mt-nx-3 text-body-m', moat ? 'text-white/75' : 'text-nx-slate-500')}>
                    {l.body}
                  </p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
