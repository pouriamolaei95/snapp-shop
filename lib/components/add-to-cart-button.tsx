"use client";
import { CUSTOM_EVENTS } from "../const";
import { CONTENT } from "../const/content.const";
import { useCartStore } from "../store";
import CartItemCountModifier from "./cart-item-count-modifier";
import { Button } from "./ui/";
import { ShoppingCartIcon } from "lucide-react";

type AddToCartButtonProps = {
  productId: string;
};

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const cartStore = useCartStore();
  const count = cartStore.getItemCount(productId);

  function handleButtonClick() {
    if (count > 0) {
      window.dispatchEvent(new CustomEvent(CUSTOM_EVENTS.SHOW_CART_MODAL));
    } else {
      cartStore.addItem(productId);
    }
  }

  return (
    <div className="flex items-center gap-4 w-full">
      {count > 0 && (
        <CartItemCountModifier
          productId={productId}
          className="h-14 border border-gray-200 rounded-md p-2"
        />
      )}
      <Button
        className="flex-1"
        aria-label={CONTENT.ADD_TO_CART}
        onClick={handleButtonClick}
      >
        <ShoppingCartIcon size={18} />
        {count > 0 ? CONTENT.VIEW : CONTENT.ADD_TO_CART}
      </Button>
    </div>
  );
}
