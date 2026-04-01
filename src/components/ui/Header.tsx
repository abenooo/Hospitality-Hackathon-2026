'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Experiences', href: '/homepage#platform' },
  { label: 'Revenue AI', href: '/homepage#revenue' },
  { label: 'Dashboard', href: '/operator-dashboard' },
  { label: 'Guest AI', href: '/guest-experience' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-resort-border bg-white/90 py-3 shadow-sm backdrop-blur-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link href="/homepage" className="flex min-w-0 items-center gap-2.5">
            <AppLogo size={36} />
            <span className="font-display hidden text-lg font-800 tracking-tight text-resort-foreground sm:block">
              Kuriftu Resorts
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="text-sm font-600 text-resort-muted transition-colors duration-200 hover:text-primary"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/operator-dashboard"
              className="hidden items-center gap-2 text-sm font-700 text-resort-foreground transition-colors hover:text-primary sm:inline-flex"
            >
              Sign In
            </Link>
            <Link
              href="/operator-dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-700 text-white shadow-premium transition-all hover:scale-105 hover:bg-primary-light"
            >
              <Icon name="SparklesIcon" size={15} variant="solid" />
              <span>Request Demo</span>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-resort-border transition-colors hover:bg-resort-muted-bg lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={20} />
            </button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-resort-foreground/40 backdrop-blur-sm" />
          <div
            className="absolute right-0 top-0 flex h-full w-72 flex-col gap-2 bg-white p-6 pt-20 shadow-2xl"
            onClick={(e) => e?.stopPropagation()}
          >
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-700 text-resort-foreground transition-all hover:bg-primary-50 hover:text-primary"
              >
                {link?.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-resort-border pt-4">
              <Link
                href="/operator-dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-700 text-white transition-all hover:bg-primary-light"
              >
                <Icon name="SparklesIcon" size={15} variant="solid" />
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
