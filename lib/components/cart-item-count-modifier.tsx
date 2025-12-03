import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui";
import { useCartStore } from "../store";
import { CONTENT } from "../const/content.const";
import { cn } from "../util/cn.util";

type CartItemCountModifierProps = {
  productId: string;
  className?: string;
};

export default function CartItemCountModifier({
  productId,
  className,
}: CartItemCountModifierProps) {
  const cartStore = useCartStore();
  const count = cartStore.getItemCount(productId);

  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200",
        className
      )}
    >
      <Button
        variant="icon"
        onClick={() => cartStore.addItem(productId)}
        className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary"
        aria-label={CONTENT.INCREASE_QUANTITY}
      >
        <PlusIcon size={14} />
      </Button>
      <span className="w-10 text-center font-bold text-gray-900 text-base">
        {count.toLocaleString("fa-IR")}
      </span>
      <Button
        variant="icon"
        onClick={() => cartStore.removeItem(productId)}
        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
        aria-label={CONTENT.DECREASE_QUANTITY}
      >
        {count === 1 ? (
          <Trash2Icon size={14} className="text-red-500" />
        ) : (
          <MinusIcon size={14} />
        )}
      </Button>
    </div>
  );
}
