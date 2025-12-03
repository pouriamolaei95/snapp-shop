import { apiInstance } from "./";

export async function getProducts(): Promise<Product[]> {
  try {
    // Use ky with Next.js revalidation options
    return await apiInstance
      .get("products", {
        next: { revalidate: 60 * 30 }, // 30 minutes
      })
      .json<Product[]>();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    // Use ky with Next.js revalidation options
    return await apiInstance
      .get(`products/${id}`, {
        next: { revalidate: 60 * 30 }, // 30 minutes
      })
      .json<Product>();
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};
