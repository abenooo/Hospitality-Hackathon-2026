'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const ALERTS = [
  {
    type: 'critical',
    icon: 'ExclamationTriangleIcon',
    title: 'Cancellation Risk',
    body: '3 bookings (Fri-Sun) show 78% cancellation probability. Recommend: send retention offer now.',
    time: '2 min ago',
    action: 'Send Offer',
    impact: '+12,600 ETB',
  },
  {
    type: 'warning',
    icon: 'ArrowTrendingUpIcon',
    title: 'Demand Spike Detected',
    body: 'Timkat festival (Jan 19) search volume up 340%. Raise rates +22% before competitors.',
    time: '18 min ago',
    action: 'Adjust Pricing',
    impact: '+34,200 ETB',
  },
  {
    type: 'success',
    icon: 'SparklesIcon',
    title: 'Upsell Opportunity',
    body: '8 guests arriving tomorrow show high F&B spend propensity. Pre-load dinner package offer.',
    time: '1 hr ago',
    action: 'Activate Offer',
    impact: '+8,400 ETB',
  },
  {
    type: 'warning',
    icon: 'CloudIcon',
    title: 'Weather Impact',
    body: 'Heavy rain forecast next 3 days. Recommend indoor activity bundle promotion.',
    time: '2 hrs ago',
    action: 'Create Bundle',
    impact: '+5,100 ETB',
  },
];

export default function AIAlertsPanel() {
  const [dismissed, setDismissed] = useState<number[]>([]);

  const visible = ALERTS.filter((_, i) => !dismissed.includes(i));

  return (
    <div className="metric-card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-700 text-resort-foreground">AI Action Alerts</h3>
          <p className="text-xs text-resort-muted font-500">{visible.length} active recommendations</p>
        </div>
        <div className="w-7 h-7 bg-red-50 rounded-full flex items-center justify-center">
          <span className="text-xs font-800 text-red-500">{visible.filter(a => a.type === 'critical').length}</span>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-auto">
        {ALERTS.map((alert, i) => (
          dismissed.includes(i) ? null : (
            <div
              key={i}
              className={`rounded-xl p-3 ${
                alert.type === 'critical' ? 'alert-critical' :
                alert.type === 'warning' ? 'alert-warning' : 'alert-success'
              }`}
            >
              <div className="flex items-start gap-2 mb-2">
                <Icon
                  name={alert.icon as any}
                  size={14}
                  variant="solid"
                  className={
                    alert.type === 'critical' ? 'text-red-500 mt-0.5 shrink-0' :
                    alert.type === 'warning' ? 'text-accent-dark mt-0.5 shrink-0' : 'text-primary mt-0.5 shrink-0'
                  }
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-700 text-resort-foreground">{alert.title}</p>
                    <button
                      onClick={() => setDismissed((prev) => [...prev, i])}
                      className="text-resort-muted hover:text-resort-foreground transition-colors shrink-0"
                      aria-label="Dismiss alert"
                    >
                      <Icon name="XMarkIcon" size={12} />
                    </button>
                  </div>
                  <p className="text-[11px] text-resort-muted font-500 leading-snug mt-0.5">{alert.body}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-resort-muted font-500">{alert.time}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-700 text-primary">{alert.impact}</span>
                  <button className="text-[10px] font-700 bg-resort-foreground text-white px-2.5 py-1 rounded-full hover:bg-primary transition-colors">
                    {alert.action}
                  </button>
                </div>
              </div>
            </div>
          )
        ))}

        {visible.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icon name="CheckCircleIcon" size={32} variant="solid" className="text-primary mb-2" />
            <p className="text-sm font-700 text-resort-foreground">All clear!</p>
            <p className="text-xs text-resort-muted font-500">No active alerts</p>
          </div>
        )}
      </div>
    </div>
  );
}