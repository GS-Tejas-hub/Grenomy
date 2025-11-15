import React from 'react';

export function Badge({ children, className = '', ...props }) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
  return (
    <span className={`${base} ${className}`} {...props}>
      {children}
    </span>
  );
}


