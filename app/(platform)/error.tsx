"use client";

import { Button } from "@ui";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="h-[90dvh] flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-3">
          Something went wrong!
        </h1>
        <p className="text-gray-600 mb-8">{error.message}</p>
        <Button
          variant="destructive"
          onClick={() => window.location.reload()}
          className="px-5 py-2 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
        >
          Reload Page
        </Button>
      </div>
    </div>
  );
}
