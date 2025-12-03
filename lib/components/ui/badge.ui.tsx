import { cn } from "@/lib/util/cn.util";
import { PropsWithChildren } from "react";

export function Badge({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <span
      className={cn(
        "bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs",
        className
      )}
    >
      {children}
    </span>
  );
}
