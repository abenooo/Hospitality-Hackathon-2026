'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const TABS = [
  { id: 'revenue', label: 'Revenue AI', icon: 'CurrencyDollarIcon' },
  { id: 'guests', label: 'Guest Intel', icon: 'UsersIcon' },
  { id: 'operations', label: 'Operations', icon: 'Cog6ToothIcon' },
];

const PRICING_DATA = [
  { room: 'Deluxe Suite', current: '4,750', recommended: '5,600', reason: 'Timkat festival demand spike', confidence: 94 },
  { room: 'Garden View', current: '3,200', recommended: '3,850', reason: 'Weekend occupancy forecast 91%', confidence: 88 },
  { room: 'Standard', current: '2,100', recommended: '2,400', reason: 'Competitive rate analysis', confidence: 79 },
];

const GUEST_SEGMENTS = [
  { segment: 'Domestic Leisure', count: 14, spend: '2,800 ETB avg', trend: '+8%', flag: '🇪🇹' },
  { segment: 'International Tourist', count: 11, spend: '$124 USD avg', trend: '+22%', flag: '🌍' },
  { segment: 'Business Travel', count: 4, spend: '3,400 ETB avg', trend: '-5%', flag: '💼' },
];

const OPS_ITEMS = [
  { area: 'Housekeeping', status: 'On Track', rooms: '8 rooms due by 14:00', color: 'text-primary' },
  { area: 'F&B Prep', status: 'Alert', rooms: 'Low stock: Tej, Injera ingredients', color: 'text-red-500' },
  { area: 'Maintenance', status: 'Pending', rooms: '2 open tickets (Room 14, Pool pump)', color: 'text-accent-dark' },
  { area: 'Staff Scheduling', status: 'AI Optimized', rooms: '18 staff for tomorrow peak', color: 'text-primary' },
];

export default function ModuleTabs() {
  const [activeTab, setActiveTab] = useState('revenue');

  return (
    <div className="metric-card p-5">
      {/* Tab Bar */}
      <div className="flex gap-1 bg-resort-muted-bg rounded-2xl p-1.5 mb-6 w-full sm:w-auto sm:inline-flex">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-700 transition-all flex-1 sm:flex-none justify-center ${
              activeTab === tab.id
                ? 'bg-white text-resort-foreground shadow-card'
                : 'text-resort-muted hover:text-resort-foreground'
            }`}
          >
            <Icon name={tab.icon as any} size={15} variant={activeTab === tab.id ? 'solid' : 'outline'} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="tab-content-panel">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-700 text-resort-foreground">AI Pricing Recommendations</h3>
              <p className="text-xs text-resort-muted font-500">Updated 4 minutes ago · Apply all for +18% yield</p>
            </div>
            <button className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-xs font-700 hover:bg-primary-light transition-all">
              <Icon name="BoltIcon" size={13} variant="solid" />
              Apply All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-resort-border">
                  {['Room Type', 'Current ETB', 'AI Recommended', 'Reason', 'Confidence'].map((h) => (
                    <th key={h} className="text-left text-[10px] font-700 text-resort-muted uppercase tracking-wider pb-3 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-resort-border">
                {PRICING_DATA.map((row) => (
                  <tr key={row.room} className="group hover:bg-primary-50/50 transition-colors">
                    <td className="py-3 pr-4 text-sm font-700 text-resort-foreground">{row.room}</td>
                    <td className="py-3 pr-4 text-sm text-resort-muted font-500">{row.current}</td>
                    <td className="py-3 pr-4">
                      <span className="text-sm font-800 text-primary">{row.recommended} ETB</span>
                    </td>
                    <td className="py-3 pr-4 text-xs text-resort-muted font-500 max-w-[180px]">{row.reason}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 bg-resort-muted-bg rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${row.confidence}%` }} />
                        </div>
                        <span className="text-xs font-700 text-resort-foreground">{row.confidence}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Guests Tab */}
      {activeTab === 'guests' && (
        <div className="tab-content-panel">
          <div className="mb-4">
            <h3 className="text-sm font-700 text-resort-foreground">Guest Intelligence</h3>
            <p className="text-xs text-resort-muted font-500">29 guests in-stay · Segmented by AI</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {GUEST_SEGMENTS.map((seg) => (
              <div key={seg.segment} className="bg-resort-muted-bg rounded-2xl p-4">
                <div className="text-2xl mb-2">{seg.flag}</div>
                <p className="text-sm font-700 text-resort-foreground mb-1">{seg.segment}</p>
                <p className="text-2xl font-display font-800 text-resort-foreground">{seg.count}</p>
                <p className="text-xs text-resort-muted font-500 mb-2">guests</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-600 text-resort-muted">{seg.spend}</span>
                  <span className={`text-xs font-700 ${seg.trend.startsWith('+') ? 'text-primary' : 'text-red-500'}`}>{seg.trend}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-primary-50 border border-primary/15 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Icon name="SparklesIcon" size={15} variant="solid" className="text-primary mt-0.5 shrink-0" />
              <p className="text-xs font-600 text-primary-dark leading-relaxed">
                AI Insight: International guests spending 2.3x more on activities. Recommend: promote Simien Mountains day-trip package. Estimated uplift: +32,400 ETB this week.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Operations Tab */}
      {activeTab === 'operations' && (
        <div className="tab-content-panel">
          <div className="mb-4">
            <h3 className="text-sm font-700 text-resort-foreground">Operations Status</h3>
            <p className="text-xs text-resort-muted font-500">Real-time · AI-monitored · March 31, 2026</p>
          </div>
          <div className="space-y-3">
            {OPS_ITEMS.map((item) => (
              <div key={item.area} className="flex items-center gap-4 p-4 bg-resort-muted-bg rounded-xl">
                <div className="flex-1">
                  <p className="text-sm font-700 text-resort-foreground">{item.area}</p>
                  <p className="text-xs text-resort-muted font-500">{item.rooms}</p>
                </div>
                <span className={`text-xs font-700 ${item.color} bg-white px-3 py-1 rounded-full border border-resort-border`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            {[
              { label: 'Staff on Duty', val: '14', sub: 'of 18 scheduled' },
              { label: 'Open Tickets', val: '2', sub: 'maintenance items' },
              { label: 'Energy Usage', val: '-12%', sub: 'vs last week' },
            ].map((stat) => (
              <div key={stat.label} className="bg-resort-muted-bg rounded-xl p-3 text-center">
                <p className="text-lg font-800 text-resort-foreground">{stat.val}</p>
                <p className="text-xs font-700 text-resort-foreground">{stat.label}</p>
                <p className="text-xs text-resort-muted font-500">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}