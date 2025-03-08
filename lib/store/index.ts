import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CartItem, Product, User } from '../types';

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface CartActions {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export interface CartStore extends CartState, CartActions {}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  logout: () => void;
}

export interface AuthStore extends AuthState, AuthActions {}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.discountedPrice * item.quantity, 0);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      total: 0,

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          const updatedItems = existingItem
            ? state.items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
            : [...state.items, { ...product, quantity: 1 }];

          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        }),

      removeItem: (productId) =>
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== productId);
          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity < 1) return state;

          const updatedItems = state.items.map((item) => (item.id === productId ? { ...item, quantity } : item));

          return {
            items: updatedItems,
            total: calculateTotal(updatedItems),
          };
        }),

      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
