import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Base Card component
 */
export const Card = ({ children, className, hoverEffect = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl border border-slate-200/80 p-6 shadow-ngo transition-all duration-300',
        hoverEffect && 'hover:-translate-y-1 hover:shadow-lg hover:border-ngo-green-200',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Objective Card component tailored for the 10 constitutional objectives
 */
export const ObjectiveCard = ({ objective, isHindi = true }) => {
  const badgeColors = {
    green: 'bg-ngo-green-50 text-ngo-green-800 border-ngo-green-200',
    gold: 'bg-ngo-gold-50 text-ngo-gold-800 border-ngo-gold-200',
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
    red: 'bg-red-50 text-red-800 border-red-200',
    pink: 'bg-pink-50 text-pink-800 border-pink-200',
  };

  return (
    <Card className="flex flex-col justify-between h-full group relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ngo-green-700 via-ngo-gold-700 to-ngo-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className={cn(
            'inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold border shadow-xs',
            badgeColors[objective.colorCategory] || badgeColors.green
          )}>
            #{objective.id.toString().padStart(2, '0')}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            उद्देश्य {objective.id}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-ngo-green-700 transition-colors duration-200">
          {isHindi ? objective.titleHi : objective.titleEn}
        </h3>

        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
          {isHindi ? objective.descHi : objective.descEn}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-ngo-green-800 font-medium group-hover:text-ngo-gold-700 transition-colors">
        <span>अधिक जानकारी</span>
        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Card>
  );
};

/**
 * Impact Stat Card component
 */
export const ImpactStatCard = ({ icon: Icon, stat, label, subtext, color = 'green' }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-ngo text-center relative overflow-hidden group">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-ngo-green-50 text-ngo-green-700 mb-3 group-hover:scale-110 transition-transform">
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        {stat}
      </div>
      <div className="mt-1 text-sm font-semibold text-ngo-green-800">
        {label}
      </div>
      {subtext && (
        <div className="mt-1 text-xs text-slate-500">
          {subtext}
        </div>
      )}
    </div>
  );
};
