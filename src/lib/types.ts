export type DemandLevel = 'low' | 'medium' | 'high';
export type SuggestionStatus = 'pending' | 'approved' | 'rejected';

export interface PricingSuggestion {
  id: string;
  room_id: string;
  room_name: string; // Joined from rooms table
  current_price: number;
  suggested_price: number;
  occupancy: number;
  demand_level: DemandLevel;
  confidence_score: number;
  explanation: string;
  status: SuggestionStatus;
  date: string;
}