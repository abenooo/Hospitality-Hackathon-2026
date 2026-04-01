'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const ACTIONS = [
  {
    icon: 'CurrencyDollarIcon',
    label: 'Apply AI Pricing',
    sublabel: 'Auto-adjust all room rates',
    impact: '+18% yield',
    variant: 'primary',
  },
  {
    icon: 'EnvelopeIcon',
    label: 'Send Retention Offer',
    sublabel: '3 at-risk bookings targeted',
    impact: '+12,600 ETB',
    variant: 'accent',
  },
  {
    icon: 'StarIcon',
    label: 'Activate Upsell Bundle',
    sublabel: '8 high-value guests arriving',
    impact: '+8,400 ETB',
    variant: 'primary',
  },
  {
    icon: 'CalendarIcon',
    label: 'Generate Demand Report',
    sublabel: 'April 2026 forecast',
    impact: 'PDF Export',
    variant: 'neutral',
  },
];

export default function QuickActionsPanel() {
  const [applied, setApplied] = useState<number[]>([]);

  return (
    <div className="metric-card p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-700 text-resort-foreground">Quick AI Actions</h3>
          <p className="text-xs text-resort-muted font-500">One-click recommendations</p>
        </div>
        <Icon name="SparklesIcon" size={18} variant="solid" className="text-accent" />
      </div>

      <div className="space-y-3">
        {ACTIONS.map((action, i) => (
          <div
            key={action.label}
            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
              applied.includes(i)
                ? 'bg-primary-50 border-primary/20' :'bg-resort-bg border-resort-border hover:border-primary/20'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              action.variant === 'primary' ? 'bg-primary/10' :
              action.variant === 'accent' ? 'bg-accent/10' : 'bg-resort-muted-bg'
            }`}>
              <Icon
                name={action.icon as any}
                size={17}
                variant="solid"
                className={
                  action.variant === 'primary' ? 'text-primary' :
                  action.variant === 'accent' ? 'text-accent-dark' : 'text-resort-muted'
                }
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-700 text-resort-foreground">{action.label}</p>
              <p className="text-[10px] text-resort-muted font-500">{action.sublabel}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[10px] font-700 ${action.variant === 'primary' ? 'text-primary' : action.variant === 'accent' ? 'text-accent-dark' : 'text-resort-muted'}`}>
                {action.impact}
              </span>
              <button
                onClick={() => setApplied((prev) => applied.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-800 transition-all ${
                  applied.includes(i)
                    ? 'bg-primary text-white' :'bg-resort-foreground text-white hover:bg-primary'
                }`}
                aria-label={applied.includes(i) ? 'Undo action' : 'Apply action'}
              >
                <Icon name={applied.includes(i) ? 'CheckIcon' : 'PlayIcon'} size={12} variant="solid" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-resort-muted-bg rounded-xl p-3 flex items-center gap-3">
        <Icon name="LightBulbIcon" size={16} variant="solid" className="text-accent shrink-0" />
        <p className="text-[11px] text-resort-muted font-600 leading-snug">
          Applying all 3 revenue actions could generate <span className="text-primary font-800">+39,600 ETB</span> this week.
        </p>
      </div>
    </div>
  );
}