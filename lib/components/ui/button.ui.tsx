import { cn } from "@/lib/util/cn.util";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";

type ButtonProps = HeadlessButtonProps & {
  variant?: "primary" | "icon";
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
        "inline-flex items-center justify-center cursor-pointer transition-colors rounded-md",
        {
          "gap-2 h-14 px-4 py-2 bg-primary text-white font-medium hover:bg-primary/80 active:bg-primary/70 disabled:opacity-50 disabled:cursor-not-allowed":
            variant === "primary",
          "p-2 text-primary hover:bg-primary/10": variant === "icon",
        },
        className
      )} // TODO: Move these to global.css
      {...props}
    >
      {children}
    </HeadlessButton>
  );
}
