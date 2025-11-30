import Image from "next/image";
import type { Product } from "../api";
import Card from "./ui/card.ui";

export default function ProductCard({ name, price, imageUrl }: Product) {
  return (
    <Card className="flex flex-col items-center gap-2 h-full">
      <Image
        priority
        src={imageUrl}
        alt={name}
        className="object-contain"
        width={152}
        height={152}
      />
      <div className="flex flex-col justify-between gap-2 border-t border-gray-200 p-2 flex-1 text-sm w-full">
        <h3 className="text-gray-700">{name}</h3>
        <p className="font-bold text-gray-900 text-end">
          {price.toLocaleString("fa-IR", {
            style: "currency",
            currency: "IRR",
          })}
        </p>
      </div>
    </Card>
  );
}
