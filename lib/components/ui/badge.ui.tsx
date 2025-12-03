import { cn } from "@/lib/util/cn.util";
import { PropsWithChildren } from "react";

export function Badge({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return <span className={cn("badge", className)}>{children}</span>;
}
