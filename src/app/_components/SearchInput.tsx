// components/SearchInput.tsx
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type InputProps = {
  placeholder?: string;
  error?: string;
  disabled?: boolean;
};

const SearchInput: React.FC<InputProps> = ({
  placeholder = '',
  error,
  disabled = false,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get('search');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0) {
      router.push('?search=' + e.target.value);
    } else {
      router.push('/');
    }
  };

  return (
    <div className='w-full max-w-sm'>
      <div className='relative mt-1'>
        <input
          type='text'
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={search || ''}
          className={`w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-soft-blue focus:border-soft-blue 
          ${
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300'
          } 
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          `}
        />
      </div>
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
};

export default SearchInput;
