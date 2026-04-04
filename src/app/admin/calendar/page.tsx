import { createClient } from '@/utils/supabase/server';
import CalendarView from '@/components/pricing/CalendarView';

export default async function AdminCalendarPage() {
  const supabase = createClient();
  
  // Fetch the first room to use for the calendar demo
  const { data: room, error } = await supabase
    .from('rooms')
    .select('*')
    .limit(1)
    .single();

  if (error || !room) {
    return <div>Error loading room for calendar: {error?.message}</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Calendar Pricing: {room.name}
      </h1>
      <CalendarView roomId={room.id} basePrice={room.current_price} />
    </div>
  );
}