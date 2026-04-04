import ApprovalTable from "./ApprovalTable";
import { PricingSuggestion } from "@/lib/types";

export default function PricingDashboard({ suggestions }: { suggestions: PricingSuggestion[] }) {
  const avgIncrease = suggestions.length > 0 
    ? (suggestions.reduce((acc, s) => acc + (s.suggested_price - s.current_price), 0) / suggestions.length).toFixed(2)
    : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing Strategy</h1>
          <p className="text-gray-500">Review and approve AI-generated price adjustments.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Potential Revenue Lift</p>
          <p className="text-2xl font-bold text-blue-900">+${avgIncrease} avg/room</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quick Stats Cards */}
        <div className="p-4 bg-white shadow rounded-lg border">
          <p className="text-sm text-gray-500">Pending Approvals</p>
          <p className="text-2xl font-semibold">{suggestions.length}</p>
        </div>
        {/* Additional stats can go here */}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Review Suggestions</h2>
        <ApprovalTable initialData={suggestions} />
      </section>
    </div>
  );
}