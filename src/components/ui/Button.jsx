import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button Component following MBKS Design System
 */
export const Button = React.forwardRef(({
  children,
  variant = 'primary', // 'primary' | 'gold' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  isDisabled = false,
  icon: Icon,
  iconPosition = 'left',
  className,
  type = 'button',
  onClick,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    // Primary Deep Green (Default for main actions)
    primary: 'bg-ngo-green-700 hover:bg-ngo-green-800 text-white shadow-md shadow-ngo-green-700/20 focus:ring-ngo-green-700',
    // Golden / Brown (Primary brand accent for highlight actions like Donate)
    gold: 'bg-ngo-gold-700 hover:bg-ngo-gold-800 text-white shadow-md shadow-ngo-gold-700/20 focus:ring-ngo-gold-700',
    // Soft Secondary Green
    secondary: 'bg-ngo-green-50 text-ngo-green-800 hover:bg-ngo-green-100 border border-ngo-green-200 focus:ring-ngo-green-600',
    // Outline (Green border on white background)
    outline: 'bg-white text-ngo-green-800 border-2 border-ngo-green-700 hover:bg-ngo-green-50 focus:ring-ngo-green-700',
    // White / Glass Outline (For dark hero sections & banners)
    'outline-white': 'bg-white/10 text-white border-2 border-white/60 hover:bg-white/20 hover:border-white focus:ring-white shadow-sm backdrop-blur-xs',
    // Ghost (Minimal background hover)
    ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400',
    // Danger / Red accent
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
