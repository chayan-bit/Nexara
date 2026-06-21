// Abstract connected-node "N" — continuous line linking discrete data points.
export function Logo({ size = 26, color = "currentColor", className }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path d="M6 25V7l20 18V7" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="7" r="3" fill={color} />
      <circle cx="6" cy="25" r="3" fill={color} />
      <circle cx="26" cy="7" r="3" fill={color} />
      <circle cx="26" cy="25" r="3" fill={color} />
    </svg>
  );
}
