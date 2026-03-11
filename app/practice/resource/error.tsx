"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-red-200 rounded-xl bg-red-50/30">
      <div className="text-red-600 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong!</h2>
      <p className="text-gray-500 text-sm mb-6 text-center max-w-xs">
        {error.message || "An unexpected error occurred while loading the resource."}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Try again
        </button>
        
        <Link 
          href="/practice/parallelRoute"
          className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}