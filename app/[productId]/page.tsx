import { getProducts } from "@/lib/api/products.api";
import AddToCartButton from "@/lib/components/add-to-cart-button";
import NotFound from "@/lib/components/not-found";
import { CONTENT } from "@/lib/const";
import { formatPrice } from "@/lib/util/format.util";
import Image from "next/image";

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  // TODO: Should we get the product from the API?
  const products = await getProducts();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <NotFound
        title={CONTENT.PRODUCT_NOT_FOUND}
        description={CONTENT.PRODUCT_NOT_FOUND_DESCRIPTION}
      />
    );
  }

  const { name, description, price, imageUrl } = product;

  return (
    <div className="flex max-md:flex-col gap-8 md:gap-12 py-4">
      <div className="flex justify-center items-center relative w-full h-72 md:h-[500px] md:w-[500px] rounded-2xl overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg group">
        <Image
          alt={name}
          src={imageUrl}
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          priority
          fill
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </div>
      <div className="flex flex-col justify-between gap-8 flex-1">
        <header className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {name}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </header>
        <div className="flex flex-col gap-6 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-lg">{CONTENT.PRICE}</span>
            <p className="text-primary font-bold text-3xl">
              {formatPrice(price)}
            </p>
          </div>
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
