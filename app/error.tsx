'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
