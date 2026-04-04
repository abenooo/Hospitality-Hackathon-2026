import React from 'react';

interface RoomCardProps {
  name: string;
  originalPrice: number;
  currentPrice: number;
  imageUrl?: string;
}

export default function RoomCard({ name, originalPrice, currentPrice, imageUrl }: RoomCardProps) {
  const isDiscounted = currentPrice < originalPrice;
  const discountPercentage = isDiscounted 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) 
    : 0;

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white max-w-sm">
      <div className="h-48 bg-gray-200 w-full flex items-center justify-center text-gray-500">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="object-cover h-full w-full" />
        ) : (
          <span>Room Image</span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{name}</h3>
        
        <div className="flex items-center space-x-2">
          {isDiscounted ? (
            <>
              <span className="text-gray-400 line-through text-sm">${originalPrice}</span>
              <span className="text-xl font-bold text-green-600">${currentPrice}</span>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                {discountPercentage}% OFF
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">${currentPrice}</span>
          )}
        </div>
        
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
}