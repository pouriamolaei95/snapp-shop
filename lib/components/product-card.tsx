import Image from "next/image";
import type { Product } from "../api";
import { Card } from "./ui";
import Link from "next/link";
import { formatPrice } from "../util/format.util";

export default function ProductCard({ id, name, price, imageUrl }: Product) {
  return (
    <Link href={`/${id}`} className="group block h-full">
      <Card className="flex flex-col items-center gap-3 h-full cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 bg-white overflow-hidden">
        <figure className="relative w-full aspect-square p-4 bg-linear-to-br from-gray-50 to-gray-100 group-hover:from-gray-100 group-hover:to-gray-50 transition-colors duration-300">
          <Image
            priority
            src={imageUrl}
            alt={name}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </figure>
        <section className="flex flex-col justify-between gap-2 border-t border-gray-200 p-4 flex-1 text-sm w-full bg-white">
          <h3 className="text-gray-800 font-medium   group-hover:text-primary transition-colors duration-200">
            {name}
          </h3>
          <p className="font-bold text-primary text-lg text-end mt-auto">
            {formatPrice(price)}
          </p>
        </section>
      </Card>
    </Link>
  );
}
