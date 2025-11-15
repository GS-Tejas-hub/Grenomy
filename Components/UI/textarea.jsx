import React from 'react';

export const Textarea = React.forwardRef(function Textarea({ className = '', ...props }, ref) {
  const base =
    'block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500';
  return <textarea ref={ref} className={`${base} ${className}`} {...props} />;
});


