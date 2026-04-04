
import { DemandLevel } from "./types";

/**
 * Mocks the AI logic for price generation.
 * In a real scenario, this would call an LLM or a Python microservice.
 */
export async function getAiPriceSuggestion(
  basePrice: number,
  occupancy: number,
  demand: DemandLevel
) {
  let multiplier = 1.0;

  // Simple logic for hackathon demo
  if (demand === 'high') multiplier += 0.3;
  if (demand === 'low') multiplier -= 0.1;
  if (occupancy > 80) multiplier += 0.15;

  const suggested_price = Math.round(basePrice * multiplier);
  
  return {
    suggested_price,
    confidence_score: 0.85 + Math.random() * 0.1,
    explanation: `Based on ${demand} demand and ${occupancy}% occupancy. Recommend ${multiplier > 1 ? 'increase' : 'discount'}.`
  };
}