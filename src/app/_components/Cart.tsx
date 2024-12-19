'use client';
import React from 'react';
import { useCartStore } from '../_store/CartStore';
import { useShallow } from 'zustand/shallow';
import { CartLine } from './CartLine';
import Link from 'next/link';

export const Cart = () => {
  const { products } = useCartStore(
    useShallow((state) => ({ products: state.products }))
  );
  return (
    <div className='flex flex-col justify-center items-center py-8'>
      <div className='flex flex-col justify-center w-full p-16 bg-gray-100 '>
        <h1 className='text-2xl font-semibold text-gray-900 mb-4'>
          Tu Carrito
        </h1>
        {products.length > 0 ? (
          <>
            <div className='flex bg-white py-8 px-4 rounded-lg flex-col gap-4'>
              {products.map((product, index) => (
                <>
                  <CartLine key={product.id} {...product} />
                  {index !== products.length - 1 && (
                    <div className='h-[1px] bg-gray-200 w-full ' />
                  )}
                </>
              ))}
            </div>
          </>
        ) : (
          <p className='text-gray-700'>No hay productos en el carrito.</p>
        )}
      </div>
      <Link
        className='bg-softpurple py-4 hover:bg-purple-200 text-white px-6 rounded-lg'
        href='/'
      >
        SEGUIR COMPRANDO
      </Link>
    </div>
  );
};
