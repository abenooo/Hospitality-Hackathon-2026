'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const PILLARS = [
  {
    id: 'operations',
    icon: 'CpuChipIcon',
    title: 'Operations',
    description:
      'Forecasting, occupancy signals, and decision support so teams spend less time on spreadsheets and more on guests.',
    href: '/operator-dashboard',
  },
  {
    id: 'guests',
    icon: 'ChatBubbleLeftRightIcon',
    title: 'Guest experience',
    description:
      'Multilingual AI assistance, itineraries, and in-stay help tailored to Ethiopian destinations and travel patterns.',
    href: '/guest-experience',
  },
  {
    id: 'revenue',
    icon: 'CurrencyDollarIcon',
    title: 'Revenue',
    description:
      'Yield and demand-aware pricing plus analytics so revenue strategy aligns with real booking behaviour.',
    href: '/operator-dashboard',
  },
];

export default function ModulesBentoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.1 }
    );
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="platform" ref={sectionRef} className="bg-resort-bg py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-10 scroll-reveal text-center">
          <p className="mb-3 text-xs font-700 uppercase tracking-widest text-primary">Scope</p>
          <h2 className="font-display text-section-title font-800 text-resort-foreground">
            Three ways AI can help <span className="text-primary italic font-300">your resort</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-500 text-resort-muted">
            Each area maps to the hackathon brief — operations, guest experience, and revenue — with clickable demos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="scroll-reveal flex min-h-[240px] flex-col rounded-[28px] border border-resort-border bg-white p-7 shadow-soft transition-shadow hover:shadow-card"
              style={{ transitionDelay: `${idx * 0.06}s` }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                <Icon name={pillar.icon as string} size={20} variant="solid" className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-800 text-resort-foreground">{pillar.title}</h3>
              <p className="mt-3 flex-1 text-sm font-500 leading-relaxed text-resort-muted">{pillar.description}</p>
              <Link
                href={pillar.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-700 text-primary hover:gap-3"
              >
                Open demo
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 scroll-reveal">
          {['Low-data aware', 'Amharic + English', 'Built for Ethiopia'].map((label) => (
            <span
              key={label}
              className="rounded-full border border-resort-border bg-white px-4 py-2 text-xs font-600 text-resort-muted"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
