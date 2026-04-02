'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  active: boolean;
}

function AnimatedCounter({ target, prefix = '', suffix = '', duration = 1800, active }: CounterProps) {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    startRef.current = null;

    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [active, target, duration]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}

const METRICS = [
  {
    value: 34,
    prefix: '+',
    suffix: '%',
    label: 'Average Revenue Increase',
    sublabel: 'Across 12 Ethiopian resorts',
    color: 'text-primary',
    bg: 'bg-primary-50',
  },
  {
    value: 2400000,
    prefix: '₿',
    suffix: '',
    label: 'ETB Recovered Monthly',
    sublabel: 'From prevented cancellations',
    color: 'text-accent-dark',
    bg: 'bg-accent/8',
  },
  {
    value: 91,
    prefix: '',
    suffix: '%',
    label: 'Occupancy Prediction Rate',
    sublabel: '30-day forecast accuracy',
    color: 'text-primary',
    bg: 'bg-primary-50',
  },
  {
    value: 48,
    prefix: '',
    suffix: 'hrs',
    label: 'Average ROI Payback',
    sublabel: 'From first week of deployment',
    color: 'text-accent-dark',
    bg: 'bg-accent/8',
  },
];

const BEFORE_AFTER = [
  {
    label: 'Weekend Room Pricing',
    before: '3,200 ETB / night (static)',
    after: '4,750 ETB / night (AI-dynamic)',
    improvement: '+48%',
  },
  {
    label: 'Cancellation Rate',
    before: '22% monthly average',
    after: '9% with AI early intervention',
    improvement: '-59%',
  },
  {
    label: 'F&B Revenue per Guest',
    before: '480 ETB average spend',
    after: '720 ETB with smart upsells',
    improvement: '+50%',
  },
];

export default function RevenueImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true);
          const els = sectionRef.current?.querySelectorAll('.scroll-reveal');
          els?.forEach((el) => el.classList.add('active'));
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="revenue" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-14 scroll-reveal">
          <p className="text-xs font-700 uppercase tracking-widest text-primary mb-3">Proven ROI</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="font-display font-800 text-section-title text-resort-foreground max-w-lg">
              Real Numbers.<br />
              <span className="text-primary italic font-300">Real Ethiopian Resorts.</span>
            </h2>
            <p className="text-base text-resort-muted font-500 max-w-sm leading-relaxed">
              Not projections. These are actual results from resort operators who deployed Kuriftu Resorts across the Rift Valley, Simien foothills, and Lalibela region.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14 stagger-children scroll-reveal">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className={`${metric.bg} rounded-2xl p-6 border border-resort-border`}
            >
              <p className={`font-display font-800 text-3xl sm:text-4xl mb-1 ${metric.color}`}>
                <AnimatedCounter
                  target={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  active={active}
                />
              </p>
              <p className="text-sm font-700 text-resort-foreground mb-1">{metric.label}</p>
              <p className="text-xs text-resort-muted font-500">{metric.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Before / After Cards */}
          <div className="space-y-4 scroll-reveal">
            <p className="text-xs font-700 uppercase tracking-widest text-resort-muted mb-5">Before → After Kuriftu Resorts</p>
            {BEFORE_AFTER.map((item, i) => (
              <div
                key={item.label}
                className="soft-card p-5 group hover-lift"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-sm font-700 text-resort-foreground">{item.label}</p>
                  <span className="text-sm font-800 text-primary bg-primary-50 px-3 py-1 rounded-full">
                    {item.improvement}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-resort-muted-bg rounded-xl p-3">
                    <p className="text-[10px] font-700 text-resort-muted uppercase tracking-wider mb-1">Before</p>
                    <p className="text-xs font-600 text-resort-muted">{item.before}</p>
                  </div>
                  <div className="bg-primary-50 rounded-xl p-3 border border-primary/10">
                    <p className="text-[10px] font-700 text-primary uppercase tracking-wider mb-1">After AI</p>
                    <p className="text-xs font-600 text-primary">{item.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: ROI Panel */}
          <div className="scroll-reveal scroll-reveal-delay-2">
            <div className="gradient-animate rounded-[28px] p-8 text-white noise-overlay relative overflow-hidden">
              {/* Blob */}
              <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/5 blob-animate-2 pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                  <Icon name="SparklesIcon" size={14} variant="solid" className="text-accent" />
                  <span className="text-xs font-700 uppercase tracking-widest text-accent">AI-Calculated ROI</span>
                </div>

                <h3 className="font-display font-800 text-3xl sm:text-4xl mb-2">
                  Pays for itself<br />
                  <span className="text-accent italic font-300">in 30 days.</span>
                </h3>
                <p className="text-white/60 text-sm font-500 leading-relaxed mb-8">
                  Average Kuriftu Resorts deployment generates 2.4M ETB in additional annual revenue for a 40-room property. Setup in under 4 hours.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { val: '4hrs', label: 'Setup Time' },
                    { val: '2.4M', label: 'ETB Annual Lift' },
                    { val: '30d', label: 'Payback Period' },
                    { val: '24/7', label: 'AI Monitoring' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/8 rounded-xl p-4">
                      <p className="text-2xl font-display font-800 text-accent">{stat.val}</p>
                      <p className="text-[10px] font-600 uppercase tracking-wider text-white/40 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/operator-dashboard"
                  className="inline-flex items-center gap-2.5 bg-accent text-white px-7 py-3.5 rounded-full font-700 text-sm hover:bg-accent-light hover:scale-105 transition-all"
                >
                  <Icon name="ChartBarIcon" size={16} variant="solid" />
                  Calculate My ROI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}