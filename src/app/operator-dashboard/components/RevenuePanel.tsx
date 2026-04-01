'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function RevenuePanel() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');

  const data = {
    today: {
      total: '126,400',
      currency: 'ETB',
      change: '+18%',
      breakdown: [
        { label: 'Room Revenue', val: '89,250', pct: 71 },
        { label: 'F&B Upsells', val: '24,800', pct: 20 },
        { label: 'Activities', val: '12,350', pct: 9 },
      ],
    },
    week: {
      total: '842,600',
      currency: 'ETB',
      change: '+24%',
      breakdown: [
        { label: 'Room Revenue', val: '598,100', pct: 71 },
        { label: 'F&B Upsells', val: '168,520', pct: 20 },
        { label: 'Activities', val: '75,980', pct: 9 },
      ],
    },
    month: {
      total: '3,214,000',
      currency: 'ETB',
      change: '+34%',
      breakdown: [
        { label: 'Room Revenue', val: '2,281,940', pct: 71 },
        { label: 'F&B Upsells', val: '642,800', pct: 20 },
        { label: 'Activities', val: '289,260', pct: 9 },
      ],
    },
  };

  const d = data[period];

  return (
    <div className="metric-card h-full p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-700 text-resort-foreground">Revenue Intelligence</h3>
          <p className="text-xs font-500 text-resort-muted">AI-optimized pricing active</p>
        </div>
        <div className="flex gap-0.5 rounded-full bg-resort-muted-bg p-1">
          {(['today', 'week', 'month'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`rounded-full px-3 py-1 text-xs font-700 capitalize transition-all ${
                period === p
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-resort-muted hover:text-resort-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex items-end gap-3">
        <p className="font-display text-4xl font-800 text-resort-foreground">{d.total}</p>
        <div className="mb-1">
          <p className="text-xs font-700 text-resort-muted">{d.currency}</p>
          <div className="flex items-center gap-1">
            <Icon name="ArrowTrendingUpIcon" size={12} className="text-primary" />
            <span className="text-xs font-700 text-primary">{d.change}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {d.breakdown.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-600 text-resort-muted">{item.label}</span>
              <span className="text-xs font-700 text-resort-foreground">{item.val} ETB</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-resort-muted-bg">
              <div className="h-full rounded-full bg-primary" style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-primary-50 p-3">
          <p className="mb-1 text-[10px] font-700 uppercase tracking-wider text-primary">AI Pricing</p>
          <p className="text-sm font-800 text-resort-foreground">+18% yield</p>
          <p className="text-[10px] font-500 text-resort-muted">vs static rates</p>
        </div>
        <div className="rounded-xl bg-accent/8 p-3">
          <p className="mb-1 text-[10px] font-700 uppercase tracking-wider text-accent-dark">Upsell AI</p>
          <p className="text-sm font-800 text-resort-foreground">24,800 ETB</p>
          <p className="text-[10px] font-500 text-resort-muted">F&B today</p>
        </div>
      </div>
    </div>
  );
}
