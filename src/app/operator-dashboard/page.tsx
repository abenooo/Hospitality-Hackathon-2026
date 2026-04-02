'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import OccupancyPanel from './components/OccupancyPanel';
import RevenuePanel from './components/RevenuePanel';
import AIAlertsPanel from './components/AIAlertsPanel';
import ForecastChart from './components/ForecastChart';
import QuickActionsPanel from './components/QuickActionsPanel';
import ModuleTabs from './components/ModuleTabs';

const NAV_ITEMS = [
  { icon: 'ChartBarIcon', label: 'Dashboard', href: '/operator-dashboard', active: true },
  { icon: 'HomeModernIcon', label: 'Rooms', href: '/operator-dashboard' },
  { icon: 'UsersIcon', label: 'Guests', href: '/guest-experience' },
  { icon: 'CurrencyDollarIcon', label: 'Revenue', href: '/operator-dashboard' },
  { icon: 'BellIcon', label: 'Alerts', href: '/operator-dashboard' },
  { icon: 'Cog6ToothIcon', label: 'Settings', href: '/operator-dashboard' },
];

export default function OperatorDashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setCurrentTime(
        d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      );
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-screen bg-resort-bg">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-resort-dark transition-transform duration-300 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-white/8 px-6 py-5">
          <AppLogo size={34} />
          <div>
            <span className="font-display text-base font-800 tracking-tight text-white">Kuriftu Resorts</span>
            <p className="text-[10px] font-600 uppercase tracking-widest text-white/30">Intelligence Layer</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-600 transition-all ${
                item.active
                  ? 'bg-primary text-white shadow-premium'
                  : 'text-white/40 hover:bg-white/6 hover:text-white'
              }`}
            >
              <Icon name={item.icon as string} size={18} variant={item.active ? 'solid' : 'outline'} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/8 px-4 py-4">
          <div className="rounded-xl bg-white/6 p-3">
            <p className="mb-1 text-[10px] font-700 uppercase tracking-widest text-white/30">Active Property</p>
            <p className="text-sm font-700 text-white">Awash Falls Lodge</p>
            <p className="text-xs font-500 text-white/40">Afar Region · 42 rooms</p>
          </div>
          <Link
            href="/homepage"
            className="mt-3 flex items-center gap-2 px-3 py-2 text-xs font-600 text-white/30 transition-colors hover:text-white"
          >
            <Icon name="ArrowLeftIcon" size={14} />
            Back to Homepage
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-resort-border bg-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-resort-border lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Icon name="Bars3Icon" size={18} />
            </button>
            <div>
              <h1 className="font-display text-base font-800 text-resort-foreground">Operator Dashboard</h1>
              <p className="text-xs font-500 text-resort-muted">
                {currentTime} · March 31, 2026 · Addis Ababa Time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-primary/15 bg-primary-50 px-4 py-2 sm:flex">
              <span className="status-dot" />
              <span className="text-xs font-700 text-primary">AI Active</span>
            </div>
            <span className="offline-badge hidden sm:inline-flex">Offline-Ready</span>
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-resort-border transition-colors hover:bg-resort-muted-bg"
            >
              <Icon name="BellIcon" size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-800 text-white">
              YT
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-5 overflow-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <OccupancyPanel />
            </div>
            <div className="sm:col-span-2">
              <RevenuePanel />
            </div>
            <div className="lg:col-span-1">
              <AIAlertsPanel />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <ForecastChart />
            </div>
            <div className="sm:col-span-2">
              <GuestSatisfactionPanel />
            </div>
            <div className="sm:col-span-2">
              <QuickActionsPanel />
            </div>
          </div>

          <ModuleTabs />
        </main>
      </div>
    </div>
  );
}

function GuestSatisfactionPanel() {
  const scores = [
    { label: 'Overall', score: 4.8, color: 'bg-primary' },
    { label: 'Room Quality', score: 4.6, color: 'bg-primary' },
    { label: 'F&B', score: 4.5, color: 'bg-accent-dark' },
    { label: 'AI Concierge', score: 4.9, color: 'bg-primary' },
    { label: 'Cleanliness', score: 4.7, color: 'bg-primary' },
  ];

  return (
    <div className="metric-card h-full p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-700 text-resort-foreground">Guest Satisfaction</h3>
          <p className="text-xs font-500 text-resort-muted">Last 30 days · 124 reviews</p>
        </div>
        <div className="rounded-xl bg-primary-50 px-3 py-1.5">
          <p className="font-display text-xl font-800 text-primary">4.8★</p>
        </div>
      </div>
      <div className="space-y-3">
        {scores.map((s) => (
          <div key={s.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-600 text-resort-muted">{s.label}</span>
              <span className="text-xs font-700 text-resort-foreground">{s.score}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-resort-muted-bg">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${s.color}`}
                style={{ width: `${(s.score / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
