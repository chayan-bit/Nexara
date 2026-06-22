import {
  Route, MapPin, Users, Activity, Smartphone, Stethoscope, Pill, BarChart3,
  ShieldCheck, Siren, EyeOff, FileCheck2, MapPinned, ScrollText,
  Hospital, ShieldPlus, FlaskConical, Building2, Microscope,
  ArrowRight, ArrowUpRight, Check, type LucideProps,
} from 'lucide-react';

/** Stroke-only icon registry. Content references icons by name; this resolves them. */
const REGISTRY = {
  Route, MapPin, Users, Activity, Smartphone, Stethoscope, Pill, BarChart3,
  ShieldCheck, Siren, EyeOff, FileCheck2, MapPinned, ScrollText,
  Hospital, ShieldPlus, FlaskConical, Building2, Microscope,
  ArrowRight, ArrowUpRight, Check,
} as const;

export type IconName = keyof typeof REGISTRY;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = REGISTRY[name];
  return <Cmp aria-hidden="true" strokeWidth={1.75} {...props} />;
}
