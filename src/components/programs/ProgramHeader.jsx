import React from 'react';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { Badge } from '../ui/Badge';
import { Container } from '../ui/Container';
import { useLanguage } from '../../context/LanguageContext';
import { FileCheck, ShieldCheck } from 'lucide-react';
import { NGO_DETAILS } from '../../utils/constants';

export const ProgramHeader = ({ program }) => {
  const { isHindi } = useLanguage();

  const breadcrumbItems = [
    { labelHi: 'कार्यक्रम', labelEn: 'Programs', path: '/programs' },
    { labelHi: program.titleHi, labelEn: program.titleEn, path: `/programs/${program.slug}` },
  ];

  return (
    <div className="bg-white border-b border-slate-200/90 pb-10 pt-4">
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={program.colorCategory}>
                {isHindi ? program.badgeHi : program.badgeEn}
              </Badge>
              <span className="text-xs text-slate-500 font-medium">
                {NGO_DETAILS.shortName} | {NGO_DETAILS.regNo}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isHindi ? program.titleHi : program.titleEn}
            </h1>
            <p className="text-sm sm:text-lg font-semibold text-ngo-gold-700">
              {isHindi ? program.titleEn : program.titleHi}
            </p>

            <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-normal pt-2 border-t border-slate-100">
              {isHindi ? program.introHi : program.introEn}
            </p>

            <div className="flex items-center gap-2 text-xs text-ngo-green-800 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-ngo-gold-700 shrink-0" />
              <span>{isHindi ? '10 पंजीकृत विधान उद्देश्यों के अंतर्गत संचालित' : 'Operated under Statutory Society Objectives'}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-ngo-gold-700/60 aspect-video lg:aspect-square">
              <img
                src={program.coverImage}
                alt={isHindi ? program.titleHi : program.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent p-4 flex items-end">
                <span className="text-white text-xs font-bold bg-ngo-green-700/90 px-3 py-1 rounded-md backdrop-blur-xs">
                  {isHindi ? program.badgeHi : program.badgeEn}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
