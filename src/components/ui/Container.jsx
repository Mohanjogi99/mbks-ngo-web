import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Standard layout container wrapper
 */
export const Container = ({ children, className, size = 'default' }) => {
  const sizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[88rem]',
    full: 'max-w-full',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8 w-full', sizes[size], className)}>
      {children}
    </div>
  );
};
