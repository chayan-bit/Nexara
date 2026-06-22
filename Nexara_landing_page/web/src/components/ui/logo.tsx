import { cn } from '@/lib/utils';

/**
 * Nexara mark — a connected-node "N": a continuous line linking discrete
 * care points. No gradients or shadows on the mark (brand rule).
 */
export function Logo({
  className,
  withWord = true,
  tone = 'brand',
}: {
  className?: string;
  withWord?: boolean;
  tone?: 'brand' | 'light';
}) {
  const stroke = tone === 'light' ? '#FFFFFF' : '#0E7C7B';
  const nodeA = tone === 'light' ? '#FFFFFF' : '#0E7C7B';
  const nodeB = '#3FBFB6';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 48 48" fill="none" className="h-7 w-7 shrink-0" aria-hidden="true">
        <path d="M9 40 V9 L39 40 V9" stroke={stroke} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="5" fill={nodeA} />
        <circle cx="9" cy="40" r="5" fill={nodeB} />
        <circle cx="39" cy="9" r="5" fill={nodeB} />
        <circle cx="39" cy="40" r="5" fill={nodeA} />
      </svg>
      {withWord && (
        <span
          className={cn(
            'text-[20px] font-extrabold tracking-[-0.02em] leading-none',
            tone === 'light' ? 'text-white' : 'text-nx-charcoal-900',
          )}
        >
          Nexara
        </span>
      )}
    </span>
  );
}
