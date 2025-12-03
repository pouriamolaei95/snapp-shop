"use client";

import { useEffect } from "react";
import ErrorDisplay from "@/lib/components/error-display";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return <ErrorDisplay error={error} reset={reset} showGoHome />;
}
