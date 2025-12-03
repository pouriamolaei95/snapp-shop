"use client";

import { useEffect } from "react";
import ErrorDisplay from "@/lib/components/error-display";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased main-container">
        <ErrorDisplay error={error} reset={reset} minHeight="screen" />
      </body>
    </html>
  );
}

