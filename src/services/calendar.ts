'use server'

import { createClient } from '@/utils/supabase/server';

export async function getMonthlyPrices(roomId: string, startDate: string, endDate: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('daily_room_prices')
    .select('*')
    .eq('room_id', roomId)
    .gte('date', startDate)
    .lte('date', endDate);

  if (error) throw new Error(error.message);
  return data;
}

export async function updateDailyPrice(roomId: string, date: string, newPrice: number) {
  const supabase = createClient();
  
  // Upsert handles both insert if the date doesn't exist, and update if it does
  const { error } = await supabase
    .from('daily_room_prices')
    .upsert({
      room_id: roomId,
      date: date,
      price: newPrice,
      // For the hackathon demo, defaulting these. You can expand to take these as arguments.
      demand_level: 'medium', 
      is_discounted: false 
    }, { onConflict: 'room_id, date' });

  if (error) throw new Error(error.message);
  return { success: true };
}