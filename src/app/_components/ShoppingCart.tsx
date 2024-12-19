'use client';
import React, { useMemo } from 'react';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { useCartStore } from '../_store/CartStore';
import { useShallow } from 'zustand/shallow';
import Link from 'next/link';

const ShoppingCart = () => {
  const { products } = useCartStore(
    useShallow((state) => ({ products: state.products }))
  );

  const totalQuantity = useMemo(
    () => products.reduce((sum, product) => sum + product.quantity, 0),
    [products]
  );

  return (
    <Link href='/cart' className='flex items-baseline'>
      <div className='flex items-center text-xs text-black bg-gray-400 border border-gray-700 justify-center rounded-full w-5 h-5 font-semibold'>
        {totalQuantity}
      </div>
      <PiShoppingCartSimpleFill size={42} fill='white' />
    </Link>
  );
};

export default ShoppingCart;
