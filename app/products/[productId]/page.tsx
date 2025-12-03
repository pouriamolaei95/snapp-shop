import { getProduct, getProducts } from "@/lib/api/products.api";
import AddToCartButton from "@/lib/components/add-to-cart-button";
import NotFound from "@/lib/components/not-found";
import { CONTENT } from "@/lib/const";
import { formatPrice } from "@/lib/util/format.util";
import Image from "next/image";

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

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
    <article className="flex max-md:flex-col gap-4 md:gap-12 py-2 md:py-4">
      <figure
        className="flex justify-center items-center relative w-full 
      h-64 sm:h-80 md:h-[500px] md:w-[500px] rounded-xl md:rounded-2xl overflow-hidden border-2 
      border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 shadow-lg group"
      >
        <Image
          alt={name}
          src={imageUrl}
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          priority
          fill
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </figure>
      <div className="flex flex-col justify-between gap-4 md:gap-8 flex-1">
        <header className="flex flex-col gap-4 md:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              {name}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </header>
        <section
          className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 rounded-xl md:rounded-2xl 
        bg-linear-to-br from-gray-50 to-white border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-base md:text-lg">
              {CONTENT.PRICE}
            </span>
            <p className="text-primary font-bold text-2xl sm:text-3xl">
              {formatPrice(price)}
            </p>
          </div>
          <AddToCartButton product={product} />
        </section>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((product) => ({
      productId: product.id,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    // Return empty array to prevent build failure
    // Pages will be generated on-demand
    return [];
  }
}

type ProductPageProps = {
  params: Promise<{ productId: string }>;
};
