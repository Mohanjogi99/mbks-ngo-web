import React from 'react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FOCUS_AREAS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import {
  GraduationCap,
  HeartPulse,
  UserCheck,
  Smile,
  Leaf,
  Trophy,
  Accessibility,
  ShieldAlert,
  Droplet,
  Droplets,
} from 'lucide-react';

const iconMap = {
  GraduationCap,
  HeartPulse,
  UserCheck,
  Smile,
  Leaf,
  Trophy,
  Accessibility,
  ShieldAlert,
  Droplet,
  Droplets,
};

export const FocusAreasSection = ({ items = FOCUS_AREAS }) => {
  const { isHindi } = useLanguage();

  return (
    <Section
      id="focus-areas"
      background="light"
      badge={isHindi ? 'कार्य क्षेत्र' : 'Our Focus Areas'}
      badgeVariant="gold"
      title={isHindi ? 'हमारे मुख्य सामाजिक कार्य क्षेत्र' : 'Key Core Areas of Social Service'}
      subtitle={isHindi ? 'संस्था के 10 पंजीकृत संविधानिक उद्देश्यों पर आधारित प्राथमिक कार्य क्षेत्र:' : 'Core thematic verticals based on the official 10 registered society objectives:'}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((area) => {
          const Icon = iconMap[area.iconName] || GraduationCap;
          return (
            <Card
              key={area.id}
              className="flex flex-col justify-between h-full group hover:border-ngo-green-500 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-ngo-green-50 text-ngo-green-700 flex items-center justify-center group-hover:bg-ngo-green-700 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant={area.colorCategory}>{isHindi ? area.badgeHi : area.badgeEn}</Badge>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-ngo-green-700 transition-colors">
                  {isHindi ? area.titleHi : area.titleEn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isHindi ? area.descHi : area.descEn}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ngo-green-700">
                <span>{isHindi ? 'विस्तार से जानें' : 'Learn More'}</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};
