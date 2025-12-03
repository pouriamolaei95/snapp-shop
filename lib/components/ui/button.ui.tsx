import { cn } from "@/lib/util/cn.util";
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
      className={cn("btn", `btn-${variant}`, className)}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
}
