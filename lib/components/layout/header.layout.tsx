"use client";

import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui";
import { CONTENT } from "@/lib/const";
import CartItemsDialog from "../cart-items-dialog";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";
  const pageTitle = isHomePage
    ? CONTENT.APP_TITLE
    : CONTENT.PRODUCT_DESCRIPTION;

  return (
    <>
      <header
        className="h-16 bg-white flex items-center
      border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-xs"
      >
        <div className="main-container flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {!isHomePage && (
              <Button
                onClick={() => router.push("/")}
                variant="icon"
                aria-label={CONTENT.BACK}
              >
                <ArrowRight size={20} />
              </Button>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {pageTitle}
            </h1>
          </div>
          <CartItemsDialog />
        </div>
      </header>
      <div className="h-16" />
    </>
  );
}
