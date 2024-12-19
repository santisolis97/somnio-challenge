import { ProductGrid } from './_components/ProductGrid';
import { Product } from './_types/Product';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing an error icon

export default async function Home() {
  let products: Product[] = [];
  let errorMessage: string | null = null;

  try {
    const response = await fetch('https://fakestoreapi.com/products');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    products = await response.json();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
  }

  if (errorMessage) {
    return (
      <div className='flex items-center justify-center  bg-gray-100 p-6'>
        <div className='max-w-md text-center p-6 bg-white rounded-lg shadow-md border border-gray-300'>
          <FaExclamationTriangle className='text-4xl text-yellow-500 mb-4 mx-auto' />
          <h2 className='text-2xl font-semibold text-gray-800'>
            Oops! Something went wrong.
          </h2>
          <p className='mt-4 text-gray-600'>{errorMessage}</p>
          <p className='mt-4 text-sm text-gray-500'>Please try again later.</p>
        </div>
      </div>
    );
  }

  return <ProductGrid products={products} />;
}
