'use client';

import ErrorMessage from '@/components/ErrorMessage';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <ErrorMessage message={error.message || 'Kutilmagan xatolik yuz berdi.'} onRetry={reset} />
    </div>
  );
}
