import { getProducts } from "@/lib/api";
import ProductCard from "@/lib/components/product-card";

export default async function Home() {
  const products = await getProducts();
  
  return (
    <main>
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </main>
  );
}
