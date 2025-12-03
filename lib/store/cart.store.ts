import { create } from "zustand";
import type { Product } from "../api/products.api";

type CartItem = {
  product: Product;
  count: number;
};

type CartState = {
  items: Record<string, CartItem>; // productId -> { product, count }
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  getItemCount: (productId: string) => number;
  getTotalCartCount: () => number;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  addItem: (product: Product) => {
    set((state) => {
      const existing = state.items[product.id];
      return {
        items: {
          ...state.items,
          [product.id]: existing
            ? {
                product: existing.product, // Keep existing product data
                count: existing.count + 1,
              }
            : {
                product,
                count: 1,
              },
        },
      };
    });
  },
  removeItem: (productId: string) => {
    set((state) => {
      const existing = state.items[productId];
      if (!existing) return state;

      if (existing.count <= 1) {
        const { [productId]: _, ...rest } = state.items;
        return { items: rest };
      }
      return {
        items: {
          ...state.items,
          [productId]: {
            product: existing.product,
            count: existing.count - 1,
          },
        },
      };
    });
  },
  getItemCount: (productId: string) => {
    return get().items[productId]?.count || 0;
  },
  getTotalCartCount: () => {
    return Object.values(get().items).reduce(
      (acc, item) => acc + item.count,
      0
    );
  },
  clearCart: () => {
    set({ items: {} });
  },
}));
