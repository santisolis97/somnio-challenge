import React, { useMemo } from 'react';
import { Product } from '../_types/Product';
import Image from 'next/image';
import { CiSquarePlus } from 'react-icons/ci';
import { useCartStore } from '../_store/CartStore';
import { useShallow } from 'zustand/shallow';

type ProductCardProps = {
  product: Product;
};

const randomColors = ['#87c3c8', '#c3c787', '#9287c8'];

function ProductCard({ product }: ProductCardProps) {
  const randomColorNumber = useMemo(() => Math.floor(Math.random() * 3), []);
  const { addProduct } = useCartStore(
    useShallow((state) => ({ addProduct: state.addProduct }))
  );
  const handleAddToCart = () => {
    addProduct(product);
  };
  return (
    <div
      key={product.id}
      className='bg-white pt-2   rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'
    >
      <div className='relative w-full h-48'>
        <div className='absolute top-0 left-2 z-10 cursor-pointer'>
          <CiSquarePlus
            data-testid='addButton'
            size={48}
            onClick={handleAddToCart}
          />
        </div>

        <div
          className='absolute bottom-10 px-4 py-2 z-10  right-0'
          style={{ backgroundColor: randomColors[randomColorNumber] }}
        >
          USD {product.price}
        </div>
        <Image
          src={product.image}
          alt={product.title}
          layout='fill'
          objectFit='contain'
          priority={true}
        />
      </div>
      <div className='p-4 flex flex-col justify-between flex-1'>
        <h3 className='text-lg font-semibold text-gray-800 line-clamp-2'>
          {product.title}
        </h3>
        <p className='text-sm text-gray-400 mt-1 line-clamp-4'>
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
