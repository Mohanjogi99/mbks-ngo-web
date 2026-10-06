import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Info, Target, ListChecks, Building2 } from 'lucide-react';

export const AboutNavTabs = () => {
  const { isHindi } = useLanguage();

  const tabs = [
    { path: '/about', labelHi: 'संस्था परिचय', labelEn: 'About Us', icon: Info, end: true },
    { path: '/about/vision-mission', labelHi: 'विजन एवं मिशन', labelEn: 'Vision & Mission', icon: Target },
    { path: '/about/objectives', labelHi: '10 पंजीकृत उद्देश्य', labelEn: '10 Objectives', icon: ListChecks },
    { path: '/about/organization', labelHi: 'संगठन एवं विधान', labelEn: 'Organization Structure', icon: Building2 },
  ];

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs mb-8 rounded-xl p-1.5 flex flex-wrap gap-1 sm:gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-ngo-green-700 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-ngo-green-700'
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{isHindi ? tab.labelHi : tab.labelEn}</span>
          </NavLink>
        );
      })}
    </div>
  );
};
