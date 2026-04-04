'use server'

import { createClient } from '@/utils/supabase/server';
import { getAiPriceSuggestion } from '@/lib/ai-pricing';
import { DemandLevel } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function generateSuggestionsAction() {
  const supabase = createClient();

  const { data: rooms, error: fetchError } = await supabase
    .from('rooms')
    .select('*');

  if (fetchError) throw new Error(fetchError.message);

  const demands: DemandLevel[] = ['low', 'medium', 'high'];

  for (const room of rooms) {
    // Mocking real-time data inputs for the pricing model
    const mockOccupancy = Math.floor(Math.random() * 100);
    const mockDemand = demands[Math.floor(Math.random() * demands.length)];

    const { suggested_price, explanation } = await getAiPriceSuggestion(
      room.current_price,
      mockOccupancy,
      mockDemand
    );

    const { error: insertError } = await supabase
      .from('pricing_suggestions')
      .insert({
        room_id: room.id,
        date: new Date().toISOString().split('T')[0],
        suggested_price,
        occupancy: mockOccupancy,
        demand_level: mockDemand,
        explanation
      });

    if (insertError) throw new Error(insertError.message);
  }

  revalidatePath('/admin');
}