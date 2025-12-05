import { getProducts } from "@/lib/api";
import ProductCard from "@/lib/components/product-card";
import NotFound from "@/lib/components/not-found";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="py-4">
      {products.length === 0 ? (
        <NotFound />
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {products.map((product) => (
            <li key={product.id} className="h-full">
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export const revalidate = 1800; // 30 minutes
