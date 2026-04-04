import { createClient } from '@/utils/supabase/server';
import PricingDashboard from '@/components/pricing/PricingDashboard';

export default async function AdminDashboardPage() {
  const supabase = createClient();
  
  // Fetch pending suggestions and join the room name
  const { data: suggestions, error } = await supabase
    .from('pricing_suggestions')
    .select(`
      *,
      rooms ( name )
    `)
    .eq('status', 'pending');

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Map the joined data to match your TypeScript interface
  const formattedSuggestions = suggestions?.map((s) => ({
    ...s,
    room_name: s.rooms?.name || 'Unknown Room'
  })) || [];

  return <PricingDashboard suggestions={formattedSuggestions as any} />;
}