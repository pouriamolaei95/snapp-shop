import { products } from "../const/mock-data";

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProduct(id: string): Promise<Product | null> {
  return products.find((product) => product.id === id) || null;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};
