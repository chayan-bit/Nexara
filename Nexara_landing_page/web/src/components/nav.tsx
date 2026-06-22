'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/lib/content';
import { scrollToId } from '@/lib/lenis-store';
import { cn } from '@/lib/utils';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ease-nx',
        scrolled
          ? 'border-b border-nx-gray-200 bg-white/85 backdrop-blur-sm'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#main" onClick={(e) => go(e, '#main')} className="rounded-card" aria-label="Nexara home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="rounded-card px-3 py-2 text-label-m text-nx-slate-500 transition-colors hover:text-nx-charcoal-900"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <a href="#cta" onClick={(e) => go(e, '#cta')}>
              Request access
            </a>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-card p-2 text-nx-charcoal-900 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-nx-gray-200 bg-white px-6 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="block rounded-card px-2 py-3 text-body-l text-nx-charcoal-900"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-3 w-full">
            <a href="#cta" onClick={(e) => go(e, '#cta')}>
              Request access
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
