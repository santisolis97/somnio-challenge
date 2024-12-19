import Link from 'next/link';
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

function NotFound() {
  return (
    <div className='flex flex-col gap-4 items-center justify-center  bg-gray-100 p-6'>
      <div className='max-w-md text-center p-6 bg-white rounded-lg shadow-md border border-gray-300'>
        <FaExclamationTriangle className='text-4xl text-yellow-500 mb-4 mx-auto' />
        <h2 className='text-2xl font-semibold text-gray-800'>
          No se pudo encontrar la pagina que buscabas.
        </h2>
      </div>
      <Link
        className='bg-softpurple py-4 hover:bg-purple-200 text-white px-6 rounded-lg'
        href='/'
      >
        VOLVER AL INICIO
      </Link>
    </div>
  );
}

export default NotFound;
