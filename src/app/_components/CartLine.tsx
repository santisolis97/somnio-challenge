'use client';
import React from 'react';
import { Product } from '../_types/Product';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useCartStore } from '../_store/CartStore';
import { useShallow } from 'zustand/shallow';

export const CartLine = ({
  quantity,
  title,
  price,
  id,
}: Product & { quantity: number }) => {
  const { removeProduct } = useCartStore(
    useShallow((state) => ({ removeProduct: state.removeProduct }))
  );
  const removeHandler = () => {
    removeProduct(id);
  };
  return (
    <div className='flex gap-2 items-center'>
      <div className='w-8 flex justify-center items-center'>{quantity}</div>
      <div className='flex-1'>{title}</div>
      <div>USD {(price * quantity).toFixed(2)}</div>
      <FaRegTrashAlt
        color='red'
        onClick={removeHandler}
        className='cursor-pointer'
      />
    </div>
  );
};
