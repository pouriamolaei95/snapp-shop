import { cn } from "@/lib/util/cn.util";
import { PropsWithChildren } from "react";

export function Card({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
