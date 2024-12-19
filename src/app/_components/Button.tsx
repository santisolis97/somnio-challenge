'use client';
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon?: React.ReactNode;
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      className='flex gap-2 bg-white hover:bg-gray-200 py-2 shadow-sm rounded-md px-12 items-center justify-center'
      {...props}
    >
      {props.icon}
      {props.label}
    </button>
  );
};
