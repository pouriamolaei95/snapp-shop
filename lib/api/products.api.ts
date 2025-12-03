import { apiInstance } from "./";

export async function getProducts() {
  try {
    return await apiInstance.get("products").json<Product[]>();
  } catch (error) {
    return [];
  }
}

export async function getProduct(id: string) {
  try {
    return await apiInstance.get(`products/${id}`).json<Product>();
  } catch (error) {
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
