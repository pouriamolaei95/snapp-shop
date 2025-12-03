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
  const product: Product = { id, name, description, price, imageUrl };
  const count = useCartStore((state) => state.getItemCount(id));

  return (
    <article className="flex gap-3 md:gap-4 p-3 md:p-5 rounded-lg md:rounded-xl border border-gray-200 bg-white hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
      <figure className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg md:rounded-xl overflow-hidden border-2 border-gray-200 shrink-0 bg-linear-to-br from-gray-50 to-gray-100 transition-colors duration-300">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </figure>
      <section className="flex-1 flex flex-col gap-2 md:gap-3 min-w-0">
        <header>
          <h3 className="font-semibold text-gray-900 truncate text-sm md:text-base mb-0.5 md:mb-1">
            {name}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </header>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 gap-2">
          <div className="flex flex-col gap-0.5 md:gap-1 min-w-0">
            <span className="text-[10px] md:text-xs text-gray-500">
              {CONTENT.UNIT_PRICE}
            </span>
            <p className="font-bold text-primary text-sm md:text-base">
              {formatPrice(price)}
            </p>
          </div>
          <CartItemCountModifier product={product} />
        </div>
        <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-gray-200 bg-gray-50 -mx-1 md:-mx-2 px-2 md:px-2 rounded-md">
          <span className="text-xs md:text-sm font-medium text-gray-700">
            {CONTENT.SUBTOTAL}
          </span>
          <span className="font-bold text-gray-900 text-base md:text-lg">
            {formatPrice(price * count)}
          </span>
        </div>
      </section>
    </article>
  );
}
