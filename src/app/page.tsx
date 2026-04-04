import { createClient } from '@/utils/supabase/server';
import RoomCard from '@/components/pricing/RoomCard';

export default async function RoomsPage() {
  const supabase = createClient();
  
  // Fetch rooms from the database
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select('*');

  if (error) {
    return <div>Error loading rooms: {error.message}</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Available Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms?.map((room) => (
          <RoomCard
            key={room.id}
            name={room.name}
            // Mocking original price for the UI demo since our simple schema only has current_price
            originalPrice={Math.round(room.current_price * 1.25)} 
            currentPrice={room.current_price}
          />
        ))}
      </div>
    </div>
  );
}