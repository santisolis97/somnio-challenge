import { create } from 'zustand';
import { Product } from '../_types/Product';
import { persist } from 'zustand/middleware';

interface CartState {
  products: (Product & { quantity: number })[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product: Product) =>
        set((state) => {
          const existingProductIndex = state.products.findIndex(
            (p) => p.id === product.id
          );

          if (existingProductIndex >= 0) {
            const updatedProducts = [...state.products];
            updatedProducts[existingProductIndex].quantity += 1;
            return { products: updatedProducts };
          } else {
            return {
              products: [...state.products, { ...product, quantity: 1 }],
            };
          }
        }),
      removeProduct: (id: number) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
    }),
    { name: 'cart-storage' }
  )
);

export { useCartStore };
