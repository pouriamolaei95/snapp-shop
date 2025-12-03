"use client";

import Image from "next/image";
import { CONTENT } from "../const/content.const";
import { useCartStore } from "../store";
import { formatPrice } from "../util/format.util";
import CartItemCountModifier from "./cart-item-count-modifier";
import { Product } from "../api";

export default function CartItem({
  id,
  name,
  description,
  price,
  imageUrl,
}: Product) {
  const count = useCartStore((state) => state.getItemCount(id));

  return (
    <div className="flex gap-4 p-4 rounded-xl border border-gray-200">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <p className="font-bold text-primary">{formatPrice(price)}</p>
          <CartItemCountModifier productId={id} />
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">{CONTENT.SUBTOTAL}</span>
          <span className="font-bold text-gray-900">
            {formatPrice(price * count)}
          </span>
        </div>
      </div>
    </div>
  );
}
