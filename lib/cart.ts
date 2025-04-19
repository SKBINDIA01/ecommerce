// Cart state management
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StateCreator } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      
      addItem: (newItem: CartItem) => set((state: { items: CartItem[] }) => {
        // Check if item already exists in cart
        const existingItemIndex = state.items.findIndex(
          (item: CartItem) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
        );
        
        if (existingItemIndex !== -1) {
          // Update quantity if item exists
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          return { items: updatedItems };
        } else {
          // Add new item
          return { items: [...state.items, newItem] };
        }
      }),
      
      removeItem: (id: string) => set((state: { items: CartItem[] }) => ({
        items: state.items.filter((item: CartItem) => item.id !== id)
      })),
      
      updateQuantity: (id: string, quantity: number) => set((state: { items: CartItem[] }) => ({
        items: state.items.map((item: CartItem) => 
          item.id === id ? { ...item, quantity } : item
        )
      })),
      
      clearCart: () => set({ items: [] }),
      
      getSubtotal: () => {
        return get().items.reduce(
          (total: number, item: CartItem) => total + (item.price * item.quantity), 
          0
        );
      },
      
      getItemCount: () => {
        return get().items.reduce(
          (count: number, item: CartItem) => count + item.quantity, 
          0
        );
      }
    }),
    {
      name: 'urban-fynix-cart',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

// Calculate shipping cost
export const calculateShipping = (subtotal: number) => {
  return subtotal > 1000 ? 0 : 99; // Free shipping for orders over ₹1000, otherwise ₹99
};

// Calculate total cost
export const calculateTotal = (subtotal: number) => {
  return subtotal + calculateShipping(subtotal);
};
