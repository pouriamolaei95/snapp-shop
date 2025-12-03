"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui";
import { CONTENT } from "@/lib/const";
import CartItemsDialog from "../cart-items-dialog";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const pageTitle = isHomePage
    ? CONTENT.SNAPP_SHOP
    : CONTENT.PRODUCT_DESCRIPTION;

  return (
    <header className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
      <div className="flex items-center gap-4 flex-1">
        {!isHomePage && (
          <Button
            onClick={() => router.back()}
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
    </header>
  );
}
