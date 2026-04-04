'use client';

import React, { useState } from 'react';
import { PricingSuggestion } from '@/lib/types';
import { approvePriceAction } from '@/services/pricing';

export default function ApprovalTable({ initialData }: { initialData: PricingSuggestion[] }) {
  const [data, setData] = useState(initialData);

  const handleApprove = async (id: string, roomId: string, price: number) => {
    try {
      await approvePriceAction(id, roomId, price);
      setData(prev => prev.filter(item => item.id !== id));
      alert("Price approved and updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update price.");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Room</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Current</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">AI Suggested</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Demand</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-4 font-medium text-gray-900">{item.room_name}</td>
              <td className="px-4 py-4 text-gray-700">${item.current_price}</td>
              <td className="px-4 py-4">
                <span className="text-blue-600 font-bold">${item.suggested_price}</span>
                <p className="text-xs text-gray-400">{item.explanation}</p>
              </td>
              <td className="px-4 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium 
                  ${item.demand_level === 'high' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {item.demand_level.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-4 space-x-2">
                <button 
                  onClick={() => handleApprove(item.id, item.room_id, item.suggested_price)}
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 transition"
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}