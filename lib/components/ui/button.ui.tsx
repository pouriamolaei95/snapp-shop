import { cn } from "@/lib/util/cn.util";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";

type ButtonProps = HeadlessButtonProps & {
  variant?: "primary" | "outline" | "icon";
};

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <HeadlessButton
      className={cn(
        "inline-flex items-center justify-center cursor-pointer transition-all duration-200 rounded-lg font-medium",
        {
          "gap-2 h-14 px-6 py-2 bg-primary text-white hover:bg-primary/90 active:bg-primary/80 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none":
            variant === "primary",
          "p-2 text-primary hover:bg-primary/10 active:bg-primary/20 rounded-lg hover:scale-105 active:scale-95":
            variant === "icon",
          "gap-2 h-14 px-6 py-2 border border-gray-200 text-gray-900 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100 active:text-gray-900 rounded-lg":
            variant === "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
}
