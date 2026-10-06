import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Pill Badge component for category tags, statuses, and objectives
 */
export const Badge = ({
  children,
  variant = 'green', // 'green' | 'gold' | 'blue' | 'red' | 'pink' | 'slate'
  size = 'md', // 'sm' | 'md'
  icon: Icon,
  className,
}) => {
  const variants = {
    green: 'bg-ngo-green-50 text-ngo-green-800 border border-ngo-green-200',
    gold: 'bg-ngo-gold-50 text-ngo-gold-800 border border-ngo-gold-200',
    blue: 'bg-blue-50 text-blue-800 border border-blue-200',
    red: 'bg-red-50 text-red-800 border border-red-200',
    pink: 'bg-pink-50 text-pink-800 border border-pink-200',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1 font-medium',
    md: 'px-3 py-1 text-xs sm:text-sm gap-1.5 font-semibold',
  };

  return (
    <span className={cn('inline-flex items-center rounded-full tracking-wide', variants[variant], sizes[size], className)}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
