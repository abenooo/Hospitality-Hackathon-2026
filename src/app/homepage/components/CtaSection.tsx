'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const FEATURES = [
  'No credit card required',
  'Setup in under 4 hours',
  'Works offline immediately',
  'Amharic + English support',
];

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
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <div className="gradient-animate rounded-[40px] p-10 sm:p-16 text-center relative overflow-hidden noise-overlay scroll-reveal">
          {/* Blobs */}
          <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-white/5 blob-animate pointer-events-none" />
          <div className="absolute bottom-[-15%] right-[-8%] w-56 h-56 bg-accent/10 blob-animate-2 pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-5 py-2 mb-8">
              <span className="status-dot" />
              <span className="text-xs font-700 text-accent uppercase tracking-widest">Live in Ethiopia Now</span>
            </div>

            <h2 className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl text-white mb-4 leading-tight">
              Ready to elevate your<br />
              <span className="text-accent italic font-300">Kuriftu experience?</span>
            </h2>
            <p className="text-white/60 text-base sm:text-lg font-500 max-w-xl mx-auto mb-10 leading-relaxed">
              Join the Kuriftu Resorts family — using AI to predict demand, maximize revenue, and delight every guest across Ethiopia&apos;s most iconic lakeside destinations.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {FEATURES?.map((f) => (
                <div key={f} className="inline-flex items-center gap-2 text-sm font-600 text-white/70">
                  <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-accent" />
                  {f}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/operator-dashboard"
                className="inline-flex items-center gap-2.5 bg-accent text-white px-9 py-4 rounded-full font-700 text-base hover:bg-accent-light hover:scale-105 transition-all shadow-gold"
              >
                <Icon name="ChartBarIcon" size={18} variant="solid" />
                Start Free Trial
              </Link>
              <Link
                href="/guest-experience"
                className="inline-flex items-center gap-2.5 bg-white/10 text-white border border-white/20 px-9 py-4 rounded-full font-700 text-base hover:bg-white/20 transition-all"
              >
                <Icon name="PlayCircleIcon" size={18} />
                See Guest AI Live
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}