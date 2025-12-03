"use client";

import { useState, useEffect } from "react";
import { Trash2Icon, ShoppingCartIcon } from "lucide-react";
import { CONTENT } from "../const/content.const";
import { Badge, Button, Dialog } from "./ui";
import { useCartStore } from "../store";
import { getProducts, type Product } from "../api/products.api";
import { formatPrice } from "../util/format.util";
import CartItem from "./cart-item";
import { CUSTOM_EVENTS } from "../const";

export default function CartItemsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const cartStore = useCartStore();
  const totalCartCount = cartStore.getTotalCartCount();
  const cartItems = cartStore.items;

  useEffect(() => {
    function showModal() {
      setIsOpen(true);
    }

    window.addEventListener(
      CUSTOM_EVENTS.SHOW_CART_MODAL,
      showModal as EventListener
    );

    return () => {
      window.removeEventListener(
        CUSTOM_EVENTS.SHOW_CART_MODAL,
        showModal as EventListener
      );
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      getProducts().then(setProducts).catch(console.error);
    }
  }, [isOpen]); // TODO

  const cartItemsWithDetails = Object.entries(cartItems)
    .map(([productId, count]) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return null;
      return {
        ...product,
        totalPrice: product.price * count,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const totalPrice = cartItemsWithDetails.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return (
    <>
      <Button
        variant="icon"
        onClick={() => setIsOpen(true)}
        aria-label={CONTENT.CART}
        className="relative"
      >
        {totalCartCount > 0 && (
          <Badge className="absolute -top-2 -right-2">
            {totalCartCount.toLocaleString("fa-IR")}
          </Badge>
        )}
        <ShoppingCartIcon size={20} />
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={CONTENT.CART}
        className="max-w-2xl"
      >
        <div className="flex flex-col h-full">
          {cartItemsWithDetails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCartIcon size={40} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {CONTENT.CART_EMPTY}
              </h3>
              <p className="text-gray-500 text-sm">
                {CONTENT.CART_EMPTY_DESCRIPTION}
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItemsWithDetails.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>

              <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-gray-700">
                    {CONTENT.TOTAL}
                  </span>
                  <span className="font-bold text-2xl text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    className="flex-1 h-12 text-base font-semibold"
                    onClick={() => {
                      // TODO: Implement checkout
                      console.log("Checkout");
                    }}
                  >
                    {CONTENT.CHECKOUT}
                  </Button>
                  <Button
                    variant="icon"
                    onClick={() => {
                      cartStore.clearCart();
                      setIsOpen(false);
                    }}
                    className="h-12 px-4 text-red-600 hover:bg-red-50 gap-2"
                    aria-label={CONTENT.CLEAR_CART}
                  >
                    <Trash2Icon size={18} />
                    <span className="text-sm">{CONTENT.CLEAR_CART}</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}
