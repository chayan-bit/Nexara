import { cn } from '@/lib/utils';
import { Icon, type IconName } from './icon';

type Tone = 'success' | 'warning' | 'danger' | 'info';

/**
 * Status badge — status color at ~12% over white, full-color dot + label.
 * ALWAYS icon/dot + label, never color alone (clinical-error safety).
 */
const TONE: Record<Tone, { fg: string; bg: string; dot: string }> = {
  success: { fg: 'text-nx-success', bg: 'bg-[#1E9E6A1F]', dot: 'bg-nx-success' },
  warning: { fg: 'text-nx-warning', bg: 'bg-[#E0A1001F]', dot: 'bg-nx-warning' },
  danger: { fg: 'text-nx-danger', bg: 'bg-[#D645451F]', dot: 'bg-nx-danger' },
  info: { fg: 'text-nx-info', bg: 'bg-[#2D7FF01F]', dot: 'bg-nx-info' },
};

export function StatusBadge({
  tone,
  children,
  icon,
  className,
}: {
  tone: Tone;
  children: React.ReactNode;
  icon?: IconName;
  className?: string;
}) {
  const t = TONE[tone];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-caption font-semibold',
        t.bg,
        t.fg,
        className,
      )}
    >
      {icon ? (
        <Icon name={icon} className="h-3.5 w-3.5" />
      ) : (
        <span className={cn('h-1.5 w-1.5 rounded-full', t.dot)} aria-hidden="true" />
      )}
      {children}
    </span>
  );
}
