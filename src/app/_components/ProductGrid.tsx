'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '../_types/Product';
import ProductCard from './ProductCard';
import { Button } from './Button';
import { CiWarning } from 'react-icons/ci';
import { IoEye } from 'react-icons/io5';

type ProductGridProps = {
  products: Product[];
};

export const ProductGrid = ({ products }: ProductGridProps) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div className='flex flex-col justify-center items-center py-8'>
      {filteredProducts.length > 0 ? (
        <div className='grid max-w-[1200px] my-8 mx-8 lg:mx-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredProducts.slice(0, visibleCount).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className='max-w-[1200px] my-8 w-full '>
          <div className='flex flex-col justify-center items-center w-full p-16 bg-gray-100 rounded-lg'>
            <CiWarning size='64' />
            <p className='text-2xl font-semibold text-gray-800'>
              No se encontraron productos
            </p>
          </div>
        </div>
      )}
      {visibleCount >= filteredProducts.length ? null : (
        <Button icon={<IoEye />} onClick={loadMore} label='VER MAS' />
      )}
    </div>
  );
};
