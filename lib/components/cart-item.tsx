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
    <div
      className="flex gap-4 p-5 rounded-xl border border-gray-200 
    bg-white hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
    >
      <div
        className="relative w-24 h-24 rounded-xl overflow-hidden border-2
       border-gray-200 shrink-0 bg-linear-to-br from-gray-50 to-gray-100 
       group-hover:border-primary/30 transition-colors duration-300"
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div>
          <h3 className="font-semibold text-gray-900 truncate text-base mb-1">
            {name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500">{CONTENT.UNIT_PRICE}</span>
            <p className="font-bold text-primary text-base">
              {formatPrice(price)}
            </p>
          </div>
          <CartItemCountModifier productId={id} />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 bg-gray-50 -mx-2 px-2 rounded-md">
          <span className="text-sm font-medium text-gray-700">
            {CONTENT.SUBTOTAL}
          </span>
          <span className="font-bold text-gray-900 text-lg">
            {formatPrice(price * count)}
          </span>
        </div>
      </div>
    </div>
  );
}
