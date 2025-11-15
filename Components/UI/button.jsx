import React from 'react';

export function Button({ children, className = '', variant = 'default', size = 'md', ...props }) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };
  const variants = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
    ghost: 'text-gray-900 hover:bg-gray-100'
  };
  return (
    <button
      className={`${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


