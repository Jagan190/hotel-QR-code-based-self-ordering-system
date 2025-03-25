import { create } from 'zustand';
import { CartItem, CustomerInfo } from '../types';

interface Store {
  cart: CartItem[];
  customerInfo: CustomerInfo | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  clearCart: () => void;
  total: number;
}

export const useStore = create<Store>((set) => ({
  cart: [],
  customerInfo: null,
  total: 0,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
          total: state.total + item.price,
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    }),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== itemId),
      total: state.total - state.cart.find((i) => i.id === itemId)!.price * state.cart.find((i) => i.id === itemId)!.quantity,
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => {
      const item = state.cart.find((i) => i.id === itemId);
      if (!item) return state;
      const priceDiff = item.price * (quantity - item.quantity);
      return {
        cart: state.cart.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        ),
        total: state.total + priceDiff,
      };
    }),
  setCustomerInfo: (info) => set({ customerInfo: info }),
  clearCart: () => set({ cart: [], total: 0 }),
}));