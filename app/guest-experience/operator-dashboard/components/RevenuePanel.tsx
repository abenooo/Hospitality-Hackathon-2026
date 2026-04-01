'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function RevenuePanel() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');

  const data = {
    today: { total: '126,400', currency: 'ETB', change: '+18%', breakdown: [
      { label: 'Room Revenue', val: '89,250', pct: 71 },
      { label: 'F&B Upsells', val: '24,800', pct: 20 },
      { label: 'Activities', val: '12,350', pct: 9 },
    ]},
    week: { total: '842,600', currency: 'ETB', change: '+24%', breakdown: [
      { label: 'Room Revenue', val: '598,100', pct: 71 },
      { label: 'F&B Upsells', val: '168,520', pct: 20 },
      { label: 'Activities', val: '75,980', pct: 9 },
    ]},
    month: { total: '3,214,000', currency: 'ETB', change: '+34%', breakdown: [
      { label: 'Room Revenue', val: '2,281,940', pct: 71 },
      { label: 'F&B Upsells', val: '642,800', pct: 20 },
      { label: 'Activities', val: '289,260', pct: 9 },
    ]},
  };

  const d = data[period];

  return (
    <div className="metric-card p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-700 text-resort-foreground">Revenue Intelligence</h3>
          <p className="text-xs text-resort-muted font-500">AI-optimized pricing active</p>
        </div>
        <div className="flex bg-resort-muted-bg rounded-full p-1 gap-0.5">
          {(['today', 'week', 'month'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full text-xs font-700 transition-all capitalize ${
                period === p ? 'bg-primary text-white shadow-sm' : 'text-resort-muted hover:text-resort-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-3 mb-4">
        <p className="font-display font-800 text-4xl text-resort-foreground">{d.total}</p>
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
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-600 text-resort-muted">{item.label}</span>
              <span className="text-xs font-700 text-resort-foreground">{item.val} ETB</span>
            </div>
            <div className="h-1.5 bg-resort-muted-bg rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${item.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-primary-50 rounded-xl p-3">
          <p className="text-[10px] font-700 text-primary uppercase tracking-wider mb-1">AI Pricing</p>
          <p className="text-sm font-800 text-resort-foreground">+18% yield</p>
          <p className="text-[10px] text-resort-muted font-500">vs static rates</p>
        </div>
        <div className="bg-accent/8 rounded-xl p-3">
          <p className="text-[10px] font-700 text-accent-dark uppercase tracking-wider mb-1">Upsell AI</p>
          <p className="text-sm font-800 text-resort-foreground">24,800 ETB</p>
          <p className="text-[10px] text-resort-muted font-500">F&B today</p>
        </div>
      </div>
    </div>
  );
}