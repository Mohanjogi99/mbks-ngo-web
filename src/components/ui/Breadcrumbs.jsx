import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Breadcrumbs = ({ items }) => {
  const { isHindi } = useLanguage();

  return (
    <nav className="flex items-center text-xs sm:text-sm text-slate-500 py-3 px-1 space-x-1.5 sm:space-x-2 overflow-x-auto whitespace-nowrap">
      <NavLink
        to="/"
        className="inline-flex items-center gap-1 hover:text-ngo-green-700 transition-colors text-slate-600"
      >
        <Home className="w-3.5 h-3.5 text-ngo-green-700" />
        <span>{isHindi ? 'मुख्य पृष्ठ' : 'Home'}</span>
      </NavLink>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-ngo-green-800 bg-ngo-green-50 px-2.5 py-0.5 rounded-md border border-ngo-green-200">
                {isHindi ? item.labelHi : item.labelEn}
              </span>
            ) : (
              <NavLink
                to={item.path}
                className="hover:text-ngo-green-700 transition-colors text-slate-600"
              >
                {isHindi ? item.labelHi : item.labelEn}
              </NavLink>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
