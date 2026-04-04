'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, format, isSameMonth, isToday 
} from 'date-fns';
import { getMonthlyPrices, updateDailyPrice } from '@/services/calendar';

interface DailyPrice {
  id: string;
  date: string;
  price: number;
  demand_level: 'low' | 'medium' | 'high';
  is_discounted: boolean;
}

export default function CalendarView({ roomId, basePrice }: { roomId: string, basePrice: number }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pricingData, setPricingData] = useState<Record<string, DailyPrice>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  // Grid calculations
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  useEffect(() => {
    fetchPricing();
  }, [currentDate, roomId]);

  const fetchPricing = async () => {
    try {
      const data = await getMonthlyPrices(
        roomId, 
        format(startDate, 'yyyy-MM-dd'), 
        format(endDate, 'yyyy-MM-dd')
      );
      
      const pricingMap: Record<string, DailyPrice> = {};
      data.forEach((item: DailyPrice) => {
        pricingMap[item.date] = item;
      });
      setPricingData(pricingMap);
    } catch (error) {
      console.error("Failed to fetch calendar data:", error);
    }
  };

  const handleDayClick = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const existingData = pricingData[dateStr];
    setSelectedDate(day);
    setEditPrice(existingData ? existingData.price : basePrice);
  };

  const handleSavePrice = () => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, 'yyyy-MM-dd');

    startTransition(async () => {
      try {
        await updateDailyPrice(roomId, dateStr, editPrice);
        
        // Optimistic UI update
        setPricingData(prev => ({
          ...prev,
          [dateStr]: {
            ...prev[dateStr],
            date: dateStr,
            price: editPrice,
            demand_level: prev[dateStr]?.demand_level || 'medium',
            is_discounted: editPrice < basePrice
          }
        }));
        setSelectedDate(null);
      } catch (error) {
        console.error("Save failed:", error);
        alert("Failed to update price.");
      }
    });
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  const prevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));

  return (
    <div className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{format(currentDate, 'MMMM yyyy')}</h2>
        <div className="space-x-2">
          <button onClick={prevMonth} className="px-3 py-1 border rounded hover:bg-gray-50 text-black">Prev</button>
          <button onClick={nextMonth} className="px-3 py-1 border rounded hover:bg-gray-50 text-black">Next</button>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 text-center py-2 text-sm font-semibold text-gray-600">
            {day}
          </div>
        ))}

        {/* Grid Cells */}
        {calendarDays.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayData = pricingData[dateStr];
          const priceDisplay = dayData ? dayData.price : basePrice;
          
          let bgColor = 'bg-white';
          if (dayData?.demand_level === 'high') bgColor = 'bg-red-50'; // Color coded: High demand
          if (dayData?.is_discounted) bgColor = 'bg-green-50'; // Color coded: Discounted
          if (!isSameMonth(day, monthStart)) bgColor = 'bg-gray-50 opacity-50';

          return (
            <div 
              key={dateStr}
              onClick={() => handleDayClick(day)}
              className={`min-h-[80px] p-2 border border-transparent hover:border-blue-400 cursor-pointer transition flex flex-col justify-between ${bgColor}`}
            >
              <span className={`text-xs font-medium ${isToday(day) ? 'text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center' : 'text-gray-500'}`}>
                {format(day, 'd')}
              </span>
              <span className="text-sm font-bold text-gray-800 text-center block mt-2">
                ${priceDisplay}
              </span>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl text-black">
            <h3 className="text-lg font-bold mb-4">Edit Price for {format(selectedDate, 'MMM do, yyyy')}</h3>
            <label className="block text-sm text-gray-600 mb-1">Price ($)</label>
            <input 
              type="number" 
              value={editPrice}
              onChange={(e) => setEditPrice(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setSelectedDate(null)} 
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                disabled={isPending}
              >
                Cancel
              </button>
              <button 
                onClick={handleSavePrice} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isPending}
              >
                {isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}