import ApprovalTable from "./ApprovalTable";
import GenerateSuggestionsButton from "./GenerateSuggestionsButton";
import { PricingSuggestion } from "@/lib/types";

export default function PricingDashboard({ suggestions }: { suggestions: PricingSuggestion[] }) {
  const avgIncrease = suggestions.length > 0 
    ? (suggestions.reduce((acc, s) => acc + (s.suggested_price - s.current_price), 0) / suggestions.length).toFixed(2)
    : "0.00";

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing Strategy</h1>
          <p className="text-gray-500">Review and approve data-driven price adjustments.</p>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Potential Revenue Lift</p>
            <p className="text-2xl font-bold text-blue-900">+${avgIncrease} avg/room</p>
          </div>
          <GenerateSuggestionsButton />
        </div>
      </header>

      <section>
        <ApprovalTable initialData={suggestions} />
      </section>
    </div>
  );
}