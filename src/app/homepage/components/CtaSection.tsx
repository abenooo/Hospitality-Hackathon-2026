'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const HIGHLIGHTS = ['Hackathon prototype', 'Ethiopia hospitality focus', 'Operations · Guests · Revenue'];

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef?.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.15 }
    );
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-resort-bg py-16 lg:py-22">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <div className="gradient-animate noise-overlay relative overflow-hidden rounded-[32px] p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-64 w-64 bg-white/5 blob-animate" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl font-800 leading-tight text-white sm:text-4xl">
              Explore the demos
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base font-500 text-white/70">
              Walk through the operator dashboard and guest experience flows we built for the challenge.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {HIGHLIGHTS.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-600 text-white/85"
                >
                  <Icon name="CheckCircleIcon" size={14} variant="solid" className="text-accent" />
                  {f}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/operator-dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-700 text-white shadow-gold transition-all hover:bg-accent-light hover:brightness-105"
              >
                <Icon name="ChartBarIcon" size={17} variant="solid" />
                Operator dashboard
              </Link>
              <Link
                href="/guest-experience"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-700 text-white transition-all hover:bg-white/20"
              >
                <Icon name="PlayCircleIcon" size={17} />
                Guest AI flow
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
