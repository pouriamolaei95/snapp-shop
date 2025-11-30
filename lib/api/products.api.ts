import { apiInstance } from "./";

export async function getProducts() {
  return apiInstance.get("products").json<Product[]>();
}

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};
