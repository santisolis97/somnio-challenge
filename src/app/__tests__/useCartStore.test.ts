import { act, renderHook } from '@testing-library/react';

import { Product } from '../_types/Product';
import { useCartStore } from '../_store/CartStore';

const product: Product = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description:
    'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 3.9,
    count: 120,
  },
};

describe('useCartStore', () => {
  afterEach(() => {
    window.localStorage.clear();

    act(() => {
      useCartStore.setState({ products: [] });
    });
  });

  it('should add a product to the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(product);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].id).toBe(product.id);
    expect(result.current.products[0].quantity).toBe(1);
  });

  it('should increase the quantity of an existing product', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(product);
    });

    act(() => {
      result.current.addProduct(product);
    });

    expect(result.current.products[0].quantity).toBe(2);
  });

  it('should remove a product from the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(product);
    });

    act(() => {
      result.current.removeProduct(product.id);
    });

    expect(result.current.products).toHaveLength(0);
  });

  it('should persist the cart state', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addProduct(product);
    });

    // Simulate remounting to check for state persistence
    const { result: remountedResult } = renderHook(() => useCartStore());

    expect(remountedResult.current.products).toHaveLength(1);
    expect(remountedResult.current.products[0].id).toBe(product.id);
  });
});
