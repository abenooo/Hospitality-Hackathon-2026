'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const TIMELINE_ITEMS = [
  {
    day: 'Day 1',
    date: 'March 30',
    status: 'completed',
    title: 'Arrival & Welcome',
    events: [
      { time: '3:00pm', label: 'Check-in at Awash Falls Lodge', done: true },
      { time: '4:30pm', label: 'Coffee ceremony in the garden', done: true },
      { time: '7:00pm', label: 'Welcome dinner — Doro Wat feast', done: true },
    ],
  },
  {
    day: 'Day 2',
    date: 'March 31',
    status: 'today',
    title: 'Explore & Discover',
    events: [
      { time: '8:00am', label: 'Breakfast at resort', done: true },
      { time: '10:00am', label: 'Rift Valley flamingo walk', done: false },
      { time: '1:00pm', label: 'Traditional lunch at Meseret', done: false },
      { time: '5:00pm', label: 'Sunset at Lake Awash — AI recommended', done: false },
    ],
  },
  {
    day: 'Day 3',
    date: 'April 1',
    status: 'upcoming',
    title: 'Adventure Day',
    events: [
      { time: '5:30am', label: 'Simien Mountains sunrise trek', done: false },
      { time: '1:00pm', label: 'Return & spa session', done: false },
      { time: '7:00pm', label: 'Tej tasting dinner', done: false },
    ],
  },
  {
    day: 'Day 4',
    date: 'April 2',
    status: 'upcoming',
    title: 'Culture & Departure',
    events: [
      { time: '9:00am', label: 'Lalibela rock churches tour', done: false },
      { time: '4:00pm', label: 'Check-out & airport transfer', done: false },
    ],
  },
];

export default function StayTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef?.current?.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('active')),
      { threshold: 0.08 }
    );
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-resort-bg">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-12 scroll-reveal">
          <p className="text-xs font-700 uppercase tracking-widest text-primary mb-3">Stay Timeline</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h2 className="font-display font-800 text-section-title text-resort-foreground">
              Your full stay,<br />
              <span className="text-primary italic font-300">intelligently planned.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="inline-flex items-center gap-2 bg-white border border-resort-border rounded-full px-4 py-2">
                <Icon name="CalendarIcon" size={14} className="text-primary" />
                <span className="text-xs font-700 text-resort-foreground">March 30 – April 2, 2026</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary/15 rounded-full px-4 py-2">
                <Icon name="SparklesIcon" size={14} variant="solid" className="text-primary" />
                <span className="text-xs font-700 text-primary">AI-Optimized Schedule</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children scroll-reveal">
          {TIMELINE_ITEMS?.map((item, idx) => (
            <div
              key={item?.day}
              className={`soft-card p-5 relative overflow-hidden ${
                item?.status === 'today' ? 'ring-2 ring-primary shadow-premium' : ''
              }`}
            >
              {/* Status indicator */}
              {item?.status === 'today' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-[28px]" />
              )}
              {item?.status === 'completed' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-resort-muted-bg rounded-t-[28px]" />
              )}

              {/* Day Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`text-xs font-800 uppercase tracking-widest ${
                    item?.status === 'today' ? 'text-primary' :
                    item?.status === 'completed' ? 'text-resort-muted' : 'text-resort-muted'
                  }`}>
                    {item?.day}
                  </p>
                  <p className="text-sm font-700 text-resort-foreground">{item?.date}</p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item?.status === 'completed' ? 'bg-primary text-white' :
                  item?.status === 'today'? 'bg-accent text-white' : 'bg-resort-muted-bg text-resort-muted'
                }`}>
                  {item?.status === 'completed'
                    ? <Icon name="CheckIcon" size={14} variant="solid" />
                    : item?.status === 'today'
                    ? <Icon name="StarIcon" size={14} variant="solid" />
                    : <span className="text-xs font-800">{idx + 1}</span>
                  }
                </div>
              </div>

              <p className="text-xs font-700 text-resort-foreground mb-3">{item?.title}</p>

              {/* Events */}
              <div className="space-y-2.5">
                {item?.events?.map((event, eIdx) => (
                  <div key={eIdx} className="flex items-start gap-2.5">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      event?.done
                        ? 'bg-primary border-primary'
                        : item?.status === 'today' ?'border-primary bg-white' :'border-resort-border bg-white'
                    }`}>
                      {event?.done && <Icon name="CheckIcon" size={8} variant="solid" className="text-white" />}
                    </div>
                    <div>
                      <span className={`text-[10px] font-700 ${
                        item?.status === 'today' ? 'text-primary' : 'text-resort-muted'
                      } block`}>{event?.time}</span>
                      <span className={`text-[11px] font-600 leading-snug ${
                        event?.done ? 'text-resort-muted line-through' : 'text-resort-foreground'
                      }`}>{event?.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {item?.status === 'today' && (
                <div className="mt-4 pt-3 border-t border-resort-border">
                  <button className="w-full py-2 bg-primary text-white rounded-xl text-xs font-700 hover:bg-primary-light transition-all">
                    View Full Day Plan
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center scroll-reveal">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white border border-resort-border rounded-[28px] p-6 sm:p-8 shadow-soft">
            <div className="text-left">
              <p className="text-base font-800 text-resort-foreground mb-1">Ready to book your Ethiopian adventure?</p>
              <p className="text-sm text-resort-muted font-500">Let our AI concierge plan every detail for you.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="#concierge"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-700 hover:bg-primary-light transition-all shadow-premium"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={15} />
                Chat with AI
              </a>
              <Link
                href="/operator-dashboard"
                className="inline-flex items-center gap-2 bg-resort-muted-bg text-resort-foreground px-6 py-3 rounded-full text-sm font-700 hover:bg-primary-50 transition-all"
              >
                <Icon name="ChartBarIcon" size={15} />
                Operator View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}