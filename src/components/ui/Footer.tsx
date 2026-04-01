import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="border-t border-resort-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
            <Link href="/homepage" className="flex items-center gap-2">
              <AppLogo size={32} />
              <span className="font-display hidden text-base font-800 tracking-tight text-resort-foreground sm:block">
                Kuriftu Resorts
              </span>
            </Link>
            <nav className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'Platform', href: '/homepage#platform' },
                { label: 'Dashboard', href: '/operator-dashboard' },
                { label: 'Guest AI', href: '/guest-experience' },
                { label: 'Privacy', href: '/homepage' },
                { label: 'Terms', href: '/homepage' },
              ]?.map((link) => (
                <Link
                  key={link?.label}
                  href={link?.href}
                  className="text-sm font-600 text-resort-muted transition-colors hover:text-resort-foreground"
                >
                  {link?.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-resort-border text-resort-muted transition-all hover:border-primary hover:bg-primary hover:text-white"
              aria-label="Twitter"
            >
              <Icon name="GlobeAltIcon" size={16} />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-resort-border text-resort-muted transition-all hover:border-primary hover:bg-primary hover:text-white"
              aria-label="LinkedIn"
            >
              <Icon name="BuildingOfficeIcon" size={16} />
            </a>
            <span className="ml-2 text-sm font-500 text-resort-muted">© 2026 Kuriftu Resorts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
