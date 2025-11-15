import React from 'react';

export const Input = React.forwardRef(function Input({ className = '', ...props }, ref) {
  const base =
    'block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500';
  return <input ref={ref} className={`${base} ${className}`} {...props} />;
});


