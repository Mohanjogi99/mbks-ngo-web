import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Inline Spinner component
 */
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizes[size]} animate-spin text-ngo-green-700`} />
    </div>
  );
};

/**
 * Full Page Loader for initial app loading or route changes
 */
export const FullPageLoader = ({ message = 'लोड हो रहा है... / Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-xs z-50 flex flex-col items-center justify-center p-4">
      <div className="relative mb-4">
        <img
          src="/logo.jpeg"
          alt="Maa-Babuji Jankalyan Samiti Logo"
          className="w-20 h-20 rounded-full border-2 border-ngo-gold-700 shadow-lg object-contain animate-pulse"
        />
      </div>
      <LoadingSpinner size="md" />
      <p className="mt-4 text-sm font-semibold text-slate-700 text-center animate-pulse">
        {message}
      </p>
    </div>
  );
};

/**
 * Skeleton Loader for content placeholders
 */
export const SkeletonLoader = ({ className = 'h-24 w-full' }) => {
  return (
    <div className={`bg-slate-200/70 animate-pulse rounded-lg ${className}`} />
  );
};
