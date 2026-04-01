'use client';

import React from 'react';

const DATA = [
  { day: 'Mon', forecast: 42, actual: 38 },
  { day: 'Tue', forecast: 45, actual: 41 },
  { day: 'Wed', forecast: 48, actual: 46 },
  { day: 'Thu', forecast: 52, actual: 49 },
  { day: 'Fri', forecast: 58, actual: 55 },
  { day: 'Sat', forecast: 62, actual: 59 },
  { day: 'Sun', forecast: 55, actual: 52 },
];

export default function ForecastChart() {
  const max = Math.max(...DATA.map((d) => Math.max(d.forecast, d.actual)));

  return (
    <div className="metric-card flex h-full min-h-[280px] flex-col p-5">
      <div className="mb-4">
        <h3 className="text-sm font-700 text-resort-foreground">7-Day Demand Forecast</h3>
        <p className="text-xs font-500 text-resort-muted">Occupancy % · AI vs trailing actuals</p>
      </div>
      <div className="flex min-h-[200px] flex-1 flex-col justify-end gap-2">
        <div className="flex h-40 items-end gap-1 sm:gap-2">
          {DATA.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end justify-center gap-0.5">
                <div
                  className="w-1/2 rounded-t bg-primary/80"
                  style={{ height: `${(d.forecast / max) * 100}%`, minHeight: 4 }}
                  title={`Forecast ${d.forecast}%`}
                />
                <div
                  className="w-1/2 rounded-t bg-accent"
                  style={{ height: `${(d.actual / max) * 100}%`, minHeight: 4 }}
                  title={`Actual ${d.actual}%`}
                />
              </div>
              <span className="text-[10px] font-600 text-resort-muted">{d.day}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 text-[10px] font-600 text-resort-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-primary" /> AI forecast
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-accent" /> Actual
          </span>
        </div>
      </div>
    </div>
  );
}
