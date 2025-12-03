"use client";

import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  type DialogProps as HeadlessDialogProps,
} from "@headlessui/react";
import { XIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/util/cn.util";
import { Button } from "./button.ui";
import { CONTENT } from "@/lib/const";

type DialogProps = Omit<HeadlessDialogProps, "children" | "onClose"> & {
  children: ReactNode;
  title?: string;
  onClose: () => void;
  showCloseButton?: boolean;
};

export function Dialog({
  open,
  onClose,
  title,
  children,
  className,
  showCloseButton = true,
}: DialogProps) {
  return (
    <HeadlessDialog
      open={open}
      onClose={onClose}
      className="relative z-50 overflow-hidden"
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className={cn(
            "w-full max-w-lg bg-white rounded-2xl shadow-2xl transform transition-all overflow-hidden",
            "max-h-[90vh] flex flex-col",
            className
          )}
        >
          {(title || showCloseButton) && (
            <header className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && (
                <DialogTitle className="text-xl font-bold text-gray-900">
                  {title}
                </DialogTitle>
              )}
              {showCloseButton && (
                <Button
                  variant="icon"
                  onClick={onClose}
                  aria-label={CONTENT.CLOSE}
                >
                  <XIcon size={20} />
                </Button>
              )}
            </header>
          )}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
}
