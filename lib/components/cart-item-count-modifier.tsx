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
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="icon"
        onClick={() => cartStore.addItem(productId)}
        className="h-8 w-8 p-0"
        aria-label={CONTENT.INCREASE_QUANTITY}
      >
        <PlusIcon size={14} />
      </Button>
      <span className="w-8 text-center font-semibold text-gray-900">
        {count.toLocaleString("fa-IR")}
      </span>
      <Button
        variant="icon"
        onClick={() => cartStore.removeItem(productId)}
        className="h-8 w-8 p-0"
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
