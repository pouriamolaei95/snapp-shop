import { cn } from "@/lib/util/cn.util";
import { PropsWithChildren } from "react";

export default function Card({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <div className={cn("rounded-lg border border-gray-200", className)}>
      {children}
    </div>
  );
}
