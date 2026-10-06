import React from 'react';
import { Container } from '../ui/Container';
import { IMPACT_STATS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { FolderKanban, Users, HeartHandshake, CalendarCheck } from 'lucide-react';

const iconMap = {
  FolderKanban,
  Users,
  HeartHandshake,
  CalendarCheck,
};

export const ImpactStatsSection = ({ stats = IMPACT_STATS }) => {
  const { isHindi } = useLanguage();

  return (
    <div className="-mt-12 sm:-mt-16 relative z-20">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((item) => {
            const Icon = iconMap[item.iconName] || Users;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/90 shadow-ngo text-center hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-ngo-green-50 text-ngo-green-700 mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {item.stat}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-bold text-ngo-green-800">
                  {isHindi ? item.labelHi : item.labelEn}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500 hidden xs:block">
                  {isHindi ? item.subtextHi : item.subtextEn}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
