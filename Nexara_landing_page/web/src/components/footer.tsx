import { Logo } from '@/components/ui/logo';
import { FOOTER, SITE } from '@/lib/content';

export function Footer() {
  return (
    <footer className="border-t border-nx-gray-200 bg-white">
      <div className="container py-nx-16">
        <div className="grid gap-nx-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-nx-4 text-body-m text-nx-slate-500">{FOOTER.blurb}</p>
          </div>

          {FOOTER.groups.map((g) => (
            <div key={g.title}>
              <p className="nx-eyebrow text-nx-slate-500">{g.title}</p>
              <ul className="mt-nx-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-body-m text-nx-charcoal-900 transition-colors hover:text-nx-teal-700"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-nx-16 flex flex-col gap-3 border-t border-nx-gray-200 pt-nx-8 text-caption text-nx-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Pre-launch — built for India.</p>
          <p className="max-w-xl md:text-right">{FOOTER.compliance}</p>
        </div>
      </div>
    </footer>
  );
}
