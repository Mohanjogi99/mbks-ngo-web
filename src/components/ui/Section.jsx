import React from 'react';
import { Container } from './Container';
import { Badge } from './Badge';
import { cn } from '../../utils/cn';

/**
 * Section component for layout sections with title, badge, and description
 */
export const Section = ({
  children,
  badge,
  badgeVariant = 'green',
  title,
  subtitle,
  centered = false,
  background = 'white', // 'white' | 'light' | 'green' | 'dark'
  className,
  containerClassName,
  id,
}) => {
  const backgrounds = {
    white: 'bg-white text-slate-800',
    light: 'bg-slate-50 text-slate-800 border-y border-slate-100',
    green: 'bg-ngo-green-900 text-white',
    dark: 'bg-slate-900 text-white',
  };

  return (
    <section id={id} className={cn('py-12 sm:py-16 lg:py-20', backgrounds[background], className)}>
      <Container className={containerClassName}>
        {(badge || title || subtitle) && (
          <div className={cn('mb-10 lg:mb-14 max-w-3xl', centered && 'mx-auto text-center')}>
            {badge && (
              <div className={cn('mb-3', centered && 'flex justify-center')}>
                <Badge variant={badgeVariant}>{badge}</Badge>
              </div>
            )}
            {title && (
              <h2 className={cn(
                'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight',
                background === 'green' || background === 'dark' ? 'text-white' : 'text-slate-900'
              )}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn(
                'mt-3 text-base sm:text-lg leading-relaxed',
                background === 'green' || background === 'dark' ? 'text-emerald-100/90' : 'text-slate-600'
              )}>
                {subtitle}
              </p>
            )}
            <div className={cn('mt-4 h-1 w-20 rounded bg-ngo-gold-700', centered && 'mx-auto')} />
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};
