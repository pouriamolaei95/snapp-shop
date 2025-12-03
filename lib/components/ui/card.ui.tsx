import { cn } from "@/lib/util/cn.util";
import { PropsWithChildren } from "react";

export function Card({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return <div className={cn("card", className)}>{children}</div>;
}
