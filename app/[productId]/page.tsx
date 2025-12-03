import { getProducts } from "@/lib/api/products.api";
import AddToCartButton from "@/lib/components/add-to-cart-button";
import { CONTENT } from "@/lib/const";
import { formatPrice } from "@/lib/util/format.util";
import Image from "next/image";

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  // TODO: Should we get the product from the API?
  const products = await getProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>{CONTENT.PRODUCT_NOT_FOUND}</div>;
  }

  const { name, description, price, imageUrl } = product;

  return (
    <div className="flex max-md:flex-col gap-6">
      <div className="flex justify-center items-center relative w-full h-72 md:w-96 md:h-96 rounded-lg overflow-hidden border border-gray-200">
        <Image
          alt={name}
          src={imageUrl}
          className="object-cover w-72 h-72"
          priority
          fill
        />
      </div>
      <div className="flex flex-col justify-between gap-10">
        <header className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-500">{description}</p>
        </header>
        <div className="flex flex-col gap-4">
          <p className="text-gray-900 font-bold text-2xl text-end">
            {formatPrice(price)}
          </p>
          <AddToCartButton productId={productId} />
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    productId: product.id,
  }));
}

export const revalidate = 60 * 60 * 24; // 24 hours

type ProductPageProps = {
  params: Promise<{ productId: string }>;
};
