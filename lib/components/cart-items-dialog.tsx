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
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-6 shadow-inner">
                <ShoppingCartIcon size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {CONTENT.CART_EMPTY}
              </h3>
              <p className="text-gray-500 text-base max-w-md">
                {CONTENT.CART_EMPTY_DESCRIPTION}
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {cartItemsWithDetails.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>

              <div className="border-t-2 border-gray-200 p-6 bg-linear-to-br from-gray-50 to-white space-y-5 shadow-inner">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                  <span className="font-semibold text-gray-700 text-lg">
                    {CONTENT.TOTAL}
                  </span>
                  <span className="font-bold text-3xl text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    className="flex-1 h-14 text-base font-semibold shadow-lg"
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
                    className="h-14 px-5 text-red-600 hover:bg-red-50 hover:text-red-700 gap-2 border border-red-200 hover:border-red-300"
                    aria-label={CONTENT.CLEAR_CART}
                  >
                    <Trash2Icon size={18} />
                    <span className="text-sm font-medium">
                      {CONTENT.CLEAR_CART}
                    </span>
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
