'use client';

import React, { useState } from 'react';
import { PricingSuggestion } from '@/lib/types';
import { approvePriceAction, bulkApprovePricesAction } from '@/services/pricing';

export default function ApprovalTable({ initialData }: { initialData: PricingSuggestion[] }) {
  const [data, setData] = useState(initialData);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleApprove = async (id: string, roomId: string, price: number) => {
    try {
      await approvePriceAction(id, roomId, price);
      setData(prev => prev.filter(item => item.id !== id));
      setSelectedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update price.");
    }
  };

  const handleBulkApprove = async () => {
    const selectedSuggestions = data
      .filter(item => selectedIds.has(item.id))
      .map(item => ({ id: item.id, roomId: item.room_id, price: item.suggested_price }));

    try {
      await bulkApprovePricesAction(selectedSuggestions);
      setData(prev => prev.filter(item => !selectedIds.has(item.id)));
      setSelectedIds(new Set());
    } catch (err) {
      console.error(err);
      alert("Failed to bulk update prices.");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map(item => item.id)));
    }
  };

  if (data.length === 0) return <p className="text-gray-500">No pending suggestions.</p>;

  return (
    <div className="space-y-4">
      {selectedIds.size > 0 && (
        <button 
          onClick={handleBulkApprove}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Approve Selected ({selectedIds.size})
        </button>
      )}
      
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input 
                  type="checkbox" 
                  checked={selectedIds.size === data.length && data.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
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
                <td className="px-4 py-4">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                </td>
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
                <td className="px-4 py-4">
                  <button 
                    onClick={() => handleApprove(item.id, item.room_id, item.suggested_price)}
                    className="border border-indigo-600 text-indigo-600 px-3 py-1.5 rounded hover:bg-indigo-50 transition"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}