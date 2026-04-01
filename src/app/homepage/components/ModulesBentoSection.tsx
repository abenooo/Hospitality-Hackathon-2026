'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

// Bento Grid Layout Audit (3-col):
// Row 1: [AI Decision Engine col-span-2] + [Revenue Optimization col-span-1] = 3/3 ✓
// Row 2: [Smart Guest Layer col-span-1] + [Operator Intelligence col-span-2] = 3/3 ✓

const MODULES = [
  {
    id: 'ai-engine',
    colSpan: 'lg:col-span-2',
    icon: 'CpuChipIcon',
    tag: 'Module 01',
    title: 'AI Decision Engine',
    titleAm: 'AI ውሳኔ ሞተር',
    description: 'Predicts guest behavior 30 days out — booking patterns, cancellation risk, spending propensity. Learns from historical + real-time data even in low-connectivity environments.',
    stats: [
      { val: '94%', label: 'Prediction Accuracy' },
      { val: '30d', label: 'Forecast Horizon' },
      { val: '<2s', label: 'Response Time' },
    ],
    bg: 'bg-resort-dark',
    textColor: 'text-white',
    accentColor: 'text-accent',
    tagBg: 'bg-accent/20 text-accent',
    href: '/operator-dashboard',
    visual: 'neural',
  },
  {
    id: 'revenue',
    colSpan: 'lg:col-span-1',
    icon: 'CurrencyDollarIcon',
    tag: 'Module 02',
    title: 'Revenue Optimizer',
    titleAm: 'ገቢ ማሻሻያ',
    description: 'Dynamic pricing for rooms, F&B, and services. Demand forecasting across seasons, local events, and tourism patterns.',
    stats: [
      { val: '+34%', label: 'Avg Revenue Lift' },
    ],
    bg: 'bg-primary',
    textColor: 'text-white',
    accentColor: 'text-accent-light',
    tagBg: 'bg-white/15 text-white',
    href: '/operator-dashboard',
    visual: 'chart',
  },
  {
    id: 'guest',
    colSpan: 'lg:col-span-1',
    icon: 'ChatBubbleLeftRightIcon',
    tag: 'Module 03',
    title: 'Smart Guest AI',
    titleAm: 'ስማርት እንግዳ AI',
    description: 'AI concierge in Amharic + English. Personalized itineraries, local experience recommendations, real-time in-stay suggestions.',
    stats: [
      { val: '4.8★', label: 'Guest Satisfaction' },
    ],
    bg: 'bg-white',
    textColor: 'text-resort-foreground',
    accentColor: 'text-primary',
    tagBg: 'bg-primary-50 text-primary',
    href: '/guest-experience',
    visual: 'chat',
  },
  {
    id: 'operator',
    colSpan: 'lg:col-span-2',
    icon: 'ChartBarIcon',
    tag: 'Module 04',
    title: 'Operator Intelligence',
    titleAm: 'ኦፕሬተር ብልህነት',
    description: 'Predict occupancy and revenue, identify risks (low bookings, cancellation clusters), suggest actions with measurable ETB impact. Multi-property scalable.',
    stats: [
      { val: '91%', label: 'Occupancy Prediction' },
      { val: '6hrs', label: 'Early Risk Warning' },
      { val: '3x', label: 'Faster Decisions' },
    ],
    bg: 'bg-resort-muted-bg',
    textColor: 'text-resort-foreground',
    accentColor: 'text-primary',
    tagBg: 'bg-primary/10 text-primary',
    href: '/operator-dashboard',
    visual: 'dashboard',
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
    <section id="platform" ref={sectionRef} className="py-20 lg:py-28 bg-resort-bg">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-12 scroll-reveal">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-700 uppercase tracking-widest text-primary mb-3">Core Platform</p>
              <h2 className="font-display font-800 text-section-title text-resort-foreground">
                Four AI Modules.<br />
                <span className="text-primary italic font-300">One Unified Brain.</span>
              </h2>
            </div>
            <p className="text-base text-resort-muted font-500 max-w-sm leading-relaxed">
              Each module works standalone or as part of the full Kuriftu AI intelligence stack. Built for Ethiopian connectivity realities.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {MODULES.map((module, idx) => (
            <div
              key={module.id}
              className={`${module.colSpan} ${module.bg} rounded-[28px] p-7 sm:p-8 flex flex-col justify-between min-h-[280px] border border-resort-border scroll-reveal hover-lift cursor-pointer group`}
              style={{ transitionDelay: `${idx * 0.08}s` }}
            >
              {/* Top */}
              <div>
                <div className="flex items-start justify-between mb-5">
                  <span className={`text-[10px] font-700 uppercase tracking-widest px-3 py-1.5 rounded-full ${module.tagBg}`}>
                    {module.tag}
                  </span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    module.bg === 'bg-resort-dark' || module.bg === 'bg-primary' ?'bg-white/10' :'bg-primary/10'
                  }`}>
                    <Icon
                      name={module.icon as any}
                      size={20}
                      variant="solid"
                      className={module.bg === 'bg-resort-dark' || module.bg === 'bg-primary' ? 'text-white' : 'text-primary'}
                    />
                  </div>
                </div>

                <h3 className={`font-display font-800 text-2xl sm:text-3xl mb-1 ${module.textColor}`}>
                  {module.title}
                </h3>
                <p className={`text-xs font-600 mb-4 opacity-50 ${module.textColor}`}>{module.titleAm}</p>
                <p className={`text-sm font-500 leading-relaxed ${
                  module.textColor === 'text-white' ? 'text-white/65' : 'text-resort-muted'
                }`}>
                  {module.description}
                </p>
              </div>

              {/* Bottom Stats + Link */}
              <div className="mt-6">
                {module.stats.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-5">
                    {module.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className={`text-2xl font-display font-800 ${module.accentColor}`}>{stat.val}</p>
                        <p className={`text-[10px] font-600 uppercase tracking-wider opacity-50 ${module.textColor}`}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  href={module.href}
                  className={`inline-flex items-center gap-2 text-sm font-700 transition-all group-hover:gap-3 ${module.accentColor}`}
                >
                  Explore Module
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Offline Badge */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 scroll-reveal">
          {[
            { icon: 'WifiIcon', label: 'Offline-First Architecture' },
            { icon: 'LanguageIcon', label: 'Amharic + English' },
            { icon: 'ShieldCheckIcon', label: 'Low-Data Optimized' },
            { icon: 'BuildingOfficeIcon', label: 'Multi-Resort Scalable' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="inline-flex items-center gap-2 bg-white border border-resort-border rounded-full px-4 py-2 text-sm font-600 text-resort-muted"
            >
              <Icon name={badge.icon as any} size={15} className="text-primary" />
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}