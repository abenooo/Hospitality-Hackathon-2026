'use client';

import { useState, useTransition } from 'react';
import { generateSuggestionsAction } from '@/services/ai-trigger';

export default function GenerateSuggestionsButton() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    startTransition(async () => {
      try {
        setError(null);
        await generateSuggestionsAction();
      } catch (err: any) {
        setError(err.message);
      }
    });
  };

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleGenerate}
        disabled={isPending}
        className="bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 disabled:opacity-50 transition"
      >
        {isPending ? 'Generating...' : 'Run Pricing Model'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}