import { cn } from '@/lib/utils';

/**
 * KPI Card — overline label, Heading-L value, optional delta slot.
 * Restrained elevation; hairline border carries the structure.
 */
export function KpiCard({
  label,
  value,
  unit,
  delta,
  className,
}: {
  label: string;
  value: string;
  unit?: string;
  delta?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-modal border border-nx-gray-200 bg-white p-nx-6 shadow-card',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="nx-eyebrow text-nx-slate-500">{label}</p>
        {delta}
      </div>
      <p className="mt-nx-3 text-heading-l text-nx-charcoal-900">
        {value}
        {unit && <span className="ml-1 text-heading-s font-semibold text-nx-slate-500">{unit}</span>}
      </p>
    </div>
  );
}
