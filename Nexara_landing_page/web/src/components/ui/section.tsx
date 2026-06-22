import { cn } from '@/lib/utils';
import { Reveal } from './reveal';

type Bg = 'white' | 'subtle' | 'mint' | 'teal';

const BG: Record<Bg, string> = {
  white: 'bg-white text-nx-charcoal-900',
  subtle: 'bg-nx-gray-100 text-nx-charcoal-900',
  mint: 'bg-nx-mint-50 text-nx-charcoal-900',
  teal: 'bg-nx-teal-900 text-white',
};

export function Section({
  id,
  bg = 'white',
  className,
  children,
}: {
  id?: string;
  bg?: Bg;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 py-nx-24 md:py-nx-32', BG[bg], className)}
    >
      <div className="container">{children}</div>
    </section>
  );
}

/** Eyebrow + title + optional sub, with a hairline accent and reveal. */
export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = 'left',
  tone = 'dark',
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'max-w-prose',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p className={cn('nx-eyebrow', tone === 'light' && 'nx-eyebrow--mint')}>{eyebrow}</p>
      <h2
        className={cn(
          'mt-nx-4 text-[clamp(1.75rem,1.1rem+2.4vw,2.5rem)] font-bold tracking-[-0.02em] leading-[1.1]',
          tone === 'light' ? 'text-white' : 'text-nx-charcoal-900',
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            'mt-nx-4 text-body-l',
            tone === 'light' ? 'text-white/75' : 'text-nx-slate-500',
          )}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
