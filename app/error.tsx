"use client";

import { useEffect } from "react";
import { Wrap } from "@/components/section";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="content" className="py-20">
      <Wrap>
        <h1 className="text-5xl">Something went wrong</h1>
        <p className="measure mt-4">
          Reload and try again. A booking is only held once you see a reference.
        </p>
        <button
          type="button"
          className="mt-8 inline-flex min-h-11 items-center bg-wax px-4 font-medium text-wax-ink"
          onClick={reset}
        >
          Try again
        </button>
      </Wrap>
    </main>
  );
}
