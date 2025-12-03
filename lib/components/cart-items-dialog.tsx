"use client";

import { Trash2Icon, ShoppingCartIcon } from "lucide-react";
import { CONTENT } from "../const/content.const";
import { Badge, Button, Dialog } from "./ui";
import { useCartStore } from "../store";
import { formatPrice } from "../util/format.util";
import CartItem from "./cart-item";
import { useEventPoweredModalOpener } from "../hook/event-powered-modal-opener.hook";

export default function CartItemsDialog() {
  const [isOpen, setIsOpen] = useEventPoweredModalOpener("SHOW_CART_MODAL");
  const cartStore = useCartStore();
  const totalCartCount = cartStore.getTotalCartCount();
  const cartItems = cartStore.items;

  const cartItemsWithDetails = Object.values(cartItems);

  const totalPrice = cartItemsWithDetails.reduce(
    (sum, item) => sum + item.product.price * item.count,
    0
  );

  function clearCart() {
    cartStore.clearCart();
    setIsOpen(false);
  }

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
        className="md:max-w-2xl"
      >
        <div className="flex flex-col h-full">
          {cartItemsWithDetails.length === 0 ? (
            <section className="flex flex-col items-center justify-center py-12 md:py-20 px-4 md:px-6 text-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-4 md:mb-6 shadow-inner">
                <ShoppingCartIcon
                  size={40}
                  className="md:w-12 md:h-12 text-gray-400"
                />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                {CONTENT.CART_EMPTY}
              </h2>
              <p className="text-gray-500 text-sm md:text-base max-w-md px-4">
                {CONTENT.CART_EMPTY_DESCRIPTION}
              </p>
            </section>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 list-none">
                {cartItemsWithDetails.map((item) => (
                  <li key={item.product.id}>
                    <CartItem {...item.product} />
                  </li>
                ))}
              </ul>

              <footer className="border-t-2 border-gray-200 p-4 md:p-6 bg-linear-to-br from-gray-50 to-white space-y-4 md:space-y-5 shadow-inner shrink-0">
                <div className="flex items-center justify-between p-3 md:p-4 bg-white rounded-lg md:rounded-xl border border-gray-200">
                  <span className="font-semibold text-gray-700 text-base md:text-lg">
                    {CONTENT.TOTAL}
                  </span>
                  <span className="font-bold text-2xl md:text-3xl text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <nav
                  className="flex flex-col md:flex-row gap-2 md:gap-3"
                  aria-label={CONTENT.CART_ACTIONS}
                >
                  <Button
                    onClick={() => alert(CONTENT.SCODE_CREEP)}
                    variant="primary"
                    className="md:flex-1 h-12 md:h-14 text-sm md:text-base font-semibold shadow-lg order-2 md:order-1"
                  >
                    {CONTENT.CHECKOUT}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="h-12 md:h-14 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 hover:border-red-300 order-1 md:order-2"
                    aria-label={CONTENT.CLEAR_CART}
                  >
                    <Trash2Icon size={16} className="md:w-[18px] md:h-[18px]" />
                    <span className="text-xs md:text-sm font-medium">
                      {CONTENT.CLEAR_CART}
                    </span>
                  </Button>
                </nav>
              </footer>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}
