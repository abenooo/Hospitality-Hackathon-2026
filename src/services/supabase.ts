import { createClient } from '@/utils/supabase/server'; // Adjust path based on your setup
import { SuggestionStatus } from '@/lib/types';

/**
 * Updates the approved price in the main 'rooms' table 
 * and marks the suggestion as 'approved'.
 */
export async function approvePriceAction(
  suggestionId: string, 
  roomId: string, 
  finalPrice: number
) {
  const supabase = createClient();

  // 1. Update the actual room price (Existing Table)
  const { error: roomError } = await supabase
    .from('rooms')
    .update({ current_price: finalPrice })
    .eq('id', roomId);

  if (roomError) throw new Error(roomError.message);

  // 2. Update the suggestion status (New Table)
  const { error: suggestionError } = await supabase
    .from('pricing_suggestions')
    .update({ 
      status: 'approved' as SuggestionStatus,
      approved_price: finalPrice 
    })
    .eq('id', suggestionId);

  if (suggestionError) throw new Error(suggestionError.message);
  
  return { success: true };
}