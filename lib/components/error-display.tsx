"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "./ui";
import { CONTENT } from "@/lib/const";
import Link from "next/link";

type ErrorDisplayProps = {
  error: Error & { digest?: string };
  reset: () => void;
  showGoHome?: boolean;
  minHeight?: "screen" | "60vh";
};

export default function ErrorDisplay({
  error,
  reset,
  showGoHome = false,
  minHeight = "60vh",
}: ErrorDisplayProps) {
  const minHeightClass = minHeight === "screen" ? "min-h-screen" : "min-h-[60vh]";

  return (
    <div className={`flex flex-col items-center justify-center ${minHeightClass} px-6`}>
      <div className="w-32 h-32 rounded-full bg-linear-to-br from-red-100 to-red-50 flex items-center justify-center mb-6 shadow-inner">
        <AlertCircle size={64} className="text-red-400" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
        {CONTENT.ERROR_OCCURRED}
      </h2>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {CONTENT.ERROR_DESCRIPTION}
      </p>
      {process.env.NODE_ENV === "development" && error.message && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl w-full">
          <p className="text-sm text-red-800 font-mono break-all">
            {error.message}
          </p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="primary" onClick={reset}>
          {CONTENT.TRY_AGAIN}
        </Button>
        {showGoHome && (
          <Link href="/">
            <Button variant="outline">{CONTENT.GO_HOME}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

