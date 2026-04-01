'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function OccupancyPanel() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  const occupancy = 68;
  const rooms = [
    { type: 'Deluxe Suite', total: 12, occupied: 10, rate: '4,750 ETB' },
    { type: 'Garden View', total: 18, occupied: 11, rate: '3,200 ETB' },
    { type: 'Standard', total: 12, occupied: 7, rate: '2,100 ETB' },
  ];

  return (
    <div className="metric-card p-5 h-full">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-700 text-resort-foreground">Occupancy Today</h3>
          <p className="text-xs text-resort-muted font-500">42 rooms total · March 31, 2026</p>
        </div>
        <div className="flex items-center gap-1.5 bg-primary-50 rounded-full px-3 py-1">
          <Icon name="ArrowTrendingUpIcon" size={13} className="text-primary" />
          <span className="text-xs font-700 text-primary">+12% vs last week</span>
        </div>
      </div>
      {/* Big Number */}
      <div className="flex items-end gap-4 mb-5">
        <p className="font-display font-800 text-5xl text-resort-foreground">{occupancy}%</p>
        <div className="mb-1">
          <p className="text-sm font-700 text-resort-foreground">29 / 42 rooms</p>
          <p className="text-xs text-resort-muted font-500">occupied right now</p>
        </div>
      </div>
      {/* Progress Ring visual (bar) */}
      <div className="h-2.5 bg-resort-muted-bg rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000"
          style={{ width: animated ? `${occupancy}%` : '0%' }}
        />
      </div>
      {/* Room Breakdown */}
      <div className="space-y-2">
        {rooms?.map((room) => (
          <div key={room?.type} className="flex items-center justify-between py-2 border-b border-resort-border last:border-0">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-primary"
                style={{ opacity: room?.occupied / room?.total }}
              />
              <span className="text-xs font-600 text-resort-foreground">{room?.type}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-resort-muted font-500">{room?.occupied}/{room?.total}</span>
              <span className="text-xs font-700 text-primary">{room?.rate}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-accent/8 border border-accent/15 rounded-xl p-3">
        <div className="flex items-start gap-2">
          <Icon name="SparklesIcon" size={14} variant="solid" className="text-accent mt-0.5 shrink-0" />
          <p className="text-xs font-600 text-accent-dark leading-snug">
            AI Insight: 3 rooms likely to cancel tonight. Recommend pre-emptive discount offer to guests booked &gt;7 days ago.
          </p>
        </div>
      </div>
    </div>
  );
}