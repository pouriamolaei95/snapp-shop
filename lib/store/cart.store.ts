import { create } from "zustand";

type CartState = {
  items: Record<string, number>; // productId -> count
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  getItemCount: (productId: string) => number;
  getTotalCartCount: () => number;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: {},
  addItem: (productId: string) => {
    set((state) => ({
      items: {
        ...state.items,
        [productId]: (state.items[productId] || 0) + 1,
      },
    }));
  },
  removeItem: (productId: string) => {
    set((state) => {
      const currentCount = state.items[productId] || 0;
      if (currentCount <= 1) {
        const { [productId]: _, ...rest } = state.items;
        return { items: rest };
      }
      return {
        items: {
          ...state.items,
          [productId]: currentCount - 1,
        },
      };
    });
  },
  getItemCount: (productId: string) => {
    return get().items[productId] || 0;
  },
  getTotalCartCount: () => {
    return Object.values(get().items).reduce((acc, curr) => acc + curr, 0);
  },
  clearCart: () => {
    set({ items: {} });
  },
}));
