'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const REVENUE_FOCUS = [
  'Dynamic pricing algorithms for rooms and services',
  'AI-powered marketing automation and customer segmentation',
  'Predictive analytics for revenue optimization',
];

export default function RevenueImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.15 }
    );
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="revenue" ref={sectionRef} className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <div className="scroll-reveal text-center">
          <p className="mb-3 text-xs font-700 uppercase tracking-widest text-primary">Challenge pillar</p>
          <h2 className="font-display text-section-title font-800 text-resort-foreground">Revenue generation</h2>
          <p className="mt-4 text-base font-500 leading-relaxed text-resort-muted">
            This prototype emphasises how machine learning can support yield, marketing, and forecasting — not
            vanity metrics.
          </p>
        </div>

        <ul className="mt-10 space-y-4 scroll-reveal scroll-reveal-delay-1">
          {REVENUE_FOCUS.map((line) => (
            <li
              key={line}
              className="flex gap-4 rounded-2xl border border-resort-border bg-resort-bg px-5 py-4"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Icon name="CheckIcon" size={14} variant="solid" className="text-white" />
              </span>
              <span className="text-sm font-600 leading-snug text-resort-foreground sm:text-base">{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 scroll-reveal scroll-reveal-delay-2 text-center">
          <Link
            href="/operator-dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-700 text-white shadow-premium transition-all hover:bg-primary-light"
          >
            <Icon name="ChartBarIcon" size={16} variant="solid" />
            See pricing &amp; forecast demo
          </Link>
        </div>
      </div>
    </section>
  );
}
