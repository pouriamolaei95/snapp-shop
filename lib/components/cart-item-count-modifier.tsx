import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui";
import { useCartStore } from "../store";
import { CONTENT } from "../const/content.const";
import { cn } from "../util/cn.util";
import type { Product } from "../api/products.api";

type CartItemCountModifierProps = {
  product: Product;
  className?: string;
};

export default function CartItemCountModifier({
  product,
  className,
}: CartItemCountModifierProps) {
  const cartStore = useCartStore();
  const count = cartStore.getItemCount(product.id);

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 md:gap-2 bg-gray-50 rounded-lg p-0.5 md:p-1 border border-gray-200 shrink-0",
        className
      )}
    >
      <Button
        variant="icon"
        onClick={() => cartStore.addItem(product)}
        className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-primary/20 hover:text-primary"
        aria-label={CONTENT.INCREASE_QUANTITY}
      >
        <PlusIcon size={12} className="md:w-3.5 md:h-3.5" />
      </Button>
      <span className="w-8 md:w-10 text-center font-bold text-gray-900 text-sm md:text-base">
        {count.toLocaleString("fa-IR")}
      </span>
      <Button
        variant="icon"
        onClick={() => cartStore.removeItem(product.id)}
        className="h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-red-50 hover:text-red-600"
        aria-label={CONTENT.DECREASE_QUANTITY}
      >
        {count === 1 ? (
          <Trash2Icon size={12} className="md:w-3.5 md:h-3.5 text-red-500" />
        ) : (
          <MinusIcon size={12} className="md:w-3.5 md:h-3.5" />
        )}
      </Button>
    </div>
  );
}
